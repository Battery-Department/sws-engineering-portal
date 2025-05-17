'use client';

import React, { useState, useEffect } from 'react';
import BatteryCard from './BatteryCard';
import DiscountTierVisualization from './DiscountTierVisualization';
import PaymentLogos from './PaymentLogos';

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
  const [mounted, setMounted] = useState(false);
  const [quantities, setQuantities] = useState({
    '6Ah': 0,
    '9Ah': 0,
    '15Ah': 0
  });
  
  const [isMobile, setIsMobile] = useState(false);
  const [showDiscountTiers, setShowDiscountTiers] = useState(false);
  const [expandedCards, setExpandedCards] = useState<{ [key: string]: boolean }>({});
  
  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
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
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      <meta name="version" content={VERSION.toString()} />
      
      {/* Sidebar */}
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
            }}>
              Chat with Lithi
            </div>
          </div>
        </nav>
      </div>
      
      {/* Main Content */}
      <div style={{
        marginLeft: isMobile ? 0 : '260px',
        flex: 1,
        background: '#F8FAFC',
        minHeight: '100vh',
        width: isMobile ? '100%' : 'calc(100% - 260px)'
      }}>
        {/* Hero Section */}
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

        <h1
          style={{
            fontSize: isMobile ? "28px" : "48px",
            fontWeight: 800,
            margin: "0 0 8px 0",
            lineHeight: 1.2,
          }}
        >
          FlexVolt Battery System
        </h1>

        <p
          style={{
            fontSize: isMobile ? "15px" : "18px",
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

        {/* Payment Logos Ticker */}
        <PaymentLogos />
        
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
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {/* Apple Pay SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 28" width="60" height="28" role="img" aria-label="Apple Pay">
              <rect width="60" height="28" rx="4" fill="#000000"/>
              <path d="M11.98,9.25c-0.35,0-0.89-0.65-1.85-0.65c-1.54,0-2.89,0.96-2.89,2.8c0,1.12,0.47,2.19,1.31,2.92 c0.58,0.54,1.08,1,1.77,1c0.69,0,0.97-0.46,1.89-0.46c0.89,0,1.23,0.46,1.89,0.46c0.7,0,1.19-0.5,1.77-1.04 c0.62-0.58,0.85-1.15,0.89-1.19c-0.04,0-1.73-0.69-1.73-2.61c0-1.65,1.31-2.42,1.39-2.5c-0.35-0.54-1.15-1.19-2.31-1.19 C13.02,6.79,12.33,7.48,11.98,9.25z" fill="#ffffff"/>
              <path d="M10.82,5.96c0.54-0.69,0.93-1.65,0.81-2.61c-0.81,0.04-1.77,0.54-2.35,1.23c-0.5,0.58-0.97,1.54-0.85,2.46 C9.36,7.09,10.28,6.65,10.82,5.96z" fill="#ffffff"/>
              <path d="M21.36,14.97h-1.49l-0.81-2.57h-2.83l-0.77,2.57h-1.45l2.8-8.74h1.77L21.36,14.97z M18.77,11.06l-0.73-2.27 c-0.08-0.23-0.22-0.77-0.42-1.61h-0.03c-0.08,0.35-0.21,0.88-0.4,1.61l-0.71,2.27H18.77z" fill="#ffffff"/>
              <path d="M29.28,11.21c0,1.23-0.33,2.2-1,2.89c-0.6,0.62-1.35,0.93-2.24,0.93c-0.96,0-1.65-0.35-2.07-1.04v3.84h-1.41V9.98 c0-0.68-0.02-1.37-0.05-2.08h1.24l0.08,1c0.42-0.77,1.21-1.15,2.21-1.15c0.86,0,1.58,0.33,2.15,0.99 C28.98,9.39,29.28,10.21,29.28,11.21z M27.83,11.25c0-0.7-0.16-1.28-0.48-1.73c-0.35-0.47-0.82-0.71-1.41-0.71 c-0.4,0-0.76,0.13-1.08,0.4c-0.32,0.27-0.53,0.62-0.62,1.06c-0.05,0.2-0.07,0.37-0.07,0.5v1.19c0,0.52,0.16,0.96,0.48,1.32 c0.32,0.36,0.74,0.54,1.27,0.54c0.61,0,1.08-0.24,1.43-0.71C27.66,12.63,27.83,12.01,27.83,11.25z" fill="#ffffff"/>
              <path d="M37.42,11.21c0,1.23-0.33,2.2-1,2.89c-0.6,0.62-1.35,0.93-2.24,0.93c-0.96,0-1.65-0.35-2.07-1.04v3.84h-1.41V9.98 c0-0.68-0.02-1.37-0.05-2.08h1.24l0.08,1c0.48-0.77,1.21-1.15,2.21-1.15c0.86,0,1.58,0.33,2.15,0.99 C37.11,9.39,37.42,10.21,37.42,11.21z M35.97,11.25c0-0.7-0.16-1.28-0.48-1.73c-0.35-0.47-0.82-0.71-1.41-0.71 c-0.4,0-0.76,0.13-1.08,0.4c-0.32,0.27-0.53,0.62-0.62,1.06c-0.05,0.2-0.07,0.37-0.07,0.5v1.19c0,0.52,0.16,0.96,0.48,1.32 c0.32,0.36,0.74,0.54,1.27,0.54c0.61,0,1.08-0.24,1.43-0.71C35.8,12.63,35.97,12.01,35.97,11.25z" fill="#ffffff"/>
            </svg>
            
            {/* Google Pay SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 28" width="70" height="28" role="img" aria-label="Google Pay">
              <rect width="70" height="28" rx="4" fill="#FFFFFF" stroke="#DDDDDD" stroke-width="1"/>
              <path d="M21.44,14.08c0-0.36-0.03-0.71-0.09-1.04h-5.32v1.97h3.05c-0.13,0.7-0.53,1.3-1.13,1.7v1.41h1.83 C20.95,17.15,21.44,15.73,21.44,14.08z" fill="#4285F4"/>
              <path d="M15.98,19.46c1.53,0,2.81-0.51,3.75-1.37l-1.83-1.42c-0.51,0.34-1.16,0.54-1.92,0.54c-1.48,0-2.73-1-3.17-2.34 h-1.89v1.47C11.84,18.21,13.8,19.46,15.98,19.46z" fill="#34A853"/>
              <path d="M12.81,14.87c-0.11-0.34-0.18-0.7-0.18-1.07c0-0.37,0.06-0.73,0.18-1.07v-1.47h-1.89 c-0.39,0.77-0.61,1.64-0.61,2.55c0,0.91,0.22,1.77,0.61,2.55L12.81,14.87z" fill="#FBBC05"/>
              <path d="M15.98,10.39c0.83,0,1.58,0.29,2.17,0.85l1.62-1.62c-0.98-0.91-2.26-1.47-3.79-1.47c-2.18,0-4.14,1.25-5.06,3.12 l1.89,1.47C13.25,11.39,14.5,10.39,15.98,10.39z" fill="#EA4335"/>
              <path d="M28.47,16.11h-2.61V9.39h2.61c1.97,0,3.57,1.44,3.57,3.36S30.44,16.11,28.47,16.11z M28.47,10.58h-1.27v4.33h1.27 c1.16,0,2.11-0.9,2.11-2.17S29.64,10.58,28.47,10.58z" fill="#5F6368"/>
              <path d="M35.32,11.92c-0.99,0-1.8,0.75-1.8,1.77c0,1.02,0.81,1.77,1.8,1.77c0.99,0,1.8-0.75,1.8-1.77 C37.12,12.67,36.32,11.92,35.32,11.92z M35.32,14.43c-0.37,0-0.69-0.3-0.69-0.74c0-0.44,0.32-0.74,0.69-0.74 c0.38,0,0.69,0.3,0.69,0.74C36.01,14.13,35.7,14.43,35.32,14.43z" fill="#5F6368"/>
              <path d="M40.96,11.92c-0.99,0-1.8,0.75-1.8,1.77c0,1.02,0.81,1.77,1.8,1.77c0.99,0,1.8-0.75,1.8-1.77 C42.76,12.67,41.95,11.92,40.96,11.92z M40.96,14.43c-0.37,0-0.69-0.3-0.69-0.74c0-0.44,0.32-0.74,0.69-0.74 c0.38,0,0.69,0.3,0.69,0.74C41.65,14.13,41.33,14.43,40.96,14.43z" fill="#5F6368"/>
              <path d="M46.56,12.02v0.66h1.58c-0.05,0.37-0.17,0.64-0.37,0.82c-0.23,0.23-0.6,0.49-1.22,0.49c-0.97,0-1.74-0.79-1.74-1.76 c0-0.97,0.76-1.76,1.74-1.76c0.53,0,0.91,0.21,1.19,0.48l0.47-0.47c-0.4-0.38-0.92-0.67-1.65-0.67c-1.33,0-2.45,1.09-2.45,2.43 c0,1.34,1.11,2.43,2.45,2.43c0.72,0,1.26-0.24,1.69-0.68c0.44-0.44,0.57-1.05,0.57-1.54c0-0.15-0.01-0.29-0.04-0.41H46.56z" fill="#5F6368"/>
            </svg>
            
            {/* Visa SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 28" width="60" height="28" role="img" aria-label="Visa">
              <rect width="60" height="28" rx="4" fill="#1434CB"/>
              <path d="M24.19,10.06l-3.63,8.58h-2.37l-1.78-6.9c-0.11-0.42-0.2-0.58-0.53-0.76c-0.54-0.29-1.42-0.57-2.2-0.74l0.05-0.19h3.8 c0.48,0,0.92,0.32,1.03,0.88l0.94,5l2.32-5.88H24.19z" fill="#FFFFFF"/>
              <path d="M31.16,15.19c0.01-2.3-3.17-2.42-3.15-3.45c0.01-0.31,0.3-0.64,0.95-0.73c0.32-0.04,1.21-0.08,2.22,0.41l0.39-1.85 c-0.54-0.2-1.24-0.39-2.11-0.39c-2.23,0-3.8,1.19-3.81,2.88c-0.01,1.25,1.12,1.95,1.98,2.37c0.88,0.43,1.17,0.7,1.17,1.08 c-0.01,0.58-0.7,0.84-1.35,0.85c-1.13,0.02-1.79-0.31-2.32-0.55l-0.41,1.92c0.53,0.24,1.5,0.45,2.51,0.46 C29.5,18.19,31.15,17.01,31.16,15.19z" fill="#FFFFFF"/>
              <path d="M35.08,18.64h2.1l-1.84-8.58h-1.94c-0.44,0-0.8,0.25-0.97,0.64l-3.39,7.94h2.39l0.47-1.3h2.89L35.08,18.64z M33.33,15.68 l1.18-3.26l0.68,3.26H33.33z" fill="#FFFFFF"/>
              <path d="M42.43,10.06l-1.87,8.58h-2.28l1.87-8.58H42.43z" fill="#FFFFFF"/>
            </svg>
            
            {/* Amazon Pay SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 28" width="70" height="28" role="img" aria-label="Amazon Pay">
              <rect width="70" height="28" rx="4" fill="#FF9900"/>
              <path d="M19.84,17.51c-1.82,1.34-4.45,2.06-6.73,2.06c-3.18,0-6.04-1.18-8.21-3.13c-0.17-0.15-0.02-0.36,0.19-0.24 c2.34,1.36,5.23,2.18,8.22,2.18c2.01,0,4.23-0.42,6.27-1.28C19.89,17,20.15,17.29,19.84,17.51z" fill="#FFFFFF"/>
              <path d="M20.73,16.49c-0.23-0.3-1.53-0.14-2.12-0.07c-0.18,0.02-0.2-0.13-0.04-0.25c1.04-0.73,2.74-0.52,2.94-0.27 c0.2,0.24-0.05,1.94-1.03,2.75c-0.15,0.12-0.29,0.06-0.22-0.11C20.47,18.12,20.96,16.79,20.73,16.49z" fill="#FFFFFF"/>
              <path d="M31.36,10.21c0,1.01-0.27,1.52-0.82,1.52c-0.59,0-0.89-0.43-0.89-1.28c0-1.34,0.68-1.79,1.71-1.79V10.21z M33.52,12.84c-0.14,0.13-0.35,0.14-0.51,0.05c-0.72-0.59-0.85-0.87-1.24-1.44c-1.19,1.21-2.03,1.58-3.57,1.58 c-1.82,0-3.24-1.13-3.24-3.38c0-1.76,0.95-2.96,2.31-3.54c1.18-0.51,2.82-0.6,4.08-0.74V5.04c0-0.51,0.04-1.11-0.26-1.55 c-0.26-0.39-0.75-0.55-1.19-0.55c-0.81,0-1.52,0.41-1.7,1.27c-0.04,0.19-0.18,0.38-0.37,0.39l-2.09-0.22 c-0.18-0.04-0.37-0.18-0.32-0.45C25.74,2.1,27.49,1.15,29.44,1.15c0.95,0,2.2,0.25,2.95,0.98c0.95,0.91,0.86,2.12,0.86,3.44v3.12 c0,0.94,0.39,1.35,0.75,1.86c0.13,0.18,0.16,0.4-0.01,0.53C33.85,12.66,33.66,12.71,33.52,12.84z" fill="#FFFFFF"/>
              <path d="M43.75,10.21c0,1.01-0.27,1.52-0.82,1.52c-0.59,0-0.89-0.43-0.89-1.28c0-1.34,0.68-1.79,1.71-1.79V10.21z M45.91,12.84c-0.14,0.13-0.35,0.14-0.51,0.05c-0.72-0.59-0.85-0.87-1.24-1.44c-1.19,1.21-2.03,1.58-3.57,1.58 c-1.82,0-3.24-1.13-3.24-3.38c0-1.76,0.95-2.96,2.31-3.54c1.18-0.51,2.82-0.6,4.08-0.74V5.04c0-0.51,0.04-1.11-0.26-1.55 c-0.26-0.39-0.75-0.55-1.19-0.55c-0.81,0-1.52,0.41-1.7,1.27c-0.04,0.19-0.18,0.38-0.37,0.39l-2.09-0.22 c-0.18-0.04-0.37-0.18-0.32-0.45C38.13,2.1,39.88,1.15,41.83,1.15c0.95,0,2.2,0.25,2.95,0.98c0.95,0.91,0.86,2.12,0.86,3.44v3.12 c0,0.94,0.39,1.35,0.75,1.86c0.13,0.18,0.16,0.4-0.01,0.53C46.24,12.66,46.05,12.71,45.91,12.84z" fill="#FFFFFF"/>
              <path d="M52.44,13.81h-2.42l2.46-9.15h2.83c1.35,0,2.24,0.28,2.65,0.85c0.31,0.43,0.39,1.04,0.23,1.86 c-0.37,1.87-1.57,2.94-3.28,2.94h-1.48L52.44,13.81z M54.73,6.35l-0.72,2.7h1.15c0.87,0,1.51-0.47,1.71-1.25 c0.09-0.36,0.05-0.61-0.12-0.77c-0.17-0.16-0.49-0.25-0.91-0.25h-0.82V6.35z" fill="#FFFFFF"/>
              <path d="M62.45,10.21c0,1.01-0.27,1.52-0.82,1.52c-0.59,0-0.89-0.43-0.89-1.28c0-1.34,0.68-1.79,1.71-1.79V10.21z M64.61,12.84c-0.14,0.13-0.35,0.14-0.51,0.05c-0.72-0.59-0.85-0.87-1.24-1.44c-1.19,1.21-2.03,1.58-3.57,1.58 c-1.82,0-3.24-1.13-3.24-3.38c0-1.76,0.95-2.96,2.31-3.54c1.18-0.51,2.82-0.6,4.08-0.74V5.04c0-0.51,0.04-1.11-0.26-1.55 c-0.26-0.39-0.75-0.55-1.19-0.55c-0.81,0-1.52,0.41-1.7,1.27c-0.04,0.19-0.18,0.38-0.37,0.39l-2.09-0.22 c-0.18-0.04-0.37-0.18-0.32-0.45C56.84,2.1,58.58,1.15,60.53,1.15c0.95,0,2.2,0.25,2.95,0.98c0.95,0.91,0.86,2.12,0.86,3.44v3.12 c0,0.94,0.39,1.35,0.75,1.86c0.13,0.18,0.16,0.4-0.01,0.53C64.94,12.66,64.75,12.71,64.61,12.84z" fill="#FFFFFF"/>
              <path d="M66.35,13.68l1.48-5.56c0.46-1.71,0.76-2.97,0.99-3.78h2.18l-0.26,1.21c0.71-0.95,1.61-1.39,2.79-1.39 c0.06,0,0.11,0,0.16,0.01l-0.54,2.02c-0.11-0.02-0.22-0.03-0.34-0.03c-1.13,0-1.95,0.76-2.29,2.04l-1.26,4.72h-2.42V13.68z" fill="#FFFFFF"/>
            </svg>
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
      </div>
    </div>
  );
}