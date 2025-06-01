import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

// GET /api/projects/[id]/documents - Get all documents for a project
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = params.id
    const { searchParams } = new URL(request.url)
    const fileType = searchParams.get('fileType')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    // Build where clause
    const where: any = { projectId }
    if (fileType) {
      where.fileType = fileType
    }

    const documents = await prisma.document.findMany({
      where,
      include: {
        generations: {
          orderBy: { createdAt: 'desc' },
          take: 1
        }
      },
      orderBy: { uploadedAt: 'desc' },
      take: limit,
      skip: offset
    })

    const totalCount = await prisma.document.count({ where })

    // Group documents by type for better organization
    const documentsByType = documents.reduce((acc: any, doc) => {
      if (!acc[doc.fileType]) {
        acc[doc.fileType] = []
      }
      acc[doc.fileType].push(doc)
      return acc
    }, {})

    return NextResponse.json({
      success: true,
      data: {
        documents,
        documentsByType,
        pagination: {
          total: totalCount,
          limit,
          offset,
          hasMore: totalCount > offset + limit
        }
      }
    })

  } catch (error) {
    console.error('Error fetching project documents:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch documents' },
      { status: 500 }
    )
  }
}

// POST /api/projects/[id]/documents - Create new document for project
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = params.id
    const body = await request.json()
    const {
      filename,
      originalName,
      fileType,
      fileSize,
      fileUrl,
      autoGenerate = false,
      templateData
    } = body

    // Validate project exists
    const project = await prisma.project.findUnique({
      where: { id: projectId }
    })

    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      )
    }

    // Create document
    const document = await prisma.document.create({
      data: {
        projectId,
        filename: filename || originalName,
        originalName,
        fileType,
        fileSize: fileSize || 0,
        fileUrl,
        uploadedAt: new Date()
      }
    })

    // If this is an auto-generated document, create generation record
    if (autoGenerate && templateData) {
      const documentNumber = await generateDocumentNumber(fileType)
      
      await prisma.documentGeneration.create({
        data: {
          documentId: document.id,
          documentType: fileType,
          documentNumber,
          templateData: JSON.stringify(templateData),
          status: 'completed',
          generatedBy: templateData.generatedBy || 'system',
          generatedAt: new Date(),
          fileUrl
        }
      })
    }

    return NextResponse.json({
      success: true,
      data: document,
      message: 'Document created successfully'
    })

  } catch (error) {
    console.error('Error creating document:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create document' },
      { status: 500 }
    )
  }
}

// Helper function to generate document numbers
async function generateDocumentNumber(documentType: string): Promise<string> {
  const prefix = {
    invoice: 'INV',
    project_report: 'RPT',
    certificate: 'CERT',
    quote: 'QUO'
  }[documentType] || 'DOC'

  const year = new Date().getFullYear()
  
  const lastDocument = await prisma.documentGeneration.findFirst({
    where: {
      documentType,
      documentNumber: {
        startsWith: `${prefix}-${year}-`
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  let nextNumber = 1
  if (lastDocument) {
    const lastNumber = parseInt(lastDocument.documentNumber.split('-').pop() || '0')
    nextNumber = lastNumber + 1
  }

  return `${prefix}-${year}-${nextNumber.toString().padStart(4, '0')}`
}