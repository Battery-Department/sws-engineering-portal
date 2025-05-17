'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import {
  Package,
  ShoppingCart,
  Heart,
  Home,
  User,
  MessageCircle,
  LogOut,
  Menu,
  X,
  CreditCard
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/customer/dashboard', icon: Home },
  { name: 'Products', href: '/customer/products', icon: Package },
  { name: 'Orders', href: '/customer/orders', icon: ShoppingCart },
  { name: 'Favorites', href: '/customer/favorites', icon: Heart },
  { name: 'Payment', href: '/customer/payment', icon: CreditCard },
  { name: 'Chat with Lithi', href: '/customer/chat', icon: MessageCircle },
]

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('customerToken')
    if (!token && !pathname.includes('/auth') && !pathname.includes('/products')) {
      router.push('/customer/auth/login')
    } else if (token) {
      setIsAuthenticated(true)
    }
  }, [pathname, router])

  const handleSignOut = () => {
    localStorage.removeItem('customerToken')
    localStorage.removeItem('customerUser')
    router.push('/customer/auth/login')
  }

  // Don't show navigation on auth pages
  if (pathname.includes('/auth')) {
    return <>{children}</>
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Mobile menu */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        width: '256px',
        backgroundColor: '#1f2937',
        transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s ease',
        zIndex: 40,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: isSidebarOpen ? '4px 0 6px rgba(0,0,0,0.1)' : 'none'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px',
          borderBottom: '1px solid #374151'
        }}>
          <h2 style={{ 
            fontSize: '24px', 
            fontWeight: 'bold',
            color: 'white'
          }}>Battery Hub</h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            style={{
              padding: '6px',
              borderRadius: '6px',
              color: 'white',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <X size={24} />
          </button>
        </div>
        
        <nav style={{ flex: 1, padding: '8px' }}>
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => {
                e.preventDefault()
                router.push(item.href)
                setIsSidebarOpen(false)
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px 16px',
                margin: '2px 0',
                borderRadius: '8px',
                textDecoration: 'none',
                color: pathname === item.href ? 'white' : '#d1d5db',
                backgroundColor: pathname === item.href ? '#111827' : 'transparent',
                transition: 'all 0.2s'
              }}
            >
              <item.icon size={20} style={{ marginRight: '12px' }} />
              {item.name}
            </a>
          ))}
        </nav>

        {isAuthenticated && (
          <div style={{ 
            padding: '16px', 
            borderTop: '1px solid #374151' 
          }}>
            <button
              onClick={handleSignOut}
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                padding: '8px 16px',
                borderRadius: '8px',
                color: '#d1d5db',
                backgroundColor: 'transparent',
                border: 'none',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <LogOut size={20} style={{ marginRight: '12px' }} />
              Sign out
            </button>
          </div>
        )}
      </div>

      {/* Desktop sidebar */}
      <div style={{
        width: '256px',
        backgroundColor: '#1f2937',
        borderRight: '1px solid #374151',
        display: 'none',
        flexDirection: 'column'
      }} className="desktop-sidebar">
        <div style={{
          padding: '20px',
          borderBottom: '1px solid #374151'
        }}>
          <h1 style={{ 
            fontSize: '24px', 
            fontWeight: 'bold',
            color: 'white'
          }}>Battery Hub</h1>
        </div>
        
        <nav style={{ flex: 1, padding: '8px' }}>
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => {
                e.preventDefault()
                router.push(item.href)
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px 16px',
                margin: '2px 0',
                borderRadius: '8px',
                textDecoration: 'none',
                color: pathname === item.href ? 'white' : '#d1d5db',
                backgroundColor: pathname === item.href ? '#111827' : 'transparent',
                transition: 'all 0.2s'
              }}
            >
              <item.icon size={20} style={{ marginRight: '12px' }} />
              {item.name}
            </a>
          ))}
        </nav>

        {isAuthenticated && (
          <div style={{ 
            padding: '16px', 
            borderTop: '1px solid #374151' 
          }}>
            <button
              onClick={handleSignOut}
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                padding: '8px 16px',
                borderRadius: '8px',
                color: '#d1d5db',
                backgroundColor: 'transparent',
                border: 'none',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <LogOut size={20} style={{ marginRight: '12px' }} />
              Sign out
            </button>
          </div>
        )}
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Mobile header */}
        <header style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 24px',
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
        }} className="mobile-header">
          <button
            onClick={() => setIsSidebarOpen(true)}
            style={{
              padding: '8px',
              borderRadius: '8px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#374151'
            }}
          >
            <Menu size={24} />
          </button>
          <h1 style={{ 
            fontSize: '24px', 
            fontWeight: '600',
            color: '#111827'
          }}>Battery Hub</h1>
          <div style={{ width: '40px' }}></div>
        </header>

        {/* Page content */}
        <main style={{ 
          flex: 1, 
          overflowY: 'auto',
          backgroundColor: '#f9fafb'
        }}>
          {children}
        </main>
      </div>

      {/* Mobile menu overlay */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 30
          }}
        />
      )}

      {/* Desktop styles */}
      <style jsx>{`
        @media (min-width: 768px) {
          .desktop-sidebar {
            display: flex !important;
          }
          .mobile-header {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}