import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { headers } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const { quizId, userId, source, utmParams, deviceInfo } = await request.json()
    
    // Get client IP and user agent
    const headersList = headers()
    const userAgent = headersList.get('user-agent') || ''
    const forwarded = headersList.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : headersList.get('x-real-ip') || 'unknown'
    
    // Generate visitor ID for anonymous users
    const visitorId = userId || `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    // Create quiz session
    const session = await prisma.$executeRaw`
      INSERT INTO quiz_sessions (
        quiz_id, user_id, visitor_id, status, current_step, 
        source, utm_source, utm_medium, utm_campaign, device_info,
        start_time, last_activity
      ) VALUES (
        ${quizId || 'battery-assessment-quiz'},
        ${userId},
        ${visitorId},
        'in_progress',
        0,
        ${source || 'direct'},
        ${utmParams?.utm_source || null},
        ${utmParams?.utm_medium || null},
        ${utmParams?.utm_campaign || null},
        ${JSON.stringify(deviceInfo || {})},
        datetime('now'),
        datetime('now')
      )
    `
    
    // Get the session ID (SQLite specific)
    const sessionResult = await prisma.$queryRaw`
      SELECT id FROM quiz_sessions 
      WHERE visitor_id = ${visitorId} 
      ORDER BY created_at DESC 
      LIMIT 1
    ` as Array<{ id: string }>
    
    const sessionId = sessionResult[0]?.id
    
    if (!sessionId) {
      throw new Error('Failed to create quiz session')
    }
    
    // Log quiz start event
    await prisma.$executeRaw`
      INSERT INTO quiz_analytics_events (
        session_id, event_type, event_data, page_url, referrer, user_agent
      ) VALUES (
        ${sessionId},
        'quiz_started',
        ${JSON.stringify({ quizId, source, utmParams })},
        ${request.url},
        ${headersList.get('referer') || ''},
        ${userAgent}
      )
    `
    
    // Get quiz questions
    const quiz = await prisma.$queryRaw`
      SELECT questions, settings FROM quizzes 
      WHERE id = ${quizId || 'battery-assessment-quiz'} AND status = 'active'
      LIMIT 1
    ` as Array<{ questions: string; settings: string }>
    
    if (!quiz.length) {
      return NextResponse.json(
        { error: 'Quiz not found or inactive' },
        { status: 404 }
      )
    }
    
    const questions = JSON.parse(quiz[0].questions)
    const settings = JSON.parse(quiz[0].settings || '{}')
    
    return NextResponse.json({
      sessionId,
      visitorId,
      questions,
      settings,
      currentStep: 0
    })
    
  } catch (error) {
    console.error('Error starting quiz:', error)
    return NextResponse.json(
      { error: 'Failed to start quiz' },
      { status: 500 }
    )
  }
}

// Get quiz by ID
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const quizId = searchParams.get('id') || 'battery-assessment-quiz'
    
    const quiz = await prisma.$queryRaw`
      SELECT id, title, description, questions, settings 
      FROM quizzes 
      WHERE id = ${quizId} AND status = 'active'
      LIMIT 1
    ` as Array<{ 
      id: string
      title: string
      description: string
      questions: string
      settings: string 
    }>
    
    if (!quiz.length) {
      return NextResponse.json(
        { error: 'Quiz not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      id: quiz[0].id,
      title: quiz[0].title,
      description: quiz[0].description,
      questions: JSON.parse(quiz[0].questions),
      settings: JSON.parse(quiz[0].settings || '{}')
    })
    
  } catch (error) {
    console.error('Error fetching quiz:', error)
    return NextResponse.json(
      { error: 'Failed to fetch quiz' },
      { status: 500 }
    )
  }
}