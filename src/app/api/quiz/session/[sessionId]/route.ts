import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Get session data
export async function GET(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  try {
    const sessionId = params.sessionId
    
    const session = await prisma.$queryRaw`
      SELECT * FROM quiz_sessions WHERE id = ${sessionId} LIMIT 1
    ` as Array<{
      id: string
      quiz_id: string
      user_id: string | null
      visitor_id: string
      status: string
      current_step: number
      responses: string | null
      score: number | null
      completion_rate: number | null
      recommendation: string | null
      created_at: string
      updated_at: string
    }>
    
    if (!session.length) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      )
    }
    
    const sessionData = session[0]
    
    return NextResponse.json({
      sessionId: sessionData.id,
      quizId: sessionData.quiz_id,
      currentStep: sessionData.current_step,
      status: sessionData.status,
      responses: sessionData.responses ? JSON.parse(sessionData.responses) : {},
      score: sessionData.score,
      completionRate: sessionData.completion_rate,
      recommendation: sessionData.recommendation ? JSON.parse(sessionData.recommendation) : null
    })
    
  } catch (error) {
    console.error('Error fetching session:', error)
    return NextResponse.json(
      { error: 'Failed to fetch session' },
      { status: 500 }
    )
  }
}

// Update session (save progress)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  try {
    const sessionId = params.sessionId
    const { currentStep, responses, status } = await request.json()
    
    // Update session
    await prisma.$executeRaw`
      UPDATE quiz_sessions 
      SET 
        current_step = ${currentStep},
        responses = ${JSON.stringify(responses)},
        status = ${status || 'in_progress'},
        completion_rate = ${(currentStep / 4) * 100}, -- Assuming 4 questions
        last_activity = datetime('now'),
        updated_at = datetime('now')
      WHERE id = ${sessionId}
    `
    
    // Log progress event
    await prisma.$executeRaw`
      INSERT INTO quiz_analytics_events (
        session_id, event_type, event_data
      ) VALUES (
        ${sessionId},
        'progress_saved',
        ${JSON.stringify({ currentStep, responseCount: Object.keys(responses).length })}
      )
    `
    
    return NextResponse.json({ success: true })
    
  } catch (error) {
    console.error('Error updating session:', error)
    return NextResponse.json(
      { error: 'Failed to update session' },
      { status: 500 }
    )
  }
}