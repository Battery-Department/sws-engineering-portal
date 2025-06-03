'use client';

import React, { useState } from 'react';
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
  Tag
} from 'lucide-react';

// Sample requirements data
const requirementsData = [
  {
    id: 'REQ-001',
    projectNumber: 'PROJ-2024-001',
    title: 'Locomotive Boiler Restoration - Ffestiniog Railway',
    clientName: 'Ffestiniog & Welsh Highland Railways',
    serviceType: 'steam-restoration',
    priority: 'high',
    status: 'in-review',
    submittedDate: '2024-01-15',
    estimatedCompletion: '2024-06-30',
    engineerAssigned: 'John Mitchell',
    requirementsSummary: 'Complete boiler inspection and restoration for 1920s narrow gauge locomotive. Includes pressure testing, tube replacement, and certification.',
    specifications: [
      'Boiler pressure test to 180 PSI',
      'Replace 24x fire tubes',
      'Refurbish smokebox',
      'Heritage Railway certification required'
    ],
    estimatedValue: '£25,000',
    complexity: 'high'
  },
  {
    id: 'REQ-002', 
    projectNumber: 'PROJ-2024-002',
    title: 'CAD Design - Rolling Stock Assembly',
    clientName: 'Bodmin & Wenford Railway',
    serviceType: 'cad-design',
    priority: 'medium',
    status: 'approved',
    submittedDate: '2024-01-20',
    estimatedCompletion: '2024-03-15',
    engineerAssigned: 'Sarah Williams',
    requirementsSummary: 'Complete CAD drawings for new passenger carriage assembly including all mechanical and structural components.',
    specifications: [
      'Full 3D assembly model',
      'Manufacturing drawings to BS 8888',
      'Parts list and BOM',
      'Stress analysis report'
    ],
    estimatedValue: '£8,500',
    complexity: 'medium'
  },
  {
    id: 'REQ-003',
    projectNumber: 'PROJ-2024-003', 
    title: 'Emergency Plant Repair - Clay Processing Equipment',
    clientName: 'Cornwall Clay Industries',
    serviceType: 'plant-repair',
    priority: 'urgent',
    status: 'in-progress',
    submittedDate: '2024-02-01',
    estimatedCompletion: '2024-02-05',
    engineerAssigned: 'Mike Thompson',
    requirementsSummary: 'Urgent repair of primary conveyor gearbox. Production line down, 24/7 support required.',
    specifications: [
      'Replace main gearbox assembly',
      'Hydraulic system overhaul',
      'Emergency on-site service',
      'Production line restart within 72 hours'
    ],
    estimatedValue: '£12,000',
    complexity: 'high'
  },
  {
    id: 'REQ-004',
    projectNumber: 'PROJ-2024-004',
    title: 'Custom Fabrication - Signal Box Components',
    clientName: 'West Somerset Railway',
    serviceType: 'bespoke-fabrication',
    priority: 'low',
    status: 'pending',
    submittedDate: '2024-02-10',
    estimatedCompletion: '2024-05-30',
    engineerAssigned: 'David Brown',
    requirementsSummary: 'Fabrication of period-correct signal box operating mechanisms and lever frames.',
    specifications: [
      'Victorian-era authentic design',
      'Cast iron and brass components',
      'Manual operation mechanism',
      'Heritage Railway standards'
    ],
    estimatedValue: '£18,000',
    complexity: 'medium'
  },
  {
    id: 'REQ-005',
    projectNumber: 'PROJ-2024-005',
    title: 'Railway Infrastructure - Track Renewal',
    clientName: 'Bodmin & Wenford Railway',
    serviceType: 'railway-engineering',
    priority: 'medium',
    status: 'quoted',
    submittedDate: '2024-02-15',
    estimatedCompletion: '2024-08-15',
    engineerAssigned: 'Alex Johnson',
    requirementsSummary: 'Complete track renewal for 2.5km section including ballast, sleepers, and rail replacement.',
    specifications: [
      '2.5km track section renewal',
      'New concrete sleepers',
      'Continuous welded rail',
      'Signaling system integration'
    ],
    estimatedValue: '£85,000',
    complexity: 'high'
  }
];

