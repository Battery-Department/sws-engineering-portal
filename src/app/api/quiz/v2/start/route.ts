import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export async function POST(request: NextRequest) {
  try {
    const { source, utm_params, device_info, version = '2.0' } = await request.json()
    
    // Create enhanced quiz session
    const session = await prisma.quizSession.create({
      data: {
        sessionId: generateId(),
        quizId: 'battery-multi-brand-v2',
        source: source || 'direct',
        utmSource: utm_params?.utm_source,
        utmMedium: utm_params?.utm_medium,
        utmCampaign: utm_params?.utm_campaign,
        utmContent: utm_params?.utm_content,
        contentId: utm_params?.content_id,
        campaignId: utm_params?.campaign_id,
        deviceInfo: device_info ? JSON.stringify(device_info) : null,
        landingPage: '/quiz',
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
        userAgent: request.headers.get('user-agent'),
        status: 'in_progress',
        version
      }
    })
    
    return NextResponse.json({
      sessionId: session.sessionId,
      success: true
    })
  } catch (error) {
    console.error('Failed to start quiz session:', error)
    return NextResponse.json(
      { error: 'Failed to start quiz session' },
      { status: 500 }
    )
  }
}