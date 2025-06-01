'use client'

import React from 'react'
import { X } from 'lucide-react'
import SWSInvoice from './SWSInvoice'
import SWSProjectReport from './SWSProjectReport'
import SWSCertificate from './SWSCertificate'

interface DocumentViewerProps {
  documentType: 'invoice' | 'project_report' | 'certificate' | 'quote'
  documentData: any
  isOpen: boolean
  onClose: () => void
  onPrint?: () => void
  onDownload?: () => void
}

export default function DocumentViewer({ 
  documentType, 
  documentData, 
  isOpen, 
  onClose, 
  onPrint, 
  onDownload 
}: DocumentViewerProps) {
  if (!isOpen) return null

  const renderDocument = () => {
    switch (documentType) {
      case 'invoice':
        return (
          <SWSInvoice 
            data={documentData} 
            onPrint={onPrint} 
            onDownload={onDownload} 
          />
        )
      case 'project_report':
        return (
          <SWSProjectReport 
            data={documentData} 
            onPrint={onPrint} 
            onDownload={onDownload} 
          />
        )
      case 'certificate':
        return (
          <SWSCertificate 
            data={documentData} 
            onPrint={onPrint} 
            onDownload={onDownload} 
          />
        )
      default:
        return (
          <div className="bg-white p-12 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Document Preview Not Available
            </h3>
            <p className="text-gray-600">
              Preview for {documentType} documents is not yet implemented.
            </p>
          </div>
        )
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
      <div className="min-h-screen">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-lg font-semibold text-gray-900">
            Document Preview - {documentType.replace('_', ' ').toUpperCase()}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Document Content */}
        <div className="bg-gray-100 min-h-screen">
          {renderDocument()}
        </div>
      </div>
    </div>
  )
}