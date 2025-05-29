import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('sessionId')
    
    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID required' },
        { status: 400 }
      )
    }
    
    // Get session with all data
    const session = await prisma.quizSession.findUnique({
      where: { sessionId },
      include: {
        responses: true,
        interactions: true,
        conversions: true
      }
    })
    
    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      )
    }
    
    // Generate recommendations based on session data
    const recommendations = generateDetailedRecommendations(session)
    
    return NextResponse.json({
      session: {
        ...session,
        responses: undefined, // Remove raw responses from client
        interactions: undefined // Remove raw interactions
      },
      recommendations,
      leadScore: session.leadQualityScore || 0.5
    })
  } catch (error) {
    console.error('Failed to get results:', error)
    return NextResponse.json(
      { error: 'Failed to get results' },
      { status: 500 }
    )
  }
}

function generateDetailedRecommendations(session: any) {
  const responses = session.responses.reduce((acc: any, resp: any) => {
    acc[resp.questionId] = resp.responseValue
    return acc
  }, {})
  
  const recommendations: any = {
    products: [],
    totalSavings: 0,
    features: []
  }
  
  if (session.userType === 'professional') {
    // Professional recommendations
    const crewSize = session.crewSize || 4
    const usage = responses['usage-intensity'] || 'moderate'
    
    // Base battery recommendation
    let batteryCapacity = '6.0Ah'
    let batteryQuantity = crewSize * 2 // 2 per person minimum
    
    if (usage === 'heavy' || usage === 'extreme') {
      batteryCapacity = '9.0Ah'
      batteryQuantity = crewSize * 3 // 3 per person for heavy use
    }
    
    recommendations.products.push({
      id: 'battery-pack',
      type: 'battery',
      name: `${session.selectedBrand?.toUpperCase()} ${batteryCapacity} Battery ${batteryQuantity}-Pack`,
      capacity: batteryCapacity,
      quantity: batteryQuantity,
      originalPrice: batteryQuantity * 149,
      discountedPrice: Math.round(batteryQuantity * 149 * 0.85), // 15% fleet discount
      features: [
        'Cold weather rated',
        '3-year commercial warranty',
        'Fast charging technology'
      ]
    })
    
    // Gang charger for crews
    if (crewSize > 2) {
      recommendations.products.push({
        id: 'gang-charger',
        type: 'charger',
        name: '6-Bay Rapid Charging Station',
        quantity: 1,
        originalPrice: 399,
        discountedPrice: 299,
        features: [
          'Charge 6 batteries simultaneously',
          'Smart charging prevents overcharge',
          'Wall mountable'
        ]
      })
    }
    
    // Calculate savings
    recommendations.totalSavings = recommendations.products.reduce((sum: number, product: any) => {
      return sum + (product.originalPrice - product.discountedPrice)
    }, 0)
    
    // Professional features
    recommendations.features = [
      'Fleet management portal access',
      'Volume pricing tiers',
      'Net 30 payment terms',
      'Dedicated account manager'
    ]
  } else {
    // DIY recommendations
    const toolCount = responses['current-tools'] || '1-2'
    
    recommendations.products.push({
      id: 'starter-kit',
      type: 'battery',
      name: `${session.selectedBrand?.toUpperCase()} 4.0Ah Battery Starter Kit`,
      capacity: '4.0Ah',
      quantity: 2,
      originalPrice: 196,
      discountedPrice: 149,
      features: [
        'Perfect for weekend projects',
        '45-minute quick charge',
        '3-year warranty'
      ]
    })
    
    recommendations.totalSavings = 47
    
    recommendations.features = [
      'Free shipping on orders $99+',
      'Easy returns within 30 days',
      'How-to guides included',
      'Member rewards program'
    ]
  }
  
  return recommendations
}