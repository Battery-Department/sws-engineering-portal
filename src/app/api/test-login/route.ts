export async function GET() {
  // Just return test info without making any API calls
  return Response.json({
    message: 'Test endpoint is working',
    testCredentials: {
      email: 'test@customer.com',
      password: 'test123'
    },
    instructions: 'Use these credentials to login at /customer/auth/login'
  })
}