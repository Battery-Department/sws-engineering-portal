'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  PoundSterling,
  TrendingUp,
  TrendingDown,
  Calendar,
  FileText,
  Clock,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  DollarSign,
  Users,
  Folder,
  CreditCard,
  Receipt,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Filter
} from 'lucide-react'

// Mock financial data
const mockFinancialData = {
  overview: {
    totalRevenue: 587500,
    monthlyRevenue: 42500,
    outstandingInvoices: 125000,
    paidInvoices: 462500,
    profitMargin: 28.5,
    monthlyGrowth: 12.3,
    averageProjectValue: 18750,
    cashFlow: 67500
  },
  monthlyData: [
    { month: 'Jan', revenue: 35000, costs: 24500, profit: 10500 },
    { month: 'Feb', revenue: 28000, costs: 19600, profit: 8400 },
    { month: 'Mar', revenue: 45000, costs: 31500, profit: 13500 },
    { month: 'Apr', revenue: 52000, costs: 36400, profit: 15600 },
    { month: 'May', revenue: 42500, costs: 29750, profit: 12750 },
    { month: 'Jun', revenue: 38000, costs: 26600, profit: 11400 }
  ],
  recentInvoices: [
    {
      id: 'INV-2024-047',
      projectId: 'PROJ-2024-047',
      client: 'Bodmin & Wenford Railway',
      amount: 22500,
      status: 'paid',
      dueDate: '2024-05-15',
      paidDate: '2024-05-12',
      description: '7¼" Gauge Steam Locomotive - Progress Payment 2'
    },
    {
      id: 'INV-2024-052',
      projectId: 'PROJ-2024-052',
      client: 'Cornwall Mining Heritage',
      amount: 6250,
      status: 'outstanding',
      dueDate: '2024-06-01',
      description: 'Pump House Machinery Overhaul - Interim Payment'
    },
    {
      id: 'INV-2024-055',
      projectId: 'PROJ-2024-055',
      client: 'Private Collector',
      amount: 7800,
      status: 'overdue',
      dueDate: '2024-05-20',
      description: 'Custom Coupling Assembly Design - Final Payment'
    },
    {
      id: 'INV-2024-058',
      projectId: 'PROJ-2024-058',
      client: 'Heritage Railway Trust',
      amount: 7500,
      status: 'draft',
      dueDate: '2024-06-15',
      description: 'Signal Box Restoration CAD - Progress Payment 1'
    },
    {
      id: 'INV-2024-061',
      projectId: 'PROJ-2024-061',
      client: 'Cornish Steam Society',
      amount: 14250,
      status: 'sent',
      dueDate: '2024-06-10',
      description: 'Steam Traction Engine Rebuild - Deposit'
    }
  ],
  projectProfitability: [
    {
      projectId: 'PROJ-2024-047',
      name: '7¼" Gauge Steam Locomotive Restoration',
      quotedAmount: 45000,
      actualCosts: 32750,
      invoicedAmount: 30000,
      paidAmount: 25000,
      profitMargin: 27.2,
      status: 'on_track'
    },
    {
      projectId: 'PROJ-2024-052',
      name: 'Pump House Machinery Overhaul',
      quotedAmount: 12500,
      actualCosts: 3200,
      invoicedAmount: 6250,
      paidAmount: 0,
      profitMargin: 74.4,
      status: 'excellent'
    },
    {
      projectId: 'PROJ-2024-055',
      name: 'Custom Coupling Assembly Design',
      quotedAmount: 8750,
      actualCosts: 6100,
      invoicedAmount: 8750,
      paidAmount: 0,
      profitMargin: 30.3,
      status: 'good'
    }
  ]
}

