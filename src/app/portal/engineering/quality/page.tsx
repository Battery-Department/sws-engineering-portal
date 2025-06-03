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
  Download,
  Upload,
  Shield,
  Award,
  User,
  Calendar,
  TrendingUp,
  Target,
  Clipboard,
  Star,
  Settings,
  BarChart3
} from 'lucide-react';

// Sample quality control data
const qualityInspectionsData = [
  {
    id: 'QC-001',
    projectNumber: 'PROJ-2024-001',
    projectName: 'Ffestiniog Railway Locomotive Restoration',
    inspectionType: 'Boiler Pressure Test',
    status: 'passed',
    inspectionDate: '2024-03-15',
    inspector: 'John Mitchell',
    client: 'Ffestiniog & Welsh Highland Railways',
    standard: 'BS 2790:2019',
    pressure: '180 PSI',
    result: 'PASSED',
    certificationRequired: true,
    nextInspection: '2024-09-15',
    notes: 'All welds and joints tested successfully. Certificate issued.',
    documents: ['Pressure_Test_Certificate.pdf', 'Inspection_Photos.zip']
  },
  {
    id: 'QC-002',
    projectNumber: 'PROJ-2024-002', 
    projectName: 'Bodmin Railway CAD Design Services',
    inspectionType: 'Design Review',
    status: 'pending-review',
    inspectionDate: '2024-03-14',
    inspector: 'Sarah Williams',
    client: 'Bodmin & Wenford Railway',
    standard: 'BS 8888:2020',
    result: 'UNDER REVIEW',
    certificationRequired: false,
    nextInspection: '2024-03-21',
    notes: 'Technical drawings under final review. Minor revisions required.',
    documents: ['Design_Review_Checklist.pdf', 'Drawing_Comments.xlsx']
  },
  {
    id: 'QC-003',
    projectNumber: 'PROJ-2024-003',
    projectName: 'Emergency Plant Repair - Clay Processing',
    inspectionType: 'Post-Repair Testing',
    status: 'failed',
    inspectionDate: '2024-03-12',
    inspector: 'Mike Thompson',
    client: 'Cornwall Clay Industries',
    standard: 'ISO 13373-2:2016',
    result: 'FAILED - REWORK REQUIRED',
    certificationRequired: true,
    nextInspection: '2024-03-19',
    notes: 'Vibration levels exceeded tolerance. Bearing alignment required.',
    documents: ['Vibration_Analysis.pdf', 'Failure_Report.docx']
  },
  {
    id: 'QC-004',
    projectNumber: 'PROJ-2024-004',
    projectName: 'Signal Box Lever Frame Fabrication',
    inspectionType: 'Final Quality Check',
    status: 'passed',
    inspectionDate: '2024-03-10',
    inspector: 'David Brown',
    client: 'West Somerset Railway',
    standard: 'Network Rail NR/L2/CIV/006',
    result: 'PASSED',
    certificationRequired: true,
    nextInspection: 'N/A',
    notes: 'All mechanical tests passed. Heritage certification approved.',
    documents: ['Quality_Certificate.pdf', 'Test_Results.xlsx', 'Photos.zip']
  },
  {
    id: 'QC-005',
    projectNumber: 'PROJ-2024-005',
    projectName: 'Steam Valve Custom Casting',
    inspectionType: 'Material Testing',
    status: 'in-progress',
    inspectionDate: '2024-03-16',
    inspector: 'Alex Johnson',
    client: 'Private Collector',
    standard: 'BS EN 1982:2008',
    result: 'IN PROGRESS',
    certificationRequired: true,
    nextInspection: '2024-03-20',
    notes: 'Bronze composition testing in progress. Tensile strength tests pending.',
    documents: ['Material_Specification.pdf', 'Test_Schedule.xlsx']
  }
];

const statusConfig = {
  'passed': { bg: '#F0FDF4', text: '#166534', border: '#22C55E', icon: CheckCircle },
  'failed': { bg: '#FEF2F2', text: '#991B1B', border: '#EF4444', icon: AlertTriangle },
  'pending-review': { bg: '#FEF3C7', text: '#92400E', border: '#F59E0B', icon: Clock },
  'in-progress': { bg: '#EFF6FF', text: '#1E40AF', border: '#3B82F6', icon: Settings }
};

