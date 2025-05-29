'use client'

import React, { useState } from 'react'
import { Key, Plus, Copy, Eye, EyeOff, Shield, Trash2, RefreshCw, Calendar, Activity, Lock, AlertCircle, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

// Mock data
const apiKeys = [
  { 
    id: 1, 
    name: 'Production API', 
    key: 'sk_live_4eC39HqLyjWDarjtT1zdp7dc', 
    created: '2024-01-15', 
    lastUsed: '2024-03-28 14:30', 
    status: 'active',
    permissions: ['read', 'write', 'delete'],
    rateLimit: '1000/hour',
    usage: 856,
    environment: 'production'
  },
  { 
    id: 2, 
    name: 'Development API', 
    key: 'sk_test_26BLkIqKJXPIlC4E9bGr1ppX', 
    created: '2024-02-20', 
    lastUsed: '2024-03-28 12:15', 
    status: 'active',
    permissions: ['read', 'write'],
    rateLimit: '500/hour',
    usage: 234,
    environment: 'development'
  },
  { 
    id: 3, 
    name: 'Mobile App Key', 
    key: 'sk_mobile_51JaDAEeZvKYlo2CKHSYzABCD', 
    created: '2024-03-01', 
    lastUsed: '2024-03-27 18:45', 
    status: 'active',
    permissions: ['read'],
    rateLimit: '100/hour',
    usage: 45,
    environment: 'production'
  },
  { 
    id: 4, 
    name: 'Analytics Service', 
    key: 'sk_analytics_4eC39HqLyjWDarjtT1', 
    created: '2023-12-10', 
    lastUsed: '2024-03-25 09:30', 
    status: 'expired',
    permissions: ['read'],
    rateLimit: '2000/hour',
    usage: 0,
    environment: 'production'
  },
  { 
    id: 5, 
    name: 'Testing Key', 
    key: 'sk_test_51JaDAEeZvKYlo2CKHSYwNTY', 
    created: '2024-03-15', 
    lastUsed: 'Never', 
    status: 'inactive',
    permissions: ['read', 'write', 'delete'],
    rateLimit: '100/hour',
    usage: 0,
    environment: 'staging'
  },
]

const apiUsageData = [
  { date: 'Mar 22', requests: 4500, errors: 23 },
  { date: 'Mar 23', requests: 5200, errors: 31 },
  { date: 'Mar 24', requests: 3800, errors: 18 },
  { date: 'Mar 25', requests: 6100, errors: 45 },
  { date: 'Mar 26', requests: 5500, errors: 28 },
  { date: 'Mar 27', requests: 7200, errors: 52 },
  { date: 'Mar 28', requests: 4900, errors: 35 },
]

const endpointUsage = [
  { endpoint: '/api/batteries', calls: 2450, avgTime: 120 },
  { endpoint: '/api/tests', calls: 1890, avgTime: 245 },
  { endpoint: '/api/analytics', calls: 1560, avgTime: 380 },
  { endpoint: '/api/reports', calls: 890, avgTime: 560 },
  { endpoint: '/api/users', calls: 650, avgTime: 85 },
]

const keyDistribution = [
  { name: 'Production', value: 45, color: '#006FEE' },
  { name: 'Development', value: 30, color: '#10B981' },
  { name: 'Staging', value: 15, color: '#F59E0B' },
  { name: 'Testing', value: 10, color: '#8B5CF6' },
]

export default function APIKeysManagementPage() {
  const [showKey, setShowKey] = useState<number | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(['read'])
  const [keyName, setKeyName] = useState('')
  const [environment, setEnvironment] = useState('development')
  const [rateLimit, setRateLimit] = useState('500')

  const totalKeys = apiKeys.length
  const activeKeys = apiKeys.filter(key => key.status === 'active').length
  const totalRequests = apiUsageData.reduce((sum, day) => sum + day.requests, 0)
  const totalErrors = apiUsageData.reduce((sum, day) => sum + day.errors, 0)

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key)
    // In a real app, show a toast notification
  }

  const toggleKeyVisibility = (keyId: number) => {
    setShowKey(showKey === keyId ? null : keyId)
  }

  const maskApiKey = (key: string) => {
    return key.substring(0, 7) + '...' + key.substring(key.length - 4)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500'
      case 'inactive':
        return 'bg-gray-500'
      case 'expired':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getEnvironmentColor = (env: string) => {
    switch (env) {
      case 'production':
        return 'bg-red-100 text-red-700'
      case 'development':
        return 'bg-blue-100 text-blue-700'
      case 'staging':
        return 'bg-yellow-100 text-yellow-700'
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
            <h1 className="text-3xl font-bold text-gray-900">API Keys Management</h1>
            <p className="mt-2 text-gray-600">Manage access tokens and monitor API usage</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#006FEE] hover:bg-[#006FEE]/90">
                <Plus className="mr-2 h-4 w-4" />
                Create New Key
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New API Key</DialogTitle>
                <DialogDescription>
                  Generate a new API key with specific permissions and rate limits
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Key Name</Label>
                  <Input
                    id="name"
                    value={keyName}
                    onChange={(e) => setKeyName(e.target.value)}
                    placeholder="e.g., Production API"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="environment">Environment</Label>
                  <Select value={environment} onValueChange={setEnvironment}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="production">Production</SelectItem>
                      <SelectItem value="development">Development</SelectItem>
                      <SelectItem value="staging">Staging</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Permissions</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="read" 
                        checked={selectedPermissions.includes('read')}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedPermissions([...selectedPermissions, 'read'])
                          } else {
                            setSelectedPermissions(selectedPermissions.filter(p => p !== 'read'))
                          }
                        }}
                      />
                      <Label htmlFor="read">Read</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="write" 
                        checked={selectedPermissions.includes('write')}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedPermissions([...selectedPermissions, 'write'])
                          } else {
                            setSelectedPermissions(selectedPermissions.filter(p => p !== 'write'))
                          }
                        }}
                      />
                      <Label htmlFor="write">Write</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="delete" 
                        checked={selectedPermissions.includes('delete')}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedPermissions([...selectedPermissions, 'delete'])
                          } else {
                            setSelectedPermissions(selectedPermissions.filter(p => p !== 'delete'))
                          }
                        }}
                      />
                      <Label htmlFor="delete">Delete</Label>
                    </div>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="rateLimit">Rate Limit (requests/hour)</Label>
                  <Input
                    id="rateLimit"
                    type="number"
                    value={rateLimit}
                    onChange={(e) => setRateLimit(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  className="bg-[#006FEE] hover:bg-[#006FEE]/90"
                  onClick={() => {
                    // Handle key creation
                    setIsCreateDialogOpen(false)
                  }}
                >
                  Create Key
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total API Keys</p>
                  <p className="text-2xl font-bold text-gray-900">{totalKeys}</p>
                  <p className="text-sm text-gray-500 mt-1">{activeKeys} active</p>
                </div>
                <div className="rounded-full bg-[#006FEE]/10 p-3">
                  <Key className="h-6 w-6 text-[#006FEE]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Requests</p>
                  <p className="text-2xl font-bold text-gray-900">{totalRequests.toLocaleString()}</p>
                  <p className="text-sm text-green-600 mt-1">+12.5% this week</p>
                </div>
                <div className="rounded-full bg-green-100 p-3">
                  <Activity className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Error Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{((totalErrors / totalRequests) * 100).toFixed(2)}%</p>
                  <p className="text-sm text-gray-500 mt-1">{totalErrors} errors</p>
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
                  <p className="text-sm text-gray-600">Avg Response</p>
                  <p className="text-2xl font-bold text-gray-900">245ms</p>
                  <p className="text-sm text-green-600 mt-1">-15ms from avg</p>
                </div>
                <div className="rounded-full bg-purple-100 p-3">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card className="border-0 shadow-sm md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">API Usage Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={apiUsageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip />
                  <Line type="monotone" dataKey="requests" stroke="#006FEE" strokeWidth={3} dot={{ fill: '#006FEE' }} />
                  <Line type="monotone" dataKey="errors" stroke="#EF4444" strokeWidth={2} dot={{ fill: '#EF4444' }} />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-4 flex items-center justify-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#006FEE]" />
                  <span className="text-sm text-gray-600">Requests</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#EF4444]" />
                  <span className="text-sm text-gray-600">Errors</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Key Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={keyDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {keyDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: any) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {keyDistribution.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-gray-600">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* API Keys Table */}
        <Card className="border-0 shadow-sm mb-8">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">API Keys</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Name</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">API Key</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Environment</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Status</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Created</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Last Used</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Rate Limit</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {apiKeys.map((apiKey) => (
                    <tr key={apiKey.id} className="border-b hover:bg-gray-50">
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-gray-400" />
                          <span className="font-medium text-gray-900">{apiKey.name}</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <code className="text-sm text-gray-600">
                            {showKey === apiKey.id ? apiKey.key : maskApiKey(apiKey.key)}
                          </code>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleKeyVisibility(apiKey.id)}
                          >
                            {showKey === apiKey.id ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopyKey(apiKey.key)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                      <td className="py-4">
                        <Badge className={getEnvironmentColor(apiKey.environment)}>
                          {apiKey.environment}
                        </Badge>
                      </td>
                      <td className="py-4">
                        <Badge className={`${getStatusColor(apiKey.status)} text-white border-0`}>
                          {apiKey.status}
                        </Badge>
                      </td>
                      <td className="py-4 text-gray-600">{apiKey.created}</td>
                      <td className="py-4 text-gray-600">{apiKey.lastUsed}</td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">{apiKey.rateLimit}</span>
                          <div className="h-2 w-24 rounded-full bg-gray-200">
                            <div
                              className="h-full rounded-full bg-[#006FEE]"
                              style={{ width: `${(apiKey.usage / parseInt(apiKey.rateLimit)) * 100}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex gap-2">
                          {apiKey.status === 'active' && (
                            <Button variant="ghost" size="sm">
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                          )}
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Endpoint Usage */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Top Endpoints by Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={endpointUsage} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" stroke="#666" />
                <YAxis type="category" dataKey="endpoint" stroke="#666" width={120} />
                <Tooltip />
                <Bar dataKey="calls" fill="#006FEE" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 grid gap-2">
              {endpointUsage.map((endpoint) => (
                <div key={endpoint.endpoint} className="flex items-center justify-between rounded-lg border border-gray-200 p-3">
                  <div className="flex items-center gap-3">
                    <Activity className="h-4 w-4 text-gray-400" />
                    <span className="font-mono text-sm text-gray-700">{endpoint.endpoint}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">{endpoint.calls.toLocaleString()} calls</span>
                    <Badge variant="outline">{endpoint.avgTime}ms avg</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}