/**
 * Event Bus
 * Real-time event system for SWSE ecosystem
 */

import { EventEmitter } from 'events'
import { io, Socket } from 'socket.io-client'
import { swseGateway } from '@/services/api-gateway'
import { tokenManager } from '@/services/auth/token-manager'

interface EventPayload {
  id: string
  type: string
  data: any
  source: string
  timestamp: string
  userId?: string
  sessionId?: string
  metadata?: Record<string, any>
}

interface EventSubscription {
  id: string
  eventType: string | string[]
  handler: (event: EventPayload) => void | Promise<void>
  filter?: (event: EventPayload) => boolean
}

export class SWSEEventBus extends EventEmitter {
  private socket: Socket | null = null
  private subscriptions: Map<string, EventSubscription> = new Map()
  private eventHistory: EventPayload[] = []
  private maxHistorySize = 100
  private connectionStatus = false
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5

  constructor() {
    super()
    this.connect()
  }

  // Connect to WebSocket server
  private async connect(): Promise<void> {
    try {
      const token = await tokenManager.getToken()
      
      this.socket = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL || 'ws://localhost:3000', {
        auth: { token },
        transports: ['websocket'],
        reconnection: true,
        reconnectionAttempts: this.maxReconnectAttempts,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000
      })

      this.setupSocketListeners()
    } catch (error) {
      console.error('Failed to connect to WebSocket:', error)
      this.emit('connection:error', error)
    }
  }

  private setupSocketListeners(): void {
    if (!this.socket) return

    this.socket.on('connect', () => {
      this.connectionStatus = true
      this.reconnectAttempts = 0
      this.emit('connected')
      console.log('Connected to SWSE Event Bus')
      
      // Re-subscribe to events after reconnection
      this.resubscribeToEvents()
    })

    this.socket.on('disconnect', () => {
      this.connectionStatus = false
      this.emit('disconnected')
      console.log('Disconnected from SWSE Event Bus')
    })

    this.socket.on('event', (event: EventPayload) => {
      this.handleIncomingEvent(event)
    })

    this.socket.on('error', (error: any) => {
      console.error('WebSocket error:', error)
      this.emit('error', error)
    })

    this.socket.on('reconnect_attempt', (attempt: number) => {
      this.reconnectAttempts = attempt
      this.emit('reconnecting', attempt)
    })

    this.socket.on('reconnect_failed', () => {
      this.emit('reconnect_failed')
      console.error('Failed to reconnect to WebSocket')
    })
  }

  // Handle incoming events
  private handleIncomingEvent(event: EventPayload): void {
    // Add to history
    this.addToHistory(event)
    
    // Emit locally
    this.emit(event.type, event)
    this.emit('event', event)
    
    // Process subscriptions
    this.processSubscriptions(event)
  }

  // Subscribe to events
  subscribe(
    eventType: string | string[],
    handler: (event: EventPayload) => void | Promise<void>,
    filter?: (event: EventPayload) => boolean
  ): string {
    const subscriptionId = this.generateId()
    
    const subscription: EventSubscription = {
      id: subscriptionId,
      eventType,
      handler,
      filter
    }
    
    this.subscriptions.set(subscriptionId, subscription)
    
    // Notify server of subscription
    if (this.socket && this.connectionStatus) {
      this.socket.emit('subscribe', {
        eventType,
        subscriptionId
      })
    }
    
    return subscriptionId
  }

  // Unsubscribe from events
  unsubscribe(subscriptionId: string): void {
    const subscription = this.subscriptions.get(subscriptionId)
    if (!subscription) return
    
    this.subscriptions.delete(subscriptionId)
    
    // Notify server of unsubscription
    if (this.socket && this.connectionStatus) {
      this.socket.emit('unsubscribe', {
        subscriptionId
      })
    }
  }

  // Publish an event
  async publish(
    type: string,
    data: any,
    options: {
      userId?: string
      sessionId?: string
      metadata?: Record<string, any>
      broadcast?: boolean
      persist?: boolean
    } = {}
  ): Promise<void> {
    const event: EventPayload = {
      id: this.generateId(),
      type,
      data,
      source: 'swse-dashboard',
      timestamp: new Date().toISOString(),
      userId: options.userId,
      sessionId: options.sessionId,
      metadata: options.metadata
    }

    // Emit locally
    this.handleIncomingEvent(event)
    
    // Send to server
    if (this.socket && this.connectionStatus) {
      this.socket.emit('publish', event)
    }
    
    // Broadcast to other services if requested
    if (options.broadcast) {
      await swseGateway.broadcastEvent({
        ...event,
        targets: ['chatbot', 'copilot', 'monday']
      })
    }
    
    // Persist event if requested
    if (options.persist) {
      await this.persistEvent(event)
    }
  }

  // Process subscriptions for an event
  private async processSubscriptions(event: EventPayload): Promise<void> {
    for (const subscription of this.subscriptions.values()) {
      const eventTypes = Array.isArray(subscription.eventType) 
        ? subscription.eventType 
        : [subscription.eventType]
      
      // Check if event type matches
      if (!eventTypes.includes(event.type) && !eventTypes.includes('*')) {
        continue
      }
      
      // Apply filter if provided
      if (subscription.filter && !subscription.filter(event)) {
        continue
      }
      
      // Execute handler
      try {
        await subscription.handler(event)
      } catch (error) {
        console.error('Error in event handler:', error)
        this.emit('handler:error', { error, event, subscription })
      }
    }
  }

  // Re-subscribe to events after reconnection
  private resubscribeToEvents(): void {
    if (!this.socket || !this.connectionStatus) return
    
    for (const subscription of this.subscriptions.values()) {
      this.socket.emit('subscribe', {
        eventType: subscription.eventType,
        subscriptionId: subscription.id
      })
    }
  }

  // Add event to history
  private addToHistory(event: EventPayload): void {
    this.eventHistory.push(event)
    
    // Limit history size
    if (this.eventHistory.length > this.maxHistorySize) {
      this.eventHistory.shift()
    }
  }

  // Get event history
  getHistory(filter?: {
    type?: string
    source?: string
    userId?: string
    sessionId?: string
    startTime?: Date
    endTime?: Date
  }): EventPayload[] {
    return this.eventHistory.filter(event => {
      if (filter?.type && event.type !== filter.type) return false
      if (filter?.source && event.source !== filter.source) return false
      if (filter?.userId && event.userId !== filter.userId) return false
      if (filter?.sessionId && event.sessionId !== filter.sessionId) return false
      
      const eventTime = new Date(event.timestamp)
      if (filter?.startTime && eventTime < filter.startTime) return false
      if (filter?.endTime && eventTime > filter.endTime) return false
      
      return true
    })
  }

  // Persist event to database
  private async persistEvent(event: EventPayload): Promise<void> {
    try {
      await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await tokenManager.getToken()}`
        },
        body: JSON.stringify(event)
      })
    } catch (error) {
      console.error('Failed to persist event:', error)
    }
  }

  // Request-response pattern
  async request(
    type: string,
    data: any,
    timeout: number = 5000
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const requestId = this.generateId()
      const responseType = `${type}.response`
      
      // Set timeout
      const timer = setTimeout(() => {
        this.unsubscribe(subscriptionId)
        reject(new Error(`Request timeout: ${type}`))
      }, timeout)
      
      // Subscribe to response
      const subscriptionId = this.subscribe(
        responseType,
        (event) => {
          if (event.data.requestId === requestId) {
            clearTimeout(timer)
            this.unsubscribe(subscriptionId)
            resolve(event.data.response)
          }
        }
      )
      
      // Send request
      this.publish(type, {
        ...data,
        requestId
      })
    })
  }

  // Stream events
  stream(
    eventType: string | string[],
    onEvent: (event: EventPayload) => void,
    options: {
      filter?: (event: EventPayload) => boolean
      bufferSize?: number
      throttle?: number
    } = {}
  ): () => void {
    const buffer: EventPayload[] = []
    let lastEmit = 0
    
    const subscriptionId = this.subscribe(
      eventType,
      (event) => {
        if (options.filter && !options.filter(event)) return
        
        if (options.bufferSize) {
          buffer.push(event)
          
          if (buffer.length >= options.bufferSize) {
            const events = buffer.splice(0, buffer.length)
            events.forEach(onEvent)
          }
        } else if (options.throttle) {
          const now = Date.now()
          if (now - lastEmit >= options.throttle) {
            onEvent(event)
            lastEmit = now
          }
        } else {
          onEvent(event)
        }
      }
    )
    
    // Return unsubscribe function
    return () => this.unsubscribe(subscriptionId)
  }

  // Connection status
  isConnected(): boolean {
    return this.connectionStatus
  }

  // Disconnect from WebSocket
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
    }
  }

  // Reconnect to WebSocket
  reconnect(): void {
    this.disconnect()
    this.connect()
  }

  // Utility methods
  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }
}

// Export singleton instance
export const eventBus = new SWSEEventBus()

// Common event types
export const EventTypes = {
  // System events
  SYSTEM_READY: 'system.ready',
  SYSTEM_ERROR: 'system.error',
  SYSTEM_UPDATE: 'system.update',
  
  // User events
  USER_LOGIN: 'user.login',
  USER_LOGOUT: 'user.logout',
  USER_UPDATED: 'user.updated',
  USER_DELETED: 'user.deleted',
  
  // Order events
  ORDER_CREATED: 'order.created',
  ORDER_UPDATED: 'order.updated',
  ORDER_SHIPPED: 'order.shipped',
  ORDER_DELIVERED: 'order.delivered',
  ORDER_CANCELLED: 'order.cancelled',
  
  // Chat events
  CHAT_MESSAGE: 'chat.message',
  CHAT_TYPING: 'chat.typing',
  CHAT_SESSION_START: 'chat.session.start',
  CHAT_SESSION_END: 'chat.session.end',
  
  // Notification events
  NOTIFICATION_SENT: 'notification.sent',
  NOTIFICATION_READ: 'notification.read',
  NOTIFICATION_DISMISSED: 'notification.dismissed',
  
  // Analytics events
  ANALYTICS_PAGE_VIEW: 'analytics.page_view',
  ANALYTICS_EVENT: 'analytics.event',
  ANALYTICS_ERROR: 'analytics.error'
}