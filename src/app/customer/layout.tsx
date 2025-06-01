'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import {
  FileText,
  Home,
  User,
  MessageCircle,
  LogOut,
  Menu,
  X,
  Bell,
  Settings,
  Train,
  Folder
} from 'lucide-react'
import { CUSTOMER_NAVIGATION } from '@/config/navigation'

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
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#F8FAFC' }}>
      {/* Mobile menu */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        width: '260px',
        background: 'white',
        borderRight: '1px solid #E5E7EB',
        transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s ease',
        zIndex: 40,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: isSidebarOpen ? '4px 0 16px rgba(0, 0, 0, 0.1)' : 'none'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '24px',
          borderBottom: '1px solid #E5E7EB'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(to right, #006FEE, #0050B3)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0, 111, 238, 0.3)'
            }}>
              <Train size={24} color="white" />
            </div>
            <div>
              <h2 style={{ 
                fontSize: '16px', 
                fontWeight: '700',
                color: '#111827'
              }}>SWSE Customer Portal</h2>
              <p style={{
                fontSize: '12px',
                color: '#6B7280'
              }}>South West Steam Engineering</p>
            </div>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            style={{
              padding: '8px',
              borderRadius: '8px',
              color: '#374151',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <X size={20} />
          </button>
        </div>
        
        <nav style={{ flex: 1, padding: '12px' }}>
          {CUSTOMER_NAVIGATION.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                e.preventDefault()
                router.push(item.href)
                setIsSidebarOpen(false)
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px 16px',
                margin: '4px 0',
                borderRadius: '8px',
                textDecoration: 'none',
                color: pathname === item.href ? '#006FEE' : '#374151',
                backgroundColor: pathname === item.href ? '#E6F4FF' : 'transparent',
                transition: 'all 0.2s',
                fontSize: '14px',
                fontWeight: pathname === item.href ? '600' : '500',
                border: '1px solid transparent'
              }}
              onMouseEnter={(e) => {
                if (pathname !== item.href) {
                  e.currentTarget.style.backgroundColor = '#F3F4F6'
                }
              }}
              onMouseLeave={(e) => {
                if (pathname !== item.href) {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }
              }}
            >
              <item.icon size={20} style={{ marginRight: '12px' }} />
              <span>{item.label}</span>
              {item.badge && (
                <span style={{
                  marginLeft: 'auto',
                  padding: '2px 8px',
                  fontSize: '11px',
                  fontWeight: '600',
                  backgroundColor: '#10B981',
                  color: 'white',
                  borderRadius: '12px'
                }}>
                  {item.badge}
                </span>
              )}
            </a>
          ))}
        </nav>

        {isAuthenticated && (
          <div style={{ 
            padding: '16px', 
            borderTop: '1px solid rgba(0, 111, 238, 0.1)'
          }}>
            <button
              onClick={handleSignOut}
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                padding: '12px 16px',
                borderRadius: '10px',
                color: '#5B9FFF',
                backgroundColor: 'transparent',
                border: '1px solid transparent',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 111, 238, 0.04)'
                e.currentTarget.style.borderColor = 'rgba(0, 111, 238, 0.08)'
                e.currentTarget.style.color = '#006FEE'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.borderColor = 'transparent'
                e.currentTarget.style.color = '#5B9FFF'
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
        width: '260px',
        background: 'white',
        borderRight: '1px solid #E5E7EB',
        display: 'none',
        flexDirection: 'column',
        boxShadow: '2px 0 8px rgba(0, 0, 0, 0.05)'
      }} className="desktop-sidebar">
        <div style={{
          padding: '24px',
          borderBottom: '1px solid #E5E7EB'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              background: 'linear-gradient(to right, #006FEE, #0050B3)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0, 111, 238, 0.3)'
            }}>
              <Train size={28} color="white" />
            </div>
            <div>
              <h1 style={{ 
                fontSize: '18px', 
                fontWeight: '700',
                color: '#111827',
                marginBottom: '4px'
              }}>South West Steam</h1>
              <p style={{
                fontSize: '13px',
                color: '#6B7280',
                fontWeight: '500'
              }}>Customer Portal</p>
            </div>
          </div>
        </div>
        
        <nav style={{ flex: 1, padding: '12px' }}>
          {CUSTOMER_NAVIGATION.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                e.preventDefault()
                router.push(item.href)
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px 16px',
                margin: '4px 0',
                borderRadius: '8px',
                textDecoration: 'none',
                color: pathname === item.href ? '#006FEE' : '#374151',
                backgroundColor: pathname === item.href ? '#E6F4FF' : 'transparent',
                transition: 'all 0.2s',
                fontSize: '14px',
                fontWeight: pathname === item.href ? '600' : '500'
              }}
              onMouseEnter={(e) => {
                if (pathname !== item.href) {
                  e.currentTarget.style.backgroundColor = '#F3F4F6'
                }
              }}
              onMouseLeave={(e) => {
                if (pathname !== item.href) {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }
              }}
            >
              <item.icon size={20} style={{ marginRight: '12px' }} />
              <span>{item.label}</span>
              {item.badge && (
                <span style={{
                  marginLeft: 'auto',
                  padding: '2px 8px',
                  fontSize: '11px',
                  fontWeight: '600',
                  backgroundColor: '#10B981',
                  color: 'white',
                  borderRadius: '12px'
                }}>
                  {item.badge}
                </span>
              )}
            </a>
          ))}
        </nav>

        {isAuthenticated && (
          <div style={{ 
            padding: '16px', 
            borderTop: '1px solid rgba(0, 111, 238, 0.1)'
          }}>
            <button
              onClick={handleSignOut}
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                padding: '12px 16px',
                borderRadius: '10px',
                color: '#5B9FFF',
                backgroundColor: 'transparent',
                border: '1px solid transparent',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 111, 238, 0.04)'
                e.currentTarget.style.borderColor = 'rgba(0, 111, 238, 0.08)'
                e.currentTarget.style.color = '#006FEE'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.borderColor = 'transparent'
                e.currentTarget.style.color = '#5B9FFF'
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
          borderBottom: '1px solid #E5E7EB',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
        }} className="mobile-header">
          <button
            onClick={() => setIsSidebarOpen(true)}
            style={{
              padding: '8px',
              borderRadius: '8px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#374151',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Menu size={24} />
          </button>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              background: 'linear-gradient(to right, #006FEE, #0050B3)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Train size={20} color="white" />
            </div>
            <h1 style={{ 
              fontSize: '18px', 
              fontWeight: '700',
              color: '#111827'
            }}>SWSE Portal</h1>
          </div>
          <button
            onClick={() => router.push('/customer/notifications')}
            style={{
              position: 'relative',
              padding: '8px',
              borderRadius: '8px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#003D88',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Bell size={20} />
            <span style={{
              position: 'absolute',
              top: '6px',
              right: '6px',
              width: '8px',
              height: '8px',
              backgroundColor: '#EF4444',
              borderRadius: '50%'
            }} />
          </button>
        </header>

        {/* Page content */}
        <main style={{ 
          flex: 1, 
          overflowY: 'auto',
          backgroundColor: '#F8FAFC'
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
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
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