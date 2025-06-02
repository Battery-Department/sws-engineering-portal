import { Queue, Worker, Job, QueueEvents } from 'bullmq';
import IORedis from 'ioredis';
import { EventEmitter } from 'events';

// Vercel KV Redis connection - make it optional for build
let connection: IORedis | null = null;

try {
  if (process.env.KV_URL || process.env.NODE_ENV !== 'production') {
    connection = new IORedis(process.env.KV_URL || 'redis://localhost:6379', {
      maxRetriesPerRequest: 3,
      retryStrategy: (times) => Math.min(times * 50, 2000),
      enableOfflineQueue: false,
      lazyConnect: true,
    });
  }
} catch (error) {
  console.warn('Redis connection failed, running without queue support:', error);
}

// Job types and their data interfaces
export interface ImageProcessingJobData {
  baselineAssetId: string;
  userId: string;
  formats: string[];
  options: {
    quality?: number;
    watermark?: {
      text?: string;
      position?: string;
    };
  };
}

export interface AIGenerationJobData {
  userId: string;
  type: 'image' | 'text' | 'optimization';
  provider: 'stable_diffusion' | 'dall_e' | 'midjourney' | 'claude';
  prompt: string;
  baselineAssetIds?: string[];
  parameters: {
    style?: string;
    aspectRatio?: string;
    quality?: string;
    iterations?: number;
  };
  priority?: number;
}

export interface MetaPublishingJobData {
  contentItemId: string;
  userId: string;
  platform: 'facebook' | 'instagram' | 'meta_ads';
  campaignId?: string;
  targetAudience?: {
    age_range?: [number, number];
    locations?: string[];
    interests?: string[];
  };
  budget?: {
    daily?: number;
    total?: number;
  };
}

export interface AnalyticsJobData {
  contentItemId: string;
  platform: string;
  campaignId: string;
  userId: string;
}

// Job priorities
export enum JobPriority {
  LOW = 1,
  NORMAL = 5,
  HIGH = 10,
  URGENT = 20,
}

// Queue names
export const QUEUE_NAMES = {
  IMAGE_PROCESSING: 'image-processing',
  AI_GENERATION: 'ai-generation',
  META_PUBLISHING: 'meta-publishing',
  ANALYTICS: 'analytics',
  NOTIFICATIONS: 'notifications',
} as const;

type QueueName = typeof QUEUE_NAMES[keyof typeof QUEUE_NAMES];

export class ContentJobQueue extends EventEmitter {
  private queues: Map<QueueName, Queue> = new Map();
  private workers: Map<QueueName, Worker> = new Map();
  private queueEvents: Map<QueueName, QueueEvents> = new Map();
  private isInitialized = false;

  constructor() {
    super();
    this.initialize();
  }

  private async initialize() {
    if (this.isInitialized) return;

    try {
      // Check if Redis connection exists
      if (!connection) {
        console.warn('⚠️ Job queue disabled - no Redis connection');
        return;
      }

      // Test Redis connection
      await connection.ping();
      console.log('✅ Connected to Vercel KV Redis');

      // Initialize all queues
      this.initializeQueues();
      this.initializeWorkers();
      this.initializeEventListeners();

      this.isInitialized = true;
      this.emit('ready');
    } catch (error) {
      console.error('❌ Failed to initialize job queue:', error);
      this.emit('error', error);
    }
  }

  private initializeQueues() {
    if (!connection) return;
    
    Object.values(QUEUE_NAMES).forEach(queueName => {
      const queue = new Queue(queueName, {
        connection: connection as IORedis,
        defaultJobOptions: {
          removeOnComplete: 100, // Keep last 100 completed jobs
          removeOnFail: 50,      // Keep last 50 failed jobs
          attempts: 3,
          backoff: {
            type: 'exponential',
            delay: 2000,
          },
        },
      });

      this.queues.set(queueName, queue);

      // Initialize queue events for monitoring
      const queueEvents = new QueueEvents(queueName, { connection });
      this.queueEvents.set(queueName, queueEvents);
    });
  }

