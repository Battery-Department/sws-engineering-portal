'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Plus,
  Minus,
  Calculator,
  Package,
  PoundSterling,
  Save,
  Download,
  Search,
  AlertCircle,
  CheckCircle,
  Loader,
  X,
  History,
  TrendingUp,
  FileText
} from 'lucide-react'

interface Material {
  material: string
  supplier: string
  unitCost: number
  date: string
  category?: string
}

interface CalculationItem {
  id: string
  material: string
  supplier: string
  quantity: number
  unit: string
  unitCost: number
  totalCost: number
  category?: string
  notes?: string
}

interface Project {
  id: string
  projectRef: string
  name: string
  client: string
}

// Mock data for development - replace with actual API calls
const mockMaterials: Material[] = [
  { material: 'Mild Steel Bar 25mm', supplier: 'Cornwall Steel Ltd', unitCost: 8.50, date: '2024-05-20', category: 'steel' },
  { material: 'Stainless Steel Sheet 3mm', supplier: 'Devon Metals', unitCost: 12.75, date: '2024-05-18', category: 'steel' },
  { material: 'Bronze Bearing', supplier: 'Heritage Bearings', unitCost: 45.00, date: '2024-05-15', category: 'hardware' },
  { material: 'High Temp Paint', supplier: 'Railway Supplies', unitCost: 28.50, date: '2024-05-10', category: 'consumables' },
  { material: 'M12 Hex Bolts Grade 8.8', supplier: 'Fastener Direct', unitCost: 1.25, date: '2024-05-19', category: 'hardware' },
  { material: 'Copper Tube 15mm', supplier: 'Plumbing Supplies SW', unitCost: 6.80, date: '2024-05-17', category: 'materials' }
]

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

