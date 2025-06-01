import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Create the project record
    const project = await prisma.project.create({
      data: {
        id: data.id,
        projectNumber: data.id,
        name: data.projectName,
        description: data.description,
        projectType: data.projectType,
        status: 'inquiry',
        budget: data.budget,
        urgency: data.urgency,
        technicalSpecs: JSON.stringify(data.technicalSpecs),
        additionalServices: data.additionalServices,
        contactInfo: JSON.stringify(data.contactInfo),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
    
    // Create initial milestone
    await prisma.projectMilestone.create({
      data: {
        id: `${data.id}-MILESTONE-001`,
        projectId: project.id,
        name: 'Initial Review',
        description: 'Engineering team review of project requirements',
        status: 'pending',
        order: 1,
        createdAt: new Date()
      }
    })
    
    return NextResponse.json({
      success: true,
      projectId: project.id,
      message: 'Requirements submitted successfully'
    })
  } catch (error) {
    console.error('Error submitting requirements:', error)
    return NextResponse.json(
      { error: 'Failed to submit requirements' },
      { status: 500 }
    )
  }
}