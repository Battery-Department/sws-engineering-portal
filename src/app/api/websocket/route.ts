/**
 * WebSocket API Route
 * Handles real-time connections for the Lithi ecosystem
 */

import { NextRequest, NextResponse } from 'next/server'

// HTTP route handler (for initial connection info)
export async function GET(request: NextRequest) {
  return NextResponse.json({
    status: 'WebSocket server ready',
    url: process.env.NEXT_PUBLIC_WEBSOCKET_URL || 'ws://localhost:3000',
    info: 'WebSocket connections are handled by a separate server'
  })
}

// Health check endpoint
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Simple echo for health check
    return NextResponse.json({
      status: 'ok',
      echo: body,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    )
  }
}