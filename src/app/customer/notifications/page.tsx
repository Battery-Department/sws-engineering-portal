'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Bell,
  CheckCircle,
  AlertCircle,
  Info,
  Package,
  Wrench,
  FileText,
  Calendar,
  Clock,
  X,
  Check,
  Archive,
  Trash2,
  Filter,
  ChevronLeft,
  Settings,
  Train,
  MessageSquare,
  Star,
  TrendingUp
} from 'lucide-react'

interface Notification {
  id: string
  type: 'info' | 'success' | 'warning' | 'project' | 'message' | 'system'
  title: string
  message: string
  timestamp: Date
  read: boolean
  projectId?: string
  actionLabel?: string
  actionUrl?: string
}

export default function CustomerNotificationsPage() {
  const router = useRouter()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [filter, setFilter] = useState<'all' | 'unread' | 'project' | 'system'>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading notifications
    setTimeout(() => {
      const mockNotifications: Notification[] = [
        {
          id: '1',
          type: 'success',
          title: 'Project Milestone Completed',
          message: 'Boiler pressure testing completed successfully for PROJ-2024-047',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          read: false,
          projectId: 'PROJ-2024-047',
          actionLabel: 'View Project',
          actionUrl: '/customer/projects/PROJ-2024-047'
        },
        {
          id: '2',
          type: 'message',
          title: 'New Message from Engineer',
          message: 'David Thompson has sent you an update about the locomotive restoration',
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
          read: false,
          projectId: 'PROJ-2024-047',
          actionLabel: 'Read Message',
          actionUrl: '/customer/messages/PROJ-2024-047'
        },
        {
          id: '3',
          type: 'project',
          title: 'Design Review Scheduled',
          message: 'CAD design review meeting scheduled for Jun 3, 2024 at 2:00 PM',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
          read: true,
          projectId: 'PROJ-2024-052',
          actionLabel: 'View Details',
          actionUrl: '/customer/projects/PROJ-2024-052'
        },
        {
          id: '4',
          type: 'warning',
          title: 'Invoice Payment Due Soon',
          message: 'Invoice SWSE-INV-2024-0031 payment due in 3 days',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          read: false,
          actionLabel: 'View Invoice',
          actionUrl: '/customer/invoice'
        },
        {
          id: '5',
          type: 'info',
          title: 'New Engineering Report Available',
          message: 'Monthly progress report for your steam locomotive project is ready',
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          read: true,
          projectId: 'PROJ-2024-047',
          actionLabel: 'Download Report',
          actionUrl: '/customer/documents/PROJ-2024-047'
        },
        {
          id: '6',
          type: 'success',
          title: 'Project Photos Updated',
          message: '12 new progress photos added to your project gallery',
          timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
          read: true,
          projectId: 'PROJ-2024-047',
          actionLabel: 'View Gallery',
          actionUrl: '/customer/projects/PROJ-2024-047#gallery'
        },
        {
          id: '7',
          type: 'system',
          title: 'System Maintenance Complete',
          message: 'Portal maintenance completed successfully. All services are operational.',
          timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          read: true
        },
        {
          id: '8',
          type: 'project',
          title: 'Material Procurement Update',
          message: 'Special order brass fittings have arrived for your project',
          timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
          read: true,
          projectId: 'PROJ-2024-055',
          actionLabel: 'View Update',
          actionUrl: '/customer/projects/PROJ-2024-055'
        }
      ]
      setNotifications(mockNotifications)
      setLoading(false)
    }, 1000)
  }, [])

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return CheckCircle
      case 'warning': return AlertCircle
      case 'info': return Info
      case 'project': return Train
      case 'message': return MessageSquare
      case 'system': return Settings
      default: return Bell
    }
  }

  const getIconColor = (type: string) => {
    switch (type) {
      case 'success': return '#10B981'
      case 'warning': return '#F59E0B'
      case 'info': return '#3B82F6'
      case 'project': return '#7C3AED'
      case 'message': return '#EC4899'
      case 'system': return '#6B7280'
      default: return '#6B7280'
    }
  }

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    )
  }

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id))
  }

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'all') return true
    if (filter === 'unread') return !notif.read
    if (filter === 'project') return notif.type === 'project'
    if (filter === 'system') return notif.type === 'system'
    return true
  })

  const unreadCount = notifications.filter(n => !n.read).length

  const formatTimestamp = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)

    if (hours < 1) return 'Just now'
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`
    if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#F8FAFC'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '4px solid #E5E7EB',
            borderTop: '4px solid #006FEE',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px auto'
          }}></div>
          <p style={{ color: '#6B7280' }}>Loading notifications...</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #E5E7EB',
        padding: '24px',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button
                onClick={() => router.push('/customer/dashboard')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  backgroundColor: 'white',
                  border: '2px solid #E5E7EB',
                  borderRadius: '8px',
                  color: '#006FEE',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#006FEE'
                  e.currentTarget.style.backgroundColor = '#EFF6FF'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#E5E7EB'
                  e.currentTarget.style.backgroundColor = 'white'
                }}
              >
                <ChevronLeft size={16} />
                Back to Dashboard
              </button>
            </div>
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#111827', margin: 0 }}>
                Notifications
              </h1>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: 'white',
                    border: '2px solid #E5E7EB',
                    borderRadius: '8px',
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
                    e.currentTarget.style.borderColor = '#006FEE'
                    e.currentTarget.style.color = '#006FEE'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#E5E7EB'
                    e.currentTarget.style.color = '#374151'
                  }}
                >
                  <Check size={16} />
                  Mark all as read
                </button>
              )}
              <div style={{
                padding: '8px 16px',
                backgroundColor: unreadCount > 0 ? '#FEE2E2' : '#F3F4F6',
                borderRadius: '8px',
                color: unreadCount > 0 ? '#EF4444' : '#6B7280',
                fontWeight: '600'
              }}>
                {unreadCount} unread
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {(['all', 'unread', 'project', 'system'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: filter === tab ? '#006FEE' : 'white',
                  color: filter === tab ? 'white' : '#6B7280',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textTransform: 'capitalize'
                }}
              >
                {tab === 'all' ? 'All' : tab === 'unread' ? 'Unread' : tab === 'project' ? 'Projects' : 'System'}
                <span style={{
                  marginLeft: '6px',
                  padding: '2px 6px',
                  backgroundColor: filter === tab ? 'rgba(255,255,255,0.2)' : '#F3F4F6',
                  borderRadius: '12px',
                  fontSize: '12px'
                }}>
                  {tab === 'all' ? notifications.length :
                   tab === 'unread' ? notifications.filter(n => !n.read).length :
                   tab === 'project' ? notifications.filter(n => n.type === 'project').length :
                   notifications.filter(n => n.type === 'system').length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        {filteredNotifications.length === 0 ? (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '48px',
            textAlign: 'center',
            border: '2px solid #E5E7EB'
          }}>
            <Bell size={48} color="#D1D5DB" style={{ margin: '0 auto 16px auto' }} />
            <h3 style={{ fontSize: '18px', fontWeight: '500', color: '#111827', margin: '0 0 8px 0' }}>
              No notifications
            </h3>
            <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>
              {filter === 'unread' ? "You're all caught up!" : `No ${filter} notifications to display.`}
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filteredNotifications.map(notification => {
              const Icon = getIcon(notification.type)
              const iconColor = getIconColor(notification.type)

              return (
                <div
                  key={notification.id}
                  style={{
                    backgroundColor: notification.read ? 'white' : '#F0F9FF',
                    borderRadius: '12px',
                    padding: '20px',
                    border: `2px solid ${notification.read ? '#E5E7EB' : '#BFDBFE'}`,
                    position: 'relative',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 111, 238, 0.1)'
                    e.currentTarget.style.transform = 'translateY(-1px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      backgroundColor: `${iconColor}15`,
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Icon size={24} color={iconColor} />
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                        <h3 style={{
                          fontSize: '16px',
                          fontWeight: '600',
                          color: '#111827',
                          margin: 0
                        }}>
                          {notification.title}
                          {!notification.read && (
                            <span style={{
                              display: 'inline-block',
                              width: '8px',
                              height: '8px',
                              backgroundColor: '#EF4444',
                              borderRadius: '50%',
                              marginLeft: '8px'
                            }} />
                          )}
                        </h3>
                        <span style={{
                          fontSize: '13px',
                          color: '#6B7280'
                        }}>
                          {formatTimestamp(notification.timestamp)}
                        </span>
                      </div>

                      <p style={{
                        fontSize: '14px',
                        color: '#374151',
                        marginBottom: '12px',
                        lineHeight: '1.5'
                      }}>
                        {notification.message}
                      </p>

                      {notification.projectId && (
                        <div style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '4px 10px',
                          backgroundColor: '#EFF6FF',
                          borderRadius: '6px',
                          fontSize: '12px',
                          color: '#006FEE',
                          fontWeight: '500',
                          marginBottom: '12px'
                        }}>
                          <Package size={12} />
                          {notification.projectId}
                        </div>
                      )}

                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        {notification.actionUrl && (
                          <button
                            onClick={() => router.push(notification.actionUrl!)}
                            style={{
                              padding: '8px 16px',
                              backgroundColor: '#006FEE',
                              border: 'none',
                              borderRadius: '6px',
                              color: 'white',
                              fontSize: '13px',
                              fontWeight: '500',
                              cursor: 'pointer',
                              transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#0056CC'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = '#006FEE'
                            }}
                          >
                            {notification.actionLabel}
                          </button>
                        )}

                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            style={{
                              padding: '8px',
                              backgroundColor: 'white',
                              border: '1px solid #E5E7EB',
                              borderRadius: '6px',
                              color: '#6B7280',
                              fontSize: '12px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = '#006FEE'
                              e.currentTarget.style.color = '#006FEE'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = '#E5E7EB'
                              e.currentTarget.style.color = '#6B7280'
                            }}
                          >
                            <Check size={14} />
                            Mark as read
                          </button>
                        )}

                        <button
                          onClick={() => deleteNotification(notification.id)}
                          style={{
                            padding: '8px',
                            backgroundColor: 'white',
                            border: '1px solid #E5E7EB',
                            borderRadius: '6px',
                            color: '#6B7280',
                            fontSize: '12px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            transition: 'all 0.2s',
                            marginLeft: 'auto'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#EF4444'
                            e.currentTarget.style.color = '#EF4444'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = '#E5E7EB'
                            e.currentTarget.style.color = '#6B7280'
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}