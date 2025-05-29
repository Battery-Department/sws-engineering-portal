'use client'

import React, { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import {
  Home,
  BarChart3,
  Package,
  ShoppingCart,
  DollarSign,
  Truck,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Users,
  Brain
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dealer-portal/dashboard', icon: Home },
  { name: 'CRM', href: '/dealer-portal/crm', icon: Users },
  { name: 'Analytics', href: '/dealer-portal/analytics', icon: BarChart3 },
  { name: 'Orders', href: '/dealer-portal/orders', icon: ShoppingCart },
  { name: 'Inventory', href: '/dealer-portal/inventory', icon: Package },
  { name: 'Billing', href: '/dealer-portal/billing', icon: DollarSign },
  { name: 'Shipping', href: '/dealer-portal/shipping', icon: Truck },
  { name: 'Settings', href: '/dealer-portal/settings', icon: Settings },
]

export default function DealerPortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-40 flex lg:hidden ${
          sidebarOpen ? '' : 'hidden'
        }`}
      >
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={() => setSidebarOpen(false)}
        />
        <div className="relative flex w-full max-w-xs flex-1 flex-col bg-gray-900">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              onClick={() => setSidebarOpen(false)}
              className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center px-4">
              <h1 className="text-2xl font-bold text-white">Lithi AI</h1>
            </div>
            <nav className="mt-8 space-y-1 px-2">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    router.push(item.href)
                    setSidebarOpen(false)
                  }}
                  className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                    pathname === item.href
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <item.icon className="mr-4 h-6 w-6 flex-shrink-0" />
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-grow flex-col overflow-y-auto bg-gray-900">
          <div className="flex flex-shrink-0 items-center px-6 py-5">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Brain className="h-8 w-8 text-[#006FEE]" />
              Lithi AI
            </h1>
          </div>
          <nav className="mt-5 flex-1 space-y-1 bg-gray-900 px-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  router.push(item.href)
                }}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                  pathname === item.href
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                {item.name}
              </a>
            ))}
          </nav>
          <div className="flex flex-shrink-0 border-t border-gray-800 p-4">
            <button
              onClick={() => router.push('/portal/auth/login')}
              className="group flex w-full items-center px-2 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Sign out
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col lg:pl-64">
        {/* Top Bar */}
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
          <button
            onClick={() => setSidebarOpen(true)}
            className="px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#006FEE] lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex flex-1 justify-between px-4 lg:px-8">
            <div className="flex flex-1">
              {/* You can add search or other elements here */}
            </div>
            <div className="ml-4 flex items-center lg:ml-6">
              <button className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#006FEE] focus:ring-offset-2">
                <Bell className="h-6 w-6" />
              </button>
              <div className="ml-3 relative">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-[#006FEE] flex items-center justify-center text-white font-medium">
                    D
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}