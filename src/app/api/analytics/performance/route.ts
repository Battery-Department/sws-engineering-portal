/**
 * Analytics Performance API
 * Calculate performance scores and get insights
 */

import { NextRequest, NextResponse } from 'next/server';
import { aggregationService } from '@/services/analytics/aggregation';
import { analyticsStorage } from '@/services/analytics/storage';

// GET /api/analytics/performance - Get performance score
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse period
    const period = {
      start: new Date(searchParams.get('startDate') || new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)),
      end: new Date(searchParams.get('endDate') || new Date()),
      granularity: (searchParams.get('granularity') as any) || 'day'
    };

    // Get events for the period
    const events = await analyticsStorage.queryEvents({
      startDate: period.start,
      endDate: period.end
    });

    // Calculate all metrics
    const metrics = await aggregationService.calculateMetrics(events, period);

    // Define benchmarks (these would come from configuration or historical data)
    const benchmarks = {
      active_users: { target: 100, weight: 1 },
      avg_session_duration: { target: 300, weight: 0.8 }, // 5 minutes
      bounce_rate: { target: 0.3, weight: 0.9 }, // 30%
      quiz_completion_rate: { target: 0.7, weight: 1 }, // 70%
      conversion_rate: { target: 0.05, weight: 1.5 }, // 5%
      error_rate: { target: 0.01, weight: 1.2 } // 1%
    };

    // Calculate performance score
    const performanceScore = aggregationService.calculatePerformanceScore(
      metrics,
      benchmarks
    );

    // Get trends for key metrics
    const trends = await Promise.all([
      aggregationService.analyzeTrends(events, 'active_users', 7),
      aggregationService.analyzeTrends(events, 'conversion_rate', 7),
      aggregationService.analyzeTrends(events, 'avg_session_duration', 7)
    ]);

    return NextResponse.json({
      success: true,
      performance: performanceScore,
      metrics,
      trends: {
        activeUsers: trends[0],
        conversionRate: trends[1],
        sessionDuration: trends[2]
      },
      period
    });
  } catch (error: any) {
    console.error('Error calculating performance:', error);
    return NextResponse.json(
      { error: 'Failed to calculate performance', details: error.message },
      { status: 500 }
    );
  }
}

// GET /api/analytics/performance/realtime - Get real-time performance updates
export async function GET_REALTIME(request: NextRequest) {
  try {
    // In a production environment, this would connect to a WebSocket or SSE stream
    // For now, return current metrics
    
    const recentEvents = await analyticsStorage.queryEvents({
      startDate: new Date(Date.now() - 60 * 60 * 1000), // Last hour
      endDate: new Date(),
      limit: 100
    });

    const realtimeMetrics = {
      activeUsers: new Set(recentEvents.map(e => e.userId).filter(Boolean)).size,
      eventsPerMinute: Math.round(recentEvents.length / 60),
      currentSessions: new Set(recentEvents.map(e => e.sessionId)).size,
      lastEventTime: recentEvents[0]?.timestamp || null
    };

    return NextResponse.json({
      success: true,
      realtime: realtimeMetrics,
      timestamp: new Date()
    });
  } catch (error: any) {
    console.error('Error fetching realtime metrics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch realtime metrics', details: error.message },
      { status: 500 }
    );
  }
}