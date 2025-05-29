import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// POST endpoint for tracking behavioral interactions
export async function POST(request: NextRequest) {
  try {
    const { 
      sessionId, 
      interactionType, 
      elementId, 
      interactionData,
      batch = false 
    } = await request.json()
    
    if (!sessionId || !interactionType) {
      return NextResponse.json(
        { error: 'Session ID and interaction type required' },
        { status: 400 }
      )
    }

    if (batch && Array.isArray(interactionData)) {
      // Handle batch tracking for performance
      const batchInserts = interactionData.map(data => 
        prisma.$executeRaw`
          INSERT INTO quiz_interactions (
            session_id, interaction_type, element_id, interaction_data
          ) VALUES (
            ${sessionId},
            ${data.type || interactionType},
            ${data.elementId || elementId},
            ${JSON.stringify(data)}
          )
        `
      )
      
      await Promise.all(batchInserts)
    } else {
      // Single interaction tracking
      await prisma.$executeRaw`
        INSERT INTO quiz_interactions (
          session_id, interaction_type, element_id, interaction_data
        ) VALUES (
          ${sessionId},
          ${interactionType},
          ${elementId || null},
          ${JSON.stringify(interactionData || {})}
        )
      `
    }

    // Real-time behavioral analysis
    const analysis = await analyzeBehavior(sessionId, interactionType, interactionData)
    
    // Update session monitoring if needed
    if (analysis.updateRequired) {
      await updateSessionMonitoring(sessionId, analysis)
    }

    // Check for intervention triggers
    const intervention = await checkInterventionTriggers(sessionId, analysis)

    return NextResponse.json({ 
      success: true, 
      analysis,
      intervention: intervention || null
    })
    
  } catch (error) {
    console.error('Error tracking interaction:', error)
    return NextResponse.json(
      { error: 'Failed to track interaction' },
      { status: 500 }
    )
  }
}

async function analyzeBehavior(sessionId: string, interactionType: string, data: any) {
  try {
    // Get recent interactions for this session
    const recentInteractions = await prisma.$queryRaw`
      SELECT interaction_type, interaction_data, timestamp
      FROM quiz_interactions
      WHERE session_id = ${sessionId}
      AND datetime(timestamp) > datetime('now', '-5 minutes')
      ORDER BY timestamp DESC
      LIMIT 50
    ` as Array<{ interaction_type: string; interaction_data: string; timestamp: string }>

    // Analyze patterns
    const hesitationCount = recentInteractions.filter(i => i.interaction_type === 'hesitation').length
    const clickCount = recentInteractions.filter(i => i.interaction_type === 'click').length
    const scrollCount = recentInteractions.filter(i => i.interaction_type === 'scroll').length
    
    // Calculate engagement score (0-1)
    const engagementScore = Math.min(1, (clickCount * 0.3 + scrollCount * 0.1 + Math.max(0, 10 - hesitationCount) * 0.1))
    
    // Calculate dropout risk (0-1)
    let dropoutRisk = 0
    if (hesitationCount > 5) dropoutRisk += 0.3
    if (interactionType === 'focus_loss') dropoutRisk += 0.2
    if (interactionType === 'back_button') dropoutRisk += 0.4
    if (data?.timeOnQuestion > 60000) dropoutRisk += 0.2 // More than 1 minute
    
    dropoutRisk = Math.min(1, dropoutRisk)

    return {
      engagementScore,
      dropoutRisk,
      hesitationLevel: hesitationCount / 10, // Normalize
      interactionVelocity: recentInteractions.length / 5, // Interactions per minute
      updateRequired: true,
      patterns: {
        hasHesitation: hesitationCount > 3,
        hasConfusion: recentInteractions.filter(i => i.interaction_type === 'option_change').length > 2,
        isRushing: clickCount > 10 && recentInteractions.length < 20,
        isStuck: hesitationCount > 7
      }
    }
  } catch (error) {
    console.error('Error analyzing behavior:', error)
    return {
      engagementScore: 0.5,
      dropoutRisk: 0.3,
      hesitationLevel: 0.2,
      interactionVelocity: 1,
      updateRequired: false,
      patterns: {}
    }
  }
}

async function updateSessionMonitoring(sessionId: string, analysis: any) {
  try {
    await prisma.$executeRaw`
      INSERT INTO quiz_session_monitoring (
        session_id, engagement_score, dropout_risk, intervention_needed, last_activity
      ) VALUES (
        ${sessionId},
        ${analysis.engagementScore},
        ${analysis.dropoutRisk},
        ${analysis.dropoutRisk > 0.6},
        datetime('now')
      )
      ON CONFLICT(session_id) DO UPDATE SET
        engagement_score = ${analysis.engagementScore},
        dropout_risk = ${analysis.dropoutRisk},
        intervention_needed = ${analysis.dropoutRisk > 0.6},
        last_activity = datetime('now')
    `
  } catch (error) {
    console.error('Error updating session monitoring:', error)
  }
}

async function checkInterventionTriggers(sessionId: string, analysis: any) {
  try {
    const { patterns, dropoutRisk } = analysis
    
    // Check recent interventions to avoid spam
    const recentInterventions = await prisma.$queryRaw`
      SELECT intervention_type
      FROM quiz_interventions
      WHERE session_id = ${sessionId}
      AND datetime(created_at) > datetime('now', '-2 minutes')
    ` as Array<{ intervention_type: string }>

    if (recentInterventions.length > 0) {
      return null // Don't spam interventions
    }

    // Intervention triggers
    if (dropoutRisk > 0.7) {
      // Record intervention
      await prisma.$executeRaw`
        INSERT INTO quiz_interventions (
          session_id, intervention_type, trigger_reason, intervention_data
        ) VALUES (
          ${sessionId},
          'exit_intent',
          'high_dropout_risk',
          ${JSON.stringify({ dropoutRisk, patterns })}
        )
      `
      
      return {
        type: 'exit_intent',
        message: 'Wait! You\'re almost done - just 2 more questions!',
        action: 'show_progress_boost',
        urgency: 'high'
      }
    }

    if (patterns.isStuck) {
      await prisma.$executeRaw`
        INSERT INTO quiz_interventions (
          session_id, intervention_type, trigger_reason, intervention_data
        ) VALUES (
          ${sessionId},
          'hesitation_help',
          'stuck_pattern',
          ${JSON.stringify({ patterns })}
        )
      `
      
      return {
        type: 'tooltip',
        message: 'Need help? There\'s no wrong answer - go with your best guess!',
        action: 'show_help',
        urgency: 'medium'
      }
    }

    if (patterns.hasConfusion) {
      await prisma.$executeRaw`
        INSERT INTO quiz_interventions (
          session_id, intervention_type, trigger_reason, intervention_data
        ) VALUES (
          ${sessionId},
          'encouragement',
          'confusion_pattern',
          ${JSON.stringify({ patterns })}
        )
      `
      
      return {
        type: 'encouragement',
        message: 'You\'re doing great! Your answers help us find the perfect solution.',
        action: 'highlight_progress',
        urgency: 'low'
      }
    }

    return null
  } catch (error) {
    console.error('Error checking intervention triggers:', error)
    return null
  }
}