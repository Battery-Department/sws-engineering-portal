'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Train, 
  Cog, 
  Factory, 
  Wrench, 
  ChevronRight, 
  Clock, 
  Users, 
  CheckCircle, 
  AlertTriangle,
  FileText,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  MessageSquare,
  Calendar,
  User,
  TrendingUp,
  PoundSterling,
  BarChart3,
  PlayCircle,
  PauseCircle,
  CheckCircle2,
  XCircle
} from 'lucide-react';

// All projects data (active, completed, on-hold, cancelled)
const allProjectsData = [
  // Active Projects
  {
    id: 'PROJ-2024-001',
    projectNumber: 'SWSE-001',
    title: 'Ffestiniog Railway Locomotive Restoration',
    clientName: 'Ffestiniog & Welsh Highland Railways',
    serviceType: 'steam-restoration',
    priority: 'high',
    status: 'active',
    stage: 'manufacturing',
    progress: 65,
    startDate: '2024-01-15',
    targetDate: '2024-06-30',
    completionDate: null,
    engineerAssigned: 'John Mitchell',
    teamSize: 4,
    quotedValue: '£45,000',
    actualCosts: '£32,750',
    profitMargin: 27.2,
    complexity: 'high'
  },
  {
    id: 'PROJ-2024-002',
    projectNumber: 'SWSE-002',
    title: 'Bodmin Railway CAD Design Services',
    clientName: 'Bodmin & Wenford Railway',
    serviceType: 'cad-design',
    priority: 'medium',
    status: 'active',
    stage: 'quality_check',
    progress: 85,
    startDate: '2024-01-20',
    targetDate: '2024-03-15',
    completionDate: null,
    engineerAssigned: 'Sarah Williams',
    teamSize: 2,
    quotedValue: '£8,500',
    actualCosts: '£6,100',
    profitMargin: 28.2,
    complexity: 'medium'
  },
  {
    id: 'PROJ-2024-003',
    projectNumber: 'SWSE-003',
    title: 'Emergency Plant Repair - Clay Processing',
    clientName: 'Cornwall Clay Industries',
    serviceType: 'plant-repair',
    priority: 'urgent',
    status: 'active',
    stage: 'manufacturing',
    progress: 90,
    startDate: '2024-02-01',
    targetDate: '2024-02-05',
    completionDate: null,
    engineerAssigned: 'Mike Thompson',
    teamSize: 3,
    quotedValue: '£12,000',
    actualCosts: '£10,800',
    profitMargin: 10.0,
    complexity: 'high'
  },
  // Completed Projects
  {
    id: 'PROJ-2023-045',
    projectNumber: 'SWSE-045',
    title: 'Steam Wagon Boiler Certification',
    clientName: 'Heritage Transport Trust',
    serviceType: 'steam-restoration',
    priority: 'medium',
    status: 'completed',
    stage: 'delivered',
    progress: 100,
    startDate: '2023-11-01',
    targetDate: '2024-01-30',
    completionDate: '2024-01-25',
    engineerAssigned: 'John Mitchell',
    teamSize: 3,
    quotedValue: '£22,000',
    actualCosts: '£19,500',
    profitMargin: 11.4,
    complexity: 'medium'
  },
  {
    id: 'PROJ-2023-048',
    projectNumber: 'SWSE-048',
    title: 'Signal Box Mechanism Fabrication',
    clientName: 'West Somerset Railway',
    serviceType: 'bespoke-fabrication',
    priority: 'low',
    status: 'completed',
    stage: 'delivered',
    progress: 100,
    startDate: '2023-10-15',
    targetDate: '2023-12-20',
    completionDate: '2023-12-18',
    engineerAssigned: 'David Brown',
    teamSize: 2,
    quotedValue: '£15,000',
    actualCosts: '£12,200',
    profitMargin: 18.7,
    complexity: 'medium'
  },
  // On-Hold Projects
  {
    id: 'PROJ-2024-008',
    projectNumber: 'SWSE-008',
    title: 'Vintage Traction Engine Rebuild',
    clientName: 'Private Collector',
    serviceType: 'steam-restoration',
    priority: 'low',
    status: 'on-hold',
    stage: 'design_phase',
    progress: 15,
    startDate: '2024-02-20',
    targetDate: '2024-08-15',
    completionDate: null,
    engineerAssigned: 'John Mitchell',
    teamSize: 2,
    quotedValue: '£35,000',
    actualCosts: '£3,500',
    profitMargin: 90.0,
    complexity: 'high'
  },
  // Cancelled Projects
  {
    id: 'PROJ-2024-006',
    projectNumber: 'SWSE-006',
    title: 'Industrial Pump Overhaul Project',
    clientName: 'Mining Operations Ltd',
    serviceType: 'plant-repair',
    priority: 'medium',
    status: 'cancelled',
    stage: 'design_phase',
    progress: 25,
    startDate: '2024-01-10',
    targetDate: '2024-03-10',
    completionDate: null,
    engineerAssigned: 'Mike Thompson',
    teamSize: 1,
    quotedValue: '£8,000',
    actualCosts: '£1,200',
    profitMargin: 85.0,
    complexity: 'low'
  }
];

