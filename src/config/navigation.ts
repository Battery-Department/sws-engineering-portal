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
  FileSpreadsheet
} from 'lucide-react'

export interface NavigationItem {
  label: string
  href: string
  icon: any
  subItems?: NavigationItem[]
  badge?: string
}

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
      { label: 'Quotes', href: '/portal/projects/quotes', icon: FileText },
      { label: 'Completed', href: '/portal/projects/completed', icon: CheckCircle }
    ]
  },
  {
    label: 'Clients',
    href: '/portal/clients',
    icon: Users
  },
  {
    label: 'Financial',
    href: '/portal/financial',
    icon: PoundSterling,
    subItems: [
      { label: 'Overview', href: '/portal/financial/overview', icon: TrendingUp },
      { label: 'Invoices', href: '/portal/financial/invoices', icon: Receipt },
      { label: 'Costs', href: '/portal/financial/costs', icon: DollarSign }
    ]
  },
  {
    label: 'Materials',
    href: '/portal/materials',
    icon: Package,
    subItems: [
      { label: 'Materials Overview', href: '/portal/materials', icon: Database },
      { label: 'Cost Calculator', href: '/portal/materials/calculator', icon: Calculator },
      { label: 'Upload Invoice', href: '/portal/materials/upload', icon: Upload },
      { label: 'Test Database', href: '/portal/materials/test', icon: Beaker }
    ]
  },
  {
    label: 'New Enquiry',
    href: '/portal/requirements',
    icon: Plus,
    badge: 'Quick'
  }
]

// Customer Portal Navigation
export const CUSTOMER_NAVIGATION: NavigationItem[] = [
  {
    label: 'Dashboard',
    href: '/customer/dashboard',
    icon: LayoutDashboard
  },
  {
    label: 'Documents',
    href: '/customer/documents',
    icon: FileText,
    badge: 'New'
  },
  {
    label: 'Projects',
    href: '/customer/projects',
    icon: Folder
  },
  {
    label: 'Messages',
    href: '/customer/chat',
    icon: MessageSquare
  },
  {
    label: 'Account',
    href: '/customer/account',
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
  { id: 'steam', name: 'Steam Locomotive Restoration', color: '#0066CC' },
  { id: 'cad', name: 'CAD Design Services', color: '#10B981' },
  { id: 'repair', name: 'Plant & Machinery Repair', color: '#F59E0B' },
  { id: 'fabrication', name: 'Custom Fabrication', color: '#8B5CF6' }
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