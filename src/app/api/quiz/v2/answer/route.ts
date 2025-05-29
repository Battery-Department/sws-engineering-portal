import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { 
      sessionId, 
      questionId, 
      answerValue,
      answerMetadata 
    } = await request.json()
    
    // Store answer
    await prisma.quizResponse.create({
      data: {
        sessionId,
        questionId,
        questionType: answerMetadata?.questionType || 'single-choice',
        responseValue: answerValue,
        responseTime: answerMetadata?.timeToAnswer
      }
    })
    
    // Update session based on specific answers
    const updates: any = {}
    
    if (questionId === 'user-type') {
      updates.userType = answerValue
    } else if (questionId === 'battery-brand') {
      updates.selectedBrand = answerValue
    } else if (questionId === 'trade') {
      updates.userSegment = answerValue
    } else if (questionId === 'crew-size') {
      updates.crewSize = parseInt(answerValue)
    }
    
    if (Object.keys(updates).length > 0) {
      await prisma.quizSession.update({
        where: { sessionId },
        data: updates
      })
    }
    
    // Track behavioral interaction
    if (answerMetadata?.timeToAnswer > 30000) {
      await prisma.behavioralInteraction.create({
        data: {
          sessionId,
          interactionType: 'slow_response',
          element: questionId,
          duration: answerMetadata.timeToAnswer,
          metadata: { 
            questionId,
            responseTime: answerMetadata.timeToAnswer
          }
        }
      })
    }
    
    return NextResponse.json({
      success: true,
      questionId,
      answerValue
    })
  } catch (error) {
    console.error('Failed to save quiz answer:', error)
    return NextResponse.json(
      { error: 'Failed to save answer' },
      { status: 500 }
    )
  }
}