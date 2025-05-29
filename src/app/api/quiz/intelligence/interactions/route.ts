import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { sessionId, interactions } = await request.json()
    
    if (!sessionId || !Array.isArray(interactions)) {
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      )
    }
    
    // Batch create interactions
    const interactionData = interactions.map((interaction: any) => ({
      sessionId,
      interactionType: interaction.type,
      element: interaction.element,
      position: interaction.position ? JSON.stringify(interaction.position) : null,
      viewport: interaction.viewport ? JSON.stringify(interaction.viewport) : null,
      duration: interaction.duration,
      metadata: interaction.metadata ? JSON.stringify(interaction.metadata) : null,
      timestamp: new Date(interaction.timestamp)
    }))
    
    await prisma.behavioralInteraction.createMany({
      data: interactionData,
      skipDuplicates: true
    })
    
    // Analyze patterns for interventions
    const hesitations = interactions.filter(i => i.type === 'hesitation' && i.duration > 2000)
    const multipleChanges = interactions.filter(i => i.type === 'answer_change').length
    
    // Track intervention opportunities
    if (hesitations.length > 0) {
      await prisma.quizIntervention.create({
        data: {
          sessionId,
          interventionType: 'hesitation_help',
          triggerReason: `User hesitated for ${hesitations[0].duration}ms`,
          questionId: hesitations[0].element
        }
      })
    }
    
    if (multipleChanges > 3) {
      await prisma.quizIntervention.create({
        data: {
          sessionId,
          interventionType: 'decision_difficulty',
          triggerReason: `User changed answer ${multipleChanges} times`,
          questionId: interactions.find(i => i.type === 'answer_change')?.element
        }
      })
    }
    
    return NextResponse.json({
      success: true,
      processed: interactions.length
    })
  } catch (error) {
    console.error('Failed to save interactions:', error)
    return NextResponse.json(
      { error: 'Failed to save interactions' },
      { status: 500 }
    )
  }
}