const statusConfig = {
  'active': { 
    bg: '#EFF6FF', 
    text: '#1E40AF', 
    border: '#3B82F6', 
    icon: PlayCircle,
    label: 'Active'
  },
  'completed': { 
    bg: '#F0FDF4', 
    text: '#166534', 
    border: '#22C55E', 
    icon: CheckCircle2,
    label: 'Completed'
  },
  'on-hold': { 
    bg: '#FEF3C7', 
    text: '#92400E', 
    border: '#F59E0B', 
    icon: PauseCircle,
    label: 'On Hold'
  },
  'cancelled': { 
    bg: '#FEF2F2', 
    text: '#991B1B', 
    border: '#EF4444', 
    icon: XCircle,
    label: 'Cancelled'
  }
};

const priorityColors = {
  'low': { bg: '#F3F4F6', text: '#374151', border: '#9CA3AF' },
  'medium': { bg: '#FEF3C7', text: '#92400E', border: '#F59E0B' },
  'high': { bg: '#FEE2E2', text: '#991B1B', border: '#EF4444' },
  'urgent': { bg: '#DC2626', text: '#FFFFFF', border: '#DC2626' }
};

const serviceIcons = {
  'steam-restoration': Train,
  'cad-design': Cog,
  'plant-repair': Factory,
  'bespoke-fabrication': Wrench,
  'railway-engineering': Train
};

