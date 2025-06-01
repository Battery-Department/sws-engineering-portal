'use client'

import React from 'react'
import { 
  Train, 
  Calendar, 
  Download, 
  Printer, 
  CheckCircle,
  Award,
  Shield,
  Phone,
  Mail,
  MapPin,
  Stamp,
  FileText,
  Clock,
  User
} from 'lucide-react'

interface CertificateData {
  certificateNumber: string
  certificateType: 'completion' | 'compliance' | 'inspection' | 'warranty' | 'safety'
  projectRef: string
  projectName: string
  issueDate: Date
  validUntil?: Date
  client: {
    name: string
    contact: string
    address: string[]
  }
  project: {
    description: string
    location: string
    serviceType: 'steam' | 'cad' | 'repair' | 'fabrication'
    completionDate: Date
    workScope: string[]
  }
  compliance: {
    standards: string[]
    regulations: string[]
    testingCompleted: boolean
    inspectionPassed: boolean
  }
  warranty: {
    period: string
    coverage: string[]
    conditions: string[]
  }
  certification: {
    certifyingEngineer: string
    engineerRegistration: string
    qualifications: string[]
    signature?: string
  }
  digitalVerification: {
    hash: string
    timestamp: Date
    verificationUrl: string
  }
}

interface SWSCertificateProps {
  data: CertificateData
  onPrint?: () => void
  onDownload?: () => void
}

