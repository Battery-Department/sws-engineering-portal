import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'


// GET /api/customer/documents - Get documents for logged-in customer
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const projectId = searchParams.get('projectId')
    const fileType = searchParams.get('fileType')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')
    
    // TODO: Get customer ID from session/auth
    // For now, we'll use a placeholder
    const customerId = searchParams.get('customerId') || 'mock-customer-id'
    
    // Build where clause
    const where: any = {
      project: {
        client: {
          userId: customerId
        }
      },
      // Only show public documents or generated documents
      OR: [
        { isPublic: true },
        { generations: { some: {} } }
      ]
    }
    
    if (projectId) {
      where.projectId = projectId
    }
    
    if (fileType) {
      where.fileType = fileType
    }
    
    // Fetch documents
    const documents = await prisma.document.findMany({
      where,
      include: {
        project: {
          select: {
            id: true,
            projectRef: true,
            name: true
          }
        },
        generations: {
          orderBy: { createdAt: 'desc' },
          take: 1,
          select: {
            documentNumber: true,
            documentType: true,
            status: true,
            generatedAt: true
          }
        }
      },
      orderBy: { uploadedAt: 'desc' },
      take: limit,
      skip: offset
    })
    
    const totalCount = await prisma.document.count({ where })
    
    // Transform documents for customer view
    const customerDocuments = documents.map(doc => ({
      id: doc.id,
      filename: doc.filename,
      fileType: doc.fileType,
      fileSize: doc.fileSize,
      uploadedAt: doc.uploadedAt,
      projectRef: doc.project.projectRef,
      projectName: doc.project.name,
      isPublic: doc.isPublic || false,
      generation: doc.generations[0] ? {
        documentNumber: doc.generations[0].documentNumber,
        documentType: doc.generations[0].documentType,
        status: doc.generations[0].status,
        generatedAt: doc.generations[0].generatedAt
      } : undefined
    }))
    
    return NextResponse.json({
      success: true,
      data: {
        documents: customerDocuments,
        pagination: {
          total: totalCount,
          limit,
          offset,
          hasMore: totalCount > offset + limit
        }
      }
    })
    
  } catch (error) {
    console.error('Error fetching customer documents:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch documents' },
      { status: 500 }
    )
  }
}