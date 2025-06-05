'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  HelpCircle,
  Search,
  Book,
  Video,
  MessageSquare,
  Phone,
  Mail,
  Clock,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  Download,
  User,
  Settings,
  Shield,
  CreditCard,
  Package,
  Wrench,
  BarChart3,
  Users,
  FileText,
  Lightbulb,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
}

interface SupportOption {
  id: string;
  title: string;
  description: string;
  icon: any;
  availability: string;
  responseTime: string;
  action: string;
  link: string;
}

export default function PortalHelpPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const faqItems: FAQItem[] = [
    {
      id: 'faq-001',
      question: 'How do I create a new project in the portal?',
      answer: 'To create a new project, navigate to the Projects section and click the "New Project" button. Fill out the project details including name, description, client information, and timeline. You can also upload any relevant documents during the creation process.',
      category: 'projects',
      tags: ['create', 'project', 'new']
    },
    {
      id: 'faq-002',
      question: 'How can I track project progress and milestones?',
      answer: 'Project progress is tracked through the project dashboard. You can view completion percentages, milestone status, budget utilization, and team assignments. The Gantt chart view provides a visual timeline of all project activities.',
      category: 'projects',
      tags: ['progress', 'milestones', 'tracking']
    },
    {
      id: 'faq-003',
      question: 'How do I manage user permissions and access levels?',
      answer: 'User permissions are managed through the Settings > User Management section. You can assign roles such as Engineer, Project Manager, or Administrator. Each role has specific access permissions to different areas of the portal.',
      category: 'users',
      tags: ['permissions', 'users', 'roles']
    },
    {
      id: 'faq-004',
      question: 'How do I generate and download project reports?',
      answer: 'Reports can be generated from the Analytics section. Select the report type (progress, financial, or technical), choose the date range and projects to include, then click Generate. Reports are available in PDF and Excel formats.',
      category: 'reports',
      tags: ['reports', 'download', 'analytics']
    },
    {
      id: 'faq-005',
      question: 'How do I upload and manage CAD files?',
      answer: 'CAD files can be uploaded through the Engineering > CAD section. Supported formats include DWG, DXF, STEP, and IGES. Files are automatically versioned and you can add comments and approval workflows.',
      category: 'engineering',
      tags: ['cad', 'upload', 'files']
    },
    {
      id: 'faq-006',
      question: 'How do I set up inventory tracking for materials?',
      answer: 'Inventory is managed through the Materials section. Add new materials with specifications, set minimum stock levels, and configure automatic reorder points. The system will alert you when stock levels are low.',
      category: 'inventory',
      tags: ['inventory', 'materials', 'stock']
    },
    {
      id: 'faq-007',
      question: 'How do I configure billing and invoicing settings?',
      answer: 'Billing settings are in the Financial > Settings section. You can set up client billing rates, payment terms, invoice templates, and automated billing schedules. Integration with accounting software is also available.',
      category: 'billing',
      tags: ['billing', 'invoicing', 'payments']
    },
    {
      id: 'faq-008',
      question: 'How do I backup and restore project data?',
      answer: 'Data backups are performed automatically daily. Manual backups can be initiated from Settings > Data Management. To restore data, contact support with your backup requirements and we will assist with the restoration process.',
      category: 'data',
      tags: ['backup', 'restore', 'data']
    }
  ];

  const supportOptions: SupportOption[] = [
    {
      id: 'chat',
      title: 'Live Chat Support',
      description: 'Get immediate help from our support team via live chat',
      icon: MessageSquare,
      availability: 'Mon-Fri 9AM-6PM',
      responseTime: 'Immediate',
      action: 'Start Chat',
      link: '/portal/chat'
    },
    {
      id: 'phone',
      title: 'Phone Support',
      description: 'Speak directly with our technical support specialists',
      icon: Phone,
      availability: 'Mon-Fri 9AM-5PM',
      responseTime: 'Immediate',
      action: 'Call Now',
      link: 'tel:+441872123456'
    },
    {
      id: 'email',
      title: 'Email Support',
      description: 'Send detailed support requests and receive comprehensive responses',
      icon: Mail,
      availability: '24/7',
      responseTime: '4-6 hours',
      action: 'Send Email',
      link: 'mailto:support@swsteamengineering.co.uk'
    },
    {
      id: 'documentation',
      title: 'Documentation',
      description: 'Browse comprehensive guides and technical documentation',
      icon: Book,
      availability: '24/7',
      responseTime: 'Self-service',
      action: 'Browse Docs',
      link: '/portal/help/documentation'
    }
  ];

  const quickLinks = [
    { title: 'Getting Started Guide', icon: Lightbulb, link: '/portal/help/getting-started' },
    { title: 'Project Management', icon: FileText, link: '/portal/help/projects' },
    { title: 'User Management', icon: Users, link: '/portal/help/users' },
    { title: 'Engineering Tools', icon: Wrench, link: '/portal/help/engineering' },
    { title: 'Financial Management', icon: CreditCard, link: '/portal/help/financial' },
    { title: 'System Settings', icon: Settings, link: '/portal/help/settings' },
    { title: 'Security Features', icon: Shield, link: '/portal/help/security' },
    { title: 'Analytics & Reporting', icon: BarChart3, link: '/portal/help/analytics' }
  ];

  const categories = [
    { value: 'all', label: 'All Topics', count: faqItems.length },
    { value: 'projects', label: 'Projects', count: faqItems.filter(item => item.category === 'projects').length },
    { value: 'users', label: 'User Management', count: faqItems.filter(item => item.category === 'users').length },
    { value: 'engineering', label: 'Engineering', count: faqItems.filter(item => item.category === 'engineering').length },
    { value: 'inventory', label: 'Inventory', count: faqItems.filter(item => item.category === 'inventory').length },
    { value: 'billing', label: 'Billing', count: faqItems.filter(item => item.category === 'billing').length },
    { value: 'reports', label: 'Reports', count: faqItems.filter(item => item.category === 'reports').length },
    { value: 'data', label: 'Data Management', count: faqItems.filter(item => item.category === 'data').length }
  ];

  const filteredFAQs = faqItems.filter(item => {
    const matchesSearch = searchTerm === '' ||
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #006FEE 0%, #0050B3 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px auto',
            boxShadow: '0 12px 32px rgba(0, 111, 238, 0.3)'
          }}>
            <HelpCircle size={36} color="white" />
          </div>
          <h1 style={{ fontSize: '40px', fontWeight: '800', color: '#111827', margin: '0 0 16px 0' }}>
            Help & Support Center
          </h1>
          <p style={{ fontSize: '20px', color: '#6B7280', marginBottom: '32px', lineHeight: '1.6' }}>
            Find answers, guides, and get support for your SWSE Portal experience
          </p>
          
          {/* Search */}
          <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
            <Search size={24} style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#6B7280'
            }} />
            <input
              type="text"
              placeholder="Search for help topics, features, or questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '16px 16px 16px 56px',
                borderRadius: '12px',
                border: '2px solid #E5E7EB',
                fontSize: '16px',
                outline: 'none',
                backgroundColor: 'white',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)'
              }}
            />
          </div>
        </div>

        {/* Support Options */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '48px'
        }}>
          {supportOptions.map((option) => {
            const IconComponent = option.icon;
            
            return (
              <Link
                key={option.id}
                href={option.link}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  padding: '32px',
                  border: '2px solid #E5E7EB',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'all 0.3s ease',
                  display: 'block'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 111, 238, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.04)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #006FEE 0%, #0050B3 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <IconComponent size={28} color="white" />
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', margin: 0 }}>
                    {option.title}
                  </h3>
                </div>
                
                <p style={{ fontSize: '16px', color: '#6B7280', marginBottom: '20px', lineHeight: '1.5' }}>
                  {option.description}
                </p>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div>
                    <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '2px' }}>Availability</div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>{option.availability}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '2px' }}>Response Time</div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>{option.responseTime}</div>
                  </div>
                </div>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '12px',
                  backgroundColor: '#006FEE',
                  color: 'white',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                  {option.action}
                  <ChevronRight size={16} />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Quick Links */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '32px',
          border: '2px solid #E5E7EB',
          marginBottom: '48px'
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#111827', marginBottom: '24px' }}>
            Quick Access
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '16px'
          }}>
            {quickLinks.map((link, index) => {
              const IconComponent = link.icon;
              
              return (
                <Link
                  key={index}
                  href={link.link}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '16px',
                    backgroundColor: '#F8FAFC',
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB',
                    textDecoration: 'none',
                    color: '#111827',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#EFF6FF';
                    e.currentTarget.style.borderColor = '#006FEE';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#F8FAFC';
                    e.currentTarget.style.borderColor = '#E5E7EB';
                  }}
                >
                  <IconComponent size={20} color="#006FEE" />
                  <span style={{ fontSize: '14px', fontWeight: '500' }}>{link.title}</span>
                  <ChevronRight size={16} color="#6B7280" style={{ marginLeft: 'auto' }} />
                </Link>
              );
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '32px',
          border: '2px solid #E5E7EB'
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#111827', marginBottom: '24px' }}>
            Frequently Asked Questions
          </h2>
          
          {/* Category Filter */}
          <div style={{ marginBottom: '24px' }}>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
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
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label} ({category.count})
                </option>
              ))}
            </select>
          </div>

          {/* FAQ Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filteredFAQs.map((faq) => (
              <div key={faq.id} style={{
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                overflow: 'hidden'
              }}>
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                  style={{
                    width: '100%',
                    padding: '20px',
                    backgroundColor: expandedFAQ === faq.id ? '#F8FAFC' : 'white',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    textAlign: 'left'
                  }}
                >
                  <span style={{ fontSize: '16px', fontWeight: '600', color: '#111827' }}>
                    {faq.question}
                  </span>
                  {expandedFAQ === faq.id ? (
                    <ChevronDown size={20} color="#006FEE" />
                  ) : (
                    <ChevronRight size={20} color="#6B7280" />
                  )}
                </button>
                
                {expandedFAQ === faq.id && (
                  <div style={{
                    padding: '20px',
                    backgroundColor: '#F8FAFC',
                    borderTop: '1px solid #E5E7EB'
                  }}>
                    <p style={{
                      fontSize: '14px',
                      color: '#374151',
                      lineHeight: '1.6',
                      margin: '0 0 16px 0'
                    }}>
                      {faq.answer}
                    </p>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {faq.tags.map((tag, index) => (
                        <span key={index} style={{
                          fontSize: '12px',
                          color: '#006FEE',
                          backgroundColor: '#EFF6FF',
                          padding: '4px 8px',
                          borderRadius: '4px'
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredFAQs.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '48px 24px',
              backgroundColor: '#F8FAFC',
              borderRadius: '8px',
              border: '1px solid #E5E7EB'
            }}>
              <HelpCircle size={48} color="#D1D5DB" style={{ margin: '0 auto 16px auto' }} />
              <h3 style={{ fontSize: '18px', fontWeight: '500', color: '#111827', margin: '0 0 8px 0' }}>
                No FAQs found
              </h3>
              <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>
                No FAQ items match your current search criteria.
              </p>
            </div>
          )}
        </div>

        {/* Contact Footer */}
        <div style={{
          background: 'linear-gradient(135deg, #006FEE 0%, #0050B3 100%)',
          borderRadius: '16px',
          padding: '48px 32px',
          textAlign: 'center',
          color: 'white',
          marginTop: '48px'
        }}>
          <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '16px' }}>
            Still Need Help?
          </h2>
          <p style={{ fontSize: '18px', marginBottom: '32px', opacity: 0.9 }}>
            Our support team is here to assist you with any questions or technical issues.
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '24px',
            flexWrap: 'wrap',
            marginBottom: '32px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Phone size={20} />
              <span>+44 (0) 1872 123456</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Mail size={20} />
              <span>support@swsteamengineering.co.uk</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={20} />
              <span>Mon-Fri 9AM-6PM</span>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <Link href="/portal/chat" style={{
              padding: '12px 24px',
              backgroundColor: 'white',
              color: '#006FEE',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease'
            }}>
              <MessageSquare size={16} />
              Start Live Chat
            </Link>
            <Link href="mailto:support@swsteamengineering.co.uk" style={{
              padding: '12px 24px',
              backgroundColor: 'transparent',
              color: 'white',
              border: '2px solid white',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease'
            }}>
              <Mail size={16} />
              Send Email
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}