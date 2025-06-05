'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Plus,
  Search,
  Filter,
  Grid3X3,
  List,
  ChevronLeft,
  ChevronRight,
  Clock,
  Users,
  Package,
  Wrench,
  AlertTriangle,
  CheckCircle,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  MapPin,
  User,
  FileText,
  Zap
} from 'lucide-react';

interface PlanningItem {
  id: string;
  title: string;
  description: string;
  type: 'project' | 'maintenance' | 'meeting' | 'delivery' | 'inspection';
  startDate: string;
  endDate: string;
  status: 'planned' | 'in_progress' | 'completed' | 'cancelled' | 'overdue';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo: string[];
  location: string;
  estimatedHours: number;
  actualHours?: number;
  resources: string[];
  notes: string;
  relatedProject?: string;
}

export default function PortalPlanningPage() {
  const [planningItems, setPlanningItems] = useState<PlanningItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Simulate API call to fetch planning items
    setTimeout(() => {
      const mockPlanningItems: PlanningItem[] = [
        {
          id: 'plan-001',
          title: 'Steam Locomotive Boiler Inspection',
          description: 'Quarterly safety inspection of heritage locomotive boiler system',
          type: 'inspection',
          startDate: '2024-01-30T09:00:00Z',
          endDate: '2024-01-30T17:00:00Z',
          status: 'planned',
          priority: 'high',
          assignedTo: ['Mike Thompson', 'Sarah Williams'],
          location: 'Workshop Bay 2',
          estimatedHours: 8,
          resources: ['Inspection equipment', 'Safety gear', 'Documentation'],
          notes: 'Annual pressure test required. Coordinate with insurance inspector.',
          relatedProject: 'Heritage Loco Restoration'
        },
        {
          id: 'plan-002',
          title: 'CAD Design Review Meeting',
          description: 'Review new locomotive component designs with engineering team',
          type: 'meeting',
          startDate: '2024-01-28T14:00:00Z',
          endDate: '2024-01-28T16:00:00Z',
          status: 'planned',
          priority: 'medium',
          assignedTo: ['Sarah Williams', 'Tom Richardson', 'James Mitchell'],
          location: 'Conference Room A',
          estimatedHours: 2,
          resources: ['Projector', 'CAD workstation', 'Design documents'],
          notes: 'Focus on fire tube assembly and pressure vessel components.'
        },
        {
          id: 'plan-003',
          title: 'Material Delivery - Steel Plates',
          description: 'Delivery of heritage-grade steel plates for locomotive restoration',
          type: 'delivery',
          startDate: '2024-02-01T10:00:00Z',
          endDate: '2024-02-01T12:00:00Z',
          status: 'planned',
          priority: 'medium',
          assignedTo: ['Tom Richardson'],
          location: 'Materials Yard',
          estimatedHours: 2,
          resources: ['Forklift', 'Storage space', 'Quality checklist'],
          notes: 'Verify material certificates and specifications on arrival.'
        },
        {
          id: 'plan-004',
          title: 'Workshop Equipment Maintenance',
          description: 'Scheduled maintenance of CNC machines and welding equipment',
          type: 'maintenance',
          startDate: '2024-02-05T08:00:00Z',
          endDate: '2024-02-05T16:00:00Z',
          status: 'planned',
          priority: 'high',
          assignedTo: ['Workshop Team'],
          location: 'Main Workshop',
          estimatedHours: 8,
          resources: ['Maintenance tools', 'Replacement parts', 'Service manuals'],
          notes: 'Critical to maintain production schedule. Book service engineers.'
        },
        {
          id: 'plan-005',
          title: 'Client Project Kick-off',
          description: 'Initial meeting with new client for locomotive restoration project',
          type: 'meeting',
          startDate: '2024-01-26T10:00:00Z',
          endDate: '2024-01-26T12:00:00Z',
          status: 'completed',
          priority: 'high',
          assignedTo: ['Mike Thompson', 'Sarah Williams'],
          location: 'Client Site',
          estimatedHours: 2,
          actualHours: 2.5,
          resources: ['Project documentation', 'Survey equipment', 'Laptop'],
          notes: 'Successful meeting. Project timeline agreed.',
          relatedProject: 'Devon Railway Locomotive'
        },
        {
          id: 'plan-006',
          title: 'Fire Tube Installation',
          description: 'Installation of new heritage-grade fire tubes in locomotive boiler',
          type: 'project',
          startDate: '2024-02-10T08:00:00Z',
          endDate: '2024-02-14T17:00:00Z',
          status: 'planned',
          priority: 'urgent',
          assignedTo: ['Mike Thompson', 'James Mitchell', 'Workshop Team'],
          location: 'Workshop Bay 1',
          estimatedHours: 40,
          resources: ['Fire tubes', 'Welding equipment', 'Lifting gear', 'Safety equipment'],
          notes: 'Critical path item. Ensure all materials are ready before start date.',
          relatedProject: 'Heritage Loco Restoration'
        }
      ];
      setPlanningItems(mockPlanningItems);
      setLoading(false);
    }, 1000);
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'project': return Package;
      case 'maintenance': return Wrench;
      case 'meeting': return Users;
      case 'delivery': return Package;
      case 'inspection': return CheckCircle;
      default: return Calendar;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'project': return '#8B5CF6';
      case 'maintenance': return '#F59E0B';
      case 'meeting': return '#006FEE';
      case 'delivery': return '#10B981';
      case 'inspection': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return '#EF4444';
      case 'high': return '#F59E0B';
      case 'medium': return '#006FEE';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#10B981';
      case 'in_progress': return '#006FEE';
      case 'planned': return '#6B7280';
      case 'cancelled': return '#EF4444';
      case 'overdue': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'in_progress': return Clock;
      case 'planned': return Calendar;
      case 'cancelled': return Trash2;
      case 'overdue': return AlertTriangle;
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

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Generate calendar view
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const getItemsForDate = (day: number) => {
    if (!day) return [];
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const targetDate = new Date(year, month, day);
    
    return planningItems.filter(item => {
      const itemDate = new Date(item.startDate);
      return (
        itemDate.getFullYear() === targetDate.getFullYear() &&
        itemDate.getMonth() === targetDate.getMonth() &&
        itemDate.getDate() === targetDate.getDate()
      );
    });
  };

  const filteredItems = planningItems.filter(item => {
    const matchesSearch = searchTerm === '' ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || item.type === selectedType;
    return matchesSearch && matchesType;
  });

  const itemTypes = [
    { value: 'all', label: 'All Types', count: planningItems.length },
    { value: 'project', label: 'Projects', count: planningItems.filter(item => item.type === 'project').length },
    { value: 'maintenance', label: 'Maintenance', count: planningItems.filter(item => item.type === 'maintenance').length },
    { value: 'meeting', label: 'Meetings', count: planningItems.filter(item => item.type === 'meeting').length },
    { value: 'delivery', label: 'Deliveries', count: planningItems.filter(item => item.type === 'delivery').length },
    { value: 'inspection', label: 'Inspections', count: planningItems.filter(item => item.type === 'inspection').length }
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
          <p style={{ color: '#6B7280' }}>Loading planning schedule...</p>
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
                Planning & Scheduling
              </h1>
              <p style={{ fontSize: '16px', color: '#6B7280' }}>
                Manage project schedules, maintenance, meetings, and resource planning
              </p>
            </div>
            
            <Link href="/portal/planning/new" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              backgroundColor: '#006FEE',
              color: 'white',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'all 0.2s'
            }}>
              <Plus size={16} />
              New Item
            </Link>
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
                  placeholder="Search planning items..."
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
                {itemTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label} ({type.count})
                  </option>
                ))}
              </select>
            </div>
            
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setViewMode('calendar')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 16px',
                  backgroundColor: viewMode === 'calendar' ? '#006FEE' : 'white',
                  color: viewMode === 'calendar' ? 'white' : '#6B7280',
                  border: '2px solid #E5E7EB',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                <Calendar size={16} />
                Calendar
              </button>
              <button
                onClick={() => setViewMode('list')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 16px',
                  backgroundColor: viewMode === 'list' ? '#006FEE' : 'white',
                  color: viewMode === 'list' ? 'white' : '#6B7280',
                  border: '2px solid #E5E7EB',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                <List size={16} />
                List
              </button>
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
              <Calendar size={24} color="#006FEE" />
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: 0 }}>
                Planned Items
              </h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#111827' }}>
              {planningItems.filter(item => item.status === 'planned').length}
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
              <Clock size={24} color="#F59E0B" />
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: 0 }}>
                In Progress
              </h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#111827' }}>
              {planningItems.filter(item => item.status === 'in_progress').length}
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
                Completed
              </h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#111827' }}>
              {planningItems.filter(item => item.status === 'completed').length}
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
              <AlertTriangle size={24} color="#EF4444" />
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: 0 }}>
                Urgent Items
              </h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#111827' }}>
              {planningItems.filter(item => item.priority === 'urgent').length}
            </div>
          </div>
        </div>

        {/* Calendar View */}
        {viewMode === 'calendar' && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            border: '2px solid #E5E7EB',
            overflow: 'hidden'
          }}>
            {/* Calendar Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '24px',
              borderBottom: '1px solid #E5E7EB',
              backgroundColor: '#F9FAFB'
            }}>
              <button
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
                style={{
                  padding: '8px',
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                <ChevronLeft size={16} />
              </button>
              
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: 0 }}>
                {currentDate.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
              </h2>
              
              <button
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
                style={{
                  padding: '8px',
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Calendar Grid */}
            <div>
              {/* Day Headers */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                backgroundColor: '#F9FAFB',
                borderBottom: '1px solid #E5E7EB'
              }}>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} style={{
                    padding: '12px',
                    textAlign: 'center',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#6B7280'
                  }}>
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gridTemplateRows: 'repeat(6, 120px)'
              }}>
                {generateCalendarDays().map((day, index) => {
                  const dayItems = day ? getItemsForDate(day) : [];
                  const isToday = day && 
                    new Date().getDate() === day &&
                    new Date().getMonth() === currentDate.getMonth() &&
                    new Date().getFullYear() === currentDate.getFullYear();

                  return (
                    <div
                      key={index}
                      style={{
                        padding: '8px',
                        borderRight: index % 7 !== 6 ? '1px solid #E5E7EB' : 'none',
                        borderBottom: '1px solid #E5E7EB',
                        backgroundColor: day ? 'white' : '#F9FAFB',
                        minHeight: '120px',
                        position: 'relative'
                      }}
                    >
                      {day && (
                        <>
                          <div style={{
                            fontSize: '14px',
                            fontWeight: isToday ? '700' : '500',
                            color: isToday ? '#006FEE' : '#111827',
                            marginBottom: '4px'
                          }}>
                            {day}
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            {dayItems.slice(0, 3).map((item) => {
                              const TypeIcon = getTypeIcon(item.type);
                              return (
                                <div
                                  key={item.id}
                                  style={{
                                    fontSize: '10px',
                                    padding: '2px 6px',
                                    backgroundColor: `${getTypeColor(item.type)}20`,
                                    color: getTypeColor(item.type),
                                    borderRadius: '4px',
                                    fontWeight: '500',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    cursor: 'pointer'
                                  }}
                                  title={item.title}
                                >
                                  <TypeIcon size={10} />
                                  {item.title.substring(0, 15)}{item.title.length > 15 ? '...' : ''}
                                </div>
                              );
                            })}
                            {dayItems.length > 3 && (
                              <div style={{
                                fontSize: '10px',
                                color: '#6B7280',
                                fontWeight: '500',
                                textAlign: 'center'
                              }}>
                                +{dayItems.length - 3} more
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            border: '2px solid #E5E7EB',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
            overflow: 'hidden'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 120px 120px 120px 150px 120px 100px',
              padding: '16px 24px',
              borderBottom: '1px solid #E5E7EB',
              backgroundColor: '#F9FAFB',
              fontSize: '12px',
              fontWeight: '600',
              color: '#6B7280',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              <div>Item</div>
              <div>Type</div>
              <div>Start Date</div>
              <div>Duration</div>
              <div>Assigned To</div>
              <div>Status</div>
              <div>Actions</div>
            </div>

            {filteredItems.map((item, index) => {
              const TypeIcon = getTypeIcon(item.type);
              const StatusIcon = getStatusIcon(item.status);
              
              return (
                <div
                  key={item.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 120px 120px 120px 150px 120px 100px',
                    padding: '16px 24px',
                    borderBottom: index < filteredItems.length - 1 ? '1px solid #E5E7EB' : 'none',
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
                        {item.title}
                      </div>
                      <div style={{ fontSize: '12px', color: '#6B7280' }}>
                        {item.location} • {item.estimatedHours}h estimated
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
                    <div>{formatDate(item.startDate)}</div>
                    <div style={{ fontSize: '12px', color: '#6B7280' }}>
                      {formatTime(item.startDate)}
                    </div>
                  </div>
                  
                  <div style={{ fontSize: '14px', color: '#6B7280' }}>
                    {Math.ceil((new Date(item.endDate).getTime() - new Date(item.startDate).getTime()) / (1000 * 60 * 60 * 24))} days
                  </div>
                  
                  <div>
                    <div style={{ fontSize: '12px', color: '#111827', marginBottom: '2px' }}>
                      {item.assignedTo.slice(0, 2).join(', ')}
                    </div>
                    {item.assignedTo.length > 2 && (
                      <div style={{ fontSize: '10px', color: '#6B7280' }}>
                        +{item.assignedTo.length - 2} more
                      </div>
                    )}
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
                    <Link href={`/portal/planning/${item.id}`} style={{
                      padding: '6px',
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '4px',
                      textDecoration: 'none',
                      color: '#6B7280'
                    }}>
                      <Eye size={14} />
                    </Link>
                    <Link href={`/portal/planning/${item.id}/edit`} style={{
                      padding: '6px',
                      backgroundColor: '#006FEE',
                      border: 'none',
                      borderRadius: '4px',
                      textDecoration: 'none',
                      color: 'white'
                    }}>
                      <Edit size={14} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {filteredItems.length === 0 && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '48px 24px',
            border: '2px solid #E5E7EB',
            textAlign: 'center'
          }}>
            <Calendar size={48} color="#D1D5DB" style={{ margin: '0 auto 16px auto' }} />
            <h3 style={{ fontSize: '18px', fontWeight: '500', color: '#111827', margin: '0 0 8px 0' }}>
              No planning items found
            </h3>
            <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>
              No planning items match your current search criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}