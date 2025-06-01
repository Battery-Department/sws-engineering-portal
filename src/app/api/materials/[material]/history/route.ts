import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

// GET /api/materials/[material]/history - Get price history for a specific material
export async function GET(
  request: NextRequest,
  { params }: { params: { material: string } }
) {
  try {
    const material = decodeURIComponent(params.material)
    
    // Get price history for the material
    const priceHistory = await prisma.materialCost.findMany({
      where: {
        material: material
      },
      orderBy: {
        date: 'desc'
      },
      select: {
        supplier: true,
        unitCost: true,
        date: true,
        quantity: true,
        totalCost: true,
        invoiceRef: true,
        category: true,
        project: {
          select: {
            projectRef: true,
            name: true
          }
        }
      },
      take: 20 // Limit to last 20 entries
    })

    // Calculate price trends
    const prices = priceHistory.map(entry => entry.unitCost).reverse()
    const latestPrice = prices[prices.length - 1] || 0
    const previousPrice = prices[prices.length - 2] || latestPrice
    const priceChange = latestPrice - previousPrice
    const priceChangePercent = previousPrice > 0 ? (priceChange / previousPrice) * 100 : 0
    
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)
    const avgPrice = prices.reduce((sum, price) => sum + price, 0) / prices.length

    return NextResponse.json({
      success: true,
      data: {
        material,
        history: priceHistory,
        analytics: {
          latestPrice,
          priceChange,
          priceChangePercent,
          minPrice,
          maxPrice,
          avgPrice,
          totalEntries: priceHistory.length
        }
      }
    })

  } catch (error) {
    console.error('Error fetching material price history:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch price history' },
      { status: 500 }
    )
  }
}