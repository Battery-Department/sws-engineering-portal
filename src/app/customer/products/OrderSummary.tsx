'use client';

import React from 'react';

interface OrderSummaryProps {
  items: {
    type: '6Ah' | '9Ah' | '15Ah';
    quantity: number;
    retailPrice: number;
    discountedPrice: number;
  }[];
  isMobile?: boolean;
}

const DISCOUNT_TIERS = {
  tier1: { threshold: 5000, discount: 0.1, label: '10% discount' },
  tier2: { threshold: 10000, discount: 0.15, label: '15% discount' },
  tier3: { threshold: 20000, discount: 0.2, label: '20% discount' }
};

const OrderSummary: React.FC<OrderSummaryProps> = ({ items, isMobile = false }) => {
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + (item.retailPrice * item.quantity), 0);
  
  // Calculate discount based on subtotal
  let currentDiscount = 0;
  let currentTier = null;
  let nextTier = null;
  
  if (subtotal >= DISCOUNT_TIERS.tier3.threshold) {
    currentDiscount = DISCOUNT_TIERS.tier3.discount;
    currentTier = DISCOUNT_TIERS.tier3;
  } else if (subtotal >= DISCOUNT_TIERS.tier2.threshold) {
    currentDiscount = DISCOUNT_TIERS.tier2.discount;
    currentTier = DISCOUNT_TIERS.tier2;
    nextTier = DISCOUNT_TIERS.tier3;
  } else if (subtotal >= DISCOUNT_TIERS.tier1.threshold) {
    currentDiscount = DISCOUNT_TIERS.tier1.discount;
    currentTier = DISCOUNT_TIERS.tier1;
    nextTier = DISCOUNT_TIERS.tier2;
  } else {
    nextTier = DISCOUNT_TIERS.tier1;
  }
  
  const discountAmount = subtotal * currentDiscount;
  const total = subtotal - discountAmount;
  const savings = discountAmount;
  const savingsPercent = currentDiscount * 100;
  
  // Calculate progress to next tier
  let progressPercent = 0;
  let amountToNextTier = 0;
  
  if (nextTier) {
    const previousThreshold = currentTier ? currentTier.threshold : 0;
    const range = nextTier.threshold - previousThreshold;
    const progress = subtotal - previousThreshold;
    progressPercent = Math.min((progress / range) * 100, 100);
    amountToNextTier = nextTier.threshold - subtotal;
  } else if (currentTier) {
    progressPercent = 100;
  }
  
  if (totalQuantity === 0) {
    return (
      <div style={{
        padding: '16px',
        textAlign: 'center',
        color: '#0A051E',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        <p style={{ fontSize: '14px', color: '#666' }}>
          Your cart is empty. Add batteries to see pricing.
        </p>
      </div>
    );
  }
  
  const summaryContent = (
    <>
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{
          fontSize: '20px',
          fontWeight: 600,
          marginBottom: '16px',
          color: '#0A051E'
        }}>
          Order Summary
        </h3>
        
        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: '#525252', fontSize: '14px' }}>
              Items ({totalQuantity})
            </span>
            <span style={{ color: '#0A051E', fontSize: '14px' }}>
              ${subtotal.toFixed(2)}
            </span>
          </div>
          
          {currentDiscount > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: '#008952', fontSize: '14px', fontWeight: 500 }}>
                Discount ({savingsPercent}%)
              </span>
              <span style={{ color: '#008952', fontSize: '14px', fontWeight: 500 }}>
                -${discountAmount.toFixed(2)}
              </span>
            </div>
          )}
          
          <div style={{
            borderTop: '1px solid #E6E6E6',
            paddingTop: '8px',
            marginTop: '16px',
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <span style={{ color: '#0A051E', fontSize: '18px', fontWeight: 600 }}>
              Total
            </span>
            <span style={{ color: '#0A051E', fontSize: '18px', fontWeight: 600 }}>
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
        
        {savings > 0 && (
          <div style={{
            backgroundColor: '#E6FCF7',
            padding: '12px',
            borderRadius: '8px',
            textAlign: 'center',
            marginBottom: '16px'
          }}>
            <span style={{ color: '#008952', fontSize: '14px', fontWeight: 500 }}>
              You're saving ${savings.toFixed(2)} ({savingsPercent}%)
            </span>
          </div>
        )}
        
        {nextTier && (
          <div style={{ marginBottom: '24px' }}>
            <div style={{
              fontSize: '12px',
              color: '#525252',
              marginBottom: '8px',
              textAlign: 'center'
            }}>
              ${amountToNextTier.toFixed(2)} away from {nextTier.label}
            </div>
            
            <div style={{
              backgroundColor: '#F3F3F3',
              borderRadius: '8px',
              height: '8px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                backgroundColor: '#FCBC19',
                height: '100%',
                width: `${progressPercent}%`,
                transition: 'width 0.3s ease',
                borderRadius: '8px'
              }} />
            </div>
          </div>
        )}
      </div>
      
      <button style={{
        width: '100%',
        padding: '14px',
        backgroundColor: '#FCBC19',
        color: '#000000',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'background-color 0.3s ease'
      }}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F4A400'}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FCBC19'}
      onClick={() => {
        // Trigger confetti if over $1000
        if (total >= 1000) {
          // Confetti effect will be implemented separately
          console.log('🎉 Confetti! Order over $1000');
        }
        console.log('Proceeding to checkout...');
      }}>
        Proceed to Checkout
      </button>
    </>
  );
  
  if (isMobile) {
    return (
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid #E6E6E6',
        padding: '16px',
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        {summaryContent}
      </div>
    );
  }
  
  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      position: 'sticky',
      top: '20px',
      maxWidth: '350px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {summaryContent}
    </div>
  );
};

export default OrderSummary;