const statusColors = {
  'pending': { bg: '#FEF3C7', text: '#92400E', border: '#F59E0B' },
  'in-review': { bg: '#DBEAFE', text: '#1E40AF', border: '#3B82F6' },
  'approved': { bg: '#D1FAE5', text: '#065F46', border: '#10B981' },
  'in-progress': { bg: '#E0E7FF', text: '#3730A3', border: '#6366F1' },
  'quoted': { bg: '#FCE7F3', text: '#BE185D', border: '#EC4899' }
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

export default function RequirementsPage() {
  const [selectedRequirement, setSelectedRequirement] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const filteredRequirements = requirementsData.filter(req => {
    const matchesSearch = req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         req.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         req.projectNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || req.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || req.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getServiceIcon = (serviceType: string) => {
    const IconComponent = serviceIcons[serviceType as keyof typeof serviceIcons] || FileText;
    return <IconComponent size={20} />;
  };

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
                Project Requirements Management
              </h1>
              <p style={{ fontSize: '16px', opacity: 0.9 }}>
                Track and manage engineering project requirements from submission to completion
              </p>
            </div>
            <button
              style={{
                padding: '12px 24px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: 'white',
                color: '#1E3A8A',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Plus size={16} />
              New Requirement
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '32px'
        }}>
          {[
            { label: 'Total Requirements', value: '5', color: '#1E3A8A', icon: FileText },
            { label: 'In Progress', value: '2', color: '#6366F1', icon: Clock },
            { label: 'Pending Review', value: '1', color: '#F59E0B', icon: AlertTriangle },
            { label: 'Completed This Month', value: '3', color: '#10B981', icon: CheckCircle }
          ].map((stat, index) => (
            <div key={index} style={{
              backgroundColor: 'white',
              padding: '24px',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.02)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  backgroundColor: `${stat.color}15`,
                  padding: '8px',
                  borderRadius: '8px',
                  color: stat.color
                }}>
                  <stat.icon size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '24px', fontWeight: '700', color: '#1E293B' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '14px', color: '#64748B' }}>
                    {stat.label}
                  </div>
                </div>
              </div>
            </div>
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
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '16px',
            alignItems: 'end'
          }}>
            {/* Search */}
            <div>
              <label style={{ fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px', display: 'block' }}>
                Search Requirements
              </label>
              <div style={{ position: 'relative' }}>
                <Search size={20} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  placeholder="Search by project, client, or ID..."
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
                Status
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
                <option value="pending">Pending</option>
                <option value="in-review">In Review</option>
                <option value="approved">Approved</option>
                <option value="in-progress">In Progress</option>
                <option value="quoted">Quoted</option>
              </select>
            </div>

            {/* Priority Filter */}
            <div>
              <label style={{ fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px', display: 'block' }}>
                Priority
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
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>
        </div>

        {/* Requirements List */}
        <div style={{ display: 'grid', gap: '16px' }}>
          {filteredRequirements.map(requirement => {
            const statusStyle = statusColors[requirement.status as keyof typeof statusColors];
            const priorityStyle = priorityColors[requirement.priority as keyof typeof priorityColors];
            
            return (
              <div
                key={requirement.id}
                style={{
                  backgroundColor: 'white',
                  padding: '24px',
                  borderRadius: '12px',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.02)',
                  cursor: 'pointer',
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
                        padding: '6px',
                        borderRadius: '6px',
                        color: '#1E3A8A'
                      }}>
                        {getServiceIcon(requirement.serviceType)}
                      </div>
                      <div>
                        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1E293B' }}>
                          {requirement.title}
                        </h3>
                        <div style={{ fontSize: '14px', color: '#64748B' }}>
                          {requirement.projectNumber} • {requirement.clientName}
                        </div>
                      </div>
                    </div>
                    
                    <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '16px', lineHeight: '1.5' }}>
                      {requirement.requirementsSummary}
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                      <span
                        style={{
                          backgroundColor: statusStyle.bg,
                          color: statusStyle.text,
                          padding: '4px 8px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '500',
                          border: `1px solid ${statusStyle.border}20`
                        }}
                      >
                        {requirement.status.replace('-', ' ').toUpperCase()}
                      </span>
                      <span
                        style={{
                          backgroundColor: priorityStyle.bg,
                          color: priorityStyle.text,
                          padding: '4px 8px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '500',
                          border: `1px solid ${priorityStyle.border}20`
                        }}
                      >
                        {requirement.priority.toUpperCase()} PRIORITY
                      </span>
                      <span
                        style={{
                          backgroundColor: '#F3F4F6',
                          color: '#374151',
                          padding: '4px 8px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '500'
                        }}
                      >
                        {requirement.estimatedValue}
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '24px', fontSize: '13px', color: '#64748B' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={14} />
                        Submitted: {new Date(requirement.submittedDate).toLocaleDateString()}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={14} />
                        Due: {new Date(requirement.estimatedCompletion).toLocaleDateString()}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <User size={14} />
                        {requirement.engineerAssigned}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', marginLeft: '16px' }}>
                    <button
                      style={{
                        padding: '8px 12px',
                        borderRadius: '6px',
                        border: '1px solid #E2E8F0',
                        backgroundColor: 'white',
                        color: '#374151',
                        fontSize: '12px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Eye size={14} />
                      View
                    </button>
                    <button
                      style={{
                        padding: '8px 12px',
                        borderRadius: '6px',
                        border: '1px solid #E2E8F0',
                        backgroundColor: 'white',
                        color: '#374151',
                        fontSize: '12px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Edit size={14} />
                      Edit
                    </button>
                    <button
                      style={{
                        padding: '8px 12px',
                        borderRadius: '6px',
                        border: '1px solid #1E3A8A',
                        backgroundColor: '#1E3A8A',
                        color: 'white',
                        fontSize: '12px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <MessageSquare size={14} />
                      Comment
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredRequirements.length === 0 && (
          <div style={{
            backgroundColor: 'white',
            padding: '48px',
            borderRadius: '12px',
            textAlign: 'center',
            border: '1px solid #E2E8F0'
          }}>
            <FileText size={48} color="#9CA3AF" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
              No requirements found
            </h3>
            <p style={{ fontSize: '14px', color: '#64748B' }}>
              Try adjusting your search criteria or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}