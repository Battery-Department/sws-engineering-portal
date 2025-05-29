/**
 * Analytics Attribution API
 * Track and analyze marketing attribution
 */

import { NextRequest, NextResponse } from 'next/server';
import { analytics } from '@/services/analytics/enhanced-analytics';
import { prisma } from '@/lib/prisma';

// GET /api/analytics/attribution - Get attribution report
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Get attribution report from analytics service
    const attributions = analytics.getAttributionReport(userId);

    // Get stored attributions from database
    const storedAttributions = await prisma.analyticsAttribution.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({
      success: true,
      userId,
      attributions: attributions.length > 0 ? attributions : storedAttributions
    });
  } catch (error: any) {
    console.error('Error fetching attribution:', error);
    return NextResponse.json(
      { error: 'Failed to fetch attribution', details: error.message },
      { status: 500 }
    );
  }
}

// POST /api/analytics/attribution - Set attribution model
export async function POST(request: NextRequest) {
  try {
    const { userId, model } = await request.json();

    if (!userId || !model) {
      return NextResponse.json(
        { error: 'User ID and model are required' },
        { status: 400 }
      );
    }

    const validModels = ['firstTouch', 'lastTouch', 'linear', 'timeDecay', 'positionBased'];
    if (!validModels.includes(model)) {
      return NextResponse.json(
        { error: `Invalid model. Must be one of: ${validModels.join(', ')}` },
        { status: 400 }
      );
    }

    // Update attribution model
    analytics.setAttributionModel(userId, model);

    return NextResponse.json({
      success: true,
      userId,
      model
    });
  } catch (error: any) {
    console.error('Error setting attribution model:', error);
    return NextResponse.json(
      { error: 'Failed to set attribution model', details: error.message },
      { status: 500 }
    );
  }
}

// GET /api/analytics/attribution/channels - Get channel performance
export async function GET_CHANNELS(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate') 
      ? new Date(searchParams.get('startDate')!) 
      : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const endDate = searchParams.get('endDate')
      ? new Date(searchParams.get('endDate')!)
      : new Date();

    // Aggregate attribution by channel
    const channelPerformance = await prisma.$queryRaw`
      SELECT 
        json_extract(channelWeights, '$.channel') as channel,
        SUM(json_extract(channelWeights, '$.weight') * conversionValue) as attributedRevenue,
        COUNT(DISTINCT userId) as uniqueUsers,
        COUNT(*) as conversions
      FROM AnalyticsAttribution
      WHERE convertedAt >= ${startDate}
        AND convertedAt <= ${endDate}
        AND conversionValue IS NOT NULL
      GROUP BY channel
      ORDER BY attributedRevenue DESC
    `;

    return NextResponse.json({
      success: true,
      channels: channelPerformance,
      period: { startDate, endDate }
    });
  } catch (error: any) {
    console.error('Error fetching channel performance:', error);
    return NextResponse.json(
      { error: 'Failed to fetch channel performance', details: error.message },
      { status: 500 }
    );
  }
}