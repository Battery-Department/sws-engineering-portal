'use client'

import React, { useState } from 'react'
import { Play, Pause, RefreshCw, CheckCircle, Clock, AlertCircle, Activity, Zap, Server, Database } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// Mock data
const queueJobs = [
  { id: 'JOB-001', name: 'Battery Test Analysis', type: 'analysis', status: 'running', progress: 75, duration: '12m 34s', priority: 'high', cpu: 45, memory: 68 },
  { id: 'JOB-002', name: 'Data Synchronization', type: 'sync', status: 'queued', progress: 0, duration: '-', priority: 'medium', cpu: 0, memory: 0 },
  { id: 'JOB-003', name: 'Report Generation', type: 'report', status: 'completed', progress: 100, duration: '5m 12s', priority: 'low', cpu: 0, memory: 0 },
  { id: 'JOB-004', name: 'ML Model Training', type: 'ml', status: 'running', progress: 32, duration: '45m 23s', priority: 'high', cpu: 89, memory: 92 },
  { id: 'JOB-005', name: 'Database Backup', type: 'backup', status: 'queued', progress: 0, duration: '-', priority: 'medium', cpu: 0, memory: 0 },
  { id: 'JOB-006', name: 'Performance Testing', type: 'test', status: 'failed', progress: 67, duration: '8m 45s', priority: 'high', cpu: 0, memory: 0 },
  { id: 'JOB-007', name: 'Cell Optimization', type: 'optimization', status: 'running', progress: 58, duration: '23m 11s', priority: 'medium', cpu: 67, memory: 54 },
  { id: 'JOB-008', name: 'Quality Analysis', type: 'analysis', status: 'completed', progress: 100, duration: '15m 08s', priority: 'low', cpu: 0, memory: 0 },
]

const systemMetrics = [
  { time: '00:00', cpu: 45, memory: 62, jobs: 12 },
  { time: '04:00', cpu: 38, memory: 58, jobs: 8 },
  { time: '08:00', cpu: 72, memory: 75, jobs: 24 },
  { time: '12:00', cpu: 85, memory: 82, jobs: 32 },
  { time: '16:00', cpu: 68, memory: 70, jobs: 28 },
  { time: '20:00', cpu: 52, memory: 65, jobs: 18 },
  { time: '24:00', cpu: 42, memory: 60, jobs: 14 },
]

const jobTypes = [
  { type: 'Analysis', count: 45, avgTime: '18m', color: '#006FEE' },
  { type: 'Sync', count: 32, avgTime: '5m', color: '#10B981' },
  { type: 'ML Training', count: 12, avgTime: '2h 15m', color: '#F59E0B' },
  { type: 'Testing', count: 28, avgTime: '25m', color: '#8B5CF6' },
  { type: 'Backup', count: 15, avgTime: '35m', color: '#EF4444' },
]

const throughputData = [
  { hour: '0', completed: 12, failed: 1 },
  { hour: '4', completed: 8, failed: 0 },
  { hour: '8', completed: 24, failed: 2 },
  { hour: '12', completed: 32, failed: 3 },
  { hour: '16', completed: 28, failed: 2 },
  { hour: '20', completed: 18, failed: 1 },
]

