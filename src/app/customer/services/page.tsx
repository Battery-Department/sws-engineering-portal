'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Train, 
  Cog, 
  Factory, 
  Wrench, 
  ChevronRight, 
  Clock, 
  Users, 
  CheckCircle, 
  Star,
  ArrowRight,
  Award,
  Shield,
  Zap
} from 'lucide-react';

const servicesData = [
  {
    id: 'steam-restoration',
    name: 'Steam Locomotive Restoration',
    shortName: 'Steam Restoration',
    description: 'Complete heritage railway locomotive restoration services',
    detailedDescription: 'Our master craftsmen specialize in the complete restoration of steam locomotives from 7¼" to standard gauge. With over 20 years of experience, we handle everything from boiler overhauls to mechanical rebuilds.',
    icon: Train,
    category: 'Heritage Railways',
    leadTime: '3-12 months',
    capacity: '7¼" to standard gauge',
    features: [
      'Complete boiler inspection & certification',
      'Mechanical overhaul & rebuilds', 
      'Cosmetic restoration to original condition',
      'Parts fabrication & sourcing',
      'Testing & commissioning'
    ],
    expertise: 'Boilers, cylinders, valve gear, wheel sets',
    projectsCompleted: '50+',
    certification: 'Heritage Railway certified',
    popular: true,
    pricing: 'From £15,000',
    caseStudy: 'Recently restored 1920s narrow gauge locomotive for Ffestiniog Railway'
  },
  {
    id: 'cad-design',
    name: '3D CAD Design Services',
    shortName: 'CAD Design',
    description: 'Professional engineering drawings and technical specifications',
    detailedDescription: 'Our design team creates precise 3D models and technical drawings using the latest CAD software. From concept to manufacturing drawings, we deliver engineering excellence.',
    icon: Cog,
    category: 'Engineering Design',
    leadTime: '1-4 weeks',
    capacity: 'SolidWorks & AutoCAD certified',
    features: [
      'Full 3D modeling & assemblies',
      'Technical drawings to BS standards',
      'FEA stress analysis',
      'Manufacturing specifications',
      'As-built documentation'
    ],
    expertise: 'Mechanical design, assemblies, fabrication drawings',
    projectsCompleted: '200+',
    certification: 'BS 8888 compliant',
    popular: false,
    pricing: 'From £75/hour',
    caseStudy: 'Designed complete rolling stock assembly for heritage railway'
  },
  {
    id: 'plant-repair',
    name: 'Plant & Machinery Repair',
    shortName: 'Plant Repair',
    description: 'Industrial equipment maintenance and emergency repair services',
    detailedDescription: 'Our mobile workshop provides comprehensive plant and machinery repair services across Cornwall and the South West. Available 24/7 for emergency breakdowns.',
    icon: Factory,
    category: 'Industrial Services',
    leadTime: 'Same day emergency',
    capacity: 'Mobile workshop & fixed facility',
    features: [
      '24/7 emergency callout service',
      'Preventive maintenance programs',
      'On-site welding & fabrication',
      'Hydraulic system repair',
      'Electrical fault diagnosis'
    ],
    expertise: 'Pumps, motors, gearboxes, hydraulics',
    projectsCompleted: '500+',
    certification: 'ISO 9001 compliant',
    popular: false,
    pricing: 'From £95/hour + parts',
    caseStudy: 'Emergency repair of china clay processing equipment'
  },
  {
    id: 'railway-engineering',
    name: 'Commercial Railway Services',
    shortName: 'Railway Services',
    description: 'Professional railway engineering and infrastructure services',
    detailedDescription: 'Comprehensive railway engineering services including track design, signaling systems, and rolling stock maintenance for commercial and heritage operators.',
    icon: Train,
    category: 'Railway Engineering',
    leadTime: '2-8 weeks',
    capacity: 'Network Rail approved contractors',
    features: [
      'Track design & installation',
      'Rolling stock maintenance',
      'Signal system installation',
      'Infrastructure inspections',
      'Compliance certification'
    ],
    expertise: 'Track work, signaling, rolling stock',
    projectsCompleted: '30+',
    certification: 'Network Rail approved',
    popular: false,
    pricing: 'Project-based quotation',
    caseStudy: 'Complete track renewal for Bodmin & Wenford Railway'
  },
  {
    id: 'bespoke-fabrication',
    name: 'Bespoke Engineering Solutions',
    shortName: 'Bespoke Fabrication',
    description: 'Custom engineering solutions and precision fabrication',
    detailedDescription: 'From concept to completion, we create bespoke engineering solutions for unique requirements. Our workshop combines traditional craftsmanship with modern precision.',
    icon: Wrench,
    category: 'Custom Engineering',
    leadTime: '4-16 weeks',
    capacity: 'Full fabrication workshop',
    features: [
      'Design consultation & concept development',
      'Precision machining & fabrication',
      'Material sourcing & specification',
      'Project management from start to finish',
      'Installation & commissioning support'
    ],
    expertise: 'Custom components, restoration parts, prototype development',
    projectsCompleted: '150+',
    certification: 'BS EN ISO 3834-2 welding standard',
    popular: true,
    pricing: 'Quote on request',
    caseStudy: 'Custom boiler fittings for restored Sentinel steam wagon'
  }
];

