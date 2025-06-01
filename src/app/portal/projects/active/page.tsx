'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  Plus,
  Search,
  Filter,
  Calendar,
  PoundSterling,
  Train,
  Cog,
  Factory,
  Wrench,
  Eye,
  MessageSquare,
  Clock,
  AlertTriangle,
  TrendingUp,
  Users,
  FileText,
  ChevronRight
} from 'lucide-react'
import { SERVICE_TYPES, PRIORITY_LEVELS } from '@/config/navigation'

// Mock active projects data
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
    actualCosts: 32750,
    daysUntilDeadline: 45,
    status: 'on_track',
    teamMembers: ['John Smith', 'Sarah Johnson'],
    lastUpdate: '2024-05-20'
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
    actualCosts: 3200,
    daysUntilDeadline: 15,
    status: 'at_risk',
    teamMembers: ['Mike Wilson'],
    lastUpdate: '2024-05-18'
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
    actualCosts: 6100,
    daysUntilDeadline: 5,
    status: 'ahead_schedule',
    teamMembers: ['Sarah Johnson', 'Tom Brown'],
    lastUpdate: '2024-05-21'
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
    actualCosts: 4800,
    daysUntilDeadline: 62,
    status: 'on_track',
    teamMembers: ['Tom Brown'],
    lastUpdate: '2024-05-19'
  },
  {
    id: 'PROJ-2024-061',
    name: 'Steam Traction Engine Rebuild',
    client: 'Cornish Steam Society',
    service: 'steam',
    currentStage: 'design_phase',
    progress: 20,
    priority: 'normal',
    targetDate: '2024-10-30',
    quotedAmount: 28500,
    actualCosts: 2100,
    daysUntilDeadline: 95,
    status: 'on_track',
    teamMembers: ['John Smith', 'Mike Wilson'],
    lastUpdate: '2024-05-17'
  },
  {
    id: 'PROJ-2024-063',
    name: 'Precision Machining - Valve Gear',
    client: 'Railway Workshop Ltd',
    service: 'fabrication',
    currentStage: 'manufacturing',
    progress: 55,
    priority: 'urgent',
    targetDate: '2024-06-25',
    quotedAmount: 9200,
    actualCosts: 5800,
    daysUntilDeadline: 20,
    status: 'on_track',
    teamMembers: ['Sarah Johnson'],
    lastUpdate: '2024-05-21'
  }
]

