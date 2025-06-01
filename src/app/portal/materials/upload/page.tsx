'use client'

import React, { useState, useCallback } from 'react'
import Link from 'next/link'
import { 
  Upload,
  FileText,
  Image,
  Loader,
  CheckCircle,
  AlertCircle,
  X,
  Plus,
  Minus,
  Calendar,
  Receipt,
  Package,
  PoundSterling,
  Save,
  Eye,
  Download
} from 'lucide-react'

interface InvoiceItem {
  id: string
  material: string
  quantity: number
  unit: string
  unitCost: number
  totalCost: number
}

interface Project {
  id: string
  projectRef: string
  name: string
  client: string
}

interface UploadedFile {
  file: File
  preview: string
  status: 'uploading' | 'uploaded' | 'error'
}

// Mock projects data
const mockProjects: Project[] = [
  { id: 'PROJ-2024-047', projectRef: 'PROJ-2024-047', name: '7¼" Gauge Steam Locomotive Restoration', client: 'Bodmin & Wenford Railway' },
  { id: 'PROJ-2024-052', projectRef: 'PROJ-2024-052', name: 'Pump House Machinery Overhaul', client: 'Cornwall Mining Heritage' },
  { id: 'PROJ-2024-055', projectRef: 'PROJ-2024-055', name: 'Custom Coupling Assembly Design', client: 'Private Collector' }
]

const unitOptions = [
  { value: 'kg', label: 'Kilograms (kg)' },
  { value: 'm', label: 'Metres (m)' },
  { value: 'units', label: 'Units' },
  { value: 'litres', label: 'Litres' },
  { value: 'sqm', label: 'Square Metres (m²)' },
  { value: 'hours', label: 'Hours' }
]

