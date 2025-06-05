import { PrismaClient } from '@/generated/prisma'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seed...')

  // Create test customer user
  const hashedPassword = await bcrypt.hash('test123', 10)
  
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: 'test@customer.com' }
    })

    if (!existingUser) {
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
      
      console.log('Test customer created:', user.email)
    } else {
      console.log('Test customer already exists')
    }

    // Create test B2B user
    const existingB2BUser = await prisma.user.findUnique({
      where: { email: 'admin@swse.com' }
    })

    if (!existingB2BUser) {
      const b2bUser = await prisma.user.create({
        data: {
          email: 'admin@swse.com',
          name: 'Admin User',
          password: hashedPassword,
          role: 'admin'
        }
      })
      
      console.log('Test B2B admin created:', b2bUser.email)
    } else {
      console.log('Test B2B admin already exists')
    }

  } catch (error) {
    console.error('Error creating test users:', error)
  }

  console.log('Database seed completed!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })