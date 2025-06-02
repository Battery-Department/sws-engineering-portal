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
    id: 'locomotive_overhaul',
    name: 'Locomotive Overhaul',
    description: 'Complete mechanical rebuild',
    icon: 'wrench',
    category: 'Heritage Railways'
  },
  {
    id: 'boiler_work',
    name: 'Boiler Restoration',
    description: 'Steam boiler repair & certification',
    icon: 'flame',
    category: 'Heritage Railways'
  },
  {
    id: 'rolling_stock',
    name: 'Rolling Stock Restoration',
    description: 'Carriages, wagons & coaches',
    icon: 'train-car',
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
    id: 'fea_analysis',
    name: 'FEA Analysis',
    description: 'Stress & thermal analysis',
    icon: 'chart-line',
    category: 'Engineering Design'
  },
  {
    id: 'reverse_engineering',
    name: 'Reverse Engineering',
    description: 'Recreate from existing components',
    icon: 'rotate-ccw',
    category: 'Engineering Design'
  },
  {
    id: 'plant_repair',
    name: 'Plant & Machinery Repair',
    description: '​Industrial equipment restoration',
    icon: 'factory',
    category: 'Industrial Services'
  },
  {
    id: 'custom_fabrication',
    name: 'Custom Fabrication',
    description: 'Bespoke engineering solutions',
    icon: 'hammer',
    category: 'Manufacturing'
  },
  {
    id: 'precision_machining',
    name: 'Precision Machining',
    description: 'CNC & manual machining',
    icon: 'gear',
    category: 'Manufacturing'
  },
  {
    id: 'casting_restoration',
    name: 'Casting Restoration',
    description: 'Cast iron & bronze repair',
    icon: 'anvil',
    category: 'Manufacturing'
  },
  {
    id: 'track_infrastructure',
    name: 'Track & Infrastructure',
    description: 'Railway infrastructure projects',
    icon: 'road',
    category: 'Infrastructure'
  }
]

export const URGENCY_OPTIONS = [
  { id: 'emergency', name: 'Emergency', description: 'Urgent repair needed' },
  { id: 'this_season', name: 'This Operating Season', description: 'Ready for railway season' },
  { id: 'this_year', name: 'This Year', description: 'Standard timeline' },
  { id: 'next_year', name: 'Next Year', description: 'Planning ahead' },
  { id: 'flexible', name: 'Flexible', description: 'Quality over speed' }
]

export const BUDGET_RANGES = [
  { id: 'under_5k', name: 'Under £5,000', icon: 'pound-sterling' },
  { id: '5k_15k', name: '£5,000 - £15,000', icon: 'pound-sterling' },
  { id: '15k_35k', name: '£15,000 - £35,000', icon: 'pound-sterling' },
  { id: '35k_75k', name: '£35,000 - £75,000', icon: 'pound-sterling' },
  { id: 'over_75k', name: 'Over £75,000', icon: 'pound-sterling' },
  { id: 'quote_needed', name: 'Need Detailed Quote', icon: 'calculator' }
]

export const MATERIALS = [
  'Cast Iron',
  'Steel', 
  'Stainless Steel',
  'Brass',
  'Bronze',
  'Aluminum',
  'Copper',
  'Mild Steel',
  'Tool Steel',
  'Spring Steel'
]

export const LOCOMOTIVE_GAUGES = [
  '7¼" Gauge',
  '5" Gauge', 
  '3½" Gauge',
  '2½" Gauge',
  '15" Gauge',
  'Standard Gauge',
  'Narrow Gauge',
  'Other Gauge'
]

export const HERITAGE_PERIODS = [
  'Victorian Era (1837-1901)',
  'Edwardian Era (1901-1914)',
  'Inter-War Period (1918-1939)',
  'Post-War Era (1945-1960s)',
  'Modern Heritage (1970s+)',
  'Not Period Specific'
]

export const ADDITIONAL_SERVICES = [
  {
    id: 'cad_modeling',
    name: '3D CAD Modeling',
    description: 'Professional engineering drawings & models'
  },
  {
    id: 'fea_analysis',
    name: 'FEA Analysis', 
    description: 'Stress, thermal & vibration analysis'
  },
  {
    id: 'reverse_engineering',
    name: 'Reverse Engineering',
    description: 'Recreate drawings from existing parts'
  },
  {
    id: 'material_testing',
    name: 'Material Testing',
    description: 'Metallurgical analysis & certification'
  },
  {
    id: 'boiler_inspection',
    name: 'Boiler Inspection',
    description: 'Safety certification & testing'
  },
  {
    id: 'installation',
    name: 'Installation Support',
    description: 'On-site assembly & commissioning'
  },
  {
    id: 'training',
    name: 'Operator Training',
    description: 'Maintenance & operation training'
  },
  {
    id: 'maintenance_contract',
    name: 'Maintenance Contract',
    description: 'Annual service & inspection agreement'
  },
  {
    id: 'spare_parts',
    name: 'Spare Parts Package',
    description: 'Critical spares inventory & supply'
  },
  {
    id: 'documentation',
    name: 'Technical Documentation',
    description: 'Operation manuals & maintenance guides'
  },
  {
    id: 'heritage_research',
    name: 'Heritage Research',
    description: 'Historical accuracy verification'
  },
  {
    id: 'certification',
    name: 'Safety Certification',
    description: 'Regulatory compliance & testing'
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
  return `SWS-${year}-${num}`
}

// Heritage railway specific validation
export const validateHeritageProject = (requirements: any) => {
  if (requirements.projectType?.includes('steam') || requirements.projectType?.includes('locomotive')) {
    return !!(requirements.gauge && requirements.heritagePeriod)
  }
  return true
}

// Industrial project specific validation  
export const validateIndustrialProject = (requirements: any) => {
  if (requirements.projectType?.includes('plant') || requirements.projectType?.includes('industrial')) {
    return !!(requirements.industrySector && requirements.materials)
  }
  return true
}

// Get recommended services based on project type
export const getRecommendedServices = (projectType: string): string[] => {
  const recommendations: Record<string, string[]> = {
    'steam_restoration': ['cad_modeling', 'boiler_inspection', 'heritage_research', 'certification'],
    'locomotive_overhaul': ['fea_analysis', 'material_testing', 'documentation', 'training'],
    'boiler_work': ['boiler_inspection', 'material_testing', 'certification', 'maintenance_contract'],
    'cad_design': ['fea_analysis', 'reverse_engineering', 'documentation'],
    'plant_repair': ['fea_analysis', 'material_testing', 'installation', 'maintenance_contract'],
    'custom_fabrication': ['cad_modeling', 'material_testing', 'installation', 'spare_parts']
  }
  
  return recommendations[projectType] || []
}
