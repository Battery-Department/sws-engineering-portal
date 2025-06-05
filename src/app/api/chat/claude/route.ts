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

    const systemPrompt = `You are SWSE Assistant, an AI assistant for South West Steam Engineering. You help customers with:
- Finding the right engineering solutions for heritage railways, industrial equipment, and CAD design
- Managing engineering projects and tracking progress
- Technical specifications and engineering requirements
- Project quotes and cost estimates
- Support and technical assistance

Be helpful, professional, and knowledgeable about engineering services. Keep responses concise and focused.

When providing information with multiple categories or sections, format your response as follows:
- Use a brief introductory paragraph
- For category headers, end them with a colon (:)
- Provide detailed information after each category header
- Use bullet points for lists when appropriate
- Bold important numbers and technical specifications

Example format:
Here's an overview of our engineering services:

Steam Locomotive Restoration:
Complete boiler overhauls include inspection, repair, and certification...

CAD Design Services:
Our experienced engineers provide detailed 3D modeling and technical drawings...

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
    return 'Hello! I\'m your SWSE engineering assistant. How can I help you with your engineering project today?'
  } else if (lowerMessage.includes('steam') || lowerMessage.includes('locomotive')) {
    return 'I can help you with steam locomotive restoration services. Are you looking for boiler repairs, mechanical overhauls, or complete restoration?'
  } else if (lowerMessage.includes('order') || lowerMessage.includes('buy')) {
    return 'I\'d be happy to help you start a project. What type of engineering services are you interested in? We offer steam restoration, CAD design, and industrial repair services.'
  } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
    return 'Our pricing varies based on service type and project scope. Could you provide more details about your specific engineering needs so I can give you accurate pricing?'
  } else if (lowerMessage.includes('help')) {
    return 'I\'m here to assist you with:\n- Finding the right engineering solution\n- Starting new projects\n- Tracking project progress\n- Technical specifications\n- Cost estimates\n\nWhat would you like help with?'
  } else if (lowerMessage.includes('track') || lowerMessage.includes('status')) {
    return 'To track your order, please provide your order number or I can show you a list of your recent orders.'
  } else if (lowerMessage.includes('technical') || lowerMessage.includes('specs')) {
    return 'I can provide detailed technical specifications for our engineering services. Which service are you interested in - steam restoration, CAD design, or industrial repair?'
  }
  
  return 'I\'m here to help with your engineering needs. Could you please provide more details about your project requirements?'
}