'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Package, CheckCircle, ShoppingCart } from 'lucide-react';

// Force dynamic rendering with no cache
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

const servicesData = [
  {
    id: 'steam',
    name: 'Steam Locomotive Restoration',
    description: 'Full restoration services for heritage railway locomotives',
    pricing: 'Project-based',
    features: "Complete mechanical & cosmetic restoration",
    popular: true
  },
  {
    id: 'cad',
    name: '3D CAD Design Services',
    description: 'Professional engineering drawings and specifications',
    pricing: 'Hourly or fixed',
    features: "Full 3D models, technical drawings, FEA analysis",
    popular: false
  },
  {
    id: 'repair',
    name: 'Plant & Machinery Repair',
    description: 'Industrial equipment maintenance and repair',
    pricing: 'Hourly + parts',
    features: "24/7 emergency callout, preventive maintenance",
    popular: false
  }
];

export default function ProductsPage() {
  const router = useRouter();
  const [quantities, setQuantities] = useState<{[key: string]: number}>({
    'steam': 0,
    'cad': 0,
    'repair': 0
  });

  const totalItems = Object.values(quantities).reduce((sum, qty) => sum + qty, 0);

  const updateQuantity = (serviceId: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [serviceId]: Math.max(0, prev[serviceId] + delta)
    }));
  };

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
      {/* Header Section */}
      <div style={{
        background: 'linear-gradient(135deg, #0048AC 0%, #006FEE 50%, #0084FF 100%)',
        color: 'white',
        padding: '48px 24px',
        borderRadius: '0 0 24px 24px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            background: 'rgba(255, 255, 255, 0.15)',
            padding: '8px 20px',
            borderRadius: '100px',
            marginBottom: '24px'
          }}>
            <Package size={20} />
            <span style={{ fontWeight: '600', fontSize: '14px' }}>
              20+ YEARS OF ENGINEERING EXCELLENCE
            </span>
          </div>

          <h1 style={{
            fontSize: '48px',
            fontWeight: '800',
            marginBottom: '16px',
            lineHeight: '1.1'
          }}>
            SOUTH WEST STEAM ENGINEERING SERVICES
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: '32px 24px', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          {servicesData.map(service => (
            <div
              key={service.id}
              style={{
                background: 'white',
                border: '2px solid #E6F4FF',
                borderRadius: '16px',
                padding: '28px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)'
              }}
            >
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#0A051E', marginBottom: '8px' }}>
                  {service.name}
                </h3>
                <p style={{ fontSize: '16px', color: '#5B6B7D', marginBottom: '12px' }}>
                  {service.description}
                </p>
                <span style={{ fontSize: '20px', fontWeight: '700', color: '#006FEE' }}>
                  {service.pricing}
                </span>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle size={16} color="#10B981" />
                  <span style={{ fontSize: '15px', color: '#5B6B7D' }}>{service.features}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                  onClick={() => updateQuantity(service.id, -1)}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    border: '1px solid #E6F4FF',
                    backgroundColor: 'white',
                    cursor: 'pointer'
                  }}
                >
                  -
                </button>
                
                <div style={{
                  flex: 1,
                  textAlign: 'center',
                  padding: '10px',
                  backgroundColor: '#F8FAFC',
                  borderRadius: '8px',
                  fontSize: '18px',
                  fontWeight: '600'
                }}>
                  {quantities[service.id] || 0} projects
                </div>
                
                <button
                  onClick={() => updateQuantity(service.id, 1)}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    border: '1px solid #E6F4FF',
                    backgroundColor: 'white',
                    cursor: 'pointer'
                  }}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        {totalItems > 0 && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '28px',
            border: '1px solid #E6F4FF'
          }}>
            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#0A051E', marginBottom: '16px' }}>
              Your Engineering Request
            </h2>
            
            {Object.entries(quantities).map(([serviceId, qty]) => {
              if (qty === 0) return null;
              const service = servicesData.find(s => s.id === serviceId);
              if (!service) return null;
              
              return (
                <div key={serviceId} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{service.name}</span>
                    <span>{qty} projects</span>
                  </div>
                </div>
              );
            })}
            
            <button
              onClick={() => router.push('/customer/contact')}
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
                marginTop: '16px'
              }}
            >
              Request Quote
            </button>
          </div>
        )}

        {/* Empty State */}
        {totalItems === 0 && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '48px',
            textAlign: 'center',
            border: '1px solid #E6F4FF'
          }}>
            <ShoppingCart size={48} color="#9CA3AF" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#0A051E', marginBottom: '8px' }}>
              No services selected
            </h3>
            <p style={{ fontSize: '16px', color: '#5B6B7D' }}>
              Select engineering services above to request a quote
            </p>
          </div>
        )}
      </div>
    </div>
  );
}