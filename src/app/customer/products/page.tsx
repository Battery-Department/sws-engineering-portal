'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingCart, X, CreditCard, FileText, ChevronRight, Truck, Clock, Shield, Star, Users, BarChart } from 'lucide-react';
import ProductTabs from '../../../components/battery/UpdatedProductTabs';
import EnhancedDiscountProgressBar from '../../../components/battery/EnhancedDiscountProgressBar';

// Force dynamic rendering with no cache
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

const batteriesData = [
  {
    id: '6Ah',
    name: '6Ah FlexVolt Battery',
    runtime: 'Up to 4 hours',
    weight: '1.9 lbs',
    price: 95,
    retailPrice: 169,
    voltage: "20V/60V",
    features: "Compatible with all DeWalt 20V/60V tools",
    featureBullets: [
      "Runtime: Up to 4 hours of continuous operation",
      "Charge Time: Full charge in 45 minutes",
      "Perfect for: Finish work and medium-duty applications"
    ],
    savings: 44,
    units: [5, 10, 25],
    popular: false
  },
  {
    id: '9Ah',
    name: '9Ah FlexVolt Battery',
    runtime: 'Up to 6.5 hours',
    weight: '2.4 lbs',
    price: 125,
    retailPrice: 249,
    voltage: "20V/60V",
    features: "Compatible with all DeWalt 20V/60V tools",
    featureBullets: [
      "Runtime: Up to 6.5 hours of continuous operation",
      "Charge Time: Full charge in 55 minutes",
      "Perfect for: Pro contractors and heavy-duty usage"
    ],
    savings: 50,
    units: [5, 10, 25],
    popular: true
  },
  {
    id: '15Ah',
    name: '15Ah FlexVolt Battery',
    runtime: 'Up to 10 hours',
    weight: '3.2 lbs',
    price: 245,
    retailPrice: 379,
    voltage: "20V/60V",
    features: "Compatible with all DeWalt 20V/60V tools",
    featureBullets: [
      "Runtime: Up to 10 hours of continuous operation",
      "Charge Time: Full charge in 90 minutes",
      "Perfect for: Commercial jobsites and extended applications"
    ],
    savings: 35,
    units: [5, 10, 25],
    popular: false
  }
];

const discountTiers = [
  { threshold: 1000, percentage: 10 },
  { threshold: 2500, percentage: 15 },
  { threshold: 5000, percentage: 20 }
];

const jobsiteSolutions = [
  {
    name: "STARTER CREW PACKAGE",
    teamSize: "1-3 person teams",
    details: ["2× 6Ah", "2× 9Ah", "2× 15Ah"],
    price: 1270,
    savings: 379,
    hours: 64,
    description: "Most popular for residential contractors",
    purchases: 127,
    isPopular: false,
    teamIcon: 1,
    quantities: { '6Ah': 2, '9Ah': 2, '15Ah': 2 }
  },
  {
    name: "MID-SIZE CREW PACKAGE",
    teamSize: "4-6 person teams",
    details: ["10× 6Ah", "10× 9Ah", "5× 15Ah"],
    price: 4425,
    savings: 1105,
    hours: 224,
    description: "Recommended for commercial projects",
    purchases: 86,
    isPopular: true,
    teamIcon: 2,
    quantities: { '6Ah': 10, '9Ah': 10, '15Ah': 5 }
  },
  {
    name: "FULL WORKFORCE SOLUTION",
    teamSize: "7-12 person teams",
    details: ["15× 6Ah", "20× 9Ah", "15× 15Ah"],
    price: 8875,
    savings: 2220,
    hours: 450,
    description: "Preferred by general contractors",
    purchases: 42,
    isPopular: false,
    teamIcon: 3,
    quantities: { '6Ah': 15, '9Ah': 20, '15Ah': 15 }
  }
];