export default function SWSCertificate({ data, onPrint, onDownload }: SWSCertificateProps) {
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const getCertificateTypeLabel = (type: string) => {
    switch (type) {
      case 'completion': return 'Certificate of Completion'
      case 'compliance': return 'Certificate of Compliance'
      case 'inspection': return 'Inspection Certificate'
      case 'warranty': return 'Warranty Certificate'
      case 'safety': return 'Safety Certificate'
      default: return 'Engineering Certificate'
    }
  }

  const getCertificateColor = (type: string) => {
    switch (type) {
      case 'completion': return 'from-green-600 to-green-800'
      case 'compliance': return 'from-blue-600 to-blue-800'
      case 'inspection': return 'from-purple-600 to-purple-800'
      case 'warranty': return 'from-orange-600 to-orange-800'
      case 'safety': return 'from-red-600 to-red-800'
      default: return 'from-[#006FEE] to-[#0050B3]'
    }
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Print Controls - Hidden in print */}
      <div className="no-print bg-gray-50 p-4 border-b border-gray-200 flex justify-end gap-3">
        <button
          onClick={onPrint}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium flex items-center gap-2"
        >
          <Printer className="w-4 h-4" />
          Print Certificate
        </button>
        <button
          onClick={onDownload}
          className="px-4 py-2 bg-[#006FEE] text-white rounded-lg hover:bg-[#0050B3] transition-colors text-sm font-medium flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Download PDF
        </button>
      </div>

      {/* Certificate Content */}
      <div className="max-w-4xl mx-auto p-8 print:p-6">
        {/* Decorative Border */}
        <div className="border-8 border-double border-gray-300 p-8 bg-gradient-to-br from-blue-50 via-white to-green-50">
          
          {/* Header with Logo */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className={`w-24 h-24 bg-gradient-to-r ${getCertificateColor(data.certificateType)} rounded-full flex items-center justify-center shadow-lg`}>
                <Train className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-2">South West Steam Engineering</h1>
            <p className="text-xl text-gray-600 mb-1">Heritage Railway & Industrial Engineering Specialists</p>
            <p className="text-sm text-gray-500">Redruth, Cornwall • Professional Engineering Services</p>
            
            <div className="mt-8">
              <h2 className={`text-3xl font-bold bg-gradient-to-r ${getCertificateColor(data.certificateType)} bg-clip-text text-transparent mb-4`}>
                {getCertificateTypeLabel(data.certificateType)}
              </h2>
              <div className={`h-1 w-32 bg-gradient-to-r ${getCertificateColor(data.certificateType)} mx-auto rounded-full`}></div>
            </div>
          </div>

          {/* Certificate Details */}
          <div className="text-center mb-12">
            <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-gray-100">
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                This certificate hereby confirms that the engineering work described below has been completed 
                in accordance with professional engineering standards, applicable regulations, and industry best practices.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                <div>
                  <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wide mb-3">Client Information</h3>
                  <div className="space-y-2">
                    <p className="text-lg font-semibold text-gray-900">{data.client.name}</p>
                    <p className="text-gray-700">{data.client.contact}</p>
                    {data.client.address.map((line, index) => (
                      <p key={index} className="text-gray-700">{line}</p>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wide mb-3">Project Details</h3>
                  <div className="space-y-2">
                    <p className="font-semibold text-gray-900">{data.projectName}</p>
                    <p className="text-gray-700">{data.project.description}</p>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {data.project.location}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Completed: {formatDate(data.project.completionDate)}
                    </p>
                    <p className="text-sm text-gray-600">
                      Project Ref: <span className="font-semibold">{data.projectRef}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Work Scope */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-gray-900 text-center mb-6">Scope of Work Certified</h3>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.project.workScope.map((scope, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{scope}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Compliance & Standards */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-gray-900 text-center mb-6">Compliance & Standards</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  Standards Compliance
                </h4>
                <div className="space-y-2">
                  {data.compliance.standards.map((standard, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-gray-700">{standard}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-purple-600" />
                  Regulatory Compliance
                </h4>
                <div className="space-y-2">
                  {data.compliance.regulations.map((regulation, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-purple-600" />
                      <span className="text-sm text-gray-700">{regulation}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    data.compliance.testingCompleted ? 'bg-green-600' : 'bg-gray-400'
                  }`}>
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Testing Completed</p>
                    <p className="text-sm text-gray-600">
                      {data.compliance.testingCompleted ? 'All required testing completed successfully' : 'Testing pending'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    data.compliance.inspectionPassed ? 'bg-orange-600' : 'bg-gray-400'
                  }`}>
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Inspection Status</p>
                    <p className="text-sm text-gray-600">
                      {data.compliance.inspectionPassed ? 'Inspection passed successfully' : 'Inspection pending'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Warranty Information */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-gray-900 text-center mb-6">Warranty Information</h3>
            <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Warranty Period</h4>
                  <p className="text-lg font-bold text-yellow-700">{data.warranty.period}</p>
                  {data.validUntil && (
                    <p className="text-sm text-gray-600 mt-1">Valid until: {formatDate(data.validUntil)}</p>
                  )}
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Coverage Includes</h4>
                  <div className="space-y-1">
                    {data.warranty.coverage.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-yellow-600" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Conditions</h4>
                  <div className="space-y-1">
                    {data.warranty.conditions.map((condition, index) => (
                      <p key={index} className="text-xs text-gray-600">• {condition}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Certificate Authority */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-lg">
              <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-[#006FEE]" />
                Certifying Engineer
              </h4>
              <div className="space-y-2">
                <p className="text-lg font-semibold text-gray-900">{data.certification.certifyingEngineer}</p>
                <p className="text-sm text-gray-600">Registration: {data.certification.engineerRegistration}</p>
                <div className="mt-3">
                  <p className="text-sm font-semibold text-gray-900 mb-1">Qualifications:</p>
                  {data.certification.qualifications.map((qual, index) => (
                    <p key={index} className="text-sm text-gray-700">• {qual}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-lg">
              <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Stamp className="w-5 h-5 text-[#006FEE]" />
                Digital Verification
              </h4>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold text-gray-900">Certificate Number:</p>
                  <p className="text-lg font-mono text-[#006FEE]">{data.certificateNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Issue Date:</p>
                  <p className="text-sm text-gray-700">{formatDate(data.issueDate)}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Verification Hash:</p>
                  <p className="text-xs font-mono text-gray-600 break-all">{data.digitalVerification.hash}</p>
                </div>
                <div className="mt-4 p-3 bg-[#006FEE] bg-opacity-10 rounded-lg">
                  <p className="text-xs text-[#006FEE] font-semibold">
                    Verify this certificate online at: {data.digitalVerification.verificationUrl}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Official Seals and Signatures */}
          <div className="text-center mb-8">
            <div className="flex justify-center items-center gap-8 mb-6">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-[#006FEE] to-[#0050B3] rounded-full flex items-center justify-center mb-2 shadow-lg">
                  <Stamp className="w-12 h-12 text-white" />
                </div>
                <p className="text-xs font-semibold text-gray-600">OFFICIAL SEAL</p>
                <p className="text-xs text-gray-500">SWS Engineering</p>
              </div>
              
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-green-600 to-green-800 rounded-full flex items-center justify-center mb-2 shadow-lg">
                  <Award className="w-12 h-12 text-white" />
                </div>
                <p className="text-xs font-semibold text-gray-600">CERTIFIED</p>
                <p className="text-xs text-gray-500">{formatDate(data.issueDate)}</p>
              </div>
            </div>
            
            <div className="border-t-2 border-gray-300 pt-4">
              <p className="text-sm font-semibold text-gray-900 mb-1">
                This certificate is issued under the authority of South West Steam Engineering Ltd.
              </p>
              <p className="text-xs text-gray-600">
                Company Registration: 12345678 • VAT Registration: GB 123 4567 89
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="text-center border-t border-gray-200 pt-6">
            <div className="flex justify-center items-center gap-6 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Redruth, Cornwall, TR15 3AE</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+44 1209 123456</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>certificates@swsteamengineering.co.uk</span>
              </div>
            </div>
            
            <p className="text-xs text-gray-500">
              This certificate is valid only when accompanied by the original project documentation and remains
              the property of South West Steam Engineering Ltd. Any unauthorized reproduction is prohibited.
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
        }
      `}</style>
    </div>
  )
}