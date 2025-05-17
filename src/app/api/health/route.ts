/**
 * Health Check API
 * Provides health status for the dashboard service
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { healthMonitor } from '@/services/monitoring/health-monitor'

export async function GET(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    // Check database connection
    const dbCheck = await checkDatabase()
    
    // Check external services
    const servicesCheck = await checkExternalServices()
    
    // Get system metrics
    const systemHealth = await healthMonitor.getSystemHealth()
    
    const responseTime = Date.now() - startTime
    
    const health = {
      status: systemHealth.status,
      timestamp: new Date().toISOString(),
      responseTime,
      checks: {
        database: dbCheck,
        services: servicesCheck,
        system: systemHealth
      },
      environment: {
        nodeVersion: process.version,
        environment: process.env.NODE_ENV,
        uptime: process.uptime()
      }
    }
    
    const statusCode = health.status === 'healthy' ? 200 : 
                       health.status === 'degraded' ? 200 : 503
    
    return NextResponse.json(health, { status: statusCode })
  } catch (error: any) {
    return NextResponse.json({
      status: 'error',
      timestamp: new Date().toISOString(),
      responseTime: Date.now() - startTime,
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 503 })
  }
}

async function checkDatabase(): Promise<{
  status: 'healthy' | 'degraded' | 'down'
  responseTime: number
  message?: string
}> {
  const startTime = Date.now()
  
  try {
    // Simple query to check database connection
    await prisma.$queryRaw`SELECT 1`
    
    const responseTime = Date.now() - startTime
    
    return {
      status: responseTime < 100 ? 'healthy' : 'degraded',
      responseTime
    }
  } catch (error: any) {
    return {
      status: 'down',
      responseTime: Date.now() - startTime,
      message: error.message
    }
  }
}

async function checkExternalServices(): Promise<Record<string, {
  status: 'healthy' | 'degraded' | 'down'
  responseTime: number
  message?: string
}>> {
  const services: Record<string, () => Promise<any>> = {
    openai: async () => {
      // Check OpenAI API availability
      const response = await fetch('https://api.openai.com/v1/models', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        }
      })
      if (!response.ok) throw new Error('OpenAI API error')
    },
    monday: async () => {
      // Check Monday.com API availability  
      const response = await fetch('https://api.monday.com/v2', {
        method: 'POST',
        headers: {
          'Authorization': process.env.MONDAY_API_KEY || '',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: '{ me { name } }' })
      })
      if (!response.ok) throw new Error('Monday API error')
    }
  }
  
  const results: Record<string, any> = {}
  
  for (const [name, checkFn] of Object.entries(services)) {
    const startTime = Date.now()
    try {
      await checkFn()
      results[name] = {
        status: 'healthy',
        responseTime: Date.now() - startTime
      }
    } catch (error: any) {
      results[name] = {
        status: 'down',
        responseTime: Date.now() - startTime,
        message: error.message
      }
    }
  }
  
  return results
}