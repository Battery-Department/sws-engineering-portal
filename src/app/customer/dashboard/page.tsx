'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Package,
  TrendingUp,
  Clock,
  ShoppingCart,
  Plus,
  Heart,
  Eye,
  DollarSign,
  Battery,
  Zap,
  ChevronRight,
  RefreshCw
} from 'lucide-react'

export default function CustomerDashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState({
    name: 'Test Customer',
    email: 'test@customer.com'
  })

  const stats = {
    totalOrders: 24,
    avgOrderValue: 3456,
    savedProducts: 8,
    activeBatteries: 15
  }

  const recentOrders = [
    {
      id: 'ORD-1234',
      date: 'May 15, 2025',
      items: ['Tesla Powerwall 2', 'Installation Kit'],
      total: 4599.00,
      status: 'Delivered'
    },
    {
      id: 'ORD-1233',
      date: 'May 10, 2025',
      items: ['LG Chem RESU 10H'],
      total: 2999.00,
      status: 'In Transit'
    },
    {
      id: 'ORD-1232',
      date: 'May 5, 2025',
      items: ['Battery Monitor', 'Cables'],
      total: 1899.00,
      status: 'Processing'
    }
  ]

  const favoriteProducts = [
    {
      id: 'PROD-001',
      name: 'Tesla Powerwall 2',
      price: 4599.00,
      image: '🔋',
      lastPurchased: 'May 15, 2025',
      stock: 'In Stock'
    },
    {
      id: 'PROD-002',
      name: 'Solar Edge Home Battery',
      price: 8999.00,
      image: '🔋',
      lastPurchased: 'April 20, 2025',
      stock: 'In Stock'
    },
    {
      id: 'PROD-003',
      name: 'LG Chem RESU 10H',
      price: 2999.00,
      image: '🔋',
      lastPurchased: 'May 10, 2025',
      stock: 'Low Stock'
    }
  ]

  const quickActions = [
    {
      title: 'Track Order',
      icon: Clock,
      color: '#7c3aed',
      href: '/customer/orders'
    },
    {
      title: 'Browse Products',
      icon: Package,
      color: '#3b82f6',
      href: '/customer/products'
    },
    {
      title: 'View Account',
      icon: Eye,
      color: '#10b981',
      href: '/customer/account'
    },
    {
      title: 'Manage Payment',
      icon: DollarSign,
      color: '#f59e0b',
      href: '/customer/payment'
    }
  ]

  return (
    <div style={{ backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '24px'
      }}>
        <h1 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#1f2937',
          marginBottom: '8px'
        }}>
          Customer Dashboard
        </h1>
        <p style={{ color: '#6b7280' }}>
          Welcome back, {user.name}
        </p>
      </div>

      {/* Main Content */}
      <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div>
                <p style={{ color: '#6b7280', fontSize: '14px' }}>Total Orders</p>
                <p style={{ fontSize: '30px', fontWeight: 'bold', color: '#1f2937', marginTop: '4px' }}>
                  {stats.totalOrders}
                </p>
                <p style={{ color: '#10b981', fontSize: '14px', marginTop: '4px' }}>
                  +3 this month
                </p>
              </div>
              <ShoppingCart size={24} color="#3b82f6" />
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div>
                <p style={{ color: '#6b7280', fontSize: '14px' }}>Avg Order Value</p>
                <p style={{ fontSize: '30px', fontWeight: 'bold', color: '#1f2937', marginTop: '4px' }}>
                  ${stats.avgOrderValue.toLocaleString()}
                </p>
                <p style={{ color: '#10b981', fontSize: '14px', marginTop: '4px' }}>
                  +12% from last month
                </p>
              </div>
              <TrendingUp size={24} color="#10b981" />
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div>
                <p style={{ color: '#6b7280', fontSize: '14px' }}>Saved Products</p>
                <p style={{ fontSize: '30px', fontWeight: 'bold', color: '#1f2937', marginTop: '4px' }}>
                  {stats.savedProducts}
                </p>
                <p style={{ color: '#6b7280', fontSize: '14px', marginTop: '4px' }}>
                  2 new additions
                </p>
              </div>
              <Heart size={24} color="#ef4444" />
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div>
                <p style={{ color: '#6b7280', fontSize: '14px' }}>Active Batteries</p>
                <p style={{ fontSize: '30px', fontWeight: 'bold', color: '#1f2937', marginTop: '4px' }}>
                  {stats.activeBatteries}
                </p>
                <p style={{ color: '#10b981', fontSize: '14px', marginTop: '4px' }}>
                  All operational
                </p>
              </div>
              <Battery size={24} color="#7c3aed" />
            </div>
          </div>
        </div>

        {/* Recent Orders Section */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '24px',
          marginBottom: '32px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937' }}>
              Recent Orders
            </h2>
            <button
              onClick={() => router.push('/customer/orders')}
              style={{
                color: '#3b82f6',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                background: 'none',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              View all
              <ChevronRight size={16} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {recentOrders.map(order => (
              <div
                key={order.id}
                style={{
                  padding: '16px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onClick={() => router.push(`/customer/orders/${order.id}`)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                      <span style={{ fontWeight: '600', color: '#1f2937' }}>{order.id}</span>
                      <span style={{ fontSize: '14px', color: '#6b7280' }}>{order.date}</span>
                    </div>
                    <p style={{ fontSize: '14px', color: '#6b7280' }}>
                      {order.items.join(', ')}
                    </p>
                    <p style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginTop: '8px' }}>
                      ${order.total.toFixed(2)}
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '999px',
                      fontSize: '14px',
                      fontWeight: '500',
                      backgroundColor: order.status === 'Delivered' ? '#def7ec' : order.status === 'In Transit' ? '#fef3c7' : '#e0e7ff',
                      color: order.status === 'Delivered' ? '#065f46' : order.status === 'In Transit' ? '#92400e' : '#3730a3'
                    }}>
                      {order.status}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        console.log('Reorder:', order.id)
                      }}
                      style={{
                        backgroundColor: '#7c3aed',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        fontSize: '14px',
                        fontWeight: '500',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <RefreshCw size={16} />
                      Reorder
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Favorite Products Section */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '24px',
          marginBottom: '32px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937' }}>
              Favorite Products
            </h2>
            <button
              onClick={() => router.push('/customer/favorites')}
              style={{
                color: '#3b82f6',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                background: 'none',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              View all
              <ChevronRight size={16} />
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '16px'
          }}>
            {favoriteProducts.map(product => (
              <div
                key={product.id}
                style={{
                  padding: '16px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px'
                }}
              >
                <div style={{
                  width: '64px',
                  height: '64px',
                  backgroundColor: '#f3f4f6',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px'
                }}>
                  {product.image}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: '600', color: '#1f2937' }}>{product.name}</p>
                  <p style={{ fontSize: '14px', color: '#6b7280' }}>
                    Last purchased: {product.lastPurchased}
                  </p>
                  <p style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginTop: '4px' }}>
                    ${product.price.toFixed(2)}
                  </p>
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  gap: '8px'
                }}>
                  <span style={{
                    fontSize: '12px',
                    color: product.stock === 'In Stock' ? '#10b981' : '#f59e0b',
                    fontWeight: '500'
                  }}>
                    {product.stock}
                  </span>
                  <button
                    onClick={() => console.log('Add to cart:', product.id)}
                    style={{
                      backgroundColor: '#7c3aed',
                      color: 'white',
                      padding: '8px',
                      borderRadius: '6px',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', marginBottom: '20px' }}>
            Quick Actions
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px'
          }}>
            {quickActions.map(action => (
              <button
                key={action.title}
                onClick={() => router.push(action.href)}
                style={{
                  padding: '24px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <action.icon size={32} color={action.color} />
                <span style={{ color: '#1f2937', fontWeight: '500' }}>{action.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}