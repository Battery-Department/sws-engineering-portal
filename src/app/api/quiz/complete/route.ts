import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Battery recommendation engine
function calculateRecommendation(responses: any) {
  const teamSize = responses['project-size'] || 'medium'
  const runtime = responses['daily-runtime'] || 'moderate'
  const tools = responses['primary-tools'] || []
  const budget = responses['budget-range'] || 1000

  // Recommendation logic based on quiz responses
  let recommendation: any

  if (teamSize === 'small') {
    recommendation = {
      packageName: 'Starter Crew Package',
      totalPrice: 1270,
      originalPrice: 1649,
      batteries: [
        { type: '6Ah', quantity: 2, price: 190, runtime: '8 hours' },
        { type: '9Ah', quantity: 2, price: 250, runtime: '13 hours' },
        { type: '15Ah', quantity: 2, price: 490, runtime: '20 hours' }
      ],
      totalRuntime: '64 hours continuous work',
      perfectFor: ['1-3 person teams', 'Residential projects', 'Daily construction work'],
      whyChosen: 'Perfect balance of power and portability for small teams',
      confidenceScore: 94
    }
  } else if (teamSize === 'large') {
    recommendation = {
      packageName: 'Full Workforce Solution',
      totalPrice: 8875,
      originalPrice: 11095,
      batteries: [
        { type: '6Ah', quantity: 15, price: 1425, runtime: '60 hours' },
        { type: '9Ah', quantity: 20, price: 2500, runtime: '130 hours' },
        { type: '15Ah', quantity: 15, price: 3675, runtime: '150 hours' }
      ],
      totalRuntime: '450 hours continuous work',
      perfectFor: ['7-12 person teams', 'General contractors', 'Major projects'],
      whyChosen: 'Enterprise-grade solution for maximum productivity',
      confidenceScore: 96
    }
  } else {
    recommendation = {
      packageName: 'Mid-Size Crew Package',
      totalPrice: 4425,
      originalPrice: 5530,
      batteries: [
        { type: '6Ah', quantity: 10, price: 950, runtime: '40 hours' },
        { type: '9Ah', quantity: 10, price: 1250, runtime: '65 hours' },
        { type: '15Ah', quantity: 5, price: 1225, runtime: '50 hours' }
      ],
      totalRuntime: '224 hours continuous work',
      perfectFor: ['4-6 person teams', 'Commercial projects', 'Professional contractors'],
      whyChosen: 'Most popular choice - optimal power for growing teams',
      confidenceScore: 92
    }
  }

  // Adjust confidence based on additional factors
  if (tools.length >= 3) recommendation.confidenceScore += 2
  if (budget >= recommendation.totalPrice) recommendation.confidenceScore += 3
  if (runtime === 'heavy' || runtime === 'continuous') {
    // Recommend additional batteries for heavy usage
    recommendation.batteries = recommendation.batteries.map((b: any) => ({
      ...b,
      quantity: Math.ceil(b.quantity * 1.2)
    }))
    recommendation.totalPrice = Math.round(recommendation.totalPrice * 1.2)
  }

  return {
    ...recommendation,
    savings: recommendation.originalPrice - recommendation.totalPrice,
    savingsPercentage: Math.round(((recommendation.originalPrice - recommendation.totalPrice) / recommendation.originalPrice) * 100)
  }
}

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json()
    
    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID required' },
        { status: 400 }
      )
    }
    
    // Get session and responses
    const session = await prisma.$queryRaw`
      SELECT * FROM quiz_sessions WHERE id = ${sessionId} LIMIT 1
    ` as Array<{
      id: string
      responses: string | null
      quiz_id: string
      visitor_id: string
    }>
    
    if (!session.length) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      )
    }
    
    const sessionData = session[0]
    const responses = sessionData.responses ? JSON.parse(sessionData.responses) : {}
    
    // Generate recommendation
    const recommendation = calculateRecommendation(responses)
    
    // Calculate completion metrics
    const completionRate = 100 // Quiz is complete
    const score = recommendation.confidenceScore
    
    // Update session as completed
    await prisma.$executeRaw`
      UPDATE quiz_sessions 
      SET 
        status = 'completed',
        completion_rate = ${completionRate},
        score = ${score},
        recommendation = ${JSON.stringify(recommendation)},
        end_time = datetime('now'),
        last_activity = datetime('now'),
        updated_at = datetime('now')
      WHERE id = ${sessionId}
    `
    
    // Log completion event
    await prisma.$executeRaw`
      INSERT INTO quiz_analytics_events (
        session_id, event_type, event_data
      ) VALUES (
        ${sessionId},
        'quiz_completed',
        ${JSON.stringify({ 
          completionRate,
          score,
          recommendationValue: recommendation.totalPrice,
          packageName: recommendation.packageName
        })}
      )
    `
    
    // Log results viewed event
    await prisma.$executeRaw`
      INSERT INTO quiz_analytics_events (
        session_id, event_type, event_data
      ) VALUES (
        ${sessionId},
        'results_viewed',
        ${JSON.stringify({ 
          recommendation: recommendation.packageName,
          value: recommendation.totalPrice
        })}
      )
    `
    
    return NextResponse.json({
      sessionId,
      recommendation,
      completionRate,
      score,
      status: 'completed'
    })
    
  } catch (error) {
    console.error('Error completing quiz:', error)
    return NextResponse.json(
      { error: 'Failed to complete quiz' },
      { status: 500 }
    )
  }
}

// Get completion data for a session
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
    
    const session = await prisma.$queryRaw`
      SELECT recommendation, score, completion_rate, status, end_time
      FROM quiz_sessions 
      WHERE id = ${sessionId} 
      LIMIT 1
    ` as Array<{
      recommendation: string | null
      score: number | null
      completion_rate: number | null
      status: string
      end_time: string | null
    }>
    
    if (!session.length) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      )
    }
    
    const sessionData = session[0]
    
    if (sessionData.status !== 'completed' || !sessionData.recommendation) {
      return NextResponse.json(
        { error: 'Quiz not completed' },
        { status: 400 }
      )
    }
    
    return NextResponse.json({
      recommendation: JSON.parse(sessionData.recommendation),
      score: sessionData.score,
      completionRate: sessionData.completion_rate,
      completedAt: sessionData.end_time
    })
    
  } catch (error) {
    console.error('Error fetching completion data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch completion data' },
      { status: 500 }
    )
  }
}