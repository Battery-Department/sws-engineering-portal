'use client'

// Disable static generation for this page
export const dynamic = 'force-dynamic'

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
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

const navigation = [
  { name: 'Dashboard', href: '/portal/dashboard', icon: Home, current: false },
  { name: 'Orders', href: '/portal/orders', icon: ShoppingCart, current: false },
  { name: 'Billing', href: '/portal/billing', icon: DollarSign, current: false },
  { name: 'Inventory', href: '/portal/inventory', icon: Package, current: false },
  { name: 'Shipping', href: '/portal/shipping', icon: Truck, current: true },
  { name: 'Analytics', href: '/portal/analytics', icon: BarChart, current: false },
  { name: 'Settings', href: '/portal/settings', icon: Settings, current: false },
]

const shipments = [
  {
    id: 'FLX-SHP-001',
    orderId: 'FLX-2025-001',
    customer: 'Walsh Construction Group',
    status: 'delivered',
    carrier: 'FedEx',
    trackingNumber: '795870384652',
    destination: 'Chicago, IL - Jobsite',
    estimatedDelivery: 'May 15, 2025',
    actualDelivery: 'May 14, 2025',
    items: 2
  },
  {
    id: 'FLX-SHP-002',
    orderId: 'FLX-2025-002',
    customer: 'Davis Building Corp',
    status: 'in-transit',
    carrier: 'UPS',
    trackingNumber: '1Z999AA10123456784',
    destination: 'Houston, TX - Main Warehouse',
    estimatedDelivery: 'May 18, 2025',
    actualDelivery: null,
    items: 2
  },
  {
    id: 'FLX-SHP-003',
    orderId: 'FLX-2025-003',
    customer: 'Miller & Sons Electric',
    status: 'processing',
    carrier: 'FedEx',
    trackingNumber: '1234567890',
    destination: 'Phoenix, AZ - Desert Ridge Site',
    estimatedDelivery: 'May 20, 2025',
    actualDelivery: null,
    items: 1
  },
]

const metrics = [
  {
    title: "Active Shipments",
    value: "12",
    change: "-8% from last week",
    icon: Truck,
    color: "#3b82f6",
    bgColor: "#eff6ff"
  },
  {
    title: "On-Time Delivery",
    value: "96.5%",
    change: "+2.1% from last month",
    icon: CheckCircle,
    color: "#10b981", 
    bgColor: "#f0fdf4"
  },
  {
    title: "Average Transit Time",
    value: "2.1 days",
    change: "-0.3 days from last month",
    icon: Clock,
    color: "#8b5cf6",
    bgColor: "#f5f3ff"
  },
  {
    title: "Pending Shipments",
    value: "3",
    change: "Need attention",
    icon: AlertCircle,
    color: "#f59e0b",
    bgColor: "#fffbeb"
  }
]

export default function ShippingPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState('all')

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

  const filteredShipments = selectedStatus === 'all' 
    ? shipments 
    : shipments.filter(s => s.status === selectedStatus)

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
              <span style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>Battery Department</span>
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
            <span style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>Battery Department</span>
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
            <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#111827' }}>Shipping Management</h1>
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
            {/* Page header */}
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
                Shipping & Logistics
              </h2>
              <p style={{ color: '#6b7280' }}>Track and manage all your shipments</p>
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
                  <p style={{ fontSize: '14px', color: metric.color }}>{metric.change}</p>
                </div>
              ))}
            </div>

            {/* Filters */}
            <div style={{ marginBottom: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setSelectedStatus('all')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: '1px solid',
                  borderColor: selectedStatus === 'all' ? '#6366f1' : '#e5e7eb',
                  backgroundColor: selectedStatus === 'all' ? '#6366f1' : 'white',
                  color: selectedStatus === 'all' ? 'white' : '#374151',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.2s'
                }}
              >
                All Shipments
              </button>
              <button
                onClick={() => setSelectedStatus('delivered')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: '1px solid',
                  borderColor: selectedStatus === 'delivered' ? '#10b981' : '#e5e7eb',
                  backgroundColor: selectedStatus === 'delivered' ? '#10b981' : 'white',
                  color: selectedStatus === 'delivered' ? 'white' : '#374151',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.2s'
                }}
              >
                Delivered
              </button>
              <button
                onClick={() => setSelectedStatus('in-transit')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: '1px solid',
                  borderColor: selectedStatus === 'in-transit' ? '#f59e0b' : '#e5e7eb',
                  backgroundColor: selectedStatus === 'in-transit' ? '#f59e0b' : 'white',
                  color: selectedStatus === 'in-transit' ? 'white' : '#374151',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.2s'
                }}
              >
                In Transit
              </button>
              <button
                onClick={() => setSelectedStatus('processing')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: '1px solid',
                  borderColor: selectedStatus === 'processing' ? '#8b5cf6' : '#e5e7eb',
                  backgroundColor: selectedStatus === 'processing' ? '#8b5cf6' : 'white',
                  color: selectedStatus === 'processing' ? 'white' : '#374151',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.2s'
                }}
              >
                Processing
              </button>
            </div>

            {/* Shipments List */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
              overflow: 'hidden'
            }}>
              <div style={{ padding: '24px', borderBottom: '1px solid #e5e7eb' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827' }}>
                  Recent Shipments
                </h3>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Shipment ID</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Customer</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Carrier</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Status</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Destination</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Est. Delivery</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredShipments.map((shipment) => (
                      <tr key={shipment.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                        <td style={{ padding: '16px' }}>
                          <div style={{ fontWeight: '500', color: '#111827' }}>{shipment.id}</div>
                          <div style={{ fontSize: '14px', color: '#6b7280' }}>Order: {shipment.orderId}</div>
                        </td>
                        <td style={{ padding: '16px', fontSize: '14px', color: '#374151' }}>{shipment.customer}</td>
                        <td style={{ padding: '16px' }}>
                          <div style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>{shipment.carrier}</div>
                          <div style={{ fontSize: '12px', color: '#6b7280' }}>{shipment.trackingNumber}</div>
                        </td>
                        <td style={{ padding: '16px' }}>
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            padding: '4px 12px',
                            borderRadius: '9999px',
                            fontSize: '12px',
                            fontWeight: '500',
                            backgroundColor: shipment.status === 'delivered' ? '#d1fae5' : 
                                           shipment.status === 'in-transit' ? '#fef3c7' : '#e9d5ff',
                            color: shipment.status === 'delivered' ? '#065f46' : 
                                  shipment.status === 'in-transit' ? '#78350f' : '#6b21a8'
                          }}>
                            {shipment.status.charAt(0).toUpperCase() + shipment.status.slice(1).replace('-', ' ')}
                          </span>
                        </td>
                        <td style={{ padding: '16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <MapPin size={16} style={{ color: '#6b7280' }} />
                            <span style={{ fontSize: '14px', color: '#374151' }}>{shipment.destination}</span>
                          </div>
                        </td>
                        <td style={{ padding: '16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Calendar size={16} style={{ color: '#6b7280' }} />
                            <span style={{ fontSize: '14px', color: '#374151' }}>{shipment.estimatedDelivery}</span>
                          </div>
                        </td>
                        <td style={{ padding: '16px' }}>
                          <button
                            style={{
                              padding: '6px 12px',
                              borderRadius: '6px',
                              border: '1px solid #e5e7eb',
                              backgroundColor: 'white',
                              color: '#374151',
                              fontSize: '14px',
                              cursor: 'pointer',
                              transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#f9fafb'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'white'
                            }}
                          >
                            Track
                          </button>
                        </td>
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
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}