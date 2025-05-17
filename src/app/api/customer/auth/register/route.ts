import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// In-memory storage for demo purposes
const users: any[] = [
  {
    id: 'test-user-1',
    email: 'test@customer.com',
    password: '$2a$10$YJvRKfhLVvC3eZGdHvCQJu5JHqcE7Yn.RGMKaKEgVXXGFjzLZBLQm', // bcrypt hash of 'test123'
    name: 'Test Customer',
    role: 'customer',
    customerId: 'cust-123'
  }
]

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    // Check if user already exists
    const existingUser = users.find(u => u.email === email)
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create new user
    const newUser = {
      id: `user-${Date.now()}`,
      email,
      name,
      password: hashedPassword,
      role: 'customer',
      customerId: `cust-${Date.now()}`
    }

    users.push(newUser)

    // Generate token
    const token = jwt.sign(
      { 
        userId: newUser.id, 
        email: newUser.email,
        role: newUser.role,
        customerId: newUser.customerId
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '30d' }
    )

    // Return user data without password
    const userData = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
      customerId: newUser.customerId
    }

    return NextResponse.json({
      token,
      user: userData
    })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    )
  }
}