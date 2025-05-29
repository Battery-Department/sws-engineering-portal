/**
 * Analytics Metrics API
 * Calculate and retrieve aggregated metrics
 */

import { NextRequest, NextResponse } from 'next/server';
import { aggregationService } from '@/services/analytics/aggregation';
import { analyticsStorage } from '@/services/analytics/storage';

// GET /api/analytics/metrics - Get aggregated metrics
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse period
    const period = {
      start: new Date(searchParams.get('startDate') || new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)),
      end: new Date(searchParams.get('endDate') || new Date()),
      granularity: (searchParams.get('granularity') as any) || 'day'
    };

    // Parse metric and segment IDs
    const metricIds = searchParams.get('metrics')?.split(',').filter(Boolean);
    const segmentIds = searchParams.get('segments')?.split(',').filter(Boolean);

    // Get events for the period
    const events = await analyticsStorage.queryEvents({
      startDate: period.start,
      endDate: period.end
    });

    // Calculate metrics
    const metrics = await aggregationService.calculateMetrics(
      events,
      period,
      metricIds,
      segmentIds
    );

    return NextResponse.json({
      success: true,
      metrics,
      period
    });
  } catch (error: any) {
    console.error('Error calculating metrics:', error);
    return NextResponse.json(
      { error: 'Failed to calculate metrics', details: error.message },
      { status: 500 }
    );
  }
}

// POST /api/analytics/metrics - Create custom metric
export async function POST(request: NextRequest) {
  try {
    const metric = await request.json();

    if (!metric.id || !metric.name || !metric.type) {
      return NextResponse.json(
        { error: 'Metric id, name, and type are required' },
        { status: 400 }
      );
    }

    aggregationService.addMetric(metric);

    return NextResponse.json({
      success: true,
      metric
    });
  } catch (error: any) {
    console.error('Error creating metric:', error);
    return NextResponse.json(
      { error: 'Failed to create metric', details: error.message },
      { status: 500 }
    );
  }
}