"use client"

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Zap } from 'lucide-react'

export default function LoginPage() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password)
    } catch (err) {
      setError('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-4">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <Zap className="h-6 w-6 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Welcome back</h1>
          <p className="text-gray-600 mt-2">
            Sign in to your Battery Department account
          </p>
        </div>

        <Card className="bg-white border border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900">Sign in</CardTitle>
            <CardDescription className="text-gray-600">
              Enter your email and password to access your account
            </CardDescription>
            <div className="mt-2 p-3 bg-blue-50 rounded-md border border-blue-200">
              <p className="text-xs text-blue-700">
                Demo credentials: demo@example.com / demo123
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <Link
                    href="/portal/auth/forgot-password"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="border-gray-300"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="remember" className="text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={loading}
              >
                {loading ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  'Sign in'
                )}
              </Button>

              <div className="text-center text-sm">
                <span className="text-gray-600">
                  Don't have an account?{' '}
                </span>
                <Link
                  href="/portal/auth/register"
                  className="text-blue-600 hover:underline"
                >
                  Sign up
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}