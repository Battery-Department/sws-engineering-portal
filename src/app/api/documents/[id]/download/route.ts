import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

// GET /api/documents/[id]/download - Download document
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const documentId = params.id

    const document = await prisma.document.findUnique({
      where: { id: documentId },
      include: {
        project: {
          select: {
            projectRef: true,
            name: true
          }
        }
      }
    })

    if (!document) {
      return NextResponse.json(
        { success: false, error: 'Document not found' },
        { status: 404 }
      )
    }

    if (!document.fileUrl) {
      return NextResponse.json(
        { success: false, error: 'Document file not available' },
        { status: 404 }
      )
    }

    // Here you would fetch the actual file from your storage service
    // For now, we'll redirect to the file URL or return file metadata
    
    // Option 1: Redirect to file URL (if using cloud storage with signed URLs)
    // return NextResponse.redirect(document.fileUrl)

    // Option 2: Stream file content (if serving files directly)
    // const fileStream = await getFileStream(document.fileUrl)
    // return new NextResponse(fileStream, {
    //   headers: {
    //     'Content-Type': 'application/pdf',
    //     'Content-Disposition': `attachment; filename="${document.filename}"`,
    //     'Content-Length': document.fileSize?.toString() || '0'
    //   }
    // })

    // Option 3: Return download metadata (for frontend to handle)
    return NextResponse.json({
      success: true,
      data: {
        downloadUrl: document.fileUrl,
        filename: document.filename,
        fileSize: document.fileSize,
        projectRef: document.project.projectRef,
        projectName: document.project.name
      }
    })

  } catch (error) {
    console.error('Error downloading document:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to download document' },
      { status: 500 }
    )
  }
}