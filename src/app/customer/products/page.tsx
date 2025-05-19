'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BatteryCard2 from './BatteryCard2';
import DiscountTierVisualization from './DiscountTierVisualization';
import PaymentLogos from './PaymentLogos';
import Tooltip from './Tooltip';
import BatteryValueCalculator from './BatteryValueCalculator';
import DiscountProgressBar from './DiscountProgressBar';
import PersistentCart from './PersistentCart';
import { ShoppingCart, MessageCircle, ArrowLeft, Menu, Home, User, CheckCircle, Truck, Shield } from 'lucide-react';

// Force dynamic rendering with no cache
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

// Unique version ID to bust cache
const VERSION = Date.now();

const globalStyles = `
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
    margin: 0 !important;
  }
  input[type=number] {
    -moz-appearance: textfield !important;
    appearance: textfield !important;
  }
`;

const retailPrices = { "6Ah": 169, "9Ah": 249, "15Ah": 379 };

const batterySpecs = {
  "6Ah": {
    weight: "1.9 lbs",
    runtime: "Up to 4 hours",
    chargingTime: "75 minutes",
    compatibleTools: "All 20V/60V FlexVolt tools",
    bestFor: "Compact drills, impact drivers, lights",
    dimensions: '4.5" x 3" x 3.5"',
    basePrice: 95,
  },
  "9Ah": {
    weight: "2.4 lbs",
    runtime: "Up to 6.5 hours",
    chargingTime: "90 minutes",
    compatibleTools: "All 20V/60V FlexVolt tools",
    bestFor: "Circular saws, reciprocating saws, grinders",
    dimensions: '4.5" x 3" x 4.2"',
    basePrice: 125,
  },
  "15Ah": {
    weight: "3.2 lbs",
    runtime: "Up to 10 hours",
    chargingTime: "120 minutes",
    compatibleTools: "All 20V/60V FlexVolt tools",
    bestFor: "Table saws, miter saws, heavy-duty drilling",
    dimensions: '4.5" x 3" x 5.8"',
    basePrice: 245,
  },
};

const discountTiers = [
  {
    threshold: 1000,
    discount: "10%",
    discountRate: 0.1,
    color: "#5B9FFF",
    description: "Perfect for small crews and workshops",
  },
  {
    threshold: 2500,
    discount: "15%",
    discountRate: 0.15,
    color: "#006FEE",
    description: "Ideal for medium contractors and job sites",
  },
  {
    threshold: 5000,
    discount: "20%",
    discountRate: 0.2,
    color: "#0048AC",
    description: "Best value for large teams and organizations",
  },
];

