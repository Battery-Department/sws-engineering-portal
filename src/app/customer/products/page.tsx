'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ShoppingCart, X, CreditCard, FileText, ChevronRight, Truck, Clock, Shield, Star, Users, 
  BarChart, Battery, Activity, Zap, Package, Plus, Minus, CheckCircle, Trash2, Gift,
  Award, AlertCircle
} from 'lucide-react';

// Force dynamic rendering with no cache
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

const servicesData = [
  {
    id: 'steam',
    name: 'Steam Locomotive Restoration',
    description: 'Full restoration services for heritage railway locomotives',
    capacity: '7/14" gauge specialists',
    pricing: 'Project-based',
    leadTime: 'From 3 months',
    category: "Heritage Railways",
    features: "Complete mechanical & cosmetic restoration",
    portfolio: '50+ locomotives restored',
    timeline: '3-12 months typical',
    expertise: 'Boilers, cylinders, valve gear',
    popular: true
  },
  {
    id: 'cad',
    name: '3D CAD Design Services',
    description: 'Professional engineering drawings and specifications',
    capacity: 'SolidWorks & AutoCAD',
    pricing: 'Hourly or fixed',
    leadTime: 'From 1 week',
    category: "Engineering Design",
    features: "Full 3D models, technical drawings, FEA analysis",
    portfolio: '200+ projects completed',
    timeline: '1-4 weeks typical',
    expertise: 'Mechanical design, assemblies',
    popular: false
  },
  {
    id: 'repair',
    name: 'Plant & Machinery Repair',
    description: 'Industrial equipment maintenance and repair',
    capacity: 'On-site & workshop',
    pricing: 'Hourly + parts',
    leadTime: 'Emergency available',
    category: "Industrial Services",
    features: "24/7 emergency callout, preventive maintenance",
    portfolio: '100+ industrial clients',
    timeline: 'Same day emergency',
    expertise: 'Pumps, motors, gearboxes',
    popular: false
  }
];

const discountTiers = [
  { threshold: 1000, percentage: 10 },
  { threshold: 2500, percentage: 15 },
  { threshold: 5000, percentage: 20 }
];

const engineeringPackages = [
  {
    id: 'heritage',
    name: "HERITAGE RAILWAY PACKAGE",
    scope: "Complete restoration",
    details: ["Mechanical overhaul", "Boiler inspection", "Cosmetic restoration"],
    pricing: "From £15,000",
    timeline: "6-12 months",
    includesCAD: true,
    description: "Full restoration service for heritage locomotives",
    completedProjects: 47,
    isPopular: false,
    features: [
      "Complete mechanical rebuild",
      "Certification included",
      "12-month warranty"
    ],
    services: ['steam', 'cad']
  },
  {
    id: 'industrial',
    name: "INDUSTRIAL MAINTENANCE",
    scope: "Annual contract",
    details: ["Monthly inspections", "Emergency callout", "Spare parts inventory"],
    pricing: "From £5,000/year",
    timeline: "12-month contract",
    includesCAD: false,
    description: "Comprehensive maintenance package for industrial clients",
    completedProjects: 86,
    isPopular: true,
    features: [
      "24/7 emergency support",
      "Preventive maintenance",
      "Priority service"
    ],
    services: ['repair']
  },
  {
    id: 'bespoke',
    name: "BESPOKE FABRICATION",
    scope: "Custom projects",
    details: ["Design consultation", "CAD modeling", "Manufacturing", "Installation"],
    pricing: "Quote on request",
    timeline: "4-16 weeks",
    includesCAD: true,
    description: "Custom engineering solutions for unique requirements",
    completedProjects: 42,
    isPopular: false,
    features: [
      "Full project management",
      "3D CAD included",
      "Installation support"
    ],
    services: ['cad', 'steam', 'repair']
  }
];

