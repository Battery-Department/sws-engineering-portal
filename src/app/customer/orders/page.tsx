'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Package,
  ShoppingCart,
  Heart,
  Home,
  User,
  CreditCard,
  MapPin,
  LogOut,
  Menu,
  X,
  Search,
  Filter,
  Calendar,
  ChevronRight,
  Eye,
  RefreshCw,
  Download,
  Truck
} from 'lucide-react'
// import { useAuth } from '@/contexts/AuthContext'

const orders = [
  {
    id: 'ORD-1234',
    date: 'May 15, 2025',
    status: 'Delivered',
    total: '$4,599.00',
    items: [
      { name: 'Tesla Powerwall 2', quantity: 1, price: '$4,499.00' },
      { name: 'Installation Kit', quantity: 1, price: '$100.00' }
    ],
    trackingNumber: '1Z999AA10123456784',
    deliveryDate: 'May 17, 2025',
    shippingAddress: '123 Main St, San Francisco, CA 94105'
  },
  {
    id: 'ORD-1233',
    date: 'May 10, 2025',
    status: 'In Transit',
    total: '$2,999.00',
    items: [
      { name: 'LG Chem RESU 10H', quantity: 1, price: '$2,999.00' }
    ],
    trackingNumber: '1Z999AA10123456783',
    estimatedDelivery: 'May 18, 2025',
    shippingAddress: '123 Main St, San Francisco, CA 94105'
  },
  {
    id: 'ORD-1232',
    date: 'May 5, 2025',
    status: 'Processing',
    total: '$1,899.00',
    items: [
      { name: 'Battery Monitor LCD Display', quantity: 2, price: '$899.50' },
      { name: 'Extension Cables', quantity: 1, price: '$100.00' }
    ],
    trackingNumber: null,
    estimatedDelivery: 'May 20, 2025',
    shippingAddress: '123 Main St, San Francisco, CA 94105'
  },
  {
    id: 'ORD-1231',
    date: 'April 28, 2025',
    status: 'Delivered',
    total: '$8,999.00',
    items: [
      { name: 'Solar Edge Home Battery', quantity: 1, price: '$8,999.00' }
    ],
    trackingNumber: '1Z999AA10123456782',
    deliveryDate: 'May 1, 2025',
    shippingAddress: '456 Oak Ave, San Francisco, CA 94105'
  }
]

