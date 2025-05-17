/**
 * Lithi API Gateway
 * Centralized API gateway for the entire Lithi ecosystem
 */

import axios, { AxiosInstance } from 'axios'
import { getToken, refreshToken } from '@/services/auth/token-manager'

interface ServiceConfig {
  baseURL: string
  timeout?: number
  headers?: Record<string, string>
}

interface Services {
  dashboard: ServiceConfig
  chatbot: ServiceConfig
  copilot: ServiceConfig
  monday: ServiceConfig
}

export class LithiAPIGateway {
  private services: Services
  private instances: Record<string, AxiosInstance> = {}

  constructor() {
    this.services = {
      dashboard: {
        baseURL: process.env.NEXT_PUBLIC_DASHBOARD_API_URL || 'http://localhost:3000/api',
        timeout: 10000
      },
      chatbot: {
        baseURL: process.env.NEXT_PUBLIC_CHATBOT_API_URL || 'http://localhost:3001/api',
        timeout: 30000
      },
      copilot: {
        baseURL: process.env.NEXT_PUBLIC_COPILOT_API_URL || 'http://localhost:3002/api',
        timeout: 10000
      },
      monday: {
        baseURL: 'https://api.monday.com/v2',
        timeout: 10000,
        headers: {
          'Authorization': process.env.MONDAY_API_KEY || '',
          'Content-Type': 'application/json'
        }
      }
    }

    this.initializeInstances()
  }

  private initializeInstances() {
    Object.entries(this.services).forEach(([key, config]) => {
      this.instances[key] = axios.create({
        baseURL: config.baseURL,
        timeout: config.timeout,
        headers: {
          'Content-Type': 'application/json',
          ...(config.headers || {})
        }
      })

      // Add request interceptor for authentication
      this.instances[key].interceptors.request.use(
        async (config) => {
          const token = await getToken()
          if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
          }
          
          // Add service identifier
          config.headers['X-Service-Origin'] = 'lithi-gateway'
          config.headers['X-Service-Target'] = key
          
          return config
        },
        (error) => {
          return Promise.reject(error)
        }
      )

      // Add response interceptor for token refresh
      this.instances[key].interceptors.response.use(
        (response) => response,
        async (error) => {
          const originalRequest = error.config

          if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true
            try {
              const newToken = await refreshToken()
              if (newToken) {
                originalRequest.headers['Authorization'] = `Bearer ${newToken}`
                return this.instances[key](originalRequest)
              }
            } catch (refreshError) {
              // Redirect to login if refresh fails
              if (typeof window !== 'undefined') {
                window.location.href = '/portal/auth/login'
              }
            }
          }

          return Promise.reject(error)
        }
      )
    })
  }

  // Dashboard API methods
  async getDashboardStats() {
    return this.instances.dashboard.get('/stats')
  }

  async getOrders(params?: any) {
    return this.instances.dashboard.get('/orders', { params })
  }

  async createOrder(data: any) {
    return this.instances.dashboard.post('/orders', data)
  }

  // Chatbot API methods
  async sendChatMessage(sessionId: string, message: string) {
    return this.instances.chatbot.post('/chat', {
      sessionId,
      message,
      source: 'dashboard'
    })
  }

  async getChatHistory(sessionId: string) {
    return this.instances.chatbot.get(`/chat/history/${sessionId}`)
  }

  async createChatSession(metadata?: any) {
    return this.instances.chatbot.post('/chat/session', {
      metadata,
      source: 'dashboard'
    })
  }

  // Copilot API methods
  async getCopilotSuggestions(context: any) {
    return this.instances.copilot.post('/suggestions', { context })
  }

  async updateCopilotUserProfile(userId: string, data: any) {
    return this.instances.copilot.put(`/users/${userId}`, data)
  }

  // Monday.com API methods
  async createMondayItem(boardId: string, itemName: string, columnValues: any) {
    const query = `
      mutation {
        create_item (
          board_id: ${boardId}, 
          item_name: "${itemName}", 
          column_values: "${JSON.stringify(columnValues).replace(/"/g, '\\"')}"
        ) {
          id
        }
      }
    `
    return this.instances.monday.post('', { query })
  }

  async getMondayBoard(boardId: string) {
    const query = `
      query {
        boards (ids: [${boardId}]) {
          id
          name
          items {
            id
            name
            column_values {
              id
              text
              value
            }
          }
        }
      }
    `
    return this.instances.monday.post('', { query })
  }

  // Cross-service methods
  async syncUserData(userId: string) {
    try {
      // Get user data from dashboard
      const dashboardUser = await this.instances.dashboard.get(`/users/${userId}`)
      
      // Sync with chatbot
      await this.instances.chatbot.put(`/users/${userId}`, {
        ...dashboardUser.data,
        source: 'dashboard-sync'
      })
      
      // Sync with copilot
      await this.instances.copilot.put(`/users/${userId}`, {
        ...dashboardUser.data,
        source: 'dashboard-sync'
      })
      
      return { success: true, syncedServices: ['dashboard', 'chatbot', 'copilot'] }
    } catch (error) {
      console.error('User sync error:', error)
      throw error
    }
  }

  async broadcastEvent(event: any) {
    const promises = []
    
    // Broadcast to all services
    if (event.targets.includes('chatbot')) {
      promises.push(this.instances.chatbot.post('/events', event))
    }
    
    if (event.targets.includes('copilot')) {
      promises.push(this.instances.copilot.post('/events', event))
    }
    
    if (event.targets.includes('monday')) {
      // Create Monday.com update if needed
      if (event.type === 'order-created') {
        promises.push(this.createMondayItem(
          process.env.MONDAY_ORDERS_BOARD_ID || '',
          event.data.orderNumber,
          event.data
        ))
      }
    }
    
    return Promise.allSettled(promises)
  }

  // Webhook management
  async registerWebhook(service: string, webhook: any) {
    return this.instances[service].post('/webhooks', webhook)
  }

  async unregisterWebhook(service: string, webhookId: string) {
    return this.instances[service].delete(`/webhooks/${webhookId}`)
  }

  // Health checks
  async healthCheck() {
    const checks = await Promise.allSettled([
      this.instances.dashboard.get('/health'),
      this.instances.chatbot.get('/health'),
      this.instances.copilot.get('/health')
    ])

    return {
      dashboard: checks[0].status === 'fulfilled',
      chatbot: checks[1].status === 'fulfilled',
      copilot: checks[2].status === 'fulfilled',
      timestamp: new Date().toISOString()
    }
  }
}

// Export singleton instance
export const lithiGateway = new LithiAPIGateway()

// Export for use in React components
export const useLithiGateway = () => lithiGateway