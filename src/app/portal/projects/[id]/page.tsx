'use client'

import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  ArrowLeft,
  Calendar,
  PoundSterling,
  FileText,
  Upload,
  Download,
  Train,
  Cog,
  Factory,
  Wrench,
  CheckCircle,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  AlertTriangle,
  Plus,
  Edit,
  MessageSquare,
  Share,
  Settings
} from 'lucide-react'
import { PROJECT_STAGES, SERVICE_TYPES, PRIORITY_LEVELS } from '@/config/navigation'

// Mock project data - replace with actual API call
const mockProject = {
  id: 'PROJ-2024-047',
  name: '7¼" Gauge Steam Locomotive Restoration',
  client: {
    id: 'CLIENT-001',
    name: 'Bodmin & Wenford Railway',
    contact: 'James Mitchell',
    email: 'j.mitchell@bodminrailway.co.uk',
    phone: '+44 1208 73666',
    location: 'Bodmin, Cornwall'
  },
  service: 'steam',
  status: 'in_progress',
  priority: 'normal',
  description: 'Complete restoration of a 7¼" gauge steam locomotive including boiler overhaul, mechanical rebuild, and compliance certification for passenger service.',
  
  // Financial Summary
  quotedAmount: 45000,
  actualCosts: 32750,
  invoicedAmount: 30000,
  paidAmount: 25000,
  
  // Timeline
  startDate: '2024-03-15',
  targetDate: '2024-08-30',
  createdDate: '2024-02-20',
  
  // Current Stage
  currentStage: 'manufacturing',
  stagesCompleted: [
    'initial_contact',
    'site_visit',
    'quote_sent',
    'quote_approved',
    'design_phase',
    'materials_ordered'
  ],
  
  // Progress
  overallProgress: 65,
  
  // Stage Details
  stages: [
    { id: 'initial_contact', name: 'Initial Contact', status: 'completed', completedAt: '2024-02-20', notes: 'Initial enquiry via website form' },
    { id: 'site_visit', name: 'Site Visit/Assessment', status: 'completed', completedAt: '2024-02-25', notes: 'On-site assessment completed. Locomotive in good structural condition.' },
    { id: 'quote_sent', name: 'Quote Sent', status: 'completed', completedAt: '2024-03-01', notes: 'Detailed quote including materials and timeline sent' },
    { id: 'quote_approved', name: 'Quote Approved', status: 'completed', completedAt: '2024-03-10', notes: 'Quote approved. 50% deposit received.' },
    { id: 'design_phase', name: 'Design Phase', status: 'completed', completedAt: '2024-03-20', notes: 'CAD drawings and technical specifications completed' },
    { id: 'materials_ordered', name: 'Materials Ordered', status: 'completed', completedAt: '2024-04-01', notes: 'Specialist steel and components ordered from suppliers' },
    { id: 'manufacturing', name: 'Manufacturing', status: 'in_progress', notes: 'Cylinder machining in progress. Boiler work scheduled for next week.' },
    { id: 'quality_check', name: 'Quality Check', status: 'pending', notes: '' },
    { id: 'delivery_installation', name: 'Delivery/Installation', status: 'pending', notes: '' },
    { id: 'project_complete', name: 'Project Complete', status: 'pending', notes: '' },
    { id: 'invoice_sent', name: 'Invoice Sent', status: 'pending', notes: '' },
    { id: 'payment_received', name: 'Payment Received', status: 'pending', notes: '' }
  ],
  
  // Documents
  documents: [
    { id: 'DOC-001', name: 'Technical Specification.pdf', type: 'specification', size: '2.4 MB', uploadedAt: '2024-03-20', url: '#' },
    { id: 'DOC-002', name: 'Cylinder Assembly Drawing.dwg', type: 'cad', size: '5.1 MB', uploadedAt: '2024-03-18', url: '#' },
    { id: 'DOC-003', name: 'Progress Photo - Cylinder Work.jpg', type: 'photo', size: '3.2 MB', uploadedAt: '2024-05-20', url: '#' },
    { id: 'DOC-004', name: 'Material Certificates.pdf', type: 'certificate', size: '1.8 MB', uploadedAt: '2024-04-01', url: '#' }
  ],
  
  // Notes
  notes: [
    { id: 'NOTE-001', author: 'John Smith', date: '2024-05-20', content: 'Cylinder machining completed ahead of schedule. Quality inspection passed.' },
    { id: 'NOTE-002', author: 'Sarah Johnson', date: '2024-05-18', content: 'Client visited workshop to review progress. Very pleased with quality of work.' },
    { id: 'NOTE-003', author: 'Mike Wilson', date: '2024-05-15', content: 'Boiler pressure test scheduled for next Tuesday. All safety documentation prepared.' }
  ]
}

