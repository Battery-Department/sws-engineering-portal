'use client'

import React, { useState, useEffect } from 'react'
import { 
  Folder,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  Calendar,
  TrendingUp,
  Wrench,
  Package
} from 'lucide-react'

interface CustomerProject {
  id: string
  projectRef: string
  name: string
  service: string
  status: string
  currentStage: string
  progress: number
  startDate: string
  targetDate: string
  completedDate?: string
  description: string
  location: string
  hasDocuments: boolean
  documentsCount: number
}

// Mock data - replace with API call
const mockProjects: CustomerProject[] = [
  {
    id: '1',
    projectRef: 'PROJ-2024-047',
    name: '7¼" Gauge Steam Locomotive Restoration',
    service: 'steam',
    status: 'in_progress',
    currentStage: 'manufacturing',
    progress: 65,
    startDate: '2024-03-15',
    targetDate: '2024-06-30',
    description: 'Complete restoration of heritage steam locomotive including boiler recertification',
    location: 'Cornwall Workshop',
    hasDocuments: true,
    documentsCount: 8
  },
  {
    id: '2',
    projectRef: 'PROJ-2024-035',
    name: 'Industrial Boiler CAD Design',
    service: 'cad',
    status: 'completed',
    currentStage: 'project_complete',
    progress: 100,
    startDate: '2024-01-10',
    targetDate: '2024-02-28',
    completedDate: '2024-02-25',
    description: '3D CAD design and stress analysis for industrial steam boiler',
    location: 'Remote',
    hasDocuments: true,
    documentsCount: 12
  }
]

export default function CustomerProjectsPage() {
  const [projects, setProjects] = useState<CustomerProject[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProjects(mockProjects)
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_progress': return 'text-orange-600 bg-orange-50 border-orange-200'
      case 'completed': return 'text-green-600 bg-green-50 border-green-200'
      case 'on_hold': return 'text-red-600 bg-red-50 border-red-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getServiceIcon = (service: string) => {
    switch (service) {
      case 'steam': return Wrench
      case 'cad': return FileText
      case 'repair': return Package
      default: return Folder
    }
  }

  const getServiceColor = (service: string) => {
    switch (service) {
      case 'steam': return 'text-blue-600 bg-blue-50'
      case 'cad': return 'text-green-600 bg-green-50'
      case 'repair': return 'text-orange-600 bg-orange-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return true
    return project.status === filter
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-[#006FEE] to-[#0050B3] rounded-xl flex items-center justify-center">
              <Folder className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Projects</h1>
          <p className="text-xl text-gray-600">
            Track progress and access documents for all your engineering projects
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 mb-8">
          <div className="flex gap-2">
            {[
              { value: 'all', label: 'All Projects', count: projects.length },
              { value: 'in_progress', label: 'In Progress', count: projects.filter(p => p.status === 'in_progress').length },
              { value: 'completed', label: 'Completed', count: projects.filter(p => p.status === 'completed').length }
            ].map(tab => (
              <button
                key={tab.value}
                onClick={() => setFilter(tab.value)}
                className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  filter === tab.value
                    ? 'bg-[#006FEE] text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.label}
                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                  filter === tab.value
                    ? 'bg-white bg-opacity-20 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Projects List */}
        {loading ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-[#006FEE] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your projects...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <Folder className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-600">
              No projects match the selected filter.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredProjects.map((project) => {
              const ServiceIcon = getServiceIcon(project.service)
              
              return (
                <div 
                  key={project.id} 
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${getServiceColor(project.service)}`}>
                          <ServiceIcon className="w-7 h-7" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">{project.name}</h3>
                          <div className="flex items-center gap-3 text-sm">
                            <span className="text-gray-500">Ref: {project.projectRef}</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                              {project.status.replace('_', ' ').toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {project.hasDocuments && (
                        <a
                          href="/customer/documents"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-[#006FEE] hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <FileText className="w-4 h-4" />
                          {project.documentsCount} Documents
                        </a>
                      )}
                    </div>

                    <p className="text-gray-600 mb-4">{project.description}</p>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium text-gray-900">{project.progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#006FEE] to-[#0050B3] transition-all duration-500"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <div>
                          <span className="text-gray-600">Start Date: </span>
                          <span className="font-medium text-gray-900">{formatDate(project.startDate)}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <div>
                          <span className="text-gray-600">Target Date: </span>
                          <span className="font-medium text-gray-900">{formatDate(project.targetDate)}</span>
                        </div>
                      </div>
                      {project.completedDate && (
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <div>
                            <span className="text-gray-600">Completed: </span>
                            <span className="font-medium text-green-600">{formatDate(project.completedDate)}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Current Stage */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Current Stage:</span>
                        <span className="text-sm font-medium text-gray-900">
                          {project.currentStage.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">{project.location}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Help Section */}
        <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Project Updates?</h3>
          <p className="text-gray-600 mb-4">
            Contact our team for detailed project status or to request specific information.
          </p>
          <div className="flex justify-center gap-4">
            <a 
              href="/customer/chat"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#006FEE] text-white rounded-lg hover:bg-[#0050B3] transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Contact Team
            </a>
            <a 
              href="/customer/documents"
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FileText className="w-4 h-4" />
              View Documents
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}