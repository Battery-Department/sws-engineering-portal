import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

export async function POST(request: NextRequest) {
  try {
    const { message, context } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    const apiKey = process.env.ANTHROPIC_API_KEY
    
    if (!apiKey) {
      console.error('No Anthropic API key found')
      // Return mock response if no API key
      return NextResponse.json({
        content: getMockResponse(message)
      })
    }

    console.log('Initializing Anthropic client with key length:', apiKey.length)
    
    const anthropic = new Anthropic({
      apiKey: apiKey,
    })

    const systemPrompt = `You are Lithi, an AI assistant for a battery technology company. You help customers with:
- Finding the right battery solutions for EVs, energy storage, and other applications
- Placing and tracking orders
- Technical specifications and comparisons
- Pricing and quotes
- Support and troubleshooting

Be helpful, professional, and knowledgeable about battery technology. Keep responses concise and focused.

When providing information with multiple categories or sections, format your response as follows:
- Use a brief introductory paragraph
- For category headers, end them with a colon (:)
- Provide detailed information after each category header
- Use bullet points for lists when appropriate
- Bold important numbers and technical specifications

Example format:
Here's an overview of our battery solutions:

Power tools (drills, saws, etc.):
The 9Ah FLEXVOLT battery provides excellent runtime for professional tools...

Outdoor equipment (blowers, chainsaws, etc.):
These high-drain tools typically run for 30-60 minutes...

${context ? `\n\nContext: ${context}` : ''}`

    console.log('Sending message to Claude:', message.substring(0, 50) + '...')
    
    const completion = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 500,
      temperature: 0.7,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: message
        }
      ]
    })

    console.log('Received response from Claude')

    // Extract text content from the response
    const textContent = completion.content
      .filter(block => block.type === 'text')
      .map(block => (block as any).text)
      .join('\n')

    return NextResponse.json({
      content: textContent || 'I apologize, but I couldn\'t generate a response. Please try again.'
    })
    
  } catch (error) {
    console.error('Error in Claude API route:', error)
    
    // Return a generic error response
    return NextResponse.json({
      content: 'I apologize, but I\'m having trouble connecting. Please try again in a moment.'
    })
  }
}

function getMockResponse(message: string): string {
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