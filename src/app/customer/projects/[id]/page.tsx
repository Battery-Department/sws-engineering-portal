'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  Calendar,
  Clock,
  DollarSign,
  Users,
  FileText,
  MessageSquare,
  Camera,
  CheckCircle,
  AlertTriangle,
  Activity,
  Download,
  Eye,
  Phone,
  Mail,
  MapPin,
  Settings,
  Wrench,
  Award,
  Package
} from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'in_progress' | 'testing' | 'completed' | 'on_hold';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  startDate: string;
  expectedCompletion: string;
  budget: number;
  spent: number;
  progress: number;
  client: string;
  projectManager: string;
  engineer: string;
  category: string;
  milestones: Milestone[];
  documents: Document[];
  messages: Message[];
  photos: Photo[];
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  progress: number;
}

interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: string;
  category: 'technical' | 'invoice' | 'report' | 'certificate';
}

interface Message {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  type: 'update' | 'question' | 'notification';
}

interface Photo {
  id: string;
  title: string;
  description: string;
  capturedAt: string;
  category: 'progress' | 'issue' | 'completion';
}

export default function CustomerProjectDetailPage() {
  const params = useParams();
  const projectId = params.id as string;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Simulate API call to fetch project details
    setTimeout(() => {
      const mockProject: Project = {
        id: projectId,
        name: '7¼" Gauge Steam Locomotive Restoration',
        description: 'Complete restoration of GWR 4900 Hall Class locomotive including boiler refurbishment, fire tube replacement, and smokebox restoration to operational condition.',
        status: 'in_progress',
        priority: 'high',
        startDate: '2024-01-15',
        expectedCompletion: '2024-05-30',
        budget: 47500,
        spent: 38200,
        progress: 85,
        client: 'Didcot Railway Centre',
        projectManager: 'Mike Thompson CEng',
        engineer: 'Sarah Williams',
        category: 'Heritage Railway',
        milestones: [
          {
            id: 'm1',
            title: 'Initial Assessment Complete',
            description: 'Comprehensive condition survey and documentation',
            dueDate: '2024-01-25',
            status: 'completed',
            progress: 100
          },
          {
            id: 'm2',
            title: 'Boiler Dismantling',
            description: 'Safe removal and cataloguing of boiler components',
            dueDate: '2024-02-08',
            status: 'completed',
            progress: 100
          },
          {
            id: 'm3',
            title: 'Fire Tube Replacement',
            description: 'Installation of new heritage-grade fire tubes',
            dueDate: '2024-05-15',
            status: 'completed',
            progress: 100
          },
          {
            id: 'm4',
            title: 'Smokebox Restoration',
            description: 'Restoration and testing of smokebox assembly',
            dueDate: '2024-05-22',
            status: 'in_progress',
            progress: 75
          },
          {
            id: 'm5',
            title: 'Final Assembly & Testing',
            description: 'Complete assembly and operational testing',
            dueDate: '2024-05-30',
            status: 'pending',
            progress: 0
          }
        ],
        documents: [
          {
            id: 'd1',
            name: 'Initial Assessment Report',
            type: 'pdf',
            size: 2560000,
            uploadedAt: '2024-01-26',
            category: 'report'
          },
          {
            id: 'd2',
            name: 'Progress Report - May 2024',
            type: 'pdf',
            size: 1850000,
            uploadedAt: '2024-05-18',
            category: 'report'
          },
          {
            id: 'd3',
            name: 'Fire Tube Specifications',
            type: 'pdf',
            size: 450000,
            uploadedAt: '2024-02-15',
            category: 'technical'
          },
          {
            id: 'd4',
            name: 'Invoice INV-2024-0012',
            type: 'pdf',
            size: 280000,
            uploadedAt: '2024-05-20',
            category: 'invoice'
          }
        ],
        messages: [
          {
            id: 'msg1',
            sender: 'Mike Thompson',
            message: 'Fire tube installation completed successfully. All pressure tests passed with zero leakage detected.',
            timestamp: '2024-05-16T10:30:00Z',
            type: 'update'
          },
          {
            id: 'msg2',
            sender: 'Sarah Williams',
            message: 'Small amount of pitting discovered on smokebox plate. Additional cleaning required - 2 day extension.',
            timestamp: '2024-05-18T14:15:00Z',
            type: 'notification'
          },
          {
            id: 'msg3',
            sender: 'Project System',
            message: 'Milestone "Fire Tube Replacement" marked as completed.',
            timestamp: '2024-05-15T16:45:00Z',
            type: 'notification'
          }
        ],
        photos: [
          {
            id: 'p1',
            title: 'Fire Tube Installation Progress',
            description: 'New heritage-grade steel tubes fitted with precision',
            capturedAt: '2024-05-14',
            category: 'progress'
          },
          {
            id: 'p2',
            title: 'Pressure Testing Setup',
            description: 'Hydraulic test to 270 PSI - zero leakage detected',
            capturedAt: '2024-05-15',
            category: 'progress'
          },
          {
            id: 'p3',
            title: 'Smokebox Restoration Work',
            description: 'Cleaning and preparation of smokebox assembly',
            capturedAt: '2024-05-18',
            category: 'progress'
          }
        ]
      };
      setProject(mockProject);
      setLoading(false);
    }, 1000);
  }, [projectId]);

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
          <p style={{ color: '#6B7280' }}>Loading project details...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        backgroundColor: '#F8FAFC'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>
            Project Not Found
          </h1>
          <p style={{ color: '#6B7280', marginBottom: '24px' }}>
            The requested project could not be found.
          </p>
          <Link 
            href="/customer/projects"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              backgroundColor: '#006FEE',
              color: 'white',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600'
            }}
          >
            <ArrowLeft size={16} />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#10B981';
      case 'in_progress': return '#006FEE';
      case 'testing': return '#8B5CF6';
      case 'on_hold': return '#F59E0B';
      case 'planning': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle size={16} />;
      case 'in_progress': return <Activity size={16} />;
      case 'testing': return <Settings size={16} />;
      case 'on_hold': return <AlertTriangle size={16} />;
      case 'planning': return <Clock size={16} />;
      default: return <Clock size={16} />;
    }
  };

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <Link 
            href="/customer/projects"
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
            Back to Projects
          </Link>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#111827', margin: '0 0 8px 0' }}>
                {project.name}
              </h1>
              <p style={{ fontSize: '16px', color: '#6B7280', marginBottom: '16px' }}>
                {project.description}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 12px',
                  backgroundColor: `${getStatusColor(project.status)}20`,
                  color: getStatusColor(project.status),
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  {getStatusIcon(project.status)}
                  {project.status.replace('_', ' ').toUpperCase()}
                </div>
                <div style={{ fontSize: '14px', color: '#6B7280' }}>
                  Project ID: {project.id}
                </div>
                <div style={{ fontSize: '14px', color: '#6B7280' }}>
                  {project.category}
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <Link href={`/customer/messages/${project.id}`} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                backgroundColor: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                color: '#374151',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                <MessageSquare size={16} />
                Messages
              </Link>
              <Link href={`/customer/documents/${project.id}`} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                backgroundColor: '#006FEE',
                color: 'white',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                <FileText size={16} />
                Documents
              </Link>
            </div>
          </div>

          {/* Progress Overview */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            border: '1px solid #E5E7EB',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '24px'
            }}>
              <div>
                <div style={{ fontSize: '14px', color: '#6B7280', marginBottom: '4px' }}>Progress</div>
                <div style={{ fontSize: '24px', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>
                  {project.progress}%
                </div>
                <div style={{
                  width: '100%',
                  height: '8px',
                  backgroundColor: '#E5E7EB',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${project.progress}%`,
                    height: '100%',
                    backgroundColor: '#10B981',
                    transition: 'width 0.3s ease'
                  }}></div>
                </div>
              </div>
              
              <div>
                <div style={{ fontSize: '14px', color: '#6B7280', marginBottom: '4px' }}>Budget</div>
                <div style={{ fontSize: '24px', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>
                  £{(project.spent / 1000).toFixed(0)}k / £{(project.budget / 1000).toFixed(0)}k
                </div>
                <div style={{
                  width: '100%',
                  height: '8px',
                  backgroundColor: '#E5E7EB',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${(project.spent / project.budget) * 100}%`,
                    height: '100%',
                    backgroundColor: '#006FEE',
                    transition: 'width 0.3s ease'
                  }}></div>
                </div>
              </div>
              
              <div>
                <div style={{ fontSize: '14px', color: '#6B7280', marginBottom: '4px' }}>Expected Completion</div>
                <div style={{ fontSize: '24px', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>
                  {new Date(project.expectedCompletion).toLocaleDateString('en-GB', { 
                    day: 'numeric', 
                    month: 'short',
                    year: 'numeric'
                  })}
                </div>
                <div style={{ fontSize: '14px', color: '#10B981' }}>
                  On track
                </div>
              </div>
              
              <div>
                <div style={{ fontSize: '14px', color: '#6B7280', marginBottom: '4px' }}>Team</div>
                <div style={{ fontSize: '16px', fontWeight: '500', color: '#111827', marginBottom: '4px' }}>
                  {project.projectManager}
                </div>
                <div style={{ fontSize: '14px', color: '#6B7280' }}>
                  Lead Engineer: {project.engineer}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ 
          display: 'flex', 
          gap: '4px', 
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '4px',
          marginBottom: '24px',
          border: '1px solid #E5E7EB'
        }}>
          {[
            { id: 'overview', label: 'Overview', icon: Activity },
            { id: 'milestones', label: 'Milestones', icon: CheckCircle },
            { id: 'documents', label: 'Documents', icon: FileText },
            { id: 'messages', label: 'Messages', icon: MessageSquare },
            { id: 'photos', label: 'Photos', icon: Camera }
          ].map(tab => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 16px',
                  backgroundColor: activeTab === tab.id ? '#006FEE' : 'transparent',
                  color: activeTab === tab.id ? 'white' : '#6B7280',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <IconComponent size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '32px',
            border: '1px solid #E5E7EB'
          }}>
            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#111827', marginBottom: '24px' }}>
              Project Overview
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px'
            }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
                  Project Details
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#6B7280' }}>Client:</span>
                    <span style={{ fontWeight: '500', color: '#111827' }}>{project.client}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#6B7280' }}>Start Date:</span>
                    <span style={{ fontWeight: '500', color: '#111827' }}>
                      {new Date(project.startDate).toLocaleDateString('en-GB')}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#6B7280' }}>Priority:</span>
                    <span style={{ 
                      fontWeight: '500', 
                      color: project.priority === 'high' ? '#EF4444' : project.priority === 'medium' ? '#F59E0B' : '#10B981'
                    }}>
                      {project.priority.toUpperCase()}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#6B7280' }}>Category:</span>
                    <span style={{ fontWeight: '500', color: '#111827' }}>{project.category}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
                  Recent Activity
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {project.messages.slice(0, 3).map(message => (
                    <div key={message.id} style={{
                      padding: '12px',
                      backgroundColor: '#F8FAFC',
                      borderRadius: '8px',
                      border: '1px solid #E5E7EB'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>
                          {message.sender}
                        </span>
                        <span style={{ fontSize: '12px', color: '#6B7280' }}>
                          {new Date(message.timestamp).toLocaleDateString('en-GB')}
                        </span>
                      </div>
                      <p style={{ fontSize: '14px', color: '#374151', margin: 0 }}>
                        {message.message}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'milestones' && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '32px',
            border: '1px solid #E5E7EB'
          }}>
            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#111827', marginBottom: '24px' }}>
              Project Milestones
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {project.milestones.map((milestone, index) => (
                <div key={milestone.id} style={{
                  padding: '20px',
                  backgroundColor: '#F8FAFC',
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div>
                      <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: '0 0 4px 0' }}>
                        {milestone.title}
                      </h3>
                      <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>
                        {milestone.description}
                      </p>
                    </div>
                    <span style={{
                      padding: '4px 8px',
                      backgroundColor: `${getStatusColor(milestone.status)}20`,
                      color: getStatusColor(milestone.status),
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      {milestone.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontSize: '14px', color: '#6B7280' }}>
                        Due: {new Date(milestone.dueDate).toLocaleDateString('en-GB')}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>
                        {milestone.progress}%
                      </span>
                      <div style={{
                        width: '100px',
                        height: '6px',
                        backgroundColor: '#E5E7EB',
                        borderRadius: '3px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${milestone.progress}%`,
                          height: '100%',
                          backgroundColor: getStatusColor(milestone.status),
                          transition: 'width 0.3s ease'
                        }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other tab contents would go here... */}
        {activeTab === 'documents' && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '32px',
            border: '1px solid #E5E7EB'
          }}>
            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#111827', marginBottom: '24px' }}>
              Project Documents
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {project.documents.map(doc => (
                <div key={doc.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px',
                  backgroundColor: '#F8FAFC',
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB'
                }}>
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: '500', color: '#111827', margin: '0 0 4px 0' }}>
                      {doc.name}
                    </h4>
                    <div style={{ fontSize: '14px', color: '#6B7280' }}>
                      {doc.category} • {(doc.size / 1024 / 1024).toFixed(1)} MB • {new Date(doc.uploadedAt).toLocaleDateString('en-GB')}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={{
                      padding: '8px',
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}>
                      <Eye size={16} color="#6B7280" />
                    </button>
                    <button style={{
                      padding: '8px',
                      backgroundColor: '#006FEE',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}>
                      <Download size={16} color="white" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}