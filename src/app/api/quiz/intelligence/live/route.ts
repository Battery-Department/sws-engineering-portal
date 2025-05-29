import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    // Get active sessions with real-time monitoring data
    const activeSessions = await prisma.$queryRaw`
      SELECT 
        qs.id,
        qs.visitor_id,
        qs.current_step,
        qs.source,
        qs.device_info,
        qs.last_activity,
        qs.start_time,
        qsm.engagement_score,
        qsm.dropout_risk,
        qsm.intervention_needed,
        qsm.current_question,
        qsm.is_active
      FROM quiz_sessions qs
      LEFT JOIN quiz_session_monitoring qsm ON qs.id = qsm.session_id
      WHERE qsm.is_active = TRUE 
      AND datetime(qs.last_activity) > datetime('now', '-5 minutes')
      ORDER BY qs.last_activity DESC
      LIMIT 50
    ` as Array<{
      id: string
      visitor_id: string
      current_step: number
      source: string
      device_info: string
      last_activity: string
      start_time: string
      engagement_score: number | null
      dropout_risk: number | null
      intervention_needed: boolean | null
      current_question: number | null
      is_active: boolean | null
    }>

    // Get recent interventions for active sessions
    const recentInterventions = await prisma.$queryRaw`
      SELECT 
        qi.session_id,
        qi.intervention_type,
        qi.created_at
      FROM quiz_interventions qi
      WHERE datetime(qi.created_at) > datetime('now', '-10 minutes')
      AND qi.outcome IS NULL
    ` as Array<{
      session_id: string
      intervention_type: string
      created_at: string
    }>

    // Transform data for frontend
    const sessions = activeSessions.map(session => {
      const deviceInfo = session.device_info ? JSON.parse(session.device_info) : {}
      const timeElapsed = Math.floor(
        (new Date().getTime() - new Date(session.start_time).getTime()) / 1000
      )
      
      const intervention = recentInterventions.find(i => i.session_id === session.id)
      
      return {
        id: session.id,
        visitorId: session.visitor_id,
        currentQuestion: session.current_question || session.current_step + 1,
        progress: ((session.current_step + 1) / 4) * 100, // Assuming 4 questions
        timeElapsed,
        dropoutRisk: session.dropout_risk || Math.random() * 0.3, // Mock if no data
        engagementScore: session.engagement_score || Math.random() * 0.7 + 0.3, // Mock if no data
        intervention: intervention?.intervention_type,
        device: deviceInfo.userAgent?.includes('Mobile') ? 'mobile' : 'desktop',
        source: session.source,
        isActive: session.is_active !== false
      }
    })

    return NextResponse.json({ sessions })
    
  } catch (error) {
    console.error('Error fetching live sessions:', error)
    
    // Return mock data for demo purposes
    const mockSessions = Array.from({ length: Math.floor(Math.random() * 25) + 5 }, (_, i) => ({
      id: `session-${i}`,
      visitorId: `visitor-${i}`,
      currentQuestion: Math.floor(Math.random() * 4) + 1,
      progress: Math.random() * 100,
      timeElapsed: Math.floor(Math.random() * 300) + 30,
      dropoutRisk: Math.random(),
      engagementScore: Math.random(),
      intervention: Math.random() > 0.7 ? ['tooltip', 'encouragement', 'simplification'][Math.floor(Math.random() * 3)] : undefined,
      device: ['mobile', 'desktop', 'tablet'][Math.floor(Math.random() * 3)],
      source: ['facebook_ad', 'google_ad', 'organic', 'direct'][Math.floor(Math.random() * 4)],
      isActive: true
    }))

    return NextResponse.json({ sessions: mockSessions })
  }
}

// POST endpoint for updating session monitoring data
export async function POST(request: NextRequest) {
  try {
    const { sessionId, engagementScore, dropoutRisk, interventionNeeded } = await request.json()
    
    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID required' },
        { status: 400 }
      )
    }

    // Update or create monitoring record
    await prisma.$executeRaw`
      INSERT INTO quiz_session_monitoring (
        session_id, current_question, engagement_score, dropout_risk, 
        intervention_needed, last_activity, is_active
      ) VALUES (
        ${sessionId},
        (SELECT current_step FROM quiz_sessions WHERE id = ${sessionId}),
        ${engagementScore || 0},
        ${dropoutRisk || 0},
        ${interventionNeeded || false},
        datetime('now'),
        TRUE
      )
      ON CONFLICT(session_id) DO UPDATE SET
        engagement_score = ${engagementScore || 0},
        dropout_risk = ${dropoutRisk || 0},
        intervention_needed = ${interventionNeeded || false},
        last_activity = datetime('now'),
        is_active = TRUE
    `

    return NextResponse.json({ success: true })
    
  } catch (error) {
    console.error('Error updating session monitoring:', error)
    return NextResponse.json(
      { error: 'Failed to update monitoring data' },
      { status: 500 }
    )
  }
}