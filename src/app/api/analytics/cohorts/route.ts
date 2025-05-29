/**
 * Analytics Cohorts API
 * Create and analyze user cohorts
 */

import { NextRequest, NextResponse } from 'next/server';
import { analytics } from '@/services/analytics/enhanced-analytics';
import { prisma } from '@/lib/prisma';

// GET /api/analytics/cohorts - Get cohort analysis
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const cohortId = searchParams.get('cohortId');

    if (!cohortId) {
      // Return all cohorts
      const cohorts = await prisma.analyticsCohort.findMany({
        orderBy: { createdAt: 'desc' }
      });

      return NextResponse.json({
        success: true,
        cohorts
      });
    }

    // Get specific cohort metrics
    const cohort = await prisma.analyticsCohort.findUnique({
      where: { id: cohortId }
    });

    if (!cohort) {
      return NextResponse.json(
        { error: 'Cohort not found' },
        { status: 404 }
      );
    }

    // Get cohort metrics
    const metrics = analytics.getCohortMetrics(cohortId);

    // Update cached data
    await prisma.analyticsCohort.update({
      where: { id: cohortId },
      data: {
        userCount: metrics.size,
        retentionData: metrics.retention,
        engagementData: { score: metrics.engagement },
        revenueData: { total: metrics.revenue },
        lastUpdated: new Date()
      }
    });

    return NextResponse.json({
      success: true,
      cohort,
      metrics
    });
  } catch (error: any) {
    console.error('Error analyzing cohort:', error);
    return NextResponse.json(
      { error: 'Failed to analyze cohort', details: error.message },
      { status: 500 }
    );
  }
}

// POST /api/analytics/cohorts - Create new cohort
export async function POST(request: NextRequest) {
  try {
    const { name, definition } = await request.json();

    if (!name || !definition) {
      return NextResponse.json(
        { error: 'Name and definition are required' },
        { status: 400 }
      );
    }

    // Create cohort in analytics service
    const cohortId = analytics.createCohort(name, definition);

    // Get initial metrics
    const metrics = analytics.getCohortMetrics(cohortId);

    // Store in database
    const cohort = await prisma.analyticsCohort.create({
      data: {
        id: cohortId,
        name,
        definition,
        userCount: metrics.size,
        retentionData: metrics.retention,
        engagementData: { score: metrics.engagement },
        revenueData: { total: metrics.revenue },
        lastUpdated: new Date()
      }
    });

    return NextResponse.json({
      success: true,
      cohort
    });
  } catch (error: any) {
    console.error('Error creating cohort:', error);
    return NextResponse.json(
      { error: 'Failed to create cohort', details: error.message },
      { status: 500 }
    );
  }
}

// PUT /api/analytics/cohorts - Update cohort
export async function PUT(request: NextRequest) {
  try {
    const { id, name, definition } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'Cohort ID is required' },
        { status: 400 }
      );
    }

    const updateData: any = {};
    if (name) updateData.name = name;
    if (definition) updateData.definition = definition;

    const cohort = await prisma.analyticsCohort.update({
      where: { id },
      data: updateData
    });

    return NextResponse.json({
      success: true,
      cohort
    });
  } catch (error: any) {
    console.error('Error updating cohort:', error);
    return NextResponse.json(
      { error: 'Failed to update cohort', details: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/analytics/cohorts - Delete cohort
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const cohortId = searchParams.get('cohortId');

    if (!cohortId) {
      return NextResponse.json(
        { error: 'Cohort ID is required' },
        { status: 400 }
      );
    }

    await prisma.analyticsCohort.delete({
      where: { id: cohortId }
    });

    return NextResponse.json({
      success: true
    });
  } catch (error: any) {
    console.error('Error deleting cohort:', error);
    return NextResponse.json(
      { error: 'Failed to delete cohort', details: error.message },
      { status: 500 }
    );
  }
}