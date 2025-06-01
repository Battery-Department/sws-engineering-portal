import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

// GET /api/materials - Fetch unique materials with latest prices
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    
    // Get unique materials with their latest prices
    const materials = await prisma.materialCost.findMany({
      where: {
        OR: [
          { material: { contains: search, mode: 'insensitive' } },
          { supplier: { contains: search, mode: 'insensitive' } },
          { category: { contains: search, mode: 'insensitive' } }
        ]
      },
      orderBy: [
        { material: 'asc' },
        { date: 'desc' }
      ],
      select: {
        material: true,
        supplier: true,
        unitCost: true,
        date: true,
        category: true
      }
    })

    // Get unique materials with latest prices only
    const uniqueMaterials = materials.reduce((acc: any[], current) => {
      const existing = acc.find(item => item.material === current.material)
      if (!existing) {
        acc.push(current)
      }
      return acc
    }, [])

    return NextResponse.json({ 
      success: true, 
      data: uniqueMaterials 
    })

  } catch (error) {
    console.error('Error fetching materials:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch materials' },
      { status: 500 }
    )
  }
}

// POST /api/materials - Add new material cost entry
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      projectId,
      supplier,
      material,
      quantity,
      unitCost,
      totalCost,
      invoiceRef,
      category
    } = body

    // Validate required fields
    if (!supplier || !material || !quantity || !unitCost || !totalCost) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create material cost entry
    const materialCost = await prisma.materialCost.create({
      data: {
        projectId: projectId || null,
        supplier,
        material,
        quantity: parseFloat(quantity),
        unitCost: parseFloat(unitCost),
        totalCost: parseFloat(totalCost),
        invoiceRef: invoiceRef || null,
        date: new Date(),
        category: category || null
      }
    })

    return NextResponse.json({ 
      success: true, 
      data: materialCost 
    })

  } catch (error) {
    console.error('Error creating material cost:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create material cost entry' },
      { status: 500 }
    )
  }
}