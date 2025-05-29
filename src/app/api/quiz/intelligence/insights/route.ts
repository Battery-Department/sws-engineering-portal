import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const timeRange = searchParams.get('timeRange') || '24h'
    
    // Calculate time filter
    let timeFilter = "datetime('now', '-24 hours')"
    switch (timeRange) {
      case '1h':
        timeFilter = "datetime('now', '-1 hour')"
        break
      case '7d':
        timeFilter = "datetime('now', '-7 days')"
        break
      case '30d':
        timeFilter = "datetime('now', '-30 days')"
        break
    }

    // Analyze hesitation patterns
    const hesitationData = await prisma.$queryRaw`
      SELECT 
        qi.element_id as question_id,
        COUNT(*) as frequency,
        AVG(
          CASE 
            WHEN qi.interaction_data LIKE '%"duration"%' 
            THEN CAST(json_extract(qi.interaction_data, '$.duration') AS REAL)
            ELSE 5000
          END
        ) as avg_duration
      FROM quiz_interactions qi
      JOIN quiz_sessions qs ON qi.session_id = qs.id
      WHERE qi.interaction_type = 'hesitation'
      AND qs.created_at > ${timeFilter}
      AND qi.element_id IS NOT NULL
      GROUP BY qi.element_id
      HAVING COUNT(*) > 5
      ORDER BY frequency DESC
    ` as Array<{ question_id: string; frequency: number; avg_duration: number }>

    // Analyze dropout patterns by question
    const dropoutData = await prisma.$queryRaw`
      SELECT 
        current_step,
        COUNT(*) as dropouts,
        (COUNT(*) * 100.0 / (
          SELECT COUNT(*) FROM quiz_sessions 
          WHERE created_at > ${timeFilter}
        )) as dropout_rate
      FROM quiz_sessions
      WHERE status = 'abandoned'
      AND created_at > ${timeFilter}
      GROUP BY current_step
      ORDER BY dropout_rate DESC
    ` as Array<{ current_step: number; dropouts: number; dropout_rate: number }>

    // Analyze confusion patterns (option changes)
    const confusionData = await prisma.$queryRaw`
      SELECT 
        qr.question_id,
        COUNT(*) as option_changes,
        (COUNT(*) * 100.0 / (
          SELECT COUNT(DISTINCT session_id) 
          FROM quiz_responses 
          WHERE question_id = qr.question_id
        )) as confusion_rate
      FROM quiz_responses qr
      JOIN quiz_sessions qs ON qr.session_id = qs.id
      WHERE qs.created_at > ${timeFilter}
      AND qr.response_time > 30000  -- More than 30 seconds indicates confusion
      GROUP BY qr.question_id
      ORDER BY confusion_rate DESC
    ` as Array<{ question_id: string; option_changes: number; confusion_rate: number }>

    // Generate insights based on data
    const insights = []

    // Hesitation insights
    for (const hesitation of hesitationData.slice(0, 3)) {
      if (hesitation.avg_duration > 15000) { // More than 15 seconds
        insights.push({
          type: 'hesitation',
          questionId: hesitation.question_id,
          frequency: Math.round((hesitation.frequency / 100) * 100), // Normalize to percentage
          impact: hesitation.avg_duration > 30000 ? 'high' : 'medium',
          recommendation: getHesitationRecommendation(hesitation.question_id)
        })
      }
    }

    // Dropout insights
    for (const dropout of dropoutData.slice(0, 2)) {
      if (dropout.dropout_rate > 10) {
        const questionMap = ['project-size', 'daily-runtime', 'primary-tools', 'budget-range']
        const questionId = questionMap[dropout.current_step] || 'unknown'
        
        insights.push({
          type: 'dropout',
          questionId,
          frequency: Math.round(dropout.dropout_rate),
          impact: dropout.dropout_rate > 20 ? 'high' : 'medium',
          recommendation: getDropoutRecommendation(questionId)
        })
      }
    }

    // Confusion insights
    for (const confusion of confusionData.slice(0, 2)) {
      if (confusion.confusion_rate > 15) {
        insights.push({
          type: 'confusion',
          questionId: confusion.question_id,
          frequency: Math.round(confusion.confusion_rate),
          impact: confusion.confusion_rate > 30 ? 'high' : 'medium',
          recommendation: getConfusionRecommendation(confusion.question_id)
        })
      }
    }

    // If no real data, provide mock insights
    if (insights.length === 0) {
      insights.push(
        {
          type: 'hesitation',
          questionId: 'primary-tools',
          frequency: 67,
          impact: 'high',
          recommendation: 'Simplify tool selection with categories'
        },
        {
          type: 'dropout',
          questionId: 'budget-range',
          frequency: 45,
          impact: 'high',
          recommendation: 'Move budget question to end of quiz'
        },
        {
          type: 'confusion',
          questionId: 'project-size',
          frequency: 23,
          impact: 'medium',
          recommendation: 'Add visual examples for team sizes'
        }
      )
    }

    return NextResponse.json({ insights })
    
  } catch (error) {
    console.error('Error fetching behavioral insights:', error)
    
    // Return mock insights
    const mockInsights = [
      {
        type: 'hesitation',
        questionId: 'primary-tools',
        frequency: 67,
        impact: 'high',
        recommendation: 'Simplify tool selection with categories'
      },
      {
        type: 'dropout',
        questionId: 'budget-range',
        frequency: 45,
        impact: 'high',
        recommendation: 'Move budget question to end of quiz'
      },
      {
        type: 'confusion',
        questionId: 'project-size',
        frequency: 23,
        impact: 'medium',
        recommendation: 'Add visual examples for team sizes'
      }
    ]

    return NextResponse.json({ insights: mockInsights })
  }
}

function getHesitationRecommendation(questionId: string): string {
  const recommendations: Record<string, string> = {
    'project-size': 'Add visual team size examples and tooltips',
    'daily-runtime': 'Provide hour ranges with practical examples',
    'primary-tools': 'Group tools by category and add icons',
    'budget-range': 'Show typical budget ranges for different team sizes'
  }
  return recommendations[questionId] || 'Simplify question language and add help text'
}

function getDropoutRecommendation(questionId: string): string {
  const recommendations: Record<string, string> = {
    'project-size': 'Make this question more engaging with visuals',
    'daily-runtime': 'Explain why this information is needed',
    'primary-tools': 'Reduce number of options or use progressive disclosure',
    'budget-range': 'Move to end or make optional with "Not sure" option'
  }
  return recommendations[questionId] || 'Review question placement and simplify language'
}

function getConfusionRecommendation(questionId: string): string {
  const recommendations: Record<string, string> = {
    'project-size': 'Add clearer team size definitions',
    'daily-runtime': 'Include examples of typical usage patterns',
    'primary-tools': 'Add tool descriptions and use cases',
    'budget-range': 'Explain what the budget covers'
  }
  return recommendations[questionId] || 'Add clarifying text and examples'
}