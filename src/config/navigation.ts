// Comprehensive Navigation for Engineering Portal
import { 
  LayoutDashboard, 
  Folder, 
  Users, 
  PoundSterling, 
  Package, 
  Plus,
  FolderOpen,
  FileText,
  Calculator,
  Upload,
  TrendingUp,
  ClipboardList,
  Clock,
  CheckCircle,
  DollarSign,
  Receipt,
  MessageSquare,
  Settings,
  Beaker,
  Database,
  FileSpreadsheet,
  Train,
  Factory,
  Settings2,
  Wrench,
  Archive,
  Calendar,
  BarChart3,
  Cog,
  Home,
  Info,
  Mail,
  User
} from 'lucide-react'

export interface NavigationItem {
  label: string
  href: string
  icon: any
  subItems?: NavigationItem[]
  badge?: string
  description?: string
  children?: NavigationItem[]
  name?: string
}

// Main public navigation
export const mainNavigation: NavigationItem[] = [
  {
    name: 'Home',
    label: 'Home',
    href: '/',
    icon: Home
  },
  {
    name: 'Engineering Services',
    label: 'Engineering Services',
    href: '/services',
    icon: Cog,
    children: [
      {
        name: 'Heritage Railways',
        label: 'Heritage Railways',
        href: '/services/heritage',
        icon: Train,
        description: 'Steam locomotive restoration & 7¼" gauge specialists'
      },
      {
        name: 'Industrial Engineering',
        label: 'Industrial Engineering',
        href: '/services/industrial',
        icon: Factory,
        description: 'Plant & machinery repair, custom fabrication'
      },
      {
        name: 'CAD Design',
        label: 'CAD Design',
        href: '/services/design',
        icon: Settings2,
        description: '3D modeling, FEA analysis, technical drawings'
      },
      {
        name: 'Manufacturing',
        label: 'Manufacturing',
        href: '/services/manufacturing',
        icon: Wrench,
        description: 'Precision machining, casting restoration'
      }
    ]
  },
  {
    name: 'Project Requirements',
    label: 'Project Requirements',
    href: '/requirements',
    icon: ClipboardList
  },
  {
    name: 'Our Work',
    label: 'Our Work',
    href: '/projects',
    icon: Folder,
    children: [
      {
        name: 'Heritage Projects',
        label: 'Heritage Projects',
        href: '/projects/heritage',
        icon: Train,
        description: 'Steam locomotive restorations'
      },
      {
        name: 'Industrial Projects',
        label: 'Industrial Projects',
        href: '/projects/industrial',
        icon: Factory,
        description: 'Plant & machinery solutions'
      },
      {
        name: 'Case Studies',
        label: 'Case Studies',
        href: '/projects/case-studies',
        icon: FileText,
        description: 'Detailed project breakdowns'
      }
    ]
  },
  {
    name: 'About',
    label: 'About',
    href: '/about',
    icon: Info
  },
  {
    name: 'Contact',
    label: 'Contact',
    href: '/contact',
    icon: Mail
  }
]

// Customer portal navigation
export const customerNavigation: NavigationItem[] = [
  {
    name: 'Dashboard',
    label: 'Dashboard',
    href: '/customer/dashboard',
    icon: LayoutDashboard
  },
  {
    name: 'My Projects',
    label: 'My Projects',
    href: '/customer/projects',
    icon: Folder
  },
  {
    name: 'Engineering Services',
    label: 'Engineering Services',
    href: '/customer/services',
    icon: Cog,
    children: [
      {
        name: 'Heritage Railways',
        label: 'Heritage Railways',
        href: '/customer/services/heritage',
        icon: Train,
        description: 'Steam locomotive restoration services'
      },
      {
        name: 'Industrial Engineering',
        label: 'Industrial Engineering',
        href: '/customer/services/industrial',
        icon: Factory,
        description: 'Plant & machinery solutions'
      },
      {
        name: 'CAD Design Services',
        label: 'CAD Design Services',
        href: '/customer/services/design',
        icon: Settings2,
        description: '3D modeling and technical drawings'
      },
      {
        name: 'Manufacturing',
        label: 'Manufacturing',
        href: '/customer/services/manufacturing',
        icon: Wrench,
        description: 'Custom fabrication and machining'
      }
    ]
  },
  {
    name: 'Project Requirements',
    label: 'Project Requirements',
    href: '/customer/quiz',
    icon: ClipboardList
  },
  {
    name: 'Documents',
    label: 'Documents',
    href: '/customer/documents',
    icon: FileText
  },
  {
    name: 'Invoices',
    label: 'Invoices',
    href: '/customer/invoice',
    icon: Receipt
  },
  {
    name: 'Engineering Chat',
    label: 'Engineering Chat',
    href: '/customer/chat',
    icon: MessageSquare
  },
  {
    name: 'Account',
    label: 'Account',
    href: '/customer/account',
    icon: User
  }
]

