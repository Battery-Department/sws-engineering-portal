'use client';

import React, { useState, useEffect } from 'react';
import { FileText, BarChart3, Wrench, Shield, Truck, ChevronDown, ChevronRight, Clock, ExternalLink, LifeBuoy, Package, Settings, Users, Calendar } from 'lucide-react';
import ServiceComparisonTable from './ServiceComparisonTable';
import ServiceCalculator from './ServiceCalculator';

// Types for the component
interface ServiceSpec {
  name: string;
  basicService: string;
  standardService: string;
  premiumService: string;
}

interface ServiceItem {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ReactNode;
}

interface Category {
  id: string;
  name: string;
}

interface ServiceFeature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface ServiceDelivery {
  id: string;
  name: string;
  timeframe: string;
  description: string;
  recommended: boolean;
}

// Data for the component
const serviceSpecs: ServiceSpec[] = [
  { name: "Response Time", basicService: "5-7 Business Days", standardService: "2-3 Business Days", premiumService: "Same Day" },
  { name: "Engineering Hours", basicService: "40 Hours", standardService: "80 Hours", premiumService: "120 Hours" },
  { name: "Site Visits", basicService: "1 Visit", standardService: "2-3 Visits", premiumService: "Unlimited" },
  { name: "Project Duration", basicService: "2-4 Weeks", standardService: "1-3 Weeks", premiumService: "1-2 Weeks" },
  { name: "Documentation", basicService: "Basic Report", standardService: "Detailed Report + CAD", premiumService: "Complete Package + 3D Models" },
  { name: "Revisions", basicService: "1 Revision", standardService: "3 Revisions", premiumService: "Unlimited Revisions" },
  { name: "Compliance Standards", basicService: "ASME Basic", standardService: "ASME + API", premiumService: "Full Regulatory Compliance" },
  { name: "Quality Assurance", basicService: "Standard QA", standardService: "Enhanced QA + Testing", premiumService: "Full QA + Independent Review" },
  { name: "Support Period", basicService: "30 Days", standardService: "90 Days", premiumService: "12 Months" },
  { name: "Emergency Support", basicService: "Email Only", standardService: "Phone + Email", premiumService: "24/7 Hotline" },
  { name: "Project Manager", basicService: "Shared PM", standardService: "Dedicated PM", premiumService: "Senior PM + Backup" },
  { name: "Warranty", basicService: "6 Months", standardService: "12 Months", premiumService: "24 Months" },
  { name: "Service Location", basicService: "Remote + 1 Site Visit", standardService: "Hybrid Approach", premiumService: "On-Site + Remote" }
];

const services: ServiceItem[] = [
  // Design & Analysis
  { id: "thermal1", name: "Thermal Analysis", description: "Heat transfer and thermal stress analysis for steam systems", category: "design", icon: <Settings size={24} /> },
  { id: "piping1", name: "Piping Design", description: "Complete piping system design and layout optimization", category: "design", icon: <Settings size={24} /> },
  { id: "pressure1", name: "Pressure Vessel Design", description: "ASME compliant pressure vessel engineering", category: "design", icon: <Settings size={24} /> },
  { id: "steam1", name: "Steam Distribution", description: "Steam distribution network design and optimization", category: "design", icon: <Settings size={24} /> },
  
  // Consulting Services
  { id: "audit1", name: "Energy Audit", description: "Comprehensive energy efficiency assessment", category: "consulting", icon: <BarChart3 size={24} /> },
  { id: "optimize1", name: "System Optimization", description: "Performance optimization for existing systems", category: "consulting", icon: <BarChart3 size={24} /> },
  { id: "safety1", name: "Safety Assessment", description: "Risk analysis and safety system evaluation", category: "consulting", icon: <Shield size={24} /> },
  { id: "compliance1", name: "Regulatory Compliance", description: "Code compliance review and certification support", category: "consulting", icon: <Shield size={24} /> },
  
  // Installation & Commissioning
  { id: "install1", name: "System Installation", description: "Professional installation and setup services", category: "installation", icon: <Wrench size={24} /> },
  { id: "commission1", name: "Commissioning", description: "System commissioning and performance verification", category: "installation", icon: <Wrench size={24} /> },
  { id: "startup1", name: "Startup Services", description: "System startup and initial operation support", category: "installation", icon: <Wrench size={24} /> },
  
  // Maintenance & Support
  { id: "maintain1", name: "Preventive Maintenance", description: "Scheduled maintenance programs", category: "maintenance", icon: <Calendar size={24} /> },
  { id: "repair1", name: "Emergency Repair", description: "24/7 emergency repair services", category: "maintenance", icon: <Calendar size={24} /> },
  { id: "upgrade1", name: "System Upgrades", description: "Equipment upgrades and modernization", category: "maintenance", icon: <Calendar size={24} /> },
];

