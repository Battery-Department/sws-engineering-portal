import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const key = process.env.ANTHROPIC_API_KEY || ''
  const hasKey = !!key
  const keyLength = key.length
  const keyPrefix = key.substring(0, 10) + '...'
  const keyStartsWithSkAnt = key.startsWith('sk-ant-')
  const hasWhitespace = key !== key.trim()
  
  return NextResponse.json({
    hasAnthropicKey: hasKey,
    keyLength: keyLength,
    keyPrefix: keyPrefix,
    keyStartsWithSkAnt: keyStartsWithSkAnt,
    hasWhitespace: hasWhitespace,
    nodeEnv: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  })
}