export default function ActiveProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedService, setSelectedService] = useState('all')
  const [selectedPriority, setSelectedPriority] = useState('all')
  const [sortBy, setSortBy] = useState('deadline')

  const getServiceIcon = (service: string) => {
    switch (service) {
      case 'steam': return Train
      case 'cad': return Cog
      case 'repair': return Factory
      case 'fabrication': return Wrench
      default: return Cog
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on_track': return '#10B981'
      case 'at_risk': return '#F59E0B'
      case 'ahead_schedule': return '#3B82F6'
      case 'delayed': return '#EF4444'
      default: return '#6B7280'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on_track': return TrendingUp
      case 'at_risk': return AlertTriangle
      case 'ahead_schedule': return TrendingUp
      case 'delayed': return Clock
      default: return TrendingUp
    }
  }

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

  const getDaysUntilColor = (days: number) => {
    if (days <= 7) return 'text-red-600 bg-red-50'
    if (days <= 30) return 'text-orange-600 bg-orange-50'
    return 'text-green-600 bg-green-50'
  }

  const filteredProjects = mockActiveProjects
    .filter(project => {
      const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.id.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesService = selectedService === 'all' || project.service === selectedService
      const matchesPriority = selectedPriority === 'all' || project.priority === selectedPriority
      return matchesSearch && matchesService && matchesPriority
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'deadline':
          return a.daysUntilDeadline - b.daysUntilDeadline
        case 'progress':
          return b.progress - a.progress
        case 'value':
          return b.quotedAmount - a.quotedAmount
        case 'client':
          return a.client.localeCompare(b.client)
        default:
          return a.daysUntilDeadline - b.daysUntilDeadline
      }
    })

  // Summary statistics
  const totalValue = mockActiveProjects.reduce((sum, p) => sum + p.quotedAmount, 0)
  const atRiskProjects = mockActiveProjects.filter(p => p.status === 'at_risk').length
  const avgProgress = mockActiveProjects.reduce((sum, p) => sum + p.progress, 0) / mockActiveProjects.length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Active Projects</h1>
          <p className="text-gray-600">Manage and track ongoing engineering projects</p>
        </div>
        <Link
          href="/portal/requirements"
          className="px-4 py-2 bg-[#006FEE] text-white rounded-lg hover:bg-[#0050B3] transition-colors text-sm font-medium flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Project
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Projects</p>
              <p className="text-2xl font-bold text-gray-900">{mockActiveProjects.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Value</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalValue)}</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <PoundSterling className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Average Progress</p>
              <p className="text-2xl font-bold text-gray-900">{avgProgress.toFixed(0)}%</p>
            </div>
            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">At Risk</p>
              <p className="text-2xl font-bold text-gray-900">{atRiskProjects}</p>
            </div>
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006FEE] focus:border-transparent"
            />
          </div>

          {/* Service Filter */}
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006FEE] focus:border-transparent"
          >
            <option value="all">All Services</option>
            {SERVICE_TYPES.map(service => (
              <option key={service.id} value={service.id}>{service.name}</option>
            ))}
          </select>

          {/* Priority Filter */}
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006FEE] focus:border-transparent"
          >
            <option value="all">All Priorities</option>
            {PRIORITY_LEVELS.map(priority => (
              <option key={priority.id} value={priority.id}>{priority.name}</option>
            ))}
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006FEE] focus:border-transparent"
          >
            <option value="deadline">Sort by Deadline</option>
            <option value="progress">Sort by Progress</option>
            <option value="value">Sort by Value</option>
            <option value="client">Sort by Client</option>
          </select>
        </div>
      </div>

      {/* Projects List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Projects ({filteredProjects.length})
          </h3>
        </div>
        <div className="divide-y divide-gray-100">
          {filteredProjects.map((project) => {
            const ServiceIcon = getServiceIcon(project.service)
            const StatusIcon = getStatusIcon(project.status)
            const serviceColor = getServiceColor(project.service)
            const priorityColor = getPriorityColor(project.priority)
            const statusColor = getStatusColor(project.status)
            const profitMargin = ((project.quotedAmount - project.actualCosts) / project.quotedAmount) * 100

            return (
              <div key={project.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${serviceColor}15` }}
                    >
                      <ServiceIcon className="w-6 h-6" style={{ color: serviceColor }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg hover:text-[#006FEE] transition-colors">
                            <Link href={`/portal/projects/${project.id}`}>
                              {project.name}
                            </Link>
                          </h3>
                          <p className="text-gray-600 mb-2">{project.client}</p>
                          <div className="flex items-center gap-3">
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                              {project.id}
                            </span>
                            <span 
                              className="px-2 py-1 text-xs font-medium rounded-full"
                              style={{
                                backgroundColor: `${priorityColor}15`,
                                color: priorityColor
                              }}
                            >
                              {project.priority}
                            </span>
                            <span 
                              className="px-2 py-1 text-xs font-medium rounded-full flex items-center gap-1"
                              style={{
                                backgroundColor: `${statusColor}15`,
                                color: statusColor
                              }}
                            >
                              <StatusIcon className="w-3 h-3" />
                              {project.status.replace('_', ' ')}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-gray-900">{formatCurrency(project.quotedAmount)}</p>
                          <p className="text-sm text-green-600">+{profitMargin.toFixed(1)}% margin</p>
                          <p className={`text-xs px-2 py-1 rounded-full mt-1 ${getDaysUntilColor(project.daysUntilDeadline)}`}>
                            {project.daysUntilDeadline} days left
                          </p>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">{project.currentStage.replace('_', ' ')}</span>
                          <span className="text-sm font-medium text-gray-900">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${project.progress}%`,
                              backgroundColor: serviceColor
                            }}
                          />
                        </div>
                      </div>

                      {/* Project Details */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          Due: {formatDate(project.targetDate)}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Users className="w-4 h-4" />
                          {project.teamMembers.join(', ')}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          Updated: {formatDate(project.lastUpdate)}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-3">
                        <Link
                          href={`/portal/projects/${project.id}`}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-[#006FEE] hover:bg-blue-50 rounded-md transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          View Details
                        </Link>
                        <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
                          <MessageSquare className="w-4 h-4" />
                          Update Status
                        </button>
                        <button className="px-3 py-2 text-sm bg-[#006FEE] text-white rounded-md hover:bg-[#0050B3] transition-colors">
                          Quick Actions
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {filteredProjects.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
          <Link
            href="/portal/requirements"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#006FEE] text-white rounded-lg hover:bg-[#0050B3] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Start New Project
          </Link>
        </div>
      )}
    </div>
  )
}