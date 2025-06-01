'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { 
  FileText,
  Download,
  Eye,
  Plus,
  Upload,
  Calendar,
  User,
  Trash2,
  Edit,
  Share,
  Filter,
  Search,
  File,
  Image,
  FileImage,
  Printer,
  Award,
  Receipt,
  Cog
} from 'lucide-react'

interface Document {
  id: string
  filename: string
  originalName: string
  fileType: string
  fileSize: number
  fileUrl: string
  uploadedAt: string
  generations?: Array<{
    id: string
    documentNumber: string
    documentType: string
    status: string
    generatedAt: string
    autoSend: boolean
    emailSent: boolean
  }>
}

interface ProjectDocuments {
  documents: Document[]
  documentsByType: Record<string, Document[]>
  pagination: {
    total: number
    limit: number
    offset: number
    hasMore: boolean
  }
}

export default function ProjectDocumentsPage() {
  const params = useParams()
  const projectId = params.id as string
  
  const [documents, setDocuments] = useState<ProjectDocuments | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedType, setSelectedType] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showGenerateModal, setShowGenerateModal] = useState(false)
  const [generatingDoc, setGeneratingDoc] = useState(false)

  useEffect(() => {
    fetchDocuments()
  }, [projectId, selectedType])

  const fetchDocuments = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (selectedType !== 'all') {
        params.append('fileType', selectedType)
      }
      
      const response = await fetch(`/api/projects/${projectId}/documents?${params}`)
      const data = await response.json()
      
      if (data.success) {
        setDocuments(data.data)
      }
    } catch (error) {
      console.error('Error fetching documents:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateDocument = async (documentType: string, templateData: any) => {
    try {
      setGeneratingDoc(true)
      
      const response = await fetch('/api/documents/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentType,
          projectId,
          templateData: {
            ...templateData,
            generatedBy: 'Portal User'
          },
          autoSend: templateData.autoSend || false
        })
      })

      const data = await response.json()
      
      if (data.success) {
        alert(`${documentType} generated successfully!`)
        setShowGenerateModal(false)
        fetchDocuments()
      } else {
        alert(`Error generating ${documentType}: ${data.error}`)
      }
    } catch (error) {
      console.error('Error generating document:', error)
      alert('Error generating document')
    } finally {
      setGeneratingDoc(false)
    }
  }

  const downloadDocument = async (documentId: string, filename: string) => {
    try {
      const response = await fetch(`/api/documents/${documentId}/download`)
      const data = await response.json()
      
      if (data.success && data.data.downloadUrl) {
        // Create download link
        const link = document.createElement('a')
        link.href = data.data.downloadUrl
        link.download = filename
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } else {
        alert('Download not available')
      }
    } catch (error) {
      console.error('Error downloading document:', error)
      alert('Error downloading document')
    }
  }

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'invoice': return Receipt
      case 'certificate': return Award
      case 'project_report': return FileText
      case 'cad': return Cog
      case 'photo': return Image
      case 'quote': return File
      default: return FileText
    }
  }

  const getFileTypeColor = (fileType: string) => {
    switch (fileType) {
      case 'invoice': return 'text-green-600 bg-green-50'
      case 'certificate': return 'text-purple-600 bg-purple-50'
      case 'project_report': return 'text-blue-600 bg-blue-50'
      case 'cad': return 'text-orange-600 bg-orange-50'
      case 'photo': return 'text-pink-600 bg-pink-50'
      case 'quote': return 'text-indigo-600 bg-indigo-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const filteredDocuments = documents?.documents.filter(doc =>
    doc.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.fileType.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

  const documentTypes = [
    { value: 'all', label: 'All Documents', count: documents?.documents.length || 0 },
    { value: 'invoice', label: 'Invoices', count: documents?.documentsByType.invoice?.length || 0 },
    { value: 'project_report', label: 'Reports', count: documents?.documentsByType.project_report?.length || 0 },
    { value: 'certificate', label: 'Certificates', count: documents?.documentsByType.certificate?.length || 0 },
    { value: 'cad', label: 'CAD Files', count: documents?.documentsByType.cad?.length || 0 },
    { value: 'photo', label: 'Photos', count: documents?.documentsByType.photo?.length || 0 },
    { value: 'quote', label: 'Quotes', count: documents?.documentsByType.quote?.length || 0 }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Project Documents</h1>
          <p className="text-gray-600">Manage invoices, reports, certificates, and project files</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowGenerateModal(true)}
            className="px-4 py-2 bg-[#006FEE] text-white rounded-lg hover:bg-[#0050B3] transition-colors text-sm font-medium flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Generate Document
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Upload File
          </button>
        </div>
      </div>

      {/* Document Type Filters */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <div className="flex flex-wrap gap-3">
          {documentTypes.map(type => (
            <button
              key={type.value}
              onClick={() => setSelectedType(type.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                selectedType === type.value
                  ? 'bg-[#006FEE] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {type.label}
              <span className={`px-2 py-1 rounded-full text-xs ${
                selectedType === type.value
                  ? 'bg-white bg-opacity-20 text-white'
                  : 'bg-gray-300 text-gray-600'
              }`}>
                {type.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006FEE] focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Documents List */}
      {loading ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-[#006FEE] border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading documents...</p>
        </div>
      ) : filteredDocuments.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm ? 'Try adjusting your search criteria' : 'Start by generating or uploading a document'}
          </p>
          <button
            onClick={() => setShowGenerateModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#006FEE] text-white rounded-lg hover:bg-[#0050B3] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Generate Document
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Documents ({filteredDocuments.length})
            </h3>
          </div>
          <div className="divide-y divide-gray-100">
            {filteredDocuments.map((document) => {
              const FileIcon = getFileIcon(document.fileType)
              const generation = document.generations?.[0]
              
              return (
                <div key={document.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getFileTypeColor(document.fileType)}`}>
                        <FileIcon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900 text-lg">{document.filename}</h4>
                            <div className="flex items-center gap-3 mt-1">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getFileTypeColor(document.fileType)}`}>
                                {document.fileType.replace('_', ' ')}
                              </span>
                              {generation && (
                                <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                                  {generation.documentNumber}
                                </span>
                              )}
                              <span className="text-sm text-gray-600">{formatFileSize(document.fileSize)}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>Uploaded: {formatDate(document.uploadedAt)}</span>
                          </div>
                          {generation && (
                            <>
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                <span>Generated by: System</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  generation.status === 'completed' ? 'bg-green-100 text-green-800' :
                                  generation.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {generation.status}
                                </span>
                                {generation.emailSent && (
                                  <span className="text-xs text-blue-600">Email sent</span>
                                )}
                              </div>
                            </>
                          )}
                        </div>

                        <div className="flex items-center gap-3 mt-4">
                          <button
                            onClick={() => downloadDocument(document.id, document.filename)}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-[#006FEE] hover:bg-blue-50 rounded-md transition-colors"
                          >
                            <Download className="w-4 h-4" />
                            Download
                          </button>
                          <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
                            <Eye className="w-4 h-4" />
                            Preview
                          </button>
                          <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
                            <Share className="w-4 h-4" />
                            Share
                          </button>
                          <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
                            <Edit className="w-4 h-4" />
                            Rename
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
      )}

      {/* Generate Document Modal */}
      {showGenerateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Generate Document</h3>
              <p className="text-sm text-gray-600 mt-1">Choose a document type to generate</p>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { type: 'invoice', label: 'Invoice', description: 'Generate professional invoice for completed work' },
                  { type: 'project_report', label: 'Project Report', description: 'Comprehensive project progress and completion report' },
                  { type: 'certificate', label: 'Certificate', description: 'Completion or compliance certificate' },
                  { type: 'quote', label: 'Quote', description: 'Project quote and pricing document' }
                ].map(docType => (
                  <button
                    key={docType.type}
                    onClick={() => {
                      // Here you would open a specific form for each document type
                      generateDocument(docType.type, {
                        // Mock template data - replace with actual form data
                        client: { name: 'Mock Client', address: ['123 Test St', 'Test City'] },
                        items: [],
                        autoSend: false
                      })
                    }}
                    disabled={generatingDoc}
                    className="p-4 border border-gray-200 rounded-lg hover:border-[#006FEE] hover:bg-blue-50 transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <h4 className="font-semibold text-gray-900">{docType.label}</h4>
                    <p className="text-sm text-gray-600 mt-1">{docType.description}</p>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowGenerateModal(false)}
                disabled={generatingDoc}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}