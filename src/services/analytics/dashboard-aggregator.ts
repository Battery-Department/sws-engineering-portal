export interface ContentMetrics {
  totalGenerated: number;
  avgEngagementRate: number;
  topPerformingContent: ContentItem[];
  generationSuccessRate: number;
  avgTimeToGenerate: number;
  contentByType: Record<string, number>;
  platformBreakdown: {
    meta: { impressions: number; clicks: number; conversions: number };
    email: { opens: number; clicks: number };
    website: { views: number; downloads: number };
  };
}

export interface ContentItem {
  id: string;
  title: string;
  type: 'image' | 'copy' | 'video' | 'blog';
  platform: string;
  engagementRate: number;
  generatedAt: Date;
  cost: number;
  performance: {
    views: number;
    clicks: number;
    conversions: number;
  };
}

export interface APICostBreakdown {
  providers: {
    openai: {
      totalCost: number;
      apiCalls: number;
      avgCostPerCall: number;
      models: {
        'gpt-4': { calls: number; cost: number };
        'gpt-4-turbo': { calls: number; cost: number };
        'dall-e-3': { calls: number; cost: number };
      };
    };
    stableDiffusion: {
      totalCost: number;
      imagesGenerated: number;
      avgCostPerImage: number;
      resolutions: Record<string, { count: number; cost: number }>;
    };
    anthropic: {
      totalCost: number;
      tokensUsed: number;
      avgCostPerRequest: number;
    };
  };
  totalCosts: {
    today: number;
    thisWeek: number;
    thisMonth: number;
    allTime: number;
  };
  costPerContent: {
    image: number;
    copywriting: number;
    videoScript: number;
    blogPost: number;
  };
}

export interface SystemHealthMetrics {
  uptime: number;
  responseTime: {
    p50: number;
    p95: number;
    p99: number;
  };
  errorRate: number;
  apiStatus: {
    openai: 'healthy' | 'degraded' | 'down';
    stableDiffusion: 'healthy' | 'degraded' | 'down';
    anthropic: 'healthy' | 'degraded' | 'down';
  };
  queueStats: {
    depth: number;
    processing: number;
    failed: number;
    avgProcessingTime: number;
  };
  storageUsage: {
    used: number;
    total: number;
    percentage: number;
  };
}

export interface TimeRange {
  start: Date;
  end: Date;
}

export class DashboardAggregator {
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>();

  // Content Performance Analytics
  async getContentMetrics(timeRange: TimeRange): Promise<ContentMetrics> {
    const cacheKey = `content-metrics-${timeRange.start.getTime()}-${timeRange.end.getTime()}`;
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    // Simulate real data aggregation
    const metrics: ContentMetrics = {
      totalGenerated: 847,
      avgEngagementRate: 4.6,
      generationSuccessRate: 98.2,
      avgTimeToGenerate: 3.4,
      contentByType: {
        image: 312,
        copy: 245,
        video: 156,
        blog: 134
      },
      topPerformingContent: [
        {
          id: '1',
          title: 'FlexVolt Battery Launch Campaign',
          type: 'image',
          platform: 'Meta',
          engagementRate: 8.2,
          generatedAt: new Date('2024-01-15'),
          cost: 2.45,
          performance: { views: 12450, clicks: 1021, conversions: 84 }
        },
        {
          id: '2',
          title: 'Contractor Tool Comparison',
          type: 'copy',
          platform: 'Email',
          engagementRate: 7.8,
          generatedAt: new Date('2024-01-14'),
          cost: 0.45,
          performance: { views: 8934, clicks: 697, conversions: 52 }
        }
      ],
      platformBreakdown: {
        meta: { impressions: 145670, clicks: 12456, conversions: 892 },
        email: { opens: 45621, clicks: 3567 },
        website: { views: 23456, downloads: 1234 }
      }
    };

    this.setCache(cacheKey, metrics, 300000); // 5 minutes
    return metrics;
  }

  // API Cost Tracking
  async getAPICosts(timeRange: TimeRange): Promise<APICostBreakdown> {
    const cacheKey = `api-costs-${timeRange.start.getTime()}-${timeRange.end.getTime()}`;
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    const costs: APICostBreakdown = {
      providers: {
        openai: {
          totalCost: 1234.56,
          apiCalls: 5647,
          avgCostPerCall: 0.22,
          models: {
            'gpt-4': { calls: 2341, cost: 856.32 },
            'gpt-4-turbo': { calls: 1456, cost: 245.67 },
            'dall-e-3': { calls: 1850, cost: 132.57 }
          }
        },
        stableDiffusion: {
          totalCost: 567.89,
          imagesGenerated: 1247,
          avgCostPerImage: 0.46,
          resolutions: {
            '512x512': { count: 534, cost: 156.78 },
            '1024x1024': { count: 456, cost: 234.56 },
            '1536x1536': { count: 257, cost: 176.55 }
          }
        },
        anthropic: {
          totalCost: 345.67,
          tokensUsed: 2456789,
          avgCostPerRequest: 0.14
        }
      },
      totalCosts: {
        today: 45.67,
        thisWeek: 234.56,
        thisMonth: 1567.89,
        allTime: 12456.78
      },
      costPerContent: {
        image: 0.85,
        copywriting: 0.12,
        videoScript: 0.45,
        blogPost: 0.67
      }
    };

    this.setCache(cacheKey, costs, 300000); // 5 minutes
    return costs;
  }

