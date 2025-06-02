import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'


export async function GET(request: NextRequest) {
  try {
    // Create test customer user
    const hashedPassword = await bcrypt.hash('test123', 10)
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: 'test@customer.com' }
    })

    if (existingUser) {
      return NextResponse.json({ 
        message: 'Test account already exists',
        credentials: {
          email: 'test@customer.com',
          password: 'test123'
        }
      })
    }

    // Create user and customer record
    const user = await prisma.user.create({
      data: {
        email: 'test@customer.com',
        name: 'Test Customer',
        password: hashedPassword,
        role: 'customer',
        customer: {
          create: {
            phoneNumber: '555-0123',
            billingAddress: {
              street: '123 Test Street',
              city: 'Test City',
              state: 'TC',
              zip: '12345',
              country: 'USA'
            },
            shippingAddress: {
              street: '123 Test Street',
              city: 'Test City',
              state: 'TC',
              zip: '12345',
              country: 'USA'
            }
          }
        }
      },
      include: {
        customer: true
      }
    })

    return NextResponse.json({
      message: 'Test account created successfully',
      credentials: {
        email: 'test@customer.com',
        password: 'test123'
      }
    })
  } catch (error) {
    console.error('Error creating test account:', error)
    return NextResponse.json(
      { error: 'Failed to create test account' },
      { status: 500 }
    )
  }
}