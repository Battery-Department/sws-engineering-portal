import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Shield, Wrench, Train, Factory, Settings2 } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 bg-[#006FEE] rounded-2xl flex items-center justify-center">
                <Train className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              South West Steam Engineering
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Professional engineering project management for steam restoration,
              CAD design, and bespoke fabrication. Proudly serving Cornwall for 20+ years.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/portal/auth/login">
                <Button size="lg" className="bg-[#006FEE] hover:bg-[#0050B3]">
                  Sign In
                </Button>
              </Link>
              <Link href="/customer">
                <Button size="lg" variant="outline">
                  Request Quote
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
            Complete Engineering Project Management
          </h2>
          <p className="text-lg text-gray-600">
            Professional tools for heritage railway restoration and industrial engineering
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Train className="h-6 w-6 text-[#006FEE]" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Steam Restoration
            </h3>
            <p className="text-gray-600">
              Heritage railway locomotive restoration specialists
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Settings2 className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              CAD Design Services
            </h3>
            <p className="text-gray-600">
              Professional 3D engineering drawings and specifications
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Factory className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Plant Repair
            </h3>
            <p className="text-gray-600">
              Industrial machinery repair and maintenance services
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Wrench className="h-6 w-6 text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Bespoke Fabrication
            </h3>
            <p className="text-gray-600">
              Custom engineering solutions for unique requirements
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