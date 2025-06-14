'use client';

import React from 'react';

const PaymentLogos = () => {
  // Using SVG icons for payment methods with corrected designs
  const paymentMethods = [
    {
      name: 'Apple Pay',
      svg: (
        <svg viewBox="0 0 50 24" width="50" height="24" fill="none">
          <rect width="50" height="24" rx="4" fill="#000000"/>
          <path d="M13.745 6.306c0.368-0.443 0.617-1.058 0.548-1.673-0.532 0.022-1.178 0.355-1.558 0.798-0.343 0.393-0.642 1.022-0.561 1.625 0.596 0.046 1.201-0.307 1.571-0.75z" fill="white"/>
          <path d="M14.289 7.057c-0.872-0.051-1.61 0.495-2.025 0.495-0.415 0-1.056-0.469-1.734-0.456-0.893 0.013-1.716 0.52-2.175 1.32-0.927 1.609-0.244 3.99 0.667 5.296 0.444 0.638 0.974 1.354 1.67 1.328 0.67-0.026 0.922-0.431 1.733-0.431 0.811 0 1.038 0.431 1.746 0.418 0.721-0.013 1.178-0.651 1.618-1.289 0.51-0.738 0.72-1.453 0.732-1.49-0.016-0.006-1.405-0.539-1.418-2.137-0.013-1.336 1.091-1.975 1.14-2.007-0.62-0.917-1.588-1.016-1.931-1.041-0.048-0.006-0.095-0.006-0.143-0.006z" fill="white"/>
          <path d="M20.5 8.5h2.7c0.8 0 1.4 0.6 1.4 1.4 0 0.8-0.6 1.4-1.4 1.4h-1.7v2.2h-1v-5zm1 2h1.5c0.4 0 0.6-0.2 0.6-0.6s-0.2-0.6-0.6-0.6h-1.5v1.2z" fill="white"/>
          <path d="M25.5 12.9c-0.1 0.2-0.4 0.4-0.7 0.4-0.4 0-0.7-0.2-0.7-0.6 0-0.3 0.3-0.5 0.8-0.6l0.6-0.1v0.9zm0.9-1.7c0-0.8-0.5-1.3-1.4-1.3-0.6 0-1 0.3-1.2 0.7l0.8 0.2c0.1-0.2 0.3-0.3 0.5-0.3 0.4 0 0.5 0.2 0.5 0.5v0.2l-0.7 0.1c-0.8 0.1-1.3 0.4-1.3 1.1 0 0.7 0.5 1.1 1.2 1.1 0.4 0 0.8-0.2 1-0.5v0.4h0.8v-2.2h-0.2z" fill="white"/>
          <path d="M28.5 13.5l-1.3-3.5h-0.9l1.8 4.6c-0.1 0.3-0.2 0.4-0.5 0.4-0.1 0-0.2 0-0.3 0v0.7c0.1 0 0.3 0 0.4 0 0.6 0 1-0.3 1.3-1l1.8-4.7h-0.9l-1.3 3.5z" fill="white"/>
        </svg>
      )
    },
    {
      name: 'Google Pay',
      svg: (
        <svg viewBox="0 0 50 24" width="50" height="24" fill="none">
          <rect width="50" height="24" rx="4" fill="#FFFFFF" stroke="#E5E7EB"/>
          <g transform="translate(4, 3)">
            <path d="M14.06 8.95v2.83h-1.1V4.35h2.5c.63 0 1.13.2 1.53.59.4.39.6.87.6 1.45 0 .58-.2 1.06-.6 1.45-.4.39-.9.59-1.53.59h-1.4v.52zm0-3.54v2.21h1.43c.36 0 .64-.11.85-.34.22-.23.32-.5.32-.83s-.1-.6-.32-.83c-.21-.23-.49-.34-.85-.34h-1.43v.13z" fill="#4285F4"/>
            <path d="M17.69 9.69c0 .39.16.59.48.59.2 0 .35-.07.48-.2V8.7c-.13-.13-.29-.2-.48-.2-.32 0-.48.2-.48.59v.6zm.48 1.19c-.46 0-.8-.14-1.03-.42-.23-.28-.35-.68-.35-1.2 0-.52.11-.92.35-1.2.23-.28.57-.42 1.03-.42.2 0 .38.04.52.13V6.36h1v5.42h-1v-.38c-.14.09-.32.13-.52.13v.35z" fill="#3C4043"/>
            <path d="M21.54 10.95l-1.17-3.2h1.19l.64 2.0 .64-2.0h1.19l-1.17 3.2c-.22.59-.57.88-1.08.88-.16 0-.31-.02-.45-.07v-.85c.1.02.2.04.29.04.22 0 .37-.1.45-.31l.05-.12-.58-1.57z" fill="#FBBC05"/>
          </g>
          <path d="M27.9 7.8h2.4c0.6 0 1.1 0.1 1.4 0.4 0.3 0.3 0.5 0.7 0.5 1.1 0 0.6-0.3 1-0.8 1.2 0.6 0.2 1 0.6 1 1.3 0 0.5-0.2 0.9-0.5 1.2-0.3 0.3-0.8 0.4-1.4 0.4h-2.5V7.8h-0.1zm2.3 2.3c0.3 0 0.5 0 0.6-0.2 0.1-0.1 0.2-0.3 0.2-0.5s-0.1-0.4-0.2-0.5c-0.1-0.1-0.3-0.2-0.6-0.2h-1.4v1.4h1.4zm0.1 2.3c0.3 0 0.5-0.1 0.7-0.2 0.2-0.1 0.2-0.3 0.2-0.6 0-0.2-0.1-0.4-0.2-0.5-0.2-0.1-0.4-0.2-0.7-0.2h-1.5v1.5h1.5z" fill="#5F6368"/>
          <path d="M33.3 10.6c0 0.4 0.1 0.7 0.3 1 0.2 0.2 0.5 0.3 0.8 0.3 0.2 0 0.5-0.1 0.6-0.2v-0.9c-0.1 0-0.2 0-0.4 0-0.3 0-0.6-0.1-0.8-0.4-0.2-0.2-0.3-0.5-0.3-0.9s0.1-0.7 0.3-0.9c0.2-0.2 0.5-0.4 0.8-0.4 0.1 0 0.3 0 0.4 0v-0.9c-0.2-0.1-0.4-0.2-0.6-0.2-0.3 0-0.6 0.1-0.8 0.3-0.2 0.2-0.3 0.6-0.3 1v0.2z" fill="#5F6368"/>
          <path d="M35.8 12c0.3 0 0.6-0.1 0.8-0.3 0.2-0.2 0.3-0.5 0.3-0.9v-0.2l-1 0.2c-0.3 0.1-0.5 0.2-0.5 0.5 0 0.2 0.1 0.3 0.2 0.4 0.1 0.2 0.3 0.3 0.5 0.3h-0.3zm0.1-3.3c0.5 0 0.9 0.1 1.2 0.4 0.3 0.2 0.4 0.6 0.4 1.1v2.1h-0.8v-0.5h0c-0.3 0.4-0.7 0.6-1.2 0.6-0.4 0-0.8-0.1-1.1-0.4-0.3-0.2-0.4-0.6-0.4-1s0.1-0.7 0.4-1c0.3-0.2 0.7-0.4 1.2-0.4l1.2-0.3c0-0.3-0.1-0.5-0.2-0.6-0.2-0.2-0.4-0.2-0.6-0.2-0.4 0-0.7 0.2-0.9 0.5l-0.7-0.4c0.4-0.5 0.9-0.8 1.6-0.8l-0.1 0.9z" fill="#5F6368"/>
        </svg>
      )
    },
    {
      name: 'Amazon Pay',
      svg: (
        <svg viewBox="0 0 60 24" width="60" height="24" fill="none">
          <rect width="60" height="24" rx="4" fill="#232F3E"/>
          <g transform="translate(8, 4)">
            <path d="M14.6 9.5c-0.8 0.6-2 0.9-3 0.9-1.4 0-2.8-0.5-3.7-1.4-0.1-0.1 0-0.2 0.1-0.1 1.1 0.6 2.4 1 3.7 1 0.9 0 1.9-0.2 2.9-0.6 0.1-0.1 0.2 0.1 0 0.2z" fill="#FF9900"/>
            <path d="M15.5 8.5c-0.1-0.1-0.7-0.1-1-0.1-0.1 0-0.1 0.1 0 0.1 0.5 0.1 1.3 0.1 1.4 0.2 0.1 0.1-0.1 0.9-0.3 1.2 0 0.1 0.1 0.1 0.1 0 0.2-0.2 0.6-0.7 0.5-0.9-0.1-0.3-0.6-0.4-0.7-0.5z" fill="#FF9900"/>
            <path d="M11.2 5.6V5.1c0-0.1 0.1-0.2 0.2-0.2h1.8c0.1 0 0.2 0.1 0.2 0.2v0.4c0 0.1-0.1 0.2-0.2 0.3l-0.9 1.3c0.3 0 0.7 0.1 1 0.2 0.1 0 0.1 0.1 0.1 0.2v0.5c0 0.1-0.1 0.1-0.2 0.1-0.5-0.3-1.3-0.3-1.9 0-0.1 0-0.2-0.1-0.2-0.1v-0.5c0-0.1 0-0.2 0.1-0.3l1.1-1.5h-0.9c-0.1 0-0.2-0.1-0.2-0.2z" fill="white"/>
            <path d="M6.7 8.1h-0.5c-0.1 0-0.1-0.1-0.1-0.1V5c0-0.1 0.1-0.1 0.1-0.1h0.5c0.1 0 0.1 0.1 0.1 0.1v0.4h0c0.1-0.4 0.4-0.6 0.8-0.6 0.3 0 0.6 0.2 0.8 0.6 0.1-0.4 0.5-0.6 0.8-0.6 0.3 0 0.5 0.1 0.7 0.3 0.2 0.2 0.1 0.6 0.1 0.9v1.9c0 0.1-0.1 0.1-0.1 0.1H9.4c-0.1 0-0.1-0.1-0.1-0.1V6.4c0-0.1 0-0.3 0-0.5 0-0.2-0.1-0.3-0.3-0.3-0.1 0-0.3 0.1-0.3 0.2-0.1 0.1-0.1 0.3-0.1 0.5v1.6c0 0.1-0.1 0.1-0.1 0.1H8c-0.1 0-0.1-0.1-0.1-0.1V6.4c0-0.3 0.1-0.7-0.3-0.7-0.3 0-0.4 0.4-0.4 0.7v1.6c0 0.1-0.1 0.1-0.1 0.1H6.7z" fill="white"/>
            <path d="M16.1 4.8c0.8 0 1.2 0.7 1.2 1.5 0 0.8-0.5 1.5-1.2 1.5-0.8 0-1.2-0.7-1.2-1.5-0.1-0.8 0.4-1.5 1.2-1.5zm0 0.5c-0.4 0-0.4 0.5-0.4 0.8 0 0.3 0 1 0.4 1 0.4 0 0.4-0.6 0.4-0.9 0-0.2 0-0.5-0.1-0.7-0.1-0.1-0.2-0.2-0.3-0.2z" fill="white"/>
            <path d="M18.8 8.1h-0.5c-0.1 0-0.1-0.1-0.1-0.1V5c0-0.1 0.1-0.1 0.1-0.1h0.5c0.1 0 0.1 0 0.1 0.1v0.4h0c0.2-0.4 0.4-0.6 0.8-0.6 0.3 0 0.5 0.1 0.7 0.3 0.1 0.2 0.1 0.6 0.1 0.9v1.9c0 0.1-0.1 0.1-0.1 0.1h-0.5c-0.1 0-0.1-0.1-0.1-0.1V6.3c0-0.3 0-0.8-0.4-0.8-0.1 0-0.3 0.1-0.4 0.2-0.1 0.2-0.1 0.4-0.1 0.6v1.6c0 0.1-0.1 0.1-0.1 0.1z" fill="white"/>
          </g>
          <g transform="translate(29, 7)">
            <path d="M0 6.8h2.6c0.8 0 1.4 0.2 1.8 0.5 0.4 0.3 0.6 0.8 0.6 1.4 0 0.6-0.2 1.1-0.6 1.4-0.4 0.3-1 0.5-1.8 0.5H1.1v1.7H0V6.8zm2.5 2.9c0.5 0 0.8-0.1 1.1-0.3 0.2-0.2 0.4-0.5 0.4-0.8s-0.1-0.6-0.4-0.8c-0.2-0.2-0.6-0.3-1.1-0.3H1.1v2.2h1.4z" fill="#FF9900"/>
            <path d="M6.2 11.3c-0.2 0.2-0.5 0.3-0.8 0.3-0.4 0-0.7-0.1-0.9-0.4-0.2-0.3-0.3-0.6-0.3-1.1 0-0.4 0.1-0.8 0.3-1.1 0.2-0.3 0.5-0.4 0.9-0.4 0.3 0 0.6 0.1 0.8 0.3V8h1v3.5h-1v-0.2zm-0.8-0.5c0.2 0 0.4-0.1 0.5-0.2 0.1-0.1 0.2-0.3 0.2-0.5s-0.1-0.4-0.2-0.5c-0.1-0.1-0.3-0.2-0.5-0.2-0.2 0-0.4 0.1-0.5 0.2-0.1 0.1-0.2 0.3-0.2 0.5s0.1 0.4 0.2 0.5c0.1 0.1 0.3 0.2 0.5 0.2z" fill="#232F3E"/>
            <path d="M8.3 12.6l1.3-3.5h1.1l-1.6 3.9c-0.3 0.7-0.7 1.1-1.3 1.1-0.1 0-0.3 0-0.4 0v-0.8c0.1 0 0.2 0 0.3 0 0.3 0 0.5-0.1 0.6-0.4l0.1-0.2-1.4-3.6h1.1l0.8 2.3 0.4 1.2z" fill="#232F3E"/>
          </g>
        </svg>
      )
    },
    {
      name: 'Visa',
      svg: (
        <svg viewBox="0 0 50 24" width="50" height="24" fill="none">
          <rect width="50" height="24" rx="4" fill="#FFFFFF" stroke="#E5E7EB"/>
          <path d="M20.9 16h-2.6l1.6-9.9h2.6L20.9 16z" fill="#1A1F71"/>
          <path d="M30.8 6.3l-2.5 6.8-0.3-1.4-0.8-4.1c-0.1-0.5-0.5-0.6-0.9-0.6h-3.2l0 0.1c0.7 0.1 1.4 0.4 2.1 0.7l1.7 6.4h2.8l4.2-8h-2.7l-0.4 0.1z" fill="#1A1F71"/>
          <path d="M34.6 16h2.6l-2.3-9.9h-2.1c-0.5 0-0.8 0.3-1 0.6l-3.4 8.3h2.7l0.5-1.3h3.2l0.3 1.3h-0.5zm-2.5-3.1l1.3-3.6 0.8 3.6h-2.1z" fill="#1A1F71"/>
          <path d="M18.1 6.3c-0.1 0.9-0.8 0.9-1.5 0.9-0.4 0-0.8-0.1-1-0.2l0.1-1c0.3 0.1 0.7 0.2 1.1 0.2 0.4 0 0.8 0 0.8-0.4 0-0.2-0.2-0.3-0.6-0.5-0.4-0.2-1-0.5-1-1.3 0-1 0.8-1.6 2.1-1.6 0.4 0 0.8 0.1 1.1 0.2l-0.1 1c-0.3-0.1-0.6-0.2-0.9-0.2-0.6 0-0.8 0.2-0.8 0.4 0 0.2 0.2 0.3 0.6 0.4 0.5 0.2 1.1 0.5 1.1 1.3 0 1-0.8 1.7-2.2 1.7-0.5 0-0.9-0.1-1.2-0.2l0.1-1c0.3 0.2 0.7 0.2 1.1 0.2 0.6 0 1-0.2 1-0.5 0-0.2-0.2-0.3-0.7-0.5" fill="#1A1F71"/>
        </svg>
      )
    }
  ];

  return (
    <div style={{
      background: 'linear-gradient(135deg, #F8FAFC 0%, #F0F4F8 100%)',
      borderTop: '1px solid #E5E7EB',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px',
      marginBottom: '28px',
      borderRadius: '16px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
    }}>
      {/* Security Badge */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '4px'
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
        <span style={{
          fontSize: '18px',
          fontWeight: 700,
          color: '#059669',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          Secure Checkout
        </span>
      </div>
      
      {/* Payment Methods */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {paymentMethods.map((method) => (
          <div key={method.name} style={{
            display: 'flex',
            alignItems: 'center',
            opacity: 0.95,
            transition: 'all 0.2s',
            cursor: 'pointer',
            filter: 'grayscale(0.1)'
          }}
          title={method.name}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.opacity = '1';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.opacity = '0.95';
          }}
          >
            {method.svg}
          </div>
        ))}
      </div>
      
      {/* Trust Text */}
      <div style={{
        fontSize: '15px',
        color: '#475569',
        textAlign: 'center',
        maxWidth: '440px',
        lineHeight: '1.5',
        fontWeight: 500
      }}>
        Your payment information is encrypted and secure. We accept all major payment methods.
      </div>
    </div>
  );
};

export default PaymentLogos;