export default function ProductsPage() {
  const router = useRouter();
  const [quantities, setQuantities] = useState<{[key: string]: number}>({
    '6Ah': 0,
    '9Ah': 0,
    '15Ah': 0
  });
  const [showCart, setShowCart] = useState(true);
  const [windowWidth, setWindowWidth] = useState(1024);
  const [activeTab, setActiveTab] = useState('packages'); // 'batteries' or 'packages'

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate totals
  const subtotal = Object.entries(quantities).reduce((sum, [battery, qty]) => {
    const batteryData = batteriesData.find(b => b.id === battery);
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

  const updateQuantity = (battery: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [battery]: Math.max(0, prev[battery] + delta)
    }));
  };

  const calcTotalAh = () => {
    return Object.entries(quantities).reduce((sum, [battery, qty]) => {
      const ah = parseInt(battery);
      return sum + (ah * qty);
    }, 0);
  };

  const calculatePowerHours = () => {
    const sixAhQty = quantities['6Ah'] || 0;
    const nineAhQty = quantities['9Ah'] || 0;
    const fifteenAhQty = quantities['15Ah'] || 0;

    return {
      circularSaw: Math.round((sixAhQty * 1.2) + (nineAhQty * 1.8) + (fifteenAhQty * 3)),
      drill: Math.round((sixAhQty * 3) + (nineAhQty * 4.5) + (fifteenAhQty * 7.5)),
      impactDriver: Math.round((sixAhQty * 2) + (nineAhQty * 3) + (fifteenAhQty * 5))
    };
  };

  const handleCheckout = () => {
    // Store order data in session
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
    // Store order data in session
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

  const totalAh = calcTotalAh();
  const hasItems = Object.values(quantities).some(q => q > 0);
  const isMobile = windowWidth < 768;
  const powerHours = calculatePowerHours();

  // Add CSS animations
  if (typeof document !== 'undefined' && !document.getElementById('hero-animations')) {
    const style = document.createElement('style');
    style.id = 'hero-animations';
    style.innerHTML = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: .8; }
      }
    `;
    document.head.appendChild(style);
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      background: '#F8F9FA',
      margin: 0,
      padding: 0,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    }}>
      {/* Hero Header */}
      <div style={{
        width: '100%',
        padding: '24px'
      }}>
        <div style={{
          background: '#2563EB',
          borderRadius: '16px',
          position: 'relative',
          overflow: 'hidden',
          maxWidth: '1400px',
          margin: '0 auto',
          boxShadow: '0 8px 32px rgba(37, 99, 235, 0.2)'
        }}>
          <div style={{
            padding: isMobile ? '20px 16px' : '32px 40px',
            position: 'relative',
            textAlign: 'center',
            animation: 'fadeIn 0.6s ease-out'
          }}>
          {/* Promotional Banner */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255, 255, 255, 0.98)',
              color: '#1E40AF',
              padding: isMobile ? '8px 16px' : '10px 20px',
              borderRadius: '100px',
              marginBottom: isMobile ? '16px' : '24px',
              fontSize: isMobile ? '12px' : '14px',
              fontWeight: '700',
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1E40AF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M13 2L3 14h9l-1 8L21 10h-9l1-8z" />
            </svg>
            BULK SAVINGS: 20% OFF BULK ORDERS
          </div>
          
          {/* Primary Headline */}
          <h1 style={{
            fontSize: isMobile ? '24px' : '32px',
            fontWeight: '800',
            color: 'white',
            margin: isMobile ? '0 0 24px 0' : '0 0 32px 0',
            letterSpacing: '0.5px',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            lineHeight: '1.2'
          }}>
            HEAVY-DUTY FLEXVOLT BATTERIES
          </h1>
          
          {/* Key Benefits */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: isMobile ? '16px' : '48px',
            flexWrap: 'wrap',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: 'white',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              WORKS WITH ALL YOUR DEWALT 20V/60V TOOLS
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: 'white',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              <Truck size={20} color="white" />
              UPS SHIPPING
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: 'white',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M1 4v6h6"></path>
                <path d="M23 20v-6h-6"></path>
                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
              </svg>
              ZERO-HASSLE REPLACEMENTS - NO QUESTIONS ASKED
            </div>
          </div>
        </div>
      </div>
    </div>

      {/* Main Container */}
      <div style={{
        display: 'flex',
        maxWidth: '1400px',
        margin: '0 auto',
        gap: '24px',
        padding: '24px'
      }}>
        {/* Left Column - Product Cards */}
        <div style={{ flex: 1 }}>
          {/* Tabs */}
          <div style={{
            display: 'flex',
            gap: '16px',
            marginBottom: '24px',
            borderBottom: '2px solid #E5E7EB',
            position: 'relative'
          }}>
            <button
              onClick={() => setActiveTab('batteries')}
              style={{
                padding: '14px 26px',
                background: activeTab === 'batteries' ? '#2563EB' : 'transparent',
                color: activeTab === 'batteries' ? 'white' : '#666',
                border: 'none',
                borderRadius: '12px 12px 0 0',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
                position: 'relative'
              }}
            >
              Individual Batteries
            </button>
            
            <button
              onClick={() => setActiveTab('packages')}
              style={{
                padding: '14px 26px',
                background: activeTab === 'packages' ? '#2563EB' : 'transparent',
                color: activeTab === 'packages' ? 'white' : '#666',
                border: 'none',
                borderRadius: '12px 12px 0 0',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              Complete Jobsite Packages
              <span style={{
                background: '#10B981',
                color: 'white',
                fontSize: '11px',
                padding: '2px 8px',
                borderRadius: '12px',
                fontWeight: '600'
              }}>
                Recommended
              </span>
            </button>
            
            {/* Active Tab Indicator */}
            <div style={{
              position: 'absolute',
              bottom: '-2px',
              left: activeTab === 'batteries' ? '0' : '50%',
              width: '50%',
              height: '2px',
              background: '#2563EB',
              transition: 'left 0.2s',
              borderRadius: '1px'
            }} />
          </div>

          {/* Tab Content */}
          <div style={{
            transition: 'opacity 0.2s',
            opacity: 1
          }}>
            {activeTab === 'batteries' ? (
              /* Battery Cards */
              <div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '20px',
                  marginBottom: '32px'
                }}>
                  {batteriesData.map((battery, index) => (
                    <div key={battery.id} style={{
                      background: `linear-gradient(to bottom, ${
                        index === 0 ? '#F0F9FF' : 
                        index === 1 ? '#E0F2FE' : 
                        '#DBEAFE'
                      }, white)`,
                      borderRadius: '16px',
                      padding: '24px 24px 34px 24px',
                      border: battery.popular ? '2px solid #0066FF' : '1px solid #E5E7EB',
                      position: 'relative',
                      transition: 'all 0.2s',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
                      (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                      (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
                    }}>
                      {battery.popular && (
                        <div style={{
                          position: 'absolute',
                          top: '-12px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          background: '#0066FF',
                          color: 'white',
                          padding: '4px 16px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}>
                          Most Popular
                        </div>
                      )}
                      
                      <h3 style={{ 
                        fontSize: '18px',
                        fontWeight: '700',
                        margin: '0 0 8px 0'
                      }}>
                        {battery.id} <span style={{ fontWeight: '800' }}>FlexVolt</span> Battery
                      </h3>
                      
                      <p style={{ 
                        fontSize: '14px',
                        color: '#666',
                        margin: '0 0 16px 0'
                      }}>
                        {battery.runtime} • {battery.weight}
                      </p>
                      
                      <div style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        gap: '12px',
                        margin: '0 0 20px 0'
                      }}>
                        <span style={{
                          fontSize: '32px',
                          fontWeight: '700',
                          color: '#0F172A'
                        }}>
                          ${battery.price}
                        </span>
                        <span style={{
                          fontSize: '18px',
                          color: '#999',
                          textDecoration: 'line-through'
                        }}>
                          ${battery.retailPrice}
                        </span>
                        <span style={{
                          fontSize: '14px',
                          color: '#10B981',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          <span style={{
                            display: 'inline-block',
                            width: '4px',
                            height: '4px',
                            borderRadius: '50%',
                            background: '#999'
                          }}></span>
                          Save {battery.savings}%
                        </span>
                      </div>
                      
                      {/* Quantity Controls */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '16px',
                        marginBottom: '16px'
                      }}>
                        <button
                          onClick={() => updateQuantity(battery.id, -1)}
                          style={{
                            width: '32px',
                            height: '32px',
                            border: '1px solid #E5E7EB',
                            background: 'white',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '18px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          -
                        </button>
                        
                        <span style={{
                          fontSize: '20px',
                          fontWeight: '600',
                          minWidth: '40px',
                          textAlign: 'center'
                        }}>
                          {quantities[battery.id]}
                        </span>
                        
                        <button
                          onClick={() => updateQuantity(battery.id, 1)}
                          style={{
                            width: '32px',
                            height: '32px',
                            border: '1px solid #E5E7EB',
                            background: '#0066FF',
                            color: 'white',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '18px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          +
                        </button>
                      </div>
                      
                      {/* Unit Buttons */}
                      <div style={{
                        display: 'flex',
                        gap: '8px',
                        marginBottom: '16px'
                      }}>
                        {battery.units.map(unit => (
                          <button
                            key={unit}
                            onClick={() => updateQuantity(battery.id, unit)}
                            style={{
                              flex: 1,
                              padding: '6px',
                              border: '1px solid #E5E7EB',
                              background: 'white',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '12px',
                              color: '#666'
                            }}
                          >
                            {unit} units
                          </button>
                        ))}
                      </div>
                      
                      {/* Compatibility */}
                      <div style={{
                        fontSize: '12px',
                        color: '#10B981',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        marginBottom: '12px'
                      }}>
                        <Shield size={14} />
                        {battery.features}
                      </div>
                      
                      {/* Feature Bullets */}
                      <ul style={{
                        margin: '0',
                        padding: '0',
                        listStyle: 'none'
                      }}>
                        {battery.featureBullets.map((bullet, idx) => (
                          <li 
                            key={idx}
                            style={{
                              fontSize: '13px',
                              color: '#4B5563',
                              margin: '0 0 8px 0',
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '6px'
                            }}
                          >
                            <span style={{
                              display: 'block',
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              background: 'rgba(52, 211, 153, 0.9)',
                              marginTop: '5px'
                            }}></span>
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Complete Jobsite Packages */
              <div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '20px'
                }}>
                  {jobsiteSolutions.map((solution, index) => (
                    <div
                      key={index}
                      style={{
                        background: `linear-gradient(to bottom, ${
                          index === 0 ? '#F0F9FF' : 
                          index === 1 ? '#E0F2FE' : 
                          '#DBEAFE'
                        }, white)`,
                        border: solution.isPopular ? '2px solid #0066FF' : '1px solid #E5E7EB',
                        borderRadius: '12px',
                        padding: '20px',
                        position: 'relative',
                        transition: 'all 0.2s',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
                        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
                      }}
                    >
                      {solution.isPopular && (
                        <div style={{
                          position: 'absolute',
                          top: '-12px',
                          right: '20px',
                          background: '#0066FF',
                          color: 'white',
                          padding: '4px 12px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}>
                          BEST VALUE
                        </div>
                      )}
                      
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '12px'
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          {[...Array(solution.teamIcon)].map((_, i) => (
                            <Users key={i} size={16} color="#0066FF" />
                          ))}
                        </div>
                      </div>
                      
                      <h4 style={{
                        fontSize: '16px',
                        fontWeight: '700',
                        margin: '0 0 4px 0',
                        color: '#003D88'
                      }}>
                        {solution.name}
                      </h4>
                      
                      {/* Star rating */}
                      <div style={{
                        display: 'flex',
                        gap: '2px',
                        marginBottom: '12px'
                      }}>
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} fill="#FCD34D" color="#FCD34D" />
                        ))}
                        <span style={{ 
                          fontSize: '12px', 
                          color: '#666',
                          marginLeft: '4px'
                        }}>
                          ({solution.purchases} purchases this month)
                        </span>
                      </div>
                      
                      <p style={{
                        fontSize: '14px',
                        color: '#666',
                        margin: '0 0 12px 0'
                      }}>
                        Perfect for {solution.teamSize}
                      </p>
                      
                      <div style={{
                        background: 'rgba(255,255,255,0.8)',
                        padding: '12px',
                        borderRadius: '8px',
                        marginBottom: '12px'
                      }}>
                        <ul style={{
                          margin: '0 0 12px 0',
                          padding: '0 0 0 20px',
                          listStyle: 'none'
                        }}>
                          {solution.details.map((item, idx) => (
                            <li key={idx} style={{
                              fontSize: '14px',
                              fontWeight: '600',
                              color: '#333',
                              marginBottom: '4px',
                              position: 'relative',
                              paddingLeft: '16px'
                            }}>
                              <span style={{
                                position: 'absolute',
                                left: 0,
                                top: '6px',
                                width: '6px',
                                height: '6px',
                                borderRadius: '50%',
                                background: '#3B82F6'
                              }} />
                              {item}
                            </li>
                          ))}
                        </ul>
                        <p style={{
                          fontSize: '24px',
                          fontWeight: '700',
                          margin: '0',
                          color: '#0066FF'
                        }}>
                          ${solution.price.toLocaleString()}
                          <span style={{
                            fontSize: '14px',
                            fontWeight: '400',
                            color: '#10B981',
                            marginLeft: '8px'
                          }}>
                            ($${solution.savings} savings)
                          </span>
                        </p>
                      </div>
                      
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '12px',
                        fontSize: '14px',
                        color: '#666'
                      }}>
                        <Clock size={16} />
                        <span>Powers up to {solution.hours} hours of continuous work</span>
                      </div>
                      
                      <p style={{
                        fontSize: '13px',
                        color: '#666',
                        marginBottom: '16px',
                        fontStyle: 'italic'
                      }}>
                        "{solution.description}"
                      </p>
                      
                      <button
                        onClick={() => {
                          setQuantities(solution.quantities);
                        }}
                        style={{
                          width: '100%',
                          padding: '12px',
                          background: '#0066FF',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '14px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.02)';
                          (e.currentTarget as HTMLButtonElement).style.background = '#0058DD';
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
                          (e.currentTarget as HTMLButtonElement).style.background = '#0066FF';
                        }}
                      >
                        <ShoppingCart size={16} />
                        ADD COMPLETE PACKAGE
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Power Calculation Bar Chart */}
          {hasItems && (
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '24px',
              marginTop: '32px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px'
              }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  margin: 0,
                  color: '#003D88'
                }}>
                  Power Calculation
                </h3>
                <div style={{
                  cursor: 'pointer',
                  color: '#666'
                }}
                title="Battery power is calculated based on average tool consumption rates: Circular Saw (5Ah/hr), Drill (2Ah/hr), Impact Driver (3Ah/hr)">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                </div>
              </div>

              <div style={{ 
                display: 'grid',
                gap: '16px'
              }}>
                {/* Circular Saw */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    minWidth: '120px'
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
                      <circle cx="12" cy="12" r="9"></circle>
                      <circle cx="12" cy="12" r="3"></circle>
                      <line x1="4.93" y1="4.93" x2="9.17" y2="9.17"></line>
                      <line x1="14.83" y1="14.83" x2="19.07" y2="19.07"></line>
                      <line x1="14.83" y1="9.17" x2="19.07" y2="4.93"></line>
                      <line x1="4.93" y1="19.07" x2="9.17" y2="14.83"></line>
                    </svg>
                    <span style={{ fontSize: '14px', color: '#666' }}>Circular Saw</span>
                  </div>
                  <div style={{ flex: 1, position: 'relative' }}>
                    <div style={{
                      height: '24px',
                      background: '#E5E7EB',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        height: '100%',
                        background: 'linear-gradient(90deg, #93C5FD 0%, #2563EB 100%)',
                        width: `${Math.min((powerHours.circularSaw / Math.max(...Object.values(powerHours))) * 100, 100)}%`,
                        transition: 'width 0.3s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        paddingRight: '8px'
                      }}>
                        <span style={{ 
                          color: 'white',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}>
                          {powerHours.circularSaw}h
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Drill */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    minWidth: '120px'
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
                      <path d="M14 4l6 6v6l-6 6"></path>
                      <path d="M14 10H3"></path>
                      <path d="M17 7l3 3-3 3"></path>
                    </svg>
                    <span style={{ fontSize: '14px', color: '#666' }}>Drill</span>
                  </div>
                  <div style={{ flex: 1, position: 'relative' }}>
                    <div style={{
                      height: '24px',
                      background: '#E5E7EB',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        height: '100%',
                        background: 'linear-gradient(90deg, #93C5FD 0%, #2563EB 100%)',
                        width: `${Math.min((powerHours.drill / Math.max(...Object.values(powerHours))) * 100, 100)}%`,
                        transition: 'width 0.3s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        paddingRight: '8px'
                      }}>
                        <span style={{ 
                          color: 'white',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}>
                          {powerHours.drill}h
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Impact Driver */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    minWidth: '120px'
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
                      <path d="M12 2l3.09 5.26L21 7.27l-4.37 4.28L18 17l-5.82-3.03L6.36 17l1.37-5.45L3.36 7.27l5.91-.01z"/>
                    </svg>
                    <span style={{ fontSize: '14px', color: '#666' }}>Impact Driver</span>
                  </div>
                  <div style={{ flex: 1, position: 'relative' }}>
                    <div style={{
                      height: '24px',
                      background: '#E5E7EB',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        height: '100%',
                        background: 'linear-gradient(90deg, #93C5FD 0%, #2563EB 100%)',
                        width: `${Math.min((powerHours.impactDriver / Math.max(...Object.values(powerHours))) * 100, 100)}%`,
                        transition: 'width 0.3s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        paddingRight: '8px'
                      }}>
                        <span style={{ 
                          color: 'white',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}>
                          {powerHours.impactDriver}h
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p style={{
                fontSize: '16px',
                fontWeight: '600',
                margin: '16px 0 0 0',
                color: '#003D88',
                textAlign: 'center'
              }}>
                Total Amp Hours: {totalAh}Ah
              </p>
            </div>
          )}
          
          {/* Product Tabs Component */}
          <div style={{ marginTop: '32px' }}>
            <ProductTabs 
              isMobile={false} 
            />
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div style={{ width: '380px' }}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            position: 'sticky',
            top: '24px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                margin: 0
              }}>
                <ShoppingCart size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                Your Order
              </h3>
              <button
                onClick={() => setQuantities({ '6Ah': 0, '9Ah': 0, '15Ah': 0 })}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#999',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                <X size={16} /> Clear
              </button>
            </div>

            {/* Order Lines */}
            <div style={{ marginBottom: '24px' }}>
              {Object.entries(quantities).map(([battery, qty]) => qty > 0 && (
                <div
                  key={battery}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '12px',
                    fontSize: '15px'
                  }}
                >
                  <span>{qty}x {battery} Battery</span>
                  <span style={{ fontWeight: '600' }}>
                    ${(batteriesData.find(b => b.id === battery)?.price || 0) * qty}.00
                  </span>
                </div>
              ))}
              
              {!hasItems && (
                <p style={{ color: '#999', textAlign: 'center', fontSize: '14px' }}>
                  No items in cart
                </p>
              )}
            </div>

            {/* Totals */}
            {hasItems && (
              <>
                <div style={{
                  borderTop: '1px solid #E5E7EB',
                  paddingTop: '16px',
                  marginBottom: '16px'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '8px',
                    fontSize: '15px'
                  }}>
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  
                  {discountPercentage > 0 && (
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '8px',
                      fontSize: '15px',
                      color: '#10B981'
                    }}>
                      <span>{discountPercentage}% OFF:</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#0066FF'
                  }}>
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Discount Progress */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{
                    fontSize: '14px',
                    color: '#666',
                    marginBottom: '8px'
                  }}>
                    Bulk Discount Progress
                  </div>
                  <div style={{
                    height: '8px',
                    background: '#E5E7EB',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    position: 'relative'
                  }}>
                    <div style={{
                      height: '100%',
                      background: '#0066FF',
                      width: `${Math.min((subtotal / 5000) * 100, 100)}%`,
                      transition: 'width 0.3s'
                    }} />
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '4px',
                    fontSize: '12px',
                    color: '#999'
                  }}>
                    <span>10%</span>
                    <span>15%</span>
                    <span>20%</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <button
                  onClick={handleCheckout}
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: '#0066FF',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    marginBottom: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <ShoppingCart size={18} />
                  Proceed to Checkout
                </button>

                <div style={{
                  display: 'flex',
                  gap: '12px'
                }}>
                  <button
                    onClick={handleInvoice}
                    style={{
                      flex: 1,
                      padding: '12px',
                      background: 'white',
                      color: '#333',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    <FileText size={16} />
                    Request Quote
                  </button>
                  <button
                    style={{
                      flex: 1,
                      padding: '12px',
                      background: 'white',
                      color: '#333',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    <CreditCard size={16} />
                    Financing
                  </button>
                </div>

                {/* Delivery Info */}
                <div style={{
                  marginTop: '20px',
                  padding: '16px',
                  background: '#F0FDF4',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '4px',
                    color: '#10B981',
                    fontWeight: '600'
                  }}>
                    <Truck size={16} />
                    Estimated Delivery: May 22-23
                  </div>
                  <div style={{ color: '#666' }}>
                    Order within 2h 56m for same-day shipping
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}