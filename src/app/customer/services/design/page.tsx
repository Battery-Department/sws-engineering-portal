'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  PenTool,
  Monitor,
  Layers,
  Box,
  Zap,
  CheckCircle,
  Clock,
  Award,
  ArrowRight,
  Phone,
  Mail,
  Calendar,
  FileText,
  Users,
  Target,
  Settings,
  Cpu,
  Download,
  Upload
} from 'lucide-react';

export default function DesignServicesPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const designServices = [
    {
      id: 'cad-modeling',
      title: '3D CAD Modeling & Design',
      description: 'Professional 3D modeling and design services using industry-leading CAD software',
      features: [
        'SolidWorks and AutoCAD expertise',
        'Parametric and surface modeling',
        'Assembly design and simulation',
        'Technical drawing production',
        'Design validation and optimization'
      ],
      duration: '1-6 weeks',
      price: 'From £1,500',
      icon: Box
    },
    {
      id: 'technical-drawings',
      title: 'Technical Drawing Services',
      description: 'Comprehensive 2D technical drawings and documentation packages',
      features: [
        'Manufacturing drawings to BS standards',
        'Assembly and exploded view drawings',
        'Detailed part specifications',
        'Tolerance and GD&T annotation',
        'As-built documentation'
      ],
      duration: '3-14 days',
      price: 'From £500',
      icon: PenTool
    },
    {
      id: 'reverse-engineering',
      title: 'Reverse Engineering',
      description: 'Creating CAD models and drawings from existing physical components',
      features: [
        '3D scanning and measurement',
        'Legacy component recreation',
        'Material analysis and specification',
        'Obsolete part redesign',
        'Manufacturing drawing creation'
      ],
      duration: '2-8 weeks',
      price: 'From £2,500',
      icon: Target
    },
    {
      id: 'simulation-analysis',
      title: 'FEA & Simulation Analysis',
      description: 'Finite Element Analysis and engineering simulation services',
      features: [
        'Stress and thermal analysis',
        'Vibration and modal analysis',
        'Fluid dynamics simulation',
        'Fatigue and lifecycle prediction',
        'Design optimization recommendations'
      ],
      duration: '1-4 weeks',
      price: 'From £3,000',
      icon: Cpu
    }
  ];

  const software = [
    { name: 'SolidWorks', version: '2024', specialty: '3D Modeling & Simulation' },
    { name: 'AutoCAD', version: '2024', specialty: '2D Technical Drawings' },
    { name: 'Inventor', version: '2024', specialty: 'Mechanical Design' },
    { name: 'ANSYS', version: '2023', specialty: 'FEA & Simulation' },
    { name: 'KeyShot', version: '12', specialty: 'Rendering & Visualization' },
    { name: 'MasterCAM', version: '2024', specialty: 'CAM Programming' }
  ];

  const portfolioProjects = [
    {
      title: 'Heritage Steam Locomotive CAD Model',
      client: 'West Somerset Railway',
      description: 'Complete 3D model recreation of 1920s steam locomotive from original drawings',
      deliverables: ['Full 3D assembly model', 'Manufacturing drawings', 'Material specifications'],
      software: 'SolidWorks, AutoCAD',
      duration: '8 weeks',
      complexity: 'High'
    },
    {
      title: 'Industrial Conveyor System Design',
      client: 'Cornwall Mining Ltd',
      description: 'Custom conveyor system design with integrated safety and control systems',
      deliverables: ['3D system layout', 'Electrical schematics', 'Installation drawings'],
      software: 'SolidWorks, AutoCAD Electrical',
      duration: '4 weeks',
      complexity: 'Medium'
    },
    {
      title: 'Pressure Vessel Stress Analysis',
      client: 'Chemical Processing Co.',
      description: 'FEA analysis of custom pressure vessel design for high-temperature application',
      deliverables: ['Stress analysis report', 'Safety factor calculations', 'Design recommendations'],
      software: 'ANSYS, SolidWorks Simulation',
      duration: '2 weeks',
      complexity: 'High'
    }
  ];

  const designProcess = [
    {
      step: 1,
      title: 'Project Brief & Requirements',
      description: 'Detailed consultation to understand project specifications and constraints',
      duration: '1-2 days'
    },
    {
      step: 2,
      title: 'Concept Development',
      description: 'Initial design concepts and feasibility studies with client review',
      duration: '3-5 days'
    },
    {
      step: 3,
      title: 'Detailed Design',
      description: '3D modeling, technical drawings, and specification development',
      duration: '1-4 weeks'
    },
    {
      step: 4,
      title: 'Review & Validation',
      description: 'Design review, simulation analysis, and client approval process',
      duration: '3-7 days'
    },
    {
      step: 5,
      title: 'Documentation Delivery',
      description: 'Final CAD files, drawings, and comprehensive documentation package',
      duration: '2-3 days'
    }
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
            <Box size={36} color="white" />
          </div>
          <h1 style={{ fontSize: '40px', fontWeight: '800', color: '#111827', margin: '0 0 16px 0' }}>
            CAD Design & Engineering Services
          </h1>
          <p style={{ fontSize: '20px', color: '#6B7280', marginBottom: '24px', lineHeight: '1.6' }}>
            Professional 3D CAD modeling, technical drawings, and engineering design services 
            for heritage railway, industrial, and bespoke engineering applications.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981' }}>
              <Award size={20} />
              <span style={{ fontWeight: '600' }}>Professional Engineers</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981' }}>
              <Monitor size={20} />
              <span style={{ fontWeight: '600' }}>Latest CAD Software</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981' }}>
              <Clock size={20} />
              <span style={{ fontWeight: '600' }}>Rapid Turnaround</span>
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
          {designServices.map((service) => {
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
                    Key Services:
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

        {/* Design Process */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '32px',
          border: '2px solid #E5E7EB',
          marginBottom: '48px'
        }}>
          <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#111827', marginBottom: '24px', textAlign: 'center' }}>
            Our Design Process
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px'
          }}>
            {designProcess.map((process, index) => (
              <div key={index} style={{
                textAlign: 'center',
                padding: '24px 16px',
                backgroundColor: '#F8FAFC',
                borderRadius: '12px',
                border: '1px solid #E5E7EB',
                position: 'relative'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #006FEE 0%, #0050B3 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px auto',
                  fontSize: '20px',
                  fontWeight: '700',
                  color: 'white'
                }}>
                  {process.step}
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
                  {process.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '12px' }}>
                  {process.description}
                </p>
                <div style={{
                  fontSize: '12px',
                  fontWeight: '500',
                  color: '#006FEE',
                  backgroundColor: '#EFF6FF',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  display: 'inline-block'
                }}>
                  {process.duration}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Software Capabilities */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '32px',
          border: '2px solid #E5E7EB',
          marginBottom: '48px'
        }}>
          <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#111827', marginBottom: '24px', textAlign: 'center' }}>
            CAD Software Expertise
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '16px'
          }}>
            {software.map((soft, index) => (
              <div key={index} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px',
                backgroundColor: '#F0F9FF',
                borderRadius: '8px',
                border: '1px solid #0EA5E9'
              }}>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: '600', color: '#0C4A6E' }}>
                    {soft.name}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6B7280' }}>
                    {soft.specialty}
                  </div>
                </div>
                <div style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#0EA5E9',
                  backgroundColor: 'white',
                  padding: '4px 8px',
                  borderRadius: '4px'
                }}>
                  {soft.version}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Portfolio Projects */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '32px',
          border: '2px solid #E5E7EB',
          marginBottom: '48px'
        }}>
          <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#111827', marginBottom: '24px' }}>
            Design Portfolio
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '24px'
          }}>
            {portfolioProjects.map((project, index) => (
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
                    backgroundColor: project.complexity === 'High' ? '#FEE2E2' : '#E0F2FE',
                    color: project.complexity === 'High' ? '#991B1B' : '#0C4A6E',
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
                    Deliverables:
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: '16px' }}>
                    {project.deliverables.map((deliverable, idx) => (
                      <li key={idx} style={{ fontSize: '14px', color: '#374151', marginBottom: '4px' }}>
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '12px', color: '#6B7280' }}>{project.software}</div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#006FEE' }}>{project.duration}</div>
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                    {project.client}
                  </div>
                </div>
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
            Start Your Design Project
          </h2>
          <p style={{ fontSize: '18px', marginBottom: '32px', opacity: 0.9 }}>
            Professional CAD design services with rapid turnaround and competitive pricing.
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
              <span>design@swsteamengineering.co.uk</span>
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
              <Upload size={16} />
              Upload Drawings
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
              Design Consultation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}