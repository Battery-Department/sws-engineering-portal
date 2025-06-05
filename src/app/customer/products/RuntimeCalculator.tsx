'use client';

import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  complexity: number; // complexity factor affecting project duration
}

interface ProjectType {
  [key: string]: number; // base duration in weeks
}

interface ProjectDurationCalculatorProps {
  services: Service[];
  projectTypes: ProjectType;
  selectedProjectType: string;
  setSelectedProjectType: (projectType: string) => void;
  selectedService: string;
  setSelectedService: (service: string) => void;
  isMobile: boolean;
}

const ProjectDurationCalculator: React.FC<ProjectDurationCalculatorProps> = ({
  services,
  projectTypes,
  selectedProjectType,
  setSelectedProjectType,
  selectedService,
  setSelectedService,
  isMobile
}) => {
  // Calculate project duration based on project type and service complexity
  const calculateProjectDuration = (baseWeeks: number, serviceComplexity: number) => {
    return baseWeeks * serviceComplexity;
  };

  const selectedServiceObj = services.find(s => s.id === selectedService);
  const durations = Object.entries(projectTypes).map(([projectType, baseWeeks]) => ({
    projectType,
    duration: calculateProjectDuration(baseWeeks, selectedServiceObj?.complexity || 1)
  }));

  // Find the max duration for scaling the chart
  const maxDuration = Math.max(...durations.map(item => item.duration));

  return (
    <div style={{ padding: '24px', background: 'white', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
      <div style={{ 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row', 
        alignItems: isMobile ? 'flex-start' : 'center', 
        justifyContent: 'space-between',
        marginBottom: '24px'
      }}>
        <div style={{ marginBottom: isMobile ? '16px' : '0' }}>
          <label style={{ 
            display: 'block', 
            fontSize: '14px', 
            fontWeight: '500', 
            color: '#111827', 
            marginBottom: '8px' 
          }}>
            Select Project Type
          </label>
          <div style={{ display: 'flex', gap: '12px' }}>
            {Object.keys(projectTypes).map(projectType => (
              <button
                key={projectType}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  background: selectedProjectType === projectType ? '#2563EB' : 'white',
                  color: selectedProjectType === projectType ? 'white' : '#6B7280',
                  border: selectedProjectType === projectType ? 'none' : '1px solid #D1D5DB',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onClick={() => setSelectedProjectType(projectType)}
              >
                {projectType}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <label style={{ 
            display: 'block', 
            fontSize: '14px', 
            fontWeight: '500', 
            color: '#111827', 
            marginBottom: '8px' 
          }}>
            Select Service
          </label>
          <select 
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid #D1D5DB',
              fontSize: '14px',
              color: '#111827',
              background: 'white',
              minWidth: '180px'
            }}
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
          >
            {services.map(service => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Chart */}
      <div style={{ height: '320px', marginBottom: '24px' }}>
        <h3 style={{ 
          fontSize: '16px', 
          fontWeight: '600', 
          color: '#111827', 
          marginBottom: '16px' 
        }}>
          Project Duration Comparison ({selectedServiceObj?.name})
        </h3>
        
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '24px', 
          height: '250px', 
          justifyContent: 'flex-end' 
        }}>
          {durations.map(item => (
            <div 
              key={item.projectType} 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px',
                height: '36px'
              }}
            >
              <div style={{ 
                width: '80px', 
                fontSize: '14px', 
                fontWeight: '500',
                color: item.projectType === selectedProjectType ? '#2563EB' : '#6B7280',
                textAlign: 'right'
              }}>
                {item.projectType}
              </div>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                <div style={{
                  height: '24px',
                  width: `${(item.duration / maxDuration) * 100}%`,
                  background: 'linear-gradient(90deg, #93C5FD 0%, #2563EB 100%)',
                  borderRadius: '4px',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  paddingRight: '12px',
                  boxShadow: item.projectType === selectedProjectType ? '0 1px 3px rgba(37, 99, 235, 0.2)' : 'none',
                  border: item.projectType === selectedProjectType ? '1px solid #2563EB' : 'none'
                }}>
                  <span style={{ 
                    fontSize: '13px', 
                    fontWeight: '600', 
                    color: 'white' 
                  }}>
                    {item.duration.toFixed(1)} weeks
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Summary Metrics */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', 
        gap: '16px', 
        textAlign: 'center' 
      }}>
        <div style={{ 
          padding: '16px', 
          background: '#F9FAFB', 
          borderRadius: '8px', 
          border: '1px solid #E5E7EB' 
        }}>
          <div style={{ fontSize: '14px', color: '#6B7280', marginBottom: '8px' }}>
            Base Project Scope
          </div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#111827' }}>
            {projectTypes[selectedProjectType]} weeks
          </div>
        </div>
        
        <div style={{ 
          padding: '16px', 
          background: '#F9FAFB', 
          borderRadius: '8px', 
          border: '1px solid #E5E7EB' 
        }}>
          <div style={{ fontSize: '14px', color: '#6B7280', marginBottom: '8px' }}>
            {selectedServiceObj?.name} Duration
          </div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#111827' }}>
            {calculateProjectDuration(
              projectTypes[selectedProjectType], 
              selectedServiceObj?.complexity || 1
            ).toFixed(1)} weeks
          </div>
        </div>
        
        <div style={{ 
          padding: '16px', 
          background: '#F9FAFB', 
          borderRadius: '8px', 
          border: '1px solid #E5E7EB' 
        }}>
          <div style={{ fontSize: '14px', color: '#6B7280', marginBottom: '8px' }}>
            Service Complexity
          </div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#111827' }}>
            {selectedServiceObj?.complexity}x multiplier
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDurationCalculator;