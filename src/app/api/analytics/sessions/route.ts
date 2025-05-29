/**
 * Analytics Sessions API
 * Manage user sessions and session recording
 */

import { NextRequest, NextResponse } from 'next/server';
import { analytics } from '@/services/analytics/enhanced-analytics';
import { prisma } from '@/lib/prisma';

// POST /api/analytics/sessions/start - Start a new session
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, visitorId } = body;

    // Start session in analytics service
    const sessionId = analytics.startSession(userId);

    // Get context from headers
    const userAgent = request.headers.get('user-agent') || undefined;
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip');

    // Parse user agent for device info (simplified)
    const deviceType = userAgent?.includes('Mobile') ? 'mobile' : 
                      userAgent?.includes('Tablet') ? 'tablet' : 'desktop';

    // Create session record in database
    const session = await prisma.analyticsSession.create({
      data: {
        id: sessionId,
        userId,
        visitorId,
        startTime: new Date(),
        deviceType,
        // Add more fields as needed
      }
    });

    return NextResponse.json({
      success: true,
      sessionId,
      session
    });
  } catch (error: any) {
    console.error('Error starting session:', error);
    return NextResponse.json(
      { error: 'Failed to start session', details: error.message },
      { status: 500 }
    );
  }
}

// PUT /api/analytics/sessions/end - End a session
export async function PUT(request: NextRequest) {
  try {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    // End session in analytics service
    analytics.endSession(sessionId);

    // Update session record
    const session = await prisma.analyticsSession.update({
      where: { id: sessionId },
      data: {
        endTime: new Date(),
        duration: {
          increment: 1 // Will be calculated properly in a trigger
        }
      }
    });

    return NextResponse.json({
      success: true,
      session
    });
  } catch (error: any) {
    console.error('Error ending session:', error);
    return NextResponse.json(
      { error: 'Failed to end session', details: error.message },
      { status: 500 }
    );
  }
}

// GET /api/analytics/sessions/recording - Get session recording
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    const recording = analytics.getRecording(sessionId);

    if (!recording) {
      return NextResponse.json(
        { error: 'Session recording not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      sessionId,
      events: recording,
      eventCount: recording.length
    });
  } catch (error: any) {
    console.error('Error fetching recording:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recording', details: error.message },
      { status: 500 }
    );
  }
}

// POST /api/analytics/sessions/recording/start - Start recording
export async function POST(request: NextRequest) {
  try {
    analytics.startRecording();

    return NextResponse.json({
      success: true,
      message: 'Session recording started'
    });
  } catch (error: any) {
    console.error('Error starting recording:', error);
    return NextResponse.json(
      { error: 'Failed to start recording', details: error.message },
      { status: 500 }
    );
  }
}

// POST /api/analytics/sessions/recording/stop - Stop recording
export async function DELETE(request: NextRequest) {
  try {
    analytics.stopRecording();

    return NextResponse.json({
      success: true,
      message: 'Session recording stopped'
    });
  } catch (error: any) {
    console.error('Error stopping recording:', error);
    return NextResponse.json(
      { error: 'Failed to stop recording', details: error.message },
      { status: 500 }
    );
  }
}