export default function ProductsPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [quantities, setQuantities] = useState({
    '6Ah': 0,
    '9Ah': 0,
    '15Ah': 0
  });
  
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [showMobileCart, setShowMobileCart] = useState(false);
  const [showDiscountTiers, setShowDiscountTiers] = useState(false);
  const [expandedCards, setExpandedCards] = useState<{ [key: string]: boolean }>({});
  
  useEffect(() => {
    setMounted(true);
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  
  if (!mounted) {
    return null;
  }
  
  const handleQuantityChange = (type: '6Ah' | '9Ah' | '15Ah', quantity: number) => {
    setQuantities(prev => ({
      ...prev,
      [type]: quantity
    }));
  };
  
  const baseTotal = Object.entries(quantities).reduce((total, [type, quantity]) => {
    const batteryType = type as '6Ah' | '9Ah' | '15Ah';
    return total + (batterySpecs[batteryType].basePrice * quantity);
  }, 0);
  
  const retailTotal = Object.entries(quantities).reduce((total, [type, quantity]) => {
    const batteryType = type as '6Ah' | '9Ah' | '15Ah';
    return total + (retailPrices[batteryType] * quantity);
  }, 0);
  
  let currentDiscountTier = -1;
  for (let i = discountTiers.length - 1; i >= 0; i--) {
    if (baseTotal >= discountTiers[i].threshold) {
      currentDiscountTier = i;
      break;
    }
  }
  
  const discountRate = currentDiscountTier >= 0 ? discountTiers[currentDiscountTier].discountRate : 0;
  const discountAmount = baseTotal * discountRate;
  const finalTotal = baseTotal - discountAmount;
  const totalSavings = retailTotal - finalTotal;
  const savingsPercentage = retailTotal > 0 ? (totalSavings / retailTotal) * 100 : 0;
  const hasItems = Object.values(quantities).some(quantity => quantity > 0);
  const totalItems = Object.values(quantities).reduce((a, b) => a + b, 0);
  
  const toggleCardExpansion = (type: string) => {
    setExpandedCards(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F8FAFC',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      <meta name="version" content={VERSION.toString()} />
      
      {/* Mobile Header */}
      {isMobile && (
        <div style={{
          position: 'sticky',
          top: 0,
          background: 'white',
          borderBottom: '1px solid #E6F4FF',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 50
        }}>
          <button
            onClick={() => router.push('/customer/dashboard')}
            style={{
              background: 'none',
              border: 'none',
              padding: '8px',
              cursor: 'pointer',
              color: '#006FEE',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <ArrowLeft size={20} />
            Back
          </button>
          
          <h3 style={{
            fontSize: '18px',
            fontWeight: '700',
            color: '#003D88'
          }}>Products</h3>
          
          <button
            onClick={() => setShowMobileCart(true)}
            style={{
              position: 'relative',
              background: 'none',
              border: 'none',
              padding: '8px',
              cursor: 'pointer',
              color: '#006FEE'
            }}
          >
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <span style={{
                position: 'absolute',
                top: '0',
                right: '0',
                background: '#006FEE',
                color: 'white',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                {totalItems}
              </span>
            )}
          </button>
        </div>
      )}
      
      {/* Hero Section - Condensed */}
      <div
        style={{
          background: "linear-gradient(135deg, #0048AC 0%, #006FEE 50%, #0084FF 100%)",
          color: "white",
          padding: isMobile ? "16px" : "20px",
          borderRadius: isMobile ? "0" : "0 0 16px 16px",
          boxShadow: "0 4px 12px rgba(0, 111, 238, 0.1)",
        }}
      >
        <div style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px"
        }}>
          <div style={{
            textAlign: isMobile ? "center" : "left"
          }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: `rgba(255, 255, 255, 0.15)`,
                padding: "6px 12px",
                borderRadius: "100px",
                marginBottom: "12px",
                color: "white",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M13 2L3 14h9l-1 8L21 10h-9l1-8z" />
              </svg>
              <span style={{ fontWeight: 600, fontSize: "13px" }}>
                JOBSITE SAVINGS: 20% OFF BULK ORDERS
              </span>
            </div>

            <h1
              style={{
                fontSize: isMobile ? "24px" : "32px",
                fontWeight: 800,
                margin: "0 0 8px 0",
                lineHeight: 1.1,
                textTransform: "uppercase",
              }}
            >
              HEAVY-DUTY FLEXVOLT BATTERIES
            </h1>
          </div>

          <div style={{
            display: "flex",
            justifyContent: isMobile ? "center" : "flex-end",
            gap: "20px",
            flexWrap: "wrap",
          }}>
            <Tooltip 
              content="Our batteries are 100% compatible with all DeWalt® 20V and 60V FlexVolt tools. Battery Department LLC is not affiliated with DeWalt® but our batteries are engineered to the exact specifications required for seamless integration."
              position="bottom"
            >
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "13px",
                background: "rgba(255, 255, 255, 0.1)",
                padding: "6px 12px",
                borderRadius: "100px",
                cursor: "help",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
              >
                <CheckCircle size={14} />
                <span>DEWALT COMPATIBLE</span>
              </div>
            </Tooltip>
            
            <Tooltip 
              content="Orders placed before 2PM EST ship same day. All batteries are prepared and dispatched within 2-3 business days. Express UPS shipping ensures delivery to your jobsite within 24-48 hours of dispatch."
              position="bottom"
            >
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "13px",
                background: "rgba(255, 255, 255, 0.1)",
                padding: "6px 12px",
                borderRadius: "100px",
                cursor: "help",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
              >
                <Truck size={14} />
                <span>UPS EXPRESS SHIPPING</span>
              </div>
            </Tooltip>
            
            <Tooltip 
              content="12-month warranty on all batteries. If any battery fails, we'll replace it immediately - no questions asked. Our US-based support team provides same-day responses and rapid replacement shipping."
              position="bottom"
            >
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "13px",
                background: "rgba(255, 255, 255, 0.1)",
                padding: "6px 12px",
                borderRadius: "100px",
                cursor: "help",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
              >
                <Shield size={14} />
                <span>ZERO-HASSLE WARRANTY</span>
              </div>
            </Tooltip>
        </div>
      </div>

      {/* Products Section */}
      <div style={{
        padding: isMobile ? '12px' : '20px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Discount Progress Bar */}
        <DiscountProgressBar 
          currentTotal={baseTotal}
          discountTiers={discountTiers}
          isMobile={isMobile}
        />

        {/* Battery Value Calculator */}
        <BatteryValueCalculator 
          quantities={quantities}
          batterySpecs={batterySpecs}
          isMobile={isMobile}
        />

        {/* Battery Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
          gap: isMobile ? '12px' : '20px',
          marginBottom: '20px'
        }}>
          {Object.entries(batterySpecs).map(([type, specs]) => {
            const batteryType = type as '6Ah' | '9Ah' | '15Ah';
            return (
              <BatteryCard2
                key={type}
                type={batteryType}
                specs={specs}
                retailPrice={retailPrices[batteryType]}
                quantity={quantities[batteryType]}
                onQuantityChange={(q) => handleQuantityChange(batteryType, q)}
                discountRate={discountRate}
                isExpanded={expandedCards[batteryType]}
                onToggleExpand={() => toggleCardExpansion(batteryType)}
              />
            );
          })}
        </div>
        
        {/* Total Items Bar */}
        <div style={{
          background: 'linear-gradient(135deg, #E6F4FF 0%, #F0F9FF 100%)',
          border: '1px solid rgba(0, 111, 238, 0.15)',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '16px',
          boxShadow: '0 3px 8px rgba(0, 111, 238, 0.06)'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'stretch' : 'center',
            gap: '16px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #006FEE 0%, #0084FF 100%)',
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M9 11H3v9a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-9h-6m-6 0V7a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4m-6 0h6" />
                </svg>
              </div>
              <div>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#003D88',
                  marginBottom: '4px'
                }}>
                  Total: {totalItems} items
                </div>
                <div style={{
                  fontSize: '14px',
                  color: currentDiscountTier >= 2 ? '#22C55E' : '#5B9FFF',
                  fontWeight: '500'
                }}>
                  {currentDiscountTier >= 2 ? '✓ Maximum discount reached!' : 
                   currentDiscountTier >= 0 ? `${discountTiers[currentDiscountTier].discount} discount applied` :
                   'No discount applied'}
                </div>
              </div>
            </div>
            <div style={{
              textAlign: isMobile ? 'left' : 'right'
            }}>
              <div style={{
                fontSize: '14px',
                color: '#5B9FFF',
                marginBottom: '4px'
              }}>
                Subtotal: ${baseTotal.toFixed(2)}
              </div>
              <div style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#003D88'
              }}>
                Total: ${finalTotal.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
        
        
        {/* Responsive Discount Tiers Section */}
        <div
          style={{
            marginTop: "12px",
            marginBottom: "16px",
            background: isMobile ? "transparent" : "#FFFFFF",
            padding: isMobile ? "12px 0" : "16px",
            borderRadius: "12px",
            boxShadow: isMobile ? "none" : "0 3px 8px rgba(0, 111, 238, 0.06)",
            border: isMobile ? "none" : "1px solid #E6F4FF"
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "space-between",
              gap: isMobile ? "10px" : "12px",
              alignItems: "center",
              position: "relative"
            }}
          >
            {discountTiers.map((tier, index) => {
              const isActive = currentDiscountTier === index;
              const isApplicable = baseTotal >= tier.threshold;
              const tierOpacity = isActive ? 1 : 0.7;
              const borderColor = isActive ? tier.color : "#E6F4FF";
              const bgColor = isActive ? tier.color : "#FFFFFF";
              const textColor = isActive ? "#FFFFFF" : tier.color;
              const checkmarkColor = isActive ? "#FFFFFF" : "#22C55E";
              
              return (
                <React.Fragment key={index}>
                  {/* Desktop Vertical Divider */}
                  {!isMobile && index > 0 && (
                    <div
                      style={{
                        width: "1px",
                        background: "#E6F4FF",
                        height: "80px",
                        alignSelf: "center"
                      }}
                    />
                  )}
                  
                  {/* Mobile Horizontal Separator */}
                  {isMobile && index > 0 && (
                    <div
                      style={{
                        height: "1px",
                        background: "#E2E8F0",
                        margin: "0"
                      }}
                    />
                  )}
                  
                  <div
                    style={{
                      flex: "1 1 0",
                      maxWidth: isMobile ? "100%" : "30%",
                      minWidth: isMobile ? "auto" : "200px",
                      padding: isMobile ? "12px" : "16px",
                      background: isMobile ? (isActive ? bgColor : "white") : (isActive ? bgColor : "#F8FAFC"),
                      borderRadius: "8px",
                      border: isMobile ? `1px solid ${borderColor}` : "none",
                      boxShadow: isActive ? "0 3px 10px rgba(0, 111, 238, 0.12)" : "none",
                      position: "relative",
                      transition: "all 0.2s ease",
                      textAlign: "center",
                      cursor: "pointer",
                      height: isMobile ? "auto" : "100px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center"
                    }}
                  >
                    {/* Left Border Indicator (Mobile Only) */}
                    {isMobile && isActive && (
                      <div
                        style={{
                          position: "absolute",
                          left: 0,
                          top: 0,
                          bottom: 0,
                          width: "3px",
                          background: tier.color,
                          borderRadius: "8px 0 0 8px"
                        }}
                      />
                    )}
                    
                    {/* Checkmark for Active/Applicable Tier */}
                    {isApplicable && (
                      <div
                        style={{
                          position: "absolute",
                          top: isMobile ? "6px" : "8px",
                          right: isMobile ? "6px" : "8px",
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          background: checkmarkColor,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: isActive ? "0 2px 4px rgba(0, 0, 0, 0.1)" : "0 2px 4px rgba(0, 0, 0, 0.05)"
                        }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={isActive ? tier.color : "white"} strokeWidth="3">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      </div>
                    )}
                    
                    <div
                      style={{
                        display: "flex",
                        flexDirection: isMobile ? "row" : "column",
                        justifyContent: isMobile ? "space-between" : "center",
                        alignItems: isMobile ? "center" : "center",
                        marginBottom: isMobile ? "0" : "8px"
                      }}
                    >
                      <div
                        style={{
                          fontSize: isMobile ? "14px" : "15px",
                          fontWeight: 600,
                          color: textColor,
                          marginBottom: isMobile ? "0" : "4px"
                        }}
                      >
                        ${tier.threshold.toLocaleString()}+
                      </div>
                      <div
                        style={{
                          fontSize: isMobile ? "18px" : "28px",
                          fontWeight: 800,
                          color: isActive ? "#FFFFFF" : tier.color,
                          lineHeight: 1
                        }}
                      >
                        {tier.discount} OFF
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: isMobile ? "12px" : "13px",
                        color: isActive ? "rgba(255, 255, 255, 0.9)" : "#64748B",
                        marginTop: isMobile ? "6px" : "0",
                        lineHeight: 1.3,
                        fontWeight: isActive ? 500 : 400
                      }}
                    >
                      {tier.description}
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
        
        {/* Order Summary and Checkout Section */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "12px",
            padding: "16px",
            marginTop: "12px",
            border: "1px solid #E2E8F0",
            boxShadow: "0 3px 8px rgba(0, 0, 0, 0.03)"
          }}
        >
          {hasItems ? (
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  justifyContent: "space-between",
                  alignItems: isMobile ? "stretch" : "center",
                  marginBottom: "14px",
                  gap: "16px"
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#64748B",
                      marginBottom: "2px",
                    }}
                  >
                    Total ({totalItems} items)
                  </div>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: "22px",
                      color: "#0A051E",
                    }}
                  >
                    ${finalTotal.toFixed(2)}
                  </div>
                </div>

                <div style={{ textAlign: isMobile ? "left" : "right" }}>
                  {currentDiscountTier >= 0 && (
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#22C55E",
                        marginBottom: "2px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: isMobile ? "flex-start" : "flex-end",
                        gap: "4px",
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      {discountTiers[currentDiscountTier].discount} discount applied
                    </div>
                  )}
                  <div
                    style={{
                      fontSize: "14px",
                      color: currentDiscountTier >= 0 ? "#22C55E" : "#64748B",
                      fontWeight: currentDiscountTier >= 0 ? 500 : 400,
                    }}
                  >
                    Save ${totalSavings.toFixed(2)} ({Math.round(savingsPercentage)}%)
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  gap: "12px",
                  marginTop: "20px"
                }}
              >
                <button
                  onClick={() => router.push('/customer/payment')}
                  style={{
                    flex: 1,
                    background: "linear-gradient(135deg, #006FEE 0%, #0084FF 100%)",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "12px",
                    padding: "18px",
                    fontWeight: 700,
                    fontSize: "18px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    boxShadow: "0 4px 12px rgba(0, 111, 238, 0.2)",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 111, 238, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 111, 238, 0.2)';
                  }}
                >
                  Proceed to Checkout
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
                
                <button
                  onClick={() => {
                    // Prepare invoice data
                    const items = Object.entries(quantities)
                      .filter(([_, quantity]) => quantity > 0)
                      .map(([type, quantity]) => {
                        const batteryType = type as '6Ah' | '9Ah' | '15Ah';
                        return {
                          type,
                          quantity,
                          unitPrice: batterySpecs[batteryType].basePrice,
                          originalPrice: retailPrices[batteryType]
                        };
                      });
                    
                    const invoiceData = {
                      items,
                      subtotal: baseTotal,
                      discount: discountAmount,
                      total: finalTotal
                    };
                    
                    // Store in sessionStorage
                    sessionStorage.setItem('invoiceData', JSON.stringify(invoiceData));
                    router.push('/customer/invoice');
                  }}
                  style={{
                    flex: 1,
                    background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "12px",
                    padding: "18px",
                    fontWeight: 700,
                    fontSize: "18px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    boxShadow: "0 4px 12px rgba(16, 185, 129, 0.2)",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(16, 185, 129, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.2)';
                  }}
                >
                  Send Me An Invoice
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <div
              style={{
                padding: "32px",
                textAlign: "center",
                color: "#5B9FFF",
              }}
            >
              <div style={{
                width: '64px',
                height: '64px',
                background: 'linear-gradient(135deg, #E6F4FF 0%, #F0F9FF 100%)',
                borderRadius: '16px',
                margin: '0 auto 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(0, 111, 238, 0.1)'
              }}>
                <svg 
                  width="32" 
                  height="32" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#5B9FFF" 
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
              </div>
              <p style={{ 
                fontSize: '16px',
                color: '#003D88',
                fontWeight: '500',
                marginBottom: '8px'
              }}>
                Your cart is empty
              </p>
              <p style={{
                fontSize: '14px',
                color: '#5B9FFF'
              }}>
                Add batteries to get started
              </p>
            </div>
          )}
        </div>

        {/* Payment Info - Moved to bottom as requested */}
        {/* Legal Disclaimer */}
        <div style={{
          marginTop: '32px',
          marginBottom: '32px',
          background: '#FFF7ED',
          border: '1px solid #FED7AA',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <h4 style={{
            fontSize: '16px',
            fontWeight: '700',
            color: '#EA580C',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            IMPORTANT PRODUCT INFORMATION
          </h4>
          <p style={{
            fontSize: '14px',
            color: '#7C2D12',
            lineHeight: '1.6',
            marginBottom: '8px'
          }}>
            <strong>Battery Department LLC is not affiliated with DeWalt® or Stanley Black & Decker.</strong> We are an independent OEM supplier manufacturing our own brand of premium batteries that are compatible with DeWalt® 20V and 60V tools.
          </p>
          <p style={{
            fontSize: '14px',
            color: '#7C2D12',
            lineHeight: '1.6',
            marginBottom: '8px'
          }}>
            <strong>Product Origin:</strong> All batteries are manufactured and shipped from the USA.
          </p>
          <p style={{
            fontSize: '14px',
            color: '#7C2D12',
            lineHeight: '1.6'
          }}>
            <strong>Warranty Coverage:</strong> Our 12-month warranty covers only the batteries we supply. We do not provide warranty coverage for DeWalt® tools. Using our batteries will not void your DeWalt® tool warranty. If any battery becomes faulty within 12 months, we will repair or replace it - no questions asked.
          </p>
        </div>

        <div style={{
          marginTop: '40px',
          paddingTop: '40px',
          borderTop: '1px solid #E6F4FF'
        }}>
          <PaymentLogos />
          

          {/* Customer Support Section - Moved to bottom */}
          <div style={{
            padding: '16px',
            background: '#F0F9FF',
            borderTop: '1px solid #E6F4FF',
            textAlign: 'center',
            borderRadius: '0 0 12px 12px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer'
            }}
            onClick={() => router.push('/customer/chat')}
            >
              <MessageCircle size={16} color="#006FEE" />
              <span style={{
                fontSize: '14px',
                color: '#006FEE',
                fontWeight: '600'
              }}>
                Need help? Chat with Lithi Support
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Cart Panel */}
      {isMobile && showMobileCart && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'flex-end'
        }}
        onClick={() => setShowMobileCart(false)}>
          <div style={{
            background: 'white',
            width: '100%',
            borderRadius: '24px 24px 0 0',
            padding: '24px',
            paddingBottom: '32px',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}
          onClick={(e) => e.stopPropagation()}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#003D88'
              }}>Cart Summary</h3>
              <button
                onClick={() => setShowMobileCart(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '8px',
                  cursor: 'pointer',
                  color: '#5B9FFF'
                }}
              >
                Close
              </button>
            </div>
            
            {Object.entries(quantities).map(([type, quantity]) => {
              if (quantity === 0) return null;
              const batteryType = type as '6Ah' | '9Ah' | '15Ah';
              return (
                <div key={type} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '12px 0',
                  borderBottom: '1px solid #E6F4FF'
                }}>
                  <div>
                    <div style={{ fontWeight: '600', color: '#003D88' }}>
                      {type} Battery
                    </div>
                    <div style={{ fontSize: '14px', color: '#5B9FFF' }}>
                      ${batterySpecs[batteryType].basePrice} x {quantity}
                    </div>
                  </div>
                  <div style={{ fontWeight: '600', color: '#003D88' }}>
                    ${(batterySpecs[batteryType].basePrice * quantity).toFixed(2)}
                  </div>
                </div>
              );
            })}
            
            <div style={{
              marginTop: '24px',
              paddingTop: '24px',
              borderTop: '2px solid #E6F4FF'
            }}>
              {currentDiscountTier >= 0 && (
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '12px'
                }}>
                  <span style={{ color: '#22C55E', fontWeight: '600' }}>
                    {discountTiers[currentDiscountTier].discount} Discount
                  </span>
                  <span style={{ color: '#22C55E', fontWeight: '600' }}>
                    -${discountAmount.toFixed(2)}
                  </span>
                </div>
              )}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '20px',
                fontWeight: '700',
                color: '#003D88'
              }}>
                <span>Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              marginTop: '24px'
            }}>
              <button
                onClick={() => router.push('/customer/payment')}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #006FEE 0%, #0084FF 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '16px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Proceed to Checkout
              </button>
              
              <button
                onClick={() => {
                  // Prepare invoice data
                  const items = Object.entries(quantities)
                    .filter(([_, quantity]) => quantity > 0)
                    .map(([type, quantity]) => {
                      const batteryType = type as '6Ah' | '9Ah' | '15Ah';
                      return {
                        type,
                        quantity,
                        unitPrice: batterySpecs[batteryType].basePrice,
                        originalPrice: retailPrices[batteryType]
                      };
                    });
                  
                  const invoiceData = {
                    items,
                    subtotal: baseTotal,
                    discount: discountAmount,
                    total: finalTotal
                  };
                  
                  // Store in sessionStorage
                  sessionStorage.setItem('invoiceData', JSON.stringify(invoiceData));
                  router.push('/customer/invoice');
                  setShowMobileCart(false);
                }}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '16px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Send Me An Invoice
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Persistent Cart */}
      <PersistentCart 
        quantities={quantities}
        baseTotal={baseTotal}
        discountAmount={discountAmount}
        finalTotal={finalTotal}
        currentDiscountTier={currentDiscountTier}
        discountTiers={discountTiers}
        retailPrices={retailPrices}
        batterySpecs={batterySpecs}
        onCheckout={() => router.push('/customer/payment')}
        onInvoice={() => {
          const items = Object.entries(quantities)
            .filter(([_, quantity]) => quantity > 0)
            .map(([type, quantity]) => {
              const batteryType = type as '6Ah' | '9Ah' | '15Ah';
              return {
                type,
                quantity,
                unitPrice: batterySpecs[batteryType].basePrice,
                originalPrice: retailPrices[batteryType]
              };
            });
          
          const invoiceData = {
            items,
            subtotal: baseTotal,
            discount: discountAmount,
            total: finalTotal
          };
          
          sessionStorage.setItem('invoiceData', JSON.stringify(invoiceData));
          router.push('/customer/invoice');
        }}
        isMobile={isMobile}
      />
    </div>
  );
}