  private initializeWorkers() {
    // Image Processing Worker
    const imageWorker = new Worker(
      QUEUE_NAMES.IMAGE_PROCESSING,
      async (job: Job<ImageProcessingJobData>) => {
        return this.processImageJob(job);
      },
      {
        connection,
        concurrency: 5, // Process 5 jobs concurrently
      }
    );

    // AI Generation Worker
    const aiWorker = new Worker(
      QUEUE_NAMES.AI_GENERATION,
      async (job: Job<AIGenerationJobData>) => {
        return this.processAIGenerationJob(job);
      },
      {
        connection,
        concurrency: 3, // Limit concurrent AI jobs due to API rate limits
      }
    );

    // Meta Publishing Worker
    const metaWorker = new Worker(
      QUEUE_NAMES.META_PUBLISHING,
      async (job: Job<MetaPublishingJobData>) => {
        return this.processMetaPublishingJob(job);
      },
      {
        connection,
        concurrency: 2, // Conservative for API rate limits
      }
    );

    // Analytics Worker
    const analyticsWorker = new Worker(
      QUEUE_NAMES.ANALYTICS,
      async (job: Job<AnalyticsJobData>) => {
        return this.processAnalyticsJob(job);
      },
      {
        connection,
        concurrency: 10, // Analytics can be processed quickly
      }
    );

    this.workers.set(QUEUE_NAMES.IMAGE_PROCESSING, imageWorker);
    this.workers.set(QUEUE_NAMES.AI_GENERATION, aiWorker);
    this.workers.set(QUEUE_NAMES.META_PUBLISHING, metaWorker);
    this.workers.set(QUEUE_NAMES.ANALYTICS, analyticsWorker);
  }

  private initializeEventListeners() {
    this.queueEvents.forEach((queueEvents, queueName) => {
      queueEvents.on('completed', (jobId: string, result: any) => {
        console.log(`✅ Job ${jobId} completed in queue ${queueName}:`, result);
        this.emit('jobCompleted', { queueName, jobId, result });
      });

      queueEvents.on('failed', (jobId: string, error: Error) => {
        console.error(`❌ Job ${jobId} failed in queue ${queueName}:`, error);
        this.emit('jobFailed', { queueName, jobId, error });
      });

      queueEvents.on('progress', (jobId: string, progress: number) => {
        this.emit('jobProgress', { queueName, jobId, progress });
      });
    });
  }

  // Job processing methods
  private async processImageJob(job: Job<ImageProcessingJobData>) {
    const { baselineAssetId, userId, formats, options } = job.data;
    
    try {
      // Update progress
      await job.updateProgress(10);

      // Import image processor dynamically to avoid issues
      const { imageProcessor } = await import('@/services/image-processing');
      const { prisma } = await import('@/lib/prisma');

      // Get baseline asset
      const baselineAsset = await prisma.baselineAsset.findFirst({
        where: { id: baselineAssetId, tenantId: userId }
      });

      if (!baselineAsset) {
        throw new Error('Baseline asset not found');
      }

      await job.updateProgress(20);

      // Download original image
      const response = await fetch(baselineAsset.fileUrl);
      const imageBuffer = Buffer.from(await response.arrayBuffer());

      await job.updateProgress(40);

      // Process for each format
      const results = [];
      for (let i = 0; i < formats.length; i++) {
        const format = formats[i];
        const processed = await imageProcessor.processForFormat(
          imageBuffer,
          format as any,
          baselineAsset.name.split('.')[0],
          userId,
          options
        );
        
        results.push(processed);
        await job.updateProgress(40 + (50 * (i + 1) / formats.length));
      }

      await job.updateProgress(100);

      return {
        success: true,
        processedImages: results,
        originalAsset: baselineAsset,
      };

    } catch (error) {
      console.error('Image processing job failed:', error);
      throw error;
    }
  }

