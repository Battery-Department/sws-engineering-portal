'use client'

import React, { useState } from 'react'
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
  BarChart,
  Calendar,
  Download,
  Filter,
  ArrowUp,
  ArrowDown
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

const navigation = [
  { name: 'Dashboard', href: '/portal/dashboard', icon: Home, current: false },
  { name: 'Orders', href: '/portal/orders', icon: ShoppingCart, current: false },
  { name: 'Billing', href: '/portal/billing', icon: DollarSign, current: false },
  { name: 'Inventory', href: '/portal/inventory', icon: Package, current: false },
  { name: 'Shipping', href: '/portal/shipping', icon: Truck, current: false },
  { name: 'Analytics', href: '/portal/analytics', icon: BarChart, current: true },
  { name: 'Settings', href: '/portal/settings', icon: Settings, current: false },
]

const kpiCards = [
  {
    title: "Total Revenue",
    value: "$124,573",
    change: "+12.5%",
    trend: "up",
    period: "vs last month"
  },
  {
    title: "Order Volume",
    value: "1,234",
    change: "+8.3%",
    trend: "up",
    period: "vs last month"
  },
  {
    title: "Average Order Value",
    value: "$2,456",
    change: "-2.1%",
    trend: "down",
    period: "vs last month"
  },
  {
    title: "Customer Retention",
    value: "87.4%",
    change: "+3.2%",
    trend: "up",
    period: "vs last quarter"
  }
]

const salesData = [
  { month: 'Jan', sales: 45000, orders: 120 },
  { month: 'Feb', sales: 52000, orders: 138 },
  { month: 'Mar', sales: 48000, orders: 125 },
  { month: 'Apr', sales: 61000, orders: 165 },
  { month: 'May', sales: 58000, orders: 155 },
  { month: 'Jun', sales: 67000, orders: 180 },
]

const topProducts = [
  { name: 'Tesla Powerwall 2', sales: 156, revenue: '$718,644', growth: '+15%' },
  { name: 'Solar Edge Home Battery', sales: 89, revenue: '$800,991', growth: '+8%' },
  { name: 'LG Chem RESU 10H', sales: 76, revenue: '$342,000', growth: '+22%' },
  { name: 'Panasonic EverVolt 2.0', sales: 64, revenue: '$140,778', growth: '-5%' },
]

