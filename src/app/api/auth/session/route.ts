import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json({ user: null });
    }

    // Verify token
    let decoded: any;
    try {
      decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'your-secret-key'
      );
    } catch (error) {
      return NextResponse.json({ user: null });
    }

    // For demo user
    if (decoded.email === 'demo@example.com') {
      return NextResponse.json({
        user: {
          id: '1',
          email: 'demo@example.com',
          name: 'Demo User',
          customer: {
            id: '1',
            companyName: 'Demo Company'
          }
        }
      });
    }

    // Get user from database
    try {
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        include: { customer: true }
      });

      if (!user) {
        return NextResponse.json({ user: null });
      }

      return NextResponse.json({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          customer: user.customer
        }
      });
    } catch (error) {
      // Database error, return null user
      return NextResponse.json({ user: null });
    }
  } catch (error) {
    console.error('Session error:', error);
    return NextResponse.json({ user: null });
  }
}