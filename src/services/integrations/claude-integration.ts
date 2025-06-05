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
      return 'Hello! I\'m Claude, your SWSE engineering assistant. How can I help you today?'
    } else if (lowerMessage.includes('steam') || lowerMessage.includes('engineering')) {
      return 'I can help you with SWSE engineering solutions. Are you looking for steam systems, industrial equipment, heritage restoration, or manufacturing services?'
    } else if (lowerMessage.includes('order') || lowerMessage.includes('buy')) {
      return 'I\'d be happy to help you place an order. What type of engineering services are you interested in? We offer steam systems, industrial solutions, heritage projects, and manufacturing services.'
    } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      return 'Our pricing varies based on project scope and engineering requirements. Could you provide more details about your specific needs so I can give you accurate pricing?'
    } else if (lowerMessage.includes('help')) {
      return 'I\'m here to assist you with:\n- Engineering consultations\n- Project planning\n- Service bookings\n- Technical specifications\n- Pricing information\n\nWhat would you like help with?'
    } else if (lowerMessage.includes('track') || lowerMessage.includes('status')) {
      return 'To track your order, please provide your order number or I can show you a list of your recent orders.'
    } else if (lowerMessage.includes('technical') || lowerMessage.includes('specs')) {
      return 'I can provide detailed technical specifications for our engineering services. Which service area are you interested in?'
    }
    
    return 'I\'m here to help with your engineering needs. Could you please provide more details about what you\'re looking for?'
  }
}

export const claudeIntegration = new ClaudeIntegration()