export default function MaterialCalculatorPage() {
  const [materials, setMaterials] = useState<Material[]>(mockMaterials)
  const [projects, setProjects] = useState<Project[]>(mockProjects)
  const [calculationItems, setCalculationItems] = useState<CalculationItem[]>([])
  const [selectedMaterial, setSelectedMaterial] = useState('')
  const [selectedProject, setSelectedProject] = useState('')
  const [quantity, setQuantity] = useState<number>(1)
  const [unit, setUnit] = useState('units')
  const [notes, setNotes] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [calculationName, setCalculationName] = useState('')
  const [errors, setErrors] = useState<{[key: string]: string}>({})

  // Filter materials based on search term
  const filteredMaterials = materials.filter(material =>
    material.material.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (material.category && material.category.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  // Get latest price for selected material
  const getSelectedMaterialData = () => {
    return materials.find(m => m.material === selectedMaterial)
  }

  // Calculate total cost
  const totalCost = calculationItems.reduce((sum, item) => sum + item.totalCost, 0)

  // Validate form
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}
    
    if (!selectedMaterial) {
      newErrors.material = 'Please select a material'
    }
    
    if (quantity <= 0) {
      newErrors.quantity = 'Quantity must be greater than 0'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Add item to calculation
  const addCalculationItem = () => {
    if (!validateForm()) return

    const materialData = getSelectedMaterialData()
    if (!materialData) return

    const newItem: CalculationItem = {
      id: `item-${Date.now()}`,
      material: selectedMaterial,
      supplier: materialData.supplier,
      quantity,
      unit,
      unitCost: materialData.unitCost,
      totalCost: quantity * materialData.unitCost,
      category: materialData.category,
      notes
    }

    setCalculationItems([...calculationItems, newItem])
    
    // Reset form
    setSelectedMaterial('')
    setQuantity(1)
    setUnit('units')
    setNotes('')
    setErrors({})
  }

  // Remove item from calculation
  const removeCalculationItem = (id: string) => {
    setCalculationItems(calculationItems.filter(item => item.id !== id))
  }

  // Update item quantity
  const updateItemQuantity = (id: string, newQuantity: number) => {
    setCalculationItems(calculationItems.map(item => 
      item.id === id 
        ? { ...item, quantity: newQuantity, totalCost: newQuantity * item.unitCost }
        : item
    ))
  }

  // Save calculation to project
  const saveToProject = async () => {
    if (!selectedProject || calculationItems.length === 0) return

    setSaving(true)
    try {
      // Simulate API call to save calculation
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Here you would make the actual API call:
      // const response = await fetch('/api/projects/material-costs', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     projectId: selectedProject,
      //     items: calculationItems,
      //     calculationName
      //   })
      // })
      
      alert('Calculation saved to project successfully!')
      setCalculationItems([])
      setCalculationName('')
      setSelectedProject('')
      
    } catch (error) {
      console.error('Error saving calculation:', error)
      alert('Error saving calculation. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  // Export as PDF quote
  const exportAsPDF = () => {
    // Simulate PDF generation
    alert('PDF export functionality would be implemented here')
  }

  // Load price history for material
  const loadPriceHistory = async (material: string) => {
    setLoading(true)
    try {
      // Simulate API call to get price history
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Here you would make the actual API call:
      // const response = await fetch(`/api/materials/${material}/history`)
      // const history = await response.json()
      
      setShowHistory(true)
    } catch (error) {
      console.error('Error loading price history:', error)
    } finally {
      setLoading(false)
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Material Cost Calculator</h1>
          <p className="text-gray-600">Calculate material costs using latest supplier prices</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center gap-2"
          >
            <History className="w-4 h-4" />
            Price History
          </button>
          <Link
            href="/portal/materials/upload"
            className="px-4 py-2 bg-[#006FEE] text-white rounded-lg hover:bg-[#0050B3] transition-colors text-sm font-medium flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Upload Invoice
          </Link>
        </div>
      </div>

      {/* Calculator Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Material Selection */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Add Materials</h3>
          
          {/* Material Search */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Materials
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search materials, suppliers, or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006FEE] focus:border-transparent"
              />
            </div>
          </div>

          {/* Material Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Material *
            </label>
            <select
              value={selectedMaterial}
              onChange={(e) => setSelectedMaterial(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#006FEE] focus:border-transparent ${
                errors.material ? 'border-red-300' : 'border-gray-300'
              }`}
            >
              <option value="">Choose a material...</option>
              {filteredMaterials.map((material, index) => (
                <option key={index} value={material.material}>
                  {material.material} - {material.supplier} ({formatCurrency(material.unitCost)})
                </option>
              ))}
            </select>
            {errors.material && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.material}
              </p>
            )}
          </div>

          {/* Quantity and Unit */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity *
              </label>
              <input
                type="number"
                min="0.01"
                step="0.01"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#006FEE] focus:border-transparent ${
                  errors.quantity ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.quantity && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.quantity}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unit
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006FEE] focus:border-transparent"
              >
                {unitOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Notes */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes about this material..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006FEE] focus:border-transparent resize-none h-20"
            />
          </div>

          {/* Current Price Display */}
          {selectedMaterial && (
            <div className="mb-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Current Price</p>
                  <p className="text-sm text-gray-600">
                    {getSelectedMaterialData()?.supplier} - Last updated: {formatDate(getSelectedMaterialData()?.date || '')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-[#006FEE]">
                    {formatCurrency(getSelectedMaterialData()?.unitCost || 0)}
                  </p>
                  <button
                    onClick={() => loadPriceHistory(selectedMaterial)}
                    className="text-sm text-gray-600 hover:text-[#006FEE] transition-colors flex items-center gap-1"
                    disabled={loading}
                  >
                    {loading ? <Loader className="w-3 h-3 animate-spin" /> : <TrendingUp className="w-3 h-3" />}
                    Price History
                  </button>
                </div>
              </div>
              {quantity > 0 && (
                <div className="mt-2 pt-2 border-t border-blue-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      {quantity} {unit} × {formatCurrency(getSelectedMaterialData()?.unitCost || 0)}
                    </span>
                    <span className="font-semibold text-gray-900">
                      = {formatCurrency((getSelectedMaterialData()?.unitCost || 0) * quantity)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Add Button */}
          <button
            onClick={addCalculationItem}
            disabled={!selectedMaterial || quantity <= 0}
            className="w-full px-4 py-2 bg-[#006FEE] text-white rounded-lg hover:bg-[#0050B3] transition-colors font-medium flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4" />
            Add to Calculation
          </button>
        </div>

        {/* Running Total */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Running Total</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#006FEE] bg-opacity-10 rounded-lg flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-[#006FEE]" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Total Cost</p>
                  <p className="text-sm text-gray-600">{calculationItems.length} items</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalCost)}</p>
              </div>
            </div>

            {calculationItems.length > 0 && (
              <>
                <div className="border-t pt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Calculation Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Boiler Materials Quote"
                    value={calculationName}
                    onChange={(e) => setCalculationName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006FEE] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Save to Project
                  </label>
                  <select
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006FEE] focus:border-transparent"
                  >
                    <option value="">Select project...</option>
                    {projects.map(project => (
                      <option key={project.id} value={project.id}>
                        {project.projectRef} - {project.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={saveToProject}
                    disabled={!selectedProject || saving}
                    className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    {saving ? (
                      <Loader className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    {saving ? 'Saving...' : 'Save to Project'}
                  </button>

                  <button
                    onClick={exportAsPDF}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Export PDF Quote
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Calculation Items */}
      {calculationItems.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Calculation Items</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {calculationItems.map((item) => (
              <div key={item.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900">{item.material}</h4>
                        <p className="text-sm text-gray-600">{item.supplier}</p>
                        {item.category && (
                          <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded mt-1">
                            {item.category}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => removeCalculationItem(item.id)}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                      <div>
                        <label className="text-xs text-gray-500">Quantity</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="0.01"
                            step="0.01"
                            value={item.quantity}
                            onChange={(e) => updateItemQuantity(item.id, Number(e.target.value))}
                            className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                          <span className="text-sm text-gray-600">{item.unit}</span>
                        </div>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">Unit Cost</label>
                        <p className="font-medium text-gray-900">{formatCurrency(item.unitCost)}</p>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">Total</label>
                        <p className="font-semibold text-[#006FEE]">{formatCurrency(item.totalCost)}</p>
                      </div>
                      <div className="md:text-right">
                        {item.notes && (
                          <div>
                            <label className="text-xs text-gray-500">Notes</label>
                            <p className="text-sm text-gray-700">{item.notes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {calculationItems.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No materials added yet</h3>
          <p className="text-gray-600 mb-6">Start by selecting materials and adding them to your calculation</p>
        </div>
      )}
    </div>
  )
}