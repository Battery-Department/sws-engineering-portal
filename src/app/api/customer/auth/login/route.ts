export async function POST(request: Request) {
  const body = await request.json()
  
  // Simple check
  if (body.email === 'test@customer.com' && body.password === 'test123') {
    return Response.json({
      token: 'demo-token-123',
      user: {
        id: 'test-user-1',
        email: 'test@customer.com',
        name: 'Test Customer',
        role: 'customer',
        customerId: 'cust-123'
      }
    })
  }
  
  return Response.json(
    { error: 'Invalid credentials' },
    { status: 401 }
  )
}