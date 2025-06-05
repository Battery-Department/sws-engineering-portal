'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  FileText,
  Download,
  Eye,
  Calendar,
  Award,
  Receipt,
  File,
  Image,
  Search,
  Filter,
  Upload,
  Folder,
  Grid3X3,
  List,
  MoreVertical,
  Share,
  Star
} from 'lucide-react';

interface ProjectDocument {
  id: string;
  name: string;
  type: string;
  category: 'technical' | 'invoice' | 'report' | 'certificate' | 'photo' | 'drawing';
  size: number;
  uploadedAt: string;
  uploadedBy: string;
  description: string;
  version: string;
  tags: string[];
  isStarred: boolean;
}

export default function CustomerProjectDocumentsPage() {
  const params = useParams();
  const projectId = params.projectId as string;
  const [documents, setDocuments] = useState<ProjectDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [downloading, setDownloading] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call to fetch project documents
    setTimeout(() => {
      const mockDocuments: ProjectDocument[] = [
        {
          id: '1',
          name: 'Initial Assessment Report',
          type: 'pdf',
          category: 'report',
          size: 2560000,
          uploadedAt: '2024-01-26T10:30:00Z',
          uploadedBy: 'Mike Thompson',
          description: 'Comprehensive condition survey and assessment of locomotive components',
          version: '1.0',
          tags: ['assessment', 'condition', 'survey'],
          isStarred: true
        },
        {
          id: '2',
          name: 'Fire Tube Specifications',
          type: 'pdf',
          category: 'technical',
          size: 450000,
          uploadedAt: '2024-02-15T14:20:00Z',
          uploadedBy: 'Sarah Williams',
          description: 'Technical specifications for heritage-grade steel fire tubes',
          version: '2.1',
          tags: ['specifications', 'fire-tubes', 'technical'],
          isStarred: false
        },
        {
          id: '3',
          name: 'Progress Report - May 2024',
          type: 'pdf',
          category: 'report',
          size: 1850000,
          uploadedAt: '2024-05-18T09:15:00Z',
          uploadedBy: 'Mike Thompson',
          description: 'Monthly progress report covering fire tube installation phase',
          version: '1.0',
          tags: ['progress', 'monthly', 'fire-tubes'],
          isStarred: true
        },
        {
          id: '4',
          name: 'Invoice INV-2024-0012',
          type: 'pdf',
          category: 'invoice',
          size: 280000,
          uploadedAt: '2024-05-20T11:45:00Z',
          uploadedBy: 'Finance System',
          description: 'Invoice for fire tube replacement and associated engineering work',
          version: '1.0',
          tags: ['invoice', 'payment', 'fire-tubes'],
          isStarred: false
        },
        {
          id: '5',
          name: 'Boiler Assembly Drawing',
          type: 'dwg',
          category: 'drawing',
          size: 850000,
          uploadedAt: '2024-02-05T16:30:00Z',
          uploadedBy: 'Sarah Williams',
          description: 'CAD drawing showing complete boiler assembly with fire tube layout',
          version: '3.2',
          tags: ['cad', 'boiler', 'assembly'],
          isStarred: false
        },
        {
          id: '6',
          name: 'Fire Tube Installation Photos',
          type: 'zip',
          category: 'photo',
          size: 15728640,
          uploadedAt: '2024-05-14T13:20:00Z',
          uploadedBy: 'Mike Thompson',
          description: 'High-resolution photographs documenting fire tube installation process',
          version: '1.0',
          tags: ['photos', 'installation', 'documentation'],
          isStarred: true
        },
        {
          id: '7',
          name: 'Pressure Test Certificate',
          type: 'pdf',
          category: 'certificate',
          size: 320000,
          uploadedAt: '2024-05-16T15:45:00Z',
          uploadedBy: 'Quality Department',
          description: 'Official pressure test certification for boiler assembly',
          version: '1.0',
          tags: ['certificate', 'pressure-test', 'compliance'],
          isStarred: true
        },
        {
          id: '8',
          name: 'Material Specifications',
          type: 'pdf',
          category: 'technical',
          size: 680000,
          uploadedAt: '2024-01-30T12:00:00Z',
          uploadedBy: 'Sarah Williams',
          description: 'Detailed material specifications and compliance documentation',
          version: '1.1',
          tags: ['materials', 'specifications', 'compliance'],
          isStarred: false
        }
      ];
      setDocuments(mockDocuments);
      setLoading(false);
    }, 1000);
  }, [projectId]);

  const getFileIcon = (category: string) => {
    switch (category) {
      case 'invoice': return Receipt;
      case 'certificate': return Award;
      case 'report': return FileText;
      case 'photo': return Image;
      case 'drawing': return File;
      case 'technical': return FileText;
      default: return File;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'invoice': return '#10B981';
      case 'certificate': return '#8B5CF6';
      case 'report': return '#006FEE';
      case 'photo': return '#F59E0B';
      case 'drawing': return '#EF4444';
      case 'technical': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleDownload = async (documentId: string, filename: string) => {
    setDownloading(documentId);
    // Simulate download
    await new Promise(resolve => setTimeout(resolve, 2000));
    alert(`Downloaded: ${filename}`);
    setDownloading(null);
  };

  const toggleStar = (documentId: string) => {
    setDocuments(docs => 
      docs.map(doc => 
        doc.id === documentId ? { ...doc, isStarred: !doc.isStarred } : doc
      )
    );
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = searchTerm === '' ||
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { value: 'all', label: 'All Documents', count: documents.length },
    { value: 'report', label: 'Reports', count: documents.filter(d => d.category === 'report').length },
    { value: 'technical', label: 'Technical', count: documents.filter(d => d.category === 'technical').length },
    { value: 'invoice', label: 'Invoices', count: documents.filter(d => d.category === 'invoice').length },
    { value: 'certificate', label: 'Certificates', count: documents.filter(d => d.category === 'certificate').length },
    { value: 'photo', label: 'Photos', count: documents.filter(d => d.category === 'photo').length },
    { value: 'drawing', label: 'Drawings', count: documents.filter(d => d.category === 'drawing').length }
  ];

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
          <p style={{ color: '#6B7280' }}>Loading project documents...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <Link 
            href={`/customer/projects/${projectId}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#006FEE',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              marginBottom: '16px'
            }}
          >
            <ArrowLeft size={16} />
            Back to Project
          </Link>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#111827', margin: '0 0 8px 0' }}>
                Project Documents
              </h1>
              <p style={{ fontSize: '16px', color: '#6B7280' }}>
                7¼" Gauge Steam Locomotive Restoration
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                backgroundColor: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}>
                <Upload size={16} />
                Upload
              </button>
              <button style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                backgroundColor: '#006FEE',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}>
                <Share size={16} />
                Share
              </button>
            </div>
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
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    padding: '10px 12px 10px 40px',
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB',
                    fontSize: '14px',
                    width: '300px',
                    outline: 'none',
                    backgroundColor: 'white'
                  }}
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB',
                  fontSize: '14px',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label} ({category.count})
                  </option>
                ))}
              </select>
            </div>
            
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setViewMode('list')}
                style={{
                  padding: '8px',
                  backgroundColor: viewMode === 'list' ? '#006FEE' : 'white',
                  color: viewMode === 'list' ? 'white' : '#6B7280',
                  border: '1px solid #E5E7EB',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                <List size={16} />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                style={{
                  padding: '8px',
                  backgroundColor: viewMode === 'grid' ? '#006FEE' : 'white',
                  color: viewMode === 'grid' ? 'white' : '#6B7280',
                  border: '1px solid #E5E7EB',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                <Grid3X3 size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Documents List/Grid */}
        {viewMode === 'list' ? (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            border: '1px solid #E5E7EB',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
            overflow: 'hidden'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 120px 120px 120px 80px 80px',
              padding: '16px 24px',
              borderBottom: '1px solid #E5E7EB',
              backgroundColor: '#F9FAFB',
              fontSize: '12px',
              fontWeight: '600',
              color: '#6B7280',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              <div>Document</div>
              <div>Category</div>
              <div>Size</div>
              <div>Date</div>
              <div>Star</div>
              <div>Actions</div>
            </div>

            {filteredDocuments.map((doc, index) => {
              const FileIcon = getFileIcon(doc.category);
              const isDownloading = downloading === doc.id;
              
              return (
                <div
                  key={doc.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 120px 120px 120px 80px 80px',
                    padding: '16px 24px',
                    borderBottom: index < filteredDocuments.length - 1 ? '1px solid #E5E7EB' : 'none',
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      backgroundColor: `${getCategoryColor(doc.category)}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: getCategoryColor(doc.category)
                    }}>
                      <FileIcon size={20} />
                    </div>
                    <div>
                      <div style={{ fontWeight: '500', color: '#111827', marginBottom: '2px' }}>
                        {doc.name}
                      </div>
                      <div style={{ fontSize: '13px', color: '#6B7280' }}>
                        {doc.description}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '500',
                      backgroundColor: `${getCategoryColor(doc.category)}20`,
                      color: getCategoryColor(doc.category)
                    }}>
                      {doc.category}
                    </span>
                  </div>
                  
                  <div style={{ fontSize: '14px', color: '#6B7280' }}>
                    {formatFileSize(doc.size)}
                  </div>
                  
                  <div style={{ fontSize: '14px', color: '#6B7280' }}>
                    {new Date(doc.uploadedAt).toLocaleDateString('en-GB', { 
                      day: 'numeric', 
                      month: 'short' 
                    })}
                  </div>
                  
                  <div>
                    <button
                      onClick={() => toggleStar(doc.id)}
                      style={{
                        padding: '4px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <Star 
                        size={16} 
                        color={doc.isStarred ? '#F59E0B' : '#D1D5DB'}
                        fill={doc.isStarred ? '#F59E0B' : 'none'}
                      />
                    </button>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button style={{
                      padding: '6px',
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}>
                      <Eye size={14} color="#6B7280" />
                    </button>
                    <button
                      onClick={() => handleDownload(doc.id, doc.name)}
                      disabled={isDownloading}
                      style={{
                        padding: '6px',
                        backgroundColor: '#006FEE',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: isDownloading ? 'not-allowed' : 'pointer',
                        opacity: isDownloading ? 0.5 : 1
                      }}
                    >
                      {isDownloading ? (
                        <div style={{
                          width: '14px',
                          height: '14px',
                          border: '2px solid white',
                          borderTop: '2px solid transparent',
                          borderRadius: '50%',
                          animation: 'spin 1s linear infinite'
                        }} />
                      ) : (
                        <Download size={14} color="white" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {filteredDocuments.map((doc) => {
              const FileIcon = getFileIcon(doc.category);
              const isDownloading = downloading === doc.id;
              
              return (
                <div
                  key={doc.id}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    padding: '24px',
                    border: '1px solid #E5E7EB',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      backgroundColor: `${getCategoryColor(doc.category)}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: getCategoryColor(doc.category)
                    }}>
                      <FileIcon size={24} />
                    </div>
                    <button
                      onClick={() => toggleStar(doc.id)}
                      style={{
                        padding: '4px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <Star 
                        size={16} 
                        color={doc.isStarred ? '#F59E0B' : '#D1D5DB'}
                        fill={doc.isStarred ? '#F59E0B' : 'none'}
                      />
                    </button>
                  </div>
                  
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: '0 0 8px 0' }}>
                    {doc.name}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#6B7280', margin: '0 0 16px 0' }}>
                    {doc.description}
                  </p>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '500',
                      backgroundColor: `${getCategoryColor(doc.category)}20`,
                      color: getCategoryColor(doc.category)
                    }}>
                      {doc.category}
                    </span>
                    <span style={{ fontSize: '12px', color: '#6B7280' }}>
                      {formatFileSize(doc.size)}
                    </span>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={{
                      flex: 1,
                      padding: '8px',
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      color: '#374151'
                    }}>
                      <Eye size={14} style={{ marginRight: '4px' }} />
                      Preview
                    </button>
                    <button
                      onClick={() => handleDownload(doc.id, doc.name)}
                      disabled={isDownloading}
                      style={{
                        flex: 1,
                        padding: '8px',
                        backgroundColor: '#006FEE',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: isDownloading ? 'not-allowed' : 'pointer',
                        fontSize: '14px',
                        opacity: isDownloading ? 0.5 : 1
                      }}
                    >
                      {isDownloading ? (
                        <>
                          <div style={{
                            width: '14px',
                            height: '14px',
                            border: '2px solid white',
                            borderTop: '2px solid transparent',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite',
                            display: 'inline-block',
                            marginRight: '4px'
                          }} />
                          Downloading...
                        </>
                      ) : (
                        <>
                          <Download size={14} style={{ marginRight: '4px' }} />
                          Download
                        </>
                      )}
                    </button>
                  </div>
                  
                  <div style={{ marginTop: '12px', fontSize: '12px', color: '#6B7280' }}>
                    Uploaded {formatDate(doc.uploadedAt)} by {doc.uploadedBy}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {filteredDocuments.length === 0 && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '48px 24px',
            border: '1px solid #E5E7EB',
            textAlign: 'center'
          }}>
            <Folder size={48} color="#D1D5DB" style={{ margin: '0 auto 16px auto' }} />
            <h3 style={{ fontSize: '18px', fontWeight: '500', color: '#111827', margin: '0 0 8px 0' }}>
              No documents found
            </h3>
            <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>
              No documents match your current search criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}