import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

// POST /api/projects/[id]/material-costs - Save material calculation to project
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = params.id
    const body = await request.json()
    const { items, calculationName } = body

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

    // Validate items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No items provided' },
        { status: 400 }
      )
    }

    // Create material cost entries in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create material cost entries
      const materialCosts = await Promise.all(
        items.map((item: any) => 
          tx.materialCost.create({
            data: {
              projectId,
              supplier: item.supplier,
              material: item.material,
              quantity: parseFloat(item.quantity),
              unitCost: parseFloat(item.unitCost),
              totalCost: parseFloat(item.totalCost),
              date: new Date(),
              category: item.category || null,
              invoiceRef: calculationName ? `CALC-${Date.now()}` : null
            }
          })
        )
      )

      // Update project with new actual costs
      const totalNewCosts = items.reduce((sum: number, item: any) => sum + parseFloat(item.totalCost), 0)
      
      const updatedProject = await tx.project.update({
        where: { id: projectId },
        data: {
          actualCost: {
            increment: totalNewCosts
          }
        },
        include: {
          costs: {
            orderBy: { date: 'desc' },
            take: 10
          }
        }
      })

      return {
        materialCosts,
        project: updatedProject,
        totalAdded: totalNewCosts
      }
    })

    return NextResponse.json({
      success: true,
      data: result,
      message: `Added ${items.length} material costs totaling £${result.totalAdded.toFixed(2)}`
    })

  } catch (error) {
    console.error('Error saving material costs to project:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to save material costs' },
      { status: 500 }
    )
  }
}

// GET /api/projects/[id]/material-costs - Get material costs for project
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = params.id

    // Get material costs for the project
    const materialCosts = await prisma.materialCost.findMany({
      where: {
        projectId: projectId
      },
      orderBy: {
        date: 'desc'
      }
    })

    // Calculate totals
    const totalCost = materialCosts.reduce((sum, cost) => sum + cost.totalCost, 0)
    const totalQuantity = materialCosts.reduce((sum, cost) => sum + cost.quantity, 0)
    
    // Group by category
    const byCategory = materialCosts.reduce((acc: any, cost) => {
      const category = cost.category || 'Other'
      if (!acc[category]) {
        acc[category] = {
          items: [],
          total: 0,
          count: 0
        }
      }
      acc[category].items.push(cost)
      acc[category].total += cost.totalCost
      acc[category].count += 1
      return acc
    }, {})

    // Group by supplier
    const bySupplier = materialCosts.reduce((acc: any, cost) => {
      if (!acc[cost.supplier]) {
        acc[cost.supplier] = {
          items: [],
          total: 0,
          count: 0
        }
      }
      acc[cost.supplier].items.push(cost)
      acc[cost.supplier].total += cost.totalCost
      acc[cost.supplier].count += 1
      return acc
    }, {})

    return NextResponse.json({
      success: true,
      data: {
        costs: materialCosts,
        summary: {
          totalCost,
          totalQuantity,
          itemCount: materialCosts.length,
          byCategory,
          bySupplier
        }
      }
    })

  } catch (error) {
    console.error('Error fetching project material costs:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch material costs' },
      { status: 500 }
    )
  }
}