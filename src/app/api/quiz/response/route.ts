import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { 
      sessionId, 
      questionId, 
      questionType, 
      responseValue, 
      responseTime,
      isSkipped = false 
    } = await request.json()
    
    // Validate required fields
    if (!sessionId || !questionId || !questionType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Save individual response
    await prisma.$executeRaw`
      INSERT INTO quiz_responses (
        session_id, question_id, question_type, response_value, 
        response_time, is_skipped
      ) VALUES (
        ${sessionId},
        ${questionId},
        ${questionType},
        ${JSON.stringify(responseValue)},
        ${responseTime || null},
        ${isSkipped}
      )
    `
    
    // Log response event
    await prisma.$executeRaw`
      INSERT INTO quiz_analytics_events (
        session_id, event_type, event_data
      ) VALUES (
        ${sessionId},
        ${isSkipped ? 'question_skipped' : 'question_answered'},
        ${JSON.stringify({ 
          questionId, 
          questionType, 
          responseTime,
          hasValue: !!responseValue 
        })}
      )
    `
    
    // Update session's last activity
    await prisma.$executeRaw`
      UPDATE quiz_sessions 
      SET last_activity = datetime('now'), updated_at = datetime('now')
      WHERE id = ${sessionId}
    `
    
    return NextResponse.json({ success: true })
    
  } catch (error) {
    console.error('Error saving response:', error)
    return NextResponse.json(
      { error: 'Failed to save response' },
      { status: 500 }
    )
  }
}

// Get responses for a session
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
    
    const responses = await prisma.$queryRaw`
      SELECT question_id, question_type, response_value, response_time, is_skipped, created_at
      FROM quiz_responses 
      WHERE session_id = ${sessionId}
      ORDER BY created_at ASC
    ` as Array<{
      question_id: string
      question_type: string
      response_value: string
      response_time: number | null
      is_skipped: boolean
      created_at: string
    }>
    
    const formattedResponses = responses.map(r => ({
      questionId: r.question_id,
      questionType: r.question_type,
      responseValue: JSON.parse(r.response_value || 'null'),
      responseTime: r.response_time,
      isSkipped: r.is_skipped,
      timestamp: r.created_at
    }))
    
    return NextResponse.json({ responses: formattedResponses })
    
  } catch (error) {
    console.error('Error fetching responses:', error)
    return NextResponse.json(
      { error: 'Failed to fetch responses' },
      { status: 500 }
    )
  }
}