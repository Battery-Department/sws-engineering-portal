'use client';

import React, { useState } from 'react';

// Types for the component
interface ServiceSpec {
  name: string;
  valueBasic: string;
  valueProfessional: string;
  valueEnterprise: string;
}

interface ServiceComparisonTableProps {
  serviceSpecs: ServiceSpec[];
  selectedService: string;
  setSelectedService: (service: string) => void;
}

const ServiceComparisonTable: React.FC<ServiceComparisonTableProps> = ({ 
  serviceSpecs, 
  selectedService, 
  setSelectedService 
}) => {
  return (
    <div style={{ overflow: 'hidden', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
      {/* Service Selector */}
      <div style={{ background: '#F9FAFB', padding: '16px', borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ display: 'flex', gap: '16px' }}>
          {["Basic", "Professional", "Enterprise"].map(service => (
            <button
              key={service}
              style={{
                padding: '8px 16px',
                borderRadius: '9999px',
                fontSize: '14px',
                fontWeight: '500',
                background: selectedService === service ? '#2563EB' : 'white',
                color: selectedService === service ? 'white' : '#6B7280',
                border: selectedService === service ? 'none' : '1px solid #D1D5DB',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onClick={() => setSelectedService(service)}
            >
              {service} Service
            </button>
          ))}
        </div>
      </div>
      
      {/* Specifications Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <tbody>
          {serviceSpecs.map((spec, index) => (
            <tr 
              key={spec.name} 
              style={{ background: index % 2 === 0 ? 'white' : '#F9FAFB' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = index % 2 === 0 ? '#F9FAFB' : '#F3F4F6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = index % 2 === 0 ? 'white' : '#F9FAFB';
              }}
            >
              <td style={{ 
                padding: '16px 24px', 
                fontSize: '14px', 
                fontWeight: '500', 
                color: '#111827',
                width: '33.333%',
                borderBottom: '1px solid #E5E7EB'
              }}>
                {spec.name}
              </td>
              <td style={{ 
                padding: '16px 24px', 
                fontSize: '14px', 
                color: '#4B5563',
                width: '66.666%',
                borderBottom: '1px solid #E5E7EB'
              }}>
                {selectedService === "Basic" 
                  ? spec.valueBasic 
                  : selectedService === "Professional" 
                    ? spec.valueProfessional 
                    : spec.valueEnterprise}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceComparisonTable;