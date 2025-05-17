class ClaudeIntegration {
  initialize() {
    console.log('Claude integration initialized')
  }

  async sendMessage(message: string, context?: string): Promise<string> {
    try {
      // Call the API route instead of using the SDK directly
      const response = await fetch('/api/chat/claude', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          context
        })
      })

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`)
      }

      const data = await response.json()
      return data.content
    } catch (error) {
      console.error('Error calling Claude API:', error)
      
      // Fallback to mock response on error
      return this.getMockResponse(message)
    }
  }

  private getMockResponse(message: string): string {
    const lowerMessage = message.toLowerCase()
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return 'Hello! I\'m Lithi, your battery assistant. How can I help you today?'
    } else if (lowerMessage.includes('battery') || lowerMessage.includes('batteries')) {
      return 'I can help you find the perfect battery solution. Are you looking for batteries for electric vehicles, energy storage systems, or other applications?'
    } else if (lowerMessage.includes('order') || lowerMessage.includes('buy')) {
      return 'I\'d be happy to help you place an order. What type of batteries are you interested in? We have solutions for EVs, energy storage, and more.'
    } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      return 'Our pricing varies based on battery type and quantity. Could you provide more details about your specific needs so I can give you accurate pricing?'
    } else if (lowerMessage.includes('help')) {
      return 'I\'m here to assist you with:\n- Finding the right battery solution\n- Placing orders\n- Tracking existing orders\n- Technical specifications\n- Pricing information\n\nWhat would you like help with?'
    } else if (lowerMessage.includes('track') || lowerMessage.includes('status')) {
      return 'To track your order, please provide your order number or I can show you a list of your recent orders.'
    } else if (lowerMessage.includes('technical') || lowerMessage.includes('specs')) {
      return 'I can provide detailed technical specifications for our battery products. Which product line are you interested in?'
    }
    
    return 'I\'m here to help with your battery needs. Could you please provide more details about what you\'re looking for?'
  }
}

export const claudeIntegration = new ClaudeIntegration()