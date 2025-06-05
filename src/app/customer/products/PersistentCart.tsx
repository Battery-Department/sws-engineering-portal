'use client';

import React, { useEffect, useState } from 'react';
import { ShoppingCart, X, ChevronDown, ChevronUp } from 'lucide-react';

interface PersistentCartProps {
  hours: { [key: string]: number };
  baseTotal: number;
  discountAmount: number;
  finalTotal: number;
  currentDiscountTier: number;
  discountTiers: any[];
  standardRates: { [key: string]: number };
  serviceSpecs: { [key: string]: any };
  onCheckout: () => void;
  onInvoice: () => void;
  isMobile: boolean;
}

const PersistentCart: React.FC<PersistentCartProps> = ({
  hours,
  baseTotal,
  discountAmount,
  finalTotal,
  currentDiscountTier,
  discountTiers,
  standardRates,
  serviceSpecs,
  onCheckout,
  onInvoice,
  isMobile
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const totalHours = Object.values(hours).reduce((a, b) => a + b, 0);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isScrolled || isMobile || totalHours === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      background: 'white',
      borderRadius: '16px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      border: '1px solid #FED7AA',
      width: '320px',
      zIndex: 100,
      transition: 'all 0.3s ease',
      transform: isExpanded ? 'translateY(0)' : 'translateY(calc(100% - 70px))'
    }}>
      {/* Cart Header */}
      <div
        style={{
          padding: '16px',
          borderBottom: isExpanded ? '1px solid #FED7AA' : 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            position: 'relative'
          }}>
            <ShoppingCart size={24} color="#D97706" />
            <div style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              background: '#D97706',
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
              {totalHours}
            </div>
          </div>
          <div>
            <div style={{
              fontSize: '16px',
              fontWeight: '700',
              color: '#92400E'
            }}>
              ${finalTotal.toFixed(2)}
            </div>
            {currentDiscountTier >= 0 && (
              <div style={{
                fontSize: '12px',
                color: '#059669',
                fontWeight: '500'
              }}>
                {discountTiers[currentDiscountTier].discount} applied
              </div>
            )}
          </div>
        </div>
        {isExpanded ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
      </div>

      {/* Cart Details */}
      {isExpanded && (
        <>
          <div style={{
            maxHeight: '300px',
            overflowY: 'auto',
            padding: '16px'
          }}>
            {Object.entries(hours).map(([serviceType, serviceHours]) => {
              if (serviceHours === 0) return null;
              const serviceKey = serviceType as keyof typeof serviceSpecs;
              const savings = ((standardRates[serviceType] - serviceSpecs[serviceKey].hourlyRate) / standardRates[serviceType]) * 100;
              
              return (
                <div key={serviceType} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingBottom: '12px',
                  marginBottom: '12px',
                  borderBottom: '1px solid #F3F4F6'
                }}>
                  <div>
                    <div style={{
                      fontWeight: '600',
                      color: '#92400E',
                      marginBottom: '4px'
                    }}>
                      {serviceSpecs[serviceKey].name} × {serviceHours}h
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: '#059669'
                    }}>
                      Save {Math.round(savings)}% vs standard rate
                    </div>
                  </div>
                  <div style={{
                    textAlign: 'right'
                  }}>
                    <div style={{
                      fontWeight: '600',
                      color: '#92400E'
                    }}>
                      ${(serviceSpecs[serviceKey].hourlyRate * serviceHours).toFixed(2)}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: '#64748B',
                      textDecoration: 'line-through'
                    }}>
                      ${(standardRates[serviceType] * serviceHours).toFixed(2)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Totals */}
          <div style={{
            padding: '16px',
            borderTop: '1px solid #FED7AA',
            background: '#FFFBEB'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '8px'
            }}>
              <span style={{ color: '#64748B' }}>Subtotal</span>
              <span style={{ color: '#92400E' }}>${baseTotal.toFixed(2)}</span>
            </div>
            {currentDiscountTier >= 0 && (
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '8px',
                color: '#059669',
                fontWeight: '600'
              }}>
                <span>Volume Discount</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingTop: '8px',
              borderTop: '1px solid #FED7AA',
              fontWeight: '700',
              fontSize: '18px',
              color: '#92400E'
            }}>
              <span>Total</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{
            padding: '16px',
            display: 'flex',
            gap: '12px'
          }}>
            <button
              onClick={onCheckout}
              style={{
                flex: 1,
                background: 'linear-gradient(135deg, #D97706 0%, #F59E0B 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(217, 119, 6, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Request Quote
            </button>
            <button
              onClick={onInvoice}
              style={{
                flex: 1,
                background: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(5, 150, 105, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Get Estimate
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PersistentCart;