  private async processAIGenerationJob(job: Job<AIGenerationJobData>) {
    const { userId, type, provider, prompt, parameters } = job.data;
    
    try {
      await job.updateProgress(10);

      // Import AI provider service dynamically
      const { aiProviderManager } = await import('@/services/ai-providers');

      await job.updateProgress(30);

      // Generate content using specified provider
      const result = await aiProviderManager.generateContent({
        type,
        provider,
        prompt,
        parameters,
        userId,
        onProgress: (progress: number) => {
          job.updateProgress(30 + (progress * 0.6)); // Scale to 30-90%
        }
      });

      await job.updateProgress(100);

      return {
        success: true,
        generatedAssets: result.assets,
        metadata: result.metadata,
      };

    } catch (error) {
      console.error('AI generation job failed:', error);
      throw error;
    }
  }

  private async processMetaPublishingJob(job: Job<MetaPublishingJobData>) {
    const { contentItemId, userId, platform, campaignId } = job.data;
    
    try {
      await job.updateProgress(10);

      // Import Meta API service
      const { metaApiService } = await import('@/services/meta');

      await job.updateProgress(30);

      // Publish to Meta platform
      const result = await metaApiService.publishContent({
        contentItemId,
        platform,
        campaignId,
        userId,
      });

      await job.updateProgress(100);

      return {
        success: true,
        platformId: result.id,
        publishedUrl: result.url,
      };

    } catch (error) {
      console.error('Meta publishing job failed:', error);
      throw error;
    }
  }

  private async processAnalyticsJob(job: Job<AnalyticsJobData>) {
    const { contentItemId, platform, campaignId } = job.data;
    
    try {
      await job.updateProgress(25);

      // Import analytics service
      const { analyticsService } = await import('@/services/analytics');

      // Fetch latest performance data
      const performanceData = await analyticsService.fetchPerformanceData({
        contentItemId,
        platform,
        campaignId,
      });

      await job.updateProgress(75);

      // Store in database
      await analyticsService.storePerformanceData(performanceData);

      await job.updateProgress(100);

      return {
        success: true,
        metrics: performanceData,
      };

    } catch (error) {
      console.error('Analytics job failed:', error);
      throw error;
    }
  }

  // Public API methods
  async addImageProcessingJob(
    data: ImageProcessingJobData,
    priority: JobPriority = JobPriority.NORMAL
  ) {
    const queue = this.queues.get(QUEUE_NAMES.IMAGE_PROCESSING);
    if (!queue) throw new Error('Image processing queue not initialized');

    return queue.add('process-image', data, {
      priority,
      delay: 0,
    });
  }

  async addAIGenerationJob(
    data: AIGenerationJobData,
    priority: JobPriority = JobPriority.NORMAL
  ) {
    const queue = this.queues.get(QUEUE_NAMES.AI_GENERATION);
    if (!queue) throw new Error('AI generation queue not initialized');

    return queue.add('generate-content', data, {
      priority: data.priority || priority,
      delay: 0,
    });
  }

  async addMetaPublishingJob(
    data: MetaPublishingJobData,
    priority: JobPriority = JobPriority.HIGH
  ) {
    const queue = this.queues.get(QUEUE_NAMES.META_PUBLISHING);
    if (!queue) throw new Error('Meta publishing queue not initialized');

    return queue.add('publish-to-meta', data, {
      priority,
      delay: 0,
    });
  }

  async addAnalyticsJob(
    data: AnalyticsJobData,
    delay: number = 0
  ) {
    const queue = this.queues.get(QUEUE_NAMES.ANALYTICS);
    if (!queue) throw new Error('Analytics queue not initialized');

    return queue.add('fetch-analytics', data, {
      priority: JobPriority.LOW,
      delay, // Can be scheduled for later
    });
  }

