'use client';

import React, { useState, useEffect } from 'react';
import { FileText, BarChart3, Wrench, Shield, Truck, ChevronDown, ChevronRight, Clock, ExternalLink, LifeBuoy, Package } from 'lucide-react';
import ServiceSpecsTable from '../../../components/ServiceSpecsTable';
import ServiceCalculator from '../../../components/ServiceCalculator';

// Types for the component
interface WarrantyFeature {
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

interface ShippingMethod {
  id: string;
  name: string;
  price: string;
  delivery: string;
  recommended: boolean;
}

interface Category {
  id: string;
  name: string;
}

interface ToolItem {
  id: string;
  name: string;
  model: string;
  category: string;
  icon: React.ReactNode;
}

// Data for the component
const serviceSpecs = [
  { name: "Service Category", valueBasic: "Basic Inspection", valueStandard: "Standard Maintenance", valuePremium: "Premium Overhaul" },
  { name: "Response Time", valueBasic: "24-48 hours", valueStandard: "Same Day", valuePremium: "Emergency 2-4 hours" },
  { name: "Service Duration", valueBasic: "2-4 hours", valueStandard: "4-8 hours", valuePremium: "1-3 days" },
  { name: "Technician Level", valueBasic: "Certified", valueStandard: "Senior Certified", valuePremium: "Master Technician" },
  { name: "Equipment Coverage", valueBasic: "Visual Inspection", valueStandard: "Full Diagnostics", valuePremium: "Complete Overhaul" },
  { name: "Report Delivery", valueBasic: "48 hours", valueStandard: "24 hours", valuePremium: "Same day" },
  { name: "Follow-up Support", valueBasic: "Email only", valueStandard: "Phone & Email", valuePremium: "Dedicated Support" },
  { name: "Service Guarantee", valueBasic: "30 days", valueStandard: "90 days", valuePremium: "12 months" },
  { name: "Emergency Support", valueBasic: "Not included", valueStandard: "Business hours", valuePremium: "24/7 Available" },
  { name: "Compliance Check", valueBasic: "Basic", valueStandard: "Standard", valuePremium: "Comprehensive" },
  { name: "Documentation", valueBasic: "Summary Report", valueStandard: "Detailed Report", valuePremium: "Full Audit Package" },
  { name: "Service Location", valueBasic: "On-site", valueStandard: "On-site", valuePremium: "On-site/Workshop" },
  { name: "Quality Assurance", valueBasic: "Standard", valueStandard: "Enhanced", valuePremium: "Premium" }
];

const equipmentTypes: ToolItem[] = [
  // Boilers Category
  { id: "boiler1", name: "Industrial Steam Boiler", model: "Type A", category: "boilers", icon: <Wrench size={24} /> },
  { id: "boiler2", name: "Commercial Boiler", model: "Type B", category: "boilers", icon: <Wrench size={24} /> },
  { id: "boiler3", name: "High Pressure Boiler", model: "Type C", category: "boilers", icon: <Wrench size={24} /> },
  { id: "boiler4", name: "Package Boiler", model: "Type D", category: "boilers", icon: <Wrench size={24} /> },
  
  // Pressure Vessels Category
  { id: "vessel1", name: "Storage Tank", model: "ST-100", category: "vessels", icon: <Wrench size={24} /> },
  { id: "vessel2", name: "Process Vessel", model: "PV-200", category: "vessels", icon: <Wrench size={24} /> },
  { id: "vessel3", name: "Heat Exchanger", model: "HE-300", category: "vessels", icon: <Wrench size={24} /> },
  { id: "vessel4", name: "Separator", model: "SP-400", category: "vessels", icon: <Wrench size={24} /> },
  { id: "vessel5", name: "Reactor Vessel", model: "RV-500", category: "vessels", icon: <Wrench size={24} /> },
  
  // Steam Systems Category
  { id: "steam1", name: "Steam Turbine", model: "ST-600", category: "steam", icon: <Wrench size={24} /> },
  { id: "steam2", name: "Steam Generator", model: "SG-700", category: "steam", icon: <Wrench size={24} /> },
  
  // Piping Systems Category
  { id: "pipe1", name: "High Pressure Piping", model: "HP-800", category: "piping", icon: <Wrench size={24} /> },
  { id: "pipe2", name: "Process Piping", model: "PP-900", category: "piping", icon: <Wrench size={24} /> },
  { id: "pipe3", name: "Steam Distribution", model: "SD-1000", category: "piping", icon: <Wrench size={24} /> },
  
  // Safety Systems Category
  { id: "safety1", name: "Safety Relief Valve", model: "SRV-1100", category: "safety", icon: <Wrench size={24} /> },
  { id: "safety2", name: "Pressure Relief System", model: "PRS-1200", category: "safety", icon: <Wrench size={24} /> },
  { id: "safety3", name: "Emergency Shutdown", model: "ESD-1300", category: "safety", icon: <Wrench size={24} /> },
];

const categories: Category[] = [
  { id: "all", name: "All Equipment" },
  { id: "boilers", name: "Boilers" },
  { id: "vessels", name: "Pressure Vessels" },
  { id: "steam", name: "Steam Systems" },
  { id: "piping", name: "Piping Systems" },
  { id: "safety", name: "Safety Systems" }
];

const serviceFeatures: WarrantyFeature[] = [
  { 
    id: "certified-inspection", 
    title: "Certified Inspections", 
    description: "All inspections performed by licensed and certified engineers to ensure compliance.",
    icon: <LifeBuoy size={24} className="text-green-600" />
  },
  { 
    id: "comprehensive-reporting", 
    title: "Comprehensive Reporting", 
    description: "Detailed reports with findings, recommendations, and compliance status.",
    icon: <Shield size={24} className="text-green-600" />
  },
  { 
    id: "rapid-response", 
    title: "Rapid Response", 
    description: "Emergency services available 24/7 with guaranteed response times.",
    icon: <Package size={24} className="text-green-600" />
  }
];

const faqs: FAQ[] = [
  { 
    id: "faq1", 
    question: "How do I schedule an engineering inspection?", 
    answer: "Contact our scheduling team through our customer portal or call our dispatch center. We'll arrange a visit based on your equipment type and urgency level."
  },
  { 
    id: "faq2", 
    question: "What's included in the service packages?", 
    answer: "Our services include visual inspections, non-destructive testing, compliance checks, detailed reporting, and follow-up support. Premium packages include emergency response and extended warranties."
  },
  { 
    id: "faq3", 
    question: "How quickly can you respond to emergencies?", 
    answer: "Our emergency response team is available 24/7 with guaranteed response times of 2-4 hours for critical situations. Standard service requests are typically scheduled within 24-48 hours."
  },
  { 
    id: "faq4", 
    question: "Are your inspections compliant with industry standards?", 
    answer: "Yes. All our inspections are performed by licensed Professional Engineers and comply with ASME, API, and local jurisdiction requirements. We provide certified documentation for regulatory compliance."
  }
];

const serviceMethods: ShippingMethod[] = [
  { 
    id: "standard", 
    name: "Standard Inspection", 
    price: "24-48 hours", 
    delivery: "Business Hours", 
    recommended: false
  },
  { 
    id: "priority", 
    name: "Priority Service", 
    price: "Same Day", 
    delivery: "Extended Hours", 
    recommended: true
  },
  { 
    id: "emergency", 
    name: "Emergency Response", 
    price: "2-4 hours", 
    delivery: "24/7 Available", 
    recommended: false
  }
];

// Service estimation data for calculator
const serviceData = {
  equipmentTypes: [
    { id: "boiler", name: "Steam Boiler", complexity: 8 },
    { id: "vessel", name: "Pressure Vessel", complexity: 6 },
    { id: "piping", name: "Piping System", complexity: 4 },
    { id: "valve", name: "Safety Valve", complexity: 3 },
    { id: "turbine", name: "Steam Turbine", complexity: 9 }
  ],
  serviceTypes: {
    "Basic": 1,
    "Standard": 2,
    "Premium": 3
  }
};

export default function ServiceTabs() {
  const [activeTab, setActiveTab] = useState("specs");
  const [selectedService, setSelectedService] = useState("Standard");
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedFAQ, setExpandedFAQ] = useState("");
  const [selectedEquipment, setSelectedEquipment] = useState(serviceData.equipmentTypes[0].id);
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
  
