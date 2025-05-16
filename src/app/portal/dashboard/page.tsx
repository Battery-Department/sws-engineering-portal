'use client'

import React, { useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import {
  Package,
  CreditCard,
  TrendingUp,
  Users,
  Home,
  ShoppingCart,
  DollarSign,
  Truck,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  BarChart
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/portal/dashboard', icon: Home, current: true },
  { name: 'Orders', href: '/portal/orders', icon: ShoppingCart, current: false },
  { name: 'Billing', href: '/portal/billing', icon: DollarSign, current: false },
  { name: 'Inventory', href: '/portal/inventory', icon: Package, current: false },
  { name: 'Shipping', href: '/portal/shipping', icon: Truck, current: false },
  { name: 'Analytics', href: '/portal/analytics', icon: BarChart, current: false },
  { name: 'Settings', href: '/portal/settings', icon: Settings, current: false },
]

const metrics = [
  {
    title: "Active Orders",
    value: "12",
    change: "+2 from last month",
    icon: Package,
    color: "#3b82f6",
    bgColor: "#eff6ff"
  },
  {
    title: "Monthly Revenue",
    value: "$45,231.89",
    change: "+20.1% from last month",
    icon: TrendingUp,
    color: "#10b981", 
    bgColor: "#f0fdf4"
  },
  {
    title: "Active Batteries",
    value: "2,350",
    change: "+180 from last month",
    icon: CreditCard,
    color: "#8b5cf6",
    bgColor: "#f5f3ff"
  },
  {
    title: "Active Customers",
    value: "573",
    change: "+201 since last year",
    icon: Users,
    color: "#f59e0b",
    bgColor: "#fffbeb"
  }
]

const recentOrders = [
  { id: 'ORD-001', customer: 'Acme Corporation', product: 'Tesla Powerwall 2', status: 'delivered', amount: '$4,599.00', date: 'May 10, 2025' },
  { id: 'ORD-002', customer: 'Global Tech Solutions', product: 'Solar Edge Home Battery', status: 'in-transit', amount: '$8,999.00', date: 'May 15, 2025' },
  { id: 'ORD-003', customer: 'Green Energy Inc', product: 'Panasonic EverVolt 2.0', status: 'processing', amount: '$2,199.00', date: 'May 16, 2025' },
]

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = React.useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/portal/auth/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9fafb' }}>
        <div style={{
          width: '48px',
          height: '48px',
          border: '4px solid #e5e7eb',
          borderTopColor: '#3b82f6',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <style jsx>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Sidebar - Mobile */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 40,
        display: sidebarOpen ? 'flex' : 'none',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      }} onClick={() => setSidebarOpen(false)}>
        <div style={{
          position: 'relative',
          flex: '1 1 0%',
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '256px',
          width: '100%',
          backgroundColor: '#1f2937'
        }} onClick={(e) => e.stopPropagation()}>
          <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>Battery Hub</span>
              <button
                onClick={() => setSidebarOpen(false)}
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
          </div>
          <nav style={{ flex: 1, padding: '0 8px' }}>
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
                  color: item.current ? 'white' : '#d1d5db',
                  backgroundColor: item.current ? '#111827' : 'transparent',
                  textDecoration: 'none',
                  transition: 'all 0.2s'
                }}
              >
                <item.icon size={20} style={{ marginRight: '12px' }} />
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div style={{
        display: 'none',
        position: 'fixed',
        insetY: 0,
        zIndex: 30,
        width: '256px',
        backgroundColor: '#1f2937'
      }} className="md-show">
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0, flex: 1 }}>
          <div style={{ padding: '20px' }}>
            <span style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>Battery Hub</span>
          </div>
          <nav style={{ flex: 1, padding: '0 8px' }}>
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
                  color: item.current ? 'white' : '#d1d5db',
                  backgroundColor: item.current ? '#111827' : 'transparent',
                  textDecoration: 'none',
                  transition: 'all 0.2s'
                }}
              >
                <item.icon size={20} style={{ marginRight: '12px' }} />
                {item.name}
              </a>
            ))}
          </nav>
          <div style={{ padding: '16px', borderTop: '1px solid #374151' }}>
            <a
              href="/portal/auth/login"
              onClick={(e) => {
                e.preventDefault()
                router.push('/portal/auth/login')
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px 16px',
                borderRadius: '8px',
                color: '#d1d5db',
                textDecoration: 'none',
                transition: 'all 0.2s'
              }}
            >
              <LogOut size={20} style={{ marginRight: '12px' }} />
              Sign out
            </a>
          </div>
        </div>
      </div>

      {/* Content area */}
      <div style={{ paddingLeft: 0 }} className="md-content">
        {/* Header */}
        <header style={{
          backgroundColor: 'white',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          position: 'sticky',
          top: 0,
          zIndex: 20
        }}>
          <div style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button
              onClick={() => setSidebarOpen(true)}
              style={{
                padding: '8px',
                borderRadius: '8px',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'block'
              }}
              className="md-hide"
            >
              <Menu size={24} />
            </button>
            <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#111827' }}>Dashboard</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button style={{
                padding: '8px',
                borderRadius: '8px',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer'
              }}>
                <Bell size={20} />
              </button>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#6b7280',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: '500'
              }}>
                {user?.name?.[0] || 'U'}
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main style={{ padding: '24px' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            {/* Welcome section */}
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
                Welcome back, {user?.name || user?.email}
              </h2>
              <p style={{ color: '#6b7280' }}>Here's an overview of your battery management system</p>
            </div>

            {/* Metrics */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '24px',
              marginBottom: '32px'
            }}>
              {metrics.map((metric) => (
                <div key={metric.title} style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '24px',
                  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: '500', color: '#6b7280' }}>{metric.title}</h3>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      backgroundColor: metric.bgColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <metric.icon size={20} style={{ color: metric.color }} />
                    </div>
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: '600', color: '#111827', marginBottom: '4px' }}>
                    {metric.value}
                  </div>
                  <p style={{ fontSize: '14px', color: '#10b981' }}>{metric.change}</p>
                </div>
              ))}
            </div>

            {/* Recent Orders */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
                Recent Orders
              </h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <th style={{ padding: '12px 8px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Order ID</th>
                      <th style={{ padding: '12px 8px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Customer</th>
                      <th style={{ padding: '12px 8px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Product</th>
                      <th style={{ padding: '12px 8px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Status</th>
                      <th style={{ padding: '12px 8px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Amount</th>
                      <th style={{ padding: '12px 8px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                        <td style={{ padding: '16px 8px', fontSize: '14px', fontWeight: '500', color: '#111827' }}>{order.id}</td>
                        <td style={{ padding: '16px 8px', fontSize: '14px', color: '#374151' }}>{order.customer}</td>
                        <td style={{ padding: '16px 8px', fontSize: '14px', color: '#374151' }}>{order.product}</td>
                        <td style={{ padding: '16px 8px' }}>
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            padding: '4px 12px',
                            borderRadius: '9999px',
                            fontSize: '12px',
                            fontWeight: '500',
                            backgroundColor: order.status === 'delivered' ? '#d1fae5' : order.status === 'in-transit' ? '#fef3c7' : '#dbeafe',
                            color: order.status === 'delivered' ? '#065f46' : order.status === 'in-transit' ? '#78350f' : '#1e40af'
                          }}>
                            {order.status}
                          </span>
                        </td>
                        <td style={{ padding: '16px 8px', fontSize: '14px', fontWeight: '500', color: '#111827' }}>{order.amount}</td>
                        <td style={{ padding: '16px 8px', fontSize: '14px', color: '#374151' }}>{order.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      <style jsx global>{`
        @media (min-width: 768px) {
          .md-show {
            display: block !important;
          }
          .md-hide {
            display: none !important;
          }
          .md-content {
            padding-left: 256px !important;
          }
        }
      `}</style>
    </div>
  )
}