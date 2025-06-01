'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle,
  AlertCircle,
  Train,
  Cog,
  Factory,
  Calendar,
  DollarSign,
  Upload,
  FileText,
  Wrench,
  Package,
  Gauge,
  Settings,
  Target,
  Timer,
  Activity,
  BookOpen,
  Shield,
  HelpCircle,
  PoundSterling,
  X
} from 'lucide-react'

import { 
  PROJECT_TYPES, 
  URGENCY_OPTIONS, 
  BUDGET_RANGES, 
  ADDITIONAL_SERVICES,
  MATERIALS,
  validateProjectInfo,
  validateTechnicalRequirements,
  validateAdditionalServices,
  generateProjectId
} from '@/config/requirements-config'

interface ProjectRequirement {
  id: string
  projectType: string
  projectName: string
  urgency: string
  budget: string
  description: string
  technicalSpecs: {
    drawings: File[]
    specifications: string
    materials: string[]
    dimensions: string
  }
  additionalServices: string[]
  contactInfo: {
    name: string
    email: string
    phone: string
    company: string
  }
}

interface RequirementsWizardProps {
  onComplete?: (requirements: ProjectRequirement) => void
}

export default function RequirementsWizard({ onComplete }: RequirementsWizardProps) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [requirements, setRequirements] = useState<Partial<ProjectRequirement>>({
    projectType: '',
    projectName: '',
    urgency: '',
    budget: '',
    description: '',
    technicalSpecs: {
      drawings: [],
      specifications: '',
      materials: [],
      dimensions: ''
    },
    additionalServices: [],
    contactInfo: {
      name: '',
      email: '',
      phone: '',
      company: ''
    }
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const steps = [
    { id: 'project-info', title: 'Project Information', icon: <Train className="w-5 h-5" /> },
    { id: 'technical-requirements', title: 'Technical Requirements', icon: <Cog className="w-5 h-5" /> },
    { id: 'additional-services', title: 'Additional Services', icon: <Package className="w-5 h-5" /> }
  ]
  
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'train': return <Train className="w-6 h-6" />
      case 'settings': return <Settings className="w-6 h-6" />
      case 'factory': return <Factory className="w-6 h-6" />
      case 'wrench': return <Wrench className="w-6 h-6" />
      case 'pound-sterling': return <PoundSterling className="w-5 h-5" />
      case 'calculator': return <Calculator className="w-5 h-5" />
      default: return <Cog className="w-6 h-6" />
    }
  }
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newFiles = Array.from(files)
      setUploadedFiles([...uploadedFiles, ...newFiles])
      setRequirements(prev => ({
        ...prev,
        technicalSpecs: {
          ...prev.technicalSpecs!,
          drawings: [...(prev.technicalSpecs?.drawings || []), ...newFiles]
        }
      }))
    }
  }
  
  const removeFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index)
    setUploadedFiles(newFiles)
    setRequirements(prev => ({
      ...prev,
      technicalSpecs: {
        ...prev.technicalSpecs!,
        drawings: newFiles
      }
    }))
  }
  
  const toggleMaterial = (material: string) => {
    setRequirements(prev => {
      const currentMaterials = prev.technicalSpecs?.materials || []
      const newMaterials = currentMaterials.includes(material)
        ? currentMaterials.filter(m => m !== material)
        : [...currentMaterials, material]
      
      return {
        ...prev,
        technicalSpecs: {
          ...prev.technicalSpecs!,
          materials: newMaterials
        }
      }
    })
  }
  
  const toggleService = (serviceId: string) => {
    setRequirements(prev => {
      const currentServices = prev.additionalServices || []
      const newServices = currentServices.includes(serviceId)
        ? currentServices.filter(s => s !== serviceId)
        : [...currentServices, serviceId]
      
      return {
        ...prev,
        additionalServices: newServices
      }
    })
  }
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }
  
  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    try {
      // Generate a unique project ID
      const projectId = generateProjectId()
      
      const completeRequirements: ProjectRequirement = {
        id: projectId,
        ...requirements as ProjectRequirement
      }
      
      // Submit to API
      const response = await fetch('/api/requirements/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(completeRequirements)
      })
      
      if (response.ok) {
        if (onComplete) {
          onComplete(completeRequirements)
        } else {
          router.push(`/customer/projects/${projectId}`)
        }
      }
    } catch (error) {
      console.error('Failed to submit requirements:', error)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return validateProjectInfo(requirements)
      case 1:
        return validateTechnicalRequirements(requirements)
      case 2:
        return validateAdditionalServices(requirements)
      default:
        return false
    }
  }
  
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            {/* Project Type Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">What type of project do you need?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PROJECT_TYPES.map((type) => (
                  <motion.button
                    key={type.id}
                    onClick={() => setRequirements({ ...requirements, projectType: type.id })}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-left
                      ${requirements.projectType === type.id
                        ? 'border-[#006FEE] bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-25'
                      }
                    `}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        requirements.projectType === type.id ? 'bg-[#006FEE] text-white' : 'bg-gray-100'
                      }`}>
                        {getIconComponent(type.icon)}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{type.name}</div>
                        <div className="text-sm text-gray-600">{type.description}</div>
                      </div>
                      {requirements.projectType === type.id && (
                        <CheckCircle className="w-5 h-5 text-[#006FEE]" />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
            
            {/* Project Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Name
              </label>
              <input
                type="text"
                value={requirements.projectName || ''}
                onChange={(e) => setRequirements({ ...requirements, projectName: e.target.value })}
                placeholder="e.g., Bodmin Railway Locomotive #7"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#006FEE] focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all"
              />
            </div>
            
            {/* Urgency */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">When do you need this completed?</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {URGENCY_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setRequirements({ ...requirements, urgency: option.id })}
                    className={`p-3 rounded-lg border-2 transition-all duration-200
                      ${requirements.urgency === option.id
                        ? 'border-[#006FEE] bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-blue-300'
                      }
                    `}
                  >
                    <div className="font-medium text-gray-900">{option.name}</div>
                    <div className="text-xs text-gray-600">{option.description}</div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Budget Range */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">What's your budget range?</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {BUDGET_RANGES.map((range) => (
                  <button
                    key={range.id}
                    onClick={() => setRequirements({ ...requirements, budget: range.id })}
                    className={`p-4 rounded-lg border-2 transition-all duration-200
                      ${requirements.budget === range.id
                        ? 'border-[#006FEE] bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-blue-300'
                      }
                    `}
                  >
                    <div className="flex items-center justify-center gap-2">
                      {getIconComponent(range.icon)}
                      <span className="font-medium text-gray-900">{range.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )
  
      case 1:
        return (
          <div className="space-y-6">
            {/* Technical Specifications Upload */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Technical Drawings & Specifications</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-[#006FEE] transition-colors">
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.dwg,.dxf,.step,.stp,.iges,.igs,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="mx-auto flex flex-col items-center justify-center text-gray-600 hover:text-[#006FEE] transition-colors"
                >
                  <Upload className="w-12 h-12 mb-2" />
                  <span className="font-medium">Click to upload files</span>
                  <span className="text-sm text-gray-500 mt-1">PDF, DWG, DXF, STEP, Images accepted</span>
                </button>
              </div>
              
              {/* Uploaded Files List */}
              {uploadedFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700">{file.name}</span>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Project Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Description
              </label>
              <textarea
                value={requirements.description || ''}
                onChange={(e) => setRequirements({ ...requirements, description: e.target.value })}
                placeholder="Please describe your project requirements, specifications, and any special considerations..."
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#006FEE] focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all resize-none"
              />
            </div>
            
            {/* Technical Specifications */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Technical Specifications
              </label>
              <textarea
                value={requirements.technicalSpecs?.specifications || ''}
                onChange={(e) => setRequirements({
                  ...requirements,
                  technicalSpecs: {
                    ...requirements.technicalSpecs!,
                    specifications: e.target.value
                  }
                })}
                placeholder="List specific technical requirements, tolerances, standards to meet, etc."
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#006FEE] focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all resize-none"
              />
            </div>
            
            {/* Materials */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferred Materials</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {MATERIALS.map((material) => {
                  const isSelected = requirements.technicalSpecs?.materials?.includes(material)
                  return (
                    <button
                      key={material}
                      onClick={() => toggleMaterial(material)}
                      className={`p-3 rounded-lg border-2 transition-all duration-200
                        ${isSelected
                          ? 'border-[#006FEE] bg-blue-50'
                          : 'border-gray-200 bg-white hover:border-blue-300'
                        }
                      `}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center
                          ${isSelected ? 'border-[#006FEE] bg-[#006FEE]' : 'border-gray-300'}
                        `}>
                          {isSelected && <CheckCircle className="w-3 h-3 text-white" />}
                        </div>
                        <span className="font-medium text-gray-900">{material}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
            
            {/* Dimensions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Key Dimensions (if applicable)
              </label>
              <input
                type="text"
                value={requirements.technicalSpecs?.dimensions || ''}
                onChange={(e) => setRequirements({
                  ...requirements,
                  technicalSpecs: {
                    ...requirements.technicalSpecs!,
                    dimensions: e.target.value
                  }
                })}
                placeholder="e.g., 2500mm x 1200mm x 800mm"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#006FEE] focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all"
              />
            </div>
          </div>
        )
        
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Additional Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ADDITIONAL_SERVICES.map((service) => {
                const isSelected = requirements.additionalServices?.includes(service.id)
                return (
                  <motion.button
                    key={service.id}
                    onClick={() => toggleService(service.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-left
                      ${isSelected
                        ? 'border-[#006FEE] bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-blue-300'
                      }
                    `}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0
                        ${isSelected ? 'border-[#006FEE] bg-[#006FEE]' : 'border-gray-300'}
                      `}>
                        {isSelected && <CheckCircle className="w-3 h-3 text-white" />}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{service.name}</div>
                        <div className="text-sm text-gray-600">{service.description}</div>
                      </div>
                    </div>
                  </motion.button>
                )
              })}
            </div>
            
            <div className="bg-blue-50 p-4 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#006FEE] flex-shrink-0 mt-0.5" />
              <div className="text-sm text-gray-700">
                <p className="font-medium mb-1">Not sure what you need?</p>
                <p>Don't worry! Our engineering team will review your requirements and recommend the best services for your project.</p>
              </div>
            </div>
          </div>
        )
        
      default:
        return null
    }
  }
  
  const progressPercentage = ((currentStep + 1) / steps.length) * 100
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-25">
      {/* Header with progress */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="px-4 py-4">
          {/* Progress Bar */}
          <div className="flex items-center gap-4 mb-3">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`
                p-2 rounded-full transition-all
                ${currentStep === 0 
                  ? 'opacity-30 cursor-not-allowed' 
                  : 'hover:bg-blue-50 active:scale-95'
                }
              `}
            >
              <ChevronLeft className="w-5 h-5 text-[#006FEE]" />
            </button>
            
            <div className="flex-1">
              <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-[#006FEE] to-[#0050B3] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>
            
            <span className="text-sm font-medium text-[#006FEE] min-w-[3rem] text-right">
              {currentStep + 1}/{steps.length}
            </span>
          </div>
          
          {/* Steps Navigation */}
          <div className="flex justify-center gap-1">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all
                  ${index === currentStep
                    ? 'bg-[#006FEE] text-white'
                    : index < currentStep
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-500'
                  }
                `}
              >
                {step.icon}
                <span className="hidden md:inline font-medium">{step.title}</span>
              </div>
            ))}
          </div>
          
          {/* Branding */}
          <div className="flex items-center justify-center gap-2 text-sm text-[#006FEE] mt-3">
            <Train className="w-4 h-4" />
            <span className="font-semibold">South West Steam Engineering</span>
            <span className="text-gray-400">•</span>
            <span>Project Requirements Wizard</span>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="px-4 py-8 max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Step Header */}
            <div className="text-center space-y-3">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                {steps[currentStep].title}
              </h1>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                {currentStep === 0 && "Let's start with the basics about your engineering project"}
                {currentStep === 1 && "Provide technical details and upload any relevant documentation"}
                {currentStep === 2 && "Choose additional services to enhance your project"}
              </p>
            </div>
            
            {/* Step Content */}
            <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 md:p-8 shadow-sm">
              {renderStep()}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
      
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`
              px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2
              ${currentStep === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:scale-[0.98]'
              }
            `}
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>
          
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Step {currentStep + 1} of {steps.length}
            </p>
          </div>
          
          <button
            onClick={handleNext}
            disabled={!isStepValid()}
            className={`
              px-6 py-3 rounded-xl font-semibold text-white transition-all duration-200 flex items-center gap-2
              ${isStepValid()
                ? 'bg-gradient-to-r from-[#006FEE] to-[#0050B3] hover:shadow-lg active:scale-[0.98]'
                : 'bg-gray-300 cursor-not-allowed'
              }
            `}
          >
            {currentStep === steps.length - 1 ? (
              isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Request'
              )
            ) : (
              <>
                Next
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}