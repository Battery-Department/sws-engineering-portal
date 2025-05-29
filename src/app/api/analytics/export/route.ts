/**
 * Analytics Export API
 * Export analytics data in various formats
 */

import { NextRequest, NextResponse } from 'next/server';
import { analyticsStorage } from '@/services/analytics/storage';
import { aggregationService } from '@/services/analytics/aggregation';

// GET /api/analytics/export - Export analytics data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse export parameters
    const format = searchParams.get('format') || 'json';
    const type = searchParams.get('type') || 'events'; // events, metrics, report
    
    const options = {
      startDate: searchParams.get('startDate') 
        ? new Date(searchParams.get('startDate')!) 
        : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      endDate: searchParams.get('endDate')
        ? new Date(searchParams.get('endDate')!)
        : new Date(),
      userId: searchParams.get('userId') || undefined,
      sessionId: searchParams.get('sessionId') || undefined,
      eventNames: searchParams.get('eventNames')?.split(',').filter(Boolean),
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 10000
    };

    let data: string;
    let filename: string;
    let contentType: string;

    switch (type) {
      case 'events':
        // Export raw events
        data = await analyticsStorage.exportData(options, format as any);
        filename = `analytics-events-${Date.now()}.${format}`;
        break;

      case 'metrics':
        // Export aggregated metrics
        const events = await analyticsStorage.queryEvents(options);
        const period = {
          start: options.startDate,
          end: options.endDate,
          granularity: 'day' as const
        };
        const metrics = await aggregationService.calculateMetrics(events, period);
        
        if (format === 'csv') {
          // Convert metrics to CSV
          const headers = ['metric', 'value', 'trend_direction', 'trend_percentage'];
          const rows = metrics.map(m => [
            m.metric.name,
            m.value,
            m.trend?.direction || '',
            m.trend?.percentage || ''
          ]);
          data = [headers, ...rows].map(row => row.join(',')).join('\n');
        } else {
          data = JSON.stringify(metrics, null, 2);
        }
        filename = `analytics-metrics-${Date.now()}.${format}`;
        break;

      case 'report':
        // Generate comprehensive report
        const reportEvents = await analyticsStorage.queryEvents(options);
        const reportPeriod = {
          start: options.startDate,
          end: options.endDate,
          granularity: 'day' as const
        };
        
        const [reportMetrics, stats] = await Promise.all([
          aggregationService.calculateMetrics(reportEvents, reportPeriod),
          analyticsStorage.getStats()
        ]);

        const report = {
          generated: new Date(),
          period: reportPeriod,
          summary: stats,
          metrics: reportMetrics,
          topEvents: stats.topEvents
        };

        data = JSON.stringify(report, null, 2);
        filename = `analytics-report-${Date.now()}.json`;
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid export type' },
          { status: 400 }
        );
    }

    // Set content type
    switch (format) {
      case 'csv':
        contentType = 'text/csv';
        break;
      case 'json':
      default:
        contentType = 'application/json';
    }

    // Return file download response
    return new NextResponse(data, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-cache'
      }
    });
  } catch (error: any) {
    console.error('Error exporting analytics:', error);
    return NextResponse.json(
      { error: 'Failed to export analytics', details: error.message },
      { status: 500 }
    );
  }
}

// POST /api/analytics/export/schedule - Schedule regular exports
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, type, format, schedule, recipients, filters } = body;

    if (!name || !type || !schedule || !recipients) {
      return NextResponse.json(
        { error: 'Name, type, schedule, and recipients are required' },
        { status: 400 }
      );
    }

    // Store scheduled export in database
    const report = await prisma.analyticsReport.create({
      data: {
        name,
        type: 'scheduled',
        definition: {
          exportType: type,
          format: format || 'json',
          filters
        },
        schedule,
        recipients,
        format: format || 'pdf',
        nextRun: calculateNextRun(schedule) // Helper function to calculate next run
      }
    });

    return NextResponse.json({
      success: true,
      report
    });
  } catch (error: any) {
    console.error('Error scheduling export:', error);
    return NextResponse.json(
      { error: 'Failed to schedule export', details: error.message },
      { status: 500 }
    );
  }
}

// Helper function to calculate next run time from cron expression
function calculateNextRun(cronExpression: string): Date {
  // Simplified - in production use a proper cron parser
  const now = new Date();
  if (cronExpression.includes('daily')) {
    now.setDate(now.getDate() + 1);
    now.setHours(0, 0, 0, 0);
  } else if (cronExpression.includes('weekly')) {
    now.setDate(now.getDate() + 7);
    now.setHours(0, 0, 0, 0);
  } else if (cronExpression.includes('monthly')) {
    now.setMonth(now.getMonth() + 1);
    now.setDate(1);
    now.setHours(0, 0, 0, 0);
  }
  return now;
}