  // Job management methods
  async getJobStatus(queueName: QueueName, jobId: string) {
    const queue = this.queues.get(queueName);
    if (!queue) throw new Error(`Queue ${queueName} not found`);

    const job = await queue.getJob(jobId);
    if (!job) throw new Error(`Job ${jobId} not found`);

    return {
      id: job.id,
      name: job.name,
      data: job.data,
      progress: job.progress,
      state: await job.getState(),
      createdAt: new Date(job.timestamp),
      processedOn: job.processedOn ? new Date(job.processedOn) : null,
      finishedOn: job.finishedOn ? new Date(job.finishedOn) : null,
      returnvalue: job.returnvalue,
      failedReason: job.failedReason,
    };
  }

  async getQueueStatus(queueName: QueueName) {
    const queue = this.queues.get(queueName);
    if (!queue) throw new Error(`Queue ${queueName} not found`);

    const [waiting, active, completed, failed, delayed] = await Promise.all([
      queue.getWaiting(),
      queue.getActive(),
      queue.getCompleted(),
      queue.getFailed(),
      queue.getDelayed(),
    ]);

    return {
      queueName,
      counts: {
        waiting: waiting.length,
        active: active.length,
        completed: completed.length,
        failed: failed.length,
        delayed: delayed.length,
      },
      jobs: {
        waiting: waiting.slice(0, 10), // Return first 10 for preview
        active: active.slice(0, 10),
        failed: failed.slice(0, 10),
      }
    };
  }

  async pauseQueue(queueName: QueueName) {
    const queue = this.queues.get(queueName);
    if (!queue) throw new Error(`Queue ${queueName} not found`);

    await queue.pause();
  }

  async resumeQueue(queueName: QueueName) {
    const queue = this.queues.get(queueName);
    if (!queue) throw new Error(`Queue ${queueName} not found`);

    await queue.resume();
  }

  async retryFailedJobs(queueName: QueueName) {
    const queue = this.queues.get(queueName);
    if (!queue) throw new Error(`Queue ${queueName} not found`);

    const failedJobs = await queue.getFailed();
    const retryPromises = failedJobs.map(job => job.retry());
    
    return Promise.allSettled(retryPromises);
  }

  async cleanQueue(queueName: QueueName, grace: number = 1000) {
    const queue = this.queues.get(queueName);
    if (!queue) throw new Error(`Queue ${queueName} not found`);

    // Clean completed jobs older than grace period (in ms)
    await queue.clean(grace, 100, 'completed');
    await queue.clean(grace, 50, 'failed');
  }

  // Health check
  async healthCheck() {
    try {
      await connection.ping();
      
      const queueStatuses = await Promise.all(
        Array.from(this.queues.keys()).map(async (queueName) => {
          try {
            const status = await this.getQueueStatus(queueName);
            return { queueName, status: 'healthy', details: status };
          } catch (error) {
            return { queueName, status: 'unhealthy', error: error.message };
          }
        })
      );

      return {
        redis: 'connected',
        queues: queueStatuses,
        workers: Array.from(this.workers.keys()).length,
        initialized: this.isInitialized,
      };
    } catch (error) {
      return {
        redis: 'disconnected',
        error: error.message,
        initialized: false,
      };
    }
  }

  // Graceful shutdown
  async shutdown() {
    console.log('Shutting down job queue...');
    
    // Close all workers
    await Promise.all(
      Array.from(this.workers.values()).map(worker => worker.close())
    );

    // Close all queues
    await Promise.all(
      Array.from(this.queues.values()).map(queue => queue.close())
    );

    // Close queue events
    await Promise.all(
      Array.from(this.queueEvents.values()).map(queueEvents => queueEvents.close())
    );

    // Disconnect Redis
    await connection.disconnect();
    
    console.log('Job queue shutdown complete');
  }
}

// Export singleton instance
export const contentJobQueue = new ContentJobQueue();