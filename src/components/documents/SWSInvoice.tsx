'use client'

import React from 'react'
import { 
  Train, 
  Calendar, 
  FileText, 
  Download, 
  Printer, 
  CheckCircle,
  Cog,
  Factory,
  Wrench,
  Phone,
  Mail,
  MapPin,
  Clock
} from 'lucide-react'

interface InvoiceItem {
  id: string
  description: string
  category: 'labour' | 'materials' | 'travel' | 'testing' | 'certification'
  quantity: number
  unit: string
  unitPrice: number
  totalPrice: number
  notes?: string
}

interface InvoiceData {
  invoiceNumber: string
  projectRef: string
  projectName: string
  issueDate: Date
  dueDate: Date
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
    completionDate?: Date
  }
  items: InvoiceItem[]
  terms: {
    paymentTerms: string
    warranty: string
    notes?: string
  }
  totals: {
    subtotal: number
    vat: number
    total: number
  }
}

interface SWSInvoiceProps {
  data: InvoiceData
  onPrint?: () => void
  onDownload?: () => void
}

export default function SWSInvoice({ data, onPrint, onDownload }: SWSInvoiceProps) {
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(amount)
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'labour': return 'text-blue-600'
      case 'materials': return 'text-green-600'
      case 'travel': return 'text-orange-600'
      case 'testing': return 'text-purple-600'
      case 'certification': return 'text-red-600'
      default: return 'text-gray-600'
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
          Print Invoice
        </button>
        <button
          onClick={onDownload}
          className="px-4 py-2 bg-[#006FEE] text-white rounded-lg hover:bg-[#0050B3] transition-colors text-sm font-medium flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Download PDF
        </button>
      </div>

      {/* Invoice Content */}
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
              <div className="mt-2 text-xs text-gray-500">
                <p>VAT Registration: GB 123 4567 89</p>
                <p>Company Registration: 12345678</p>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">INVOICE</h2>
              <p className="text-xl font-semibold text-[#006FEE] mb-4">#{data.invoiceNumber}</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-end gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">
                    <span className="font-semibold">Issue Date:</span> {formatDate(data.issueDate)}
                  </span>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">
                    <span className="font-semibold">Due Date:</span> {formatDate(data.dueDate)}
                  </span>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <FileText className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">
                    <span className="font-semibold">Project:</span> {data.projectRef}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Client Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
            <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">Invoice To:</h3>
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
            <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">Project Details:</h3>
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
              {data.project.completionDate && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Completed: {formatDate(data.project.completionDate)}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Work Summary Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-6 h-6 text-[#006FEE]" />
            <h3 className="text-xl font-bold text-gray-900">Work Summary & Charges</h3>
          </div>
          <div className="bg-[#006FEE] bg-opacity-10 px-4 py-3 rounded-lg border border-[#006FEE] border-opacity-20">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-[#006FEE] font-semibold">Professional Engineering Services - Heritage Railway Specialist</span>
            </div>
          </div>
        </div>

        {/* Invoice Items Table */}
        <div className="overflow-x-auto mb-10">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-700 uppercase tracking-wide">Description</th>
                <th className="text-center py-4 px-4 text-sm font-bold text-gray-700 uppercase tracking-wide">Qty</th>
                <th className="text-center py-4 px-4 text-sm font-bold text-gray-700 uppercase tracking-wide">Unit</th>
                <th className="text-right py-4 px-4 text-sm font-bold text-gray-700 uppercase tracking-wide">Rate</th>
                <th className="text-right py-4 px-4 text-sm font-bold text-gray-700 uppercase tracking-wide">Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item) => (
                <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div>
                      <div className="font-semibold text-gray-900">{item.description}</div>
                      <div className={`text-xs font-medium uppercase tracking-wide mt-1 ${getCategoryColor(item.category)}`}>
                        {item.category}
                      </div>
                      {item.notes && (
                        <div className="text-sm text-gray-600 mt-2 italic">{item.notes}</div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center font-medium text-gray-900">{item.quantity}</td>
                  <td className="py-4 px-4 text-center text-gray-700">{item.unit}</td>
                  <td className="py-4 px-4 text-right font-medium text-gray-900">{formatCurrency(item.unitPrice)}</td>
                  <td className="py-4 px-4 text-right font-bold text-gray-900">{formatCurrency(item.totalPrice)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals Section */}
        <div className="flex justify-end mb-10">
          <div className="w-full md:w-1/2 lg:w-2/5">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <div className="space-y-3">
                <div className="flex justify-between text-gray-700">
                  <span className="font-medium">Subtotal:</span>
                  <span className="font-semibold">{formatCurrency(data.totals.subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span className="font-medium">VAT (20%):</span>
                  <span className="font-semibold">{formatCurrency(data.totals.vat)}</span>
                </div>
                <div className="border-t border-gray-300 pt-3">
                  <div className="flex justify-between text-xl font-bold">
                    <span className="text-gray-900">Total Amount:</span>
                    <span className="text-[#006FEE]">{formatCurrency(data.totals.total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Terms & Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
            <h4 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Payment Terms</h4>
            <p className="text-sm text-gray-700 leading-relaxed">{data.terms.paymentTerms}</p>
            
            <div className="mt-4 p-3 bg-blue-100 rounded-lg">
              <h5 className="text-xs font-bold text-blue-800 mb-2">Payment Details:</h5>
              <div className="text-xs text-blue-700 space-y-1">
                <p>Account Name: South West Steam Engineering Ltd</p>
                <p>Sort Code: 12-34-56</p>
                <p>Account Number: 12345678</p>
                <p>Reference: {data.invoiceNumber}</p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-xl border border-green-200">
            <h4 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Warranty & Quality</h4>
            <p className="text-sm text-gray-700 leading-relaxed">{data.terms.warranty}</p>
            
            {data.terms.notes && (
              <div className="mt-4">
                <h5 className="text-xs font-bold text-green-800 mb-2">Additional Notes:</h5>
                <p className="text-xs text-green-700">{data.terms.notes}</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 pt-6 text-center">
          <div className="text-sm text-gray-600 space-y-1">
            <p className="font-semibold">Thank you for choosing South West Steam Engineering</p>
            <p>Preserving Heritage Railway Engineering • Professional Industrial Services</p>
            <p className="text-xs text-gray-500 mt-3">
              This invoice was generated electronically and is valid without signature.
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
          
          table {
            page-break-inside: avoid;
          }
          
          tr {
            page-break-inside: avoid;
          }
        }
      `}</style>
    </div>
  )
}