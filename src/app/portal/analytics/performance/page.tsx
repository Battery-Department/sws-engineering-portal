'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Activity,
  TrendingUp,
  TrendingDown,
  Target,
  Zap,
  Clock,
  Users,
  Award,
  BarChart3,
  PieChart,
  LineChart,
  DollarSign,
  Package,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Eye,
  Settings,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  Maximize2,
  MoreVertical,
  Star,
  ThumbsUp,
  FileText,
  Timer,
  Gauge
} from 'lucide-react';

interface PerformanceMetric {
  id: string;
  name: string;
  value: number;
  target: number;
  unit: string;
  trend: number;
  period: string;
  status: 'excellent' | 'good' | 'warning' | 'poor';
  description: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  efficiency: number;
  projectsCompleted: number;
  averageRating: number;
  onTimeDelivery: number;
  utilizationRate: number;
  skillLevel: number;
}

interface Department {
  id: string;
  name: string;
  efficiency: number;
  capacity: number;
  utilization: number;
  revenue: number;
  projects: number;
  avgDeliveryTime: number;
}

export default function PerformancePage() {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('month');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'overview' | 'team' | 'departments'>('overview');

  // Mock Performance Metrics
  const mockMetrics: PerformanceMetric[] = [
    {
      id: 'efficiency',
      name: 'Overall Efficiency',
      value: 87.5,
      target: 85,
      unit: '%',
      trend: 5.2,
      period: 'vs last month',
      status: 'excellent',
      description: 'Project completion rate within estimated time'
    },
    {
      id: 'utilization',
      name: 'Resource Utilization',
      value: 78.3,
      target: 80,
      unit: '%',
      trend: -2.1,
      period: 'vs last month',
      status: 'warning',
      description: 'Workshop and team capacity usage'
    },
    {
      id: 'quality',
      name: 'Quality Score',
      value: 9.2,
      target: 9.0,
      unit: '/10',
      trend: 0.3,
      period: 'vs last month',
      status: 'excellent',
      description: 'Average client satisfaction rating'
    },
    {
      id: 'delivery',
      name: 'On-Time Delivery',
      value: 92,
      target: 90,
      unit: '%',
      trend: 3.5,
      period: 'vs last month',
      status: 'excellent',
      description: 'Projects delivered by original deadline'
    },
    {
      id: 'cost_variance',
      name: 'Cost Variance',
      value: 3.2,
      target: 5.0,
      unit: '%',
      trend: -1.8,
      period: 'vs last month',
      status: 'good',
      description: 'Average project cost overrun'
    },
    {
      id: 'profitability',
      name: 'Project Profitability',
      value: 23.7,
      target: 20,
      unit: '%',
      trend: 2.1,
      period: 'vs last month',
      status: 'excellent',
      description: 'Average profit margin across projects'
    }
  ];

  // Mock Team Performance Data
  const mockTeam: TeamMember[] = [
    {
      id: 'tm1',
      name: 'Mike Thompson',
      role: 'Senior Engineer',
      efficiency: 92,
      projectsCompleted: 8,
      averageRating: 9.4,
      onTimeDelivery: 95,
      utilizationRate: 88,
      skillLevel: 95
    },
    {
      id: 'tm2',
      name: 'Sarah Williams',
      role: 'Mechanical Specialist',
      efficiency: 89,
      projectsCompleted: 6,
      averageRating: 9.1,
      onTimeDelivery: 92,
      utilizationRate: 85,
      skillLevel: 88
    },
    {
      id: 'tm3',
      name: 'Tom Harrison',
      role: 'Fabrication Lead',
      efficiency: 85,
      projectsCompleted: 7,
      averageRating: 8.8,
      onTimeDelivery: 89,
      utilizationRate: 82,
      skillLevel: 85
    },
    {
      id: 'tm4',
      name: 'Emma Davis',
      role: 'CAD Designer',
      efficiency: 94,
      projectsCompleted: 12,
      averageRating: 9.3,
      onTimeDelivery: 98,
      utilizationRate: 91,
      skillLevel: 92
    }
  ];

  // Mock Department Data
  const mockDepartments: Department[] = [
    {
      id: 'engineering',
      name: 'Engineering',
      efficiency: 91,
      capacity: 40,
      utilization: 87,
      revenue: 145000,
      projects: 12,
      avgDeliveryTime: 45
    },
    {
      id: 'fabrication',
      name: 'Fabrication',
      efficiency: 84,
      capacity: 30,
      utilization: 78,
      revenue: 95000,
      projects: 8,
      avgDeliveryTime: 38
    },
    {
      id: 'design',
      name: 'CAD Design',
      efficiency: 96,
      capacity: 20,
      utilization: 92,
      revenue: 45000,
      projects: 15,
      avgDeliveryTime: 12
    },
    {
      id: 'quality',
      name: 'Quality Control',
      efficiency: 88,
      capacity: 15,
      utilization: 68,
      revenue: 25000,
      projects: 35,
      avgDeliveryTime: 3
    }
  ];

  // Performance trend data (mock)
  const weeklyTrend = [
    { week: 'W1', efficiency: 85, quality: 8.9, delivery: 88 },
    { week: 'W2', efficiency: 87, quality: 9.1, delivery: 91 },
    { week: 'W3', efficiency: 86, quality: 9.0, delivery: 89 },
    { week: 'W4', efficiency: 89, quality: 9.3, delivery: 94 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return '#10B981';
      case 'good': return '#3B82F6';
      case 'warning': return '#F59E0B';
      case 'poor': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <CheckCircle size={20} />;
      case 'good': return <ThumbsUp size={20} />;
      case 'warning': return <AlertTriangle size={20} />;
      case 'poor': return <AlertTriangle size={20} />;
      default: return <Activity size={20} />;
    }
  };

  const formatTrend = (trend: number) => {
    const isPositive = trend > 0;
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        color: isPositive ? '#10B981' : '#EF4444'
      }}>
        {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
        <span>{Math.abs(trend).toFixed(1)}%</span>
      </div>
    );
  };

  return (
    <div style={{ padding: '32px', backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #006FEE 0%, #0050B3 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 16px rgba(0, 111, 238, 0.2)'
            }}>
              <Activity size={24} color="white" />
            </div>
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#111827', margin: 0 }}>
                Performance Analytics
              </h1>
              <p style={{ fontSize: '16px', color: '#6B7280', margin: 0 }}>
                Monitor efficiency, track KPIs, and optimize team performance
              </p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                fontSize: '14px',
                backgroundColor: 'white',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                fontSize: '14px',
                backgroundColor: 'white',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="all">All Departments</option>
              <option value="engineering">Engineering</option>
              <option value="fabrication">Fabrication</option>
              <option value="design">CAD Design</option>
              <option value="quality">Quality Control</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ display: 'flex', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
              <button
                onClick={() => setViewMode('overview')}
                style={{
                  padding: '8px 16px',
                  border: 'none',
                  backgroundColor: viewMode === 'overview' ? '#006FEE' : 'transparent',
                  color: viewMode === 'overview' ? 'white' : '#6B7280',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Overview
              </button>
              <button
                onClick={() => setViewMode('team')}
                style={{
                  padding: '8px 16px',
                  border: 'none',
                  backgroundColor: viewMode === 'team' ? '#006FEE' : 'transparent',
                  color: viewMode === 'team' ? 'white' : '#6B7280',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Team
              </button>
              <button
                onClick={() => setViewMode('departments')}
                style={{
                  padding: '8px 16px',
                  border: 'none',
                  backgroundColor: viewMode === 'departments' ? '#006FEE' : 'transparent',
                  color: viewMode === 'departments' ? 'white' : '#6B7280',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Departments
              </button>
            </div>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                border: '1px solid #E5E7EB',
                backgroundColor: 'white',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <Download size={16} />
              Export
            </button>
          </div>
        </div>

        {viewMode === 'overview' && (
          <>
            {/* Key Performance Indicators */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
              marginBottom: '32px'
            }}>
              {mockMetrics.map(metric => (
                <div
                  key={metric.id}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    padding: '24px',
                    border: '1px solid #E5E7EB',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div>
                      <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: '0 0 4px 0' }}>
                        {metric.name}
                      </h3>
                      <p style={{ fontSize: '12px', color: '#6B7280', margin: 0 }}>
                        {metric.description}
                      </p>
                    </div>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: `${getStatusColor(metric.status)}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: getStatusColor(metric.status)
                    }}>
                      {getStatusIcon(metric.status)}
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '8px' }}>
                      <span style={{ fontSize: '32px', fontWeight: '700', color: '#111827' }}>
                        {metric.value}
                      </span>
                      <span style={{ fontSize: '16px', color: '#6B7280' }}>
                        {metric.unit}
                      </span>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: '14px', color: '#6B7280' }}>
                        Target: {metric.target}{metric.unit}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {formatTrend(metric.trend)}
                        <span style={{ fontSize: '12px', color: '#6B7280' }}>
                          {metric.period}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div style={{ marginBottom: '8px' }}>
                    <div style={{
                      width: '100%',
                      height: '8px',
                      backgroundColor: '#F3F4F6',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${Math.min((metric.value / metric.target) * 100, 100)}%`,
                        height: '100%',
                        backgroundColor: getStatusColor(metric.status),
                        transition: 'width 0.3s ease'
                      }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Performance Trend Chart */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              border: '1px solid #E5E7EB',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
              padding: '24px',
              marginBottom: '32px'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '24px' }}>
                Performance Trends
              </h3>
              
              {/* Simple line chart representation */}
              <div style={{ height: '240px', display: 'flex', alignItems: 'end', gap: '24px', padding: '0 12px' }}>
                {weeklyTrend.map((data, index) => (
                  <div key={data.week} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: '100%', height: '200px', position: 'relative', marginBottom: '16px' }}>
                      {/* Efficiency line */}
                      <div style={{
                        position: 'absolute',
                        bottom: `${(data.efficiency - 80) * 4}px`,
                        left: '10%',
                        width: '8px',
                        height: '8px',
                        backgroundColor: '#006FEE',
                        borderRadius: '50%'
                      }} />
                      
                      {/* Quality line */}
                      <div style={{
                        position: 'absolute',
                        bottom: `${(data.quality - 8) * 80}px`,
                        left: '45%',
                        width: '8px',
                        height: '8px',
                        backgroundColor: '#10B981',
                        borderRadius: '50%'
                      }} />
                      
                      {/* Delivery line */}
                      <div style={{
                        position: 'absolute',
                        bottom: `${(data.delivery - 80) * 4}px`,
                        left: '80%',
                        width: '8px',
                        height: '8px',
                        backgroundColor: '#F59E0B',
                        borderRadius: '50%'
                      }} />
                    </div>
                    
                    <div style={{ fontSize: '12px', color: '#6B7280' }}>
                      {data.week}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Legend */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '12px', height: '12px', backgroundColor: '#006FEE', borderRadius: '50%' }} />
                  <span style={{ fontSize: '12px', color: '#6B7280' }}>Efficiency</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '12px', height: '12px', backgroundColor: '#10B981', borderRadius: '50%' }} />
                  <span style={{ fontSize: '12px', color: '#6B7280' }}>Quality</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '12px', height: '12px', backgroundColor: '#F59E0B', borderRadius: '50%' }} />
                  <span style={{ fontSize: '12px', color: '#6B7280' }}>Delivery</span>
                </div>
              </div>
            </div>
          </>
        )}

        {viewMode === 'team' && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            border: '1px solid #E5E7EB',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: '24px 24px 0 24px',
              borderBottom: '1px solid #E5E7EB'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: '0 0 24px 0' }}>
                Team Performance
              </h3>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr 1fr 80px',
              padding: '16px 24px',
              borderBottom: '1px solid #E5E7EB',
              backgroundColor: '#F9FAFB',
              fontSize: '12px',
              fontWeight: '600',
              color: '#6B7280',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              <div>Team Member</div>
              <div>Efficiency</div>
              <div>Projects</div>
              <div>Rating</div>
              <div>On-Time</div>
              <div>Utilization</div>
              <div></div>
            </div>

            {mockTeam.map((member, index) => (
              <div
                key={member.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr 1fr 80px',
                  padding: '20px 24px',
                  borderBottom: index < mockTeam.length - 1 ? '1px solid #E5E7EB' : 'none',
                  alignItems: 'center',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F9FAFB';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: '#006FEE',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}>
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div style={{ fontWeight: '500', color: '#111827' }}>
                        {member.name}
                      </div>
                      <div style={{ fontSize: '13px', color: '#6B7280' }}>
                        {member.role}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div style={{ fontWeight: '500', color: '#111827', marginBottom: '4px' }}>
                    {member.efficiency}%
                  </div>
                  <div style={{
                    width: '60px',
                    height: '4px',
                    backgroundColor: '#F3F4F6',
                    borderRadius: '2px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${member.efficiency}%`,
                      height: '100%',
                      backgroundColor: member.efficiency >= 90 ? '#10B981' : member.efficiency >= 80 ? '#3B82F6' : '#F59E0B'
                    }} />
                  </div>
                </div>
                <div style={{ fontWeight: '500', color: '#111827' }}>
                  {member.projectsCompleted}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Star size={14} color="#F59E0B" fill="#F59E0B" />
                    <span style={{ fontWeight: '500', color: '#111827' }}>
                      {member.averageRating.toFixed(1)}
                    </span>
                  </div>
                </div>
                <div style={{ fontWeight: '500', color: member.onTimeDelivery >= 95 ? '#10B981' : '#111827' }}>
                  {member.onTimeDelivery}%
                </div>
                <div style={{ fontWeight: '500', color: '#111827' }}>
                  {member.utilizationRate}%
                </div>
                <div>
                  <button
                    style={{
                      padding: '6px',
                      borderRadius: '6px',
                      border: '1px solid #E5E7EB',
                      backgroundColor: 'white',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#F9FAFB';
                      e.currentTarget.style.borderColor = '#006FEE';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'white';
                      e.currentTarget.style.borderColor = '#E5E7EB';
                    }}
                  >
                    <Eye size={16} color="#6B7280" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {viewMode === 'departments' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '24px'
          }}>
            {mockDepartments.map(dept => (
              <div
                key={dept.id}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                  padding: '24px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: 0 }}>
                    {dept.name}
                  </h3>
                  <div style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    backgroundColor: dept.efficiency >= 90 ? '#D1FAE5' : dept.efficiency >= 80 ? '#DBEAFE' : '#FEF3C7',
                    color: dept.efficiency >= 90 ? '#10B981' : dept.efficiency >= 80 ? '#3B82F6' : '#F59E0B',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}>
                    {dept.efficiency}% Efficient
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                  <div>
                    <p style={{ fontSize: '12px', color: '#6B7280', margin: '0 0 4px 0' }}>Revenue</p>
                    <p style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: 0 }}>
                      £{(dept.revenue / 1000).toFixed(0)}k
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', color: '#6B7280', margin: '0 0 4px 0' }}>Projects</p>
                    <p style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: 0 }}>
                      {dept.projects}
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', color: '#6B7280', margin: '0 0 4px 0' }}>Utilization</p>
                    <p style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: 0 }}>
                      {dept.utilization}%
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', color: '#6B7280', margin: '0 0 4px 0' }}>Avg Delivery</p>
                    <p style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: 0 }}>
                      {dept.avgDeliveryTime}d
                    </p>
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '12px', color: '#6B7280' }}>Capacity Usage</span>
                    <span style={{ fontSize: '12px', color: '#6B7280' }}>
                      {Math.floor(dept.capacity * dept.utilization / 100)} / {dept.capacity}
                    </span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '8px',
                    backgroundColor: '#F3F4F6',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${dept.utilization}%`,
                      height: '100%',
                      backgroundColor: dept.utilization >= 90 ? '#EF4444' : dept.utilization >= 70 ? '#10B981' : '#3B82F6',
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                </div>

                <button
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #E5E7EB',
                    backgroundColor: 'white',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#F9FAFB';
                    e.currentTarget.style.borderColor = '#006FEE';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.borderColor = '#E5E7EB';
                  }}
                >
                  <Eye size={16} />
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}