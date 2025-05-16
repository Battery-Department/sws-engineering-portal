import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Battery, Shield, Zap, TrendingUp } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
                <Battery className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Battery Department Portal
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Your comprehensive B2B e-commerce platform for battery management,
              inventory tracking, and order processing.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/portal/auth/login">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Sign In
                </Button>
              </Link>
              <Link href="/portal/auth/register">
                <Button size="lg" variant="outline">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Everything you need to manage your battery business
          </h2>
          <p className="text-lg text-gray-600">
            Powerful tools and features designed for modern B2B commerce
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Real-time Analytics
            </h3>
            <p className="text-gray-600">
              Track performance metrics and make data-driven decisions
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Battery className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Inventory Management
            </h3>
            <p className="text-gray-600">
              Monitor battery stock levels and automate reordering
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Fast Processing
            </h3>
            <p className="text-gray-600">
              Quick order processing and automated workflows
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="h-6 w-6 text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Secure Platform
            </h3>
            <p className="text-gray-600">
              Enterprise-grade security for your business data
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to get started?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Join thousands of businesses managing their battery operations with us
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/portal/auth/login">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Sign In Now
                </Button>
              </Link>
              <Link href="/portal/auth/register">
                <Button size="lg" variant="outline">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}