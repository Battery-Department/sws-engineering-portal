/**
 * Webhook Manager
 * Centralized webhook management for Lithi ecosystem
 */

import { EventEmitter } from 'events'
import { lithiGateway } from '@/services/api-gateway'

interface WebhookConfig {
  id?: string
  url: string
  events: string[]
  secret?: string
  active: boolean
  metadata?: Record<string, any>
}

interface WebhookEvent {
  id: string
  type: string
  data: any
  timestamp: string
  source: string
  signature?: string
}

interface WebhookDelivery {
  id: string
  webhookId: string
  event: WebhookEvent
  status: 'pending' | 'success' | 'failed'
  attempts: number
  lastAttempt?: string
  response?: any
  error?: string
}

export class WebhookManager extends EventEmitter {
  private webhooks: Map<string, WebhookConfig> = new Map()
  private deliveries: Map<string, WebhookDelivery> = new Map()
  private retryQueue: Set<string> = new Set()
  private isProcessing = false

  constructor() {
    super()
    this.startProcessing()
  }

  // Register a new webhook
  async registerWebhook(config: WebhookConfig): Promise<string> {
    const webhookId = config.id || this.generateId()
    
    const webhook: WebhookConfig = {
      ...config,
      id: webhookId,
      active: config.active ?? true
    }

    this.webhooks.set(webhookId, webhook)
    
    // Register with backend services
    await lithiGateway.registerWebhook('dashboard', webhook)
    
    this.emit('webhook:registered', webhook)
    return webhookId
  }

  // Unregister a webhook
  async unregisterWebhook(webhookId: string): Promise<void> {
    const webhook = this.webhooks.get(webhookId)
    if (!webhook) {
      throw new Error(`Webhook ${webhookId} not found`)
    }

    this.webhooks.delete(webhookId)
    
    // Unregister from backend services
    await lithiGateway.unregisterWebhook('dashboard', webhookId)
    
    this.emit('webhook:unregistered', webhook)
  }

  // Update webhook configuration
  async updateWebhook(webhookId: string, updates: Partial<WebhookConfig>): Promise<void> {
    const webhook = this.webhooks.get(webhookId)
    if (!webhook) {
      throw new Error(`Webhook ${webhookId} not found`)
    }

    const updatedWebhook = { ...webhook, ...updates }
    this.webhooks.set(webhookId, updatedWebhook)
    
    this.emit('webhook:updated', updatedWebhook)
  }

  // Trigger a webhook event
  async triggerEvent(event: Omit<WebhookEvent, 'id' | 'timestamp'>): Promise<void> {
    const eventWithMeta: WebhookEvent = {
      ...event,
      id: this.generateId(),
      timestamp: new Date().toISOString()
    }

    // Find matching webhooks
    const matchingWebhooks = Array.from(this.webhooks.values()).filter(webhook => {
      return webhook.active && webhook.events.includes(event.type)
    })

    // Create deliveries for each matching webhook
    for (const webhook of matchingWebhooks) {
      const delivery: WebhookDelivery = {
        id: this.generateId(),
        webhookId: webhook.id!,
        event: eventWithMeta,
        status: 'pending',
        attempts: 0
      }

      this.deliveries.set(delivery.id, delivery)
      this.retryQueue.add(delivery.id)
    }

    this.emit('event:triggered', eventWithMeta)
  }

  // Process webhook deliveries
  private async startProcessing(): Promise<void> {
    if (this.isProcessing) return
    
    this.isProcessing = true
    
    while (this.isProcessing) {
      await this.processDeliveries()
      await this.sleep(1000) // Process every second
    }
  }

  private async processDeliveries(): Promise<void> {
    const pendingDeliveries = Array.from(this.retryQueue)
    
    for (const deliveryId of pendingDeliveries) {
      const delivery = this.deliveries.get(deliveryId)
      if (!delivery) {
        this.retryQueue.delete(deliveryId)
        continue
      }

      // Skip if max attempts reached
      if (delivery.attempts >= 3) {
        delivery.status = 'failed'
        this.retryQueue.delete(deliveryId)
        this.emit('delivery:failed', delivery)
        continue
      }

      await this.attemptDelivery(delivery)
    }
  }

