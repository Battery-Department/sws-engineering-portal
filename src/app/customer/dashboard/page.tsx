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
  RefreshCw,
  Activity,
  Award,
  Bell,
  CreditCard,
  Gift,
  Truck,
  Shield,
  Star,
  AlertCircle
} from 'lucide-react'

export default function CustomerDashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState({
    name: 'Alex Thompson',
    email: 'alex@company.com',
    tier: 'Gold',
    savings: 4567.89
  })

  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('overview')

  const stats = {
    totalOrders: 24,
    avgOrderValue: 3456,
    savedProducts: 8,
    activeBatteries: 15,
    totalSavings: 4567.89,
    loyaltyPoints: 2456
  }

  const recentOrders = [
    {
      id: 'ORD-1234',
      date: 'May 15, 2025',
      items: ['FlexVolt 15Ah Battery x5', 'Installation Kit'],
      total: 4599.00,
      status: 'Delivered',
      savings: 345.00
    },
    {
      id: 'ORD-1233',
      date: 'May 10, 2025',
      items: ['FlexVolt 9Ah Battery x10'],
      total: 2999.00,
      status: 'In Transit',
      savings: 234.00
    },
    {
      id: 'ORD-1232',
      date: 'May 5, 2025',
      items: ['Battery Monitor', 'Cables'],
      total: 1899.00,
      status: 'Processing',
      savings: 156.00
    }
  ]

  const favoriteProducts = [
    {
      id: 'PROD-001',
      name: 'FlexVolt 15Ah Battery',
      price: 379.00,
      originalPrice: 459.00,
      image: '⚡',
      lastPurchased: 'May 15, 2025',
      stock: 'In Stock',
      rating: 4.8,
      reviews: 234,
      savings: 80.00
    },
    {
      id: 'PROD-002',
      name: 'FlexVolt 9Ah Battery',
      price: 249.00,
      originalPrice: 299.00,
      image: '🔋',
      lastPurchased: 'April 20, 2025',
      stock: 'In Stock',
      rating: 4.7,
      reviews: 189,
      savings: 50.00
    },
    {
      id: 'PROD-003',
      name: 'FlexVolt 6Ah Battery',
      price: 169.00,
      originalPrice: 199.00,
      image: '🔌',
      lastPurchased: 'May 10, 2025',
      stock: 'Low Stock',
      rating: 4.9,
      reviews: 312,
      savings: 30.00
    }
  ]

  const notifications = [
    {
      id: 1,
      type: 'discount',
      title: 'New discount tier unlocked!',
      message: 'Congratulations! You now get 15% off all orders.',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'order',
      title: 'Order delivered',
      message: 'Your order #ORD-1234 has been delivered successfully.',
      time: '1 day ago',
      read: false
    },
    {
      id: 3,
      type: 'reward',
      title: 'Earned 500 loyalty points',
      message: 'Points earned from your recent purchase.',
      time: '3 days ago',
      read: true
    }
  ]

  const handleMouseEnter = (cardId: string) => {
    setHoveredCard(cardId)
  }

  const handleMouseLeave = () => {
    setHoveredCard(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return { bg: '#E6F9F0', color: '#059669' }
      case 'In Transit':
        return { bg: '#FEF3C7', color: '#D97706' }
      case 'Processing':
        return { bg: '#E0E7FF', color: '#4F46E5' }
      default:
        return { bg: '#F3F4F6', color: '#6B7280' }
    }
  }

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
      {/* Header with gradient background */}
      <div style={{
        background: 'linear-gradient(135deg, #0048AC 0%, #006FEE 50%, #0084FF 100%)',
        color: 'white',
        padding: '32px 24px',
        borderRadius: '0 0 24px 24px',
        boxShadow: '0 8px 24px rgba(0, 111, 238, 0.15)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '24px' }}>
            <div>
              <h1 style={{
                fontSize: '32px',
                fontWeight: '800',
                marginBottom: '8px'
              }}>
                Welcome back, {user.name}
              </h1>
              <p style={{ fontSize: '16px', opacity: 0.9 }}>
                Here's what's happening with your battery business
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                padding: '12px 20px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <Award size={20} />
                <div>
                  <p style={{ fontSize: '14px', opacity: 0.9 }}>Customer Tier</p>
                  <p style={{ fontSize: '18px', fontWeight: '700' }}>{user.tier}</p>
                </div>
              </div>
              <button
                onClick={() => router.push('/customer/notifications')}
                style={{
                  position: 'relative',
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'
                }}
              >
                <Bell size={20} color="white" />
                <span style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#EF4444',
                  borderRadius: '50%'
                }} />
              </button>
            </div>
          </div>

          {/* Quick Stats Bar */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '16px'
          }}>
            {[
              { label: 'Total Savings', value: `$${stats.totalSavings.toFixed(2)}`, icon: DollarSign, color: '#22C55E' },
              { label: 'Loyalty Points', value: stats.loyaltyPoints.toLocaleString(), icon: Star, color: '#FFB800' },
              { label: 'Active Orders', value: '3', icon: Truck, color: '#3B82F6' },
              { label: 'Discount Tier', value: '15%', icon: Gift, color: '#7C3AED' }
            ].map((stat, index) => (
              <div key={index} style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                padding: '16px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <stat.icon size={20} color={stat.color} />
                </div>
                <div>
                  <p style={{ fontSize: '13px', opacity: 0.9 }}>{stat.label}</p>
                  <p style={{ fontSize: '18px', fontWeight: '700' }}>{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
        {/* Activity Overview Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          {[
            {
              id: 'orders',
              title: 'Total Orders',
              value: stats.totalOrders,
              change: '+3 this month',
              icon: ShoppingCart,
              color: '#3B82F6',
              bgGradient: 'linear-gradient(135deg, #E6F4FF 0%, #F0F9FF 100%)'
            },
            {
              id: 'value',
              title: 'Avg Order Value',
              value: `$${stats.avgOrderValue.toLocaleString()}`,
              change: '+12% from last month',
              icon: TrendingUp,
              color: '#10B981',
              bgGradient: 'linear-gradient(135deg, #E6FFF9 0%, #F0FFF8 100%)'
            },
            {
              id: 'saved',
              title: 'Saved Products',
              value: stats.savedProducts,
              change: '2 new additions',
              icon: Heart,
              color: '#EF4444',
              bgGradient: 'linear-gradient(135deg, #FFE6E6 0%, #FFF0F0 100%)'
            },
            {
              id: 'batteries',
              title: 'Active Batteries',
              value: stats.activeBatteries,
              change: 'All operational',
              icon: Battery,
              color: '#7C3AED',
              bgGradient: 'linear-gradient(135deg, #F3E6FF 0%, #F9F0FF 100%)'
            }
          ].map(item => (
            <div
              key={item.id}
              onMouseEnter={() => handleMouseEnter(item.id)}
              onMouseLeave={handleMouseLeave}
              style={{
                background: item.bgGradient,
                padding: '24px',
                borderRadius: '16px',
                border: `1px solid ${item.color}20`,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: hoveredCard === item.id ? 'translateY(-4px)' : 'translateY(0)',
                boxShadow: hoveredCard === item.id 
                  ? `0 12px 24px ${item.color}20` 
                  : '0 4px 12px rgba(0, 0, 0, 0.04)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div>
                  <p style={{ color: '#5B6B7D', fontSize: '14px', fontWeight: '500' }}>{item.title}</p>
                  <p style={{ fontSize: '30px', fontWeight: '800', color: '#0A051E', marginTop: '8px' }}>
                    {item.value}
                  </p>
                  <p style={{ 
                    color: item.change.includes('+') ? '#10B981' : '#5B6B7D', 
                    fontSize: '14px', 
                    marginTop: '8px',
                    fontWeight: '500' 
                  }}>
                    {item.change}
                  </p>
                </div>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: `${item.color}15`,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <item.icon size={24} color={item.color} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Orders with Timeline */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '32px',
          border: '1px solid #E6F4FF',
          boxShadow: '0 4px 12px rgba(0, 111, 238, 0.04)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0A051E' }}>
              Recent Orders
            </h2>
            <button
              onClick={() => router.push('/customer/orders')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: '#006FEE',
                fontSize: '14px',
                fontWeight: '600',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#0059D1'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#006FEE'}
            >
              View all orders
              <ChevronRight size={16} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {recentOrders.map((order, index) => (
              <div
                key={order.id}
                style={{
                  position: 'relative',
                  padding: '20px',
                  paddingLeft: '40px',
                  border: '1px solid #E6F4FF',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  background: hoveredCard === order.id ? '#F8FBFF' : 'white'
                }}
                onMouseEnter={() => handleMouseEnter(order.id)}
                onMouseLeave={handleMouseLeave}
                onClick={() => router.push(`/customer/orders/${order.id}`)}
              >
                {/* Timeline dot */}
                <div style={{
                  position: 'absolute',
                  left: '16px',
                  top: '28px',
                  width: '12px',
                  height: '12px',
                  backgroundColor: getStatusColor(order.status).color,
                  borderRadius: '50%',
                  border: '3px solid white',
                  boxShadow: '0 0 0 4px ' + getStatusColor(order.status).bg
                }} />
                
                {/* Timeline line */}
                {index < recentOrders.length - 1 && (
                  <div style={{
                    position: 'absolute',
                    left: '21px',
                    top: '52px',
                    width: '2px',
                    height: 'calc(100% + 16px)',
                    backgroundColor: '#E6F4FF'
                  }} />
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                      <span style={{ fontWeight: '700', color: '#0A051E', fontSize: '16px' }}>{order.id}</span>
                      <span style={{ fontSize: '14px', color: '#5B6B7D' }}>{order.date}</span>
                    </div>
                    <p style={{ fontSize: '14px', color: '#5B6B7D', marginBottom: '12px' }}>
                      {order.items.join(', ')}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <p style={{ fontSize: '20px', fontWeight: '700', color: '#0A051E' }}>
                        ${order.total.toFixed(2)}
                      </p>
                      <span style={{
                        backgroundColor: '#E6F9F0',
                        color: '#059669',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '13px',
                        fontWeight: '600'
                      }}>
                        Saved ${order.savings.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{
                      padding: '6px 16px',
                      borderRadius: '20px',
                      fontSize: '14px',
                      fontWeight: '600',
                      backgroundColor: getStatusColor(order.status).bg,
                      color: getStatusColor(order.status).color
                    }}>
                      {order.status}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        console.log('Reorder:', order.id)
                      }}
                      style={{
                        backgroundColor: '#006FEE',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#0059D1'
                        e.currentTarget.style.transform = 'translateY(-1px)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#006FEE'
                        e.currentTarget.style.transform = 'translateY(0)'
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

        {/* Favorite Products with enhanced cards */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '32px',
          border: '1px solid #E6F4FF',
          boxShadow: '0 4px 12px rgba(0, 111, 238, 0.04)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0A051E' }}>
              Favorite Products
            </h2>
            <button
              onClick={() => router.push('/customer/favorites')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: '#006FEE',
                fontSize: '14px',
                fontWeight: '600',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#0059D1'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#006FEE'}
            >
              View all favorites
              <ChevronRight size={16} />
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '20px'
          }}>
            {favoriteProducts.map(product => (
              <div
                key={product.id}
                style={{
                  padding: '20px',
                  border: '1px solid #E6F4FF',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  background: hoveredCard === product.id ? '#F8FBFF' : 'white'
                }}
                onMouseEnter={() => handleMouseEnter(product.id)}
                onMouseLeave={handleMouseLeave}
              >
                <div style={{ display: 'flex', alignItems: 'start', gap: '16px' }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, #E6F4FF 0%, #F0F9FF 100%)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '40px',
                    border: '1px solid #E6F4FF'
                  }}>
                    {product.image}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                      <div>
                        <p style={{ fontWeight: '700', color: '#0A051E', fontSize: '16px', marginBottom: '4px' }}>
                          {product.name}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Star size={14} fill="#FFB800" color="#FFB800" />
                            <span style={{ fontSize: '14px', color: '#5B6B7D', fontWeight: '500' }}>
                              {product.rating}
                            </span>
                          </div>
                          <span style={{ fontSize: '14px', color: '#9CA3AF' }}>
                            ({product.reviews} reviews)
                          </span>
                        </div>
                      </div>
                      <span style={{
                        fontSize: '13px',
                        color: product.stock === 'In Stock' ? '#10B981' : '#F59E0B',
                        fontWeight: '600',
                        backgroundColor: product.stock === 'In Stock' ? '#E6F9F0' : '#FEF3C7',
                        padding: '4px 12px',
                        borderRadius: '20px'
                      }}>
                        {product.stock}
                      </span>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '12px' }}>
                      <p style={{ fontSize: '24px', fontWeight: '800', color: '#0A051E' }}>
                        ${product.price.toFixed(2)}
                      </p>
                      <p style={{ fontSize: '16px', color: '#9CA3AF', textDecoration: 'line-through' }}>
                        ${product.originalPrice.toFixed(2)}
                      </p>
                      <span style={{
                        backgroundColor: '#FFE6E6',
                        color: '#DC2626',
                        padding: '2px 8px',
                        borderRadius: '16px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>
                        -${product.savings.toFixed(0)}
                      </span>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          console.log('Add to cart:', product.id)
                        }}
                        style={{
                          flex: 1,
                          backgroundColor: '#006FEE',
                          color: 'white',
                          padding: '10px 16px',
                          borderRadius: '8px',
                          border: 'none',
                          cursor: 'pointer',
                          fontWeight: '600',
                          fontSize: '14px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#0059D1'
                          e.currentTarget.style.transform = 'translateY(-1px)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#006FEE'
                          e.currentTarget.style.transform = 'translateY(0)'
                        }}
                      >
                        <Plus size={16} />
                        Add to Cart
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          console.log('View details:', product.id)
                        }}
                        style={{
                          padding: '10px',
                          backgroundColor: '#F0F9FF',
                          border: '1px solid #E6F4FF',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#E6F4FF'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#F0F9FF'
                        }}
                      >
                        <Eye size={16} color="#006FEE" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions with gradient cards */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '24px',
          border: '1px solid #E6F4FF',
          boxShadow: '0 4px 12px rgba(0, 111, 238, 0.04)'
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0A051E', marginBottom: '24px' }}>
            Quick Actions
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px'
          }}>
            {[
              {
                title: 'Track Orders',
                icon: Truck,
                gradient: 'linear-gradient(135deg, #F3E6FF 0%, #F9F0FF 100%)',
                color: '#7C3AED',
                href: '/customer/orders'
              },
              {
                title: 'Browse Products',
                icon: Package,
                gradient: 'linear-gradient(135deg, #E6F4FF 0%, #F0F9FF 100%)',
                color: '#3B82F6',
                href: '/customer/products'
              },
              {
                title: 'Rewards Center',
                icon: Award,
                gradient: 'linear-gradient(135deg, #FFF7E6 0%, #FFF9F0 100%)',
                color: '#F59E0B',
                href: '/customer/rewards'
              },
              {
                title: 'Support Center',
                icon: Shield,
                gradient: 'linear-gradient(135deg, #E6FFF9 0%, #F0FFF8 100%)',
                color: '#10B981',
                href: '/customer/support'
              }
            ].map(action => (
              <button
                key={action.title}
                onClick={() => router.push(action.href)}
                style={{
                  padding: '24px',
                  border: `1px solid ${action.color}20`,
                  borderRadius: '12px',
                  background: action.gradient,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px',
                  transform: hoveredCard === action.title ? 'translateY(-4px)' : 'translateY(0)',
                  boxShadow: hoveredCard === action.title 
                    ? `0 12px 24px ${action.color}20` 
                    : '0 4px 12px rgba(0, 0, 0, 0.04)'
                }}
                onMouseEnter={() => handleMouseEnter(action.title)}
                onMouseLeave={handleMouseLeave}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: action.color + '15',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <action.icon size={24} color={action.color} />
                </div>
                <span style={{ color: '#0A051E', fontWeight: '600', fontSize: '16px' }}>
                  {action.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => router.push('/customer/chat')}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#006FEE',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(0, 111, 238, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          zIndex: 1000
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)'
          e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 111, 238, 0.4)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)'
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 111, 238, 0.3)'
        }}
      >
        <Activity size={24} />
      </button>
    </div>
  )
}