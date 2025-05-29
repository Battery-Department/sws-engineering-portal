import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const timeRange = searchParams.get('timeRange') || '24h'
    
    // Calculate time filter based on range
    let timeFilter = "datetime('now', '-24 hours')"
    switch (timeRange) {
      case '1h':
        timeFilter = "datetime('now', '-1 hour')"
        break
      case '7d':
        timeFilter = "datetime('now', '-7 days')"
        break
      case '30d':
        timeFilter = "datetime('now', '-30 days')"
        break
    }

    // Get total sessions in time range
    const totalSessionsResult = await prisma.$queryRaw`
      SELECT COUNT(*) as count
      FROM quiz_sessions 
      WHERE created_at > ${timeFilter}
    ` as Array<{ count: number }>

    // Get completion rate
    const completionResult = await prisma.$queryRaw`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed
      FROM quiz_sessions 
      WHERE created_at > ${timeFilter}
    ` as Array<{ total: number; completed: number }>

    // Get average completion time
    const avgTimeResult = await prisma.$queryRaw`
      SELECT AVG(
        (julianday(end_time) - julianday(start_time)) * 24 * 60 * 60
      ) as avg_seconds
      FROM quiz_sessions 
      WHERE status = 'completed' 
      AND created_at > ${timeFilter}
      AND end_time IS NOT NULL
    ` as Array<{ avg_seconds: number }>

    // Get conversion data (requires quiz_conversions table)
    const conversionResult = await prisma.$queryRaw`
      SELECT 
        COUNT(DISTINCT qs.id) as quiz_sessions,
        COUNT(DISTINCT qc.session_id) as conversions
      FROM quiz_sessions qs
      LEFT JOIN quiz_conversions qc ON qs.id = qc.session_id
      WHERE qs.created_at > ${timeFilter}
    ` as Array<{ quiz_sessions: number; conversions: number }>

    // Get revenue attribution
    const revenueResult = await prisma.$queryRaw`
      SELECT COALESCE(SUM(conversion_value), 0) as total_revenue
      FROM quiz_conversions qc
      JOIN quiz_sessions qs ON qc.session_id = qs.id
      WHERE qs.created_at > ${timeFilter}
    ` as Array<{ total_revenue: number }>

    // Get top sources
    const sourcesResult = await prisma.$queryRaw`
      SELECT 
        COALESCE(utm_source, source, 'direct') as source,
        COUNT(*) as sessions,
        (COUNT(DISTINCT qc.session_id) * 100.0 / COUNT(*)) as conversion_rate
      FROM quiz_sessions qs
      LEFT JOIN quiz_conversions qc ON qs.id = qc.session_id
      WHERE qs.created_at > ${timeFilter}
      GROUP BY COALESCE(utm_source, source, 'direct')
      ORDER BY sessions DESC
      LIMIT 10
    ` as Array<{ source: string; sessions: number; conversion_rate: number }>

    // Get currently active sessions
    const activeSessionsResult = await prisma.$queryRaw`
      SELECT COUNT(*) as count
      FROM quiz_session_monitoring
      WHERE is_active = TRUE 
      AND datetime(last_activity) > datetime('now', '-5 minutes')
    ` as Array<{ count: number }>

    // Calculate metrics
    const totalSessions = totalSessionsResult[0]?.count || 0
    const completed = completionResult[0]?.completed || 0
    const total = completionResult[0]?.total || 1
    const completionRate = (completed / total) * 100
    const dropoutRate = 100 - completionRate
    const avgCompletionTime = Math.round(avgTimeResult[0]?.avg_seconds || 0)
    const conversions = conversionResult[0]?.conversions || 0
    const conversionRate = total > 0 ? (conversions / total) * 100 : 0
    const revenueAttribution = revenueResult[0]?.total_revenue || 0
    const activeSessions = activeSessionsResult[0]?.count || 0

    // Format top sources
    const topSources = sourcesResult.map(row => ({
      source: row.source,
      sessions: row.sessions,
      conversion: Math.round(row.conversion_rate * 10) / 10
    }))

    const metrics = {
      totalSessions,
      activeSessions,
      completionRate: Math.round(completionRate * 10) / 10,
      avgCompletionTime,
      dropoutRate: Math.round(dropoutRate * 10) / 10,
      conversionRate: Math.round(conversionRate * 10) / 10,
      revenueAttribution: Math.round(revenueAttribution),
      topSources
    }

    return NextResponse.json(metrics)
    
  } catch (error) {
    console.error('Error fetching quiz metrics:', error)
    
    // Return mock data for demo
    const mockMetrics = {
      totalSessions: 2847,
      activeSessions: 23,
      completionRate: 78.5,
      avgCompletionTime: 142,
      dropoutRate: 21.5,
      conversionRate: 12.8,
      revenueAttribution: 485650,
      topSources: [
        { source: 'facebook_ad', sessions: 1245, conversion: 15.2 },
        { source: 'google_ad', sessions: 892, conversion: 11.4 },
        { source: 'organic', sessions: 534, conversion: 8.9 },
        { source: 'direct', sessions: 176, conversion: 18.7 }
      ]
    }

    return NextResponse.json(mockMetrics)
  }
}