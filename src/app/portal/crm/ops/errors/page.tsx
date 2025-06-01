'use client'

import React, { useState } from 'react'
import { AlertCircle, AlertTriangle, Info, Bug, TrendingUp, TrendingDown, Filter, Search, RefreshCw, FileText, CheckCircle, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

// Mock data
const errorLogs = [
  { id: 'ERR-001', timestamp: '2024-03-28 14:32:15', level: 'error', message: 'Battery temperature sensor connection failed', service: 'BMS Monitor', endpoint: '/api/sensors/temp', count: 3, status: 'active' },
  { id: 'ERR-002', timestamp: '2024-03-28 14:28:45', level: 'warning', message: 'High memory usage detected in analytics service', service: 'Analytics Engine', endpoint: '/api/analytics/process', count: 1, status: 'resolved' },
  { id: 'ERR-003', timestamp: '2024-03-28 14:25:10', level: 'critical', message: 'Database connection timeout', service: 'Database', endpoint: '/api/db/connect', count: 5, status: 'active' },
  { id: 'ERR-004', timestamp: '2024-03-28 14:20:33', level: 'info', message: 'Rate limit exceeded for API endpoint', service: 'API Gateway', endpoint: '/api/v1/batteries', count: 12, status: 'monitoring' },
  { id: 'ERR-005', timestamp: '2024-03-28 14:15:22', level: 'error', message: 'Failed to process battery test results', service: 'Test Processor', endpoint: '/api/tests/process', count: 2, status: 'active' },
  { id: 'ERR-006', timestamp: '2024-03-28 14:10:18', level: 'warning', message: 'Slow response time detected', service: 'Web Server', endpoint: '/api/dashboard', count: 8, status: 'monitoring' },
  { id: 'ERR-007', timestamp: '2024-03-28 14:05:55', level: 'error', message: 'Authentication service unavailable', service: 'Auth Service', endpoint: '/api/auth/login', count: 4, status: 'resolved' },
  { id: 'ERR-008', timestamp: '2024-03-28 14:00:12', level: 'critical', message: 'Data synchronization failed', service: 'Sync Service', endpoint: '/api/sync/data', count: 1, status: 'active' },
]

const errorTrends = [
  { time: '00:00', errors: 12, warnings: 8, critical: 2 },
  { time: '04:00', errors: 8, warnings: 5, critical: 1 },
  { time: '08:00', errors: 25, warnings: 15, critical: 3 },
  { time: '12:00', errors: 35, warnings: 22, critical: 5 },
  { time: '16:00', errors: 28, warnings: 18, critical: 4 },
  { time: '20:00', errors: 15, warnings: 10, critical: 2 },
  { time: '24:00', errors: 10, warnings: 7, critical: 1 },
]

const errorsByService = [
  { name: 'BMS Monitor', value: 35, color: '#EF4444' },
  { name: 'Analytics Engine', value: 25, color: '#F59E0B' },
  { name: 'Database', value: 20, color: '#8B5CF6' },
  { name: 'API Gateway', value: 15, color: '#10B981' },
  { name: 'Other', value: 5, color: '#6B7280' },
]

const responseTimeData = [
  { endpoint: '/api/batteries', p50: 120, p95: 450, p99: 890 },
  { endpoint: '/api/tests', p50: 200, p95: 580, p99: 1200 },
  { endpoint: '/api/analytics', p50: 350, p95: 820, p99: 1500 },
  { endpoint: '/api/reports', p50: 180, p95: 520, p99: 980 },
  { endpoint: '/api/sync', p50: 450, p95: 1100, p99: 2200 },
]

const errorResolution = [
  { day: 'Mon', resolved: 45, unresolved: 12 },
  { day: 'Tue', resolved: 52, unresolved: 8 },
  { day: 'Wed', resolved: 38, unresolved: 15 },
  { day: 'Thu', resolved: 60, unresolved: 10 },
  { day: 'Fri', resolved: 48, unresolved: 18 },
  { day: 'Sat', resolved: 35, unresolved: 5 },
  { day: 'Sun', resolved: 28, unresolved: 3 },
]

export default function ErrorTrackingPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [levelFilter, setLevelFilter] = useState('all')
  const [serviceFilter, setServiceFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredErrors = errorLogs.filter(error => {
    const matchesSearch = error.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         error.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         error.endpoint.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = levelFilter === 'all' || error.level === levelFilter
    const matchesService = serviceFilter === 'all' || error.service === serviceFilter
    const matchesStatus = statusFilter === 'all' || error.status === statusFilter
    return matchesSearch && matchesLevel && matchesService && matchesStatus
  })

  const totalErrors = errorLogs.length
  const criticalErrors = errorLogs.filter(err => err.level === 'critical').length
  const activeErrors = errorLogs.filter(err => err.status === 'active').length
  const resolvedToday = errorLogs.filter(err => err.status === 'resolved').length

  const errorRate = 2.3 // errors per minute
  const resolutionTime = 15.4 // average minutes

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'critical':
        return <AlertCircle className="h-4 w-4" />
      case 'error':
        return <Bug className="h-4 w-4" />
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />
      case 'info':
        return <Info className="h-4 w-4" />
      default:
        return null
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'critical':
        return 'bg-red-500'
      case 'error':
        return 'bg-orange-500'
      case 'warning':
        return 'bg-yellow-500'
      case 'info':
        return 'bg-blue-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-red-100 text-red-700'
      case 'monitoring':
        return 'bg-yellow-100 text-yellow-700'
      case 'resolved':
        return 'bg-green-100 text-green-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Error Tracking</h1>
            <p className="mt-2 text-gray-600">Monitor system errors, exceptions, and performance issues</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button className="bg-[#006FEE] hover:bg-[#006FEE]/90">
              <FileText className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-6 mb-8">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Errors</p>
                  <p className="text-2xl font-bold text-gray-900">{totalErrors}</p>
                  <p className="text-sm text-red-600 mt-1 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +12.5%
                  </p>
                </div>
                <div className="rounded-full bg-gray-100 p-3">
                  <Bug className="h-6 w-6 text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Critical</p>
                  <p className="text-2xl font-bold text-red-600">{criticalErrors}</p>
                  <p className="text-sm text-gray-500 mt-1">High priority</p>
                </div>
                <div className="rounded-full bg-red-100 p-3">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Issues</p>
                  <p className="text-2xl font-bold text-orange-600">{activeErrors}</p>
                  <p className="text-sm text-gray-500 mt-1">Unresolved</p>
                </div>
                <div className="rounded-full bg-orange-100 p-3">
                  <AlertTriangle className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Resolved Today</p>
                  <p className="text-2xl font-bold text-green-600">{resolvedToday}</p>
                  <p className="text-sm text-green-600 mt-1 flex items-center">
                    <TrendingDown className="h-3 w-3 mr-1" />
                    -8.3%
                  </p>
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
                  <p className="text-sm text-gray-600">Error Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{errorRate}/min</p>
                  <p className="text-sm text-gray-500 mt-1">Average</p>
                </div>
                <div className="rounded-full bg-[#006FEE]/10 p-3">
                  <TrendingUp className="h-6 w-6 text-[#006FEE]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Resolution</p>
                  <p className="text-2xl font-bold text-gray-900">{resolutionTime}m</p>
                  <p className="text-sm text-gray-500 mt-1">Time to fix</p>
                </div>
                <div className="rounded-full bg-purple-100 p-3">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card className="border-0 shadow-sm md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Error Trends (24h)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={errorTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="time" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip />
                  <Area type="monotone" dataKey="critical" stackId="1" stroke="#EF4444" fill="#EF4444" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="errors" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="warnings" stackId="1" stroke="#FCD34D" fill="#FCD34D" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
              <div className="mt-4 flex items-center justify-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#EF4444]" />
                  <span className="text-sm text-gray-600">Critical</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#F59E0B]" />
                  <span className="text-sm text-gray-600">Errors</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#FCD34D]" />
                  <span className="text-sm text-gray-600">Warnings</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Errors by Service</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={errorsByService}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {errorsByService.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {errorsByService.map((service) => (
                  <div key={service.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: service.color }} />
                      <span className="text-sm text-gray-600">{service.name}</span>
                    </div>
                    <span className="text-sm font-medium">{service.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Error Logs Table */}
        <Card className="border-0 shadow-sm mb-8">
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle className="text-lg font-semibold">Recent Error Logs</CardTitle>
              <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search errors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full sm:w-64"
                  />
                </div>
                <Select value={levelFilter} onValueChange={setLevelFilter}>
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="monitoring">Monitoring</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Timestamp</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Level</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Message</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Service</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Endpoint</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Count</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Status</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredErrors.map((error) => (
                    <tr key={error.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 text-sm text-gray-600">{error.timestamp}</td>
                      <td className="py-4">
                        <Badge className={`${getLevelColor(error.level)} text-white border-0`}>
                          <div className="flex items-center gap-1">
                            {getLevelIcon(error.level)}
                            <span className="capitalize">{error.level}</span>
                          </div>
                        </Badge>
                      </td>
                      <td className="py-4 text-gray-900 max-w-xs truncate">{error.message}</td>
                      <td className="py-4 text-gray-600">{error.service}</td>
                      <td className="py-4 font-mono text-sm text-gray-600">{error.endpoint}</td>
                      <td className="py-4 text-center">
                        <Badge variant="outline">{error.count}</Badge>
                      </td>
                      <td className="py-4">
                        <Badge className={getStatusColor(error.status)}>
                          {error.status}
                        </Badge>
                      </td>
                      <td className="py-4">
                        <Button variant="ghost" size="sm" className="text-[#006FEE] hover:text-[#006FEE]/80">
                          Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Additional Charts */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Response Time by Endpoint</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={responseTimeData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" stroke="#666" tickFormatter={(value) => `${value}ms`} />
                  <YAxis type="category" dataKey="endpoint" stroke="#666" width={120} />
                  <Tooltip formatter={(value: any) => `${value}ms`} />
                  <Bar dataKey="p50" fill="#10B981" name="P50" />
                  <Bar dataKey="p95" fill="#F59E0B" name="P95" />
                  <Bar dataKey="p99" fill="#EF4444" name="P99" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Error Resolution Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={errorResolution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip />
                  <Bar dataKey="resolved" fill="#10B981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="unresolved" fill="#EF4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 flex items-center justify-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#10B981]" />
                  <span className="text-sm text-gray-600">Resolved</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#EF4444]" />
                  <span className="text-sm text-gray-600">Unresolved</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}