  // System Health Monitoring
  async getSystemHealth(): Promise<SystemHealthMetrics> {
    const cacheKey = 'system-health';
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    const health: SystemHealthMetrics = {
      uptime: 99.8,
      responseTime: {
        p50: 245,
        p95: 567,
        p99: 1234
      },
      errorRate: 0.2,
      apiStatus: {
        openai: 'healthy',
        stableDiffusion: 'healthy',
        anthropic: 'healthy'
      },
      queueStats: {
        depth: 23,
        processing: 5,
        failed: 2,
        avgProcessingTime: 3456
      },
      storageUsage: {
        used: 2.4,
        total: 10.0,
        percentage: 24
      }
    };

    this.setCache(cacheKey, health, 60000); // 1 minute
    return health;
  }

  // ROI Calculation
  async getROIMetrics(timeRange: TimeRange): Promise<{
    totalInvestment: number;
    totalRevenue: number;
    roi: number;
    roiByContent: Record<string, number>;
    revenueAttribution: {
      direct: number;
      attributed: number;
      organic: number;
    };
  }> {
    const cacheKey = `roi-metrics-${timeRange.start.getTime()}-${timeRange.end.getTime()}`;
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    const metrics = {
      totalInvestment: 2148.12,
      totalRevenue: 12456.78,
      roi: 479.8,
      roiByContent: {
        image: 523.4,
        copy: 445.6,
        video: 512.8,
        blog: 398.2
      },
      revenueAttribution: {
        direct: 8234.56,
        attributed: 3145.67,
        organic: 1076.55
      }
    };

    this.setCache(cacheKey, metrics, 300000); // 5 minutes
    return metrics;
  }

  // Budget Tracking
  async getBudgetMetrics(): Promise<{
    monthly: {
      allocated: number;
      spent: number;
      remaining: number;
      percentage: number;
    };
    yearly: {
      allocated: number;
      spent: number;
      remaining: number;
      percentage: number;
    };
    byDepartment: Array<{
      name: string;
      allocated: number;
      spent: number;
      percentage: number;
    }>;
    alerts: Array<{
      type: 'warning' | 'critical';
      message: string;
      department?: string;
    }>;
  }> {
    const cacheKey = 'budget-metrics';
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    const metrics = {
      monthly: {
        allocated: 5000,
        spent: 2148.12,
        remaining: 2851.88,
        percentage: 43.0
      },
      yearly: {
        allocated: 60000,
        spent: 23456.78,
        remaining: 36543.22,
        percentage: 39.1
      },
      byDepartment: [
        { name: 'Marketing', allocated: 25000, spent: 12456.78, percentage: 49.8 },
        { name: 'Sales', allocated: 15000, spent: 6789.23, percentage: 45.3 },
        { name: 'Product', allocated: 20000, spent: 4210.77, percentage: 21.1 }
      ],
      alerts: [
        { type: 'warning' as const, message: 'Marketing department at 50% of monthly budget', department: 'Marketing' },
        { type: 'critical' as const, message: 'OpenAI costs exceeded daily limit', department: 'Product' }
      ]
    };

    this.setCache(cacheKey, metrics, 300000); // 5 minutes
    return metrics;
  }

  // Queue Monitoring
  async getQueueMetrics(): Promise<{
    active: Array<{
      id: string;
      type: string;
      priority: 'high' | 'medium' | 'low';
      progress: number;
      estimatedTime: number;
      startedAt: Date;
    }>;
    completed: {
      today: number;
      thisWeek: number;
      successRate: number;
    };
    failed: Array<{
      id: string;
      type: string;
      error: string;
      failedAt: Date;
      retryCount: number;
    }>;
    performance: {
      avgProcessingTime: number;
      throughput: number;
      peakHours: Array<{ hour: number; count: number }>;
    };
  }> {
    const cacheKey = 'queue-metrics';
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    const metrics = {
      active: [
        {
          id: 'job_1',
          type: 'image_generation',
          priority: 'high' as const,
          progress: 75,
          estimatedTime: 45,
          startedAt: new Date(Date.now() - 120000)
        },
        {
          id: 'job_2',
          type: 'content_optimization',
          priority: 'medium' as const,
          progress: 30,
          estimatedTime: 180,
          startedAt: new Date(Date.now() - 60000)
        }
      ],
      completed: {
        today: 247,
        thisWeek: 1543,
        successRate: 98.2
      },
      failed: [
        {
          id: 'job_failed_1',
          type: 'video_script',
          error: 'API rate limit exceeded',
          failedAt: new Date(Date.now() - 300000),
          retryCount: 2
        }
      ],
      performance: {
        avgProcessingTime: 3456,
        throughput: 156,
        peakHours: [
          { hour: 9, count: 45 },
          { hour: 14, count: 67 },
          { hour: 16, count: 52 }
        ]
      }
    };

    this.setCache(cacheKey, metrics, 60000); // 1 minute
    return metrics;
  }

  // Cache management
  private getFromCache<T>(key: string): T | null {
    const cached = this.cache.get(key);
    if (!cached) return null;
    
    if (Date.now() - cached.timestamp > cached.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return cached.data;
  }

  private setCache<T>(key: string, data: T, ttl: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  // Real-time updates
  subscribeToUpdates(callback: (type: string, data: any) => void): () => void {
    // Simulate real-time updates
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        callback('cost_update', {
          type: 'api_call',
          provider: 'openai',
          cost: Math.random() * 0.5,
          timestamp: new Date()
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }
}

// Singleton instance
export const dashboardAggregator = new DashboardAggregator();