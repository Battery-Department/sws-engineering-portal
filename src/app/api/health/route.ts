import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getConversionsAPI } from '@/services/meta/conversions-api';
import { getMetaPixel } from '@/services/meta/pixel';
import { getAudienceManager } from '@/services/meta/audience-manager';

export async function GET() {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
    services: {
      database: { status: 'unknown', latency: 0 },
      meta_pixel: { status: 'unknown', test_mode: true },
      conversions_api: { status: 'unknown', queue_size: 0 },
      audience_manager: { status: 'unknown', audience_count: 0 },
      redis: { status: 'unknown', latency: 0 }
    },
    metrics: {
      memory: process.memoryUsage(),
      uptime: process.uptime()
    }
  };

  // Check database
  try {
    const start = Date.now();
    await prisma.$queryRaw`SELECT 1`;
    health.services.database = {
      status: 'healthy',
      latency: Date.now() - start
    };
  } catch (error) {
    health.status = 'degraded';
    health.services.database = {
      status: 'unhealthy',
      latency: 0,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }

  // Check Meta Pixel
  try {
    const pixel = getMetaPixel();
    health.services.meta_pixel = {
      status: pixel ? 'healthy' : 'not_initialized',
      test_mode: true,
      events_tracked: pixel?.getTestEvents().length || 0
    };
  } catch (error) {
    health.services.meta_pixel = {
      status: 'unhealthy',
      test_mode: true,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }

  // Check Conversions API
  try {
    const capi = getConversionsAPI();
    if (capi) {
      const queueStatus = capi.getQueueStatus();
      const connectionTest = await capi.testConnection();
      
      health.services.conversions_api = {
        status: connectionTest.success ? 'healthy' : 'degraded',
        queue_size: queueStatus.queueLength,
        test_mode: true,
        message: connectionTest.message
      };
    } else {
      health.services.conversions_api = {
        status: 'not_initialized',
        queue_size: 0,
        test_mode: true
      };
    }
  } catch (error) {
    health.services.conversions_api = {
      status: 'unhealthy',
      queue_size: 0,
      test_mode: true,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }

  // Check Audience Manager
  try {
    const audienceManager = getAudienceManager();
    if (audienceManager) {
      const audiences = audienceManager.getAudiences();
      health.services.audience_manager = {
        status: 'healthy',
        audience_count: audiences.length,
        synced: audiences.filter(a => a.syncStatus === 'synced').length,
        pending: audiences.filter(a => a.syncStatus === 'pending').length
      };
    } else {
      health.services.audience_manager = {
        status: 'not_initialized',
        audience_count: 0
      };
    }
  } catch (error) {
    health.services.audience_manager = {
      status: 'unhealthy',
      audience_count: 0,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }

  // Check Redis (Vercel KV)
  if (process.env.KV_REST_API_URL) {
    try {
      const start = Date.now();
      const response = await fetch(`${process.env.KV_REST_API_URL}/ping`, {
        headers: {
          Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`
        }
      });
      
      health.services.redis = {
        status: response.ok ? 'healthy' : 'unhealthy',
        latency: Date.now() - start
      };
    } catch (error) {
      health.services.redis = {
        status: 'unhealthy',
        latency: 0,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  } else {
    health.services.redis = {
      status: 'not_configured',
      latency: 0
    };
  }

  // Determine overall health
  const unhealthyServices = Object.values(health.services).filter(
    s => s.status === 'unhealthy'
  ).length;

  if (unhealthyServices > 0) {
    health.status = unhealthyServices > 2 ? 'unhealthy' : 'degraded';
  }

  const statusCode = health.status === 'healthy' ? 200 : 
                     health.status === 'degraded' ? 200 : 503;

  return NextResponse.json(health, { status: statusCode });
}