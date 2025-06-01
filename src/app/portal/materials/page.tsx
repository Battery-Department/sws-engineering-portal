'use client'

import React from 'react'
import Link from 'next/link'
import { 
  Package,
  Calculator,
  Upload,
  Database,
  TrendingUp,
  PoundSterling,
  Receipt,
  FileText,
  BarChart3,
  CheckCircle,
  Clock,
  AlertTriangle,
  ArrowRight,
  TestTube
} from 'lucide-react'

export default function MaterialsOverviewPage() {
  // Mock data for overview stats
  const overviewStats = {
    totalMaterials: 245,
    totalSuppliers: 18,
    thisMonthSpend: 8750,
    averageUnitCost: 12.45,
    recentInvoices: 8,
    pendingCalculations: 3
  }

  const recentActivity = [
    {
      type: 'invoice_uploaded',
      description: 'Invoice from Cornwall Steel Ltd processed',
      amount: 1850,
      time: '2 hours ago',
      status: 'completed'
    },
    {
      type: 'calculation_saved',
      description: 'Material calculation saved to PROJ-2024-047',
      amount: 620,
      time: '4 hours ago',
      status: 'completed'
    },
    {
      type: 'price_update',
      description: 'New price for Stainless Steel Sheet 3mm',
      amount: 15.75,
      time: '1 day ago',
      status: 'updated'
    },
    {
      type: 'invoice_uploaded',
      description: 'Invoice from Devon Metals processed',
      amount: 2240,
      time: '2 days ago',
      status: 'completed'
    }
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(amount)
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'invoice_uploaded': return Receipt
      case 'calculation_saved': return Calculator
      case 'price_update': return TrendingUp
      default: return FileText
    }
  }

  const getActivityColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600'
      case 'updated': return 'text-blue-600'
      case 'pending': return 'text-orange-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Materials Management</h1>
          <p className="text-gray-600">Manage material costs, supplier invoices, and pricing calculations</p>
        </div>
        <Link
          href="/portal/materials/test"
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center gap-2"
        >
          <TestTube className="w-4 h-4" />
          Run System Tests
        </Link>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <Package className="w-6 h-6 text-blue-600" />
            <span className="text-xs text-green-600 font-medium">+12</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{overviewStats.totalMaterials}</p>
          <p className="text-sm text-gray-600">Total Materials</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <Database className="w-6 h-6 text-purple-600" />
            <span className="text-xs text-blue-600 font-medium">+2</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{overviewStats.totalSuppliers}</p>
          <p className="text-sm text-gray-600">Active Suppliers</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <PoundSterling className="w-6 h-6 text-green-600" />
            <span className="text-xs text-green-600 font-medium">+15%</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(overviewStats.thisMonthSpend)}</p>
          <p className="text-sm text-gray-600">This Month Spend</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <BarChart3 className="w-6 h-6 text-orange-600" />
            <span className="text-xs text-red-600 font-medium">-3%</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(overviewStats.averageUnitCost)}</p>
          <p className="text-sm text-gray-600">Avg Unit Cost</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <Receipt className="w-6 h-6 text-indigo-600" />
            <span className="text-xs text-blue-600 font-medium">+5</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{overviewStats.recentInvoices}</p>
          <p className="text-sm text-gray-600">Recent Invoices</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <Calculator className="w-6 h-6 text-pink-600" />
            <span className="text-xs text-orange-600 font-medium">{overviewStats.pendingCalculations}</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">12</p>
          <p className="text-sm text-gray-600">Calculations</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/portal/materials/calculator"
          className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Calculator className="w-6 h-6 text-blue-600" />
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#006FEE] transition-colors" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Material Cost Calculator</h3>
          <p className="text-gray-600 text-sm mb-4">
            Calculate material costs using latest supplier prices and save calculations to projects
          </p>
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-green-600 font-medium">Real-time pricing</span>
          </div>
        </Link>

        <Link
          href="/portal/materials/upload"
          className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Upload className="w-6 h-6 text-green-600" />
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#006FEE] transition-colors" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Supplier Invoice</h3>
          <p className="text-gray-600 text-sm mb-4">
            Upload invoices and automatically extract material costs for the database
          </p>
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-green-600 font-medium">Auto-processing</span>
          </div>
        </Link>

        <Link
          href="/portal/materials/costs"
          className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Database className="w-6 h-6 text-purple-600" />
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#006FEE] transition-colors" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Cost Database</h3>
          <p className="text-gray-600 text-sm mb-4">
            Browse and search all material costs with price history and supplier information
          </p>
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-green-600 font-medium">Price tracking</span>
          </div>
        </Link>
      </div>

      {/* Recent Activity and Key Features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          </div>
          <div className="p-6 space-y-4">
            {recentActivity.map((activity, index) => {
              const ActivityIcon = getActivityIcon(activity.type)
              return (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ActivityIcon className={`w-4 h-4 ${getActivityColor(activity.status)}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-medium text-[#006FEE]">
                        {formatCurrency(activity.amount)}
                      </span>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Key Features */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">System Features</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900">Real-time Material Pricing</h4>
                  <p className="text-sm text-gray-600">Latest supplier prices with automatic updates</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900">Invoice Processing</h4>
                  <p className="text-sm text-gray-600">Upload PDFs and automatically extract line items</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900">Project Integration</h4>
                  <p className="text-sm text-gray-600">Link costs directly to projects for accurate tracking</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900">Price History</h4>
                  <p className="text-sm text-gray-600">Track price changes over time for better forecasting</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900">Database Validation</h4>
                  <p className="text-sm text-gray-600">Comprehensive testing ensures data integrity</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900">Export Capabilities</h4>
                  <p className="text-sm text-gray-600">Generate PDF quotes and cost reports</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Implementation Status */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle className="w-6 h-6 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-900">Phase 6 Implementation Complete</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">✅ Completed Features</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• Material Cost Calculator with database integration</li>
              <li>• Supplier Invoice Upload and processing</li>
              <li>• Real-time price lookup and calculations</li>
              <li>• Project cost integration and tracking</li>
              <li>• Material price history tracking</li>
              <li>• Comprehensive database validation</li>
              <li>• Error handling and data validation</li>
              <li>• Mobile-responsive design</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">🔧 Database Operations Tested</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• MaterialCost table CRUD operations</li>
              <li>• SupplierInvoice table operations</li>
              <li>• Project cost updates via transactions</li>
              <li>• Duplicate prevention and validation</li>
              <li>• Search and filtering functionality</li>
              <li>• Price history retrieval</li>
              <li>• Transaction integrity and rollback</li>
              <li>• Performance optimization</li>
            </ul>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-green-200">
          <p className="text-sm text-gray-600">
            <strong>Ready for Phase 7:</strong> QuickBooks Integration and Customer Portal Synchronization
          </p>
        </div>
      </div>
    </div>
  )
}