export default function CustomerOrdersPage() {
  // const { user, loading } = useAuth()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  useEffect(() => {
    // Get user from localStorage
    const savedUser = localStorage.getItem('customerUser')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

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
    router.push('/customer/auth/login')
    return null
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = selectedStatus === 'all' || order.status.toLowerCase() === selectedStatus.toLowerCase()
    return matchesSearch && matchesStatus
  })

  const handleReorder = (orderId: string) => {
    // Handle reorder logic
    console.log('Reordering:', orderId)
  }

  const handleTrackShipment = (trackingNumber: string) => {
    // Handle tracking logic
    window.open(`https://tracking.example.com/${trackingNumber}`, '_blank')
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Content area */}
      <div style={{ paddingLeft: 0 }}>
        {/* Header */}
        <header style={{
          backgroundColor: 'white',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          position: 'sticky',
          top: 0,
          zIndex: 20
        }}>
          <div style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#111827' }}>My Orders</h1>
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
        </header>

        {/* Main content */}
        <main style={{ padding: '24px' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            {/* Page header */}
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
                Order History
              </h2>
              <p style={{ color: '#6b7280' }}>Track your orders and manage shipments</p>
            </div>

            {/* Search and filters */}
            <div style={{ marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '300px', position: 'relative' }}>
                  <Search size={20} style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#6b7280'
                  }} />
                  <input
                    type="text"
                    placeholder="Search orders or products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 10px 10px 40px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'all 0.2s'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#6366f1'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e7eb'
                    }}
                  />
                </div>
                <button
                  style={{
                    padding: '10px 16px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    backgroundColor: 'white',
                    color: '#374151',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f9fafb'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'white'
                  }}
                >
                  <Filter size={16} />
                  Filters
                </button>
              </div>

              {/* Status filters */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['all', 'processing', 'in transit', 'delivered'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      border: '1px solid',
                      borderColor: selectedStatus === status ? '#6366f1' : '#e5e7eb',
                      backgroundColor: selectedStatus === status ? '#6366f1' : 'white',
                      color: selectedStatus === status ? 'white' : '#374151',
                      fontSize: '14px',
                      fontWeight: '500',
                      textTransform: 'capitalize',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {filteredOrders.map((order) => (
                <div key={order.id} style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    padding: '20px',
                    borderBottom: expandedOrder === order.id ? '1px solid #e5e7eb' : 'none',
                    cursor: 'pointer'
                  }}
                  onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827' }}>{order.id}</h3>
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            padding: '4px 12px',
                            borderRadius: '9999px',
                            fontSize: '12px',
                            fontWeight: '500',
                            backgroundColor: order.status === 'Delivered' ? '#d1fae5' : 
                                           order.status === 'In Transit' ? '#fef3c7' : 
                                           order.status === 'Processing' ? '#dbeafe' : '#f3f4f6',
                            color: order.status === 'Delivered' ? '#065f46' : 
                                  order.status === 'In Transit' ? '#78350f' : 
                                  order.status === 'Processing' ? '#1e40af' : '#6b7280'
                          }}>
                            {order.status}
                          </span>
                        </div>
                        <p style={{ fontSize: '14px', color: '#6b7280' }}>{order.date}</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: '18px', fontWeight: '600', color: '#111827' }}>{order.total}</p>
                        <p style={{ fontSize: '14px', color: '#6b7280' }}>{order.items.length} items</p>
                      </div>
                    </div>

                    {/* Order items preview */}
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                      {order.items.slice(0, 2).map((item, index) => (
                        <span key={index} style={{
                          padding: '6px 12px',
                          backgroundColor: '#f3f4f6',
                          borderRadius: '9999px',
                          fontSize: '14px',
                          color: '#374151'
                        }}>
                          {item.name}
                        </span>
                      ))}
                      {order.items.length > 2 && (
                        <span style={{
                          padding: '6px 12px',
                          backgroundColor: '#f3f4f6',
                          borderRadius: '9999px',
                          fontSize: '14px',
                          color: '#374151'
                        }}>
                          +{order.items.length - 2} more
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      {order.trackingNumber && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleTrackShipment(order.trackingNumber!)
                          }}
                          style={{
                            padding: '8px 16px',
                            backgroundColor: '#6366f1',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '14px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#4f46e5'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#6366f1'
                          }}
                        >
                          <Truck size={16} />
                          Track Shipment
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleReorder(order.id)
                        }}
                        style={{
                          padding: '8px 16px',
                          border: '1px solid #e5e7eb',
                          backgroundColor: 'white',
                          color: '#374151',
                          borderRadius: '6px',
                          fontSize: '14px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#f9fafb'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'white'
                        }}
                      >
                        <RefreshCw size={16} />
                        Reorder
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                        }}
                        style={{
                          padding: '8px 16px',
                          border: '1px solid #e5e7eb',
                          backgroundColor: 'white',
                          color: '#374151',
                          borderRadius: '6px',
                          fontSize: '14px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#f9fafb'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'white'
                        }}
                      >
                        <Download size={16} />
                        Invoice
                      </button>
                    </div>
                  </div>

                  {/* Expanded order details */}
                  {expandedOrder === order.id && (
                    <div style={{ padding: '20px', backgroundColor: '#f9fafb' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                        {/* Order items */}
                        <div>
                          <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
                            Order Items
                          </h4>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {order.items.map((item, index) => (
                              <div key={index} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '12px',
                                backgroundColor: 'white',
                                borderRadius: '8px',
                                border: '1px solid #e5e7eb'
                              }}>
                                <div>
                                  <p style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>{item.name}</p>
                                  <p style={{ fontSize: '14px', color: '#6b7280' }}>Quantity: {item.quantity}</p>
                                </div>
                                <p style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>{item.price}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Shipping information */}
                        <div>
                          <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
                            Shipping Information
                          </h4>
                          <div style={{
                            padding: '16px',
                            backgroundColor: 'white',
                            borderRadius: '8px',
                            border: '1px solid #e5e7eb'
                          }}>
                            <div style={{ marginBottom: '12px' }}>
                              <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Shipping Address</p>
                              <p style={{ fontSize: '14px', color: '#111827' }}>{order.shippingAddress}</p>
                            </div>
                            {order.trackingNumber && (
                              <div style={{ marginBottom: '12px' }}>
                                <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Tracking Number</p>
                                <p style={{ fontSize: '14px', color: '#111827', fontFamily: 'monospace' }}>{order.trackingNumber}</p>
                              </div>
                            )}
                            <div>
                              <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>
                                {order.status === 'Delivered' ? 'Delivered On' : 'Estimated Delivery'}
                              </p>
                              <p style={{ fontSize: '14px', color: '#111827' }}>
                                {order.deliveryDate || order.estimatedDelivery}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      <style jsx global>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}