export default function InvoiceUploadPage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [supplier, setSupplier] = useState('')
  const [invoiceRef, setInvoiceRef] = useState('')
  const [invoiceDate, setInvoiceDate] = useState('')
  const [selectedProject, setSelectedProject] = useState('')
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([
    { id: '1', material: '', quantity: 1, unit: 'units', unitCost: 0, totalCost: 0 }
  ])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [dragActive, setDragActive] = useState(false)

  // Handle drag events
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  // Handle drop event
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(Array.from(e.dataTransfer.files))
    }
  }, [])

  // Handle file upload
  const handleFileUpload = async (files: File[]) => {
    const validFiles = files.filter(file => {
      const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']
      const maxSize = 10 * 1024 * 1024 // 10MB
      return validTypes.includes(file.type) && file.size <= maxSize
    })

    if (validFiles.length === 0) {
      alert('Please upload PDF or image files (max 10MB each)')
      return
    }

    setLoading(true)

    for (const file of validFiles) {
      const preview = file.type.startsWith('image/') 
        ? URL.createObjectURL(file)
        : '/api/placeholder/pdf-icon'

      const uploadedFile: UploadedFile = {
        file,
        preview,
        status: 'uploading'
      }

      setUploadedFiles(prev => [...prev, uploadedFile])

      try {
        // Simulate file upload
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // Here you would upload to your storage service
        // const formData = new FormData()
        // formData.append('file', file)
        // const response = await fetch('/api/upload', {
        //   method: 'POST',
        //   body: formData
        // })

        setUploadedFiles(prev => 
          prev.map(f => 
            f.file === file 
              ? { ...f, status: 'uploaded' }
              : f
          )
        )

      } catch (error) {
        console.error('Upload error:', error)
        setUploadedFiles(prev => 
          prev.map(f => 
            f.file === file 
              ? { ...f, status: 'error' }
              : f
          )
        )
      }
    }

    setLoading(false)
  }

  // Remove uploaded file
  const removeFile = (file: File) => {
    setUploadedFiles(prev => prev.filter(f => f.file !== file))
  }

  // Add new invoice item
  const addInvoiceItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      material: '',
      quantity: 1,
      unit: 'units',
      unitCost: 0,
      totalCost: 0
    }
    setInvoiceItems([...invoiceItems, newItem])
  }

  // Remove invoice item
  const removeInvoiceItem = (id: string) => {
    if (invoiceItems.length > 1) {
      setInvoiceItems(invoiceItems.filter(item => item.id !== id))
    }
  }

  // Update invoice item
  const updateInvoiceItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setInvoiceItems(items => 
      items.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value }
          // Recalculate total cost when quantity or unit cost changes
          if (field === 'quantity' || field === 'unitCost') {
            updatedItem.totalCost = updatedItem.quantity * updatedItem.unitCost
          }
          return updatedItem
        }
        return item
      })
    )
  }

  // Calculate totals
  const totalAmount = invoiceItems.reduce((sum, item) => sum + item.totalCost, 0)

  // Validate form
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}
    
    if (!supplier.trim()) {
      newErrors.supplier = 'Supplier is required'
    }
    
    if (!invoiceRef.trim()) {
      newErrors.invoiceRef = 'Invoice reference is required'
    }
    
    if (!invoiceDate) {
      newErrors.invoiceDate = 'Invoice date is required'
    }

    // Validate items
    const invalidItems = invoiceItems.filter(item => 
      !item.material.trim() || item.quantity <= 0 || item.unitCost <= 0
    )
    
    if (invalidItems.length > 0) {
      newErrors.items = 'All items must have material name, quantity > 0, and unit cost > 0'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Save invoice
  const saveInvoice = async () => {
    if (!validateForm()) return

    setSaving(true)
    try {
      // Prepare invoice data
      const invoiceData = {
        supplier: supplier.trim(),
        invoiceRef: invoiceRef.trim(),
        date: new Date(invoiceDate),
        totalAmount,
        items: invoiceItems.filter(item => item.material.trim()),
        projectId: selectedProject || null,
        fileUrl: uploadedFiles.length > 0 ? 'uploaded-file-url' : null
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Here you would make the actual API call:
      // const response = await fetch('/api/supplier-invoices', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(invoiceData)
      // })

      alert('Invoice saved successfully! Material costs have been added to the database.')
      
      // Reset form
      setSupplier('')
      setInvoiceRef('')
      setInvoiceDate('')
      setSelectedProject('')
      setInvoiceItems([{ id: '1', material: '', quantity: 1, unit: 'units', unitCost: 0, totalCost: 0 }])
      setUploadedFiles([])
      setErrors({})

    } catch (error) {
      console.error('Error saving invoice:', error)
      alert('Error saving invoice. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Upload Supplier Invoice</h1>
          <p className="text-gray-600">Upload invoices and extract material costs for the database</p>
        </div>
        <Link
          href="/portal/materials/calculator"
          className="px-4 py-2 bg-[#006FEE] text-white rounded-lg hover:bg-[#0050B3] transition-colors text-sm font-medium flex items-center gap-2"
        >
          <Package className="w-4 h-4" />
          Material Calculator
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* File Upload */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upload Area */}
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Invoice Files</h3>
            
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive 
                  ? 'border-[#006FEE] bg-blue-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">
                Drop files here or click to upload
              </h4>
              <p className="text-gray-600 mb-4">
                Supports PDF and image files up to 10MB each
              </p>
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => {
                  if (e.target.files) {
                    handleFileUpload(Array.from(e.target.files))
                  }
                }}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#006FEE] text-white rounded-lg hover:bg-[#0050B3] transition-colors cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                Choose Files
              </label>
            </div>

            {/* Uploaded Files */}
            {uploadedFiles.length > 0 && (
              <div className="mt-6">
                <h4 className="font-medium text-gray-900 mb-3">Uploaded Files</h4>
                <div className="space-y-3">
                  {uploadedFiles.map((uploadedFile, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        {uploadedFile.file.type.startsWith('image/') ? (
                          <Image className="w-5 h-5 text-gray-600" />
                        ) : (
                          <FileText className="w-5 h-5 text-gray-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{uploadedFile.file.name}</p>
                        <p className="text-sm text-gray-600">
                          {(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {uploadedFile.status === 'uploading' && (
                          <Loader className="w-4 h-4 text-blue-600 animate-spin" />
                        )}
                        {uploadedFile.status === 'uploaded' && (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        )}
                        {uploadedFile.status === 'error' && (
                          <AlertCircle className="w-4 h-4 text-red-600" />
                        )}
                        <button
                          onClick={() => removeFile(uploadedFile.file)}
                          className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Invoice Details */}
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Invoice Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Supplier *
                </label>
                <input
                  type="text"
                  value={supplier}
                  onChange={(e) => setSupplier(e.target.value)}
                  placeholder="e.g., Cornwall Steel Ltd"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#006FEE] focus:border-transparent ${
                    errors.supplier ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.supplier && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.supplier}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Invoice Reference *
                </label>
                <input
                  type="text"
                  value={invoiceRef}
                  onChange={(e) => setInvoiceRef(e.target.value)}
                  placeholder="e.g., INV-2024-001"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#006FEE] focus:border-transparent ${
                    errors.invoiceRef ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.invoiceRef && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.invoiceRef}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Invoice Date *
                </label>
                <input
                  type="date"
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#006FEE] focus:border-transparent ${
                    errors.invoiceDate ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.invoiceDate && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.invoiceDate}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Link to Project (Optional)
                </label>
                <select
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006FEE] focus:border-transparent"
                >
                  <option value="">No specific project</option>
                  {mockProjects.map(project => (
                    <option key={project.id} value={project.id}>
                      {project.projectRef} - {project.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Invoice Items */}
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Invoice Items</h3>
              <button
                onClick={addInvoiceItem}
                className="px-4 py-2 bg-[#006FEE] text-white rounded-lg hover:bg-[#0050B3] transition-colors text-sm font-medium flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Item
              </button>
            </div>

            {errors.items && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.items}
                </p>
              </div>
            )}

            <div className="space-y-4">
              {invoiceItems.map((item, index) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="font-medium text-gray-900">Item {index + 1}</h4>
                    {invoiceItems.length > 1 && (
                      <button
                        onClick={() => removeInvoiceItem(item.id)}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Material/Description *
                      </label>
                      <input
                        type="text"
                        value={item.material}
                        onChange={(e) => updateInvoiceItem(item.id, 'material', e.target.value)}
                        placeholder="e.g., Mild Steel Bar 25mm"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006FEE] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Quantity *
                      </label>
                      <input
                        type="number"
                        min="0.01"
                        step="0.01"
                        value={item.quantity}
                        onChange={(e) => updateInvoiceItem(item.id, 'quantity', Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006FEE] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Unit Cost *
                      </label>
                      <input
                        type="number"
                        min="0.01"
                        step="0.01"
                        value={item.unitCost}
                        onChange={(e) => updateInvoiceItem(item.id, 'unitCost', Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006FEE] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Total
                      </label>
                      <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg font-medium text-gray-900">
                        {formatCurrency(item.totalCost)}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Unit
                    </label>
                    <select
                      value={item.unit}
                      onChange={(e) => updateInvoiceItem(item.id, 'unit', e.target.value)}
                      className="w-full md:w-48 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006FEE] focus:border-transparent"
                    >
                      {unitOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 h-fit">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Invoice Summary</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#006FEE] bg-opacity-10 rounded-lg flex items-center justify-center">
                  <Receipt className="w-5 h-5 text-[#006FEE]" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Total Amount</p>
                  <p className="text-sm text-gray-600">{invoiceItems.length} items</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalAmount)}</p>
              </div>
            </div>

            {supplier && (
              <div className="pt-4 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-2">Invoice Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Supplier:</span>
                    <span className="font-medium">{supplier}</span>
                  </div>
                  {invoiceRef && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Reference:</span>
                      <span className="font-medium">{invoiceRef}</span>
                    </div>
                  )}
                  {invoiceDate && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">
                        {new Date(invoiceDate).toLocaleDateString('en-GB')}
                      </span>
                    </div>
                  )}
                  {selectedProject && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Project:</span>
                      <span className="font-medium text-xs">
                        {mockProjects.find(p => p.id === selectedProject)?.projectRef}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={saveInvoice}
                disabled={saving || totalAmount === 0}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {saving ? 'Processing...' : 'Save Invoice'}
              </button>

              <p className="text-xs text-gray-500 mt-2 text-center">
                This will add all materials to the cost database and link to the selected project
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}