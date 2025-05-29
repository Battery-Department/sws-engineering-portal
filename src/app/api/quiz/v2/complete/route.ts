import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { sessionId, contactInfo } = await request.json()
    
    // Get session with all responses
    const session = await prisma.quizSession.findUnique({
      where: { sessionId },
      include: { 
        responses: true,
        interactions: true
      }
    })
    
    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      )
    }
    
    // Calculate lead quality score based on various factors
    let leadScore = 0.5 // Base score
    
    // Professional users get higher score
    if (session.userType === 'professional') {
      leadScore += 0.2
    }
    
    // Business email adds to score
    if (contactInfo.email && !contactInfo.email.includes('gmail.com')) {
      leadScore += 0.1
    }
    
    // Company name adds to score
    if (contactInfo.companyName) {
      leadScore += 0.1
    }
    
    // Crew size impacts score
    if (session.crewSize && session.crewSize > 5) {
      leadScore += 0.1
    }
    
    // Cap at 1.0
    leadScore = Math.min(leadScore, 1.0)
    
    // Update session with contact info and completion
    await prisma.quizSession.update({
      where: { sessionId },
      data: {
        status: 'completed',
        userName: contactInfo.fullName,
        email: contactInfo.email,
        phoneNumber: contactInfo.phone,
        companyName: contactInfo.companyName,
        leadQualityScore: leadScore,
        completionRate: 1.0,
        endTime: new Date()
      }
    })
    
    // Create quiz conversion
    await prisma.quizConversion.create({
      data: {
        sessionId,
        conversionType: 'lead',
        conversionValue: leadScore,
        metadata: {
          userType: session.userType,
          selectedBrand: session.selectedBrand,
          trade: session.userSegment
        }
      }
    })
    
    // Generate personalized recommendations based on responses
    const recommendations = await generateRecommendations(session)
    
    return NextResponse.json({
      success: true,
      results_url: `/quiz/results?session=${sessionId}`,
      recommendations: recommendations.summary,
      leadScore
    })
  } catch (error) {
    console.error('Failed to complete quiz:', error)
    return NextResponse.json(
      { error: 'Failed to complete quiz' },
      { status: 500 }
    )
  }
}

async function generateRecommendations(session: any) {
  // Extract key data from responses
  const responses = session.responses.reduce((acc: any, resp: any) => {
    acc[resp.questionId] = resp.responseValue
    return acc
  }, {})
  
  // Base recommendations on user type and selections
  const recommendations = {
    summary: {
      brand: session.selectedBrand,
      userType: session.userType,
      primaryProducts: [] as any[]
    }
  }
  
  // Professional recommendations
  if (session.userType === 'professional') {
    const usage = responses['usage-intensity'] || 'moderate'
    
    if (usage === 'heavy' || usage === 'extreme') {
      recommendations.summary.primaryProducts.push({
        type: 'high-capacity',
        capacity: '9.0Ah or higher',
        quantity: session.crewSize || 4,
        reason: 'For all-day heavy use'
      })
    } else {
      recommendations.summary.primaryProducts.push({
        type: 'standard',
        capacity: '5.0Ah-6.0Ah',
        quantity: session.crewSize || 2,
        reason: 'For standard daily use'
      })
    }
    
    // Add charger recommendations
    if (session.crewSize && session.crewSize > 2) {
      recommendations.summary.primaryProducts.push({
        type: 'gang-charger',
        capacity: '6-bay',
        quantity: 1,
        reason: 'Charge multiple batteries simultaneously'
      })
    }
  } else {
    // DIY recommendations
    const toolCount = responses['current-tools'] || '1-2'
    
    recommendations.summary.primaryProducts.push({
      type: 'starter-pack',
      capacity: '4.0Ah',
      quantity: 2,
      reason: 'Perfect for weekend projects'
    })
  }
  
  return recommendations
}