// Test script to check all customer pages
const pages = [
  '/customer',
  '/customer/dashboard',
  '/customer/products',
  '/customer/orders',
  '/customer/favorites',
  '/customer/payment',
  '/customer/chat',
  '/customer/auth/login',
  '/customer/auth/register'
]

console.log('Testing customer pages...')
console.log('Base URL: http://localhost:3000')
console.log('\nPages to test:')

pages.forEach(page => {
  console.log(`- ${page}`)
})

console.log('\nTo test each page:')
console.log('1. Make sure the app is running (npm run dev)')
console.log('2. Visit each URL in the browser')
console.log('3. Check that the page loads without errors')
console.log('\nNote: Some pages require authentication')
console.log('Test credentials: test@customer.com / test123')