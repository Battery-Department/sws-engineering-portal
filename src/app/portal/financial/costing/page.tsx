'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  PoundSterling,
  Calculator,
  FileText,
  TrendingUp,
  Users,
  Package,
  Clock,
  AlertCircle,
  ChevronRight,
  Download,
  Mail,
  Printer,
  Plus,
  Edit,
  Eye,
  Search,
  Filter,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Settings,
  HelpCircle,
  CheckCircle,
  XCircle,
  ChevronsUpDown
} from 'lucide-react';

interface ProjectCosting {
  id: string;
  projectId: string;
  projectName: string;
  clientName: string;
  status: 'draft' | 'pending' | 'approved' | 'revised' | 'final';
  dateCreated: string;
  lastUpdated: string;
  totalCost: number;
  laborCost: number;
  materialCost: number;
  overheadCost: number;
  profitMargin: number;
  categories: CostCategory[];
  revision: number;
  approvedBy?: string;
  notes?: string;
}

interface CostCategory {
  id: string;
  name: string;
  items: CostItem[];
  subtotal: number;
}

interface CostItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  unitCost: number;
  totalCost: number;
  markup: number;
}

export default function CostingPage() {
  const [selectedCosting, setSelectedCosting] = useState<ProjectCosting | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for demonstration
  const mockCostings: ProjectCosting[] = [
    {
      id: 'COST-001',
      projectId: 'PRJ-2024-001',
      projectName: 'GWR 4900 Hall Class Boiler Restoration',
      clientName: 'Didcot Railway Centre',
      status: 'approved',
      dateCreated: '2024-01-15',
      lastUpdated: '2024-01-18',
      totalCost: 42500,
      laborCost: 18500,
      materialCost: 15800,
      overheadCost: 5200,
      profitMargin: 15,
      revision: 2,
      approvedBy: 'John Smith',
      categories: [
        {
          id: 'cat-1',
          name: 'Boiler Work',
          subtotal: 25000,
          items: [
            {
              id: 'item-1',
              description: 'Fire tube replacement (24 tubes)',
              quantity: 24,
              unit: 'tubes',
              unitCost: 450,
              totalCost: 10800,
              markup: 20
            },
            {
              id: 'item-2',
              description: 'Smokebox restoration',
              quantity: 1,
              unit: 'job',
              unitCost: 8500,
              totalCost: 8500,
              markup: 15
            }
          ]
        },
        {
          id: 'cat-2',
          name: 'Labor',
          subtotal: 18500,
          items: [
            {
              id: 'item-3',
              description: 'Senior Engineer (160 hours)',
              quantity: 160,
              unit: 'hours',
              unitCost: 85,
              totalCost: 13600,
              markup: 0
            }
          ]
        }
      ]
    },
    {
      id: 'COST-002',
      projectId: 'PRJ-2024-002',
      projectName: 'Mining Conveyor Gearbox Rebuild',
      clientName: 'Cornwall Clay Industries',
      status: 'pending',
      dateCreated: '2024-02-01',
      lastUpdated: '2024-02-01',
      totalCost: 8750,
      laborCost: 3200,
      materialCost: 4200,
      overheadCost: 850,
      profitMargin: 15,
      revision: 1,
      categories: []
    },
    {
      id: 'COST-003',
      projectId: 'PRJ-2024-003',
      projectName: 'CAD Design - Signal Box Mechanism',
      clientName: 'West Somerset Railway',
      status: 'draft',
      dateCreated: '2024-02-05',
      lastUpdated: '2024-02-05',
      totalCost: 2850,
      laborCost: 2400,
      materialCost: 0,
      overheadCost: 350,
      profitMargin: 20,
      revision: 1,
      categories: []
    }
  ];

  const filteredCostings = mockCostings.filter(costing => {
    const matchesStatus = filterStatus === 'all' || costing.status === filterStatus;
    const matchesSearch = searchTerm === '' || 
      costing.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      costing.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      costing.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return '#10B981';
      case 'pending': return '#F59E0B';
      case 'draft': return '#6B7280';
      case 'revised': return '#3B82F6';
      case 'final': return '#8B5CF6';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle size={16} />;
      case 'pending': return <Clock size={16} />;
      case 'draft': return <Edit size={16} />;
      case 'revised': return <Activity size={16} />;
      case 'final': return <CheckCircle size={16} />;
      default: return <AlertCircle size={16} />;
    }
  };

  const totalStats = {
    total: mockCostings.reduce((sum, c) => sum + c.totalCost, 0),
    approved: mockCostings.filter(c => c.status === 'approved').reduce((sum, c) => sum + c.totalCost, 0),
    pending: mockCostings.filter(c => c.status === 'pending').reduce((sum, c) => sum + c.totalCost, 0),
    avgMargin: mockCostings.reduce((sum, c) => sum + c.profitMargin, 0) / mockCostings.length
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
              <Calculator size={24} color="white" />
            </div>
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#111827', margin: 0 }}>
                Project Costing
              </h1>
              <p style={{ fontSize: '16px', color: '#6B7280', margin: 0 }}>
                Create and manage detailed cost estimates for engineering projects
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
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
              <span style={{ fontSize: '14px', color: '#6B7280' }}>Total Quoted</span>
            </div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#111827', marginBottom: '4px' }}>
              £{totalStats.total.toLocaleString()}
            </div>
            <div style={{ fontSize: '14px', color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <TrendingUp size={16} />
              <span>+12% from last month</span>
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
              <span style={{ fontSize: '14px', color: '#6B7280' }}>Approved</span>
            </div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#111827', marginBottom: '4px' }}>
              £{totalStats.approved.toLocaleString()}
            </div>
            <div style={{ fontSize: '14px', color: '#6B7280' }}>
              Ready for invoicing
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
              <span style={{ fontSize: '14px', color: '#6B7280' }}>Pending Approval</span>
            </div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#111827', marginBottom: '4px' }}>
              £{totalStats.pending.toLocaleString()}
            </div>
            <div style={{ fontSize: '14px', color: '#6B7280' }}>
              Awaiting client review
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
                <PieChart size={20} color="#8B5CF6" />
              </div>
              <span style={{ fontSize: '14px', color: '#6B7280' }}>Avg Profit Margin</span>
            </div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#111827', marginBottom: '4px' }}>
              {totalStats.avgMargin.toFixed(1)}%
            </div>
            <div style={{ fontSize: '14px', color: '#6B7280' }}>
              Across all quotes
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
                placeholder="Search costings..."
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
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="revised">Revised</option>
              <option value="final">Final</option>
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
            Create New Costing
          </button>
        </div>

        {/* Costings List */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          border: '1px solid #E5E7EB',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
          overflow: 'hidden'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 0.8fr 0.8fr 0.8fr 0.6fr 100px',
            padding: '16px 24px',
            borderBottom: '1px solid #E5E7EB',
            backgroundColor: '#F9FAFB',
            fontSize: '12px',
            fontWeight: '600',
            color: '#6B7280',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            <div>Project</div>
            <div>Client</div>
            <div>Total Cost</div>
            <div>Status</div>
            <div>Created</div>
            <div>Margin</div>
            <div>Actions</div>
          </div>

          {filteredCostings.map((costing, index) => (
            <div
              key={costing.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 0.8fr 0.8fr 0.8fr 0.6fr 100px',
                padding: '20px 24px',
                borderBottom: index < filteredCostings.length - 1 ? '1px solid #E5E7EB' : 'none',
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
              onClick={() => setSelectedCosting(costing)}
            >
              <div>
                <div style={{ fontWeight: '600', color: '#111827', marginBottom: '4px' }}>
                  {costing.projectName}
                </div>
                <div style={{ fontSize: '14px', color: '#6B7280' }}>
                  {costing.id} • Rev {costing.revision}
                </div>
              </div>
              <div style={{ color: '#374151' }}>
                {costing.clientName}
              </div>
              <div style={{ fontWeight: '600', color: '#111827' }}>
                £{costing.totalCost.toLocaleString()}
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
                  backgroundColor: `${getStatusColor(costing.status)}20`,
                  color: getStatusColor(costing.status)
                }}>
                  {getStatusIcon(costing.status)}
                  {costing.status.charAt(0).toUpperCase() + costing.status.slice(1)}
                </span>
              </div>
              <div style={{ fontSize: '14px', color: '#6B7280' }}>
                {new Date(costing.dateCreated).toLocaleDateString()}
              </div>
              <div style={{ fontWeight: '500', color: costing.profitMargin >= 15 ? '#10B981' : '#F59E0B' }}>
                {costing.profitMargin}%
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
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
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Eye size={16} color="#6B7280" />
                </button>
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
                  <Edit size={16} color="#6B7280" />
                </button>
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
                  <Download size={16} color="#6B7280" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed View Modal */}
        {selectedCosting && (
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
            onClick={() => setSelectedCosting(null)}
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
              <div style={{
                padding: '24px',
                borderBottom: '1px solid #E5E7EB',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: '0 0 8px 0' }}>
                    {selectedCosting.projectName}
                  </h2>
                  <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>
                    {selectedCosting.id} • Revision {selectedCosting.revision} • {selectedCosting.clientName}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedCosting(null)}
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

              <div style={{ padding: '24px' }}>
                {/* Cost Breakdown */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '16px',
                  marginBottom: '32px'
                }}>
                  <div style={{
                    padding: '16px',
                    backgroundColor: '#F9FAFB',
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB'
                  }}>
                    <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}>Labor Cost</div>
                    <div style={{ fontSize: '20px', fontWeight: '600', color: '#111827' }}>
                      £{selectedCosting.laborCost.toLocaleString()}
                    </div>
                  </div>
                  <div style={{
                    padding: '16px',
                    backgroundColor: '#F9FAFB',
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB'
                  }}>
                    <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}>Material Cost</div>
                    <div style={{ fontSize: '20px', fontWeight: '600', color: '#111827' }}>
                      £{selectedCosting.materialCost.toLocaleString()}
                    </div>
                  </div>
                  <div style={{
                    padding: '16px',
                    backgroundColor: '#F9FAFB',
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB'
                  }}>
                    <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}>Overhead</div>
                    <div style={{ fontSize: '20px', fontWeight: '600', color: '#111827' }}>
                      £{selectedCosting.overheadCost.toLocaleString()}
                    </div>
                  </div>
                  <div style={{
                    padding: '16px',
                    backgroundColor: '#EFF6FF',
                    borderRadius: '8px',
                    border: '1px solid #BFDBFE'
                  }}>
                    <div style={{ fontSize: '12px', color: '#006FEE', marginBottom: '4px' }}>Total Cost</div>
                    <div style={{ fontSize: '20px', fontWeight: '700', color: '#006FEE' }}>
                      £{selectedCosting.totalCost.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Detailed Items */}
                {selectedCosting.categories.map((category) => (
                  <div key={category.id} style={{ marginBottom: '24px' }}>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#111827',
                      marginBottom: '12px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span>{category.name}</span>
                      <span style={{ color: '#006FEE' }}>£{category.subtotal.toLocaleString()}</span>
                    </h3>
                    <div style={{
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      overflow: 'hidden'
                    }}>
                      {category.items.map((item, index) => (
                        <div
                          key={item.id}
                          style={{
                            display: 'grid',
                            gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
                            padding: '12px 16px',
                            backgroundColor: index % 2 === 0 ? 'white' : '#F9FAFB',
                            fontSize: '14px',
                            alignItems: 'center'
                          }}
                        >
                          <div style={{ color: '#374151' }}>{item.description}</div>
                          <div style={{ textAlign: 'center', color: '#6B7280' }}>
                            {item.quantity} {item.unit}
                          </div>
                          <div style={{ textAlign: 'right', color: '#6B7280' }}>
                            £{item.unitCost.toFixed(2)}
                          </div>
                          <div style={{ textAlign: 'center', color: '#6B7280' }}>
                            {item.markup}%
                          </div>
                          <div style={{ textAlign: 'right', fontWeight: '500', color: '#111827' }}>
                            £{item.totalCost.toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Action Buttons */}
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
                    <Mail size={16} />
                    Email to Client
                  </button>
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
                    <FileText size={16} />
                    Convert to Invoice
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}