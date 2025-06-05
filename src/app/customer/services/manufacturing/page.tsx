'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Factory,
  Cog,
  Zap,
  Wrench,
  Shield,
  Clock,
  Award,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  Calendar,
  FileText,
  Users,
  Target,
  Settings,
  Layers,
  Package,
  Truck,
  Activity
} from 'lucide-react';

export default function ManufacturingServicesPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const manufacturingServices = [
    {
      id: 'precision-machining',
      title: 'Precision CNC Machining',
      description: 'High-precision CNC machining services for complex components and assemblies',
      features: [
        '5-axis CNC machining capabilities',
        'Precision turning and milling',
        'Tolerance down to ±0.005mm',
        'Materials: Steel, aluminum, brass, plastics',
        'Prototype to production quantities'
      ],
      duration: '1-6 weeks',
      price: 'From £150/hour',
      icon: Cog
    },
    {
      id: 'fabrication-welding',
      title: 'Fabrication & Welding',
      description: 'Expert fabrication and welding services for structural and precision applications',
      features: [
        'TIG, MIG, and stick welding',
        'Structural steel fabrication',
        'Pressure vessel construction',
        'Certified welders to BS standards',
        'NDT testing and certification'
      ],
      duration: '2-12 weeks',
      price: 'From £85/hour',
      icon: Zap
    },
    {
      id: 'casting-forging',
      title: 'Casting & Forging',
      description: 'Traditional casting and forging services for heritage and industrial applications',
      features: [
        'Sand and investment casting',
        'Traditional blacksmithing',
        'Pattern making and tooling',
        'Heat treatment and finishing',
        'Heritage railway component recreation'
      ],
      duration: '3-16 weeks',
      price: 'From £2,500',
      icon: Target
    },
    {
      id: 'assembly-testing',
      title: 'Assembly & Testing',
      description: 'Complete assembly services with comprehensive testing and quality validation',
      features: [
        'Sub-assembly and final assembly',
        'Performance testing and validation',
        'Quality control and inspection',
        'Packaging and shipping',
        'Installation and commissioning support'
      ],
      duration: '1-8 weeks',
      price: 'From £65/hour',
      icon: Settings
    }
  ];

  const capabilities = [
    {
      title: 'CNC Machining',
      description: 'State-of-the-art CNC equipment with 5-axis capability',
      specs: ['Max size: 2000x1000x800mm', 'Tolerance: ±0.005mm', '24/7 operation'],
      icon: Cog
    },
    {
      title: 'Welding & Fabrication',
      description: 'Certified welders and modern fabrication facilities',
      specs: ['All welding processes', 'Up to 50mm plate thickness', 'NDT testing available'],
      icon: Zap
    },
    {
      title: 'Quality Control',
      description: 'Comprehensive quality management and inspection',
      specs: ['CMM measurement', 'Material certification', 'ISO 9001:2015 certified'],
      icon: Shield
    },
    {
      title: 'Logistics',
      description: 'Complete project management and delivery services',
      specs: ['Project management', 'UK-wide delivery', 'Installation support'],
      icon: Truck
    }
  ];

  const materials = [
    { category: 'Steels', types: ['Mild Steel', 'Stainless Steel', 'Tool Steel', 'Alloy Steel'] },
    { category: 'Non-Ferrous', types: ['Aluminum', 'Brass', 'Bronze', 'Copper'] },
    { category: 'Plastics', types: ['Nylon', 'PTFE', 'HDPE', 'Acetal'] },
    { category: 'Specialty', types: ['Inconel', 'Titanium', 'Hastelloy', 'Monel'] }
  ];

  const projectTypes = [
    {
      title: 'Heritage Railway Components',
      description: 'Authentic recreation of vintage railway components to original specifications',
      examples: ['Steam locomotive parts', 'Signal box mechanisms', 'Carriage fittings', 'Track components'],
      complexity: 'High',
      leadTime: '6-20 weeks'
    },
    {
      title: 'Industrial Machinery Parts',
      description: 'Precision manufacturing of industrial components and replacement parts',
      examples: ['Gearbox components', 'Pump impellers', 'Bearing housings', 'Custom tooling'],
      complexity: 'Medium',
      leadTime: '2-8 weeks'
    },
    {
      title: 'Custom Engineering Solutions',
      description: 'Bespoke manufacturing for unique engineering challenges and applications',
      examples: ['One-off prototypes', 'Custom fixtures', 'Specialized tooling', 'Test equipment'],
      complexity: 'Variable',
      leadTime: '1-12 weeks'
    }
  ];

  const qualityStandards = [
    'ISO 9001:2015 Quality Management',
    'BS EN 1090 Structural Steelwork',
    'BS 4872 Welding Qualification',
    'ASME Section IX Welding',
    'CE Marking Compliance',
    'UKCA Marking Authorization'
  ];

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
            <Factory size={36} color="white" />
          </div>
          <h1 style={{ fontSize: '40px', fontWeight: '800', color: '#111827', margin: '0 0 16px 0' }}>
            Manufacturing Services
          </h1>
          <p style={{ fontSize: '20px', color: '#6B7280', marginBottom: '24px', lineHeight: '1.6' }}>
            Comprehensive manufacturing services including precision CNC machining, fabrication, welding, 
            and assembly for heritage railway, industrial, and bespoke engineering applications.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981' }}>
              <Award size={20} />
              <span style={{ fontWeight: '600' }}>ISO 9001 Certified</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981' }}>
              <Clock size={20} />
              <span style={{ fontWeight: '600' }}>Rapid Prototyping</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981' }}>
              <Shield size={20} />
              <span style={{ fontWeight: '600' }}>Quality Assured</span>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '24px',
          marginBottom: '48px'
        }}>
          {manufacturingServices.map((service) => {
            const IconComponent = service.icon;
            const isSelected = selectedService === service.id;
            
            return (
              <div
                key={service.id}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  padding: '32px',
                  border: isSelected ? '2px solid #006FEE' : '2px solid #E5E7EB',
                  boxShadow: isSelected ? '0 12px 32px rgba(0, 111, 238, 0.15)' : '0 4px 16px rgba(0, 0, 0, 0.04)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  transform: isSelected ? 'translateY(-4px)' : 'translateY(0)'
                }}
                onClick={() => setSelectedService(isSelected ? null : service.id)}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.08)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.04)';
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '12px',
                    background: isSelected ? '#006FEE' : 'linear-gradient(135deg, #006FEE 0%, #0050B3 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <IconComponent size={28} color="white" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', margin: 0 }}>
                      {service.title}
                    </h3>
                    <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
                      <span style={{ fontSize: '14px', color: '#6B7280' }}>{service.duration}</span>
                      <span style={{ fontSize: '14px', fontWeight: '600', color: '#006FEE' }}>{service.price}</span>
                    </div>
                  </div>
                </div>

                <p style={{ fontSize: '16px', color: '#6B7280', marginBottom: '20px', lineHeight: '1.6' }}>
                  {service.description}
                </p>

                <div style={{ marginBottom: '24px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>
                    Capabilities:
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: '0', listStyle: 'none' }}>
                    {service.features.map((feature, index) => (
                      <li key={index} style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px', 
                        marginBottom: '8px',
                        fontSize: '14px',
                        color: '#374151'
                      }}>
                        <CheckCircle size={16} color="#10B981" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <button style={{
                  width: '100%',
                  padding: '12px 16px',
                  backgroundColor: isSelected ? '#006FEE' : 'transparent',
                  color: isSelected ? 'white' : '#006FEE',
                  border: `2px solid ${isSelected ? '#006FEE' : '#E5E7EB'}`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}>
                  <Calendar size={16} />
                  Request Quote
                  <ArrowRight size={16} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Manufacturing Capabilities */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '32px',
          border: '2px solid #E5E7EB',
          marginBottom: '48px'
        }}>
          <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#111827', marginBottom: '24px', textAlign: 'center' }}>
            Manufacturing Capabilities
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px'
          }}>
            {capabilities.map((capability, index) => {
              const IconComponent = capability.icon;
              return (
                <div key={index} style={{
                  textAlign: 'center',
                  padding: '24px',
                  backgroundColor: '#F8FAFC',
                  borderRadius: '12px',
                  border: '1px solid #E5E7EB'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #006FEE 0%, #0050B3 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px auto'
                  }}>
                    <IconComponent size={24} color="white" />
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
                    {capability.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '12px' }}>
                    {capability.description}
                  </p>
                  <div>
                    {capability.specs.map((spec, idx) => (
                      <div key={idx} style={{
                        fontSize: '12px',
                        color: '#006FEE',
                        backgroundColor: '#EFF6FF',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        margin: '4px 2px',
                        display: 'inline-block'
                      }}>
                        {spec}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Materials */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '32px',
          border: '2px solid #E5E7EB',
          marginBottom: '48px'
        }}>
          <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#111827', marginBottom: '24px', textAlign: 'center' }}>
            Materials & Specifications
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px'
          }}>
            {materials.map((material, index) => (
              <div key={index} style={{
                padding: '20px',
                backgroundColor: '#F8FAFC',
                borderRadius: '12px',
                border: '1px solid #E5E7EB'
              }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>
                  {material.category}
                </h3>
                <ul style={{ margin: 0, paddingLeft: '0', listStyle: 'none' }}>
                  {material.types.map((type, idx) => (
                    <li key={idx} style={{ 
                      fontSize: '14px', 
                      color: '#374151', 
                      marginBottom: '4px',
                      paddingLeft: '12px',
                      position: 'relative'
                    }}>
                      <span style={{
                        position: 'absolute',
                        left: '0',
                        top: '8px',
                        width: '4px',
                        height: '4px',
                        backgroundColor: '#006FEE',
                        borderRadius: '50%'
                      }}></span>
                      {type}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Project Types */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '32px',
          border: '2px solid #E5E7EB',
          marginBottom: '48px'
        }}>
          <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#111827', marginBottom: '24px' }}>
            Manufacturing Project Types
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '24px'
          }}>
            {projectTypes.map((project, index) => (
              <div key={index} style={{
                padding: '24px',
                backgroundColor: '#F8FAFC',
                borderRadius: '12px',
                border: '1px solid #E5E7EB'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: 0 }}>
                    {project.title}
                  </h3>
                  <span style={{
                    padding: '4px 8px',
                    backgroundColor: project.complexity === 'High' ? '#FEE2E2' : project.complexity === 'Medium' ? '#FEF3C7' : '#E0F2FE',
                    color: project.complexity === 'High' ? '#991B1B' : project.complexity === 'Medium' ? '#92400E' : '#0C4A6E',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}>
                    {project.complexity}
                  </span>
                </div>
                <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '16px' }}>
                  {project.description}
                </p>
                <div style={{ marginBottom: '16px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
                    Examples:
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {project.examples.map((example, idx) => (
                      <span key={idx} style={{
                        fontSize: '12px',
                        color: '#374151',
                        backgroundColor: 'white',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        border: '1px solid #E5E7EB'
                      }}>
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#006FEE' }}>
                    Lead Time: {project.leadTime}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quality Standards */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '32px',
          border: '2px solid #E5E7EB',
          marginBottom: '48px'
        }}>
          <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#111827', marginBottom: '24px', textAlign: 'center' }}>
            Quality Standards & Certifications
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '16px'
          }}>
            {qualityStandards.map((standard, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px',
                backgroundColor: '#F0F9FF',
                borderRadius: '8px',
                border: '1px solid #0EA5E9'
              }}>
                <Award size={20} color="#0EA5E9" />
                <span style={{ fontSize: '14px', fontWeight: '500', color: '#0C4A6E' }}>
                  {standard}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div style={{
          background: 'linear-gradient(135deg, #006FEE 0%, #0050B3 100%)',
          borderRadius: '16px',
          padding: '48px 32px',
          textAlign: 'center',
          color: 'white'
        }}>
          <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '16px' }}>
            Start Your Manufacturing Project
          </h2>
          <p style={{ fontSize: '18px', marginBottom: '32px', opacity: 0.9 }}>
            From prototypes to production runs - we deliver precision manufacturing solutions.
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
              <span>manufacturing@swsteamengineering.co.uk</span>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <Link href="/customer/requirements" style={{
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
              <FileText size={16} />
              Project Specifications
            </Link>
            <Link href="/customer/chat" style={{
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
              <Users size={16} />
              Manufacturing Consultation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}