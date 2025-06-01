import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

// GET /api/documents/[id] - Get document details
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
            name: true,
            client: {
              select: {
                user: {
                  select: {
                    name: true,
                    email: true
                  }
                }
              }
            }
          }
        },
        generations: {
          orderBy: { createdAt: 'desc' },
          take: 1
        }
      }
    })

    if (!document) {
      return NextResponse.json(
        { success: false, error: 'Document not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: document
    })

  } catch (error) {
    console.error('Error fetching document:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch document' },
      { status: 500 }
    )
  }
}

// DELETE /api/documents/[id] - Delete document
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const documentId = params.id

    // Check if document exists
    const document = await prisma.document.findUnique({
      where: { id: documentId }
    })

    if (!document) {
      return NextResponse.json(
        { success: false, error: 'Document not found' },
        { status: 404 }
      )
    }

    // Delete document and related generations (cascade will handle generations)
    await prisma.document.delete({
      where: { id: documentId }
    })

    // Here you would also delete the actual file from storage
    // await deleteFileFromStorage(document.fileUrl)

    return NextResponse.json({
      success: true,
      message: 'Document deleted successfully'
    })

  } catch (error) {
    console.error('Error deleting document:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete document' },
      { status: 500 }
    )
  }
}

// PATCH /api/documents/[id] - Update document
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const documentId = params.id
    const body = await request.json()
    const { filename, fileType } = body

    const updateData: any = {}
    if (filename) updateData.filename = filename
    if (fileType) updateData.fileType = fileType

    const document = await prisma.document.update({
      where: { id: documentId },
      data: updateData
    })

    return NextResponse.json({
      success: true,
      data: document,
      message: 'Document updated successfully'
    })

  } catch (error) {
    console.error('Error updating document:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update document' },
      { status: 500 }
    )
  }
}