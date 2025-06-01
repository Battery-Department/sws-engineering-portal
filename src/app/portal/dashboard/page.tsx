'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  Folder, 
  PoundSterling, 
  FileText, 
  AlertTriangle,
  TrendingUp,
  Calendar,
  Clock,
  User,
  ChevronRight,
  Plus,
  Train,
  Cog,
  Factory,
  Wrench,
  CheckCircle,
  Eye,
  MessageSquare
} from 'lucide-react'
import { SERVICE_TYPES, PROJECT_STATUS, PRIORITY_LEVELS } from '@/config/navigation'

// Sample data - replace with actual API calls
const mockStats = {
  activeProjects: 8,
  thisMonthRevenue: 42500,
  outstandingQuotes: 6,
  overdueProjects: 2
}

const mockActiveProjects = [
  {
    id: 'PROJ-2024-047',
    name: '7¼" Gauge Steam Locomotive Restoration',
    client: 'Bodmin & Wenford Railway',
    service: 'steam',
    currentStage: 'manufacturing',
    progress: 65,
    priority: 'normal',
    targetDate: '2024-08-30',
    quotedAmount: 45000,
    daysUntilDeadline: 45
  },
  {
    id: 'PROJ-2024-052',
    name: 'Pump House Machinery Overhaul',
    client: 'Cornwall Mining Heritage',
    service: 'repair',
    currentStage: 'design_phase',
    progress: 25,
    priority: 'urgent',
    targetDate: '2024-07-20',
    quotedAmount: 12500,
    daysUntilDeadline: 15
  },
  {
    id: 'PROJ-2024-055',
    name: 'Custom Coupling Assembly Design',
    client: 'Private Collector',
    service: 'cad',
    currentStage: 'quality_check',
    progress: 85,
    priority: 'normal',
    targetDate: '2024-06-10',
    quotedAmount: 8750,
    daysUntilDeadline: 5
  },
  {
    id: 'PROJ-2024-058',
    name: 'Signal Box Restoration CAD',
    client: 'Heritage Railway Trust',
    service: 'cad',
    currentStage: 'materials_ordered',
    progress: 40,
    priority: 'low',
    targetDate: '2024-09-15',
    quotedAmount: 15000,
    daysUntilDeadline: 62
  }
]

const mockRecentActivity = [
  {
    id: 1,
    type: 'stage_completed',
    project: 'PROJ-2024-047',
    message: 'Cylinder machining completed',
    time: '2 hours ago',
    icon: CheckCircle,
    color: '#10B981'
  },
  {
    id: 2,
    type: 'document_uploaded',
    project: 'PROJ-2024-052',
    message: 'CAD drawings v3.2 uploaded',
    time: '5 hours ago',
    icon: FileText,
    color: '#3B82F6'
  },
  {
    id: 3,
    type: 'new_enquiry',
    project: 'ENQUIRY-2024-089',
    message: 'New enquiry: Boiler inspection service',
    time: 'Yesterday',
    icon: Plus,
    color: '#F59E0B'
  },
  {
    id: 4,
    type: 'payment_received',
    project: 'PROJ-2024-044',
    message: 'Payment received: £25,000',
    time: '2 days ago',
    icon: PoundSterling,
    color: '#10B981'
  }
]