  // Filter equipment based on active category
  const filteredEquipment = equipmentTypes.filter(equipment => 
    activeCategory === "all" || equipment.category === activeCategory
  );
  
  // Toggle FAQ expansion
  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? "" : id);
  };
  
  // Calculate service time based on service type and equipment complexity
  const calculateServiceTime = (serviceMultiplier: number, equipmentComplexity: number) => {
    return serviceMultiplier * equipmentComplexity;
  };
  
  const selectedEquipmentObj = serviceData.equipmentTypes.find(e => e.id === selectedEquipment);
  
  const tabs = [
    { id: "specs", label: "Service Specs", icon: <FileText size={16} /> },
    { id: "calculator", label: "Service Calculator", icon: <BarChart3 size={16} /> },
    { id: "equipment", label: "Equipment Coverage", icon: <Wrench size={16} /> },
    { id: "service", label: "Service Guarantee", icon: <Shield size={16} /> },
    { id: "scheduling", label: "Scheduling & Response", icon: <Truck size={16} /> }
  ];

  if (!isClient) {
    return null; // Prevent hydration errors
  }

  // Convert our service specs format to the one expected by ServiceSpecsTable
  const formattedServiceSpecs = serviceSpecs.map(spec => ({
    name: spec.name,
    values: [spec.valueBasic, spec.valueStandard, spec.valuePremium]
  }));

  return (
    <div className="service-tabs my-8">
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
        {/* Service Specs Tab */}
        {activeTab === "specs" && (
          <div style={{ overflow: 'hidden', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
            {/* Service Selector */}
            <div style={{ background: '#F9FAFB', padding: '16px', borderBottom: '1px solid #E5E7EB' }}>
              <div style={{ display: 'flex', gap: '16px' }}>
                {["Basic", "Standard", "Premium"].map(service => (
                  <button
                    key={service}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '9999px',
                      fontSize: '14px',
                      fontWeight: '500',
                      background: selectedService === service ? '#2563EB' : 'white',
                      color: selectedService === service ? 'white' : '#6B7280',
                      border: selectedService === service ? 'none' : '1px solid #D1D5DB',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                    onClick={() => setSelectedService(service)}
                  >
                    {service} Service
                  </button>
                ))}
              </div>
            </div>
            
            {/* Render the new ServiceSpecsTable component */}
            <ServiceSpecsTable 
              services={[
                { id: "basic", name: "Basic Service" },
                { id: "standard", name: "Standard Service" },
                { id: "premium", name: "Premium Service" }
              ]}
              specs={formattedServiceSpecs}
              selectedService={selectedService.toLowerCase()}
            />
          </div>
        )}

        {/* Service Calculator Tab */}
        {activeTab === "calculator" && (
          <div style={{ padding: '24px', background: 'white', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
            {/* Render the new ServiceCalculator component */}
            <ServiceCalculator 
              selectedService={selectedService}
              setSelectedService={setSelectedService}
              isMobile={isMobile}
              serviceData={serviceData}
            />
          </div>
        )}

        {/* Equipment Coverage Tab */}
        {activeTab === "equipment" && (
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
              gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(5, 1fr)', 
              gap: '16px' 
            }}>
              {filteredEquipment.map(equipment => (
                <div
                  key={equipment.id}
                  style={{
                    padding: '16px',
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
                    marginBottom: '12px', 
                    display: 'flex', 
                    justifyContent: 'center' 
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
                      {equipment.icon}
                    </div>
                  </div>
                  
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#111827',
                    textAlign: 'center',
                    marginBottom: '4px'
                  }}>
                    {equipment.model}
                  </div>
                  
                  <div style={{
                    fontSize: '12px',
                    color: '#6B7280',
                    textAlign: 'center'
                  }}>
                    {equipment.name}
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
                <strong>Need more details?</strong> Check our complete equipment coverage guide for all ASME and API certified systems.
              </div>
            </div>
          </div>
        )}

        {/* Service Guarantee Tab */}
        {activeTab === "service" && (
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
                  Quality assurance for all SWSE engineering services
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
                  Need to schedule a service?
                </h4>
                <p style={{ 
                  fontSize: '14px', 
                  color: '#3B82F6', 
                  margin: '0' 
                }}>
                  Contact our scheduling team for immediate assistance!
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
                Schedule Service
              </button>
            </div>
          </div>
        )}

        {/* Scheduling & Response Tab */}
        {activeTab === "scheduling" && (
          <div style={{ padding: '24px', background: 'white', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: '700', 
                color: '#111827', 
                marginBottom: '16px' 
              }}>
                Service Response Times
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
                      Response Time
                    </th>
                    <th style={{ 
                      padding: '12px 16px', 
                      fontSize: '14px', 
                      fontWeight: '600', 
                      color: '#111827', 
                      textAlign: 'center',
                      borderBottom: '1px solid #E5E7EB'
                    }}>
                      Availability
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {serviceMethods.map((method, index) => (
                    <tr 
                      key={method.id}
                      style={{ 
                        background: method.recommended ? '#F0F9FF' : (index % 2 === 0 ? 'white' : '#F9FAFB')
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = method.recommended 
                          ? '#E0F2FE' 
                          : (index % 2 === 0 ? '#F9FAFB' : '#F3F4F6');
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = method.recommended 
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
                          {method.name}
                          {method.recommended && (
                            <span style={{
                              fontSize: '12px',
                              fontWeight: '600',
                              color: '#3B82F6',
                              background: '#DBEAFE',
                              padding: '2px 8px',
                              borderRadius: '9999px'
                            }}>
                              Recommended
                            </span>
                          )}
                        </div>
                      </td>
                      <td style={{ 
                        padding: '16px', 
                        fontSize: '14px', 
                        color: method.price === "Free" ? '#10B981' : '#6B7280',
                        fontWeight: method.price === "Free" ? '600' : '400',
                        textAlign: 'center',
                        borderBottom: '1px solid #E5E7EB'
                      }}>
                        {method.price}
                      </td>
                      <td style={{ 
                        padding: '16px', 
                        fontSize: '14px', 
                        color: '#6B7280',
                        textAlign: 'center',
                        borderBottom: '1px solid #E5E7EB'
                      }}>
                        {method.delivery}
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
                Service Process Timeline
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
                  {/* Order Received */}
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
                      Service Requested
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: '#6B7280',
                      textAlign: 'center'
                    }}>
                      Immediate
                    </div>
                  </div>
                  
                  {/* Processing */}
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
                      Scheduling
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: '#6B7280',
                      textAlign: 'center'
                    }}>
                      1-2 Hours
                    </div>
                  </div>
                  
                  {/* Shipped */}
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
                      On-Site Service
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: '#6B7280',
                      textAlign: 'center'
                    }}>
                      As Scheduled
                    </div>
                  </div>
                  
                  {/* Delivered */}
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
                      Report Delivered
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: '#6B7280',
                      textAlign: 'center'
                    }}>
                      24-48 Hours
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
                  24/7 Emergency Response Available
                </h4>
                <p style={{ 
                  fontSize: '14px', 
                  color: '#0369A1', 
                  margin: '0' 
                }}>
                  For critical situations, our emergency response team is available around the clock with guaranteed 2-4 hour response times.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}