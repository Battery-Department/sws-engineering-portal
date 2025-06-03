'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Factory,
  Wrench,
  Clock,
  User,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Play,
  Pause,
  StopCircle,
  MoreVertical,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  MapPin,
  Settings,
  Activity,
  TrendingUp,
  Users,
  Package,
  Timer,
  Zap,
  Wrench as Tool,
  Cog,
  FileText,
  Camera,
  Upload,
  Save,
  RefreshCw,
  Archive,
  Star,
  Target,
  Layers,
  BarChart3
} from 'lucide-react';

interface WorkshopJob {
  id: string;
  jobNumber: string;
  projectId: string;
  projectName: string;
  clientName: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'queued' | 'in_progress' | 'paused' | 'quality_check' | 'completed' | 'on_hold';
  assignedTo: string;
  workstation: string;
  estimatedHours: number;
  actualHours: number;
  startDate: string;
  dueDate: string;
  completedDate?: string;
  materials: WorkshopMaterial[];
  notes: string[];
  images: string[];
  tags: string[];
}

interface WorkshopMaterial {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  status: 'required' | 'allocated' | 'in_use' | 'returned';
}

interface Workstation {
  id: string;
  name: string;
  type: 'machining' | 'welding' | 'assembly' | 'testing' | 'painting';
  status: 'available' | 'occupied' | 'maintenance' | 'offline';
  currentJob?: string;
  operator?: string;
  capacity: number;
  utilization: number;
}

