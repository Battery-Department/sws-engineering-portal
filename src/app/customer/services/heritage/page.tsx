'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Train,
  Award,
  Clock,
  Shield,
  Users,
  Star,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Calendar,
  FileText,
  Camera,
  Settings,
  Wrench,
  Target,
  Zap
} from 'lucide-react';

export default function HeritageServicesPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const heritageServices = [
    {
      id: 'locomotive-restoration',
      title: 'Steam Locomotive Restoration',
      description: 'Complete restoration of heritage steam locomotives to operational condition',
      features: [
        'Boiler inspection and certification',
        'Fire tube replacement and repair',
        'Precision machining of original components',
        'Heritage-compliant materials and methods',
        'Full documentation and certification'
      ],
      duration: '3-12 months',
      price: 'From £25,000',
      icon: Train
    },
    {
      id: 'rolling-stock',
      title: 'Rolling Stock Restoration',
      description: 'Restoration of heritage carriages, wagons, and specialized railway vehicles',
      features: [
        'Structural assessment and repair',
        'Original livery recreation',
        'Interior restoration to period standards',
        'Safety system upgrades',
        'Heritage railway compliance'
      ],
      duration: '2-8 months',
      price: 'From £15,000',
      icon: Settings
    },
    {
      id: 'signal-equipment',
      title: 'Signal Box & Equipment',
      description: 'Restoration of signal boxes, mechanical signaling, and control equipment',
      features: [
        'Mechanical lever frame restoration',
        'Signal post refurbishment',
        'Interlocking system repair',
        'Period-accurate paint schemes',
        'Operational testing and certification'
      ],
      duration: '1-6 months',
      price: 'From £8,000',
      icon: Target
    },
    {
      id: 'track-infrastructure',
      title: 'Track & Infrastructure',
      description: 'Heritage railway track work and infrastructure restoration',
      features: [
        'Track laying and alignment',
        'Points and crossing installation',
        'Platform restoration',
        'Bridge and culvert repair',
        'Drainage system installation'
      ],
      duration: '2-12 months',
      price: 'From £20,000',
      icon: Wrench
    }
  ];

  const certifications = [
    'Railway Heritage Trust Approved',
    'Heritage Railway Association Member',
    'BS 1113 Design & Construction Certified',
    'ASME Boiler Code Section I Compliant',
    'ISO 9001:2015 Quality Management'
  ];

  const projects = [
    {
      name: 'GWR 4900 Hall Class Restoration',
      client: 'Didcot Railway Centre',
      year: '2024',
      description: 'Complete boiler restoration including fire tube replacement and smokebox refurbishment.',
      status: 'Recently Completed'
    },
    {
      name: 'Victorian Signal Box Restoration',
      client: 'West Somerset Railway',
      year: '2023',
      description: 'Full restoration of 1890s mechanical signal box including lever frame and signaling equipment.',
      status: 'Operational'
    },
    {
      name: 'LMS Black Five Locomotive',
      client: 'Private Collector',
      year: '2023',
      description: 'Comprehensive restoration to main line running condition with modern safety systems.',
      status: 'In Service'
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
            <Train size={36} color="white" />
          </div>
          <h1 style={{ fontSize: '40px', fontWeight: '800', color: '#111827', margin: '0 0 16px 0' }}>
            Heritage Railway Services
          </h1>
          <p style={{ fontSize: '20px', color: '#6B7280', marginBottom: '24px', lineHeight: '1.6' }}>
            Specializing in authentic restoration of steam locomotives, rolling stock, and railway infrastructure 
            to preserve Britain's railway heritage for future generations.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981' }}>
              <Award size={20} />
              <span style={{ fontWeight: '600' }}>Heritage Trust Approved</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981' }}>
              <Clock size={20} />
              <span style={{ fontWeight: '600' }}>35+ Years Experience</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981' }}>
              <Shield size={20} />
              <span style={{ fontWeight: '600' }}>Fully Certified</span>
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
          {heritageServices.map((service) => {
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

        {/* Recent Projects */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '32px',
          border: '2px solid #E5E7EB',
          marginBottom: '48px'
        }}>
          <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#111827', marginBottom: '24px' }}>
            Recent Heritage Projects
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            {projects.map((project, index) => (
              <div key={index} style={{
                padding: '24px',
                backgroundColor: '#F8FAFC',
                borderRadius: '12px',
                border: '1px solid #E5E7EB'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: 0 }}>
                    {project.name}
                  </h3>
                  <span style={{
                    padding: '4px 8px',
                    backgroundColor: '#D1FAE5',
                    color: '#065F46',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}>
                    {project.status}
                  </span>
                </div>
                <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '12px' }}>
                  {project.description}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', fontWeight: '500', color: '#006FEE' }}>
                    {project.client}
                  </span>
                  <span style={{ fontSize: '12px', color: '#6B7280' }}>
                    {project.year}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '32px',
          border: '2px solid #E5E7EB',
          marginBottom: '48px'
        }}>
          <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#111827', marginBottom: '24px', textAlign: 'center' }}>
            Heritage Railway Certifications
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '16px'
          }}>
            {certifications.map((cert, index) => (
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
                  {cert}
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
            Start Your Heritage Project Today
          </h2>
          <p style={{ fontSize: '18px', marginBottom: '32px', opacity: 0.9 }}>
            Contact our heritage railway specialists for a consultation and detailed project quote.
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
              <span>heritage@swsteamengineering.co.uk</span>
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
              Project Requirements
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
              Speak to Expert
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}