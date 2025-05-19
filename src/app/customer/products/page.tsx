'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BatteryCard from './BatteryCard';
import DiscountTierVisualization from './DiscountTierVisualization';
import PaymentLogos from './PaymentLogos';
import { ShoppingCart, MessageCircle, ArrowLeft, Menu, Home, User } from 'lucide-react';

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
      
      {/* Hero Section */}
      <div
        style={{
          background: "linear-gradient(135deg, #0048AC 0%, #006FEE 50%, #0084FF 100%)",
          color: "white",
          padding: isMobile ? "24px 16px" : "32px",
          textAlign: "center",
          borderRadius: isMobile ? "0" : "0 0 24px 24px",
          boxShadow: "0 8px 24px rgba(0, 111, 238, 0.15)",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: `rgba(255, 255, 255, 0.15)`,
            padding: "6px 12px",
            borderRadius: "100px",
            marginBottom: "16px",
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
            Bulk discounts up to 20% off
          </span>
        </div>

        <h1
          style={{
            fontSize: isMobile ? "32px" : "48px",
            fontWeight: 800,
            margin: "0 0 8px 0",
            lineHeight: 1.2,
          }}
        >
          FlexVolt Battery System
        </h1>

        <p
          style={{
            fontSize: isMobile ? "16px" : "18px",
            maxWidth: "600px",
            margin: "0 auto 16px auto",
            lineHeight: 1.5,
            opacity: 0.9,
          }}
        >
          Professional portable power solutions with up to 45% savings compared to retail
        </p>
        
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "12px",
          flexWrap: "wrap",
          marginTop: "12px",
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "13px",
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span>100% DeWalt Compatible</span>
          </div>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "13px",
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>Same-Day Shipping</span>
          </div>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "13px",
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            <span>12-Month Warranty</span>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div style={{
        padding: isMobile ? '16px' : '32px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>

        {/* Battery Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
          gap: isMobile ? '16px' : '24px',
          marginBottom: '32px'
        }}>
          {Object.entries(batterySpecs).map(([type, specs]) => {
            const batteryType = type as '6Ah' | '9Ah' | '15Ah';
            return (
              <BatteryCard
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
          padding: '20px',
          marginBottom: '24px',
          boxShadow: '0 4px 12px rgba(0, 111, 238, 0.08)'
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
        
        {/* Discount Tier Visualization */}
        <DiscountTierVisualization 
          currentTotal={baseTotal} 
          discountTiers={discountTiers}
          showDiscountTiers={showDiscountTiers}
          setShowDiscountTiers={setShowDiscountTiers}
        />
        
        {/* Responsive Discount Tiers Section */}
        <div
          style={{
            marginTop: "15px",
            marginBottom: "25px",
            background: isMobile ? "transparent" : "linear-gradient(to right, #F8FAFC, #F0F9FF)",
            padding: "16px",
            borderRadius: "8px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "space-between",
              gap: isMobile ? "12px" : "16px",
              position: "relative"
            }}
          >
            {discountTiers.map((tier, index) => {
              const isActive = currentDiscountTier === index;
              const tierOpacity = isActive ? 1 : 0.7;
              const borderColor = isActive ? tier.color : "#E6F4FF";
              const bgIntensity = index === 0 ? "rgba(91, 159, 255, 0.05)" : 
                                 index === 1 ? "rgba(0, 111, 238, 0.08)" : 
                                 "rgba(0, 72, 172, 0.1)";
              
              return (
                <React.Fragment key={index}>
                  {/* Desktop Vertical Divider */}
                  {!isMobile && index > 0 && (
                    <div
                      style={{
                        width: "1px",
                        background: "#E2E8F0",
                        alignSelf: "stretch",
                        margin: "0 -8px"
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
                      flex: 1,
                      padding: isMobile ? "12px" : "16px",
                      background: isMobile ? "white" : bgIntensity,
                      borderRadius: "8px",
                      border: isMobile ? `1px solid ${borderColor}` : "none",
                      boxShadow: isMobile && isActive ? "0 2px 8px rgba(0, 111, 238, 0.1)" : "none",
                      position: "relative",
                      opacity: tierOpacity,
                      transition: "all 0.3s ease"
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
                    
                    {/* Checkmark for Active Tier */}
                    {isActive && (
                      <div
                        style={{
                          position: "absolute",
                          top: "12px",
                          right: "12px",
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          background: tier.color,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      </div>
                    )}
                    
                    <div
                      style={{
                        display: "flex",
                        flexDirection: isMobile ? "row" : "column",
                        justifyContent: isMobile ? "space-between" : "flex-start",
                        alignItems: isMobile ? "center" : "stretch",
                        marginBottom: isMobile ? "0" : "8px"
                      }}
                    >
                      <div
                        style={{
                          fontSize: isMobile ? "16px" : "14px",
                          fontWeight: 600,
                          color: isActive ? tier.color : "#003D88",
                          marginBottom: isMobile ? "0" : "4px"
                        }}
                      >
                        ${tier.threshold.toLocaleString()}+
                      </div>
                      <div
                        style={{
                          fontSize: isMobile ? "18px" : "24px",
                          fontWeight: 700,
                          color: tier.color
                        }}
                      >
                        {tier.discount}
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        color: "#5B9FFF",
                        marginTop: isMobile ? "4px" : "0",
                        whiteSpace: isMobile ? "nowrap" : "normal",
                        overflow: isMobile ? "hidden" : "visible",
                        textOverflow: isMobile ? "ellipsis" : "clip"
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
            borderRadius: "16px",
            padding: "24px",
            marginTop: "24px",
            border: "1px solid #E2E8F0",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.04)"
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

              <button
                onClick={() => router.push('/customer/payment')}
                style={{
                  width: "100%",
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
                  transition: "all 0.2s ease",
                  marginTop: "20px"
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
            
            <button
              onClick={() => router.push('/customer/payment')}
              style={{
                width: '100%',
                marginTop: '24px',
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
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}