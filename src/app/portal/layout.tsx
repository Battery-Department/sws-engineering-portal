'use client'

import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { 
  MAIN_NAVIGATION, 
  getActiveParent, 
  getNavigationItem 
} from '@/config/navigation'
import { 
  Menu, 
  X, 
  ChevronDown, 
  Settings, 
  LogOut, 
  Train,
  User
} from 'lucide-react'

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpanded = (href: string) => {
    setExpandedItems(prev => 
      prev.includes(href) 
        ? prev.filter(item => item !== href)
        : [...prev, href]
    )
  }

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/')
  }

  const isExpanded = (href: string) => {
    return expandedItems.includes(href) || pathname.startsWith(href + '/')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-[#006FEE] to-[#0050B3] rounded-lg flex items-center justify-center">
              <Train className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">SWSE Portal</h1>
              <p className="text-xs text-gray-500">Engineering Management</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {MAIN_NAVIGATION.map((item) => {
            const hasSubItems = item.subItems && item.subItems.length > 0
            const itemIsActive = isActive(item.href)
            const itemIsExpanded = hasSubItems && isExpanded(item.href)

            return (
              <div key={item.href}>
                <Link
                  href={hasSubItems ? '#' : item.href}
                  onClick={hasSubItems ? (e) => {
                    e.preventDefault()
                    toggleExpanded(item.href)
                  } : undefined}
                  className={`
                    w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors
                    ${itemIsActive 
                      ? 'bg-[#006FEE] text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  {hasSubItems && (
                    <ChevronDown className={`w-4 h-4 transition-transform ${itemIsExpanded ? 'rotate-180' : ''}`} />
                  )}
                </Link>

                {/* Sub-items */}
                {hasSubItems && itemIsExpanded && (
                  <div className="mt-2 ml-8 space-y-1">
                    {item.subItems!.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className={`
                          block px-3 py-2 rounded-lg text-sm transition-colors
                          ${isActive(subItem.href)
                            ? 'bg-blue-50 text-[#006FEE] font-medium'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          }
                        `}
                      >
                        <div className="flex items-center gap-2">
                          <subItem.icon className="w-4 h-4" />
                          {subItem.label}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Engineering Team</p>
              <p className="text-xs text-gray-500">Cornwall Workshop</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings className="w-4 h-4" />
              Settings
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md hover:bg-gray-100"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {getNavigationItem(pathname)?.label || 'Portal'}
                </h2>
                <p className="text-sm text-gray-500">
                  South West Steam Engineering Management Portal
                </p>
              </div>
            </div>
            
            {/* Quick actions */}
            <div className="flex items-center gap-3">
              <Link
                href="/portal/requirements"
                className="px-4 py-2 bg-[#006FEE] text-white rounded-lg hover:bg-[#0050B3] transition-colors text-sm font-medium"
              >
                New Project
              </Link>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}