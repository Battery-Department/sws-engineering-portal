import { NextRequest, NextResponse } from 'next/server';
import { 
  contentJobQueue, 
  JobPriority,
  ImageProcessingJobData,
  AIGenerationJobData,
  MetaPublishingJobData,
  AnalyticsJobData 
} from '@/services/queue/job-queue';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const token = request.cookies.get('auth-token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    } catch (error) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { type, data, priority = JobPriority.NORMAL } = await request.json();

    if (!type || !data) {
      return NextResponse.json({ error: 'Job type and data required' }, { status: 400 });
    }

    let job;

    switch (type) {
      case 'image_processing':
        const imageData: ImageProcessingJobData = {
          ...data,
          userId: decoded.userId,
        };
        job = await contentJobQueue.addImageProcessingJob(imageData, priority);
        break;

      case 'ai_generation':
        const aiData: AIGenerationJobData = {
          ...data,
          userId: decoded.userId,
        };
        job = await contentJobQueue.addAIGenerationJob(aiData, priority);
        break;

      case 'meta_publishing':
        const metaData: MetaPublishingJobData = {
          ...data,
          userId: decoded.userId,
        };
        job = await contentJobQueue.addMetaPublishingJob(metaData, priority);
        break;

      case 'analytics':
        const analyticsData: AnalyticsJobData = {
          ...data,
          userId: decoded.userId,
        };
        const delay = data.delay || 0;
        job = await contentJobQueue.addAnalyticsJob(analyticsData, delay);
        break;

      default:
        return NextResponse.json({ error: 'Invalid job type' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      job: {
        id: job.id,
        name: job.name,
        queueName: job.queueName,
        data: job.data,
        opts: job.opts,
        timestamp: job.timestamp,
      }
    });

  } catch (error) {
    console.error('Job submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit job' },
      { status: 500 }
    );
  }
}

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
    const jobId = searchParams.get('jobId');

    if (queueName && jobId) {
      // Get specific job status
      const jobStatus = await contentJobQueue.getJobStatus(queueName as any, jobId);
      return NextResponse.json({ success: true, job: jobStatus });
    } else {
      // Get job summary for all queues
      const healthCheck = await contentJobQueue.healthCheck();
      return NextResponse.json({ success: true, queues: healthCheck.queues });
    }

  } catch (error) {
    console.error('Get jobs error:', error);
    return NextResponse.json(
      { error: 'Failed to get job information' },
      { status: 500 }
    );
  }
}