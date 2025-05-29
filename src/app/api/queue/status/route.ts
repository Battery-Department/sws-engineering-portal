import { NextRequest, NextResponse } from 'next/server';
import { contentJobQueue, QUEUE_NAMES } from '@/services/queue/job-queue';
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
    const queueName = searchParams.get('queue');

    if (queueName) {
      // Get specific queue status
      if (!Object.values(QUEUE_NAMES).includes(queueName as any)) {
        return NextResponse.json({ error: 'Invalid queue name' }, { status: 400 });
      }

      const status = await contentJobQueue.getQueueStatus(queueName as any);
      return NextResponse.json({ success: true, status });
    } else {
      // Get all queues health status
      const healthCheck = await contentJobQueue.healthCheck();
      return NextResponse.json({ success: true, health: healthCheck });
    }

  } catch (error) {
    console.error('Queue status error:', error);
    return NextResponse.json(
      { error: 'Failed to get queue status' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
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

    const { action, queueName } = await request.json();

    if (!queueName || !Object.values(QUEUE_NAMES).includes(queueName)) {
      return NextResponse.json({ error: 'Invalid queue name' }, { status: 400 });
    }

    switch (action) {
      case 'pause':
        await contentJobQueue.pauseQueue(queueName);
        return NextResponse.json({ success: true, message: `Queue ${queueName} paused` });

      case 'resume':
        await contentJobQueue.resumeQueue(queueName);
        return NextResponse.json({ success: true, message: `Queue ${queueName} resumed` });

      case 'retry':
        const results = await contentJobQueue.retryFailedJobs(queueName);
        const successful = results.filter(r => r.status === 'fulfilled').length;
        const failed = results.filter(r => r.status === 'rejected').length;
        return NextResponse.json({ 
          success: true, 
          message: `Retried failed jobs: ${successful} successful, ${failed} failed` 
        });

      case 'clean':
        await contentJobQueue.cleanQueue(queueName);
        return NextResponse.json({ success: true, message: `Queue ${queueName} cleaned` });

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

  } catch (error) {
    console.error('Queue action error:', error);
    return NextResponse.json(
      { error: 'Failed to execute queue action' },
      { status: 500 }
    );
  }
}