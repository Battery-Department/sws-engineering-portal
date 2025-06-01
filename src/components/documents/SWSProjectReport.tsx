'use client'

import React from 'react'
import { 
  Train, 
  Calendar, 
  FileText, 
  Download, 
  Printer, 
  CheckCircle,
  Clock,
  User,
  Cog,
  Factory,
  Wrench,
  Phone,
  Mail,
  MapPin,
  Camera,
  AlertTriangle,
  TrendingUp,
  Award,
  Shield
} from 'lucide-react'

interface ProjectStage {
  id: string
  name: string
  status: 'completed' | 'in_progress' | 'pending'
  completedDate?: Date
  notes?: string
  documents?: string[]
  photos?: string[]
}

interface QualityCheck {
  id: string
  checkType: string
  result: 'pass' | 'fail' | 'pending'
  date: Date
  inspector: string
  notes?: string
}

interface ProjectReportData {
  reportNumber: string
  projectRef: string
  projectName: string
  generatedDate: Date
  reportType: 'progress' | 'completion' | 'inspection' | 'warranty'
  client: {
    name: string
    contact: string
    address: string[]
    email?: string
    phone?: string
  }
  project: {
    description: string
    location: string
    serviceType: 'steam' | 'cad' | 'repair' | 'fabrication'
    startDate: Date
    targetDate: Date
    completionDate?: Date
    currentStage: string
    overallProgress: number
  }
  workCompleted: {
    summary: string
    stages: ProjectStage[]
    totalHours: number
    materialsUsed: Array<{
      item: string
      quantity: number
      unit: string
    }>
  }
  qualityAssurance: {
    checks: QualityCheck[]
    overallRating: 'excellent' | 'good' | 'satisfactory' | 'needs_attention'
    certifications?: string[]
  }
  nextSteps?: {
    description: string
    estimatedCompletion: Date
    requiredMaterials?: string[]
  }
  attachments: {
    photos: Array<{
      filename: string
      caption: string
      category: 'progress' | 'completion' | 'quality' | 'safety'
    }>
    documents: Array<{
      filename: string
      type: 'cad' | 'certificate' | 'manual' | 'specification'
    }>
  }
  engineer: {
    name: string
    qualification: string
    signature?: string
  }
}

interface SWSProjectReportProps {
  data: ProjectReportData
  onPrint?: () => void
  onDownload?: () => void
}

