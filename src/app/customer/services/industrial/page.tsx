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
  Gauge,
  Truck,
  Package
} from 'lucide-react';

export default function IndustrialServicesPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const industrialServices = [
    {
      id: 'machinery-repair',
      title: 'Heavy Machinery Repair',
      description: 'Comprehensive repair and refurbishment of industrial machinery and plant equipment',
      features: [
        'Gearbox rebuilds and overhauls',
        'Precision machining and welding',
        'Bearing and seal replacement',
        'Performance testing and certification',
        'Emergency breakdown support'
      ],
      duration: '1-8 weeks',
      price: 'From £5,000',
      icon: Cog
    },
    {
      id: 'conveyor-systems',
      title: 'Conveyor System Services',
      description: 'Complete conveyor system installation, maintenance, and upgrade services',
      features: [
        'Belt conveyor installation',
        'Drive system optimization',
        'Safety system upgrades',
        'Preventive maintenance programs',
        'Emergency repair services'
      ],
      duration: '2-12 weeks',
      price: 'From £8,000',
      icon: Truck
    },
    {
      id: 'fabrication',
      title: 'Custom Fabrication',
      description: 'Bespoke engineering fabrication for industrial applications and plant modifications',
      features: [
        'Structural steelwork fabrication',
        'Pressure vessel construction',
        'Plant modification projects',
        'Custom machinery design',
        'Installation and commissioning'
      ],
      duration: '3-16 weeks',
      price: 'From £12,000',
      icon: Settings
    },
    {
      id: 'plant-maintenance',
      title: 'Plant Maintenance',
      description: 'Comprehensive plant maintenance and reliability engineering services',
      features: [
        'Planned maintenance programs',
        'Condition monitoring systems',
        'Reliability analysis and improvement',
        'Spare parts management',
        '24/7 emergency call-out'
      ],
      duration: 'Ongoing contracts',
      price: 'From £2,500/month',
      icon: Gauge
    }
  ];

  const industries = [
    { name: 'Mining & Quarrying', projects: 45 },
    { name: 'Food Processing', projects: 32 },
    { name: 'Chemical & Pharmaceutical', projects: 28 },
    { name: 'Manufacturing', projects: 67 },
    { name: 'Power Generation', projects: 23 },
    { name: 'Water Treatment', projects: 19 }
  ];

  const capabilities = [
    {
      title: 'Emergency Response',
      description: '24/7 emergency breakdown support with rapid deployment',
      icon: Zap,
      metric: '< 4 hours'
    },
    {
      title: 'Precision Machining',
      description: 'In-house CNC machining capabilities up to 5m capacity',
      icon: Target,
      metric: '±0.005mm'
    },
    {
      title: 'Heavy Lifting',
      description: 'Mobile crane services and specialized rigging equipment',
      icon: Factory,
      metric: '50 tonnes'
    },
    {
      title: 'Quality Assurance',
      description: 'ISO 9001:2015 certified with full traceability',
      icon: Award,
      metric: '100% tested'
    }
  ];

  const caseStudies = [
    {
      title: 'Mining Conveyor Gearbox Rebuild',
      client: 'Cornwall Clay Industries',
      challenge: 'Critical conveyor failure causing production halt',
      solution: 'Complete gearbox rebuild with upgraded bearings and seals',
      result: '99.8% uptime achieved, reduced maintenance costs by 40%',
      duration: '3 weeks',
      value: '£18,500'
    },
    {
      title: 'Food Processing Line Upgrade',
      client: 'West Country Dairy Co.',
      challenge: 'Aging production line requiring modernization',
      solution: 'Custom automation and safety system integration',
      result: '25% increase in throughput, full HACCP compliance',
      duration: '6 weeks',
      value: '£65,000'
    },
    {
      title: 'Chemical Plant Emergency Repair',
      client: 'Confidential Client',
      challenge: 'Emergency reactor vessel repair during shutdown',
      solution: 'Precision welding and pressure testing under tight deadline',
      result: 'Shutdown reduced by 5 days, saving £200k in lost production',
      duration: '72 hours',
      value: '£32,000'
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
            <Factory size={36} color="white" />
          </div>
          <h1 style={{ fontSize: '40px', fontWeight: '800', color: '#111827', margin: '0 0 16px 0' }}>
            Industrial Engineering Services
          </h1>
          <p style={{ fontSize: '20px', color: '#6B7280', marginBottom: '24px', lineHeight: '1.6' }}>
            Comprehensive industrial engineering solutions including heavy machinery repair, custom fabrication, 
            and plant maintenance for manufacturing and process industries across the UK.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981' }}>
              <Zap size={20} />
              <span style={{ fontWeight: '600' }}>24/7 Emergency Support</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981' }}>
              <Clock size={20} />
              <span style={{ fontWeight: '600' }}>Rapid Response</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981' }}>
              <Shield size={20} />
              <span style={{ fontWeight: '600' }}>ISO 9001 Certified</span>
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
          {industrialServices.map((service) => {
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
                  Emergency Quote
                  <ArrowRight size={16} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Capabilities */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '32px',
          border: '2px solid #E5E7EB',
          marginBottom: '48px'
        }}>
          <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#111827', marginBottom: '24px', textAlign: 'center' }}>
            Industrial Capabilities
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
                  <div style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: '#006FEE'
                  }}>
                    {capability.metric}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Industries Served */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '32px',
          border: '2px solid #E5E7EB',
          marginBottom: '48px'
        }}>
          <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#111827', marginBottom: '24px', textAlign: 'center' }}>
            Industries Served
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px'
          }}>
            {industries.map((industry, index) => (
              <div key={index} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px',
                backgroundColor: '#F0F9FF',
                borderRadius: '8px',
                border: '1px solid #0EA5E9'
              }}>
                <span style={{ fontSize: '14px', fontWeight: '500', color: '#0C4A6E' }}>
                  {industry.name}
                </span>
                <span style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#0EA5E9',
                  backgroundColor: 'white',
                  padding: '4px 8px',
                  borderRadius: '4px'
                }}>
                  {industry.projects} projects
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Case Studies */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '32px',
          border: '2px solid #E5E7EB',
          marginBottom: '48px'
        }}>
          <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#111827', marginBottom: '24px' }}>
            Industrial Case Studies
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '24px'
          }}>
            {caseStudies.map((study, index) => (
              <div key={index} style={{
                padding: '24px',
                backgroundColor: '#F8FAFC',
                borderRadius: '12px',
                border: '1px solid #E5E7EB'
              }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>
                  {study.title}
                </h3>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '14px', color: '#6B7280', marginBottom: '8px' }}>
                    <strong>Challenge:</strong> {study.challenge}
                  </div>
                  <div style={{ fontSize: '14px', color: '#6B7280', marginBottom: '8px' }}>
                    <strong>Solution:</strong> {study.solution}
                  </div>
                  <div style={{ fontSize: '14px', color: '#10B981', marginBottom: '8px' }}>
                    <strong>Result:</strong> {study.result}
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '12px', color: '#6B7280' }}>{study.duration}</div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#006FEE' }}>{study.value}</div>
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                    {study.client}
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
            Emergency Industrial Support
          </h2>
          <p style={{ fontSize: '18px', marginBottom: '32px', opacity: 0.9 }}>
            24/7 emergency breakdown support with rapid deployment across the UK.
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
              <span>emergency@swsteamengineering.co.uk</span>
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
              <Zap size={16} />
              Emergency Request
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
              Technical Consultation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}