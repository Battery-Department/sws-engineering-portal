/**
 * SWSE Integration Service
 * Connects the SWSE chatbot with the dashboard system
 */

import { swseGateway } from '@/services/api-gateway'
import { eventBus, EventTypes } from '@/services/events/event-bus'
import { webhookManager, WebhookEvents } from '@/services/webhooks/webhook-manager'
import { tokenManager } from '@/services/auth/token-manager'
import { claudeIntegration } from './claude-integration'

interface ChatContext {
  userId?: string
  sessionId?: string
  customerData?: any
  orderHistory?: any[]
  currentPage?: string
  metadata?: Record<string, any>
}

export class SWSEIntegration {
  private isInitialized = false
  private chatContext: ChatContext = {}

  async initialize(): Promise<void> {
    if (this.isInitialized) return

    // Initialize Claude integration
    claudeIntegration.initialize()
    
    // Subscribe to relevant events
    this.setupEventSubscriptions()
    
    // Register webhooks
    await this.registerWebhooks()
    
    // Initialize chat context
    await this.initializeChatContext()
    
    this.isInitialized = true
    console.log('SWSE integration initialized')
  }

  private setupEventSubscriptions(): void {
    // User events
    eventBus.subscribe(EventTypes.USER_LOGIN, async (event) => {
      await this.handleUserLogin(event.data)
    })

    eventBus.subscribe(EventTypes.USER_LOGOUT, async (event) => {
      await this.handleUserLogout(event.data)
    })

    // Order events
    eventBus.subscribe(EventTypes.ORDER_CREATED, async (event) => {
      await this.notifyChatbot('order_created', event.data)
    })

    eventBus.subscribe(EventTypes.ORDER_UPDATED, async (event) => {
      await this.notifyChatbot('order_updated', event.data)
    })

    // Chat events from chatbot
    eventBus.subscribe(EventTypes.CHAT_MESSAGE, async (event) => {
      if (event.source === 'swse-chatbot') {
        await this.handleChatbotMessage(event.data)
      }
    })

    // Page navigation events
    eventBus.subscribe(EventTypes.ANALYTICS_PAGE_VIEW, async (event) => {
      this.updateChatContext({ currentPage: event.data.page })
    })
  }

  private async registerWebhooks(): Promise<void> {
    // Register webhook for chatbot events
    await webhookManager.registerWebhook({
      url: process.env.NEXT_PUBLIC_DASHBOARD_URL + '/api/webhooks/chatbot',
      events: [
        'chat.message',
        'chat.session.started',
        'chat.session.ended',
        'chat.action.required'
      ],
      secret: process.env.WEBHOOK_SECRET,
      active: true,
      metadata: {
        service: 'swse-chatbot'
      }
    })
  }

  private async initializeChatContext(): Promise<void> {
    const user = await tokenManager.getTokenData()
    if (user) {
      this.chatContext = {
        userId: user.userId,
        customerData: await this.fetchCustomerData(user.userId)
      }
    }
  }

  // Handle user login
  private async handleUserLogin(userData: any): Promise<void> {
    this.chatContext = {
      userId: userData.id,
      customerData: userData.customer,
      sessionId: this.generateSessionId()
    }

    // Create chat session
    const session = await swseGateway.createChatSession({
      userId: userData.id,
      userEmail: userData.email,
      userName: userData.name,
      source: 'swse-dashboard',
      metadata: {
        customerType: userData.customer?.type || 'individual',
        companyName: userData.customer?.companyName
      }
    })

    this.chatContext.sessionId = session.data.sessionId

    // Send welcome message
    await this.sendChatMessage('Login successful. How can I help you today?', 'system')
  }

  // Handle user logout
  private async handleUserLogout(userData: any): Promise<void> {
    if (this.chatContext.sessionId) {
      // End chat session
      await swseGateway.sendChatMessage(
        this.chatContext.sessionId,
        'User logged out'
      )
    }

    this.chatContext = {}
  }

  // Handle messages from chatbot
  private async handleChatbotMessage(message: any): Promise<void> {
    // Check if message requires action
    if (message.requiresAction) {
      await this.handleChatbotAction(message.action)
    }

    // Update UI if needed
    if (message.updateUI) {
      eventBus.publish('ui.update', {
        component: message.component,
        data: message.data
      })
    }

    // Handle navigation requests
    if (message.navigate) {
      eventBus.publish('navigation.request', {
        path: message.navigate.path,
        params: message.navigate.params
      })
    }
  }

  // Handle chatbot actions
  private async handleChatbotAction(action: any): Promise<void> {
    switch (action.type) {
      case 'create_order':
        await this.createOrderFromChat(action.data)
        break
      
      case 'update_profile':
        await this.updateCustomerProfile(action.data)
        break
      
      case 'schedule_callback':
        await this.scheduleCallback(action.data)
        break
      
      case 'search_products':
        await this.searchProducts(action.data)
        break
      
      default:
        console.warn('Unknown chatbot action:', action.type)
    }
  }

