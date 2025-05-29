/**
 * Analytics Funnels API
 * Create and analyze conversion funnels
 */

import { NextRequest, NextResponse } from 'next/server';
import { analytics } from '@/services/analytics/enhanced-analytics';
import { prisma } from '@/lib/prisma';

// GET /api/analytics/funnels - Get funnel analysis
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const funnelId = searchParams.get('funnelId');

    if (!funnelId) {
      // Return all funnels
      const funnels = await prisma.analyticsFunnel.findMany({
        orderBy: { createdAt: 'desc' }
      });

      return NextResponse.json({
        success: true,
        funnels
      });
    }

    // Get specific funnel analysis
    const funnel = await prisma.analyticsFunnel.findUnique({
      where: { id: funnelId }
    });

    if (!funnel) {
      return NextResponse.json(
        { error: 'Funnel not found' },
        { status: 404 }
      );
    }

    // Parse time range
    const timeRange = searchParams.get('startDate') && searchParams.get('endDate') ? {
      start: new Date(searchParams.get('startDate')!),
      end: new Date(searchParams.get('endDate')!)
    } : undefined;

    // Analyze funnel
    const analysis = analytics.analyzeFunnel(funnelId, timeRange);

    // Update cached data
    await prisma.analyticsFunnel.update({
      where: { id: funnelId },
      data: {
        conversionRates: analysis.steps.map(s => ({
          step: s.name,
          rate: s.conversionRate
        })),
        dropoffRates: analysis.steps.map(s => ({
          step: s.name,
          rate: s.dropoffRate
        })),
        lastCalculated: new Date()
      }
    });

    return NextResponse.json({
      success: true,
      funnel,
      analysis
    });
  } catch (error: any) {
    console.error('Error analyzing funnel:', error);
    return NextResponse.json(
      { error: 'Failed to analyze funnel', details: error.message },
      { status: 500 }
    );
  }
}

// POST /api/analytics/funnels - Create new funnel
export async function POST(request: NextRequest) {
  try {
    const { name, steps } = await request.json();

    if (!name || !steps || !Array.isArray(steps) || steps.length === 0) {
      return NextResponse.json(
        { error: 'Name and steps array are required' },
        { status: 400 }
      );
    }

    // Create funnel in analytics service
    const funnelId = analytics.createFunnel(name, steps);

    // Store in database
    const funnel = await prisma.analyticsFunnel.create({
      data: {
        id: funnelId,
        name,
        steps
      }
    });

    return NextResponse.json({
      success: true,
      funnel
    });
  } catch (error: any) {
    console.error('Error creating funnel:', error);
    return NextResponse.json(
      { error: 'Failed to create funnel', details: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/analytics/funnels - Delete funnel
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const funnelId = searchParams.get('funnelId');

    if (!funnelId) {
      return NextResponse.json(
        { error: 'Funnel ID is required' },
        { status: 400 }
      );
    }

    await prisma.analyticsFunnel.delete({
      where: { id: funnelId }
    });

    return NextResponse.json({
      success: true
    });
  } catch (error: any) {
    console.error('Error deleting funnel:', error);
    return NextResponse.json(
      { error: 'Failed to delete funnel', details: error.message },
      { status: 500 }
    );
  }
}