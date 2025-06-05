'use client';

import React from 'react';
import Tooltip from './Tooltip';
import { Calculator, Activity, Clock, DollarSign } from 'lucide-react';

interface ServiceValueCalculatorProps {
  quantities: { [key: string]: number };
  serviceSpecs: { [key: string]: any };
  isMobile: boolean;
}

const ServiceValueCalculator: React.FC<ServiceValueCalculatorProps> = ({ 
  quantities, 
  serviceSpecs,
  isMobile 
}) => {
  // Calculate total service hours
  const calculateTotalServiceHours = () => {
    let total = 0;
    Object.entries(quantities).forEach(([type, quantity]) => {
      const serviceHours = parseInt(type) || 0;
      total += serviceHours * quantity;
    });
    return total;
  };

  const totalServiceHours = calculateTotalServiceHours();
  
  // Service type calculations based on hourly rates and project duration
  const serviceTypes = {
    steamSystem: { name: "Steam System Design", hourlyRate: 175, efficiency: 1.2 },
    processOptimization: { name: "Process Optimization", hourlyRate: 200, efficiency: 1.5 },
    troubleshooting: { name: "System Troubleshooting", hourlyRate: 150, efficiency: 1.0 },
    maintenance: { name: "Maintenance Planning", hourlyRate: 125, efficiency: 0.8 },
    inspection: { name: "Safety Inspection", hourlyRate: 160, efficiency: 1.1 },
    training: { name: "Operator Training", hourlyRate: 140, efficiency: 0.9 }
  };

  const calculateServiceValue = (service: any) => {
    return Math.round(totalServiceHours * service.hourlyRate * service.efficiency);
  };

  const calculateROI = (service: any) => {
    const serviceValue = calculateServiceValue(service);
    const potentialSavings = serviceValue * 2.5; // Typical ROI multiplier for engineering services
    return Math.round(potentialSavings);
  };

  if (totalServiceHours === 0) return null;

  return (
    <div style={{
      background: "linear-gradient(135deg, #F0F9FF 0%, #E6F4FF 100%)",
      border: "1px solid #BAE0FF",
      borderRadius: "12px",
      padding: isMobile ? "16px" : "20px",
      marginBottom: "24px",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Background Pattern */}
      <div style={{
        position: "absolute",
        right: -50,
        top: -50,
        width: 200,
        height: 200,
        background: "radial-gradient(circle, rgba(0, 111, 238, 0.1) 0%, transparent 70%)",
        pointerEvents: "none"
      }} />
      
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginBottom: "16px"
      }}>
        <Calculator size={20} color="#006FEE" />
        <h3 style={{
          fontSize: "18px",
          fontWeight: "700",
          color: "#003D88",
          margin: 0
        }}>Service Value Calculator</h3>
      </div>

      <div style={{
        marginBottom: "20px",
        padding: "12px",
        background: "rgba(255, 255, 255, 0.7)",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <span style={{
          fontSize: "16px",
          color: "#64748B",
          fontWeight: "500"
        }}>Total Service Hours:</span>
        <span style={{
          fontSize: "24px",
          fontWeight: "700",
          color: "#006FEE"
        }}>{totalServiceHours} hrs</span>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
        gap: "12px"
      }}>
        {[
          serviceTypes.steamSystem,
          serviceTypes.processOptimization,
          serviceTypes.troubleshooting
        ].map((service, index) => {
          const serviceValue = calculateServiceValue(service);
          const roiValue = calculateROI(service);
          const tooltipContent = `${service.name} at $${service.hourlyRate}/hr with ${((service.efficiency - 1) * 100).toFixed(0)}% efficiency factor. Potential ROI: $${roiValue.toLocaleString()} based on typical cost savings from improved operations.`;
          
          return (
            <Tooltip key={index} content={tooltipContent} position="top">
              <div
                style={{
                  background: "white",
                  borderRadius: "8px",
                  padding: "12px",
                  textAlign: "center",
                  cursor: "help",
                  transition: "all 0.2s",
                  border: "1px solid transparent"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.border = "1px solid #006FEE";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 111, 238, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.border = "1px solid transparent";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <DollarSign size={16} color="#006FEE" style={{ marginBottom: "4px" }} />
                <div style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  color: "#006FEE",
                  marginBottom: "4px"
                }}>${serviceValue.toLocaleString()}</div>
                <div style={{
                  fontSize: "13px",
                  color: "#64748B"
                }}>{service.name}</div>
              </div>
            </Tooltip>
          );
        })}
      </div>

      <div style={{
        marginTop: "16px",
        padding: "12px",
        background: "rgba(16, 185, 129, 0.1)",
        borderRadius: "8px",
        textAlign: "center"
      }}>
        <p style={{
          fontSize: "14px",
          color: "#10B981",
          fontWeight: "600",
          margin: 0
        }}>
          Estimated ROI: ${Math.round(totalServiceHours * 400).toLocaleString()} in operational savings and efficiency gains
        </p>
      </div>
    </div>
  );
};

export default ServiceValueCalculator;