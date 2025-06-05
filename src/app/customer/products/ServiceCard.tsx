import React from 'react'

interface ServiceCardProps {
  type: 'Design' | 'Consulting' | 'Installation' | 'Maintenance'
  specs: {
    expertise: string
    duration: string
    response: string
    serviceTypes?: string
    bestFor?: string
    availability?: string
    basePrice: number
  }
  retailPrice: number
  hours: number
  onHoursChange: (hours: number) => void
  discountRate: number
  isExpanded: boolean
  onToggleExpand: () => void
}

const colors = {
  primary: "#0A051E",
  secondary: "#334155",
  accent: "#00AEEF",
  accentDark: "#0096CC",
  background: "#F8FAFC",
  cardBackground: "#FFFFFF",
  border: "#E2E8F0",
  text: "#334155",
  textLight: "#64748B",
  price: "#0A051E",
  savings: "#22C55E",
  buttonText: "#FFFFFF",
  buttonHover: "#F8FAFC",
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  type,
  specs,
  retailPrice,
  hours,
  onHoursChange,
  discountRate,
  isExpanded,
  onToggleExpand,
}) => {
  // Calculate prices
  const finalPrice = specs.basePrice * (1 - discountRate);
  const savingsAmount = retailPrice - finalPrice;
  const savingsPercentage = Math.round((savingsAmount / retailPrice) * 100);

  return (
    <div
      style={{
        background: colors.cardBackground,
        borderRadius: "16px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        marginBottom: "16px",
        border: `1px solid ${colors.border}`,
        overflow: "hidden",
        transition: "box-shadow 0.2s ease",
      }}
    >
      {/* Card Header with FlexVolt Branding */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          padding: "16px",
          borderBottom: isExpanded ? `1px solid ${colors.border}` : "none",
        }}
      >
        <div>
          <div style={{
            fontSize: "13px",
            fontWeight: 600,
            color: colors.accent,
            background: `${colors.accent}10`,
            padding: "3px 8px",
            borderRadius: "4px",
            display: "inline-block",
            marginBottom: "8px",
          }}>
            SWSE Engineering
          </div>
          
          <h2
            style={{
              fontSize: "20px",
              fontWeight: 700,
              color: colors.primary,
              margin: "0 0 6px 0",
            }}
          >
            {type} Service
          </h2>
          
          <div style={{
            fontSize: "14px",
            color: colors.textLight,
            marginBottom: "10px",
          }}>
            {specs.duration} · {specs.expertise}
          </div>
          
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "8px",
            }}
          >
            <div
              style={{
                fontSize: "22px",
                fontWeight: 700,
                color: colors.price,
              }}
            >
              £{finalPrice.toFixed(0)}/hr
            </div>
            <div
              style={{
                fontSize: "16px",
                fontWeight: 400,
                color: colors.textLight,
                textDecoration: "line-through",
              }}
            >
              £{retailPrice}/hr
            </div>
            
            <div style={{
              background: "rgba(34, 197, 94, 0.1)",
              color: colors.savings,
              fontWeight: 600,
              fontSize: "13px",
              padding: "3px 8px",
              borderRadius: "4px",
            }}>
              Save {savingsPercentage}%
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "stretch",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <button
              onClick={() => onHoursChange(Math.max(0, hours - 1))}
              onMouseEnter={(e) => {
                if (hours > 0) {
                  e.currentTarget.style.backgroundColor = '#0096CC';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = hours > 0 ? colors.accent : "#E2E8F0";
              }}
              style={{
                width: "38px",
                height: "38px",
                backgroundColor: hours > 0 ? colors.accent : "#E2E8F0",
                color: colors.buttonText,
                border: "none",
                borderRadius: "8px 0 0 8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: hours > 0 ? "pointer" : "not-allowed",
                fontSize: "18px",
                fontWeight: "600",
                transition: "background-color 0.2s ease",
              }}
              disabled={hours === 0}
            >
              −
            </button>

            <input
              type="number"
              min="0"
              max="999"
              value={hours}
              onChange={(e) => {
                const val = parseInt(e.target.value) || 0;
                onHoursChange(Math.max(0, Math.min(999, val)));
              }}
              style={{
                width: "40px",
                height: "38px",
                border: "1px solid #E2E8F0",
                borderLeft: "none",
                borderRight: "none",
                textAlign: "center",
                fontSize: "16px",
                fontWeight: "600",
                padding: "8px 0",
                color: colors.primary,
                outline: "none",
                WebkitAppearance: "none",
                MozAppearance: "textfield",
                appearance: "textfield",
              }}
            />

            <button
              onClick={() => onHoursChange(Math.min(999, hours + 1))}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#0096CC';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = colors.accent;
              }}
              style={{
                width: "38px",
                height: "38px",
                backgroundColor: colors.accent,
                color: colors.buttonText,
                border: "none",
                borderRadius: "0 8px 8px 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: "18px",
                fontWeight: "600",
                transition: "background-color 0.2s ease",
              }}
              disabled={hours >= 999}
            >
              +
            </button>
          </div>
        </div>
      </div>
      
      {/* Compatibility Badge - Always Visible */}
      <div style={{
        padding: "0 16px 12px 16px", 
        display: "flex", 
        alignItems: "center", 
        gap: "6px"
      }}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={colors.savings}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
        <span style={{fontSize: "13px", color: colors.savings, fontWeight: 500}}>
          Available for all industrial and heritage projects
        </span>
      </div>

      {/* Expandable Content */}
      <div
        style={{
          maxHeight: isExpanded ? "500px" : "0",
          overflow: "hidden",
          transition: "max-height 0.3s ease",
        }}
      >
        <div style={{ padding: "0 16px 16px 16px" }}>
          {/* Best For */}
          {specs.bestFor && (
            <div
              style={{
                marginBottom: "16px",
                background: "rgba(243, 244, 246, 0.5)",
                padding: "12px",
                borderRadius: "8px",
              }}
            >
              <h3
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: colors.primary,
                  margin: "0 0 6px 0",
                }}
              >
                Best For
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  color: colors.text,
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                {specs.bestFor}
              </p>
            </div>
          )}

          {/* Specifications Grid */}
          <div>
            <h3
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: colors.primary,
                margin: "0 0 10px 0",
              }}
            >
              Specifications
            </h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
              }}
            >
              <SpecItem
                label="Expertise"
                value={specs.expertise}
                colors={colors}
                icon="expertise"
              />
              <SpecItem
                label="Project Duration"
                value={specs.duration}
                colors={colors}
                icon="clock"
              />
              <SpecItem
                label="Response Time"
                value={specs.response}
                colors={colors}
                icon="response"
              />
              {specs.availability && (
                <SpecItem
                  label="Availability"
                  value={specs.availability}
                  colors={colors}
                  icon="calendar"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Expand Button */}
      <button
        onClick={onToggleExpand}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = isExpanded ? "rgba(243, 244, 246, 0.9)" : "rgba(243, 244, 246, 0.3)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = isExpanded ? "rgba(243, 244, 246, 0.7)" : "transparent";
        }}
        style={{
          width: "100%",
          background: isExpanded ? "rgba(243, 244, 246, 0.7)" : "transparent",
          border: "none",
          borderTop: `1px solid ${colors.border}`,
          padding: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: colors.accent,
          fontSize: "14px",
          fontWeight: 500,
          cursor: "pointer",
          transition: "background 0.2s ease",
        }}
      >
        {isExpanded ? "Show less" : "Show details"}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            marginLeft: "6px",
            transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
    </div>
  )
}

// Enhanced SpecItem Component with icons
function SpecItem({ label, value, colors, icon }: { label: string; value: string; colors: any; icon: string }) {
  let iconSvg;
  
  switch(icon) {
    case "expertise":
      iconSvg = (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={colors.textLight} strokeWidth="2">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
        </svg>
      );
      break;
    case "clock":
      iconSvg = (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={colors.textLight} strokeWidth="2">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      );
      break;
    case "response":
      iconSvg = (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={colors.textLight} strokeWidth="2">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>
      );
      break;
    case "calendar":
      iconSvg = (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={colors.textLight} strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      );
      break;
    default:
      iconSvg = null;
  }
  
  return (
    <div style={{
      display: "flex",
      alignItems: "flex-start",
      gap: "6px",
    }}>
      {iconSvg && <div style={{marginTop: "2px"}}>{iconSvg}</div>}
      <div>
        <div
          style={{
            fontSize: "12px",
            fontWeight: 500,
            color: colors.textLight,
            marginBottom: "3px",
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: "14px",
            fontWeight: 600,
            color: colors.primary,
          }}
        >
          {value}
        </div>
      </div>
    </div>
  )
}

export default ServiceCard