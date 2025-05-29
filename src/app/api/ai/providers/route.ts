import { NextRequest, NextResponse } from 'next/server';
import { aiProviderManager } from '@/services/ai-providers';
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const token = request.cookies.get('auth-token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    } catch (error) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    switch (action) {
      case 'status':
        const status = await aiProviderManager.getProviderStatus();
        return NextResponse.json({ success: true, providers: status });

      case 'usage':
        const usage = await aiProviderManager.getUsageStats();
        return NextResponse.json({ success: true, usage });

      case 'health':
        const health = await aiProviderManager.runHealthCheck();
        return NextResponse.json({ success: true, health });

      default:
        // Default: return provider status
        const providers = await aiProviderManager.getProviderStatus();
        return NextResponse.json({ success: true, providers });
    }

  } catch (error) {
    console.error('AI providers API error:', error);
    return NextResponse.json(
      { error: 'Failed to get provider information' },
      { status: 500 }
    );
  }
}