export default function WorkshopPage() {
  const [selectedJob, setSelectedJob] = useState<WorkshopJob | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'kanban' | 'calendar'>('list');
  const [showWorkstations, setShowWorkstations] = useState(false);

  // Mock data
  const mockJobs: WorkshopJob[] = [
    {
      id: 'WS-001',
      jobNumber: 'WS-2024-156',
      projectId: 'PRJ-2024-001',
      projectName: 'GWR 4900 Hall Class Boiler Restoration',
      clientName: 'Didcot Railway Centre',
      description: 'Fire tube replacement and smokebox restoration',
      priority: 'high',
      status: 'in_progress',
      assignedTo: 'Mike Thompson',
      workstation: 'Machining Bay 1',
      estimatedHours: 120,
      actualHours: 85,
      startDate: '2024-01-15',
      dueDate: '2024-02-15',
      materials: [
        { id: 'm1', name: 'Fire Tubes (24 units)', quantity: 24, unit: 'pcs', status: 'in_use' },
        { id: 'm2', name: 'Welding Rod 7018', quantity: 10, unit: 'kg', status: 'allocated' }
      ],
      notes: [
        'Tubes 1-12 completed, passed inspection',
        'Minor pitting found on tube 13, needs additional prep',
        'Client requested progress photos for insurance'
      ],
      images: [],
      tags: ['boiler-work', 'heritage', 'priority']
    },
    {
      id: 'WS-002',
      jobNumber: 'WS-2024-157',
      projectId: 'PRJ-2024-002',
      projectName: 'Mining Conveyor Gearbox Rebuild',
      clientName: 'Cornwall Clay Industries',
      description: 'Complete gearbox strip-down and rebuild',
      priority: 'urgent',
      status: 'quality_check',
      assignedTo: 'Sarah Williams',
      workstation: 'Assembly Bay 2',
      estimatedHours: 40,
      actualHours: 38,
      startDate: '2024-01-20',
      dueDate: '2024-01-28',
      completedDate: '2024-01-27',
      materials: [
        { id: 'm3', name: 'Gear Set Complete', quantity: 1, unit: 'set', status: 'in_use' },
        { id: 'm4', name: 'Bearing Kit', quantity: 2, unit: 'kits', status: 'in_use' }
      ],
      notes: [
        'Gearbox stripped, wear patterns documented',
        'New gear set installed, torque specs verified',
        'Ready for final inspection and testing'
      ],
      images: [],
      tags: ['gearbox', 'industrial', 'urgent']
    },
    {
      id: 'WS-003',
      jobNumber: 'WS-2024-158',
      projectId: 'PRJ-2024-003',
      projectName: 'Signal Box Mechanism Fabrication',
      clientName: 'West Somerset Railway',
      description: 'Custom lever mechanism for heritage signal box',
      priority: 'medium',
      status: 'queued',
      assignedTo: 'Tom Harrison',
      workstation: 'Fabrication Shop',
      estimatedHours: 60,
      actualHours: 0,
      startDate: '2024-02-01',
      dueDate: '2024-02-20',
      materials: [
        { id: 'm5', name: 'Steel Bar 50mm', quantity: 3, unit: 'm', status: 'required' },
        { id: 'm6', name: 'Brass Fittings', quantity: 12, unit: 'pcs', status: 'required' }
      ],
      notes: [
        'CAD drawings approved by client',
        'Materials ordered, ETA 3 days',
        'Heritage specifications must be followed'
      ],
      images: [],
      tags: ['fabrication', 'heritage', 'custom']
    }
  ];

  const mockWorkstations: Workstation[] = [
    {
      id: 'ws1',
      name: 'Machining Bay 1',
      type: 'machining',
      status: 'occupied',
      currentJob: 'WS-2024-156',
      operator: 'Mike Thompson',
      capacity: 1,
      utilization: 85
    },
    {
      id: 'ws2',
      name: 'Assembly Bay 2',
      type: 'assembly',
      status: 'occupied',
      currentJob: 'WS-2024-157',
      operator: 'Sarah Williams',
      capacity: 1,
      utilization: 95
    },
    {
      id: 'ws3',
      name: 'Welding Station A',
      type: 'welding',
      status: 'available',
      capacity: 1,
      utilization: 0
    },
    {
      id: 'ws4',
      name: 'Fabrication Shop',
      type: 'assembly',
      status: 'available',
      capacity: 2,
      utilization: 0
    }
  ];

  const filteredJobs = mockJobs.filter(job => {
    const matchesStatus = filterStatus === 'all' || job.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || job.priority === filterPriority;
    const matchesSearch = searchTerm === '' ||
      job.jobNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesPriority && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#10B981';
      case 'in_progress': return '#3B82F6';
      case 'quality_check': return '#8B5CF6';
      case 'paused': return '#F59E0B';
      case 'on_hold': return '#EF4444';
      case 'queued': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return '#EF4444';
      case 'high': return '#F59E0B';
      case 'medium': return '#3B82F6';
      case 'low': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle size={16} />;
      case 'in_progress': return <Play size={16} />;
      case 'quality_check': return <Star size={16} />;
      case 'paused': return <Pause size={16} />;
      case 'on_hold': return <StopCircle size={16} />;
      case 'queued': return <Clock size={16} />;
      default: return <AlertTriangle size={16} />;
    }
  };

  const getWorkstationIcon = (type: string) => {
    switch (type) {
      case 'machining': return <Cog size={20} />;
      case 'welding': return <Zap size={20} />;
      case 'assembly': return <Tool size={20} />;
      case 'testing': return <Target size={20} />;
      case 'painting': return <Layers size={20} />;
      default: return <Factory size={20} />;
    }
  };

  const stats = {
    totalJobs: mockJobs.length,
    activeJobs: mockJobs.filter(j => ['in_progress', 'quality_check'].includes(j.status)).length,
    completedToday: mockJobs.filter(j => j.status === 'completed' && j.completedDate === new Date().toISOString().split('T')[0]).length,
    overdue: mockJobs.filter(j => j.status !== 'completed' && new Date(j.dueDate) < new Date()).length,
    avgUtilization: mockWorkstations.reduce((sum, ws) => sum + ws.utilization, 0) / mockWorkstations.length
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
              <Factory size={24} color="white" />
            </div>
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#111827', margin: 0 }}>
                Workshop Operations
              </h1>
              <p style={{ fontSize: '16px', color: '#6B7280', margin: 0 }}>
                Manage jobs, track progress, and optimize workshop efficiency
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
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
                <Activity size={20} color="#006FEE" />
              </div>
              <span style={{ fontSize: '14px', color: '#6B7280' }}>Active Jobs</span>
            </div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#111827', marginBottom: '4px' }}>
              {stats.activeJobs}
            </div>
            <div style={{ fontSize: '14px', color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <TrendingUp size={16} />
              <span>of {stats.totalJobs} total</span>
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
              <span style={{ fontSize: '14px', color: '#6B7280' }}>Completed Today</span>
            </div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#111827', marginBottom: '4px' }}>
              {stats.completedToday}
            </div>
            <div style={{ fontSize: '14px', color: '#6B7280' }}>
              Jobs finished
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
                backgroundColor: stats.overdue > 0 ? '#FEE2E2' : '#F3F4F6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <AlertTriangle size={20} color={stats.overdue > 0 ? '#EF4444' : '#6B7280'} />
              </div>
              <span style={{ fontSize: '14px', color: '#6B7280' }}>Overdue</span>
            </div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: stats.overdue > 0 ? '#EF4444' : '#111827', marginBottom: '4px' }}>
              {stats.overdue}
            </div>
            <div style={{ fontSize: '14px', color: stats.overdue > 0 ? '#EF4444' : '#6B7280' }}>
              {stats.overdue > 0 ? 'Requires attention' : 'All on schedule'}
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
                <BarChart3 size={20} color="#8B5CF6" />
              </div>
              <span style={{ fontSize: '14px', color: '#6B7280' }}>Avg Utilization</span>
            </div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#111827', marginBottom: '4px' }}>
              {stats.avgUtilization.toFixed(0)}%
            </div>
            <div style={{ fontSize: '14px', color: stats.avgUtilization > 80 ? '#10B981' : '#6B7280' }}>
              Workshop efficiency
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
                placeholder="Search jobs..."
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
              <option value="queued">Queued</option>
              <option value="in_progress">In Progress</option>
              <option value="paused">Paused</option>
              <option value="quality_check">Quality Check</option>
              <option value="completed">Completed</option>
              <option value="on_hold">On Hold</option>
            </select>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
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
              <option value="all">All Priority</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => setShowWorkstations(!showWorkstations)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                backgroundColor: showWorkstations ? '#006FEE' : 'white',
                color: showWorkstations ? 'white' : '#374151',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <Factory size={16} />
              Workstations
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
              New Job
            </button>
          </div>
        </div>

        {/* Workstations Panel */}
        {showWorkstations && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            border: '1px solid #E5E7EB',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
            padding: '24px',
            marginBottom: '24px'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
              Workstation Status
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '16px'
            }}>
              {mockWorkstations.map(workstation => (
                <div
                  key={workstation.id}
                  style={{
                    padding: '16px',
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB',
                    backgroundColor: workstation.status === 'occupied' ? '#EFF6FF' : '#F9FAFB'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {getWorkstationIcon(workstation.type)}
                      <span style={{ fontWeight: '600', color: '#111827' }}>{workstation.name}</span>
                    </div>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '500',
                      backgroundColor: workstation.status === 'occupied' ? '#DBEAFE' : '#F3F4F6',
                      color: workstation.status === 'occupied' ? '#1E40AF' : '#6B7280'
                    }}>
                      {workstation.status.replace('_', ' ')}
                    </span>
                  </div>
                  {workstation.operator && (
                    <div style={{ fontSize: '14px', color: '#6B7280', marginBottom: '8px' }}>
                      Operator: {workstation.operator}
                    </div>
                  )}
                  {workstation.currentJob && (
                    <div style={{ fontSize: '14px', color: '#006FEE', marginBottom: '8px' }}>
                      Current Job: {workstation.currentJob}
                    </div>
                  )}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '14px',
                    color: '#6B7280'
                  }}>
                    <span>Utilization:</span>
                    <span style={{ fontWeight: '500', color: workstation.utilization > 80 ? '#10B981' : '#6B7280' }}>
                      {workstation.utilization}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Jobs List */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          border: '1px solid #E5E7EB',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
          overflow: 'hidden'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '0.8fr 1.2fr 1fr 0.8fr 0.6fr 0.8fr 0.8fr 80px',
            padding: '16px 24px',
            borderBottom: '1px solid #E5E7EB',
            backgroundColor: '#F9FAFB',
            fontSize: '12px',
            fontWeight: '600',
            color: '#6B7280',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            <div>Job #</div>
            <div>Project / Client</div>
            <div>Description</div>
            <div>Assigned To</div>
            <div>Priority</div>
            <div>Status</div>
            <div>Progress</div>
            <div></div>
          </div>

          {filteredJobs.map((job, index) => (
            <div
              key={job.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '0.8fr 1.2fr 1fr 0.8fr 0.6fr 0.8fr 0.8fr 80px',
                padding: '20px 24px',
                borderBottom: index < filteredJobs.length - 1 ? '1px solid #E5E7EB' : 'none',
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
              onClick={() => setSelectedJob(job)}
            >
              <div>
                <div style={{ fontWeight: '600', color: '#111827', marginBottom: '4px' }}>
                  {job.jobNumber}
                </div>
                <div style={{ fontSize: '12px', color: '#6B7280' }}>
                  Due: {new Date(job.dueDate).toLocaleDateString()}
                </div>
              </div>
              <div>
                <div style={{ fontWeight: '500', color: '#111827', marginBottom: '2px' }}>
                  {job.projectName}
                </div>
                <div style={{ fontSize: '13px', color: '#6B7280' }}>
                  {job.clientName}
                </div>
              </div>
              <div style={{ fontSize: '14px', color: '#374151' }}>
                {job.description}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: '#006FEE',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '10px',
                    fontWeight: '600'
                  }}>
                    {job.assignedTo.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span style={{ fontSize: '14px', color: '#374151' }}>
                    {job.assignedTo}
                  </span>
                </div>
              </div>
              <div>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: '500',
                  backgroundColor: `${getPriorityColor(job.priority)}20`,
                  color: getPriorityColor(job.priority)
                }}>
                  {job.priority.toUpperCase()}
                </span>
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
                  backgroundColor: `${getStatusColor(job.status)}20`,
                  color: getStatusColor(job.status)
                }}>
                  {getStatusIcon(job.status)}
                  {job.status.replace('_', ' ')}
                </span>
              </div>
              <div>
                <div style={{ marginBottom: '4px', fontSize: '12px', color: '#6B7280' }}>
                  {job.actualHours}h / {job.estimatedHours}h
                </div>
                <div style={{
                  width: '100%',
                  height: '6px',
                  backgroundColor: '#E5E7EB',
                  borderRadius: '3px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${Math.min((job.actualHours / job.estimatedHours) * 100, 100)}%`,
                    height: '100%',
                    backgroundColor: job.actualHours <= job.estimatedHours ? '#10B981' : '#EF4444',
                    transition: 'width 0.3s ease'
                  }} />
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
                  <MoreVertical size={16} color="#6B7280" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Job Detail Modal */}
        {selectedJob && (
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
            onClick={() => setSelectedJob(null)}
          >
            <div
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                width: '90%',
                maxWidth: '900px',
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
                    {selectedJob.jobNumber}
                  </h2>
                  <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>
                    {selectedJob.projectName} • {selectedJob.clientName}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedJob(null)}
                  style={{
                    padding: '8px',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: '#F3F4F6',
                    cursor: 'pointer'
                  }}
                >
                  <X size={20} color="#6B7280" />
                </button>
              </div>

              <div style={{ padding: '24px' }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr',
                  gap: '32px'
                }}>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
                      Job Details
                    </h3>
                    <div style={{ marginBottom: '16px' }}>
                      <p style={{ fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
                        Description:
                      </p>
                      <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>
                        {selectedJob.description}
                      </p>
                    </div>
                    
                    <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>
                      Materials Required
                    </h4>
                    <div style={{ marginBottom: '24px' }}>
                      {selectedJob.materials.map(material => (
                        <div
                          key={material.id}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '8px 0',
                            borderBottom: '1px solid #F3F4F6'
                          }}
                        >
                          <span style={{ fontSize: '14px', color: '#374151' }}>
                            {material.name}
                          </span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ fontSize: '14px', color: '#6B7280' }}>
                              {material.quantity} {material.unit}
                            </span>
                            <span style={{
                              padding: '2px 6px',
                              borderRadius: '4px',
                              fontSize: '10px',
                              fontWeight: '500',
                              backgroundColor: material.status === 'in_use' ? '#DBEAFE' : '#F3F4F6',
                              color: material.status === 'in_use' ? '#1E40AF' : '#6B7280'
                            }}>
                              {material.status.replace('_', ' ')}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>
                      Notes & Updates
                    </h4>
                    <div>
                      {selectedJob.notes.map((note, index) => (
                        <div
                          key={index}
                          style={{
                            padding: '12px',
                            backgroundColor: '#F9FAFB',
                            borderRadius: '6px',
                            marginBottom: '8px',
                            fontSize: '14px',
                            color: '#374151'
                          }}
                        >
                          {note}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div style={{
                      padding: '16px',
                      backgroundColor: '#F9FAFB',
                      borderRadius: '8px',
                      marginBottom: '24px'
                    }}>
                      <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>
                        Progress Summary
                      </h4>
                      <div style={{ marginBottom: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span style={{ fontSize: '12px', color: '#6B7280' }}>Time Progress</span>
                          <span style={{ fontSize: '12px', color: '#6B7280' }}>
                            {selectedJob.actualHours}h / {selectedJob.estimatedHours}h
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
                            width: `${Math.min((selectedJob.actualHours / selectedJob.estimatedHours) * 100, 100)}%`,
                            height: '100%',
                            backgroundColor: selectedJob.actualHours <= selectedJob.estimatedHours ? '#10B981' : '#EF4444',
                            transition: 'width 0.3s ease'
                          }} />
                        </div>
                      </div>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '16px' }}>
                        <div>
                          <p style={{ fontSize: '12px', color: '#6B7280', margin: '0 0 4px 0' }}>Priority</p>
                          <span style={{
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: '500',
                            backgroundColor: `${getPriorityColor(selectedJob.priority)}20`,
                            color: getPriorityColor(selectedJob.priority)
                          }}>
                            {selectedJob.priority.toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p style={{ fontSize: '12px', color: '#6B7280', margin: '0 0 4px 0' }}>Status</p>
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: '500',
                            backgroundColor: `${getStatusColor(selectedJob.status)}20`,
                            color: getStatusColor(selectedJob.status)
                          }}>
                            {getStatusIcon(selectedJob.status)}
                            {selectedJob.status.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div style={{
                      display: 'grid',
                      gap: '12px'
                    }}>
                      <button
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '10px 16px',
                          backgroundColor: '#006FEE',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '14px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        <Play size={16} />
                        Update Status
                      </button>
                      <button
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '10px 16px',
                          border: '1px solid #E5E7EB',
                          backgroundColor: 'white',
                          borderRadius: '6px',
                          fontSize: '14px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        <Timer size={16} />
                        Log Time
                      </button>
                      <button
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '10px 16px',
                          border: '1px solid #E5E7EB',
                          backgroundColor: 'white',
                          borderRadius: '6px',
                          fontSize: '14px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        <Camera size={16} />
                        Add Photos
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}