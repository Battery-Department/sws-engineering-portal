/**
 * Analytics Events API
 * Track and query analytics events
 */

import { NextRequest, NextResponse } from 'next/server';
import { analytics } from '@/services/analytics/enhanced-analytics';
import { analyticsStorage } from '@/services/analytics/storage';
import { DATA_POINTS } from '@/services/analytics/data-points';

// POST /api/analytics/events - Track an event
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { eventName, eventData, dataPoints, context } = body;

    if (!eventName) {
      return NextResponse.json(
        { error: 'Event name is required' },
        { status: 400 }
      );
    }

    // Get user context from session/auth
    const userId = request.headers.get('x-user-id') || undefined;
    const sessionId = request.headers.get('x-session-id') || undefined;

    // Track event
    const eventId = analytics.trackEvent(
      eventName,
      eventData,
      {
        ...dataPoints,
        [DATA_POINTS.USER_ID.id]: userId,
        [DATA_POINTS.SESSION_ID.id]: sessionId
      },
      {
        ...context,
        ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
        userAgent: request.headers.get('user-agent') || undefined
      }
    );

    return NextResponse.json({ 
      success: true, 
      eventId 
    });
  } catch (error: any) {
    console.error('Error tracking event:', error);
    return NextResponse.json(
      { error: 'Failed to track event', details: error.message },
      { status: 500 }
    );
  }
}

// GET /api/analytics/events - Query events
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse query options
    const options = {
      startDate: searchParams.get('startDate') 
        ? new Date(searchParams.get('startDate')!) 
        : undefined,
      endDate: searchParams.get('endDate')
        ? new Date(searchParams.get('endDate')!)
        : undefined,
      userId: searchParams.get('userId') || undefined,
      sessionId: searchParams.get('sessionId') || undefined,
      eventNames: searchParams.get('eventNames')?.split(',').filter(Boolean),
      eventCategories: searchParams.get('eventCategories')?.split(',').filter(Boolean),
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 100,
      offset: searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : 0,
      orderBy: (searchParams.get('orderBy') as any) || 'timestamp',
      orderDirection: (searchParams.get('orderDirection') as any) || 'desc'
    };

    // Parse data point filters
    const dataPointFilters = [];
    for (const [key, value] of searchParams.entries()) {
      if (key.startsWith('dp_')) {
        const [, dataPoint, operator] = key.split('_');
        dataPointFilters.push({
          dataPoint,
          operator: operator as any,
          value
        });
      }
    }

    if (dataPointFilters.length > 0) {
      options.dataPointFilters = dataPointFilters;
    }

    const events = await analyticsStorage.queryEvents(options);

    return NextResponse.json({
      success: true,
      events,
      count: events.length,
      hasMore: events.length === options.limit
    });
  } catch (error: any) {
    console.error('Error querying events:', error);
    return NextResponse.json(
      { error: 'Failed to query events', details: error.message },
      { status: 500 }
    );
  }
}