  private async attemptDelivery(delivery: WebhookDelivery): Promise<void> {
    const webhook = this.webhooks.get(delivery.webhookId)
    if (!webhook || !webhook.active) {
      this.retryQueue.delete(delivery.id)
      return
    }

    delivery.attempts++
    delivery.lastAttempt = new Date().toISOString()

    try {
      const response = await fetch(webhook.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Webhook-Event': delivery.event.type,
          'X-Webhook-Signature': this.generateSignature(delivery.event, webhook.secret)
        },
        body: JSON.stringify(delivery.event)
      })

      if (response.ok) {
        delivery.status = 'success'
        delivery.response = await response.json().catch(() => null)
        this.retryQueue.delete(delivery.id)
        this.emit('delivery:success', delivery)
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
    } catch (error: any) {
      delivery.error = error.message
      
      // Retry with exponential backoff
      const retryDelay = Math.min(1000 * Math.pow(2, delivery.attempts), 60000)
      
      setTimeout(() => {
        if (delivery.attempts < 3) {
          this.retryQueue.add(delivery.id)
        }
      }, retryDelay)
      
      this.emit('delivery:error', delivery, error)
    }
  }

  // Generate signature for webhook security
  private generateSignature(event: WebhookEvent, secret?: string): string {
    if (!secret) return ''
    
    // Simple HMAC implementation (in production, use crypto library)
    const data = JSON.stringify(event)
    return `sha256=${this.simpleHash(data + secret)}`
  }

  private simpleHash(str: string): string {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash
    }
    return Math.abs(hash).toString(16)
  }

  // Get webhook status
  getWebhookStatus(webhookId: string): any {
    const webhook = this.webhooks.get(webhookId)
    if (!webhook) return null

    const deliveries = Array.from(this.deliveries.values())
      .filter(d => d.webhookId === webhookId)
      .sort((a, b) => b.event.timestamp.localeCompare(a.event.timestamp))
      .slice(0, 10)

    const stats = {
      total: deliveries.length,
      success: deliveries.filter(d => d.status === 'success').length,
      failed: deliveries.filter(d => d.status === 'failed').length,
      pending: deliveries.filter(d => d.status === 'pending').length
    }

    return {
      webhook,
      stats,
      recentDeliveries: deliveries
    }
  }

  // Get all webhooks
  getAllWebhooks(): WebhookConfig[] {
    return Array.from(this.webhooks.values())
  }

  // Test webhook
  async testWebhook(webhookId: string): Promise<boolean> {
    const testEvent: Omit<WebhookEvent, 'id' | 'timestamp'> = {
      type: 'test',
      data: { message: 'Test webhook delivery' },
      source: 'lithi-dashboard'
    }

    try {
      await this.triggerEvent(testEvent)
      return true
    } catch (error) {
      console.error('Webhook test failed:', error)
      return false
    }
  }

  // Utility methods
  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  // Cleanup
  stopProcessing(): void {
    this.isProcessing = false
  }
}

// Export singleton instance
export const webhookManager = new WebhookManager()

// Common webhook events
export const WebhookEvents = {
  // Order events
  ORDER_CREATED: 'order.created',
  ORDER_UPDATED: 'order.updated',
  ORDER_SHIPPED: 'order.shipped',
  ORDER_DELIVERED: 'order.delivered',
  ORDER_CANCELLED: 'order.cancelled',
  
  // Customer events
  CUSTOMER_CREATED: 'customer.created',
  CUSTOMER_UPDATED: 'customer.updated',
  CUSTOMER_DELETED: 'customer.deleted',
  
  // Product events
  PRODUCT_CREATED: 'product.created',
  PRODUCT_UPDATED: 'product.updated',
  PRODUCT_OUT_OF_STOCK: 'product.out_of_stock',
  
  // Chat events
  CHAT_MESSAGE_RECEIVED: 'chat.message.received',
  CHAT_SESSION_STARTED: 'chat.session.started',
  CHAT_SESSION_ENDED: 'chat.session.ended',
  
  // System events
  SYSTEM_HEALTH_CHECK: 'system.health_check',
  SYSTEM_ERROR: 'system.error',
  SYSTEM_UPDATE: 'system.update'
}