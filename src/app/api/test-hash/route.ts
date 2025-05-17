import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export async function GET(request: NextRequest) {
  // Create a new hash for 'test123'
  const password = 'test123'
  const hash = await bcrypt.hash(password, 10)
  
  // Test if the hash works
  const isValid = await bcrypt.compare(password, hash)
  
  return NextResponse.json({
    password,
    hash,
    isValid,
    testWithOldHash: await bcrypt.compare(password, '$2a$10$YJvRKfhLVvC3eZGdHvCQJu5JHqcE7Yn.RGMKaKEgVXXGFjzLZBLQm')
  })
}