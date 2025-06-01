'use client'

import React, { useState } from 'react'
import { Search, Download, Filter, Calendar, DollarSign, FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

// Mock data
const invoiceData = [
  { id: 'INV-2024-001', customer: 'Tesla Motors', amount: 125000, status: 'paid', date: '2024-03-15', dueDate: '2024-04-15', product: 'Battery Cells' },
  { id: 'INV-2024-002', customer: 'Rivian Automotive', amount: 89000, status: 'pending', date: '2024-03-20', dueDate: '2024-04-20', product: 'BMS Systems' },
  { id: 'INV-2024-003', customer: 'Lucid Motors', amount: 156000, status: 'overdue', date: '2024-02-15', dueDate: '2024-03-15', product: 'Battery Packs' },
  { id: 'INV-2024-004', customer: 'General Motors', amount: 234000, status: 'paid', date: '2024-03-10', dueDate: '2024-04-10', product: 'Thermal Management' },
  { id: 'INV-2024-005', customer: 'Ford Motor Company', amount: 178000, status: 'pending', date: '2024-03-25', dueDate: '2024-04-25', product: 'Battery Cells' },
  { id: 'INV-2024-006', customer: 'BMW Group', amount: 145000, status: 'paid', date: '2024-03-05', dueDate: '2024-04-05', product: 'BMS Systems' },
  { id: 'INV-2024-007', customer: 'Mercedes-Benz', amount: 198000, status: 'paid', date: '2024-03-18', dueDate: '2024-04-18', product: 'Battery Packs' },
  { id: 'INV-2024-008', customer: 'Volkswagen Group', amount: 167000, status: 'pending', date: '2024-03-22', dueDate: '2024-04-22', product: 'Thermal Management' },
]

const monthlyRevenue = [
  { month: 'Jan', revenue: 450000, invoices: 12 },
  { month: 'Feb', revenue: 520000, invoices: 15 },
  { month: 'Mar', revenue: 890000, invoices: 23 },
  { month: 'Apr', revenue: 680000, invoices: 18 },
  { month: 'May', revenue: 750000, invoices: 20 },
  { month: 'Jun', revenue: 920000, invoices: 25 },
]

const paymentStatus = [
  { name: 'Paid', value: 65, color: '#10B981' },
  { name: 'Pending', value: 25, color: '#F59E0B' },
  { name: 'Overdue', value: 10, color: '#EF4444' },
]

const productRevenue = [
  { product: 'Battery Cells', revenue: 1250000 },
  { product: 'BMS Systems', revenue: 890000 },
  { product: 'Battery Packs', revenue: 1450000 },
  { product: 'Thermal Management', revenue: 620000 },
]

export default function InvoiceHistoryPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('all')

  const filteredInvoices = invoiceData.filter(invoice => {
    const matchesSearch = invoice.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalRevenue = invoiceData.reduce((sum, inv) => sum + inv.amount, 0)
  const paidRevenue = invoiceData.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0)
  const pendingRevenue = invoiceData.filter(inv => inv.status === 'pending').reduce((sum, inv) => sum + inv.amount, 0)
  const overdueRevenue = invoiceData.filter(inv => inv.status === 'overdue').reduce((sum, inv) => sum + inv.amount, 0)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="h-4 w-4" />
      case 'pending':
        return <Clock className="h-4 w-4" />
      case 'overdue':
        return <AlertCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-500'
      case 'pending':
        return 'bg-yellow-500'
      case 'overdue':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Invoice History</h1>
          <p className="mt-2 text-gray-600">Track payments, revenue trends, and financial performance</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
                  <p className="text-sm text-green-600 mt-1">+15.3% from last month</p>
                </div>
                <div className="rounded-full bg-[#006FEE]/10 p-3">
                  <DollarSign className="h-6 w-6 text-[#006FEE]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Paid Invoices</p>
                  <p className="text-2xl font-bold text-gray-900">${paidRevenue.toLocaleString()}</p>
                  <p className="text-sm text-gray-500 mt-1">{invoiceData.filter(inv => inv.status === 'paid').length} invoices</p>
                </div>
                <div className="rounded-full bg-green-100 p-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Payment</p>
                  <p className="text-2xl font-bold text-gray-900">${pendingRevenue.toLocaleString()}</p>
                  <p className="text-sm text-gray-500 mt-1">{invoiceData.filter(inv => inv.status === 'pending').length} invoices</p>
                </div>
                <div className="rounded-full bg-yellow-100 p-3">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Overdue</p>
                  <p className="text-2xl font-bold text-gray-900">${overdueRevenue.toLocaleString()}</p>
                  <p className="text-sm text-red-600 mt-1">{invoiceData.filter(inv => inv.status === 'overdue').length} invoices</p>
                </div>
                <div className="rounded-full bg-red-100 p-3">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card className="border-0 shadow-sm md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Monthly Revenue Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#666" />
                  <YAxis stroke="#666" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(value: any) => `$${value.toLocaleString()}`} />
                  <Line type="monotone" dataKey="revenue" stroke="#006FEE" strokeWidth={3} dot={{ fill: '#006FEE' }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Payment Status</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={paymentStatus}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {paymentStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: any) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {paymentStatus.map((status) => (
                  <div key={status.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: status.color }} />
                      <span className="text-sm text-gray-600">{status.name}</span>
                    </div>
                    <span className="text-sm font-medium">{status.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Invoice Table */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle className="text-lg font-semibold">Recent Invoices</CardTitle>
              <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search invoices..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full sm:w-64"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Invoice ID</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Customer</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Product</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Amount</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Date</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Due Date</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Status</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b hover:bg-gray-50">
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-gray-400" />
                          <span className="font-medium text-[#006FEE]">{invoice.id}</span>
                        </div>
                      </td>
                      <td className="py-4 text-gray-900">{invoice.customer}</td>
                      <td className="py-4 text-gray-600">{invoice.product}</td>
                      <td className="py-4 font-medium text-gray-900">${invoice.amount.toLocaleString()}</td>
                      <td className="py-4 text-gray-600">{invoice.date}</td>
                      <td className="py-4 text-gray-600">{invoice.dueDate}</td>
                      <td className="py-4">
                        <Badge className={`${getStatusColor(invoice.status)} text-white border-0`}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(invoice.status)}
                            <span className="capitalize">{invoice.status}</span>
                          </div>
                        </Badge>
                      </td>
                      <td className="py-4">
                        <Button variant="ghost" size="sm" className="text-[#006FEE] hover:text-[#006FEE]/80">
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Product Revenue Chart */}
        <Card className="border-0 shadow-sm mt-6">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Revenue by Product</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={productRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="product" stroke="#666" />
                <YAxis stroke="#666" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(value: any) => `$${value.toLocaleString()}`} />
                <Bar dataKey="revenue" fill="#006FEE" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}