export default function QualityControlPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const filteredInspections = qualityInspectionsData.filter(inspection => {
    const matchesSearch = inspection.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inspection.inspectionType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inspection.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inspection.projectNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || inspection.status === statusFilter;
    const matchesType = typeFilter === 'all' || inspection.inspectionType.toLowerCase().includes(typeFilter.toLowerCase());
    
    return matchesSearch && matchesStatus && matchesType;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.inspectionDate).getTime() - new Date(a.inspectionDate).getTime();
      case 'project':
        return a.projectName.localeCompare(b.projectName);
      case 'status':
        return a.status.localeCompare(b.status);
      case 'inspector':
        return a.inspector.localeCompare(b.inspector);
      default:
        return 0;
    }
  });

  // Calculate statistics
  const totalInspections = qualityInspectionsData.length;
  const passedInspections = qualityInspectionsData.filter(i => i.status === 'passed').length;
  const failedInspections = qualityInspectionsData.filter(i => i.status === 'failed').length;
  const passRate = totalInspections > 0 ? (passedInspections / totalInspections) * 100 : 0;

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
                Quality Control & Inspections
              </h1>
              <p style={{ fontSize: '16px', opacity: 0.9 }}>
                Maintain engineering excellence through comprehensive quality assurance
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                style={{
                  padding: '12px 20px',
                  borderRadius: '8px',
                  border: '2px solid white',
                  backgroundColor: 'transparent',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
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
                <Upload size={16} />
                Upload Certificate
              </button>
              <button
                style={{
                  padding: '12px 20px',
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
                New Inspection
              </button>
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
              label: 'Total Inspections', 
              value: totalInspections, 
              color: '#3B82F6', 
              icon: Clipboard,
              subtext: 'This month'
            },
            { 
              label: 'Pass Rate', 
              value: `${passRate.toFixed(1)}%`, 
              color: '#10B981', 
              icon: Target,
              subtext: 'Quality metric'
            },
            { 
              label: 'Failed Inspections', 
              value: failedInspections, 
              color: '#EF4444', 
              icon: AlertTriangle,
              subtext: 'Require rework'
            },
            { 
              label: 'Certificates Issued', 
              value: qualityInspectionsData.filter(i => i.certificationRequired && i.status === 'passed').length, 
              color: '#8B5CF6', 
              icon: Award,
              subtext: 'Compliance docs'
            }
          ].map((stat, index) => (
            <div key={index} style={{
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
            }}>
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
                  <div style={{ fontSize: '14px', color: '#64748B', marginBottom: '2px' }}>
                    {stat.label}
                  </div>
                  <div style={{ fontSize: '12px', color: '#9CA3AF' }}>
                    {stat.subtext}
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
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1E293B', marginBottom: '16px' }}>
            Search & Filter Quality Inspections
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px'
          }}>
            {/* Search */}
            <div>
              <label style={{ fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px', display: 'block' }}>
                Search Inspections
              </label>
              <div style={{ position: 'relative' }}>
                <Search size={20} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  placeholder="Search by project, type, or client..."
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
                <option value="passed">Passed</option>
                <option value="failed">Failed</option>
                <option value="pending-review">Pending Review</option>
                <option value="in-progress">In Progress</option>
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <label style={{ fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px', display: 'block' }}>
                Inspection Type
              </label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              >
                <option value="all">All Types</option>
                <option value="pressure">Pressure Testing</option>
                <option value="design">Design Review</option>
                <option value="material">Material Testing</option>
                <option value="quality">Quality Check</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label style={{ fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px', display: 'block' }}>
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              >
                <option value="date">Inspection Date</option>
                <option value="project">Project Name</option>
                <option value="status">Status</option>
                <option value="inspector">Inspector</option>
              </select>
            </div>
          </div>
        </div>

        {/* Inspections List */}
        <div style={{ display: 'grid', gap: '16px' }}>
          {filteredInspections.map(inspection => {
            const statusStyle = statusConfig[inspection.status as keyof typeof statusConfig];
            const StatusIcon = statusStyle.icon;
            
            return (
              <div
                key={inspection.id}
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
                        <Shield size={20} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1E293B', marginBottom: '4px' }}>
                          {inspection.inspectionType}
                        </h3>
                        <div style={{ fontSize: '14px', color: '#64748B' }}>
                          {inspection.projectNumber} • {inspection.projectName}
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
                        {inspection.result}
                      </span>
                      {inspection.certificationRequired && (
                        <span
                          style={{
                            backgroundColor: '#F0FDF4',
                            color: '#166534',
                            padding: '6px 12px',
                            borderRadius: '8px',
                            fontSize: '12px',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <Award size={14} />
                          CERTIFICATION REQUIRED
                        </span>
                      )}
                      <span
                        style={{
                          backgroundColor: '#F3F4F6',
                          color: '#374151',
                          padding: '6px 12px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}
                      >
                        {inspection.standard}
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '24px', fontSize: '13px', color: '#64748B', marginBottom: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={14} />
                        Inspected: {new Date(inspection.inspectionDate).toLocaleDateString()}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <User size={14} />
                        {inspection.inspector}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Factory size={14} />
                        {inspection.client}
                      </div>
                      {inspection.nextInspection !== 'N/A' && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Clock size={14} />
                          Next: {new Date(inspection.nextInspection).toLocaleDateString()}
                        </div>
                      )}
                    </div>

                    {/* Notes */}
                    <div style={{
                      backgroundColor: '#FFFBEB',
                      border: '1px solid #FED7AA',
                      borderRadius: '8px',
                      padding: '12px',
                      marginBottom: '16px'
                    }}>
                      <div style={{ fontSize: '11px', color: '#92400E', fontWeight: '600', marginBottom: '4px' }}>
                        INSPECTION NOTES
                      </div>
                      <div style={{ fontSize: '13px', color: '#B45309' }}>
                        {inspection.notes}
                      </div>
                    </div>

                    {/* Documents */}
                    {inspection.documents.length > 0 && (
                      <div style={{ marginBottom: '16px' }}>
                        <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '8px', fontWeight: '600' }}>
                          DOCUMENTS ({inspection.documents.length})
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                          {inspection.documents.map((doc, index) => (
                            <span key={index} style={{
                              backgroundColor: '#EFF6FF',
                              color: '#1E40AF',
                              padding: '4px 8px',
                              borderRadius: '6px',
                              fontSize: '11px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}>
                              <FileText size={12} />
                              {doc}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
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
                        gap: '4px',
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
                        gap: '4px',
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
                      <Download size={14} />
                      Download
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
                      <Edit size={14} />
                      Update
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredInspections.length === 0 && (
          <div style={{
            backgroundColor: 'white',
            padding: '48px',
            borderRadius: '12px',
            textAlign: 'center',
            border: '1px solid #E2E8F0'
          }}>
            <Shield size={48} color="#9CA3AF" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
              No quality inspections found
            </h3>
            <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '24px' }}>
              Try adjusting your search criteria or schedule a new inspection
            </p>
            <button
              style={{
                padding: '12px 24px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#1E3A8A',
                color: 'white',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Plus size={16} />
              Schedule Inspection
            </button>
          </div>
        )}
      </div>
    </div>
  );
}