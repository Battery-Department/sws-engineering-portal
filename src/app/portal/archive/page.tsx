'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Archive,
  Search,
  Filter,
  Calendar,
  Download,
  RotateCcw,
  Trash2,
  Eye,
  FileText,
  Image,
  Package,
  Users,
  Clock,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  AlertTriangle,
  Info,
  Folder,
  FolderOpen,
  MoreVertical
} from 'lucide-react';

interface ArchivedItem {
  id: string;
  name: string;
  type: 'project' | 'document' | 'image' | 'data' | 'user';
  category: string;
  archivedDate: string;
  archivedBy: string;
  originalLocation: string;
  size: number;
  retentionDate: string;
  status: 'archived' | 'pending_deletion' | 'restored';
  metadata: Record<string, any>;
  tags: string[];
}

export default function PortalArchivePage() {
  const [archivedItems, setArchivedItems] = useState<ArchivedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('archivedDate');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Simulate API call to fetch archived items
    setTimeout(() => {
      const mockArchivedItems: ArchivedItem[] = [
        {
          id: 'arch-001',
          name: 'Historical Locomotive Project Files',
          type: 'project',
          category: 'Heritage Railway',
          archivedDate: '2023-12-15',
          archivedBy: 'Mike Thompson',
          originalLocation: '/projects/heritage-loco-2023',
          size: 245760000,
          retentionDate: '2026-12-15',
          status: 'archived',
          metadata: {
            projectDuration: '18 months',
            completionDate: '2023-11-30',
            clientName: 'West Somerset Railway'
          },
          tags: ['heritage', 'locomotive', '2023', 'completed']
        },
        {
          id: 'arch-002',
          name: 'CAD Drawings Archive 2023',
          type: 'document',
          category: 'Engineering',
          archivedDate: '2024-01-10',
          archivedBy: 'Sarah Williams',
          originalLocation: '/engineering/cad/2023',
          size: 156800000,
          retentionDate: '2029-01-10',
          status: 'archived',
          metadata: {
            drawingCount: 347,
            fileFormats: ['DWG', 'DXF', 'PDF'],
            lastModified: '2023-12-20'
          },
          tags: ['cad', 'drawings', '2023', 'engineering']
        },
        {
          id: 'arch-003',
          name: 'Project Photos - Boiler Restoration',
          type: 'image',
          category: 'Documentation',
          archivedDate: '2023-11-25',
          archivedBy: 'Tom Richardson',
          originalLocation: '/projects/boiler-rest-2023/photos',
          size: 524288000,
          retentionDate: '2028-11-25',
          status: 'archived',
          metadata: {
            photoCount: 156,
            resolution: 'High-res (4K)',
            totalSize: '524MB'
          },
          tags: ['photos', 'boiler', 'restoration', 'documentation']
        },
        {
          id: 'arch-004',
          name: 'Inactive User Data - 2023',
          type: 'user',
          category: 'User Management',
          archivedDate: '2024-01-01',
          archivedBy: 'System Admin',
          originalLocation: '/users/inactive',
          size: 12582912,
          retentionDate: '2027-01-01',
          status: 'archived',
          metadata: {
            userCount: 12,
            lastActivity: '2023-06-30',
            dataTypes: ['profiles', 'preferences', 'activity logs']
          },
          tags: ['users', 'inactive', 'gdpr', 'compliance']
        },
        {
          id: 'arch-005',
          name: 'Financial Records Q4 2023',
          type: 'data',
          category: 'Financial',
          archivedDate: '2024-01-05',
          archivedBy: 'Finance Team',
          originalLocation: '/financial/2023/q4',
          size: 78643200,
          retentionDate: '2031-01-05',
          status: 'archived',
          metadata: {
            recordCount: 1247,
            dateRange: 'Oct-Dec 2023',
            totalValue: '£2.4M'
          },
          tags: ['financial', 'q4', '2023', 'records']
        },
        {
          id: 'arch-006',
          name: 'Old Material Specifications',
          type: 'document',
          category: 'Materials',
          archivedDate: '2023-10-15',
          archivedBy: 'Materials Team',
          originalLocation: '/materials/specs/legacy',
          size: 45088768,
          retentionDate: '2025-10-15',
          status: 'pending_deletion',
          metadata: {
            specCount: 89,
            lastUsed: '2022-03-15',
            replacedBy: 'Updated specifications v2.0'
          },
          tags: ['materials', 'specifications', 'legacy', 'outdated']
        }
      ];
      setArchivedItems(mockArchivedItems);
      setLoading(false);
    }, 1000);
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'project': return Package;
      case 'document': return FileText;
      case 'image': return Image;
      case 'data': return Archive;
      case 'user': return Users;
      default: return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'project': return '#8B5CF6';
      case 'document': return '#006FEE';
      case 'image': return '#F59E0B';
      case 'data': return '#10B981';
      case 'user': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'archived': return '#10B981';
      case 'pending_deletion': return '#F59E0B';
      case 'restored': return '#006FEE';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'archived': return CheckCircle;
      case 'pending_deletion': return AlertTriangle;
      case 'restored': return Info;
      default: return Clock;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const handleRestore = (itemId: string) => {
    setArchivedItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, status: 'restored' as const } : item
      )
    );
  };

  const handleDelete = (itemId: string) => {
    setArchivedItems(items => items.filter(item => item.id !== itemId));
  };

  const handleBulkAction = (action: 'restore' | 'delete') => {
    if (action === 'restore') {
      setArchivedItems(items =>
        items.map(item =>
          selectedItems.includes(item.id) ? { ...item, status: 'restored' as const } : item
        )
      );
    } else {
      setArchivedItems(items => items.filter(item => !selectedItems.includes(item.id)));
    }
    setSelectedItems([]);
  };

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const filteredItems = archivedItems.filter(item => {
    const matchesSearch = searchTerm === '' ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesType && matchesCategory;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'name': return a.name.localeCompare(b.name);
      case 'archivedDate': return new Date(b.archivedDate).getTime() - new Date(a.archivedDate).getTime();
      case 'size': return b.size - a.size;
      case 'retentionDate': return new Date(a.retentionDate).getTime() - new Date(b.retentionDate).getTime();
      default: return 0;
    }
  });

  const itemTypes = [
    { value: 'all', label: 'All Types', count: archivedItems.length },
    { value: 'project', label: 'Projects', count: archivedItems.filter(item => item.type === 'project').length },
    { value: 'document', label: 'Documents', count: archivedItems.filter(item => item.type === 'document').length },
    { value: 'image', label: 'Images', count: archivedItems.filter(item => item.type === 'image').length },
    { value: 'data', label: 'Data', count: archivedItems.filter(item => item.type === 'data').length },
    { value: 'user', label: 'User Data', count: archivedItems.filter(item => item.type === 'user').length }
  ];

  const categories = Array.from(new Set(archivedItems.map(item => item.category)));

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
          <p style={{ color: '#6B7280' }}>Loading archive...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#111827', margin: '0 0 8px 0' }}>
                Archive Center
              </h1>
              <p style={{ fontSize: '16px', color: '#6B7280' }}>
                Manage archived projects, documents, and data with retention policies
              </p>
            </div>
            
            {selectedItems.length > 0 && (
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => handleBulkAction('restore')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 16px',
                    backgroundColor: '#10B981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  <RotateCcw size={16} />
                  Restore ({selectedItems.length})
                </button>
                <button
                  onClick={() => handleBulkAction('delete')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 16px',
                    backgroundColor: '#EF4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  <Trash2 size={16} />
                  Delete ({selectedItems.length})
                </button>
              </div>
            )}
          </div>

          {/* Controls */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ position: 'relative' }}>
                <Search size={20} style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#6B7280'
                }} />
                <input
                  type="text"
                  placeholder="Search archived items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    padding: '10px 12px 10px 40px',
                    borderRadius: '8px',
                    border: '2px solid #E5E7EB',
                    fontSize: '14px',
                    width: '300px',
                    outline: 'none',
                    backgroundColor: 'white'
                  }}
                />
              </div>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 12px',
                  backgroundColor: showFilters ? '#006FEE' : 'white',
                  color: showFilters ? 'white' : '#374151',
                  border: '2px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                <Filter size={16} />
                Filters
                {showFilters ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>
            </div>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '10px 12px',
                borderRadius: '8px',
                border: '2px solid #E5E7EB',
                fontSize: '14px',
                backgroundColor: 'white',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="archivedDate">Sort by Archive Date</option>
              <option value="name">Sort by Name</option>
              <option value="size">Sort by Size</option>
              <option value="retentionDate">Sort by Retention Date</option>
            </select>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div style={{
              marginTop: '16px',
              padding: '20px',
              backgroundColor: 'white',
              borderRadius: '8px',
              border: '2px solid #E5E7EB',
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap'
            }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#6B7280', marginBottom: '4px' }}>
                  Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid #E5E7EB',
                    fontSize: '14px',
                    backgroundColor: 'white',
                    cursor: 'pointer'
                  }}
                >
                  {itemTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label} ({type.count})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#6B7280', marginBottom: '4px' }}>
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid #E5E7EB',
                    fontSize: '14px',
                    backgroundColor: 'white',
                    cursor: 'pointer'
                  }}
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Summary Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            border: '2px solid #E5E7EB',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <Archive size={24} color="#006FEE" />
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: 0 }}>
                Total Items
              </h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#111827' }}>
              {archivedItems.length}
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            border: '2px solid #E5E7EB',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <Package size={24} color="#10B981" />
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: 0 }}>
                Storage Used
              </h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#111827' }}>
              {formatFileSize(archivedItems.reduce((sum, item) => sum + item.size, 0))}
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            border: '2px solid #E5E7EB',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <AlertTriangle size={24} color="#F59E0B" />
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: 0 }}>
                Pending Deletion
              </h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#111827' }}>
              {archivedItems.filter(item => item.status === 'pending_deletion').length}
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            border: '2px solid #E5E7EB',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <Clock size={24} color="#8B5CF6" />
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: 0 }}>
                Retention Days
              </h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#111827' }}>
              {Math.round(archivedItems.reduce((sum, item) => {
                const retentionDays = Math.ceil((new Date(item.retentionDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                return sum + Math.max(0, retentionDays);
              }, 0) / archivedItems.length)}
            </div>
          </div>
        </div>

        {/* Archive Items List */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          border: '2px solid #E5E7EB',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
          overflow: 'hidden'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '40px 1fr 120px 120px 120px 120px 120px 100px',
            padding: '16px 24px',
            borderBottom: '1px solid #E5E7EB',
            backgroundColor: '#F9FAFB',
            fontSize: '12px',
            fontWeight: '600',
            color: '#6B7280',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            <div></div>
            <div>Item</div>
            <div>Type</div>
            <div>Size</div>
            <div>Archived</div>
            <div>Retention</div>
            <div>Status</div>
            <div>Actions</div>
          </div>

          {sortedItems.map((item, index) => {
            const TypeIcon = getTypeIcon(item.type);
            const StatusIcon = getStatusIcon(item.status);
            const isSelected = selectedItems.includes(item.id);
            
            return (
              <div
                key={item.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '40px 1fr 120px 120px 120px 120px 120px 100px',
                  padding: '16px 24px',
                  borderBottom: index < sortedItems.length - 1 ? '1px solid #E5E7EB' : 'none',
                  alignItems: 'center',
                  backgroundColor: isSelected ? '#EFF6FF' : 'white',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = '#F9FAFB';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = 'white';
                  }
                }}
              >
                <div>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleItemSelection(item.id)}
                    style={{
                      width: '16px',
                      height: '16px',
                      cursor: 'pointer'
                    }}
                  />
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    backgroundColor: `${getTypeColor(item.type)}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: getTypeColor(item.type)
                  }}>
                    <TypeIcon size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: '500', color: '#111827', marginBottom: '2px' }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: '12px', color: '#6B7280' }}>
                      {item.category} • {item.originalLocation}
                    </div>
                  </div>
                </div>
                
                <div>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: '500',
                    backgroundColor: `${getTypeColor(item.type)}20`,
                    color: getTypeColor(item.type)
                  }}>
                    {item.type}
                  </span>
                </div>
                
                <div style={{ fontSize: '14px', color: '#111827' }}>
                  {formatFileSize(item.size)}
                </div>
                
                <div style={{ fontSize: '14px', color: '#6B7280' }}>
                  {formatDate(item.archivedDate)}
                </div>
                
                <div style={{ fontSize: '14px', color: '#6B7280' }}>
                  {formatDate(item.retentionDate)}
                </div>
                
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '4px 8px',
                    backgroundColor: `${getStatusColor(item.status)}20`,
                    color: getStatusColor(item.status),
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}>
                    <StatusIcon size={12} />
                    {item.status}
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button
                    onClick={() => handleRestore(item.id)}
                    disabled={item.status === 'restored'}
                    style={{
                      padding: '6px',
                      backgroundColor: item.status === 'restored' ? '#E5E7EB' : '#10B981',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: item.status === 'restored' ? 'not-allowed' : 'pointer',
                      opacity: item.status === 'restored' ? 0.5 : 1
                    }}
                    title="Restore"
                  >
                    <RotateCcw size={14} color="white" />
                  </button>
                  <button
                    style={{
                      padding: '6px',
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                    title="View Details"
                  >
                    <Eye size={14} color="#6B7280" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    style={{
                      padding: '6px',
                      backgroundColor: '#EF4444',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                    title="Permanent Delete"
                  >
                    <Trash2 size={14} color="white" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {sortedItems.length === 0 && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '48px 24px',
            border: '2px solid #E5E7EB',
            textAlign: 'center'
          }}>
            <Archive size={48} color="#D1D5DB" style={{ margin: '0 auto 16px auto' }} />
            <h3 style={{ fontSize: '18px', fontWeight: '500', color: '#111827', margin: '0 0 8px 0' }}>
              No archived items found
            </h3>
            <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>
              No archived items match your current search criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}