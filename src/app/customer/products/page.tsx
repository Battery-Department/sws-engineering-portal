'use client';

import React, { useState, useEffect } from 'react';
import BatteryCard from './BatteryCard';
import OrderSummary from './OrderSummary';
import DiscountTierVisualization from './DiscountTierVisualization';
import PaymentLogos from './PaymentLogos';
import { EditableContent } from '@/components/EditableContent';
import { EditModeToggle } from '@/components/EditModeToggle';

// Global styles to hide number input arrows
const globalStyles = `
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
    margin: 0 !important;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield !important;
    appearance: textfield !important;
  }
`;

// Retail prices for comparison (DO NOT CHANGE)
const retailPrices = { "6Ah": 169, "9Ah": 249, "15Ah": 379 };

// Battery specifications (DO NOT CHANGE)
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

// Discount tiers (DO NOT CHANGE)
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
  const [quantities, setQuantities] = useState({
    '6Ah': 0,
    '9Ah': 0,
    '15Ah': 0
  });
  
  const [isMobile, setIsMobile] = useState(false);
  const [showDiscountTiers, setShowDiscountTiers] = useState(false);
  const [expandedCards, setExpandedCards] = useState<{ [key: string]: boolean }>({});
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const handleQuantityChange = (type: '6Ah' | '9Ah' | '15Ah', quantity: number) => {
    setQuantities(prev => ({
      ...prev,
      [type]: quantity
    }));
  };
  
  // Calculate totals with actual base prices
  const baseTotal = Object.entries(quantities).reduce((total, [type, quantity]) => {
    const batteryType = type as '6Ah' | '9Ah' | '15Ah';
    return total + (batterySpecs[batteryType].basePrice * quantity);
  }, 0);
  
  // Calculate totals based on retail prices for comparison
  const retailTotal = Object.entries(quantities).reduce((total, [type, quantity]) => {
    const batteryType = type as '6Ah' | '9Ah' | '15Ah';
    return total + (retailPrices[batteryType] * quantity);
  }, 0);
  
  // Determine the current discount tier
  let currentDiscountTier = -1;
  for (let i = discountTiers.length - 1; i >= 0; i--) {
    if (baseTotal >= discountTiers[i].threshold) {
      currentDiscountTier = i;
      break;
    }
  }
  
  // Calculate final prices
  const discountRate = currentDiscountTier >= 0 ? discountTiers[currentDiscountTier].discountRate : 0;
  const discountAmount = baseTotal * discountRate;
  const finalTotal = baseTotal - discountAmount;
  
  // Calculate savings
  const totalSavings = retailTotal - finalTotal;
  const savingsPercentage = retailTotal > 0 ? (totalSavings / retailTotal) * 100 : 0;
  
  const hasItems = Object.values(quantities).some(quantity => quantity > 0);
  
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
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      display: 'flex'
    }}>
      {/* Inject global styles */}
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      
      {/* Enhanced Sidebar Navigation */}
      <div style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '260px',
        height: '100vh',
        background: 'linear-gradient(180deg, #E6F4FF 0%, #DEEEFF 50%, #EFF8FF 100%)',
        borderRight: '1px solid rgba(0, 111, 238, 0.1)',
        padding: '24px',
        overflowY: 'auto',
        boxShadow: '4px 0 16px rgba(0, 111, 238, 0.05)',
        zIndex: 10,
        display: isMobile ? 'none' : 'block'
      }}>
        <div style={{
          marginBottom: '32px',
          textAlign: 'center'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            background: 'linear-gradient(135deg, #006FEE 0%, #0084FF 100%)',
            borderRadius: '16px',
            margin: '0 auto 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0, 111, 238, 0.3)'
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M13 2L3 14h9l-1 8L21 10h-9l1-8z" />
            </svg>
          </div>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '700',
            color: '#003D88',
            marginBottom: '4px'
          }}>Battery Hub</h2>
          <p style={{
            fontSize: '14px',
            color: '#5B9FFF',
            fontWeight: '500'
          }}>FlexVolt System</p>
        </div>
        
        <nav style={{ marginTop: '24px' }}>
          <div style={{ marginBottom: '8px' }}>
            <div style={{
              padding: '12px 16px',
              borderRadius: '10px',
              background: 'rgba(0, 111, 238, 0.08)',
              color: '#006FEE',
              fontSize: '14px',
              fontWeight: '600',
              border: '1px solid rgba(0, 111, 238, 0.15)',
              marginBottom: '6px',
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}>
              Products
            </div>
            <div style={{
              padding: '12px 16px',
              borderRadius: '10px',
              color: '#5B9FFF',
              fontSize: '14px',
              fontWeight: '500',
              marginBottom: '6px',
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0, 111, 238, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}>
              Orders
            </div>
            <div style={{
              padding: '12px 16px',
              borderRadius: '10px',
              color: '#5B9FFF',
              fontSize: '14px',
              fontWeight: '500',
              marginBottom: '6px',
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0, 111, 238, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}>
              Favorites
            </div>
            <div style={{
              padding: '12px 16px',
              borderRadius: '10px',
              color: '#5B9FFF',
              fontSize: '14px',
              fontWeight: '500',
              marginBottom: '6px',
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0, 111, 238, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}>
              Payment
            </div>
            <div style={{
              padding: '12px 16px',
              borderRadius: '10px',
              color: '#5B9FFF',
              fontSize: '14px',
              fontWeight: '500',
              marginBottom: '6px',
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0, 111, 238, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}>
              Chat with Lithi
            </div>
          </div>
        </nav>
      </div>
      
      {/* Main Content Area */}
      <div style={{
        marginLeft: isMobile ? 0 : '260px',
        flex: 1,
        background: '#F8FAFC',
        minHeight: '100vh',
        width: isMobile ? '100%' : 'calc(100% - 260px)'
      }}>
        {/* Enhanced Hero Section */}
        <div
          style={{
            background: "linear-gradient(135deg, #0048AC 0%, #006FEE 50%, #0084FF 100%)",
            color: "white",
            padding: "32px",
            textAlign: "center",
            borderRadius: "0 0 24px 24px",
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

        <EditableContent
          contentKey="hero-title"
          tag="h1"
          style={{
            fontSize: isMobile ? "28px" : "48px",
            fontWeight: 800,
            margin: "0 0 8px 0",
            lineHeight: 1.2,
          }}
        >
          FlexVolt Battery System
        </EditableContent>

        <EditableContent
          contentKey="hero-subtitle"
          tag="p"
          style={{
            fontSize: isMobile ? "15px" : "18px",
            maxWidth: "600px",
            margin: "0 auto 16px auto",
            lineHeight: 1.5,
            opacity: 0.9,
          }}
        >
          Professional portable power solutions with up to 45% savings compared to retail
        </EditableContent>
        
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

        {/* Payment Logos Ticker */}
        <PaymentLogos />
        
        {/* Trust Badges */}
        <div style={{
          background: 'white',
          padding: '16px',
          borderBottom: '1px solid #F0F9FF',
          display: 'flex',
          justifyContent: 'center',
          gap: '32px',
          flexWrap: 'wrap'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#5B9FFF',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5B9FFF" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span>100% DeWalt Compatible</span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#5B9FFF',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5B9FFF" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>Same-Day Shipping</span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#5B9FFF',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5B9FFF" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            <span>12-Month Warranty</span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#5B9FFF',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5B9FFF" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            <span>SECURE CHECKOUT</span>
          </div>
        </div>
        
        {/* Payment Method Icons */}
        <div style={{
          padding: '12px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '16px',
          background: '#F8FAFC',
          borderBottom: '1px solid #E6F4FF'
        }}>
          <span style={{ fontSize: '14px', color: '#6B7280', marginRight: '8px' }}>
            Your payment information is encrypted and secure. We accept all major payment methods.
          </span>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {/* Apple Pay icon */}
            <div style={{ padding: '4px', color: '#000' }}>
              <svg width="36" height="24" viewBox="0 0 40 20" fill="currentColor">
                <path d="M7.91 2.62c-0.38 0.48-1 0.8-1.61 0.75-0.08-0.63 0.28-1.29 0.64-1.7 0.38-0.44 1.03-0.76 1.57-0.78 0.07 0.63-0.23 1.24-0.6 1.73zm0.6 0.87c-0.89-0.06-1.65 0.53-2.07 0.53-0.42 0-1.08-0.5-1.77-0.49-0.91 0.02-1.75 0.56-2.22 1.42-0.95 1.72-0.25 4.27 0.68 5.67 0.45 0.69 0.99 1.46 1.7 1.43 0.68-0.03 0.94-0.44 1.76-0.44 0.82 0 1.05 0.44 1.77 0.43 0.73-0.01 1.2-0.7 1.65-1.39 0.52-0.8 0.73-1.57 0.74-1.61-0.02-0.01-1.42-0.57-1.44-2.26-0.01-1.41 1.12-2.09 1.17-2.13-0.64-0.98-1.64-1.09-1.99-1.12-0.89-0.03-1.57 0.5-1.98 0.5z"/>
              </svg>
            </div>
            {/* Visa icon */}
            <div style={{ width: '40px', height: '24px', background: '#1A1F71', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '10px', fontWeight: 'bold' }}>
              VISA
            </div>
            {/* Mastercard icon */}
            <div style={{ width: '40px', height: '24px', display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#EB001B', marginRight: '-4px' }}></div>
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#F79E1B' }}></div>
            </div>
            {/* American Express icon */}
            <div style={{ width: '40px', height: '24px', background: '#006FCF', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '8px', fontWeight: 'bold' }}>
              AMEX
            </div>
          </div>
        </div>

        <div style={{
          maxWidth: '100%',
          padding: isMobile ? '16px' : '32px 48px',
          paddingBottom: '32px',
          paddingTop: '0'
        }}>
          {/* Battery Cards Grid - 3 in a row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '24px',
            marginTop: '32px',
            marginBottom: '32px',
            maxWidth: '1400px',
            margin: '32px auto'
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
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 4px 12px rgba(0, 111, 238, 0.08)',
            maxWidth: '1400px',
            margin: '0 auto 24px'
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
                  Total: {Object.values(quantities).reduce((a, b) => a + b, 0)} items
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
              textAlign: 'right'
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
          
          {/* Discount Tier Visualization */}
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto'
          }}>
            <DiscountTierVisualization 
              currentTotal={baseTotal} 
              discountTiers={discountTiers}
              showDiscountTiers={showDiscountTiers}
              setShowDiscountTiers={setShowDiscountTiers}
            />
          </div>
          
          {/* Order Summary and Checkout Section */}
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "16px",
              padding: "24px",
              marginTop: "24px",
              border: "1px solid #E2E8F0",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.04)",
              maxWidth: '1400px',
              margin: '24px auto 0'
            }}
          >
            {hasItems ? (
              <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "14px",
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
                  Total ({Object.values(quantities).reduce((a, b) => a + b, 0)} items)
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

              <div style={{ textAlign: "right" }}>
                {currentDiscountTier >= 0 && (
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#22C55E",
                      marginBottom: "2px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
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

            {/* Enhanced Discount Progress Bar */}
            <div style={{ marginBottom: "16px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "6px",
                  fontSize: "13px",
                  color: "#64748B",
                }}
              >
                <div style={{
                  color: currentDiscountTier < 2 ? "#006FEE" : "#22C55E",
                  fontWeight: 500,
                }}>
                  {currentDiscountTier === -1
                    ? `Add $${(1000 - baseTotal).toFixed(0)} for 10% discount`
                    : currentDiscountTier === 0
                      ? `Add $${(2500 - baseTotal).toFixed(0)} for 15% discount`
                      : currentDiscountTier === 1
                        ? `Add $${(5000 - baseTotal).toFixed(0)} for 20% discount`
                        : "Maximum discount reached!"}
                </div>
                <div style={{ fontWeight: 500 }}>
                  ${baseTotal.toFixed(0)}
                  {currentDiscountTier < 2 && (
                    <span>
                      {" "}/ ${currentDiscountTier === -1
                        ? "1,000"
                        : currentDiscountTier === 0
                          ? "2,500"
                          : "5,000"
                      }
                    </span>
                  )}
                </div>
              </div>

              <div
                style={{
                  height: "8px",
                  background: "rgba(226, 232, 240, 0.6)",
                  borderRadius: "4px",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                {/* Background Track with Tier Markers */}
                <div style={{
                  position: "absolute",
                  left: "20%",
                  top: 0,
                  height: "100%",
                  width: "2px",
                  background: "rgba(255,255,255,0.7)",
                  zIndex: 2,
                }}></div>
                <div style={{
                  position: "absolute",
                  left: "50%",
                  top: 0,
                  height: "100%",
                  width: "2px",
                  background: "rgba(255,255,255,0.7)",
                  zIndex: 2,
                }}></div>
                
                {/* Progress Fill */}
                <div
                  style={{
                    height: "100%",
                    width:
                      currentDiscountTier === 2
                        ? "100%"
                        : currentDiscountTier === 1
                          ? `${Math.min((baseTotal / 5000) * 100, 100)}%`
                          : currentDiscountTier === 0
                            ? `${Math.min((baseTotal / 2500) * 100, 100)}%`
                            : `${Math.min((baseTotal / 1000) * 100, 100)}%`,
                    background: currentDiscountTier >= 0
                      ? discountTiers[currentDiscountTier].color
                      : "#5B9FFF",
                    borderRadius: "4px",
                    transition: "width 0.3s ease",
                  }}
                ></div>
              </div>
              
              {/* Tier labels under progress bar */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "4px",
                paddingLeft: "3px",
                paddingRight: "3px",
              }}>
                <div style={{
                  fontSize: "10px", 
                  color: baseTotal >= 1000 ? discountTiers[0].color : "#64748B",
                  fontWeight: baseTotal >= 1000 ? 600 : 400,
                }}>10%</div>
                <div style={{
                  fontSize: "10px", 
                  color: baseTotal >= 2500 ? discountTiers[1].color : "#64748B",
                  fontWeight: baseTotal >= 2500 ? 600 : 400,
                }}>15%</div>
                <div style={{
                  fontSize: "10px", 
                  color: baseTotal >= 5000 ? discountTiers[2].color : "#64748B",
                  fontWeight: baseTotal >= 5000 ? 600 : 400,
                }}>20%</div>
              </div>
            </div>

                <button
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#0059D1";
                    e.currentTarget.style.transform = "translateY(-1px)";
                    e.currentTarget.style.boxShadow = "0 6px 16px rgba(0, 111, 238, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#006FEE";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 111, 238, 0.2)";
                  }}
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
                    transform: "translateY(0)",
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
                
                {/* Secure Checkout Trust Section */}
                <div style={{
                  marginTop: '20px',
                  textAlign: 'center',
                  color: '#5B9FFF',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  flexWrap: 'wrap',
                  padding: '16px 0',
                  borderTop: '1px solid #F0F9FF'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B9FFF" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                    <span>Secure Checkout</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B9FFF" strokeWidth="2">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                      <line x1="1" y1="10" x2="23" y2="10"></line>
                    </svg>
                    <span>All Major Cards Accepted</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B9FFF" strokeWidth="2">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <span>100% Satisfaction Guarantee</span>
                  </div>
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
        </div>
        
        {/* Edit Mode Toggle */}
        <EditModeToggle />
      </div>
    </div>
  );
}