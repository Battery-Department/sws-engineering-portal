#!/usr/bin/env node

/**
 * Quiz Intelligence Performance Testing Script
 * Tests API endpoints for response times and identifies optimization opportunities
 */

const API_BASE = 'http://localhost:3000'

const endpoints = [
  '/api/quiz/intelligence/metrics?timeRange=24h',
  '/api/quiz/intelligence/live',
  '/api/quiz/intelligence/insights?timeRange=24h',
  '/api/quiz/intelligence/interventions?timeRange=24h',
  '/api/quiz/intelligence/track', // POST endpoint
]

async function testEndpoint(endpoint, method = 'GET', body = null) {
  const start = Date.now()
  
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : null,
    })
    
    const end = Date.now()
    const responseTime = end - start
    
    if (!response.ok) {
      return {
        endpoint,
        method,
        status: response.status,
        responseTime,
        success: false,
        error: `HTTP ${response.status}`,
      }
    }
    
    const data = await response.json()
    const dataSize = JSON.stringify(data).length
    
    return {
      endpoint,
      method,
      status: response.status,
      responseTime,
      dataSize,
      success: true,
    }
  } catch (error) {
    const end = Date.now()
    return {
      endpoint,
      method,
      status: 'ERROR',
      responseTime: end - start,
      success: false,
      error: error.message,
    }
  }
}

async function runPerformanceTests() {
  console.log('🚀 Quiz Intelligence Performance Testing')
  console.log('=' .repeat(50))
  
  const results = []
  
  // Test GET endpoints
  for (const endpoint of endpoints.slice(0, -1)) {
    console.log(`Testing: ${endpoint}`)
    const result = await testEndpoint(endpoint)
    results.push(result)
    
    if (result.success) {
      console.log(`  ✅ ${result.responseTime}ms | ${(result.dataSize / 1024).toFixed(2)}KB`)
    } else {
      console.log(`  ❌ ${result.error} | ${result.responseTime}ms`)
    }
  }
  
  // Test POST endpoint (tracking)
  console.log('Testing: /api/quiz/intelligence/track')
  const trackingResult = await testEndpoint(
    '/api/quiz/intelligence/track',
    'POST',
    {
      sessionId: 'test-session',
      interactionType: 'click',
      data: { x: 100, y: 200, element: 'test-button' }
    }
  )
  results.push(trackingResult)
  
  if (trackingResult.success) {
    console.log(`  ✅ ${trackingResult.responseTime}ms`)
  } else {
    console.log(`  ❌ ${trackingResult.error} | ${trackingResult.responseTime}ms`)
  }
  
  // Performance Analysis
  console.log('\n📊 Performance Summary')
  console.log('=' .repeat(50))
  
  const successfulTests = results.filter(r => r.success)
  const failedTests = results.filter(r => !r.success)
  
  if (successfulTests.length > 0) {
    const avgResponseTime = successfulTests.reduce((sum, r) => sum + r.responseTime, 0) / successfulTests.length
    const maxResponseTime = Math.max(...successfulTests.map(r => r.responseTime))
    const minResponseTime = Math.min(...successfulTests.map(r => r.responseTime))
    
    console.log(`📈 Successful Tests: ${successfulTests.length}/${results.length}`)
    console.log(`⚡ Average Response Time: ${avgResponseTime.toFixed(2)}ms`)
    console.log(`🔥 Fastest Response: ${minResponseTime}ms`)
    console.log(`🐌 Slowest Response: ${maxResponseTime}ms`)
    
    const totalDataSize = successfulTests
      .filter(r => r.dataSize)
      .reduce((sum, r) => sum + r.dataSize, 0)
    
    if (totalDataSize > 0) {
      console.log(`💾 Total Data Transferred: ${(totalDataSize / 1024).toFixed(2)}KB`)
    }
  }
  
  if (failedTests.length > 0) {
    console.log(`\n❌ Failed Tests: ${failedTests.length}`)
    failedTests.forEach(test => {
      console.log(`   ${test.endpoint}: ${test.error}`)
    })
  }
  
  // Performance Recommendations
  console.log('\n💡 Performance Recommendations')
  console.log('=' .repeat(50))
  
  const slowTests = successfulTests.filter(r => r.responseTime > 500)
  const largeResponses = successfulTests.filter(r => r.dataSize && r.dataSize > 50000) // > 50KB
  
  if (slowTests.length === 0 && largeResponses.length === 0) {
    console.log('✅ All endpoints performing within acceptable limits!')
    console.log('✅ Response times under 500ms')
    console.log('✅ Response sizes under 50KB')
  } else {
    if (slowTests.length > 0) {
      console.log('⚠️  Slow endpoints detected:')
      slowTests.forEach(test => {
        console.log(`   ${test.endpoint}: ${test.responseTime}ms`)
      })
      console.log('   Consider: Database query optimization, caching, pagination')
    }
    
    if (largeResponses.length > 0) {
      console.log('⚠️  Large responses detected:')
      largeResponses.forEach(test => {
        console.log(`   ${test.endpoint}: ${(test.dataSize / 1024).toFixed(2)}KB`)
      })
      console.log('   Consider: Response compression, field selection, pagination')
    }
  }
  
  console.log('\n🎯 Optimization Targets:')
  console.log('• Response time: < 200ms for analytics endpoints')
  console.log('• Response time: < 100ms for real-time endpoints')
  console.log('• Response size: < 10KB per request')
  console.log('• Cache hit rate: > 80% for metrics endpoints')
  
  return results
}

// Run tests if called directly
if (require.main === module) {
  runPerformanceTests()
    .then(() => process.exit(0))
    .catch(error => {
      console.error('Performance test failed:', error)
      process.exit(1)
    })
}

module.exports = { runPerformanceTests, testEndpoint }