export default function ServicesPage() {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const handleServiceInquiry = (serviceId: string) => {
    router.push(`/customer/requirements?service=${serviceId}`);
  };

  const handleGetQuote = () => {
    router.push('/customer/requirements');
  };

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 50%, #60A5FA 100%)',
        color: 'white',
        padding: '64px 24px',
        borderRadius: '0 0 24px 24px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            background: 'rgba(255, 255, 255, 0.15)',
            padding: '8px 20px',
            borderRadius: '100px',
            marginBottom: '24px',
            backdropFilter: 'blur(10px)'
          }}>
            <Train size={20} />
            <span style={{ fontWeight: '600', fontSize: '14px' }}>
              20+ YEARS OF CORNWALL ENGINEERING EXCELLENCE
            </span>
          </div>

          <h1 style={{
            fontSize: '56px',
            fontWeight: '800',
            marginBottom: '24px',
            lineHeight: '1.1'
          }}>
            SOUTH WEST STEAM ENGINEERING
          </h1>

          <p style={{
            fontSize: '24px',
            fontWeight: '400',
            marginBottom: '32px',
            opacity: 0.9,
            maxWidth: '800px',
            margin: '0 auto 32px'
          }}>
            Cornwall's premier heritage railway specialists delivering world-class engineering solutions
            from steam locomotive restoration to precision industrial services
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '32px',
            marginTop: '40px',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle size={24} />
              <span style={{ fontSize: '18px', fontWeight: '500' }}>Heritage Railway Certified</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Shield size={24} />
              <span style={{ fontSize: '18px', fontWeight: '500' }}>Network Rail Approved</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Award size={24} />
              <span style={{ fontSize: '18px', fontWeight: '500' }}>ISO 9001 Compliant</span>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div style={{ padding: '64px 24px', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{
            fontSize: '40px',
            fontWeight: '700',
            color: '#1E3A8A',
            marginBottom: '16px'
          }}>
            Our Engineering Services
          </h2>
          <p style={{
            fontSize: '20px',
            color: '#64748B',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            From heritage steam locomotives to modern industrial equipment,
            we deliver precision engineering solutions across Cornwall and beyond
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '32px',
          marginBottom: '64px'
        }}>
          {servicesData.map(service => {
            const IconComponent = service.icon;
            const isHovered = hoveredCard === service.id;
            
            return (
              <div
                key={service.id}
                style={{
                  position: 'relative',
                  background: 'white',
                  border: '2px solid #E2E8F0',
                  borderRadius: '16px',
                  padding: '32px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
                  boxShadow: isHovered 
                    ? '0 20px 40px rgba(30, 58, 138, 0.15)' 
                    : '0 4px 12px rgba(0, 0, 0, 0.05)'
                }}
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => setSelectedService(service.id)}
              >
                {service.popular && (
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    right: '24px',
                    backgroundColor: '#F59E0B',
                    color: 'white',
                    padding: '6px 16px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
                  }}>
                    <Star size={14} fill="white" />
                    MOST POPULAR
                  </div>
                )}

                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start',
                  marginBottom: '24px' 
                }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontSize: '24px',
                      fontWeight: '700',
                      color: '#1E3A8A',
                      marginBottom: '8px'
                    }}>
                      {service.name}
                    </h3>
                    <p style={{
                      fontSize: '16px',
                      color: '#64748B',
                      marginBottom: '16px',
                      lineHeight: '1.6'
                    }}>
                      {service.detailedDescription}
                    </p>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      marginBottom: '16px'
                    }}>
                      <span style={{
                        fontSize: '20px',
                        fontWeight: '700',
                        color: '#1E3A8A'
                      }}>
                        {service.pricing}
                      </span>
                      <span style={{
                        backgroundColor: '#EFF6FF',
                        color: '#1E3A8A',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>
                        {service.leadTime}
                      </span>
                    </div>
                  </div>
                  
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: '24px'
                  }}>
                    <IconComponent size={40} color="#1E3A8A" />
                  </div>
                </div>

                {/* Features List */}
                <div style={{ marginBottom: '24px' }}>
                  {service.features.slice(0, 3).map((feature, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '8px'
                    }}>
                      <CheckCircle size={16} color="#10B981" />
                      <span style={{ fontSize: '14px', color: '#64748B' }}>{feature}</span>
                    </div>
                  ))}
                  {service.features.length > 3 && (
                    <span style={{ fontSize: '14px', color: '#1E3A8A', fontWeight: '500' }}>
                      +{service.features.length - 3} more features
                    </span>
                  )}
                </div>

                {/* Stats */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px',
                  backgroundColor: '#F8FAFC',
                  borderRadius: '12px',
                  marginBottom: '24px'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '20px', fontWeight: '700', color: '#1E3A8A' }}>
                      {service.projectsCompleted}
                    </div>
                    <div style={{ fontSize: '12px', color: '#64748B' }}>Projects</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '4px' }}>
                      Certified
                    </div>
                    <Zap size={16} color="#F59E0B" />
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleServiceInquiry(service.id);
                    }}
                    style={{
                      flex: 1,
                      padding: '12px 20px',
                      borderRadius: '8px',
                      border: 'none',
                      backgroundColor: '#1E3A8A',
                      color: 'white',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#1E40AF';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#1E3A8A';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    Get Quote
                    <ArrowRight size={16} />
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedService(service.id);
                    }}
                    style={{
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: '2px solid #1E3A8A',
                      backgroundColor: 'white',
                      color: '#1E3A8A',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#EFF6FF';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'white';
                    }}
                  >
                    Details
                  </button>
                </div>

                {/* Case Study */}
                <div style={{
                  marginTop: '16px',
                  padding: '12px',
                  backgroundColor: '#FFFBEB',
                  borderRadius: '8px',
                  border: '1px solid #FED7AA'
                }}>
                  <div style={{ fontSize: '11px', color: '#92400E', fontWeight: '600', marginBottom: '4px' }}>
                    RECENT PROJECT
                  </div>
                  <div style={{ fontSize: '13px', color: '#B45309' }}>
                    {service.caseStudy}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div style={{
          background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
          borderRadius: '20px',
          padding: '48px',
          textAlign: 'center',
          color: 'white'
        }}>
          <h3 style={{
            fontSize: '32px',
            fontWeight: '700',
            marginBottom: '16px'
          }}>
            Ready to Start Your Engineering Project?
          </h3>
          <p style={{
            fontSize: '18px',
            marginBottom: '32px',
            opacity: 0.9
          }}>
            Our expert team is standing by to discuss your requirements and provide a detailed quotation
          </p>
          <button
            onClick={handleGetQuote}
            style={{
              padding: '16px 32px',
              borderRadius: '12px',
              border: 'none',
              backgroundColor: 'white',
              color: '#1E3A8A',
              fontSize: '18px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Start Your Project
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}