export default function FinancialOverviewPage() {
  const [timeframe, setTimeframe] = useState('6months')
  const [selectedFilter, setSelectedFilter] = useState('all')

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const getInvoiceStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'text-green-600 bg-green-50'
      case 'sent': return 'text-blue-600 bg-blue-50'
      case 'outstanding': return 'text-orange-600 bg-orange-50'
      case 'overdue': return 'text-red-600 bg-red-50'
      case 'draft': return 'text-gray-600 bg-gray-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getInvoiceStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return CheckCircle
      case 'sent': return FileText
      case 'outstanding': return Clock
      case 'overdue': return AlertTriangle
      case 'draft': return FileText
      default: return FileText
    }
  }

  const getProfitabilityStatus = (margin: number) => {
    if (margin >= 40) return { label: 'Excellent', color: 'text-green-600 bg-green-50' }
    if (margin >= 25) return { label: 'Good', color: 'text-blue-600 bg-blue-50' }
    if (margin >= 15) return { label: 'Fair', color: 'text-orange-600 bg-orange-50' }
    return { label: 'Low', color: 'text-red-600 bg-red-50' }
  }

  const totalYearRevenue = mockFinancialData.monthlyData.reduce((sum, month) => sum + month.revenue, 0)
  const totalYearProfit = mockFinancialData.monthlyData.reduce((sum, month) => sum + month.profit, 0)
  const averageMonthlyRevenue = totalYearRevenue / mockFinancialData.monthlyData.length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Financial Overview</h1>
          <p className="text-gray-600">Track revenue, costs, and project profitability</p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#006FEE] focus:border-transparent"
          >
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="12months">Last 12 Months</option>
            <option value="ytd">Year to Date</option>
          </select>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <PoundSterling className="w-6 h-6 text-green-600" />
            </div>
            <span className="flex items-center text-sm text-green-600">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              +{mockFinancialData.overview.monthlyGrowth}%
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Total Revenue</h3>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(mockFinancialData.overview.totalRevenue)}</p>
          <p className="text-sm text-gray-600 mt-1">This month: {formatCurrency(mockFinancialData.overview.monthlyRevenue)}</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <span className="flex items-center text-sm text-blue-600">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              +2.1%
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Profit Margin</h3>
          <p className="text-2xl font-bold text-gray-900">{mockFinancialData.overview.profitMargin}%</p>
          <p className="text-sm text-gray-600 mt-1">Industry avg: 22%</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <span className="flex items-center text-sm text-orange-600">
              <ArrowDownRight className="w-4 h-4 mr-1" />
              -5.2%
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Outstanding</h3>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(mockFinancialData.overview.outstandingInvoices)}</p>
          <p className="text-sm text-gray-600 mt-1">Average: 28 days</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
            <span className="flex items-center text-sm text-green-600">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              +8.7%
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Avg Project Value</h3>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(mockFinancialData.overview.averageProjectValue)}</p>
          <p className="text-sm text-gray-600 mt-1">Last year: £17,200</p>
        </div>
      </div>

      {/* Revenue Chart and Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#006FEE] rounded-full"></div>
                <span className="text-gray-600">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">Profit</span>
              </div>
            </div>
          </div>
          
          {/* Simple bar chart representation */}
          <div className="space-y-4">
            {mockFinancialData.monthlyData.map((month, index) => (
              <div key={month.month} className="flex items-center gap-4">
                <div className="w-8 text-xs text-gray-600 font-medium">{month.month}</div>
                <div className="flex-1 flex gap-1">
                  <div 
                    className="bg-[#006FEE] h-6 rounded-sm flex items-center justify-end pr-2"
                    style={{ width: `${(month.revenue / 60000) * 100}%`, minWidth: '60px' }}
                  >
                    <span className="text-xs text-white font-medium">{formatCurrency(month.revenue)}</span>
                  </div>
                  <div 
                    className="bg-green-500 h-6 rounded-sm flex items-center justify-end pr-2"
                    style={{ width: `${(month.profit / 60000) * 100}%`, minWidth: '40px' }}
                  >
                    <span className="text-xs text-white font-medium">{formatCurrency(month.profit)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Total Revenue</p>
                <p className="font-semibold text-gray-900">{formatCurrency(totalYearRevenue)}</p>
              </div>
              <div>
                <p className="text-gray-600">Total Profit</p>
                <p className="font-semibold text-gray-900">{formatCurrency(totalYearProfit)}</p>
              </div>
              <div>
                <p className="text-gray-600">Monthly Average</p>
                <p className="font-semibold text-gray-900">{formatCurrency(averageMonthlyRevenue)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cash Flow */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Cash Flow</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600">Current Balance</span>
              <span className="font-semibold text-gray-900">{formatCurrency(mockFinancialData.overview.cashFlow)}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600">Incoming (30d)</span>
              <span className="font-semibold text-green-600">{formatCurrency(85000)}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600">Outgoing (30d)</span>
              <span className="font-semibold text-red-600">-{formatCurrency(42000)}</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-gray-600">Projected (30d)</span>
              <span className="font-semibold text-blue-600">{formatCurrency(110500)}</span>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="bg-gray-100 rounded-full h-2 mb-2">
              <div 
                className="bg-gradient-to-r from-[#006FEE] to-[#0050B3] h-2 rounded-full"
                style={{ width: '68%' }}
              ></div>
            </div>
            <p className="text-xs text-gray-600">68% of target reached</p>
          </div>
        </div>
      </div>

      {/* Recent Invoices and Project Profitability */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Invoices */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Recent Invoices</h3>
            <Link
              href="/portal/financial/invoices"
              className="text-sm text-[#006FEE] hover:text-[#0050B3] font-medium"
            >
              View all
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {mockFinancialData.recentInvoices.map((invoice) => {
              const StatusIcon = getInvoiceStatusIcon(invoice.status)
              return (
                <div key={invoice.id} className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <div 
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${getInvoiceStatusColor(invoice.status)}`}
                      >
                        <StatusIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{invoice.id}</h4>
                        <p className="text-sm text-gray-600">{invoice.client}</p>
                        <p className="text-xs text-gray-500 mt-1">{invoice.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{formatCurrency(invoice.amount)}</p>
                      <span 
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getInvoiceStatusColor(invoice.status)}`}
                      >
                        {invoice.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Due: {formatDate(invoice.dueDate)}</span>
                    {invoice.paidDate && <span>Paid: {formatDate(invoice.paidDate)}</span>}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Project Profitability */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Project Profitability</h3>
            <Link
              href="/portal/projects/active"
              className="text-sm text-[#006FEE] hover:text-[#0050B3] font-medium"
            >
              View all
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {mockFinancialData.projectProfitability.map((project) => {
              const profitabilityStatus = getProfitabilityStatus(project.profitMargin)
              const profitAmount = project.quotedAmount - project.actualCosts
              
              return (
                <div key={project.projectId} className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">{project.name}</h4>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <span>Quoted: {formatCurrency(project.quotedAmount)}</span>
                        <span>Costs: {formatCurrency(project.actualCosts)}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">{formatCurrency(profitAmount)}</p>
                      <span 
                        className={`px-2 py-1 text-xs font-medium rounded-full ${profitabilityStatus.color}`}
                      >
                        {project.profitMargin.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-gradient-to-r from-[#006FEE] to-[#0050B3]"
                      style={{ width: `${(project.paidAmount / project.quotedAmount) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>Paid: {formatCurrency(project.paidAmount)}</span>
                    <span>{((project.paidAmount / project.quotedAmount) * 100).toFixed(0)}% complete</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}