  // Create order from chat
  private async createOrderFromChat(orderData: any): Promise<void> {
    try {
      const order = await swseGateway.createOrder({
        ...orderData,
        source: 'chatbot',
        chatSessionId: this.chatContext.sessionId
      })

      await this.sendChatMessage(
        `Order ${order.data.orderNumber} created successfully!`,
        'system'
      )

      // Navigate to order details
      eventBus.publish('navigation.request', {
        path: `/portal/orders/${order.data.id}`
      })
    } catch (error) {
      await this.sendChatMessage(
        'Sorry, there was an error creating your order. Please try again.',
        'system'
      )
    }
  }

  // Update customer profile
  private async updateCustomerProfile(profileData: any): Promise<void> {
    try {
      await swseGateway.updateCopilotUserProfile(
        this.chatContext.userId!,
        profileData
      )

      await this.sendChatMessage(
        'Your profile has been updated successfully!',
        'system'
      )
    } catch (error) {
      await this.sendChatMessage(
        'Sorry, there was an error updating your profile.',
        'system'
      )
    }
  }

  // Schedule callback
  private async scheduleCallback(callbackData: any): Promise<void> {
    try {
      // Create Monday.com item for callback
      await swseGateway.createMondayItem(
        process.env.MONDAY_CALLBACKS_BOARD_ID!,
        `Callback for ${this.chatContext.customerData?.name}`,
        {
          phone: callbackData.phone,
          preferred_time: callbackData.preferredTime,
          reason: callbackData.reason,
          customer_id: this.chatContext.userId
        }
      )

      await this.sendChatMessage(
        `Callback scheduled for ${callbackData.preferredTime}. We'll call you at ${callbackData.phone}.`,
        'system'
      )
    } catch (error) {
      await this.sendChatMessage(
        'Sorry, there was an error scheduling your callback.',
        'system'
      )
    }
  }

  // Search products
  private async searchProducts(searchData: any): Promise<void> {
    try {
      const results = await swseGateway.getDashboardStats() // Replace with actual product search
      
      await this.sendChatMessage(
        `Found ${results.data.length} products matching your search.`,
        'system',
        { results: results.data }
      )
    } catch (error) {
      await this.sendChatMessage(
        'Sorry, there was an error searching products.',
        'system'
      )
    }
  }

  // Send message to chatbot
  async sendChatMessage(
    message: string,
    role: 'user' | 'system' = 'user',
    metadata?: any
  ): Promise<{ content: string }> {
    if (!this.chatContext.sessionId) {
      this.chatContext.sessionId = this.generateSessionId()
    }

    try {
      // Create context for Claude
      const context = this.buildChatContext()
      
      // Use Claude integration to get response
      const responseContent = await claudeIntegration.sendMessage(message, context)

      // Emit event for UI update (if needed)
      eventBus.publish(EventTypes.CHAT_MESSAGE, {
        sessionId: this.chatContext.sessionId,
        message: responseContent,
        role: 'assistant',
        timestamp: new Date().toISOString()
      })

      return { content: responseContent }
    } catch (error) {
      console.error('Error sending chat message:', error)
      return { content: 'I apologize, but I\'m having trouble connecting. Please try again in a moment.' }
    }
  }
  
  // Build context string for Claude
  private buildChatContext(): string {
    const contextParts = []
    
    if (this.chatContext.userId) {
      contextParts.push(`User ID: ${this.chatContext.userId}`)
    }
    
    if (this.chatContext.customerData) {
      contextParts.push(`Customer: ${JSON.stringify(this.chatContext.customerData)}`)
    }
    
    if (this.chatContext.currentPage) {
      contextParts.push(`Current Page: ${this.chatContext.currentPage}`)
    }
    
    return contextParts.join('\n')
  }

  // Notify chatbot of events
  private async notifyChatbot(eventType: string, eventData: any): Promise<void> {
    if (!this.chatContext.sessionId) return

    await swseGateway.sendChatMessage(
      this.chatContext.sessionId,
      `Event: ${eventType}`
    )
  }

  // Update chat context
  updateChatContext(updates: Partial<ChatContext>): void {
    this.chatContext = {
      ...this.chatContext,
      ...updates
    }
  }

  // Get chat context
  getChatContext(): ChatContext {
    return this.chatContext
  }

  // Fetch customer data
  private async fetchCustomerData(userId: string): Promise<any> {
    try {
      const response = await swseGateway.getDashboardStats() // Replace with actual customer data endpoint
      return response.data
    } catch (error) {
      console.error('Error fetching customer data:', error)
      return null
    }
  }

  // Generate session ID
  private generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  // Check if chatbot is available
  async isChatbotAvailable(): Promise<boolean> {
    try {
      const health = await swseGateway.healthCheck()
      return health.chatbot
    } catch {
      return false
    }
  }

  // Get chat history
  async getChatHistory(): Promise<any[]> {
    if (!this.chatContext.sessionId) return []

    try {
      const response = await swseGateway.getChatHistory(this.chatContext.sessionId)
      return response.data.messages
    } catch (error) {
      console.error('Error fetching chat history:', error)
      return []
    }
  }
}

// Export singleton instance
export const swseIntegration = new SWSEIntegration()

// Initialize on import
if (typeof window !== 'undefined') {
  swseIntegration.initialize().catch(console.error)
}