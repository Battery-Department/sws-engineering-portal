/**
 * Analytics Segments API
 * Create and manage user segments
 */

import { NextRequest, NextResponse } from 'next/server';
import { aggregationService } from '@/services/analytics/aggregation';
import { analyticsStorage } from '@/services/analytics/storage';
import { prisma } from '@/lib/prisma';

// GET /api/analytics/segments - Get segments
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const segmentId = searchParams.get('segmentId');

    if (!segmentId) {
      // Return all segments
      const segments = await prisma.analyticsSegment.findMany({
        orderBy: { createdAt: 'desc' }
      });

      return NextResponse.json({
        success: true,
        segments
      });
    }

    // Get specific segment
    const segment = await prisma.analyticsSegment.findUnique({
      where: { id: segmentId }
    });

    if (!segment) {
      return NextResponse.json(
        { error: 'Segment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      segment
    });
  } catch (error: any) {
    console.error('Error fetching segments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch segments', details: error.message },
      { status: 500 }
    );
  }
}

// POST /api/analytics/segments - Create new segment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, type, conditions, autoGenerate } = body;

    if (autoGenerate) {
      // Auto-generate behavior segments
      const events = await analyticsStorage.queryEvents({
        startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
        endDate: new Date()
      });

      const generatedSegments = aggregationService.createBehaviorSegments(events);

      // Store all generated segments
      const segments = await Promise.all(
        generatedSegments.map(segment =>
          prisma.analyticsSegment.create({
            data: {
              name: segment.name,
              type: 'behavioral',
              conditions: segment.conditions
            }
          })
        )
      );

      return NextResponse.json({
        success: true,
        segments
      });
    }

    // Manual segment creation
    if (!name || !type || !conditions) {
      return NextResponse.json(
        { error: 'Name, type, and conditions are required' },
        { status: 400 }
      );
    }

    // Add to aggregation service
    aggregationService.addSegment({ id: name.toLowerCase().replace(/\s+/g, '_'), name, conditions });

    // Store in database
    const segment = await prisma.analyticsSegment.create({
      data: {
        name,
        type,
        conditions
      }
    });

    return NextResponse.json({
      success: true,
      segment
    });
  } catch (error: any) {
    console.error('Error creating segment:', error);
    return NextResponse.json(
      { error: 'Failed to create segment', details: error.message },
      { status: 500 }
    );
  }
}

// PUT /api/analytics/segments - Update segment
export async function PUT(request: NextRequest) {
  try {
    const { id, name, type, conditions } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'Segment ID is required' },
        { status: 400 }
      );
    }

    const updateData: any = {};
    if (name) updateData.name = name;
    if (type) updateData.type = type;
    if (conditions) updateData.conditions = conditions;

    const segment = await prisma.analyticsSegment.update({
      where: { id },
      data: updateData
    });

    return NextResponse.json({
      success: true,
      segment
    });
  } catch (error: any) {
    console.error('Error updating segment:', error);
    return NextResponse.json(
      { error: 'Failed to update segment', details: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/analytics/segments - Delete segment
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const segmentId = searchParams.get('segmentId');

    if (!segmentId) {
      return NextResponse.json(
        { error: 'Segment ID is required' },
        { status: 400 }
      );
    }

    await prisma.analyticsSegment.delete({
      where: { id: segmentId }
    });

    return NextResponse.json({
      success: true
    });
  } catch (error: any) {
    console.error('Error deleting segment:', error);
    return NextResponse.json(
      { error: 'Failed to delete segment', details: error.message },
      { status: 500 }
    );
  }
}