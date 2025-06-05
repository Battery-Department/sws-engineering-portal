'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  FileText,
  Download,
  Eye,
  Search,
  Filter,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  AlertTriangle,
  ArrowLeft,
  Train,
  Wrench
} from 'lucide-react';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

interface Invoice {
  id: string;
  invoiceNumber: string;
  projectName: string;
  projectType: 'locomotive_restoration' | 'cad_design' | 'plant_repair' | 'heritage_railway' | 'manufacturing';
  amount: number;
  issueDate: string;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue' | 'draft';
  description: string;
  client: string;
}

export default function CustomerInvoicesPage() {
  const router = useRouter();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    // Simulate API call to fetch customer invoices
    setTimeout(() => {
      const mockInvoices: Invoice[] = [
        {
          id: 'inv-001',
          invoiceNumber: 'SWSE-INV-2024-0012',
          projectName: '7¼" Gauge Steam Locomotive Restoration',
          projectType: 'locomotive_restoration',
          amount: 9057.60,
          issueDate: '2024-01-15',
          dueDate: '2024-02-14',
          status: 'paid',
          description: 'Complete boiler restoration including fire tube replacement and pressure testing',
          client: 'Didcot Railway Centre'
        },
        {
          id: 'inv-002',
          invoiceNumber: 'SWSE-INV-2024-0018',
          projectName: 'CAD Design Services - Signal Box Components',
          projectType: 'cad_design',
          amount: 2850.00,
          issueDate: '2024-01-20',
          dueDate: '2024-02-19',
          status: 'paid',
          description: '3D CAD modeling and technical drawings for heritage signal box restoration',
          client: 'West Somerset Railway'
        },
        {
          id: 'inv-003',
          invoiceNumber: 'SWSE-INV-2024-0024',
          projectName: 'Plant Machinery Repair - Compressor Overhaul',
          projectType: 'plant_repair',
          amount: 4275.50,
          issueDate: '2024-02-01',
          dueDate: '2024-03-02',
          status: 'pending',
          description: 'Complete overhaul of industrial air compressor system including new seals and bearings',
          client: 'Cornwall Industrial Ltd'
        },
        {
          id: 'inv-004',
          invoiceNumber: 'SWSE-INV-2024-0031',
          projectName: 'Heritage Railway Track Maintenance',
          projectType: 'heritage_railway',
          amount: 6420.00,
          issueDate: '2024-02-10',
          dueDate: '2024-03-11',
          status: 'overdue',
          description: 'Track alignment and rail replacement for heritage railway section',
          client: 'Bodmin & Wenford Railway'
        },
        {
          id: 'inv-005',
          invoiceNumber: 'SWSE-INV-2024-0037',
          projectName: 'Custom Fabrication - Locomotive Components',
          projectType: 'manufacturing',
          amount: 8940.25,
          issueDate: '2024-02-15',
          dueDate: '2024-03-16',
          status: 'pending',
          description: 'Precision machining and fabrication of custom locomotive valve components',
          client: 'Steam Railway Preservation Society'
        },
        {
          id: 'inv-006',
          invoiceNumber: 'SWSE-INV-2024-0043',
          projectName: 'Engineering Consultation - Safety Systems',
          projectType: 'cad_design',
          amount: 1650.00,
          issueDate: '2024-02-20',
          dueDate: '2024-03-21',
          status: 'draft',
          description: 'Safety system design and compliance documentation for heritage locomotive',
          client: 'Devon Railway Trust'
        }
      ];
      setInvoices(mockInvoices);
      setLoading(false);
    }, 1000);
  }, []);

  const getProjectTypeIcon = (type: string) => {
    switch (type) {
      case 'locomotive_restoration': return Train;
      case 'cad_design': return FileText;
      case 'plant_repair': return Wrench;
      case 'heritage_railway': return Train;
      case 'manufacturing': return Wrench;
      default: return FileText;
    }
  };

  const getProjectTypeColor = (type: string) => {
    switch (type) {
      case 'locomotive_restoration': return '#8B5CF6';
      case 'cad_design': return '#006FEE';
      case 'plant_repair': return '#F59E0B';
      case 'heritage_railway': return '#10B981';
      case 'manufacturing': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return '#10B981';
      case 'pending': return '#F59E0B';
      case 'overdue': return '#EF4444';
      case 'draft': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return CheckCircle;
      case 'pending': return Clock;
      case 'overdue': return AlertTriangle;
      case 'draft': return FileText;
      default: return Clock;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = searchTerm === '' ||
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || invoice.status === selectedStatus;
    const matchesType = selectedType === 'all' || invoice.projectType === selectedType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleViewInvoice = (invoice: Invoice) => {
    // In a real app, this would open the detailed invoice view
    alert(`Opening detailed view for ${invoice.invoiceNumber}`);
  };

  const handleDownloadInvoice = (invoice: Invoice) => {
    // In a real app, this would download the PDF
    alert(`Downloading PDF for ${invoice.invoiceNumber}`);
  };

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
          <p style={{ color: '#6B7280' }}>Loading invoices...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
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
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#006FEE';
                e.currentTarget.style.backgroundColor = '#EFF6FF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E5E7EB';
                e.currentTarget.style.backgroundColor = 'white';
              }}
            >
              <ArrowLeft size={16} />
              Back to Dashboard
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#111827', margin: '0 0 8px 0' }}>
                Your Invoices
              </h1>
              <p style={{ fontSize: '16px', color: '#6B7280' }}>
                View and download your South West Steam Engineering invoices
              </p>
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
                  placeholder="Search invoices..."
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
              
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
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
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
                <option value="draft">Draft</option>
              </select>

              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
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
                <option value="all">All Types</option>
                <option value="locomotive_restoration">Locomotive Restoration</option>
                <option value="cad_design">CAD Design</option>
                <option value="plant_repair">Plant Repair</option>
                <option value="heritage_railway">Heritage Railway</option>
                <option value="manufacturing">Manufacturing</option>
              </select>
            </div>
          </div>
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
              <FileText size={24} color="#006FEE" />
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: 0 }}>
                Total Invoices
              </h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#111827' }}>
              {invoices.length}
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
              <DollarSign size={24} color="#10B981" />
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: 0 }}>
                Total Value
              </h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#111827' }}>
              £{invoices.reduce((sum, inv) => sum + inv.amount, 0).toLocaleString()}
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
              <CheckCircle size={24} color="#10B981" />
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: 0 }}>
                Paid
              </h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#111827' }}>
              {invoices.filter(inv => inv.status === 'paid').length}
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
                Outstanding
              </h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#111827' }}>
              {invoices.filter(inv => inv.status === 'pending' || inv.status === 'overdue').length}
            </div>
          </div>
        </div>

        {/* Invoices List */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          border: '2px solid #E5E7EB',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
          overflow: 'hidden'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 200px 120px 120px 120px 150px',
            padding: '16px 24px',
            borderBottom: '1px solid #E5E7EB',
            backgroundColor: '#F9FAFB',
            fontSize: '12px',
            fontWeight: '600',
            color: '#6B7280',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            <div>Invoice Details</div>
            <div>Project Type</div>
            <div>Amount</div>
            <div>Issue Date</div>
            <div>Status</div>
            <div>Actions</div>
          </div>

          {filteredInvoices.map((invoice, index) => {
            const TypeIcon = getProjectTypeIcon(invoice.projectType);
            const StatusIcon = getStatusIcon(invoice.status);
            
            return (
              <div
                key={invoice.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 200px 120px 120px 120px 150px',
                  padding: '20px 24px',
                  borderBottom: index < filteredInvoices.length - 1 ? '1px solid #E5E7EB' : 'none',
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
                  <div style={{ fontWeight: '600', color: '#111827', marginBottom: '4px', fontSize: '16px' }}>
                    {invoice.invoiceNumber}
                  </div>
                  <div style={{ fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
                    {invoice.projectName}
                  </div>
                  <div style={{ fontSize: '14px', color: '#6B7280' }}>
                    {invoice.client}
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    backgroundColor: `${getProjectTypeColor(invoice.projectType)}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: getProjectTypeColor(invoice.projectType)
                  }}>
                    <TypeIcon size={16} />
                  </div>
                  <span style={{
                    fontSize: '12px',
                    fontWeight: '500',
                    color: getProjectTypeColor(invoice.projectType)
                  }}>
                    {invoice.projectType.replace('_', ' ')}
                  </span>
                </div>
                
                <div style={{ fontSize: '16px', fontWeight: '700', color: '#111827' }}>
                  £{invoice.amount.toLocaleString()}
                </div>
                
                <div style={{ fontSize: '14px', color: '#6B7280' }}>
                  {formatDate(invoice.issueDate)}
                </div>
                
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    backgroundColor: `${getStatusColor(invoice.status)}20`,
                    color: getStatusColor(invoice.status),
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    <StatusIcon size={14} />
                    {invoice.status.toUpperCase()}
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => handleViewInvoice(invoice)}
                    style={{
                      padding: '8px',
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '6px',
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
                    title="View Invoice"
                  >
                    <Eye size={16} color="#6B7280" />
                  </button>
                  <button
                    onClick={() => handleDownloadInvoice(invoice)}
                    style={{
                      padding: '8px',
                      backgroundColor: '#006FEE',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#0056CC';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#006FEE';
                    }}
                    title="Download PDF"
                  >
                    <Download size={16} color="white" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredInvoices.length === 0 && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '48px 24px',
            border: '2px solid #E5E7EB',
            textAlign: 'center'
          }}>
            <FileText size={48} color="#D1D5DB" style={{ margin: '0 auto 16px auto' }} />
            <h3 style={{ fontSize: '18px', fontWeight: '500', color: '#111827', margin: '0 0 8px 0' }}>
              No invoices found
            </h3>
            <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>
              No invoices match your current search criteria.
            </p>
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
  );
}