export default function AnalyticsPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState('month')

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
      </div>
    )
  }

  if (!user) {
    router.push('/portal/auth/login')
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
        top: 0,
        bottom: 0,
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
            <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#111827' }}>Analytics</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button style={{
                padding: '8px 16px',
                borderRadius: '8px',
                backgroundColor: '#6366f1',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Download size={16} />
                Export Report
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
            {/* Page header */}
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
                Analytics Dashboard
              </h2>
              <p style={{ color: '#6b7280' }}>Comprehensive insights into your business performance</p>
            </div>

            {/* Period Selector */}
            <div style={{ marginBottom: '24px', display: 'flex', gap: '8px' }}>
              {['week', 'month', 'quarter', 'year'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: '1px solid',
                    borderColor: selectedPeriod === period ? '#6366f1' : '#e5e7eb',
                    backgroundColor: selectedPeriod === period ? '#6366f1' : 'white',
                    color: selectedPeriod === period ? 'white' : '#374151',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    textTransform: 'capitalize',
                    transition: 'all 0.2s'
                  }}
                >
                  {period}
                </button>
              ))}
            </div>

            {/* KPI Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '24px',
              marginBottom: '32px'
            }}>
              {kpiCards.map((kpi) => (
                <div key={kpi.title} style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '24px',
                  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
                }}>
                  <h3 style={{ fontSize: '14px', fontWeight: '500', color: '#6b7280', marginBottom: '8px' }}>
                    {kpi.title}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                    <div style={{ fontSize: '30px', fontWeight: '700', color: '#111827' }}>
                      {kpi.value}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {kpi.trend === 'up' ? (
                        <ArrowUp size={16} style={{ color: '#10b981' }} />
                      ) : (
                        <ArrowDown size={16} style={{ color: '#ef4444' }} />
                      )}
                      <span style={{
                        fontSize: '14px',
                        fontWeight: '500',
                        color: kpi.trend === 'up' ? '#10b981' : '#ef4444'
                      }}>
                        {kpi.change}
                      </span>
                    </div>
                  </div>
                  <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>
                    {kpi.period}
                  </p>
                </div>
              ))}
            </div>

            {/* Charts Section */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
              gap: '24px',
              marginBottom: '32px'
            }}>
              {/* Sales Chart */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
              }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
                  Sales Trend
                </h3>
                <div style={{ height: '300px', display: 'flex', alignItems: 'flex-end', gap: '16px' }}>
                  {salesData.map((data) => (
                    <div key={data.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{
                        width: '100%',
                        height: `${(data.sales / 70000) * 100}%`,
                        backgroundColor: '#6366f1',
                        borderRadius: '8px 8px 0 0',
                        marginBottom: '8px',
                        transition: 'all 0.3s',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#4f46e5'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#6366f1'
                      }}
                      />
                      <span style={{ fontSize: '14px', color: '#6b7280' }}>{data.month}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Products */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
              }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
                  Top Products
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {topProducts.map((product, index) => (
                    <div key={product.name} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px',
                      borderRadius: '8px',
                      backgroundColor: '#f9fafb',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f3f4f6'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#f9fafb'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          backgroundColor: '#e5e7eb',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: '600',
                          color: '#374151'
                        }}>
                          {index + 1}
                        </div>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>
                            {product.name}
                          </div>
                          <div style={{ fontSize: '12px', color: '#6b7280' }}>
                            {product.sales} units sold
                          </div>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>
                          {product.revenue}
                        </div>
                        <div style={{ fontSize: '12px', color: product.growth.startsWith('+') ? '#10b981' : '#ef4444' }}>
                          {product.growth}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional Metrics */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px'
            }}>
              {/* Customer Metrics */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
              }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
                  Customer Metrics
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>New Customers</span>
                    <span style={{ fontSize: '16px', fontWeight: '600', color: '#111827' }}>234</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>Repeat Rate</span>
                    <span style={{ fontSize: '16px', fontWeight: '600', color: '#111827' }}>67%</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>Avg. Lifetime Value</span>
                    <span style={{ fontSize: '16px', fontWeight: '600', color: '#111827' }}>$12,456</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>Churn Rate</span>
                    <span style={{ fontSize: '16px', fontWeight: '600', color: '#111827' }}>2.3%</span>
                  </div>
                </div>
              </div>

              {/* Performance Summary */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
              }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
                  Performance Summary
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: '14px', color: '#6b7280' }}>Revenue Goal</span>
                      <span style={{ fontSize: '14px', color: '#111827' }}>78%</span>
                    </div>
                    <div style={{
                      width: '100%',
                      height: '8px',
                      backgroundColor: '#e5e7eb',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: '78%',
                        height: '100%',
                        backgroundColor: '#6366f1',
                        transition: 'width 0.3s'
                      }} />
                    </div>
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: '14px', color: '#6b7280' }}>Order Target</span>
                      <span style={{ fontSize: '14px', color: '#111827' }}>92%</span>
                    </div>
                    <div style={{
                      width: '100%',
                      height: '8px',
                      backgroundColor: '#e5e7eb',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: '92%',
                        height: '100%',
                        backgroundColor: '#10b981',
                        transition: 'width 0.3s'
                      }} />
                    </div>
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: '14px', color: '#6b7280' }}>Customer Satisfaction</span>
                      <span style={{ fontSize: '14px', color: '#111827' }}>95%</span>
                    </div>
                    <div style={{
                      width: '100%',
                      height: '8px',
                      backgroundColor: '#e5e7eb',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: '95%',
                        height: '100%',
                        backgroundColor: '#8b5cf6',
                        transition: 'width 0.3s'
                      }} />
                    </div>
                  </div>
                </div>
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
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}