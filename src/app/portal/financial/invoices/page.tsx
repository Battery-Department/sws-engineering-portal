'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  PoundSterling,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Send,
  Download,
  Eye,
  Printer,
  Mail,
  Calendar,
  Search,
  Filter,
  Plus,
  TrendingUp,
  TrendingDown,
  ChevronRight,
  DollarSign,
  CreditCard,
  RefreshCw,
  Archive,
  Edit3,
  Copy,
  MoreVertical,
  User
} from 'lucide-react';

interface Invoice {
  id: string;
  invoiceNumber: string;
  projectId: string;
  projectName: string;
  clientId: string;
  clientName: string;
  status: 'draft' | 'sent' | 'viewed' | 'paid' | 'overdue' | 'cancelled';
  issueDate: string;
  dueDate: string;
  paidDate?: string;
  subtotal: number;
  vat: number;
  total: number;
  items: InvoiceItem[];
  paymentTerms: string;
  notes?: string;
  remindersSent: number;
  lastReminderDate?: string;
}

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export default function InvoicesPage() {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('all');
  const [showActions, setShowActions] = useState<string | null>(null);

  // Mock data
  const mockInvoices: Invoice[] = [
    {
      id: 'INV-001',
      invoiceNumber: 'SWSE-2024-0156',
      projectId: 'PRJ-2024-001',
      projectName: 'GWR 4900 Hall Class Boiler Restoration',
      clientId: 'CL-001',
      clientName: 'Didcot Railway Centre',
      status: 'paid',
      issueDate: '2024-01-20',
      dueDate: '2024-02-20',
      paidDate: '2024-02-15',
      subtotal: 42500,
      vat: 8500,
      total: 51000,
      paymentTerms: 'Net 30',
      remindersSent: 0,
      items: [
        {
          id: 'item-1',
          description: 'Boiler restoration and certification - Phase 1',
          quantity: 1,
          unitPrice: 25000,
          total: 25000
        },
        {
          id: 'item-2',
          description: 'Fire tube replacement (24 tubes)',
          quantity: 24,
          unitPrice: 450,
          total: 10800
        },
        {
          id: 'item-3',
          description: 'Labor and installation',
          quantity: 80,
          unitPrice: 85,
          total: 6800
        }
      ]
    },
    {
      id: 'INV-002',
      invoiceNumber: 'SWSE-2024-0157',
      projectId: 'PRJ-2024-002',
      projectName: 'Mining Conveyor Gearbox Rebuild',
      clientId: 'CL-002',
      clientName: 'Cornwall Clay Industries',
      status: 'overdue',
      issueDate: '2024-01-25',
      dueDate: '2024-02-25',
      subtotal: 8750,
      vat: 1750,
      total: 10500,
      paymentTerms: 'Net 30',
      remindersSent: 2,
      lastReminderDate: '2024-03-05',
      items: []
    },
    {
      id: 'INV-003',
      invoiceNumber: 'SWSE-2024-0158',
      projectId: 'PRJ-2024-003',
      projectName: 'CAD Design - Signal Box Mechanism',
      clientId: 'CL-003',
      clientName: 'West Somerset Railway',
      status: 'sent',
      issueDate: '2024-02-08',
      dueDate: '2024-03-08',
      subtotal: 2850,
      vat: 570,
      total: 3420,
      paymentTerms: 'Net 30',
      remindersSent: 0,
      items: []
    }
  ];

  const filteredInvoices = mockInvoices.filter(invoice => {
    const matchesStatus = filterStatus === 'all' || invoice.status === filterStatus;
    const matchesSearch = searchTerm === '' ||
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.projectName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return '#10B981';
      case 'sent': return '#3B82F6';
      case 'viewed': return '#6366F1';
      case 'overdue': return '#EF4444';
      case 'draft': return '#6B7280';
      case 'cancelled': return '#DC2626';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle size={16} />;
      case 'sent': return <Send size={16} />;
      case 'viewed': return <Eye size={16} />;
      case 'overdue': return <AlertTriangle size={16} />;
      case 'draft': return <Edit3 size={16} />;
      case 'cancelled': return <XCircle size={16} />;
      default: return <FileText size={16} />;
    }
  };

  const totalStats = {
    totalAmount: mockInvoices.reduce((sum, inv) => sum + inv.total, 0),
    paidAmount: mockInvoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.total, 0),
    overdueAmount: mockInvoices.filter(inv => inv.status === 'overdue').reduce((sum, inv) => sum + inv.total, 0),
    pendingAmount: mockInvoices.filter(inv => ['sent', 'viewed'].includes(inv.status)).reduce((sum, inv) => sum + inv.total, 0)
  };

  const getDaysOverdue = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = today.getTime() - due.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
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
              <FileText size={24} color="white" />
            </div>
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#111827', margin: 0 }}>
                Invoices
              </h1>
              <p style={{ fontSize: '16px', color: '#6B7280', margin: 0 }}>
                Manage and track all project invoices and payments
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
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
                <PoundSterling size={20} color="#006FEE" />
              </div>
              <span style={{ fontSize: '14px', color: '#6B7280' }}>Total Outstanding</span>
            </div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#111827', marginBottom: '4px' }}>
              £{totalStats.pendingAmount.toLocaleString()}
            </div>
            <div style={{ fontSize: '14px', color: '#6B7280' }}>
              Awaiting payment
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
                <CheckCircle size={20} color="#10B981" />
              </div>
              <span style={{ fontSize: '14px', color: '#6B7280' }}>Paid This Month</span>
            </div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#111827', marginBottom: '4px' }}>
              £{totalStats.paidAmount.toLocaleString()}
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
                backgroundColor: '#FEE2E2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <AlertTriangle size={20} color="#EF4444" />
              </div>
              <span style={{ fontSize: '14px', color: '#6B7280' }}>Overdue</span>
            </div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#111827', marginBottom: '4px' }}>
              £{totalStats.overdueAmount.toLocaleString()}
            </div>
            <div style={{ fontSize: '14px', color: '#EF4444' }}>
              Requires attention
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
                backgroundColor: '#F3F4F6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <CreditCard size={20} color="#6B7280" />
              </div>
              <span style={{ fontSize: '14px', color: '#6B7280' }}>Avg Payment Time</span>
            </div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#111827', marginBottom: '4px' }}>
              18 days
            </div>
            <div style={{ fontSize: '14px', color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <TrendingDown size={16} />
              <span>-3 days improvement</span>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          flexWrap: 'wrap',
          gap: '16px'
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
                  border: '1px solid #E5E7EB',
                  fontSize: '14px',
                  width: '300px',
                  outline: 'none',
                  backgroundColor: 'white'
                }}
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
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
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="sent">Sent</option>
              <option value="viewed">Viewed</option>
              <option value="paid">Paid</option>
              <option value="overdue">Overdue</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
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
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              backgroundColor: '#006FEE',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 2px 8px rgba(0, 111, 238, 0.2)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#0050B3';
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 111, 238, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#006FEE';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 111, 238, 0.2)';
            }}
          >
            <Plus size={16} />
            Create Invoice
          </button>
        </div>

        {/* Invoices Table */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          border: '1px solid #E5E7EB',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
          overflow: 'hidden'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '0.8fr 1.2fr 1fr 0.8fr 0.8fr 0.8fr 0.6fr 80px',
            padding: '16px 24px',
            borderBottom: '1px solid #E5E7EB',
            backgroundColor: '#F9FAFB',
            fontSize: '12px',
            fontWeight: '600',
            color: '#6B7280',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            <div>Invoice #</div>
            <div>Client / Project</div>
            <div>Amount</div>
            <div>Status</div>
            <div>Issue Date</div>
            <div>Due Date</div>
            <div>Age</div>
            <div></div>
          </div>

          {filteredInvoices.map((invoice, index) => (
            <div
              key={invoice.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '0.8fr 1.2fr 1fr 0.8fr 0.8fr 0.8fr 0.6fr 80px',
                padding: '20px 24px',
                borderBottom: index < filteredInvoices.length - 1 ? '1px solid #E5E7EB' : 'none',
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
              onClick={() => setSelectedInvoice(invoice)}
            >
              <div>
                <div style={{ fontWeight: '600', color: '#111827', fontSize: '14px' }}>
                  {invoice.invoiceNumber}
                </div>
              </div>
              <div>
                <div style={{ fontWeight: '500', color: '#111827', marginBottom: '2px' }}>
                  {invoice.clientName}
                </div>
                <div style={{ fontSize: '13px', color: '#6B7280' }}>
                  {invoice.projectName}
                </div>
              </div>
              <div style={{ fontWeight: '600', color: '#111827' }}>
                £{invoice.total.toLocaleString()}
              </div>
              <div>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '500',
                  backgroundColor: `${getStatusColor(invoice.status)}20`,
                  color: getStatusColor(invoice.status)
                }}>
                  {getStatusIcon(invoice.status)}
                  {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                </span>
              </div>
              <div style={{ fontSize: '14px', color: '#6B7280' }}>
                {new Date(invoice.issueDate).toLocaleDateString()}
              </div>
              <div style={{ fontSize: '14px', color: '#6B7280' }}>
                {new Date(invoice.dueDate).toLocaleDateString()}
                {invoice.status === 'overdue' && (
                  <div style={{ fontSize: '12px', color: '#EF4444', marginTop: '2px' }}>
                    {getDaysOverdue(invoice.dueDate)} days overdue
                  </div>
                )}
              </div>
              <div style={{ fontSize: '14px', color: '#6B7280' }}>
                {Math.floor((new Date().getTime() - new Date(invoice.issueDate).getTime()) / (1000 * 60 * 60 * 24))}d
              </div>
              <div style={{ position: 'relative' }}>
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
                    setShowActions(showActions === invoice.id ? null : invoice.id);
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
                  <MoreVertical size={16} color="#6B7280" />
                </button>
                
                {showActions === invoice.id && (
                  <div style={{
                    position: 'absolute',
                    right: 0,
                    top: '100%',
                    marginTop: '4px',
                    backgroundColor: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    zIndex: 10,
                    minWidth: '160px'
                  }}>
                    <button
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 16px',
                        width: '100%',
                        border: 'none',
                        backgroundColor: 'transparent',
                        cursor: 'pointer',
                        fontSize: '14px',
                        color: '#374151',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <Eye size={16} />
                      View
                    </button>
                    <button
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 16px',
                        width: '100%',
                        border: 'none',
                        backgroundColor: 'transparent',
                        cursor: 'pointer',
                        fontSize: '14px',
                        color: '#374151',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <Download size={16} />
                      Download PDF
                    </button>
                    <button
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 16px',
                        width: '100%',
                        border: 'none',
                        backgroundColor: 'transparent',
                        cursor: 'pointer',
                        fontSize: '14px',
                        color: '#374151',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <Mail size={16} />
                      Send Reminder
                    </button>
                    {invoice.status === 'draft' && (
                      <button
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '10px 16px',
                          width: '100%',
                          border: 'none',
                          backgroundColor: 'transparent',
                          cursor: 'pointer',
                          fontSize: '14px',
                          color: '#374151',
                          transition: 'background-color 0.2s',
                          borderTop: '1px solid #E5E7EB'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <Send size={16} />
                        Send Invoice
                      </button>
                    )}
                    {invoice.status !== 'paid' && invoice.status !== 'cancelled' && (
                      <button
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '10px 16px',
                          width: '100%',
                          border: 'none',
                          backgroundColor: 'transparent',
                          cursor: 'pointer',
                          fontSize: '14px',
                          color: '#10B981',
                          transition: 'background-color 0.2s',
                          borderTop: '1px solid #E5E7EB'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <CheckCircle size={16} />
                        Mark as Paid
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Invoice Detail Modal */}
        {selectedInvoice && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000
            }}
            onClick={() => setSelectedInvoice(null)}
          >
            <div
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                width: '90%',
                maxWidth: '800px',
                maxHeight: '90vh',
                overflow: 'auto',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Invoice Header */}
              <div style={{
                padding: '32px',
                borderBottom: '1px solid #E5E7EB'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'start',
                  marginBottom: '24px'
                }}>
                  <div>
                    <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#111827', margin: '0 0 4px 0' }}>
                      Invoice {selectedInvoice.invoiceNumber}
                    </h2>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '500',
                      backgroundColor: `${getStatusColor(selectedInvoice.status)}20`,
                      color: getStatusColor(selectedInvoice.status)
                    }}>
                      {getStatusIcon(selectedInvoice.status)}
                      {selectedInvoice.status.charAt(0).toUpperCase() + selectedInvoice.status.slice(1)}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedInvoice(null)}
                    style={{
                      padding: '8px',
                      borderRadius: '6px',
                      border: 'none',
                      backgroundColor: '#F3F4F6',
                      cursor: 'pointer'
                    }}
                  >
                    <XCircle size={20} color="#6B7280" />
                  </button>
                </div>

                {/* Company and Client Info */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '32px'
                }}>
                  <div>
                    <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#6B7280', marginBottom: '8px' }}>FROM</h3>
                    <div style={{ color: '#111827' }}>
                      <p style={{ margin: '0 0 4px 0', fontWeight: '600' }}>South West Steam Engineering Ltd</p>
                      <p style={{ margin: '0 0 4px 0', fontSize: '14px' }}>Bodmin Industrial Estate</p>
                      <p style={{ margin: '0 0 4px 0', fontSize: '14px' }}>Cornwall, PL31 2RQ</p>
                      <p style={{ margin: '0 0 4px 0', fontSize: '14px' }}>VAT: GB 123 456 789</p>
                    </div>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#6B7280', marginBottom: '8px' }}>TO</h3>
                    <div style={{ color: '#111827' }}>
                      <p style={{ margin: '0 0 4px 0', fontWeight: '600' }}>{selectedInvoice.clientName}</p>
                      <p style={{ margin: '0 0 4px 0', fontSize: '14px' }}>Project: {selectedInvoice.projectName}</p>
                    </div>
                  </div>
                </div>

                {/* Invoice Details */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '24px',
                  marginTop: '24px',
                  padding: '16px',
                  backgroundColor: '#F9FAFB',
                  borderRadius: '8px'
                }}>
                  <div>
                    <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#6B7280' }}>Issue Date</p>
                    <p style={{ margin: 0, fontSize: '14px', fontWeight: '500', color: '#111827' }}>
                      {new Date(selectedInvoice.issueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#6B7280' }}>Due Date</p>
                    <p style={{ margin: 0, fontSize: '14px', fontWeight: '500', color: '#111827' }}>
                      {new Date(selectedInvoice.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#6B7280' }}>Payment Terms</p>
                    <p style={{ margin: 0, fontSize: '14px', fontWeight: '500', color: '#111827' }}>
                      {selectedInvoice.paymentTerms}
                    </p>
                  </div>
                  <div>
                    <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#6B7280' }}>Total Amount</p>
                    <p style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#006FEE' }}>
                      £{selectedInvoice.total.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Invoice Items */}
              <div style={{ padding: '32px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
                  Invoice Items
                </h3>
                <div style={{
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr 1fr',
                    padding: '12px 16px',
                    backgroundColor: '#F9FAFB',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#6B7280',
                    textTransform: 'uppercase'
                  }}>
                    <div>Description</div>
                    <div style={{ textAlign: 'center' }}>Quantity</div>
                    <div style={{ textAlign: 'right' }}>Unit Price</div>
                    <div style={{ textAlign: 'right' }}>Total</div>
                  </div>
                  {selectedInvoice.items.map((item, index) => (
                    <div
                      key={item.id}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '2fr 1fr 1fr 1fr',
                        padding: '16px',
                        backgroundColor: index % 2 === 0 ? 'white' : '#F9FAFB',
                        fontSize: '14px',
                        alignItems: 'center'
                      }}
                    >
                      <div style={{ color: '#374151' }}>{item.description}</div>
                      <div style={{ textAlign: 'center', color: '#6B7280' }}>{item.quantity}</div>
                      <div style={{ textAlign: 'right', color: '#6B7280' }}>£{item.unitPrice.toFixed(2)}</div>
                      <div style={{ textAlign: 'right', fontWeight: '500', color: '#111827' }}>
                        £{item.total.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div style={{
                  marginTop: '24px',
                  display: 'flex',
                  justifyContent: 'flex-end'
                }}>
                  <div style={{ width: '300px' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '8px 0',
                      fontSize: '14px'
                    }}>
                      <span style={{ color: '#6B7280' }}>Subtotal</span>
                      <span style={{ color: '#111827' }}>£{selectedInvoice.subtotal.toLocaleString()}</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '8px 0',
                      fontSize: '14px'
                    }}>
                      <span style={{ color: '#6B7280' }}>VAT (20%)</span>
                      <span style={{ color: '#111827' }}>£{selectedInvoice.vat.toLocaleString()}</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '12px 0',
                      fontSize: '18px',
                      fontWeight: '700',
                      borderTop: '2px solid #E5E7EB',
                      marginTop: '8px'
                    }}>
                      <span style={{ color: '#111827' }}>Total</span>
                      <span style={{ color: '#006FEE' }}>£{selectedInvoice.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  justifyContent: 'flex-end',
                  marginTop: '32px',
                  paddingTop: '24px',
                  borderTop: '1px solid #E5E7EB'
                }}>
                  <button
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 20px',
                      border: '1px solid #E5E7EB',
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <Printer size={16} />
                    Print
                  </button>
                  <button
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 20px',
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
                    Download PDF
                  </button>
                  {selectedInvoice.status === 'draft' && (
                    <button
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 20px',
                        backgroundColor: '#006FEE',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      <Send size={16} />
                      Send to Client
                    </button>
                  )}
                  {selectedInvoice.status === 'overdue' && (
                    <button
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 20px',
                        backgroundColor: '#F59E0B',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      <Mail size={16} />
                      Send Reminder
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}