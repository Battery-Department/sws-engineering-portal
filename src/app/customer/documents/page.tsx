'use client'

import React, { useState, useEffect } from 'react'
import { 
  FileText,
  Download,
  Eye,
  Calendar,
  Award,
  Receipt,
  File,
  Image,
  Lock,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react'

interface CustomerDocument {
  id: string
  filename: string
  fileType: string
  fileSize: number
  uploadedAt: string
  projectRef: string
  projectName: string
  isPublic: boolean
  generation?: {
    documentNumber: string
    documentType: string
    status: string
    generatedAt: string
  }
}

// Sample documents with actual downloadable files
const mockCustomerDocuments: CustomerDocument[] = [
  {
    id: '1',
    filename: 'SWSE Invoice INV-2024-0012.html',
    fileType: 'invoice',
    fileSize: 45760,
    uploadedAt: '2024-05-20T10:30:00Z',
    projectRef: 'PROJ-2024-047',
    projectName: '7¼" Gauge Steam Locomotive Restoration - Fire Tube Replacement',
    isPublic: true,
    generation: {
      documentNumber: 'INV-2024-0012',
      documentType: 'invoice',
      status: 'completed',
      generatedAt: '2024-05-20T10:30:00Z'
    }
  },
  {
    id: '2',
    filename: 'SWSE Progress Report RPT-2024-0008.html',
    fileType: 'project_report',
    fileSize: 78400,
    uploadedAt: '2024-05-18T14:15:00Z',
    projectRef: 'PROJ-2024-047',
    projectName: '7¼" Gauge Steam Locomotive Restoration - Progress Report',
    isPublic: true,
    generation: {
      documentNumber: 'RPT-2024-0008',
      documentType: 'project_report',
      status: 'completed',
      generatedAt: '2024-05-18T14:15:00Z'
    }
  },
  {
    id: '3',
    filename: 'SWSE Completion Certificate CERT-2024-0005.html',
    fileType: 'certificate',
    fileSize: 52000,
    uploadedAt: '2024-05-22T16:45:00Z',
    projectRef: 'PROJ-2024-047',
    projectName: '7¼" Gauge Steam Locomotive Restoration - Completion Certificate',
    isPublic: true,
    generation: {
      documentNumber: 'CERT-2024-0005',
      documentType: 'certificate',
      status: 'completed',
      generatedAt: '2024-05-22T16:45:00Z'
    }
  },
  {
    id: '4',
    filename: 'Sample Progress Photos Documentation.txt',
    fileType: 'photo',
    fileSize: 2048,
    uploadedAt: '2024-05-21T11:20:00Z',
    projectRef: 'PROJ-2024-047',
    projectName: '7¼" Gauge Steam Locomotive Restoration - Photo Documentation Guide',
    isPublic: true
  },
  {
    id: '5',
    filename: 'SWSE Quote Template Example.html',
    fileType: 'quote',
    fileSize: 35000,
    uploadedAt: '2024-05-10T09:15:00Z',
    projectRef: 'PROJ-2024-048',
    projectName: 'Industrial Gearbox Restoration - Quote Example',
    isPublic: true,
    generation: {
      documentNumber: 'QTE-2024-0023',
      documentType: 'quote',
      status: 'completed',
      generatedAt: '2024-05-10T09:15:00Z'
    }
  }
]

export default function CustomerDocumentsPage() {
  const [documents, setDocuments] = useState<CustomerDocument[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedType, setSelectedType] = useState('all')
  const [downloading, setDownloading] = useState<string | null>(null)
  const [previewDocument, setPreviewDocument] = useState<CustomerDocument | null>(null)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDocuments(mockCustomerDocuments)
      setLoading(false)
    }, 1000)
  }, [])

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'invoice': return Receipt
      case 'certificate': return Award
      case 'project_report': return FileText
      case 'photo': return Image
      case 'quote': return File
      default: return FileText
    }
  }

  const getFileTypeColor = (fileType: string) => {
    switch (fileType) {
      case 'invoice': return 'text-green-600 bg-green-50 border-green-200'
      case 'certificate': return 'text-purple-600 bg-purple-50 border-purple-200'
      case 'project_report': return 'text-blue-600 bg-blue-50 border-blue-200'
      case 'photo': return 'text-pink-600 bg-pink-50 border-pink-200'
      case 'quote': return 'text-indigo-600 bg-indigo-50 border-indigo-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
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
      month: 'long',
      year: 'numeric'
    })
  }

  const downloadDocument = async (documentId: string, filename: string) => {
    try {
      setDownloading(documentId)
      
      // Map document IDs to actual file paths
      const fileMap: { [key: string]: string } = {
        '1': '/sample-documents/SWSE-Invoice-INV-2024-0012.html',
        '2': '/sample-documents/SWSE-Progress-Report-RPT-2024-0008.html',
        '3': '/sample-documents/SWSE-Certificate-CERT-2024-0005.html',
        '4': '/sample-documents/photo-documentation-guide.txt',
        '5': '/sample-documents/quote-template-example.html'
      }
      
      const filePath = fileMap[documentId]
      
      if (filePath) {
        // Create a temporary delay for realistic download experience
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // Create download link
        const link = document.createElement('a')
        link.href = filePath
        link.download = filename
        link.target = '_blank'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        
        // Show success message
        alert(`✓ Download complete: ${filename}\n\nThis is a sample document demonstrating SWSE's professional documentation standards.`)
      } else {
        alert('Sample file not available for this document type.')
      }
    } catch (error) {
      console.error('Error downloading document:', error)
      alert('Error downloading document. Please try again.')
    } finally {
      setDownloading(null)
    }
  }

  const previewDocumentHandler = (document: CustomerDocument) => {
    setPreviewDocument(document)
  }

  const getPreviewUrl = (documentId: string) => {
    const fileMap: { [key: string]: string } = {
      '1': '/sample-documents/SWSE-Invoice-INV-2024-0012.html',
      '2': '/sample-documents/SWSE-Progress-Report-RPT-2024-0008.html',
      '3': '/sample-documents/SWSE-Certificate-CERT-2024-0005.html',
      '4': '/sample-documents/photo-documentation-guide.txt',
      '5': '/sample-documents/quote-template-example.html'
    }
    return fileMap[documentId] || ''
  }

  const filteredDocuments = documents.filter(doc => 
    selectedType === 'all' || doc.fileType === selectedType
  )

  const documentTypes = [
    { value: 'all', label: 'All Documents', count: documents.length },
    { value: 'invoice', label: 'Invoices', count: documents.filter(d => d.fileType === 'invoice').length },
    { value: 'project_report', label: 'Reports', count: documents.filter(d => d.fileType === 'project_report').length },
    { value: 'certificate', label: 'Certificates', count: documents.filter(d => d.fileType === 'certificate').length },
    { value: 'quote', label: 'Quotes', count: documents.filter(d => d.fileType === 'quote').length },
    { value: 'photo', label: 'Photos', count: documents.filter(d => d.fileType === 'photo').length }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-[#006FEE] to-[#0050B3] rounded-xl flex items-center justify-center">
              <FileText className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Project Documents</h1>
          <p className="text-xl text-gray-600 mb-6">
            Access your project invoices, reports, certificates, and progress photos
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 inline-block">
            <p className="text-sm text-blue-800">
              <CheckCircle className="w-4 h-4 inline mr-2" />
              All documents are securely stored and accessible 24/7
            </p>
          </div>
        </div>

        {/* Document Type Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Categories</h3>
          <div className="flex flex-wrap gap-3">
            {documentTypes.map(type => (
              <button
                key={type.value}
                onClick={() => setSelectedType(type.value)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 border ${
                  selectedType === type.value
                    ? 'bg-[#006FEE] text-white border-[#006FEE] shadow-lg transform scale-105'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-[#006FEE] hover:text-[#006FEE] hover:shadow-md'
                }`}
              >
                {type.label}
                <span className={`px-2 py-1 rounded-full text-xs ${
                  selectedType === type.value
                    ? 'bg-white bg-opacity-20 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {type.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Documents List */}
        {loading ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-[#006FEE] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your documents...</p>
          </div>
        ) : filteredDocuments.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
            <p className="text-gray-600">
              No documents are available for the selected category.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredDocuments.map((document) => {
              const FileIcon = getFileIcon(document.fileType)
              const isDownloading = downloading === document.id
              
              return (
                <div 
                  key={document.id} 
                  className={`bg-white rounded-xl shadow-sm border transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${getFileTypeColor(document.fileType)}`}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${getFileTypeColor(document.fileType)}`}>
                          <FileIcon className="w-7 h-7" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-semibold text-gray-900 text-lg mb-1">{document.filename}</h4>
                              <div className="flex items-center gap-3">
                                <span className={`px-3 py-1 text-xs font-medium rounded-full ${getFileTypeColor(document.fileType)}`}>
                                  {document.fileType.replace('_', ' ')}
                                </span>
                                {document.generation && (
                                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                                    #{document.generation.documentNumber}
                                  </span>
                                )}
                                <span className="text-sm text-gray-600">{formatFileSize(document.fileSize)}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Calendar className="w-4 h-4" />
                                <span>Created: {formatDate(document.uploadedAt)}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <FileText className="w-4 h-4" />
                                <span>Project: {document.projectRef}</span>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <p className="text-sm font-medium text-gray-900">{document.projectName}</p>
                              {document.generation && (
                                <div className="flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4 text-green-600" />
                                  <span className="text-sm text-green-600">Verified Document</span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <button
                              onClick={() => downloadDocument(document.id, document.filename)}
                              disabled={isDownloading}
                              className="flex items-center gap-2 px-4 py-2 bg-[#006FEE] text-white rounded-lg hover:bg-[#0050B3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {isDownloading ? (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              ) : (
                                <Download className="w-4 h-4" />
                              )}
                              {isDownloading ? 'Downloading...' : 'Download'}
                            </button>
                            
                            <button 
                              onClick={() => previewDocumentHandler(document)}
                              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                              Preview
                            </button>
                            
                            {!document.isPublic && (
                              <div className="flex items-center gap-2 text-sm text-orange-600">
                                <Lock className="w-4 h-4" />
                                <span>Restricted Access</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help?</h3>
            <p className="text-gray-600 mb-4">
              If you have any questions about your documents or need additional copies, please contact our team.
            </p>
            <div className="flex justify-center gap-4">
              <a 
                href="mailto:enquiries@swsteamengineering.co.uk"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#006FEE] text-white rounded-lg hover:bg-[#0050B3] transition-colors"
              >
                Email Support
              </a>
              <a 
                href="tel:+441209123456"
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Call Us
              </a>
            </div>
          </div>
        </div>

        {/* Preview Modal */}
        {previewDocument && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{previewDocument.filename}</h3>
                  <p className="text-sm text-gray-600">{previewDocument.projectName}</p>
                </div>
                <button
                  onClick={() => setPreviewDocument(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <span className="sr-only">Close</span>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6 overflow-auto max-h-[calc(90vh-120px)]">
                {previewDocument.fileType === 'photo' ? (
                  <div className="text-center">
                    <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-12">
                      <div className="text-gray-500 mb-4">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h4 className="text-lg font-medium text-gray-900 mb-2">Photo Documentation Guide</h4>
                      <p className="text-gray-600 mb-4">
                        This file contains comprehensive photography guidelines and standards used in SWSE project documentation.
                      </p>
                      <button
                        onClick={() => downloadDocument(previewDocument.id, previewDocument.filename)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#006FEE] text-white rounded-lg hover:bg-[#0050B3] transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        View Full Documentation
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-blue-800 mb-2">
                        <FileText className="w-5 h-5" />
                        <span className="font-medium">Document Preview</span>
                      </div>
                      <p className="text-sm text-blue-700 mb-3">
                        This is a professional sample document demonstrating SWSE's documentation standards and attention to detail.
                      </p>
                      <div className="flex gap-3">
                        <button
                          onClick={() => {
                            const previewUrl = getPreviewUrl(previewDocument.id)
                            if (previewUrl) {
                              window.open(previewUrl, '_blank')
                            }
                          }}
                          className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          Open in New Tab
                        </button>
                        <button
                          onClick={() => downloadDocument(previewDocument.id, previewDocument.filename)}
                          className="inline-flex items-center gap-2 px-3 py-2 border border-blue-600 text-blue-600 text-sm rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <iframe
                        src={getPreviewUrl(previewDocument.id)}
                        className="w-full h-96 border-0"
                        title={`Preview of ${previewDocument.filename}`}
                        sandbox="allow-same-origin"
                      />
                    </div>
                    
                    <div className="text-center text-sm text-gray-500">
                      <p>Preview may not show full formatting. For best experience, open in new tab or download the document.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}