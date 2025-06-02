import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Shield, Wrench, Train, Factory, Settings2, Calculator, FileText, Users } from 'lucide-react'

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
              Professional heritage railway restoration and industrial engineering services.
              Specializing in steam locomotive restoration, CAD design, and bespoke fabrication. 
              Proudly serving Cornwall and beyond for over 20 years.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/requirements">
                <Button size="lg" className="bg-[#006FEE] hover:bg-[#0050B3]">
                  Start Engineering Project
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
              Heritage railway locomotive restoration specialists, 7¼" gauge experts
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
              Professional 3D engineering drawings, SolidWorks & AutoCAD specialists
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Factory className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Plant & Machinery Repair
            </h3>
            <p className="text-gray-600">
              Industrial machinery repair, maintenance and restoration services
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Wrench className="h-6 w-6 text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Custom Fabrication
            </h3>
            <p className="text-gray-600">
              Bespoke engineering solutions for unique heritage and industrial requirements
            </p>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Engineering Services
            </h2>
            <p className="text-lg text-gray-600">
              From heritage steam locomotives to modern industrial solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Train className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Heritage Railways</h3>
              <p className="text-gray-600 mb-4">
                Steam locomotive restoration, 7¼" gauge specialists, boiler certification, 
                period-accurate restoration with modern safety standards.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Steam locomotive restoration</li>
                <li>• Boiler inspection & certification</li>
                <li>• Rolling stock restoration</li>
                <li>• Heritage research & authenticity</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Settings2 className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Engineering Design</h3>
              <p className="text-gray-600 mb-4">
                Professional 3D CAD modeling, FEA analysis, reverse engineering, 
                and technical documentation using SolidWorks & AutoCAD.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• 3D CAD modeling & drawings</li>
                <li>• FEA stress & thermal analysis</li>
                <li>• Reverse engineering</li>
                <li>• Technical documentation</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Factory className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Industrial Solutions</h3>
              <p className="text-gray-600 mb-4">
                Plant & machinery repair, custom fabrication, precision machining, 
                and industrial equipment restoration across all sectors.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Plant & machinery repair</li>
                <li>• Custom fabrication</li>
                <li>• Precision machining</li>
                <li>• Material testing & certification</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Materials Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Materials & Capabilities
          </h2>
          <p className="text-lg text-gray-600">
            We work with traditional and modern engineering materials
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {[
            { name: 'Cast Iron', icon: '🔩' },
            { name: 'Steel', icon: '🔧' },
            { name: 'Stainless Steel', icon: '✨' },
            { name: 'Brass', icon: '🟡' },
            { name: 'Bronze', icon: '🟤' },
            { name: 'Aluminum', icon: '⚪' }
          ].map((material, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl mb-2">{material.icon}</div>
              <div className="font-medium text-gray-900">{material.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to start your engineering project?
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              From heritage steam locomotives to complex industrial solutions, 
              we bring decades of engineering expertise to every project.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/requirements">
                <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                  Start Project Requirements
                </Button>
              </Link>
              <Link href="/customer/auth/login">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  Client Portal Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