const categories: Category[] = [
  { id: "all", name: "All Services" },
  { id: "design", name: "Design & Analysis" },
  { id: "consulting", name: "Consulting" },
  { id: "installation", name: "Installation" },
  { id: "maintenance", name: "Maintenance" }
];

const serviceFeatures: ServiceFeature[] = [
  { 
    id: "quality-guarantee", 
    title: "Quality Guarantee", 
    description: "All work meets or exceeds industry standards with full performance warranty.",
    icon: <Shield size={24} className="text-green-600" />
  },
  { 
    id: "expert-team", 
    title: "Expert Engineering Team", 
    description: "Licensed professional engineers with decades of steam system experience.",
    icon: <Users size={24} className="text-green-600" />
  },
  { 
    id: "rapid-response", 
    title: "Rapid Response", 
    description: "Emergency services available 24/7 with guaranteed response times.",
    icon: <Clock size={24} className="text-green-600" />
  }
];

const faqs: FAQ[] = [
  { 
    id: "faq1", 
    question: "How do I get started with a new engineering project?", 
    answer: "Contact our team for an initial consultation. We'll assess your requirements, provide a detailed proposal, and assign a dedicated project manager to guide you through the entire process."
  },
  { 
    id: "faq2", 
    question: "What's included in your service warranty?", 
    answer: "Our warranty covers all engineering work, design accuracy, and performance guarantees. We stand behind our calculations, designs, and recommendations with full professional liability coverage."
  },
  { 
    id: "faq3", 
    question: "Do you provide emergency engineering services?", 
    answer: "Yes, we offer 24/7 emergency engineering support for critical steam system failures. Our emergency response team can be on-site within hours to assess and resolve urgent issues."
  },
  { 
    id: "faq4", 
    question: "Are your engineers licensed and certified?", 
    answer: "All our engineers are licensed Professional Engineers (PE) with specialized training in steam systems, pressure vessels, and industrial processes. We maintain all required certifications and continuing education."
  }
];

const serviceDelivery: ServiceDelivery[] = [
  { 
    id: "standard", 
    name: "Standard Service", 
    timeframe: "5-10 Business Days", 
    description: "Regular timeline for non-urgent projects", 
    recommended: false
  },
  { 
    id: "priority", 
    name: "Priority Service", 
    timeframe: "2-5 Business Days", 
    description: "Expedited service for time-sensitive projects", 
    recommended: true
  },
  { 
    id: "emergency", 
    name: "Emergency Service", 
    timeframe: "Same Day - 24 Hours", 
    description: "Critical system failures and urgent repairs", 
    recommended: false
  }
];

// Service estimation data for calculator
const serviceData = {
  projects: [
    { id: "thermalAnalysis", name: "Thermal Analysis", complexity: 3 },
    { id: "pipingDesign", name: "Piping System Design", complexity: 5 },
    { id: "pressureVessel", name: "Pressure Vessel Design", complexity: 7 },
    { id: "energyAudit", name: "Energy Audit", complexity: 4 },
    { id: "systemOptimization", name: "System Optimization", complexity: 6 }
  ],
  serviceTypes: {
    "basic": 40,
    "standard": 80,
    "premium": 120
  }
};