export default function ProductsPage() {
  const router = useRouter();
  const [quantities, setQuantities] = useState<{[key: string]: number}>({
    '6Ah': 0,
    '9Ah': 0,
    '15Ah': 0
  });
  const [showCartDetails, setShowCartDetails] = useState(true);
  const [activeTab, setActiveTab] = useState('batteries');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {};
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate totals
  const subtotal = Object.entries(quantities).reduce((sum, [battery, qty]) => {
    const serviceData = servicesData.find(s => s.id === service);
    return sum + (batteryData ? batteryData.price * qty : 0);
  }, 0);

  // Calculate discount
  let discountPercentage = 0;
  for (const tier of discountTiers.reverse()) {
    if (subtotal >= tier.threshold) {
      discountPercentage = tier.percentage;
      break;
    }
  }
  discountTiers.reverse(); // Reset order

  const discountAmount = subtotal * (discountPercentage / 100);
  const total = subtotal - discountAmount;
  const totalItems = Object.values(quantities).reduce((sum, qty) => sum + qty, 0);

  const updateQuantity = (battery: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [battery]: Math.max(0, prev[battery] + delta)
    }));
  };

  const addPackageToCart = (packageQuantities: { [key: string]: number }) => {
    setQuantities(prev => ({
      '6Ah': prev['6Ah'] + (packageQuantities['6Ah'] || 0),
      '9Ah': prev['9Ah'] + (packageQuantities['9Ah'] || 0),
      '15Ah': prev['15Ah'] + (packageQuantities['15Ah'] || 0)
    }));
    setShowCartDetails(true);
  };

  const clearCart = () => {
    setQuantities({ '6Ah': 0, '9Ah': 0, '15Ah': 0 });
  };

  const handleCheckout = () => {
    const orderData = {
      items: quantities,
      subtotal,
      discount: discountAmount,
      total,
      discountPercentage
    };
    sessionStorage.setItem('orderData', JSON.stringify(orderData));
    router.push('/customer/payment');
  };

  const handleInvoice = () => {
    const orderData = {
      items: quantities,
      subtotal,
      discount: discountAmount,
      total,
      discountPercentage
    };
    sessionStorage.setItem('orderData', JSON.stringify(orderData));
    router.push('/customer/invoice');
  };

  const handleMouseEnter = (cardId: string) => {
    setHoveredCard(cardId);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
      {/* Header Section */}
      <div style={{
        background: 'linear-gradient(135deg, #0048AC 0%, #006FEE 50%, #0084FF 100%)',
        color: 'white',
        padding: '48px 24px',
        borderRadius: '0 0 24px 24px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)
          `,
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
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
            <Package size={20} />
            <span style={{ fontWeight: '600', fontSize: '14px' }}>
              BULK SAVINGS: 20% OFF BULK ORDERS
            </span>
          </div>

          <h1 style={{
            fontSize: '48px',
            fontWeight: '800',
            marginBottom: '16px',
            lineHeight: '1.1'
          }}>
            HEAVY-DUTY FLEXVOLT BATTERIES
          </h1>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '32px',
            marginTop: '32px',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle size={20} />
              <span>WORKS WITH ALL YOUR DEWALT 20V/60V TOOLS</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Truck size={20} />
              <span>UPS SHIPPING</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Shield size={20} />
              <span>ZERO-HASSLE REPLACEMENTS - NO QUESTIONS ASKED</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: '32px 24px', maxWidth: '1400px', margin: '0 auto' }}>
        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '32px',
          padding: '8px',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
        }}>
          <button
            onClick={() => setActiveTab('batteries')}
            style={{
              flex: 1,
              padding: '16px 24px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: activeTab === 'batteries' ? '#006FEE' : 'transparent',
              color: activeTab === 'batteries' ? 'white' : '#5B6B7D',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
            onMouseEnter={(e) => {
              if (activeTab !== 'batteries') {
                e.currentTarget.style.backgroundColor = '#F0F9FF';
                e.currentTarget.style.color = '#006FEE';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== 'batteries') {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#5B6B7D';
              }
            }}
          >
            <Battery size={20} />
            Individual Batteries
          </button>
          <button
            onClick={() => setActiveTab('packages')}
            style={{
              flex: 1,
              padding: '16px 24px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: activeTab === 'packages' ? '#006FEE' : 'transparent',
              color: activeTab === 'packages' ? 'white' : '#5B6B7D',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              if (activeTab !== 'packages') {
                e.currentTarget.style.backgroundColor = '#F0F9FF';
                e.currentTarget.style.color = '#006FEE';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== 'packages') {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#5B6B7D';
              }
            }}
          >
            <Package size={20} />
            Complete Jobsite Packages
            <span style={{
              position: 'absolute',
              top: '8px',
              right: '16px',
              backgroundColor: '#10B981',
              color: 'white',
              fontSize: '11px',
              fontWeight: '700',
              padding: '2px 8px',
              borderRadius: '12px'
            }}>
              Recommended
            </span>
          </button>
        </div>

        {/* Individual Batteries Tab */}
        {activeTab === 'batteries' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
            gap: '24px',
            marginBottom: '32px'
          }}>
            {servicesData.map(service => (
              <div
                key={battery.id}
                style={{
                  position: 'relative',
                  background: 'white',
                  border: '2px solid #E6F4FF',
                  borderRadius: '16px',
                  padding: '28px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  transform: hoveredCard === battery.id ? 'translateY(-4px)' : 'translateY(0)',
                  boxShadow: hoveredCard === battery.id 
                    ? '0 12px 24px rgba(0, 111, 238, 0.15)' 
                    : '0 4px 12px rgba(0, 0, 0, 0.04)'
                }}
                onMouseEnter={() => handleMouseEnter(battery.id)}
                onMouseLeave={handleMouseLeave}
              >
                {battery.popular && (
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    right: '24px',
                    backgroundColor: '#FFB800',
                    color: 'white',
                    padding: '6px 16px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    boxShadow: '0 2px 8px rgba(255, 184, 0, 0.3)'
                  }}>
                    <Star size={14} fill="white" />
                    MOST POPULAR
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '20px' }}>
                  <div>
                    <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#0A051E', marginBottom: '8px' }}>
                      {battery.name}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '32px', fontWeight: '800', color: '#006FEE' }}>
                        ${battery.price}
                      </span>
                      <span style={{ fontSize: '18px', color: '#9CA3AF', textDecoration: 'line-through' }}>
                        ${battery.msrp}
                      </span>
                      <span style={{
                        backgroundColor: '#E6F9F0',
                        color: '#059669',
                        padding: '4px 10px',
                        borderRadius: '16px',
                        fontSize: '13px',
                        fontWeight: '600'
                      }}>
                        Save {battery.savings}%
                      </span>
                    </div>
                  </div>
                  <div style={{
                    width: '72px',
                    height: '72px',
                    background: 'linear-gradient(135deg, #E6F4FF 0%, #F0F9FF 100%)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Battery size={40} color="#006FEE" />
                  </div>
                </div>

                <div style={{ marginBottom: '20px', fontSize: '15px', color: '#5B6B7D' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <CheckCircle size={16} color="#10B981" />
                    <span>{battery.features}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <Clock size={16} color="#5B6B7D" />
                    <span>Runtime: {battery.runtime} of continuous operation</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <Zap size={16} color="#5B6B7D" />
                    <span>Charge Time: Full charge in {battery.chargingTime}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Activity size={16} color="#5B6B7D" />
                    <span>Perfect for: {battery.workOutput}</span>
                  </div>
                </div>

                <div style={{ 
                  borderTop: '1px solid #E6F4FF', 
                  paddingTop: '20px',
                  marginTop: '20px'
                }}>
                  {/* Quick add buttons */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '8px',
                    marginBottom: '16px'
                  }}>
                    {[5, 10, 25].map(qty => (
                      <button
                        key={qty}
                        onClick={(e) => {
                          e.stopPropagation();
                          updateQuantity(battery.id, qty);
                        }}
                        style={{
                          padding: '10px',
                          border: '1px solid #E6F4FF',
                          borderRadius: '8px',
                          backgroundColor: 'white',
                          color: '#006FEE',
                          fontSize: '14px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#F0F9FF';
                          e.currentTarget.style.borderColor = '#006FEE';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'white';
                          e.currentTarget.style.borderColor = '#E6F4FF';
                        }}
                      >
                        +{qty} units
                      </button>
                    ))}
                  </div>

                  {/* Custom quantity controls */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updateQuantity(battery.id, -1);
                      }}
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '8px',
                        border: '1px solid #E6F4FF',
                        backgroundColor: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#FFE6E6';
                        e.currentTarget.style.borderColor = '#EF4444';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'white';
                        e.currentTarget.style.borderColor = '#E6F4FF';
                      }}
                    >
                      <Minus size={18} color="#5B6B7D" />
                    </button>
                    
                    <div style={{
                      flex: 1,
                      textAlign: 'center',
                      padding: '10px',
                      backgroundColor: '#F8FAFC',
                      borderRadius: '8px',
                      fontSize: '18px',
                      fontWeight: '600',
                      color: '#0A051E'
                    }}>
                      {quantities[battery.id] || 0} units
                    </div>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updateQuantity(battery.id, 1);
                      }}
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '8px',
                        border: '1px solid #E6F4FF',
                        backgroundColor: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#E6FFF9';
                        e.currentTarget.style.borderColor = '#10B981';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'white';
                        e.currentTarget.style.borderColor = '#E6F4FF';
                      }}
                    >
                      <Plus size={18} color="#5B6B7D" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bundle Packages Tab */}
        {activeTab === 'packages' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
            gap: '24px',
            marginBottom: '32px'
          }}>
            {engineeringPackages.map(pkg => (
              <div
                key={pkg.id}
                style={{
                  position: 'relative',
                  background: 'white',
                  border: '2px solid #E6F4FF',
                  borderRadius: '16px',
                  padding: '28px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  transform: hoveredCard === pkg.id ? 'translateY(-4px)' : 'translateY(0)',
                  boxShadow: hoveredCard === pkg.id 
                    ? '0 12px 24px rgba(0, 111, 238, 0.15)' 
                    : '0 4px 12px rgba(0, 0, 0, 0.04)'
                }}
                onMouseEnter={() => handleMouseEnter(pkg.id)}
                onMouseLeave={handleMouseLeave}
              >
                {pkg.isPopular && (
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    right: '24px',
                    backgroundColor: '#10B981',
                    color: 'white',
                    padding: '6px 16px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)'
                  }}>
                    <Award size={14} fill="white" />
                    BEST VALUE
                  </div>
                )}

                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#0A051E', marginBottom: '4px' }}>
                    {pkg.name}
                  </h3>
                  <p style={{ fontSize: '15px', color: '#5B6B7D', marginBottom: '16px' }}>
                    {pkg.teamSize}
                  </p>
                  
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '36px', fontWeight: '800', color: '#006FEE' }}>
                      ${pkg.price.toLocaleString()}
                    </span>
                    <span style={{ fontSize: '20px', color: '#9CA3AF', textDecoration: 'line-through' }}>
                      ${pkg.msrp.toLocaleString()}
                    </span>
                  </div>
                  
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: '#E6F9F0',
                    color: '#059669',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    <Gift size={16} />
                    Save ${pkg.savings.toLocaleString()}
                  </div>
                </div>

                <div style={{
                  backgroundColor: '#F8FAFC',
                  borderRadius: '12px',
                  padding: '16px',
                  marginBottom: '20px'
                }}>
                  <p style={{ fontSize: '14px', fontWeight: '600', color: '#0A051E', marginBottom: '12px' }}>
                    Package includes:
                  </p>
                  {pkg.details.map((detail, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '6px',
                      fontSize: '14px',
                      color: '#5B6B7D'
                    }}>
                      <CheckCircle size={16} color="#10B981" />
                      <span>{detail}</span>
                    </div>
                  ))}
                  <div style={{
                    marginTop: '12px',
                    paddingTop: '12px',
                    borderTop: '1px solid #E6F4FF',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#006FEE'
                  }}>
                    <Clock size={16} />
                    <span>{pkg.hours} hours total runtime</span>
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  {pkg.features.map((feature, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '8px',
                      fontSize: '14px',
                      color: '#5B6B7D'
                    }}>
                      <CheckCircle size={16} color="#10B981" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '16px',
                  paddingBottom: '16px',
                  borderBottom: '1px solid #E6F4FF'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Users size={16} color="#5B6B7D" />
                    <span style={{ fontSize: '14px', color: '#5B6B7D' }}>
                      {pkg.purchases} purchased this month
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star key={star} size={14} fill="#FFB800" color="#FFB800" />
                    ))}
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addPackageToCart(pkg.quantities);
                  }}
                  style={{
                    width: '100%',
                    padding: '14px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: '#006FEE',
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#0059D1';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#006FEE';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Plus size={18} />
                  Add Package to Cart
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Cart Summary Section */}
        {totalItems > 0 && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '28px',
            border: '1px solid #E6F4FF',
            boxShadow: '0 4px 12px rgba(0, 111, 238, 0.04)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#0A051E' }}>
                Your Order
              </h2>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => setShowCartDetails(!showCartDetails)}
                  style={{
                    color: '#006FEE',
                    fontSize: '14px',
                    fontWeight: '600',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'color 0.2s ease'
                  }}
                >
                  {showCartDetails ? 'Hide Details' : 'Show Details'}
                </button>
                <button
                  onClick={clearCart}
                  style={{
                    color: '#EF4444',
                    fontSize: '14px',
                    fontWeight: '600',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'color 0.2s ease'
                  }}
                >
                  Clear All
                </button>
              </div>
            </div>

            {/* Cart items */}
            {showCartDetails && (
              <div style={{ marginBottom: '24px' }}>
                {Object.entries(quantities).map(([batteryId, qty]) => {
                  if (qty === 0) return null;
                  const service = servicesData.find(s => s.id === serviceId);
                  if (!battery) return null;
                  
                  return (
                    <div
                      key={batteryId}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '16px 0',
                        borderBottom: '1px solid #F3F4F6'
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <p style={{ fontWeight: '600', color: '#0A051E', fontSize: '16px' }}>
                          {battery.name}
                        </p>
                        <p style={{ fontSize: '14px', color: '#5B6B7D', marginTop: '4px' }}>
                          ${battery.price} × {qty} = ${(battery.price * qty).toFixed(2)}
                        </p>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <button
                            onClick={() => updateQuantity(batteryId, -1)}
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '6px',
                              border: '1px solid #E6F4FF',
                              backgroundColor: 'white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#FFE6E6';
                              e.currentTarget.style.borderColor = '#EF4444';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'white';
                              e.currentTarget.style.borderColor = '#E6F4FF';
                            }}
                          >
                            <Minus size={16} color="#5B6B7D" />
                          </button>
                          <span style={{
                            padding: '0 16px',
                            fontSize: '16px',
                            fontWeight: '600',
                            color: '#0A051E'
                          }}>
                            {qty}
                          </span>
                          <button
                            onClick={() => updateQuantity(batteryId, 1)}
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '6px',
                              border: '1px solid #E6F4FF',
                              backgroundColor: 'white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#E6FFF9';
                              e.currentTarget.style.borderColor = '#10B981';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'white';
                              e.currentTarget.style.borderColor = '#E6F4FF';
                            }}
                          >
                            <Plus size={16} color="#5B6B7D" />
                          </button>
                        </div>
                        <button
                          onClick={() => updateQuantity(batteryId, -qty)}
                          style={{
                            padding: '8px',
                            borderRadius: '6px',
                            border: 'none',
                            backgroundColor: '#FFE6E6',
                            color: '#DC2626',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#FEE2E2';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#FFE6E6';
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Discount Progress */}
            {subtotal > 0 && subtotal < 5000 && (
              <div style={{
                backgroundColor: '#F0F9FF',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '24px'
              }}>
                <div style={{ marginBottom: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#0A051E' }}>
                      {discountPercentage > 0 
                        ? `You're saving ${discountPercentage}%!` 
                        : 'Add more to save!'}
                    </span>
                    <span style={{ fontSize: '14px', color: '#5B6B7D' }}>
                      ${(discountTiers.find(t => t.threshold > subtotal)?.threshold || 5000 - subtotal).toFixed(0)} to next tier
                    </span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '8px',
                    backgroundColor: '#E6F4FF',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${Math.min((subtotal / 5000) * 100, 100)}%`,
                      height: '100%',
                      backgroundColor: '#006FEE',
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#5B6B7D' }}>
                  <span>$0</span>
                  <span>$1,000 (10%)</span>
                  <span>$2,500 (15%)</span>
                  <span>$5,000 (20%)</span>
                </div>
              </div>
            )}

            {/* Totals */}
            <div style={{ borderTop: '2px solid #E6F4FF', paddingTop: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '16px', color: '#5B6B7D' }}>Subtotal</span>
                <span style={{ fontSize: '16px', fontWeight: '600', color: '#0A051E' }}>
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontSize: '16px', color: '#059669' }}>
                    Bulk Discount ({discountPercentage}%)
                  </span>
                  <span style={{ fontSize: '16px', fontWeight: '600', color: '#059669' }}>
                    -${discountAmount.toFixed(2)}
                  </span>
                </div>
              )}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                marginBottom: '24px',
                paddingTop: '12px',
                borderTop: '1px solid #E6F4FF'
              }}>
                <span style={{ fontSize: '20px', fontWeight: '700', color: '#0A051E' }}>Total</span>
                <span style={{ fontSize: '28px', fontWeight: '800', color: '#006FEE' }}>
                  ${total.toFixed(2)}
                </span>
              </div>

              {/* Action buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <button
                  onClick={handleCheckout}
                  style={{
                    backgroundColor: '#006FEE',
                    color: 'white',
                    padding: '14px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#0059D1';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#006FEE';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <CreditCard size={18} />
                  Checkout
                </button>
                <button
                  onClick={handleInvoice}
                  style={{
                    backgroundColor: 'white',
                    color: '#006FEE',
                    padding: '14px 24px',
                    borderRadius: '8px',
                    border: '2px solid #006FEE',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#F0F9FF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                  }}
                >
                  <FileText size={18} />
                  Get Invoice
                </button>
              </div>

              {/* Benefits */}
              <div style={{
                marginTop: '20px',
                padding: '16px',
                backgroundColor: '#F0F9FF',
                borderRadius: '12px',
                fontSize: '14px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <CheckCircle size={16} color="#10B981" />
                  <span style={{ color: '#5B6B7D' }}>Free shipping on orders over $1,000</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <CheckCircle size={16} color="#10B981" />
                  <span style={{ color: '#5B6B7D' }}>12-month warranty on all batteries</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle size={16} color="#10B981" />
                  <span style={{ color: '#5B6B7D' }}>Same-day processing for orders before 2PM</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty Cart Message */}
        {totalItems === 0 && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '48px',
            textAlign: 'center',
            border: '1px solid #E6F4FF',
            boxShadow: '0 4px 12px rgba(0, 111, 238, 0.04)'
          }}>
            <ShoppingCart size={48} color="#9CA3AF" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#0A051E', marginBottom: '8px' }}>
              Your cart is empty
            </h3>
            <p style={{ fontSize: '16px', color: '#5B6B7D', marginBottom: '24px' }}>
              Select batteries or packages above to get started
            </p>
            <button
              onClick={() => setActiveTab('batteries')}
              style={{
                padding: '12px 24px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#006FEE',
                color: 'white',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Browse Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
}