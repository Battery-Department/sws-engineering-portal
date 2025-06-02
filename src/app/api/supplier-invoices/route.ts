import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'


// POST /api/supplier-invoices - Create supplier invoice and material costs
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      supplier,
      invoiceRef,
      date,
      totalAmount,
      items,
      projectId,
      fileUrl
    } = body

    // Validate required fields
    if (!supplier || !invoiceRef || !date || !totalAmount || !items || !Array.isArray(items)) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate items
    const validItems = items.filter(item => 
      item.material && 
      item.quantity > 0 && 
      item.unitCost > 0 && 
      item.totalCost > 0
    )

    if (validItems.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No valid items provided' },
        { status: 400 }
      )
    }

    // Check if invoice reference already exists for this supplier
    const existingInvoice = await prisma.supplierInvoice.findFirst({
      where: {
        supplier,
        invoiceRef
      }
    })

    if (existingInvoice) {
      return NextResponse.json(
        { success: false, error: 'Invoice reference already exists for this supplier' },
        { status: 409 }
      )
    }

    // Create invoice and material costs in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // 1. Create SupplierInvoice record
      const invoice = await tx.supplierInvoice.create({
        data: {
          supplier: supplier.trim(),
          invoiceRef: invoiceRef.trim(),
          date: new Date(date),
          totalAmount: parseFloat(totalAmount.toString()),
          items: JSON.stringify(validItems),
          fileUrl: fileUrl || null,
          processed: true
        }
      })

      // 2. Create MaterialCost records for each item
      const materialCosts = await Promise.all(
        validItems.map((item: any) => 
          tx.materialCost.create({
            data: {
              projectId: projectId || null,
              supplier: supplier.trim(),
              material: item.material.trim(),
              quantity: parseFloat(item.quantity.toString()),
              unitCost: parseFloat(item.unitCost.toString()),
              totalCost: parseFloat(item.totalCost.toString()),
              invoiceRef: invoiceRef.trim(),
              date: new Date(date),
              category: item.category || null
            }
          })
        )
      )

      // 3. If linked to a project, update project costs
      if (projectId) {
        const totalCostIncrease = validItems.reduce((sum: number, item: any) => 
          sum + parseFloat(item.totalCost.toString()), 0
        )

        await tx.project.update({
          where: { id: projectId },
          data: {
            actualCost: {
              increment: totalCostIncrease
            }
          }
        })
      }

      return {
        invoice,
        materialCosts,
        itemsProcessed: validItems.length,
        totalValue: parseFloat(totalAmount.toString())
      }
    })

    return NextResponse.json({
      success: true,
      data: result,
      message: `Invoice processed successfully. Added ${result.itemsProcessed} materials to cost database.`
    })

  } catch (error) {
    console.error('Error processing supplier invoice:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process invoice' },
      { status: 500 }
    )
  }
}

// GET /api/supplier-invoices - Fetch supplier invoices
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const supplier = searchParams.get('supplier')
    const projectId = searchParams.get('projectId')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    const where: any = {}
    
    if (supplier) {
      where.supplier = { contains: supplier, mode: 'insensitive' }
    }

    let invoices = await prisma.supplierInvoice.findMany({
      where,
      orderBy: { date: 'desc' },
      take: limit,
      skip: offset,
      include: {
        _count: {
          select: {
            // This would need a relation if we add one
          }
        }
      }
    })

    // If filtering by project, get related material costs
    if (projectId) {
      const projectCosts = await prisma.materialCost.findMany({
        where: { projectId },
        select: { invoiceRef: true },
        distinct: ['invoiceRef']
      })
      
      const invoiceRefs = projectCosts.map(cost => cost.invoiceRef).filter(Boolean)
      
      invoices = invoices.filter(invoice => 
        invoiceRefs.includes(invoice.invoiceRef)
      )
    }

    // Parse items JSON for each invoice
    const invoicesWithParsedItems = invoices.map(invoice => ({
      ...invoice,
      items: invoice.items ? JSON.parse(invoice.items as string) : []
    }))

    // Get total count for pagination
    const totalCount = await prisma.supplierInvoice.count({ where })

    return NextResponse.json({
      success: true,
      data: {
        invoices: invoicesWithParsedItems,
        pagination: {
          total: totalCount,
          limit,
          offset,
          hasMore: totalCount > offset + limit
        }
      }
    })

  } catch (error) {
    console.error('Error fetching supplier invoices:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch invoices' },
      { status: 500 }
    )
  }
}