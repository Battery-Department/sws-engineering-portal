import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { 
      sessionId, 
      conversionType, 
      conversionValue, 
      productIds,
      attributionWindow = 30 
    } = await request.json()
    
    if (!sessionId || !conversionType) {
      return NextResponse.json(
        { error: 'Session ID and conversion type required' },
        { status: 400 }
      )
    }

    // Record conversion
    await prisma.$executeRaw`
      INSERT INTO quiz_conversions (
        session_id, conversion_type, conversion_value, product_ids, attribution_window
      ) VALUES (
        ${sessionId},
        ${conversionType},
        ${conversionValue || null},
        ${JSON.stringify(productIds || [])},
        ${attributionWindow}
      )
    `

    // Update session status if it's a purchase
    if (conversionType === 'purchase') {
      await prisma.$executeRaw`
        UPDATE quiz_sessions 
        SET status = 'converted', updated_at = datetime('now')
        WHERE id = ${sessionId}
      `
    }

    // Get session data for Meta attribution (if configured)
    const sessionData = await prisma.$queryRaw`
      SELECT utm_source, utm_campaign, utm_content, content_id, campaign_id
      FROM quiz_sessions 
      WHERE id = ${sessionId}
      LIMIT 1
    ` as Array<{
      utm_source: string | null
      utm_campaign: string | null
      utm_content: string | null
      content_id: string | null
      campaign_id: string | null
    }>

    // Send to Meta Conversions API (if configured)
    if (process.env.META_PIXEL_ID && process.env.META_ACCESS_TOKEN && sessionData.length > 0) {
      try {
        await sendToMetaConversionsAPI({
          sessionId,
          conversionType,
          conversionValue,
          sessionData: sessionData[0]
        })
      } catch (metaError) {
        console.error('Meta Conversions API error:', metaError)
        // Don't fail the main request if Meta fails
      }
    }

    return NextResponse.json({ success: true })
    
  } catch (error) {
    console.error('Error recording conversion:', error)
    return NextResponse.json(
      { error: 'Failed to record conversion' },
      { status: 500 }
    )
  }
}

async function sendToMetaConversionsAPI(data: {
  sessionId: string
  conversionType: string
  conversionValue?: number
  sessionData: any
}) {
  if (!process.env.META_PIXEL_ID || !process.env.META_ACCESS_TOKEN) {
    console.log('Meta Conversions API not configured - would send:', data)
    return
  }

  const eventName = mapConversionTypeToMetaEvent(data.conversionType)
  const eventTime = Math.floor(Date.now() / 1000)

  const eventData = {
    event_name: eventName,
    event_time: eventTime,
    action_source: 'website',
    event_source_url: `${process.env.NEXT_PUBLIC_BASE_URL}/quiz`,
    user_data: {
      client_user_agent: 'Quiz-System',
      fbc: data.sessionData.facebook_click_id || undefined,
      fbp: data.sessionData.facebook_browser_id || undefined
    },
    custom_data: {
      content_ids: [data.sessionData.content_id].filter(Boolean),
      content_type: 'product',
      value: data.conversionValue || 0,
      currency: 'USD',
      quiz_session_id: data.sessionId
    }
  }

  const payload = {
    data: [eventData],
    test_event_code: process.env.META_TEST_EVENT_CODE || undefined
  }

  const response = await fetch(
    `https://graph.facebook.com/v18.0/${process.env.META_PIXEL_ID}/events`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.META_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }
  )

  if (!response.ok) {
    throw new Error(`Meta API error: ${response.status} ${await response.text()}`)
  }

  const result = await response.json()
  console.log('Meta Conversions API success:', result)
}

function mapConversionTypeToMetaEvent(conversionType: string): string {
  const mapping: Record<string, string> = {
    'cart_add': 'AddToCart',
    'purchase': 'Purchase',
    'lead_form': 'Lead',
    'phone_call': 'Contact'
  }
  return mapping[conversionType] || 'CustomEvent'
}