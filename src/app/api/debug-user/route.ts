import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    // Find test user
    const user = await prisma.user.findUnique({
      where: { email: 'test@customer.com' },
      include: { customer: true }
    })

    if (!user) {
      return NextResponse.json({ 
        error: 'User not found',
        userExists: false 
      })
    }

    return NextResponse.json({
      userExists: true,
      email: user.email,
      name: user.name,
      role: user.role,
      hasPassword: !!user.password,
      hasCustomer: !!user.customer
    })
  } catch (error) {
    return NextResponse.json({ 
      error: 'Database error',
      details: error 
    }, { status: 500 })
  }
}