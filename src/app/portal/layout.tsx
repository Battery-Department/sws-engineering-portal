"use client"

import { useState } from 'react'
import Sidebar from '@/components/layout/sidebar'
import Header from '@/components/layout/header'
import { AuthProvider } from '@/contexts/AuthContext'

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <AuthProvider>
      <div className="relative min-h-screen bg-background">
        {/* Mobile sidebar */}
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        
        {/* Desktop sidebar */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64">
          <Sidebar open={true} setOpen={() => {}} />
        </div>
        
        {/* Main content */}
        <div className="lg:pl-64">
          {/* Header */}
          <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
          
          {/* Page content */}
          <main className="p-6 lg:p-8">
            <div className="mx-auto max-w-7xl">
              {children}
            </div>
          </main>
        </div>
      </div>
    </AuthProvider>
  )
}