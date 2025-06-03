'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  PieChart,
  Activity,
  Calendar,
  Clock,
  DollarSign,
  Users,
  Target,
  AlertTriangle,
  CheckCircle,
  Package,
  FileText,
  Filter,
  Download,
  Eye,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Award,
  MapPin,
  Settings,
  Layers,
  Maximize2,
  MoreVertical
} from 'lucide-react';

interface ProjectMetrics {
  id: string;
  projectName: string;
  clientName: string;
  category: string;
  status: 'active' | 'completed' | 'on_hold' | 'cancelled';
  startDate: string;
  endDate?: string;
  estimatedDuration: number;
  actualDuration: number;
  budgetOriginal: number;
  budgetCurrent: number;
  costActual: number;
  profitMargin: number;
  timeOverrun: number;
  budgetVariance: number;
  completionPercentage: number;
  teamSize: number;
  milestones: {
    total: number;
    completed: number;
  };
  riskScore: number;
  clientSatisfaction: number;
}

interface AnalyticsFilter {
  period: 'week' | 'month' | 'quarter' | 'year' | 'all';
  category: string;
  status: string;
  client: string;
}

export default function ProjectAnalyticsPage() {
  const [filters, setFilters] = useState<AnalyticsFilter>({
    period: 'month',
    category: 'all',
    status: 'all',
    client: 'all'
  });
  const [selectedMetric, setSelectedMetric] = useState<string>('revenue');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  // Mock data
  const mockProjects: ProjectMetrics[] = [
    {
      id: 'PRJ-001',
      projectName: 'GWR 4900 Hall Class Boiler Restoration',
      clientName: 'Didcot Railway Centre',
      category: 'Steam Locomotive',
      status: 'active',
      startDate: '2024-01-15',
      estimatedDuration: 120,
      actualDuration: 85,
      budgetOriginal: 45000,
      budgetCurrent: 47500,
      costActual: 38200,
      profitMargin: 19.6,
      timeOverrun: -35,
      budgetVariance: 5.6,
      completionPercentage: 70,
      teamSize: 4,
      milestones: { total: 8, completed: 6 },
      riskScore: 3,
      clientSatisfaction: 9.2
    },
    {
      id: 'PRJ-002',
      projectName: 'Mining Conveyor Gearbox Rebuild',
      clientName: 'Cornwall Clay Industries',
      category: 'Industrial Repair',
      status: 'completed',
      startDate: '2024-01-20',
      endDate: '2024-01-28',
      estimatedDuration: 40,
      actualDuration: 38,
      budgetOriginal: 8750,
      budgetCurrent: 8750,
      costActual: 7200,
      profitMargin: 17.7,
      timeOverrun: -2,
      budgetVariance: 0,
      completionPercentage: 100,
      teamSize: 2,
      milestones: { total: 4, completed: 4 },
      riskScore: 1,
      clientSatisfaction: 9.8
    },
    {
      id: 'PRJ-003',
      projectName: 'CAD Design - Signal Box Mechanism',
      clientName: 'West Somerset Railway',
      category: 'CAD Design',
      status: 'active',
      startDate: '2024-02-01',
      estimatedDuration: 60,
      actualDuration: 15,
      budgetOriginal: 2850,
      budgetCurrent: 2850,
      costActual: 1200,
      profitMargin: 57.9,
      timeOverrun: -45,
      budgetVariance: 0,
      completionPercentage: 25,
      teamSize: 1,
      milestones: { total: 5, completed: 1 },
      riskScore: 2,
      clientSatisfaction: 8.5
    },
    {
      id: 'PRJ-004',
      projectName: 'Steam Crane Restoration',
      clientName: 'National Railway Museum',
      category: 'Steam Locomotive',
      status: 'active',
      startDate: '2023-11-01',
      estimatedDuration: 180,
      actualDuration: 95,
      budgetOriginal: 75000,
      budgetCurrent: 82000,
      costActual: 68500,
      profitMargin: 16.5,
      timeOverrun: -85,
      budgetVariance: 9.3,
      completionPercentage: 85,
      teamSize: 6,
      milestones: { total: 12, completed: 10 },
      riskScore: 4,
      clientSatisfaction: 9.0
    }
  ];

  // Calculate aggregate metrics
  const totalRevenue = mockProjects.reduce((sum, p) => sum + p.budgetCurrent, 0);
  const totalCosts = mockProjects.reduce((sum, p) => sum + p.costActual, 0);
  const totalProfit = totalRevenue - totalCosts;
  const avgProfitMargin = mockProjects.reduce((sum, p) => sum + p.profitMargin, 0) / mockProjects.length;
  const activeProjects = mockProjects.filter(p => p.status === 'active').length;
  const completedProjects = mockProjects.filter(p => p.status === 'completed').length;
  const onTimeProjects = mockProjects.filter(p => p.timeOverrun <= 0).length;
  const avgClientSatisfaction = mockProjects.reduce((sum, p) => sum + p.clientSatisfaction, 0) / mockProjects.length;

  // Monthly revenue trend (mock data)
  const monthlyData = [
    { month: 'Oct', revenue: 45000, projects: 3, profit: 8500 },
    { month: 'Nov', revenue: 52000, projects: 4, profit: 9800 },
    { month: 'Dec', revenue: 38000, projects: 2, profit: 7200 },
    { month: 'Jan', revenue: 67000, projects: 5, profit: 12500 },
    { month: 'Feb', revenue: 48000, projects: 3, profit: 9100 }
  ];

  const categoryBreakdown = [
    { name: 'Steam Locomotive', count: 6, revenue: 180000, percentage: 65 },
    { name: 'Industrial Repair', count: 3, revenue: 45000, percentage: 20 },
    { name: 'CAD Design', count: 4, revenue: 25000, percentage: 10 },
    { name: 'Consulting', count: 2, revenue: 15000, percentage: 5 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#10B981';
      case 'active': return '#3B82F6';
      case 'on_hold': return '#F59E0B';
      case 'cancelled': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getRiskColor = (score: number) => {
    if (score <= 2) return '#10B981';
    if (score <= 3) return '#F59E0B';
    return '#EF4444';
  };

  const formatCurrency = (amount: number) => `£${(amount / 1000).toFixed(0)}k`;
  const formatPercentage = (value: number) => `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;

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
              <BarChart3 size={24} color="white" />
            </div>
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#111827', margin: 0 }}>
                Project Analytics
              </h1>
              <p style={{ fontSize: '16px', color: '#6B7280', margin: 0 }}>
                Track performance, analyze trends, and optimize project delivery
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '32px',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          <select
            value={filters.period}
            onChange={(e) => setFilters({...filters, period: e.target.value as any})}
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
            <option value="all">All Time</option>
          </select>
          <select
            value={filters.category}
            onChange={(e) => setFilters({...filters, category: e.target.value})}
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
            <option value="all">All Categories</option>
            <option value="Steam Locomotive">Steam Locomotive</option>
            <option value="Industrial Repair">Industrial Repair</option>
            <option value="CAD Design">CAD Design</option>
            <option value="Consulting">Consulting</option>
          </select>
          <select
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
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
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="on_hold">On Hold</option>
          </select>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '12px' }}>
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
              <RefreshCw size={16} />
              Refresh
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            border: '1px solid #E5E7EB',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                backgroundColor: '#EFF6FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <DollarSign size={20} color="#006FEE" />
              </div>
              <span style={{ fontSize: '14px', color: '#6B7280' }}>Total Revenue</span>
            </div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#111827', marginBottom: '4px' }}>
              {formatCurrency(totalRevenue)}
            </div>
            <div style={{ fontSize: '14px', color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <TrendingUp size={16} />
              <span>+23% from last month</span>
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            border: '1px solid #E5E7EB',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                backgroundColor: '#D1FAE5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <TrendingUp size={20} color="#10B981" />
              </div>
              <span style={{ fontSize: '14px', color: '#6B7280' }}>Profit Margin</span>
            </div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#111827', marginBottom: '4px' }}>
              {avgProfitMargin.toFixed(1)}%
            </div>
            <div style={{ fontSize: '14px', color: '#6B7280' }}>
              {formatCurrency(totalProfit)} total profit
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            border: '1px solid #E5E7EB',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                backgroundColor: '#DBEAFE',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Activity size={20} color="#3B82F6" />
              </div>
              <span style={{ fontSize: '14px', color: '#6B7280' }}>Active Projects</span>
            </div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#111827', marginBottom: '4px' }}>
              {activeProjects}
            </div>
            <div style={{ fontSize: '14px', color: '#6B7280' }}>
              {completedProjects} completed this month
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            border: '1px solid #E5E7EB',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                backgroundColor: '#FEF3C7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Clock size={20} color="#F59E0B" />
              </div>
              <span style={{ fontSize: '14px', color: '#6B7280' }}>On-Time Delivery</span>
            </div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#111827', marginBottom: '4px' }}>
              {((onTimeProjects / mockProjects.length) * 100).toFixed(0)}%
            </div>
            <div style={{ fontSize: '14px', color: '#10B981' }}>
              {onTimeProjects} of {mockProjects.length} projects
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            border: '1px solid #E5E7EB',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                backgroundColor: '#EDE9FE',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Award size={20} color="#8B5CF6" />
              </div>
              <span style={{ fontSize: '14px', color: '#6B7280' }}>Client Satisfaction</span>
            </div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#111827', marginBottom: '4px' }}>
              {avgClientSatisfaction.toFixed(1)}
            </div>
            <div style={{ fontSize: '14px', color: '#8B5CF6' }}>
              Out of 10.0 rating
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '24px',
          marginBottom: '32px'
        }}>
          {/* Revenue Trend Chart */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            border: '1px solid #E5E7EB',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
            padding: '24px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: 0 }}>
                Revenue Trend
              </h3>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setSelectedMetric('revenue')}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: selectedMetric === 'revenue' ? '#006FEE' : '#F3F4F6',
                    color: selectedMetric === 'revenue' ? 'white' : '#6B7280',
                    fontSize: '12px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  Revenue
                </button>
                <button
                  onClick={() => setSelectedMetric('profit')}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: selectedMetric === 'profit' ? '#006FEE' : '#F3F4F6',
                    color: selectedMetric === 'profit' ? 'white' : '#6B7280',
                    fontSize: '12px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  Profit
                </button>
              </div>
            </div>
            
            {/* Simple bar chart representation */}
            <div style={{ height: '240px', display: 'flex', alignItems: 'end', gap: '12px', padding: '0 12px' }}>
              {monthlyData.map((data, index) => {
                const value = selectedMetric === 'revenue' ? data.revenue : data.profit;
                const maxValue = selectedMetric === 'revenue' ? 70000 : 15000;
                const height = (value / maxValue) * 200;
                
                return (
                  <div key={data.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{
                      width: '100%',
                      height: `${height}px`,
                      backgroundColor: '#006FEE',
                      borderRadius: '4px 4px 0 0',
                      marginBottom: '8px',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#0050B3';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#006FEE';
                    }}
                    />
                    <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}>
                      {data.month}
                    </div>
                    <div style={{ fontSize: '12px', fontWeight: '500', color: '#111827' }}>
                      {formatCurrency(value)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Category Breakdown */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            border: '1px solid #E5E7EB',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
            padding: '24px'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '24px' }}>
              Revenue by Category
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {categoryBreakdown.map((category, index) => {
                const colors = ['#006FEE', '#10B981', '#F59E0B', '#8B5CF6'];
                return (
                  <div key={category.name}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '14px', color: '#374151' }}>{category.name}</span>
                      <span style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>
                        {formatCurrency(category.revenue)}
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
                        width: `${category.percentage}%`,
                        height: '100%',
                        backgroundColor: colors[index % colors.length],
                        transition: 'width 0.3s ease'
                      }} />
                    </div>
                    <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>
                      {category.count} projects • {category.percentage}%
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Project Performance Table */}
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
              Project Performance
            </h3>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr 1fr 0.8fr 0.8fr 0.8fr 0.6fr 0.6fr 80px',
            padding: '16px 24px',
            borderBottom: '1px solid #E5E7EB',
            backgroundColor: '#F9FAFB',
            fontSize: '12px',
            fontWeight: '600',
            color: '#6B7280',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            <div>Project / Client</div>
            <div>Category</div>
            <div>Budget</div>
            <div>Profit %</div>
            <div>Progress</div>
            <div>Risk</div>
            <div>Rating</div>
            <div></div>
          </div>

          {mockProjects.map((project, index) => (
            <div
              key={project.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '1.5fr 1fr 0.8fr 0.8fr 0.8fr 0.6fr 0.6fr 80px',
                padding: '20px 24px',
                borderBottom: index < mockProjects.length - 1 ? '1px solid #E5E7EB' : 'none',
                alignItems: 'center',
                transition: 'background-color 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#F9FAFB';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
              }}
            >
              <div>
                <div style={{ fontWeight: '500', color: '#111827', marginBottom: '2px' }}>
                  {project.projectName}
                </div>
                <div style={{ fontSize: '13px', color: '#6B7280' }}>
                  {project.clientName}
                </div>
                <span style={{
                  display: 'inline-block',
                  marginTop: '4px',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '10px',
                  fontWeight: '500',
                  backgroundColor: `${getStatusColor(project.status)}20`,
                  color: getStatusColor(project.status)
                }}>
                  {project.status.replace('_', ' ')}
                </span>
              </div>
              <div style={{ fontSize: '14px', color: '#374151' }}>
                {project.category}
              </div>
              <div>
                <div style={{ fontWeight: '500', color: '#111827' }}>
                  {formatCurrency(project.budgetCurrent)}
                </div>
                <div style={{ fontSize: '12px', color: project.budgetVariance > 0 ? '#EF4444' : '#10B981' }}>
                  {formatPercentage(project.budgetVariance)} variance
                </div>
              </div>
              <div>
                <div style={{ fontWeight: '500', color: project.profitMargin >= 15 ? '#10B981' : '#F59E0B' }}>
                  {project.profitMargin.toFixed(1)}%
                </div>
              </div>
              <div>
                <div style={{ marginBottom: '4px', fontSize: '12px', color: '#6B7280' }}>
                  {project.completionPercentage}%
                </div>
                <div style={{
                  width: '100%',
                  height: '6px',
                  backgroundColor: '#E5E7EB',
                  borderRadius: '3px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${project.completionPercentage}%`,
                    height: '100%',
                    backgroundColor: project.completionPercentage >= 80 ? '#10B981' : project.completionPercentage >= 50 ? '#3B82F6' : '#F59E0B',
                    transition: 'width 0.3s ease'
                  }} />
                </div>
              </div>
              <div>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  fontSize: '12px',
                  fontWeight: '600',
                  backgroundColor: `${getRiskColor(project.riskScore)}20`,
                  color: getRiskColor(project.riskScore)
                }}>
                  {project.riskScore}
                </span>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: '500', color: '#111827' }}>
                  {project.clientSatisfaction.toFixed(1)}
                </div>
                <div style={{ fontSize: '10px', color: '#6B7280' }}>
                  /10
                </div>
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
                  onClick={(e) => {
                    e.stopPropagation();
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
      </div>
    </div>
  );
}