export default function ProductTabs() {
  const [activeTab, setActiveTab] = useState("specs");
  const [selectedService, setSelectedService] = useState("standard");
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedFAQ, setExpandedFAQ] = useState("");
  const [selectedProject, setSelectedProject] = useState(serviceData.projects[0].id);
  const [isClient, setIsClient] = useState(false);
  
  // For responsive behavior
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Filter services based on active category
  const filteredServices = services.filter(service => 
    activeCategory === "all" || service.category === activeCategory
  );
  
  // Toggle FAQ expansion
  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? "" : id);
  };
  
  const selectedProjectObj = serviceData.projects.find(p => p.id === selectedProject);
  
  const tabs = [
    { id: "specs", label: "Service Specifications", icon: <FileText size={16} /> },
    { id: "calculator", label: "Project Calculator", icon: <BarChart3 size={16} /> },
    { id: "services", label: "Available Services", icon: <Wrench size={16} /> },
    { id: "guarantee", label: "Service Guarantee", icon: <Shield size={16} /> },
    { id: "delivery", label: "Service Delivery", icon: <Truck size={16} /> }
  ];

  if (!isClient) {
    return null; // Prevent hydration errors
  }

  return (
    <div className="product-tabs my-8">
      {/* Tab Navigation */}
      <div style={{ 
        display: 'flex', 
        overflowX: 'auto', 
        marginBottom: '24px',
        borderBottom: '1px solid #E5E7EB'
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '16px 24px',
              fontSize: '14px',
              fontWeight: '600',
              whiteSpace: 'nowrap',
              borderBottom: '2px solid',
              borderColor: activeTab === tab.id ? '#2563EB' : 'transparent',
              color: activeTab === tab.id ? '#2563EB' : '#6B7280',
              background: 'transparent',
              transition: 'all 0.15s ease-in-out',
              cursor: 'pointer',
              border: 'none',
              outline: 'none'
            }}
            onClick={() => setActiveTab(tab.id)}
          >
            <span style={{ marginRight: '8px' }}>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{ 
        background: 'white', 
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        transition: 'all 0.15s ease-in-out'
      }}>
        {/* Service Specifications Tab */}
        {activeTab === "specs" && (
          <ServiceComparisonTable 
            serviceSpecs={serviceSpecs}
            selectedService={selectedService}
            setSelectedService={setSelectedService}
          />
        )}

        {/* Project Calculator Tab */}
        {activeTab === "calculator" && (
          <ServiceCalculator
            projects={serviceData.projects}
            serviceTypes={serviceData.serviceTypes}
            selectedService={selectedService}
            setSelectedService={setSelectedService}
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            isMobile={isMobile}
          />
        )}

        {/* Available Services Tab */}
        {activeTab === "services" && (
          <div style={{ padding: '24px', background: 'white', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
            <div style={{ 
              display: 'flex', 
              overflowX: 'auto', 
              marginBottom: '24px', 
              paddingBottom: '8px'
            }}>
              {categories.map(category => (
                <button
                  key={category.id}
                  style={{
                    padding: '8px 16px',
                    marginRight: '12px',
                    borderRadius: '9999px',
                    fontSize: '14px',
                    fontWeight: '500',
                    whiteSpace: 'nowrap',
                    background: activeCategory === category.id ? '#2563EB' : 'white',
                    color: activeCategory === category.id ? 'white' : '#6B7280',
                    border: activeCategory === category.id ? 'none' : '1px solid #D1D5DB',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', 
              gap: '16px' 
            }}>
              {filteredServices.map(service => (
                <div
                  key={service.id}
                  style={{
                    padding: '20px',
                    background: 'white',
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB',
                    transition: 'all 0.15s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                    e.currentTarget.style.borderColor = '#BFDBFE';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = '#E5E7EB';
                  }}
                >
                  <div style={{ 
                    marginBottom: '16px', 
                    display: 'flex', 
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '8px',
                      background: '#F3F4F6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#4B5563'
                    }}>
                      {service.icon}
                    </div>
                    
                    <div style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#111827'
                    }}>
                      {service.name}
                    </div>
                  </div>
                  
                  <div style={{
                    fontSize: '14px',
                    color: '#6B7280',
                    lineHeight: '1.5'
                  }}>
                    {service.description}
                  </div>
                </div>
              ))}
            </div>
            
            <div style={{
              marginTop: '24px',
              padding: '16px',
              background: '#EFF6FF',
              borderRadius: '8px',
              border: '1px solid #BFDBFE',
              fontSize: '14px',
              color: '#1E40AF',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{ 
                flexShrink: 0, 
                background: 'white', 
                borderRadius: '9999px', 
                width: '32px', 
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#2563EB'
              }}>
                <ExternalLink size={16} />
              </div>
              <div>
                <strong>Need a custom solution?</strong> Contact our engineering team to discuss specialized services tailored to your specific requirements.
              </div>
            </div>
          </div>
        )}

        {/* Service Guarantee Tab */}
        {activeTab === "guarantee" && (
          <div style={{ padding: '24px', background: 'white', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '24px' 
            }}>
              <div style={{ 
                padding: '12px', 
                background: '#ECFDF5', 
                borderRadius: '9999px', 
                marginRight: '16px' 
              }}>
                <Shield size={24} style={{ color: '#059669' }} />
              </div>
              
              <div>
                <h3 style={{ 
                  fontSize: '18px', 
                  fontWeight: '700', 
                  color: '#111827', 
                  marginBottom: '4px' 
                }}>
                  Comprehensive Service Guarantee
                </h3>
                <p style={{ 
                  fontSize: '14px', 
                  color: '#6B7280', 
                  margin: '0' 
                }}>
                  Professional engineering services backed by industry-leading guarantees
                </p>
              </div>
            </div>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', 
              gap: '16px', 
              marginBottom: '32px' 
            }}>
              {serviceFeatures.map(feature => (
                <div
                  key={feature.id}
                  style={{
                    padding: '16px',
                    background: 'white',
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    marginBottom: '12px' 
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      background: '#ECFDF5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '12px'
                    }}>
                      {feature.icon}
                    </div>
                    
                    <div style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#111827',
                    }}>
                      {feature.title}
                    </div>
                  </div>
                  
                  <div style={{
                    fontSize: '14px',
                    color: '#6B7280',
                  }}>
                    {feature.description}
                  </div>
                </div>
              ))}
            </div>
            
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: '700', 
                color: '#111827', 
                marginBottom: '16px' 
              }}>
                Frequently Asked Questions
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {faqs.map(faq => (
                  <div
                    key={faq.id}
                    style={{
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      overflow: 'hidden'
                    }}
                  >
                    <button
                      style={{
                        width: '100%',
                        padding: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '15px',
                        fontWeight: '600',
                        color: '#111827',
                        background: expandedFAQ === faq.id ? '#F9FAFB' : 'white',
                        border: 'none',
                        borderBottom: expandedFAQ === faq.id ? '1px solid #E5E7EB' : 'none',
                        textAlign: 'left',
                        cursor: 'pointer'
                      }}
                      onClick={() => toggleFAQ(faq.id)}
                    >
                      {faq.question}
                      {expandedFAQ === faq.id ? (
                        <ChevronDown size={20} />
                      ) : (
                        <ChevronRight size={20} />
                      )}
                    </button>
                    
                    {expandedFAQ === faq.id && (
                      <div style={{
                        padding: '16px',
                        fontSize: '14px',
                        color: '#4B5563',
                        background: 'white'
                      }}>
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div style={{
              padding: '16px',
              background: '#EFF6FF',
              borderRadius: '8px',
              border: '1px solid #BFDBFE',
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: isMobile ? 'flex-start' : 'center',
              justifyContent: 'space-between',
              gap: '16px'
            }}>
              <div>
                <h4 style={{ 
                  fontSize: '16px', 
                  fontWeight: '600', 
                  color: '#1E40AF', 
                  marginBottom: '4px' 
                }}>
                  Need to discuss your project?
                </h4>
                <p style={{ 
                  fontSize: '14px', 
                  color: '#3B82F6', 
                  margin: '0' 
                }}>
                  Contact our engineering team for a free consultation and project assessment.
                </p>
              </div>
              
              <button style={{
                padding: '10px 20px',
                background: '#2563EB',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <LifeBuoy size={16} />
                Contact Support
              </button>
            </div>
          </div>
        )}

        {/* Service Delivery Tab */}
        {activeTab === "delivery" && (
          <div style={{ padding: '24px', background: 'white', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: '700', 
                color: '#111827', 
                marginBottom: '16px' 
              }}>
                Service Delivery Options
              </h3>
              
              <table style={{ 
                width: '100%', 
                borderCollapse: 'collapse', 
                borderRadius: '8px', 
                overflow: 'hidden',
                border: '1px solid #E5E7EB'
              }}>
                <thead>
                  <tr style={{ background: '#F9FAFB' }}>
                    <th style={{ 
                      padding: '12px 16px', 
                      fontSize: '14px', 
                      fontWeight: '600', 
                      color: '#111827', 
                      textAlign: 'left',
                      borderBottom: '1px solid #E5E7EB'
                    }}>
                      Service Type
                    </th>
                    <th style={{ 
                      padding: '12px 16px', 
                      fontSize: '14px', 
                      fontWeight: '600', 
                      color: '#111827', 
                      textAlign: 'center',
                      borderBottom: '1px solid #E5E7EB'
                    }}>
                      Timeframe
                    </th>
                    <th style={{ 
                      padding: '12px 16px', 
                      fontSize: '14px', 
                      fontWeight: '600', 
                      color: '#111827', 
                      textAlign: 'center',
                      borderBottom: '1px solid #E5E7EB'
                    }}>
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {serviceDelivery.map((service, index) => (
                    <tr 
                      key={service.id}
                      style={{ 
                        background: service.recommended ? '#F0F9FF' : (index % 2 === 0 ? 'white' : '#F9FAFB')
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = service.recommended 
                          ? '#E0F2FE' 
                          : (index % 2 === 0 ? '#F9FAFB' : '#F3F4F6');
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = service.recommended 
                          ? '#F0F9FF' 
                          : (index % 2 === 0 ? 'white' : '#F9FAFB');
                      }}
                    >
                      <td style={{ 
                        padding: '16px', 
                        fontSize: '14px', 
                        color: '#111827',
                        borderBottom: '1px solid #E5E7EB'
                      }}>
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '12px' 
                        }}>
                          {service.name}
                          {service.recommended && (
                            <span style={{
                              fontSize: '12px',
                              fontWeight: '600',
                              color: '#3B82F6',
                              background: '#DBEAFE',
                              padding: '2px 8px',
                              borderRadius: '9999px'
                            }}>
                              Most Popular
                            </span>
                          )}
                        </div>
                      </td>
                      <td style={{ 
                        padding: '16px', 
                        fontSize: '14px', 
                        color: '#6B7280',
                        textAlign: 'center',
                        borderBottom: '1px solid #E5E7EB'
                      }}>
                        {service.timeframe}
                      </td>
                      <td style={{ 
                        padding: '16px', 
                        fontSize: '14px', 
                        color: '#6B7280',
                        textAlign: 'center',
                        borderBottom: '1px solid #E5E7EB'
                      }}>
                        {service.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: '700', 
                color: '#111827', 
                marginBottom: '16px' 
              }}>
                Project Delivery Process
              </h3>
              
              <div style={{ position: 'relative', paddingBottom: '16px' }}>
                {/* Timeline Track */}
                <div style={{
                  position: 'absolute',
                  top: '24px',
                  left: '24px',
                  right: '24px',
                  height: '2px',
                  background: '#E5E7EB',
                  zIndex: 1
                }}/>
                
                {/* Timeline Points */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
                  gap: isMobile ? '40px' : '0',
                  position: 'relative',
                  zIndex: 2
                }}>
                  {/* Project Initiation */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: '#2563EB',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px'
                    }}>
                      <span>1</span>
                    </div>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#111827',
                      marginBottom: '4px',
                      textAlign: 'center'
                    }}>
                      Project Kickoff
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: '#6B7280',
                      textAlign: 'center'
                    }}>
                      Day 1
                    </div>
                  </div>
                  
                  {/* Engineering Phase */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: '#2563EB',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px'
                    }}>
                      <span>2</span>
                    </div>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#111827',
                      marginBottom: '4px',
                      textAlign: 'center'
                    }}>
                      Engineering
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: '#6B7280',
                      textAlign: 'center'
                    }}>
                      50-75% Timeline
                    </div>
                  </div>
                  
                  {/* Review & QA */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: '#2563EB',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px'
                    }}>
                      <span>3</span>
                    </div>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#111827',
                      marginBottom: '4px',
                      textAlign: 'center'
                    }}>
                      Review & QA
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: '#6B7280',
                      textAlign: 'center'
                    }}>
                      15-20% Timeline
                    </div>
                  </div>
                  
                  {/* Final Delivery */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: '#2563EB',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px'
                    }}>
                      <span>4</span>
                    </div>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#111827',
                      marginBottom: '4px',
                      textAlign: 'center'
                    }}>
                      Final Delivery
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: '#6B7280',
                      textAlign: 'center'
                    }}>
                      Final 10%
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div style={{
              padding: '16px',
              background: '#F0F9FF',
              borderRadius: '8px',
              border: '1px solid #BAE6FD',
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'white',
                color: '#0284C7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Clock size={24} />
              </div>
              
              <div>
                <h4 style={{ 
                  fontSize: '16px', 
                  fontWeight: '600', 
                  color: '#0C4A6E', 
                  marginBottom: '4px' 
                }}>
                  Dedicated Project Management
                </h4>
                <p style={{ 
                  fontSize: '14px', 
                  color: '#0369A1', 
                  margin: '0' 
                }}>
                  Every project includes a dedicated project manager to ensure timely delivery and clear communication throughout the engineering process.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}