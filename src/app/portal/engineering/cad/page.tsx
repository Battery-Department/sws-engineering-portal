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
  FolderOpen,
  History,
  Share2,
  Archive,
  Settings,
  File,
  Folder,
  GitBranch,
  User,
  Calendar,
  HardDrive,
  Layers,
  ZoomIn,
  Star,
  TrendingUp,
  Database
} from 'lucide-react';

// Sample CAD files data
const cadFilesData = [
  {
    id: 'CAD-001',
    fileName: 'Locomotive_Boiler_Assembly_v3.2.sldasm',
    projectNumber: 'PROJ-2024-001',
    projectName: 'Ffestiniog Railway Locomotive Restoration',
    fileType: 'assembly',
    version: '3.2',
    status: 'current',
    lastModified: '2024-03-15T14:30:00Z',
    modifiedBy: 'John Mitchell',
    fileSize: '24.7 MB',
    clientName: 'Ffestiniog & Welsh Highland Railways',
    serviceType: 'steam-restoration',
    category: 'boiler-systems',
    description: 'Complete boiler assembly with all fittings and connections',
    versionHistory: 12,
    downloadCount: 28,
    isShared: true,
    isStarred: true,
    associatedFiles: ['Boiler_Shell.sldprt', 'Firebox.sldprt', 'Smokebox.sldprt'],
    revisionNotes: 'Updated firebox dimensions per heritage certification requirements'
  },
  {
    id: 'CAD-002', 
    fileName: 'Signal_Box_Lever_Frame.dwg',
    projectNumber: 'PROJ-2024-004',
    projectName: 'West Somerset Railway Signal Box',
    fileType: 'drawing',
    version: '2.1',
    status: 'current',
    lastModified: '2024-03-12T09:15:00Z',
    modifiedBy: 'David Brown',
    fileSize: '8.3 MB',
    clientName: 'West Somerset Railway',
    serviceType: 'bespoke-fabrication',
    category: 'mechanical-systems',
    description: 'Traditional Victorian-era signal box lever frame mechanism',
    versionHistory: 8,
    downloadCount: 15,
    isShared: false,
    isStarred: false,
    associatedFiles: ['Lever_Detail.dwg', 'Frame_Base.dwg'],
    revisionNotes: 'Adjusted lever spacing for operational clearance'
  },
  {
    id: 'CAD-003',
    fileName: 'Rolling_Stock_Bogie_Design.sldasm',
    projectNumber: 'PROJ-2024-002',
    projectName: 'Bodmin Railway CAD Design Services',
    fileType: 'assembly',
    version: '1.8',
    status: 'under-review',
    lastModified: '2024-03-10T16:45:00Z',
    modifiedBy: 'Sarah Williams',
    fileSize: '31.2 MB',
    clientName: 'Bodmin & Wenford Railway',
    serviceType: 'cad-design',
    category: 'rolling-stock',
    description: 'Complete passenger carriage bogie assembly with suspension',
    versionHistory: 6,
    downloadCount: 22,
    isShared: true,
    isStarred: true,
    associatedFiles: ['Axle_Box.sldprt', 'Suspension_Springs.sldprt', 'Brake_Block.sldprt'],
    revisionNotes: 'Pending stress analysis validation'
  },
  {
    id: 'CAD-004',
    fileName: 'Conveyor_Gearbox_Repair.step',
    projectNumber: 'PROJ-2024-003',
    projectName: 'Emergency Plant Repair - Clay Processing',
    fileType: 'model',
    version: '1.3',
    status: 'archived',
    lastModified: '2024-02-28T11:20:00Z',
    modifiedBy: 'Mike Thompson',
    fileSize: '15.9 MB',
    clientName: 'Cornwall Clay Industries',
    serviceType: 'plant-repair',
    category: 'industrial-equipment',
    description: 'Emergency repair drawings for main conveyor gearbox',
    versionHistory: 4,
    downloadCount: 8,
    isShared: false,
    isStarred: false,
    associatedFiles: ['Gear_Set.step', 'Housing_Modification.step'],
    revisionNotes: 'Archived - project completed successfully'
  },
  {
    id: 'CAD-005',
    fileName: 'Steam_Valve_Custom_Casting.sldprt',
    projectNumber: 'PROJ-2024-006',
    projectName: 'Traction Engine Restoration',
    fileType: 'part',
    version: '4.0',
    status: 'current',
    lastModified: '2024-03-14T13:25:00Z',
    modifiedBy: 'Alex Johnson',
    fileSize: '6.8 MB',
    clientName: 'Private Collector',
    serviceType: 'bespoke-fabrication',
    category: 'steam-components',
    description: 'Custom bronze steam valve for 1920s traction engine',
    versionHistory: 15,
    downloadCount: 31,
    isShared: true,
    isStarred: false,
    associatedFiles: ['Valve_Seat.sldprt', 'Spindle.sldprt'],
    revisionNotes: 'Final design approved for casting'
  }
];