export default function ProjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [showAddNote, setShowAddNote] = useState(false)
  const [newNote, setNewNote] = useState('')

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
      case 'completed': return '#10B981'
      case 'in_progress': return '#F59E0B'
      case 'pending': return '#6B7280'
      default: return '#6B7280'
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

  const ServiceIcon = getServiceIcon(mockProject.service)
  const serviceColor = getServiceColor(mockProject.service)
  const priorityColor = getPriorityColor(mockProject.priority)

  const profitMargin = ((mockProject.quotedAmount - mockProject.actualCosts) / mockProject.quotedAmount) * 100
  const daysUntilDeadline = Math.ceil((new Date(mockProject.targetDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${serviceColor}15` }}
            >
              <ServiceIcon className="w-5 h-5" style={{ color: serviceColor }} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{mockProject.name}</h1>
              <div className="flex items-center gap-3">
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                  {mockProject.id}
                </span>
                <span 
                  className="px-2 py-1 text-xs font-medium rounded-full"
                  style={{
                    backgroundColor: `${priorityColor}15`,
                    color: priorityColor
                  }}
                >
                  {mockProject.priority}
                </span>
                <span className="text-sm text-gray-600">
                  {daysUntilDeadline} days until deadline
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center gap-2">
            <Share className="w-4 h-4" />
            Share
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center gap-2">
            <Edit className="w-4 h-4" />
            Edit
          </button>
          <button className="px-4 py-2 bg-[#006FEE] text-white rounded-lg hover:bg-[#0050B3] transition-colors text-sm font-medium flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Update Status
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Project Progress</h3>
          <span className="text-2xl font-bold text-[#006FEE]">{mockProject.overallProgress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div 
            className="h-3 rounded-full bg-gradient-to-r from-[#006FEE] to-[#0050B3] transition-all duration-500"
            style={{ width: `${mockProject.overallProgress}%` }}
          />
        </div>
        <div className="text-sm text-gray-600">
          Current Stage: <span className="font-medium text-gray-900">{mockProject.currentStage.replace('_', ' ')}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'stages', label: 'Stages' },
            { id: 'financial', label: 'Financial' },
            { id: 'documents', label: 'Documents' },
            { id: 'notes', label: 'Notes' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-[#006FEE] text-[#006FEE]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Project Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Description</h3>
              <p className="text-gray-700 leading-relaxed">{mockProject.description}</p>
            </div>

            {/* Timeline */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Timeline</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Start Date</p>
                  <p className="font-medium text-gray-900">{formatDate(mockProject.startDate)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Target Completion</p>
                  <p className="font-medium text-gray-900">{formatDate(mockProject.targetDate)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Days Remaining</p>
                  <p className={`font-medium ${daysUntilDeadline <= 30 ? 'text-orange-600' : 'text-green-600'}`}>
                    {daysUntilDeadline} days
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Client Information */}
          <div className="space-y-6">
            {/* Client Details */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Client Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">{mockProject.client.name}</p>
                    <p className="text-sm text-gray-600">{mockProject.client.contact}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <a href={`mailto:${mockProject.client.email}`} className="text-[#006FEE] hover:text-[#0050B3]">
                    {mockProject.client.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <a href={`tel:${mockProject.client.phone}`} className="text-[#006FEE] hover:text-[#0050B3]">
                    {mockProject.client.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{mockProject.client.location}</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Stages Completed</span>
                  <span className="font-medium">{mockProject.stagesCompleted.length}/12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Profit Margin</span>
                  <span className="font-medium text-green-600">{profitMargin.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Documents</span>
                  <span className="font-medium">{mockProject.documents.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Notes</span>
                  <span className="font-medium">{mockProject.notes.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'stages' && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Project Stages</h3>
            <p className="text-sm text-gray-600 mt-1">Track progress through the 12-stage engineering process</p>
          </div>
          <div className="divide-y divide-gray-100">
            {mockProject.stages.map((stage, index) => (
              <div key={stage.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center mt-1">
                      {stage.status === 'completed' ? (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      ) : stage.status === 'in_progress' ? (
                        <Clock className="w-6 h-6 text-orange-500" />
                      ) : (
                        <div className="w-6 h-6 rounded-full border-2 border-gray-300" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{stage.name}</h4>
                      {stage.notes && (
                        <p className="text-sm text-gray-600 mt-1">{stage.notes}</p>
                      )}
                      {stage.completedAt && (
                        <p className="text-xs text-gray-500 mt-2">
                          Completed: {formatDate(stage.completedAt)}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span 
                      className="px-2 py-1 text-xs font-medium rounded-full"
                      style={{
                        backgroundColor: `${getStatusColor(stage.status)}15`,
                        color: getStatusColor(stage.status)
                      }}
                    >
                      {stage.status.replace('_', ' ')}
                    </span>
                    {stage.status === 'in_progress' && (
                      <button className="px-3 py-1 text-xs bg-[#006FEE] text-white rounded-md hover:bg-[#0050B3] transition-colors">
                        Update
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'financial' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Financial Summary */}
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Financial Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Quoted Amount</span>
                <span className="font-semibold text-gray-900">{formatCurrency(mockProject.quotedAmount)}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Actual Costs</span>
                <span className="font-semibold text-gray-900">{formatCurrency(mockProject.actualCosts)}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Profit Margin</span>
                <span className="font-semibold text-green-600">
                  {formatCurrency(mockProject.quotedAmount - mockProject.actualCosts)} ({profitMargin.toFixed(1)}%)
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Invoiced Amount</span>
                <span className="font-semibold text-gray-900">{formatCurrency(mockProject.invoicedAmount)}</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-600">Paid Amount</span>
                <span className="font-semibold text-gray-900">{formatCurrency(mockProject.paidAmount)}</span>
              </div>
            </div>
          </div>

          {/* Payment Status */}
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Payment Status</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Payment Progress</span>
                  <span className="text-sm font-medium">{((mockProject.paidAmount / mockProject.quotedAmount) * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-green-500 transition-all duration-300"
                    style={{ width: `${(mockProject.paidAmount / mockProject.quotedAmount) * 100}%` }}
                  />
                </div>
              </div>
              <div className="pt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Outstanding</span>
                  <span className="font-medium text-orange-600">
                    {formatCurrency(mockProject.quotedAmount - mockProject.paidAmount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Next Invoice Due</span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(mockProject.quotedAmount - mockProject.invoicedAmount)}
                  </span>
                </div>
              </div>
              <div className="pt-4">
                <button className="w-full px-4 py-2 bg-[#006FEE] text-white rounded-lg hover:bg-[#0050B3] transition-colors text-sm font-medium">
                  Create Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'documents' && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Project Documents</h3>
              <p className="text-sm text-gray-600 mt-1">CAD files, photos, certificates, and project documentation</p>
            </div>
            <button className="px-4 py-2 bg-[#006FEE] text-white rounded-lg hover:bg-[#0050B3] transition-colors text-sm font-medium flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Upload File
            </button>
          </div>
          <div className="divide-y divide-gray-100">
            {mockProject.documents.map((doc) => (
              <div key={doc.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{doc.name}</h4>
                    <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                      <span className="capitalize">{doc.type}</span>
                      <span>{doc.size}</span>
                      <span>Uploaded: {formatDate(doc.uploadedAt)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Download className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Share className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'notes' && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Project Notes</h3>
              <p className="text-sm text-gray-600 mt-1">Running project diary and team communications</p>
            </div>
            <button 
              onClick={() => setShowAddNote(true)}
              className="px-4 py-2 bg-[#006FEE] text-white rounded-lg hover:bg-[#0050B3] transition-colors text-sm font-medium flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Note
            </button>
          </div>
          
          {showAddNote && (
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add a note about project progress, decisions, or observations..."
                className="w-full p-3 border border-gray-300 rounded-lg resize-none h-24 focus:ring-2 focus:ring-[#006FEE] focus:border-transparent"
              />
              <div className="flex items-center gap-3 mt-3">
                <button 
                  onClick={() => {
                    // Add note logic here
                    setNewNote('')
                    setShowAddNote(false)
                  }}
                  className="px-4 py-2 bg-[#006FEE] text-white rounded-lg hover:bg-[#0050B3] transition-colors text-sm font-medium"
                >
                  Add Note
                </button>
                <button 
                  onClick={() => {
                    setNewNote('')
                    setShowAddNote(false)
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          
          <div className="divide-y divide-gray-100">
            {mockProject.notes.map((note) => (
              <div key={note.id} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-medium text-gray-900">{note.author}</h4>
                      <span className="text-sm text-gray-500">{formatDate(note.date)}</span>
                    </div>
                    <p className="text-gray-700">{note.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}