// Main portal navigation for engineering team
export const MAIN_NAVIGATION: NavigationItem[] = [
  {
    label: 'Dashboard',
    href: '/portal/dashboard',
    icon: LayoutDashboard
  },
  {
    label: 'Projects',
    href: '/portal/projects',
    icon: Folder,
    subItems: [
      { label: 'Active Projects', href: '/portal/projects/active', icon: Clock },
      { label: 'All Projects', href: '/portal/projects', icon: FolderOpen },
      { label: 'Project Archive', href: '/portal/projects/archive', icon: Archive },
      { label: 'Project Planning', href: '/portal/projects/planning', icon: Calendar }
    ]
  },
  {
    label: 'Clients',
    href: '/portal/clients',
    icon: Users
  },
  {
    label: 'Engineering',
    href: '/portal/engineering',
    icon: Settings2,
    subItems: [
      { label: 'CAD Library', href: '/portal/engineering/cad', icon: FileText },
      { label: 'Materials Database', href: '/portal/materials', icon: Database },
      { label: 'Engineering Calculator', href: '/portal/materials/calculator', icon: Calculator },
      { label: 'Quality Control', href: '/portal/engineering/quality', icon: CheckCircle }
    ]
  },
  {
    label: 'Financial',
    href: '/portal/financial',
    icon: PoundSterling,
    subItems: [
      { label: 'Overview', href: '/portal/financial/overview', icon: TrendingUp },
      { label: 'Project Costing', href: '/portal/financial/costing', icon: Calculator },
      { label: 'Invoices', href: '/portal/financial/invoices', icon: Receipt }
    ]
  },
  {
    label: 'Operations',
    href: '/portal/operations',
    icon: Cog,
    subItems: [
      { label: 'Workshop Management', href: '/portal/operations/workshop', icon: Wrench },
      { label: 'Shipping & Logistics', href: '/portal/shipping', icon: Package },
      { label: 'Inventory', href: '/portal/operations/inventory', icon: Database }
    ]
  },
  {
    label: 'Analytics',
    href: '/portal/analytics',
    icon: BarChart3,
    subItems: [
      { label: 'Project Analytics', href: '/portal/analytics/projects', icon: TrendingUp },
      { label: 'Client Intelligence', href: '/portal/quiz-intelligence', icon: Users },
      { label: 'Performance Metrics', href: '/portal/analytics/performance', icon: BarChart3 }
    ]
  },
  {
    label: 'New Project',
    href: '/portal/requirements',
    icon: Plus,
    badge: 'Quick'
  }
]

// Portal navigation with engineering focus
export const portalNavigation: NavigationItem[] = [
  {
    name: 'Dashboard',
    label: 'Dashboard',
    href: '/portal/dashboard',
    icon: LayoutDashboard
  },
  {
    name: 'Projects',
    label: 'Projects',
    href: '/portal/projects',
    icon: Folder,
    children: [
      {
        name: 'Active Projects',
        label: 'Active Projects',
        href: '/portal/projects/active',
        icon: Clock,
        description: 'Currently in progress'
      },
      {
        name: 'Project Archive',
        label: 'Project Archive',
        href: '/portal/projects/archive',
        icon: Archive,
        description: 'Completed projects'
      },
      {
        name: 'Project Planning',
        label: 'Project Planning',
        href: '/portal/projects/planning',
        icon: Calendar,
        description: 'Upcoming projects'
      }
    ]
  },
  {
    name: 'Engineering',
    label: 'Engineering',
    href: '/portal/engineering',
    icon: Settings2,
    children: [
      {
        name: 'CAD Library',
        label: 'CAD Library',
        href: '/portal/engineering/cad',
        icon: FileText,
        description: 'Design files and drawings'
      },
      {
        name: 'Materials Database',
        label: 'Materials Database',
        href: '/portal/materials',
        icon: Database,
        description: 'Material specifications and inventory'
      },
      {
        name: 'Engineering Calculator',
        label: 'Engineering Calculator',
        href: '/portal/materials/calculator',
        icon: Calculator,
        description: 'Engineering calculations and tools'
      },
      {
        name: 'Quality Control',
        label: 'Quality Control',
        href: '/portal/engineering/quality',
        icon: CheckCircle,
        description: 'QC procedures and testing'
      }
    ]
  },
  {
    name: 'Client Management',
    label: 'Client Management',
    href: '/portal/clients',
    icon: Users,
    children: [
      {
        name: 'Client Database',
        label: 'Client Database',
        href: '/portal/clients',
        icon: Users,
        description: 'Client information and history'
      },
      {
        name: 'Requirements Analysis',
        label: 'Requirements Analysis',
        href: '/portal/quiz-intelligence',
        icon: ClipboardList,
        description: 'Project requirement insights'
      },
      {
        name: 'Communication Hub',
        label: 'Communication Hub',
        href: '/portal/chat',
        icon: MessageSquare,
        description: 'Client communications'
      }
    ]
  },
  {
    name: 'Operations',
    label: 'Operations',
    href: '/portal/operations',
    icon: Cog,
    children: [
      {
        name: 'Workshop Management',
        label: 'Workshop Management',
        href: '/portal/operations/workshop',
        icon: Wrench,
        description: 'Workshop scheduling and resources'
      },
      {
        name: 'Shipping & Logistics',
        label: 'Shipping & Logistics',
        href: '/portal/shipping',
        icon: Package,
        description: 'Project delivery management'
      },
      {
        name: 'Inventory',
        label: 'Inventory',
        href: '/portal/operations/inventory',
        icon: Database,
        description: 'Parts and materials inventory'
      }
    ]
  },
  {
    name: 'Financial',
    label: 'Financial',
    href: '/portal/financial',
    icon: PoundSterling,
    children: [
      {
        name: 'Financial Overview',
        label: 'Financial Overview',
        href: '/portal/financial/overview',
        icon: TrendingUp,
        description: 'Revenue and project profitability'
      },
      {
        name: 'Project Costing',
        label: 'Project Costing',
        href: '/portal/financial/costing',
        icon: Calculator,
        description: 'Project cost analysis'
      },
      {
        name: 'Invoicing',
        label: 'Invoicing',
        href: '/portal/financial/invoicing',
        icon: Receipt,
        description: 'Client billing and payments'
      }
    ]
  },
  {
    name: 'Analytics',
    label: 'Analytics',
    href: '/portal/analytics',
    icon: BarChart3
  },
  {
    name: 'Settings',
    label: 'Settings',
    href: '/portal/settings',
    icon: Settings
  }
]