export default function DashboardPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('week')

  const getServiceIcon = (service: string) => {
    switch (service) {
      case 'steam': return Train
      case 'cad': return Cog
      case 'repair': return Factory
      case 'fabrication': return Wrench
      default: return Folder
    }
  }

  const getServiceColor = (service: string) => {
    const serviceType = SERVICE_TYPES.find(s => s.id === service)
    return serviceType?.color || '#6B7280'
  }

  const getPriorityColor = (priority: string) => {
    const priorityLevel = PRIORITY_LEVELS.find(p => p.id === priority)
    return priorityLevel?.color || '#6B7280'
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 75) return '#10B981'
    if (progress >= 50) return '#F59E0B'
    return '#3B82F6'
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(amount)
  }

  const getDaysUntilColor = (days: number) => {
    if (days <= 7) return 'text-red-600 bg-red-50'
    if (days <= 30) return 'text-orange-600 bg-orange-50'
    return 'text-green-600 bg-green-50'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Overview of your engineering projects and business metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#006FEE] focus:border-transparent"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
          </select>
          <Link
            href="/portal/requirements"
            className="px-4 py-2 bg-[#006FEE] text-white rounded-lg hover:bg-[#0050B3] transition-colors text-sm font-medium flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Project
          </Link>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: 'Active Projects',
            value: mockStats.activeProjects.toString(),
            icon: Folder,
            color: '#3B82F6',
            href: '/portal/projects/active'
          },
          {
            label: 'This Month Revenue',
            value: formatCurrency(mockStats.thisMonthRevenue),
            icon: PoundSterling,
            color: '#10B981',
            href: '/portal/financial/overview'
          },
          {
            label: 'Outstanding Quotes',
            value: mockStats.outstandingQuotes.toString(),
            icon: FileText,
            color: '#F59E0B',
            href: '/portal/projects/quotes'
          },
          {
            label: 'Overdue Projects',
            value: mockStats.overdueProjects.toString(),
            icon: AlertTriangle,
            color: '#EF4444',
            href: '/portal/projects/active?filter=overdue'
          }
        ].map((metric, index) => (
          <Link
            key={index}
            href={metric.href}
            className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 group"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{metric.label}</p>
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
              </div>
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"
                style={{ backgroundColor: `${metric.color}15` }}
              >
                <metric.icon className="w-6 h-6" style={{ color: metric.color }} />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Projects */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Active Projects</h2>
            <Link
              href="/portal/projects/active"
              className="text-sm text-[#006FEE] hover:text-[#0050B3] font-medium flex items-center gap-1"
            >
              View all
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {mockActiveProjects.map((project) => {
              const ServiceIcon = getServiceIcon(project.service)
              const serviceColor = getServiceColor(project.service)
              const progressColor = getProgressColor(project.progress)
              
              return (
                <div key={project.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${serviceColor}15` }}
                      >
                        <ServiceIcon className="w-5 h-5" style={{ color: serviceColor }} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{project.name}</h3>
                        <p className="text-sm text-gray-600">{project.client}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                            {project.id}
                          </span>
                          <span 
                            className="px-2 py-1 text-xs font-medium rounded-full"
                            style={{
                              backgroundColor: `${getPriorityColor(project.priority)}15`,
                              color: getPriorityColor(project.priority)
                            }}
                          >
                            {project.priority}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{formatCurrency(project.quotedAmount)}</p>
                      <p className={`text-xs px-2 py-1 rounded-full mt-1 ${getDaysUntilColor(project.daysUntilDeadline)}`}>
                        {project.daysUntilDeadline} days left
                      </p>
                    </div>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">{project.currentStage.replace('_', ' ')}</span>
                      <span className="text-sm font-medium text-gray-900">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${project.progress}%`,
                          backgroundColor: progressColor
                        }}
                      />
                    </div>
                  </div>
                  
                  {/* Quick actions */}
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/portal/projects/${project.id}`}
                      className="flex items-center gap-1 px-3 py-1 text-xs text-[#006FEE] hover:bg-blue-50 rounded-md transition-colors"
                    >
                      <Eye className="w-3 h-3" />
                      View
                    </Link>
                    <button className="flex items-center gap-1 px-3 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
                      <MessageSquare className="w-3 h-3" />
                      Update
                    </button>
                    <button 
                      className="px-3 py-1 text-xs bg-[#006FEE] text-white rounded-md hover:bg-[#0050B3] transition-colors"
                    >
                      Quick Status
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <div className="p-6 space-y-4">
            {mockRecentActivity.map((activity) => {
              const IconComponent = activity.icon
              return (
                <div key={activity.id} className="flex gap-3">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${activity.color}15` }}
                  >
                    <IconComponent className="w-4 h-4" style={{ color: activity.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 mb-1">{activity.project}</p>
                    <p className="text-sm text-gray-600 mb-1">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
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