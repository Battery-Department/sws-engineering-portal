'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Package,
  TrendingUp,
  Clock,
  Settings2,
  Plus,
  Minus,
  Heart,
  Eye,
  PoundSterling,
  Train,
  Cog,
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
  AlertCircle,
  Calculator,
  FileText,
  Grid,
  Download,
  X,
  Trash2,
  CheckCircle,
  Factory,
  Calendar,
  User,
  MessageSquare,
  FolderOpen,
  Wrench,
  Settings,
  Gauge,
  Camera
} from 'lucide-react'

export default function CustomerDashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState({
    name: 'James Mitchell',
    email: 'james@heritagerailways.co.uk',
    tier: 'Premium Partner',
    totalProjects: 12
  })

  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('overview')

  const stats = {
    activeProjects: 3,
    completedProjects: 47,
    totalInvestment: 285000,
    engineeringHours: 1240
  }

  const activeProjects = [
    {
      id: 'PROJ-2024-047',
      name: '7¼" Gauge Steam Locomotive Restoration',
      customer: 'Bodmin & Wenford Railway',
      status: 'Manufacturing',
      phase: 'Boiler assembly in progress',
      progress: 65,
      startDate: 'Mar 12, 2024',
      targetDate: 'Aug 30, 2024',
      engineer: 'David Thompson',
      type: 'steam',
      investment: 45000.00,
      nextMilestone: 'Boiler pressure testing - Jun 15'
    },
    {
      id: 'PROJ-2024-052',
      name: 'Pump House Machinery Overhaul',
      customer: 'Cornwall Mining Heritage',
      status: 'Design',
      phase: 'CAD modeling complete, awaiting approval',
      progress: 25,
      startDate: 'May 5, 2024',
      targetDate: 'Jul 20, 2024',
      engineer: 'Sarah Williams',
      type: 'machinery',
      investment: 12500.00,
      nextMilestone: 'Design review meeting - Jun 3'
    },
    {
      id: 'PROJ-2024-055',
      name: 'Custom Coupling Assembly Design',
      customer: 'Private Collector',
      status: 'Testing',
      phase: 'Field testing at client site',
      progress: 85,
      startDate: 'Apr 8, 2024',
      targetDate: 'Jun 10, 2024',
      engineer: 'Michael Brown',
      type: 'fabrication',
      investment: 8750.00,
      nextMilestone: 'Final delivery - Jun 10'
    }
  ]

  const recentActivity = [
    {
      id: 1,
      type: 'milestone',
      project: 'PROJ-2024-047',
      message: 'Cylinder machining completed',
      time: '2 hours ago',
      icon: CheckCircle,
      color: '#10B981'
    },
    {
      id: 2,
      type: 'document',
      project: 'PROJ-2024-052',
      message: 'CAD drawings v3.2 uploaded',
      time: '5 hours ago',
      icon: FileText,
      color: '#3B82F6'
    },
    {
      id: 3,
      type: 'message',
      project: 'PROJ-2024-055',
      message: 'Engineer update: Test results positive',
      time: 'Yesterday',
      icon: MessageSquare,
      color: '#7C3AED'
    },
    {
      id: 4,
      type: 'photo',
      project: 'PROJ-2024-047',
      message: '12 progress photos added',
      time: '2 days ago',
      icon: Camera,
      color: '#F59E0B'
    }
  ]

  const upcomingMilestones = [
    {
      project: 'PROJ-2024-047',
      milestone: 'Boiler pressure testing',
      date: 'Jun 15, 2024',
      daysUntil: 15
    },
    {
      project: 'PROJ-2024-052',
      milestone: 'Material procurement',
      date: 'Jun 20, 2024',
      daysUntil: 20
    },
    {
      project: 'PROJ-2024-055',
      milestone: 'Final delivery',
      date: 'Jun 10, 2024',
      daysUntil: 10
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
      case 'Design':
        return { bg: '#E0E7FF', color: '#4F46E5' }
      case 'Manufacturing':
        return { bg: '#FEF3C7', color: '#F59E0B' }
      case 'Testing':
        return { bg: '#E6F9F0', color: '#059669' }
      case 'Delivery':
        return { bg: '#F3E6FF', color: '#7C3AED' }
      default:
        return { bg: '#F3F4F6', color: '#6B7280' }
    }
  }

  const getProjectIcon = (type: string) => {
    switch (type) {
      case 'steam':
        return Train
      case 'machinery':
        return Factory
      case 'fabrication':
        return Wrench
      case 'cad':
        return Settings2
      default:
        return Cog
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
                Your South West Steam Engineering Project Portal
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
                  <p style={{ fontSize: '14px', opacity: 0.9 }}>Partnership Status</p>
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px'
          }}>
            {[
              { label: 'Active Projects', value: stats.activeProjects.toString(), icon: Cog, color: '#22C55E' },
              { label: 'Completed Projects', value: stats.completedProjects.toString(), icon: CheckCircle, color: '#3B82F6' },
              { label: 'Engineering Hours', value: stats.engineeringHours.toLocaleString(), icon: Clock, color: '#7C3AED' }
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
        
        {/* Quick Actions */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '32px'
        }}>
          {[
            {
              title: 'New Project Request',
              icon: Plus,
              color: '#3B82F6',
              href: '/customer/quiz'
            },
            {
              title: 'View All Projects',
              icon: FolderOpen,
              color: '#10B981',
              href: '/customer/projects'
            },
            {
              title: 'Browse Services',
              icon: Grid,
              color: '#F59E0B',
              href: '/customer/services'
            },
            {
              title: 'Documents',
              icon: Download,
              color: '#7C3AED',
              href: '/customer/documents'
            }
          ].map(action => (
            <button
              key={action.title}
              onClick={() => router.push(action.href)}
              style={{
                padding: '20px',
                border: 'none',
                borderRadius: '12px',
                backgroundColor: action.color,
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                fontSize: '16px',
                fontWeight: '600',
                boxShadow: `0 4px 12px ${action.color}30`,
                transform: hoveredCard === action.title ? 'translateY(-2px)' : 'translateY(0)'
              }}
              onMouseEnter={() => handleMouseEnter(action.title)}
              onMouseLeave={handleMouseLeave}
            >
              <action.icon size={20} />
              {action.title}
            </button>
          ))}
        </div>

        {/* Your Active Projects */}
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
              Your Active Projects
            </h2>
            <button
              onClick={() => router.push('/customer/projects')}
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
              View all projects
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Project Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
            gap: '20px'
          }}>
            {activeProjects.map(project => {
              const ProjectIcon = getProjectIcon(project.type)
              return (
                <div
                  key={project.id}
                  style={{
                    position: 'relative',
                    background: 'white',
                    border: '2px solid #E6F4FF',
                    borderRadius: '12px',
                    padding: '24px',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    transform: hoveredCard === project.id ? 'translateY(-4px)' : 'translateY(0)',
                    boxShadow: hoveredCard === project.id 
                      ? '0 12px 24px rgba(0, 111, 238, 0.15)' 
                      : '0 4px 12px rgba(0, 0, 0, 0.04)'
                  }}
                  onMouseEnter={() => handleMouseEnter(project.id)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => router.push(`/customer/projects/${project.id}`)}
                >
                  {/* Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ fontWeight: '700', fontSize: '16px', color: '#006FEE' }}>
                          {project.id}
                        </span>
                        <span style={{
                          padding: '4px 10px',
                          borderRadius: '16px',
                          fontSize: '12px',
                          fontWeight: '600',
                          backgroundColor: getStatusColor(project.status).bg,
                          color: getStatusColor(project.status).color
                        }}>
                          {project.status}
                        </span>
                      </div>
                      <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0A051E', marginBottom: '4px' }}>
                        {project.name}
                      </h3>
                      <p style={{ fontSize: '14px', color: '#5B6B7D' }}>
                        {project.customer}
                      </p>
                    </div>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      background: 'linear-gradient(135deg, #E6F4FF 0%, #F0F9FF 100%)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <ProjectIcon size={24} color="#006FEE" />
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '13px', color: '#5B6B7D' }}>Progress</span>
                      <span style={{ fontSize: '13px', fontWeight: '600', color: '#0A051E' }}>{project.progress}%</span>
                    </div>
                    <div style={{
                      height: '8px',
                      backgroundColor: '#F3F4F6',
                      borderRadius: '100px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        height: '100%',
                        width: `${project.progress}%`,
                        backgroundColor: project.progress >= 75 ? '#10B981' : project.progress >= 50 ? '#F59E0B' : '#3B82F6',
                        transition: 'width 0.3s ease'
                      }} />
                    </div>
                    <p style={{ fontSize: '13px', color: '#5B6B7D', marginTop: '8px' }}>
                      {project.phase}
                    </p>
                  </div>

                  {/* Project Details */}
                  <div style={{ marginBottom: '16px', fontSize: '14px', color: '#5B6B7D' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <Calendar size={14} />
                      <span>Target: {project.targetDate}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <User size={14} />
                      <span>Engineer: {project.engineer}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <AlertCircle size={14} />
                      <span>{project.nextMilestone}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '8px'
                  }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        router.push(`/customer/projects/${project.id}`)
                      }}
                      style={{
                        padding: '8px',
                        border: '1px solid #E6F4FF',
                        borderRadius: '8px',
                        backgroundColor: 'white',
                        color: '#006FEE',
                        fontSize: '13px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#F0F9FF'
                        e.currentTarget.style.borderColor = '#006FEE'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'white'
                        e.currentTarget.style.borderColor = '#E6F4FF'
                      }}
                    >
                      <Eye size={14} />
                      Details
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        router.push(`/customer/messages/${project.id}`)
                      }}
                      style={{
                        padding: '8px',
                        border: '1px solid #E6F4FF',
                        borderRadius: '8px',
                        backgroundColor: 'white',
                        color: '#006FEE',
                        fontSize: '13px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#F0F9FF'
                        e.currentTarget.style.borderColor = '#006FEE'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'white'
                        e.currentTarget.style.borderColor = '#E6F4FF'
                      }}
                    >
                      <MessageSquare size={14} />
                      Message
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        router.push(`/customer/documents/${project.id}`)
                      }}
                      style={{
                        padding: '8px',
                        border: '1px solid #E6F4FF',
                        borderRadius: '8px',
                        backgroundColor: 'white',
                        color: '#006FEE',
                        fontSize: '13px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#F0F9FF'
                        e.currentTarget.style.borderColor = '#006FEE'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'white'
                        e.currentTarget.style.borderColor = '#E6F4FF'
                      }}
                    >
                      <FolderOpen size={14} />
                      Docs
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Two Column Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {/* Recent Activity */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid #E6F4FF',
            boxShadow: '0 4px 12px rgba(0, 111, 238, 0.04)'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0A051E', marginBottom: '20px' }}>
              Recent Activity
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {recentActivity.map((activity) => {
                const IconComponent = activity.icon
                return (
                  <div
                    key={activity.id}
                    style={{
                      display: 'flex',
                      gap: '12px',
                      padding: '12px',
                      borderRadius: '8px',
                      backgroundColor: '#F8FAFC',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#F0F9FF'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#F8FAFC'
                    }}
                  >
                    <div style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: `${activity.color}15`,
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <IconComponent size={20} color={activity.color} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '14px', fontWeight: '600', color: '#0A051E', marginBottom: '2px' }}>
                        {activity.project}
                      </p>
                      <p style={{ fontSize: '13px', color: '#5B6B7D', marginBottom: '4px' }}>
                        {activity.message}
                      </p>
                      <p style={{ fontSize: '12px', color: '#9CA3AF' }}>
                        {activity.time}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Upcoming Milestones */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid #E6F4FF',
            boxShadow: '0 4px 12px rgba(0, 111, 238, 0.04)'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0A051E', marginBottom: '20px' }}>
              Upcoming Milestones
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {upcomingMilestones.map((milestone, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '16px',
                    borderRadius: '8px',
                    border: '1px solid #E6F4FF',
                    backgroundColor: milestone.daysUntil <= 7 ? '#FEF3C7' : 'white',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: '600', color: '#006FEE', marginBottom: '4px' }}>
                      {milestone.project}
                    </p>
                    <p style={{ fontSize: '14px', color: '#0A051E' }}>
                      {milestone.milestone}
                    </p>
                    <p style={{ fontSize: '12px', color: '#5B6B7D', marginTop: '4px' }}>
                      {milestone.date}
                    </p>
                  </div>
                  <div style={{
                    padding: '8px 16px',
                    borderRadius: '20px',
                    backgroundColor: milestone.daysUntil <= 7 ? '#F59E0B' : '#E6F4FF',
                    color: milestone.daysUntil <= 7 ? 'white' : '#006FEE',
                    fontSize: '13px',
                    fontWeight: '600'
                  }}>
                    {milestone.daysUntil} days
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}