const statusConfig = {
  'current': { bg: '#EFF6FF', text: '#1E40AF', border: '#3B82F6', icon: CheckCircle },
  'under-review': { bg: '#FEF3C7', text: '#92400E', border: '#F59E0B', icon: Clock },
  'archived': { bg: '#F3F4F6', text: '#374151', border: '#9CA3AF', icon: Archive }
};

const fileTypeIcons = {
  'assembly': Layers,
  'drawing': FileText,
  'model': Database,
  'part': Cog
};

const serviceIcons = {
  'steam-restoration': Train,
  'cad-design': Cog,
  'plant-repair': Factory,
  'bespoke-fabrication': Wrench,
  'railway-engineering': Train
};

export default function CADManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [fileTypeFilter, setFileTypeFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('modified');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  const filteredFiles = cadFilesData.filter(file => {
    const matchesSearch = file.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.projectNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || file.status === statusFilter;
    const matchesFileType = fileTypeFilter === 'all' || file.fileType === fileTypeFilter;
    const matchesService = serviceFilter === 'all' || file.serviceType === serviceFilter;
    
    return matchesSearch && matchesStatus && matchesFileType && matchesService;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'modified':
        return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
      case 'name':
        return a.fileName.localeCompare(b.fileName);
      case 'size':
        return parseFloat(b.fileSize) - parseFloat(a.fileSize);
      case 'version':
        return parseFloat(b.version) - parseFloat(a.version);
      default:
        return 0;
    }
  });

  const getFileTypeIcon = (fileType: string) => {
    const IconComponent = fileTypeIcons[fileType as keyof typeof fileTypeIcons] || File;
    return <IconComponent size={20} />;
  };

  const getServiceIcon = (serviceType: string) => {
    const IconComponent = serviceIcons[serviceType as keyof typeof serviceIcons] || Cog;
    return <IconComponent size={16} />;
  };

  const formatFileSize = (size: string) => {
    const sizeNum = parseFloat(size);
    return sizeNum > 1000 ? `${(sizeNum / 1000).toFixed(1)} GB` : `${sizeNum} MB`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const toggleFileSelection = (fileId: string) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  // Calculate statistics
  const totalFiles = cadFilesData.length;
  const currentFiles = cadFilesData.filter(f => f.status === 'current').length;
  const totalStorage = cadFilesData.reduce((sum, f) => sum + parseFloat(f.fileSize), 0);
  const sharedFiles = cadFilesData.filter(f => f.isShared).length;

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
                CAD File Management & Version Control
              </h1>
              <p style={{ fontSize: '16px', opacity: 0.9 }}>
                Centralized repository for all engineering drawings, models, and technical documentation
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
                Upload Files
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
                New Folder
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
              label: 'Total CAD Files', 
              value: totalFiles, 
              color: '#3B82F6', 
              icon: File,
              subtext: 'Across all projects'
            },
            { 
              label: 'Current Versions', 
              value: currentFiles, 
              color: '#10B981', 
              icon: CheckCircle,
              subtext: 'Active files'
            },
            { 
              label: 'Storage Used', 
              value: `${totalStorage.toFixed(1)} MB`, 
              color: '#8B5CF6', 
              icon: HardDrive,
              subtext: 'Total file size'
            },
            { 
              label: 'Shared Files', 
              value: sharedFiles, 
              color: '#F59E0B', 
              icon: Share2,
              subtext: 'Client accessible'
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

        {/* Filters and Search Section */}
        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '12px',
          marginBottom: '24px',
          border: '1px solid #E2E8F0'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1E293B', marginBottom: '16px' }}>
            Search & Filter CAD Files
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '16px'
          }}>
            {/* Search */}
            <div>
              <label style={{ fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px', display: 'block' }}>
                Search Files
              </label>
              <div style={{ position: 'relative' }}>
                <Search size={20} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  placeholder="Search by filename, project, or client..."
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
                File Status
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
                <option value="current">Current</option>
                <option value="under-review">Under Review</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            {/* File Type Filter */}
            <div>
              <label style={{ fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px', display: 'block' }}>
                File Type
              </label>
              <select
                value={fileTypeFilter}
                onChange={(e) => setFileTypeFilter(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              >
                <option value="all">All Types</option>
                <option value="assembly">Assembly</option>
                <option value="drawing">Drawing</option>
                <option value="model">Model</option>
                <option value="part">Part</option>
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
                <option value="modified">Last Modified</option>
                <option value="name">File Name</option>
                <option value="size">File Size</option>
                <option value="version">Version</option>
              </select>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedFiles.length > 0 && (
            <div style={{
              padding: '12px 16px',
              backgroundColor: '#EFF6FF',
              borderRadius: '8px',
              border: '1px solid #BFDBFE',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span style={{ fontSize: '14px', color: '#1E40AF', fontWeight: '500' }}>
                {selectedFiles.length} file(s) selected
              </span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: '1px solid #1E40AF',
                  backgroundColor: 'white',
                  color: '#1E40AF',
                  fontSize: '12px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}>
                  Download
                </button>
                <button style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: '1px solid #1E40AF',
                  backgroundColor: 'white',
                  color: '#1E40AF',
                  fontSize: '12px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}>
                  Share
                </button>
                <button style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: '1px solid #1E40AF',
                  backgroundColor: 'white',
                  color: '#1E40AF',
                  fontSize: '12px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}>
                  Archive
                </button>
              </div>
            </div>
          )}
        </div>

        {/* CAD Files List */}
        <div style={{ display: 'grid', gap: '16px' }}>
          {filteredFiles.map(file => {
            const statusStyle = statusConfig[file.status as keyof typeof statusConfig];
            const StatusIcon = statusStyle.icon;
            const isSelected = selectedFiles.includes(file.id);
            
            return (
              <div
                key={file.id}
                style={{
                  backgroundColor: isSelected ? '#EFF6FF' : 'white',
                  padding: '24px',
                  borderRadius: '12px',
                  border: isSelected ? '2px solid #3B82F6' : '1px solid #E2E8F0',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.02)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.08)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.02)';
                  }
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleFileSelection(file.id)}
                        style={{ width: '16px', height: '16px' }}
                      />
                      <div style={{
                        backgroundColor: '#EFF6FF',
                        padding: '8px',
                        borderRadius: '8px',
                        color: '#1E3A8A'
                      }}>
                        {getFileTypeIcon(file.fileType)}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1E293B' }}>
                            {file.fileName}
                          </h3>
                          {file.isStarred && <Star size={16} color="#F59E0B" fill="#F59E0B" />}
                          {file.isShared && <Share2 size={16} color="#10B981" />}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#64748B' }}>
                          <span>{file.projectNumber} • {file.projectName}</span>
                          <span>•</span>
                          <span>{file.clientName}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '16px', lineHeight: '1.5' }}>
                      {file.description}
                    </p>

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
                        {file.status.replace('-', ' ').toUpperCase()}
                      </span>
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
                        {getServiceIcon(file.serviceType)}
                        {file.serviceType.replace('-', ' ').toUpperCase()}
                      </span>
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
                        v{file.version}
                      </span>
                      <span
                        style={{
                          backgroundColor: '#FEF3C7',
                          color: '#92400E',
                          padding: '6px 12px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}
                      >
                        {formatFileSize(file.fileSize)}
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '24px', fontSize: '13px', color: '#64748B', marginBottom: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={14} />
                        Modified: {formatDate(file.lastModified)}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <User size={14} />
                        {file.modifiedBy}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <History size={14} />
                        {file.versionHistory} versions
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Download size={14} />
                        {file.downloadCount} downloads
                      </div>
                    </div>

                    {/* Associated Files */}
                    {file.associatedFiles.length > 0 && (
                      <div style={{ marginBottom: '16px' }}>
                        <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '8px' }}>
                          Associated files: {file.associatedFiles.join(', ')}
                        </div>
                      </div>
                    )}

                    {/* Revision Notes */}
                    <div style={{
                      backgroundColor: '#FFFBEB',
                      border: '1px solid #FED7AA',
                      borderRadius: '8px',
                      padding: '12px',
                      marginBottom: '16px'
                    }}>
                      <div style={{ fontSize: '11px', color: '#92400E', fontWeight: '600', marginBottom: '4px' }}>
                        LATEST REVISION NOTES
                      </div>
                      <div style={{ fontSize: '13px', color: '#B45309' }}>
                        {file.revisionNotes}
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
                      <ZoomIn size={14} />
                      Preview
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
                      <History size={14} />
                      History
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
                      Open
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredFiles.length === 0 && (
          <div style={{
            backgroundColor: 'white',
            padding: '48px',
            borderRadius: '12px',
            textAlign: 'center',
            border: '1px solid #E2E8F0'
          }}>
            <File size={48} color="#9CA3AF" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
              No CAD files found
            </h3>
            <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '24px' }}>
              Try adjusting your search criteria or upload new files
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
              <Upload size={16} />
              Upload First File
            </button>
          </div>
        )}
      </div>
    </div>
  );
}