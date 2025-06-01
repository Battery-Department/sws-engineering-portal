// Engineering Requirements Configuration

export interface ProjectStep {
  id: string
  title: string
  description: string
  icon: string
}

export interface ProjectType {
  id: string
  name: string
  description: string
  icon: string
  category: string
}

export const PROJECT_STEPS: ProjectStep[] = [
  {
    id: 'project-info',
    title: 'Project Information',
    description: 'Basic project details and requirements',
    icon: 'train'
  },
  {
    id: 'technical-requirements',
    title: 'Technical Requirements',
    description: 'Specifications and documentation',
    icon: 'cog'
  },
  {
    id: 'additional-services',
    title: 'Additional Services',
    description: 'Extra engineering services',
    icon: 'package'
  }
]

export const PROJECT_TYPES: ProjectType[] = [
  {
    id: 'steam_restoration',
    name: 'Steam Locomotive Restoration',
    description: '7¼" gauge specialists',
    icon: 'train',
    category: 'Heritage Railways'
  },
  {
    id: 'cad_design',
    name: '3D CAD Design Services',
    description: 'SolidWorks & AutoCAD',
    icon: 'settings',
    category: 'Engineering Design'
  },
  {
    id: 'plant_repair',
    name: 'Plant & Machinery Repair',
    description: 'Industrial equipment',
    icon: 'factory',
    category: 'Industrial Services'
  },
  {
    id: 'custom_fabrication',
    name: 'Custom Fabrication',
    description: 'Bespoke engineering',
    icon: 'wrench',
    category: 'Manufacturing'
  }
]

export const URGENCY_OPTIONS = [
  { id: 'asap', name: 'ASAP', description: 'Emergency/Urgent' },
  { id: 'this_month', name: 'This Month', description: 'Standard timeline' },
  { id: 'next_quarter', name: 'Next Quarter', description: 'Planning ahead' },
  { id: 'flexible', name: 'Flexible', description: 'Open timeline' }
]

export const BUDGET_RANGES = [
  { id: 'under_10k', name: 'Under £10,000', icon: 'pound-sterling' },
  { id: '10k_25k', name: '£10,000 - £25,000', icon: 'pound-sterling' },
  { id: '25k_50k', name: '£25,000 - £50,000', icon: 'pound-sterling' },
  { id: 'over_50k', name: 'Over £50,000', icon: 'pound-sterling' },
  { id: 'quote_needed', name: 'Need Quote', icon: 'calculator' }
]

export const MATERIALS = [
  'Cast Iron',
  'Steel', 
  'Brass',
  'Bronze',
  'Aluminum',
  'Stainless Steel'
]

export const ADDITIONAL_SERVICES = [
  {
    id: 'cad_modeling',
    name: '3D CAD Modeling',
    description: 'Professional engineering drawings'
  },
  {
    id: 'fea_analysis',
    name: 'FEA Analysis', 
    description: 'Stress & thermal analysis'
  },
  {
    id: 'installation',
    name: 'Installation Support',
    description: 'On-site setup assistance'
  },
  {
    id: 'training',
    name: 'Operator Training',
    description: 'Comprehensive training program'
  },
  {
    id: 'maintenance_contract',
    name: 'Maintenance Contract',
    description: 'Annual service agreement'
  },
  {
    id: 'spare_parts',
    name: 'Spare Parts Package',
    description: 'Critical spares inventory'
  }
]

// Helper functions for engineering requirements
export const validateProjectInfo = (requirements: any) => {
  return !!(requirements.projectType && 
           requirements.projectName && 
           requirements.urgency && 
           requirements.budget)
}

export const validateTechnicalRequirements = (requirements: any) => {
  return !!(requirements.description && 
           requirements.technicalSpecs?.specifications)
}

export const validateAdditionalServices = (requirements: any) => {
  return true // Additional services are optional
}

export const generateProjectId = () => {
  const year = new Date().getFullYear()
  const num = String(Math.floor(Math.random() * 1000)).padStart(3, '0')
  return `PROJ-${year}-${num}`
}