// Helper function to get navigation item by href
export const getNavigationItem = (href: string): NavigationItem | undefined => {
  for (const item of MAIN_NAVIGATION) {
    if (item.href === href) return item
    if (item.subItems) {
      const subItem = item.subItems.find(sub => sub.href === href)
      if (subItem) return subItem
    }
  }
  return undefined
}

// Helper function to get active parent for nested routes
export const getActiveParent = (currentPath: string): NavigationItem | undefined => {
  for (const item of MAIN_NAVIGATION) {
    if (item.subItems) {
      const hasActiveChild = item.subItems.some(sub => currentPath.startsWith(sub.href))
      if (hasActiveChild) return item
    }
  }
  return undefined
}

// Helper function to get navigation items by role
export const getNavigationByRole = (role: 'customer' | 'portal' | 'main') => {
  switch (role) {
    case 'customer':
      return customerNavigation
    case 'portal':
      return portalNavigation
    default:
      return mainNavigation
  }
}

// Helper function to find navigation item by href
export const findNavigationItem = (href: string, navigation: NavigationItem[]): NavigationItem | null => {
  for (const item of navigation) {
    if (item.href === href) {
      return item
    }
    if (item.children) {
      const found = findNavigationItem(href, item.children)
      if (found) return found
    }
  }
  return null
}

// Common project stages for consistent use across the app
export const PROJECT_STAGES = [
  { id: 'initial_contact', name: 'Initial Contact', order: 1 },
  { id: 'site_visit', name: 'Site Visit/Assessment', order: 2 },
  { id: 'quote_sent', name: 'Quote Sent', order: 3 },
  { id: 'quote_approved', name: 'Quote Approved', order: 4 },
  { id: 'design_phase', name: 'Design Phase', order: 5 },
  { id: 'materials_ordered', name: 'Materials Ordered', order: 6 },
  { id: 'manufacturing', name: 'Manufacturing', order: 7 },
  { id: 'quality_check', name: 'Quality Check', order: 8 },
  { id: 'delivery_installation', name: 'Delivery/Installation', order: 9 },
  { id: 'project_complete', name: 'Project Complete', order: 10 },
  { id: 'invoice_sent', name: 'Invoice Sent', order: 11 },
  { id: 'payment_received', name: 'Payment Received', order: 12 }
]

// Service types for consistent use
export const SERVICE_TYPES = [
  { id: 'heritage', name: 'Heritage Railway Restoration', color: '#0066CC' },
  { id: 'industrial', name: 'Industrial Engineering', color: '#10B981' },
  { id: 'cad', name: 'CAD Design Services', color: '#F59E0B' },
  { id: 'manufacturing', name: 'Custom Manufacturing', color: '#8B5CF6' }
]

// Status options for projects
export const PROJECT_STATUS = [
  { id: 'enquiry', name: 'Enquiry', color: '#6B7280' },
  { id: 'quoted', name: 'Quoted', color: '#3B82F6' },
  { id: 'approved', name: 'Approved', color: '#10B981' },
  { id: 'in_progress', name: 'In Progress', color: '#F59E0B' },
  { id: 'completed', name: 'Completed', color: '#059669' },
  { id: 'on_hold', name: 'On Hold', color: '#EF4444' }
]

// Priority levels
export const PRIORITY_LEVELS = [
  { id: 'urgent', name: 'Urgent', color: '#EF4444' },
  { id: 'normal', name: 'Normal', color: '#6B7280' },
  { id: 'low', name: 'Low', color: '#9CA3AF' }
]

// Additional export for customer navigation
export const CUSTOMER_NAVIGATION = customerNavigation