export default function ProjectsOverviewPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');

  const filteredProjects = allProjectsData.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.projectNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || project.priority === priorityFilter;
    const matchesService = serviceFilter === 'all' || project.serviceType === serviceFilter;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesService;
  });

  const getServiceIcon = (serviceType: string) => {
    const IconComponent = serviceIcons[serviceType as keyof typeof serviceIcons] || FileText;
    return <IconComponent size={20} />;
  };

  // Calculate statistics
  const activeProjects = allProjectsData.filter(p => p.status === 'active').length;
  const completedProjects = allProjectsData.filter(p => p.status === 'completed').length;
  const onHoldProjects = allProjectsData.filter(p => p.status === 'on-hold').length;
  const totalValue = allProjectsData.reduce((sum, p) => sum + parseFloat(p.quotedValue.replace('£', '').replace(',', '')), 0);
  const avgProgress = allProjectsData.filter(p => p.status === 'active').reduce((sum, p) => sum + p.progress, 0) / activeProjects;

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', padding: '24px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Header Section */}
        <div style={{
          background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '32px',
          color: 'white'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
                All Projects Overview
              </h1>
              <p style={{ fontSize: '16px', opacity: 0.9 }}>
                Complete view of all engineering projects across all stages and statuses
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Link
                href="/portal/projects/active"
                style={{
                  padding: '12px 20px',
                  borderRadius: '8px',
                  border: '2px solid white',
                  backgroundColor: 'transparent',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = '#1E3A8A';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'white';
                }}
              >
                <BarChart3 size={16} />
                Active Projects
              </Link>
              <Link
                href="/portal/requirements"
                style={{
                  padding: '12px 20px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: 'white',
                  color: '#1E3A8A',
                  fontSize: '14px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Plus size={16} />
                New Project
              </Link>
            </div>
          </div>
        </div>

        {/* Statistics Dashboard */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '32px'
        }}>
          {[
            { 
              label: 'Active Projects', 
              value: activeProjects, 
              color: '#3B82F6', 
              icon: PlayCircle,
              link: '/portal/projects/active'
            },
            { 
              label: 'Completed Projects', 
              value: completedProjects, 
              color: '#22C55E', 
              icon: CheckCircle2,
              link: '#'
            },
            { 
              label: 'On Hold', 
              value: onHoldProjects, 
              color: '#F59E0B', 
              icon: PauseCircle,
              link: '#'
            },
            { 
              label: 'Total Portfolio Value', 
              value: `£${totalValue.toLocaleString()}`, 
              color: '#10B981', 
              icon: PoundSterling,
              link: '#'
            },
            { 
              label: 'Average Progress', 
              value: `${avgProgress.toFixed(0)}%`, 
              color: '#8B5CF6', 
              icon: TrendingUp,
              link: '#'
            }
          ].map((stat, index) => (
            <Link 
              key={index}
              href={stat.link}
              style={{
                backgroundColor: 'white',
                padding: '24px',
                borderRadius: '12px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.02)',
                textDecoration: 'none',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.02)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  backgroundColor: `${stat.color}15`,
                  padding: '12px',
                  borderRadius: '10px',
                  color: stat.color
                }}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <div style={{ fontSize: '28px', fontWeight: '700', color: '#1E293B' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '14px', color: '#64748B' }}>
                    {stat.label}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Filters Section */}
        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '12px',
          marginBottom: '24px',
          border: '1px solid #E2E8F0'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1E293B', marginBottom: '16px' }}>
            Filter & Search Projects
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px'
          }}>
            {/* Search */}
            <div>
              <label style={{ fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px', display: 'block' }}>
                Search Projects
              </label>
              <div style={{ position: 'relative' }}>
                <Search size={20} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  placeholder="Search by name, client, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 40px',
                    border: '1px solid #D1D5DB',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label style={{ fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px', display: 'block' }}>
                Project Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="on-hold">On Hold</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Priority Filter */}
            <div>
              <label style={{ fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px', display: 'block' }}>
                Priority Level
              </label>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              >
                <option value="all">All Priorities</option>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            {/* Service Filter */}
            <div>
              <label style={{ fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px', display: 'block' }}>
                Service Type
              </label>
              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              >
                <option value="all">All Services</option>
                <option value="steam-restoration">Steam Restoration</option>
                <option value="cad-design">CAD Design</option>
                <option value="plant-repair">Plant Repair</option>
                <option value="bespoke-fabrication">Bespoke Fabrication</option>
                <option value="railway-engineering">Railway Engineering</option>
              </select>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div style={{ display: 'grid', gap: '16px' }}>
          {filteredProjects.map(project => {
            const statusStyle = statusConfig[project.status as keyof typeof statusConfig];
            const priorityStyle = priorityColors[project.priority as keyof typeof priorityColors];
            const StatusIcon = statusStyle.icon;
            
            return (
              <div
                key={project.id}
                style={{
                  backgroundColor: 'white',
                  padding: '24px',
                  borderRadius: '12px',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.02)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.02)';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                      <div style={{
                        backgroundColor: '#EFF6FF',
                        padding: '8px',
                        borderRadius: '8px',
                        color: '#1E3A8A'
                      }}>
                        {getServiceIcon(project.serviceType)}
                      </div>
                      <div>
                        <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1E293B' }}>
                          {project.title}
                        </h3>
                        <div style={{ fontSize: '14px', color: '#64748B' }}>
                          {project.projectNumber} • {project.clientName}
                        </div>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                      <span
                        style={{
                          backgroundColor: statusStyle.bg,
                          color: statusStyle.text,
                          padding: '6px 12px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          border: `1px solid ${statusStyle.border}20`
                        }}
                      >
                        <StatusIcon size={14} />
                        {statusStyle.label}
                      </span>
                      <span
                        style={{
                          backgroundColor: priorityStyle.bg,
                          color: priorityStyle.text,
                          padding: '6px 12px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: '600',
                          border: `1px solid ${priorityStyle.border}20`
                        }}
                      >
                        {project.priority.toUpperCase()} PRIORITY
                      </span>
                      <span
                        style={{
                          backgroundColor: '#F0FDF4',
                          color: '#166534',
                          padding: '6px 12px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}
                      >
                        {project.quotedValue}
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '32px', fontSize: '13px', color: '#64748B', marginBottom: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={14} />
                        Started: {new Date(project.startDate).toLocaleDateString()}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={14} />
                        Due: {new Date(project.targetDate).toLocaleDateString()}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <User size={14} />
                        {project.engineerAssigned}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Users size={14} />
                        Team of {project.teamSize}
                      </div>
                    </div>

                    {/* Progress Bar for Active Projects */}
                    {project.status === 'active' && (
                      <div style={{ marginBottom: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span style={{ fontSize: '14px', color: '#64748B' }}>
                            {project.stage.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </span>
                          <span style={{ fontSize: '14px', fontWeight: '600', color: '#1E293B' }}>
                            {project.progress}%
                          </span>
                        </div>
                        <div style={{
                          width: '100%',
                          height: '8px',
                          backgroundColor: '#E5E7EB',
                          borderRadius: '4px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            width: `${project.progress}%`,
                            height: '100%',
                            backgroundColor: '#3B82F6',
                            transition: 'width 0.3s ease'
                          }} />
                        </div>
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '8px', marginLeft: '16px' }}>
                    <Link
                      href={`/portal/projects/${project.id}`}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '6px',
                        border: '1px solid #E2E8F0',
                        backgroundColor: 'white',
                        color: '#374151',
                        fontSize: '14px',
                        fontWeight: '500',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#F9FAFB';
                        e.currentTarget.style.borderColor = '#1E3A8A';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'white';
                        e.currentTarget.style.borderColor = '#E2E8F0';
                      }}
                    >
                      <Eye size={14} />
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div style={{
            backgroundColor: 'white',
            padding: '48px',
            borderRadius: '12px',
            textAlign: 'center',
            border: '1px solid #E2E8F0'
          }}>
            <FileText size={48} color="#9CA3AF" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
              No projects found
            </h3>
            <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '24px' }}>
              Try adjusting your search criteria or filters
            </p>
            <Link
              href="/portal/requirements"
              style={{
                padding: '12px 24px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#1E3A8A',
                color: 'white',
                fontSize: '14px',
                fontWeight: '600',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Plus size={16} />
              Start New Project
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}