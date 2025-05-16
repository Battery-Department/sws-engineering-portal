import type { Metadata } from 'next'
import { Sidebar } from '@/components/layout/sidebar'
import { Header } from '@/components/layout/header'
import { AuthProvider } from '@/contexts/AuthContext'

export const metadata: Metadata = {
  title: 'Battery Department Customer Portal',
  description: 'Manage your orders, subscriptions, and chat with Lithi AI',
}

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <div className="relative min-h-screen bg-background">
        {/* Mobile header */}
        <div className="lg:hidden">
          <Header />
        </div>
        
        {/* Desktop sidebar */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64">
          <Sidebar />
        </div>
        
        {/* Main content */}
        <div className="lg:pl-64">
          {/* Desktop header */}
          <div className="hidden lg:block">
            <Header />
          </div>
          
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