export default function JobQueueMonitorPage() {
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')

  const filteredJobs = queueJobs.filter(job => {
    const matchesStatus = filterStatus === 'all' || job.status === filterStatus
    const matchesPriority = filterPriority === 'all' || job.priority === filterPriority
    return matchesStatus && matchesPriority
  })

  const totalJobs = queueJobs.length
  const runningJobs = queueJobs.filter(job => job.status === 'running').length
  const queuedJobs = queueJobs.filter(job => job.status === 'queued').length
  const completedJobs = queueJobs.filter(job => job.status === 'completed').length
  const failedJobs = queueJobs.filter(job => job.status === 'failed').length

  const avgCpuUsage = Math.round(queueJobs.filter(job => job.status === 'running').reduce((sum, job) => sum + job.cpu, 0) / runningJobs || 0)
  const avgMemoryUsage = Math.round(queueJobs.filter(job => job.status === 'running').reduce((sum, job) => sum + job.memory, 0) / runningJobs || 0)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <Play className="h-4 w-4" />
      case 'queued':
        return <Clock className="h-4 w-4" />
      case 'completed':
        return <CheckCircle className="h-4 w-4" />
      case 'failed':
        return <AlertCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-blue-500'
      case 'queued':
        return 'bg-yellow-500'
      case 'completed':
        return 'bg-green-500'
      case 'failed':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700'
      case 'medium':
        return 'bg-yellow-100 text-yellow-700'
      case 'low':
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
            <h1 className="text-3xl font-bold text-gray-900">Job Queue Monitor</h1>
            <p className="mt-2 text-gray-600">Real-time monitoring of system jobs and resource utilization</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button className="bg-[#006FEE] hover:bg-[#006FEE]/90">
              <Pause className="mr-2 h-4 w-4" />
              Pause Queue
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-6 mb-8">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Jobs</p>
                  <p className="text-2xl font-bold text-gray-900">{totalJobs}</p>
                </div>
                <div className="rounded-full bg-[#006FEE]/10 p-3">
                  <Activity className="h-6 w-6 text-[#006FEE]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Running</p>
                  <p className="text-2xl font-bold text-blue-600">{runningJobs}</p>
                </div>
                <div className="rounded-full bg-blue-100 p-3">
                  <Play className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Queued</p>
                  <p className="text-2xl font-bold text-yellow-600">{queuedJobs}</p>
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
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-green-600">{completedJobs}</p>
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
                  <p className="text-sm text-gray-600">CPU Usage</p>
                  <p className="text-2xl font-bold text-gray-900">{avgCpuUsage}%</p>
                </div>
                <div className="rounded-full bg-purple-100 p-3">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Memory</p>
                  <p className="text-2xl font-bold text-gray-900">{avgMemoryUsage}%</p>
                </div>
                <div className="rounded-full bg-indigo-100 p-3">
                  <Database className="h-6 w-6 text-indigo-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">System Resource Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={systemMetrics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="time" stroke="#666" />
                  <YAxis stroke="#666" tickFormatter={(value) => `${value}%`} />
                  <Tooltip formatter={(value: any) => `${value}%`} />
                  <Area type="monotone" dataKey="cpu" stackId="1" stroke="#006FEE" fill="#006FEE" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="memory" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
              <div className="mt-4 flex items-center justify-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#006FEE]" />
                  <span className="text-sm text-gray-600">CPU Usage</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#10B981]" />
                  <span className="text-sm text-gray-600">Memory Usage</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Job Throughput</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={throughputData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="hour" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip />
                  <Bar dataKey="completed" fill="#10B981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="failed" fill="#EF4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 flex items-center justify-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#10B981]" />
                  <span className="text-sm text-gray-600">Completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#EF4444]" />
                  <span className="text-sm text-gray-600">Failed</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Job Queue Table */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Active Job Queue</CardTitle>
              <div className="flex gap-2">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="running">Running</SelectItem>
                    <SelectItem value="queued">Queued</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterPriority} onValueChange={setFilterPriority}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
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
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Job ID</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Name</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Type</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Status</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Progress</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Duration</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Priority</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Resources</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredJobs.map((job) => (
                    <tr key={job.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 font-medium text-[#006FEE]">{job.id}</td>
                      <td className="py-4 text-gray-900">{job.name}</td>
                      <td className="py-4">
                        <Badge variant="outline" className="capitalize">
                          {job.type}
                        </Badge>
                      </td>
                      <td className="py-4">
                        <Badge className={`${getStatusColor(job.status)} text-white border-0`}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(job.status)}
                            <span className="capitalize">{job.status}</span>
                          </div>
                        </Badge>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <Progress value={job.progress} className="w-20" />
                          <span className="text-sm text-gray-600">{job.progress}%</span>
                        </div>
                      </td>
                      <td className="py-4 text-gray-600">{job.duration}</td>
                      <td className="py-4">
                        <Badge className={getPriorityColor(job.priority)}>
                          {job.priority}
                        </Badge>
                      </td>
                      <td className="py-4">
                        {job.status === 'running' && (
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Zap className="h-3 w-3 text-purple-600" />
                              <span className="text-gray-600">{job.cpu}%</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Database className="h-3 w-3 text-indigo-600" />
                              <span className="text-gray-600">{job.memory}%</span>
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="py-4">
                        <div className="flex gap-2">
                          {job.status === 'running' && (
                            <Button variant="ghost" size="sm">
                              <Pause className="h-4 w-4" />
                            </Button>
                          )}
                          {job.status === 'queued' && (
                            <Button variant="ghost" size="sm">
                              <Play className="h-4 w-4" />
                            </Button>
                          )}
                          <Button variant="ghost" size="sm" className="text-[#006FEE] hover:text-[#006FEE]/80">
                            View
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

        {/* Job Types Summary */}
        <Card className="border-0 shadow-sm mt-6">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Job Types Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-5">
              {jobTypes.map((type) => (
                <div key={type.type} className="rounded-lg border border-gray-200 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">{type.type}</h3>
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: type.color }} />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{type.count}</p>
                  <p className="text-sm text-gray-600">Avg: {type.avgTime}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}