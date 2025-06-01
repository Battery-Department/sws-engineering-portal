import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma'
import { PDFGenerator } from '@/lib/pdfGenerator'
import { EmailService } from '@/lib/emailService'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      documentType, 
      projectId, 
      templateData, 
      autoSend = false,
      recipientEmail 
    } = body

    // Validate required fields
    if (!documentType || !projectId || !templateData) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: documentType, projectId, templateData' },
        { status: 400 }
      )
    }

    // Validate document type
    const validTypes = ['invoice', 'project_report', 'certificate', 'quote']
    if (!validTypes.includes(documentType)) {
      return NextResponse.json(
        { success: false, error: 'Invalid document type' },
        { status: 400 }
      )
    }

    // Get project details
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        client: {
          include: {
            user: true
          }
        },
        costs: {
          orderBy: { date: 'desc' }
        },
        stages: {
          orderBy: { order: 'asc' }
        },
        documents: {
          orderBy: { uploadedAt: 'desc' }
        }
      }
    })

    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      )
    }

    // Generate document number
    const documentNumber = await generateDocumentNumber(documentType)

    // Prepare document data
    const documentData = {
      ...templateData,
      documentNumber,
      projectRef: project.projectRef,
      projectName: project.name,
      generatedDate: new Date(),
      project: {
        description: project.description,
        location: project.location,
        service: project.service,
        startDate: project.startDate,
        targetDate: project.targetDate,
        completedDate: project.completedDate,
        currentStage: project.currentStage,
        status: project.status
      },
      client: {
        name: project.client?.user?.name || 'Unknown Client',
        email: project.client?.user?.email,
        // Additional client data from templateData
        ...templateData.client
      }
    }

    // Create document record in database
    const document = await prisma.$transaction(async (tx) => {
      // Create the document record
      const newDocument = await tx.document.create({
        data: {
          projectId,
          filename: `${documentType}_${documentNumber}.pdf`,
          originalName: `${documentType}_${documentNumber}.pdf`,
          fileType: documentType,
          fileSize: 0, // Will be updated when PDF is generated
          fileUrl: null, // Will be updated when PDF is generated
          uploadedAt: new Date()
        }
      })

      // Create document generation record for tracking
      await tx.documentGeneration.create({
        data: {
          documentId: newDocument.id,
          documentType,
          documentNumber,
          templateData: JSON.stringify(documentData),
          status: 'pending',
          generatedBy: templateData.generatedBy || 'system',
          autoSend,
          recipientEmail: recipientEmail || project.client?.user?.email
        }
      })

      return newDocument
    })

    // Generate PDF using our PDF service
    let pdfUrl = ''
    let fileSize = 0
    
    try {
      const pdfResult = await generatePDF(documentType, documentData, document.id, projectId)
      pdfUrl = pdfResult.url
      fileSize = pdfResult.size
    } catch (pdfError) {
      console.error('Error generating PDF:', pdfError)
      // Continue with placeholder URL if PDF generation fails
      pdfUrl = `/api/documents/${document.id}/pdf`
      fileSize = 0
    }

    // Update document with PDF URL and size
    await prisma.document.update({
      where: { id: document.id },
      data: {
        fileUrl: pdfUrl,
        fileSize
      }
    })

    // Update generation status
    await prisma.documentGeneration.updateMany({
      where: { documentId: document.id },
      data: {
        status: 'completed',
        generatedAt: new Date(),
        fileUrl: pdfUrl
      }
    })

    // Send email if autoSend is enabled
    if (autoSend && recipientEmail) {
      try {
        const emailSent = await EmailService.sendDocumentEmail({
          recipientEmail,
          documentType,
          documentNumber,
          projectName: project.name,
          templateData: documentData,
          pdfUrl
        })
        
        if (emailSent) {
          await prisma.documentGeneration.updateMany({
            where: { documentId: document.id },
            data: { emailSent: true, emailSentAt: new Date() }
          })
        }
      } catch (emailError) {
        console.error('Error sending email:', emailError)
        // Continue even if email fails
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        documentId: document.id,
        documentNumber,
        documentType,
        fileUrl: pdfUrl,
        downloadUrl: `/api/documents/${document.id}/download`,
        projectRef: project.projectRef,
        generatedAt: new Date()
      },
      message: `${documentType} generated successfully`
    })

  } catch (error) {
    console.error('Error generating document:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate document' },
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
  
  // Get the last document number for this type and year
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

// Generate PDF using our PDF service
async function generatePDF(
  documentType: string, 
  documentData: any, 
  documentId: string,
  projectId: string
): Promise<{ url: string; size: number }> {
  const filename = `${documentType}_${documentData.documentNumber}.pdf`
  
  switch (documentType) {
    case 'invoice':
      return PDFGenerator.generateInvoicePDF(documentData, { filename, projectId, templateData: documentData })
    case 'project_report':
      return PDFGenerator.generateProjectReportPDF(documentData, { filename, projectId, templateData: documentData })
    case 'certificate':
      return PDFGenerator.generateCertificatePDF(documentData, { filename, projectId, templateData: documentData })
    case 'quote':
      // For quotes, use invoice template with different data
      return PDFGenerator.generateInvoicePDF(documentData, { filename, projectId, templateData: documentData })
    default:
      throw new Error(`Unsupported document type: ${documentType}`)
  }
}