export default function SWSProjectReport({ data, onPrint, onDownload }: SWSProjectReportProps) {
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const getServiceIcon = (serviceType: string) => {
    switch (serviceType) {
      case 'steam': return Train
      case 'cad': return Cog
      case 'repair': return Factory
      case 'fabrication': return Wrench
      default: return Cog
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle
      case 'in_progress': return Clock
      case 'pending': return AlertTriangle
      default: return Clock
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50'
      case 'in_progress': return 'text-orange-600 bg-orange-50'
      case 'pending': return 'text-gray-600 bg-gray-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getQualityRatingColor = (rating: string) => {
    switch (rating) {
      case 'excellent': return 'text-green-600 bg-green-50'
      case 'good': return 'text-blue-600 bg-blue-50'
      case 'satisfactory': return 'text-orange-600 bg-orange-50'
      case 'needs_attention': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const ServiceIcon = getServiceIcon(data.project.serviceType)

  return (
    <div className="bg-white min-h-screen">
      {/* Print Controls - Hidden in print */}
      <div className="no-print bg-gray-50 p-4 border-b border-gray-200 flex justify-end gap-3">
        <button
          onClick={onPrint}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium flex items-center gap-2"
        >
          <Printer className="w-4 h-4" />
          Print Report
        </button>
        <button
          onClick={onDownload}
          className="px-4 py-2 bg-[#006FEE] text-white rounded-lg hover:bg-[#0050B3] transition-colors text-sm font-medium flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Download PDF
        </button>
      </div>

      {/* Report Content */}
      <div className="max-w-4xl mx-auto p-8 print:p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-12 print:mb-8">
          <div>
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-[#006FEE] to-[#0050B3] rounded-xl flex items-center justify-center mr-4">
                <Train className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">South West Steam Engineering</h1>
                <p className="text-lg text-gray-600">Heritage Railway & Industrial Engineering</p>
              </div>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Workshop: Redruth, Cornwall, TR15 3AE</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+44 1209 123456</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>enquiries@swsteamengineering.co.uk</span>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">PROJECT REPORT</h2>
              <p className="text-xl font-semibold text-[#006FEE] mb-4">#{data.reportNumber}</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-end gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">
                    <span className="font-semibold">Generated:</span> {formatDate(data.generatedDate)}
                  </span>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <FileText className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">
                    <span className="font-semibold">Project:</span> {data.projectRef}
                  </span>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
                    data.reportType === 'completion' ? 'bg-green-100 text-green-800' :
                    data.reportType === 'progress' ? 'bg-blue-100 text-blue-800' :
                    data.reportType === 'inspection' ? 'bg-orange-100 text-orange-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {data.reportType.replace('_', ' ')} Report
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Client and Project Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
            <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">Client Information:</h3>
            <div className="space-y-2">
              <p className="text-lg font-semibold text-gray-900">{data.client.name}</p>
              <p className="text-gray-700">{data.client.contact}</p>
              {data.client.address.map((line, index) => (
                <p key={index} className="text-gray-700">{line}</p>
              ))}
              {data.client.email && (
                <p className="text-gray-700 flex items-center gap-2 mt-3">
                  <Mail className="w-4 h-4" />
                  {data.client.email}
                </p>
              )}
              {data.client.phone && (
                <p className="text-gray-700 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {data.client.phone}
                </p>
              )}
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">Project Overview:</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <ServiceIcon className="w-5 h-5 text-[#006FEE] mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">{data.projectName}</p>
                  <p className="text-sm text-gray-600">{data.project.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{data.project.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Started: {formatDate(data.project.startDate)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>Target: {formatDate(data.project.targetDate)}</span>
              </div>
              {data.project.completionDate && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Completed: {formatDate(data.project.completionDate)}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="mb-10 bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl border border-blue-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-[#006FEE]" />
            Project Progress Overview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#006FEE] mb-2">{data.project.overallProgress}%</div>
              <div className="text-sm text-gray-600">Overall Progress</div>
              <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                <div 
                  className="bg-gradient-to-r from-[#006FEE] to-[#0050B3] h-3 rounded-full transition-all duration-300"
                  style={{ width: `${data.project.overallProgress}%` }}
                />
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{data.workCompleted.totalHours}</div>
              <div className="text-sm text-gray-600">Hours Completed</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900 mb-2">{data.project.currentStage.replace('_', ' ')}</div>
              <div className="text-sm text-gray-600">Current Stage</div>
            </div>
          </div>
        </div>

        {/* Work Completed Summary */}
        <div className="mb-10">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-green-600" />
            Work Completed Summary
          </h3>
          
          <div className="bg-green-50 p-6 rounded-xl border border-green-200 mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Executive Summary:</h4>
            <p className="text-gray-700 leading-relaxed">{data.workCompleted.summary}</p>
          </div>

          {/* Project Stages */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Project Stages:</h4>
            {data.workCompleted.stages.map((stage) => {
              const StatusIcon = getStatusIcon(stage.status)
              return (
                <div key={stage.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <StatusIcon className="w-5 h-5 mt-1" />
                      <div>
                        <h5 className="font-semibold text-gray-900">{stage.name}</h5>
                        {stage.notes && (
                          <p className="text-sm text-gray-600 mt-1">{stage.notes}</p>
                        )}
                        {stage.completedDate && (
                          <p className="text-xs text-gray-500 mt-2">
                            Completed: {formatDate(stage.completedDate)}
                          </p>
                        )}
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(stage.status)}`}>
                      {stage.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Materials Used */}
          {data.workCompleted.materialsUsed.length > 0 && (
            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 mb-3">Materials Used:</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {data.workCompleted.materialsUsed.map((material, index) => (
                    <div key={index} className="text-sm">
                      <span className="font-medium text-gray-900">{material.item}</span>
                      <span className="text-gray-600"> - {material.quantity} {material.unit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quality Assurance */}
        <div className="mb-10">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Shield className="w-6 h-6 text-blue-600" />
            Quality Assurance & Testing
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className={`p-6 rounded-xl border ${
              data.qualityAssurance.overallRating === 'excellent' ? 'bg-green-50 border-green-200' :
              data.qualityAssurance.overallRating === 'good' ? 'bg-blue-50 border-blue-200' :
              data.qualityAssurance.overallRating === 'satisfactory' ? 'bg-orange-50 border-orange-200' :
              'bg-red-50 border-red-200'
            }`}>
              <h4 className="font-semibold text-gray-900 mb-3">Overall Quality Rating:</h4>
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-[#006FEE]" />
                <span className={`text-2xl font-bold capitalize ${
                  data.qualityAssurance.overallRating === 'excellent' ? 'text-green-600' :
                  data.qualityAssurance.overallRating === 'good' ? 'text-blue-600' :
                  data.qualityAssurance.overallRating === 'satisfactory' ? 'text-orange-600' :
                  'text-red-600'
                }`}>
                  {data.qualityAssurance.overallRating.replace('_', ' ')}
                </span>
              </div>
            </div>

            {data.qualityAssurance.certifications && data.qualityAssurance.certifications.length > 0 && (
              <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
                <h4 className="font-semibold text-gray-900 mb-3">Certifications:</h4>
                <div className="space-y-2">
                  {data.qualityAssurance.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-purple-600" />
                      <span className="text-sm text-gray-700">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quality Checks */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900">Quality Checks Performed:</h4>
            {data.qualityAssurance.checks.map((check) => (
              <div key={check.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h5 className="font-semibold text-gray-900">{check.checkType}</h5>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <span>Inspector: {check.inspector}</span>
                      <span>Date: {formatDate(check.date)}</span>
                    </div>
                    {check.notes && (
                      <p className="text-sm text-gray-600 mt-2">{check.notes}</p>
                    )}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    check.result === 'pass' ? 'bg-green-100 text-green-800' :
                    check.result === 'fail' ? 'bg-red-100 text-red-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {check.result.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps (if applicable) */}
        {data.nextSteps && (
          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Clock className="w-6 h-6 text-orange-600" />
              Next Steps & Upcoming Work
            </h3>
            
            <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
              <p className="text-gray-700 leading-relaxed mb-4">{data.nextSteps.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-900">Estimated Completion:</p>
                  <p className="text-sm text-gray-700">{formatDate(data.nextSteps.estimatedCompletion)}</p>
                </div>
                
                {data.nextSteps.requiredMaterials && data.nextSteps.requiredMaterials.length > 0 && (
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Required Materials:</p>
                    <ul className="text-sm text-gray-700 list-disc list-inside">
                      {data.nextSteps.requiredMaterials.map((material, index) => (
                        <li key={index}>{material}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Attachments */}
        {(data.attachments.photos.length > 0 || data.attachments.documents.length > 0) && (
          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Camera className="w-6 h-6 text-purple-600" />
              Attachments & Documentation
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.attachments.photos.length > 0 && (
                <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Progress Photos:</h4>
                  <div className="space-y-2">
                    {data.attachments.photos.map((photo, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <Camera className="w-4 h-4 text-purple-600" />
                        <span className="text-gray-700">{photo.filename}</span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          photo.category === 'progress' ? 'bg-blue-100 text-blue-800' :
                          photo.category === 'completion' ? 'bg-green-100 text-green-800' :
                          photo.category === 'quality' ? 'bg-purple-100 text-purple-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {photo.category}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {data.attachments.documents.length > 0 && (
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Technical Documents:</h4>
                  <div className="space-y-2">
                    {data.attachments.documents.map((doc, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <span className="text-gray-700">{doc.filename}</span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          doc.type === 'cad' ? 'bg-green-100 text-green-800' :
                          doc.type === 'certificate' ? 'bg-purple-100 text-purple-800' :
                          doc.type === 'manual' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {doc.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Engineer Signature */}
        <div className="border-t border-gray-200 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4">Report Prepared By:</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-600" />
                  <span className="font-medium text-gray-900">{data.engineer.name}</span>
                </div>
                <p className="text-sm text-gray-600">{data.engineer.qualification}</p>
                <p className="text-xs text-gray-500 mt-4">
                  This report has been prepared in accordance with professional engineering standards
                  and represents an accurate assessment of the work completed.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
              <h4 className="font-semibold text-gray-900 mb-4">Digital Verification:</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <p>Report generated electronically on {formatDate(data.generatedDate)}</p>
                <p>Document verified and authenticated by SWS Engineering portal system</p>
                <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                  <p className="text-xs text-blue-800 font-semibold">
                    Verification Code: {data.reportNumber}-{data.generatedDate.getTime()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 pt-6 mt-8 text-center">
          <div className="text-sm text-gray-600 space-y-1">
            <p className="font-semibold">South West Steam Engineering - Professional Engineering Services</p>
            <p>Preserving Heritage Railway Engineering • Industrial Equipment Specialists</p>
            <p className="text-xs text-gray-500 mt-3">
              This report is confidential and intended solely for the use of the named client.
            </p>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          .no-print {
            display: none !important;
          }
          
          body {
            margin: 0;
            padding: 0;
          }
          
          .page-break {
            page-break-after: always;
          }
          
          .mb-10 {
            page-break-inside: avoid;
          }
        }
      `}</style>
    </div>
  )
}