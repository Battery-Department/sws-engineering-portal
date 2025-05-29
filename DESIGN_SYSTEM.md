# Battery Department Design System Guide

## Overview
This document serves as the definitive design system guide for the Battery Department platform. It contains all design specifications, patterns, and code examples that must be followed when creating or updating any part of the application.

## Core Design Principles
1. **Clean and Modern**: Minimalist approach with purposeful use of space
2. **Consistent**: Every element follows the same design language
3. **Professional**: Enterprise-grade appearance with attention to detail
4. **User-Focused**: Intuitive interactions with clear visual feedback

## Color Palette

### Primary Colors
```css
/* Primary Blue */
--primary: #006FEE;
--primary-dark: #0050B3;
--primary-light: #2B8FFF;

/* Blue Gradients */
--gradient-primary: linear-gradient(to right, #006FEE, #0050B3);
--gradient-primary-135: linear-gradient(135deg, #006FEE, #0050B3);
```

### Neutral Colors
```css
/* Grays */
--gray-900: #111827;  /* Headings */
--gray-700: #374151;  /* Body text */
--gray-600: #4B5563;  /* Secondary text */
--gray-500: #6B7280;  /* Muted text */
--gray-400: #9CA3AF;  /* Disabled text */
--gray-300: #D1D5DB;  /* Borders */
--gray-200: #E5E7EB;  /* Dividers */
--gray-100: #F3F4F6;  /* Light backgrounds */
--gray-50: #F9FAFB;   /* Subtle backgrounds */

/* Background */
--bg-primary: #F8FAFC;
--bg-white: #FFFFFF;
```

### Accent Colors
```css
/* Status Colors */
--success: #10B981;
--success-light: #D1FAE5;
--warning: #F59E0B;
--warning-light: #FEF3C7;
--error: #EF4444;
--error-light: #FEE2E2;
--info: #3B82F6;
--info-light: #DBEAFE;
```

### Special Purpose Colors
```css
/* Light Blue Shades */
--blue-50: #EFF6FF;
--blue-100: #DBEAFE;
--blue-200: #BFDBFE;
--blue-300: #93C5FD;
--blue-400: #60A5FA;
--blue-500: #3B82F6;

/* Brand Specific */
--flexvolt-yellow: #FBBF24;
--battery-green: #10B981;
```

## Typography

### Font Family
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
```

### Font Sizes
```css
--text-xs: 12px;
--text-sm: 13px;
--text-base: 14px;
--text-md: 15px;
--text-lg: 16px;
--text-xl: 18px;
--text-2xl: 20px;
--text-3xl: 24px;
--text-4xl: 28px;
--text-5xl: 32px;
```

### Font Weights
```css
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
```

### Line Heights
```css
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.6;
--leading-loose: 1.7;
```

## Spacing System

### Base Spacing
```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-7: 28px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
```

### Common Patterns
- **Card Padding**: 24px
- **Section Padding**: 32px
- **Input Padding**: 14px 20px
- **Button Padding**: 12px 24px (default), 10px 20px (small)
- **Header Height**: 60-80px
- **Sidebar Width**: 280-300px

## Border System

### Border Radius
```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 10px;
--radius-xl: 12px;
--radius-2xl: 16px;
--radius-3xl: 20px;
--radius-full: 9999px;
```

### Border Styles
```css
/* Default Borders */
--border-default: 1px solid #E5E7EB;
--border-light: 1px solid #F3F4F6;
--border-dark: 1px solid #D1D5DB;

/* Blue Borders */
--border-primary: 2px solid #E6F4FF;
--border-primary-hover: 2px solid #006FEE;
```

## Shadow System

### Box Shadows
```css
/* Elevation Levels */
--shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.04);
--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.05);
--shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.08);
--shadow-xl: 0 12px 32px rgba(0, 0, 0, 0.1);

/* Blue Shadows */
--shadow-blue-sm: 0 2px 8px rgba(0, 111, 238, 0.15);
--shadow-blue-md: 0 4px 12px rgba(0, 111, 238, 0.2);
--shadow-blue-lg: 0 8px 24px rgba(0, 111, 238, 0.25);
--shadow-blue-xl: 0 12px 32px rgba(0, 111, 238, 0.3);
```

### Hover Shadow Pattern
```javascript
// Default state
boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'

// Hover state
boxShadow: '0 12px 24px rgba(0, 111, 238, 0.15)'
```

## Component Patterns

### Cards
```javascript
const cardStyle = {
  backgroundColor: 'white',
  borderRadius: '12px',
  border: '2px solid #E6F4FF',
  padding: '24px',
  transition: 'all 0.3s ease',
  cursor: 'pointer'
}

// Hover state
onMouseEnter={(e) => {
  e.currentTarget.style.transform = 'translateY(-4px)'
  e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 111, 238, 0.15)'
}}
onMouseLeave={(e) => {
  e.currentTarget.style.transform = 'translateY(0)'
  e.currentTarget.style.boxShadow = 'none'
}}
```

### Buttons

#### Primary Button
```javascript
const primaryButton = {
  padding: '12px 24px',
  backgroundColor: '#006FEE',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  fontSize: '14px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  boxShadow: '0 2px 8px rgba(0, 111, 238, 0.25)'
}

// Hover
onMouseOver={(e) => {
  e.currentTarget.style.backgroundColor = '#0050B3'
  e.currentTarget.style.transform = 'translateY(-1px)'
  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 111, 238, 0.35)'
}}
```

#### Secondary Button
```javascript
const secondaryButton = {
  padding: '10px 20px',
  border: '2px solid #E6F4FF',
  backgroundColor: 'white',
  color: '#006FEE',
  borderRadius: '8px',
  fontSize: '14px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.2s'
}

// Hover
onMouseEnter={(e) => {
  e.currentTarget.style.backgroundColor = '#F8FAFC'
  e.currentTarget.style.borderColor = '#006FEE'
}}
```

### Input Fields
```javascript
const inputStyle = {
  width: '100%',
  padding: '12px 20px',
  backgroundColor: '#F9FAFB',
  border: '2px solid #E5E7EB',
  borderRadius: '8px',
  fontSize: '14px',
  color: '#111827',
  outline: 'none',
  transition: 'all 0.2s'
}

// Focus state
onFocus={(e) => {
  e.target.style.borderColor = '#006FEE'
  e.target.style.backgroundColor = 'white'
  e.target.style.boxShadow = '0 0 0 3px rgba(0, 111, 238, 0.1)'
}}
```

### Headers
```javascript
// Gradient Header
const headerStyle = {
  background: 'linear-gradient(to right, #006FEE, #0050B3)',
  padding: '20px 32px',
  boxShadow: '0 2px 12px rgba(0, 111, 238, 0.15)'
}

// White Header
const whiteHeaderStyle = {
  backgroundColor: 'white',
  borderBottom: '2px solid #E6F4FF',
  padding: '20px 32px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
}
```

## Animation Patterns

### Transitions
```css
/* Standard transition */
transition: all 0.2s ease;

/* Smooth transition */
transition: all 0.3s ease;

/* Spring-like transition */
transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Common Animations
```css
/* Fade In */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Message Appear */
@keyframes messageAppear {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Pulse */
@keyframes pulse {
  0%, 100% {
    opacity: 0.3;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
}

/* Spin */
@keyframes spin {
  to { transform: rotate(360deg); }
}
```

### Hover Effects
```javascript
// Lift effect
transform: 'translateY(-4px)'

// Scale effect
transform: 'scale(1.02)'

// Slide effect
transform: 'translateX(4px)'
```

## Layout Patterns

### Container Widths
```css
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1536px;

/* Common max-widths */
--chat-max-width: 840px;
--content-max-width: 1280px;
--form-max-width: 600px;
```

### Grid Systems
```javascript
// Product Grid
display: 'grid',
gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
gap: '24px'

// Dashboard Grid
display: 'grid',
gridTemplateColumns: 'repeat(3, 1fr)',
gap: '20px'

// Quick Actions Grid
display: 'grid',
gridTemplateColumns: 'repeat(2, 1fr)',
gap: '16px'
```

## Special Effects

### Glass Morphism
```javascript
backgroundColor: 'rgba(255, 255, 255, 0.2)',
backdropFilter: 'blur(10px)',
border: '1px solid rgba(255, 255, 255, 0.3)'
```

### Focus Glow
```css
box-shadow: 0 0 0 3px rgba(0, 111, 238, 0.1);
```

### Badge Styles
```javascript
// Status Badge
const statusBadge = {
  padding: '6px 16px',
  borderRadius: '9999px',
  fontSize: '12px',
  fontWeight: '600',
  // Colors based on status
  backgroundColor: status === 'active' ? '#D1FAE5' : '#FEE2E2',
  color: status === 'active' ? '#10B981' : '#EF4444'
}
```

## Icon Guidelines

### Icon Sizes
```javascript
// Small: 16px
// Medium: 20px
// Large: 24px
// XL: 28px
// XXL: 32px+
```

### Icon Stroke Width
```javascript
strokeWidth={2} // Default
strokeWidth={2.5} // Bold
strokeWidth={1.5} // Light
```

## Responsive Design

### Breakpoints
```css
--screen-sm: 640px;
--screen-md: 768px;
--screen-lg: 1024px;
--screen-xl: 1280px;
--screen-2xl: 1536px;
```

### Mobile Patterns
- Stack navigation vertically
- Full-width cards on mobile
- Larger touch targets (min 44px)
- Simplified layouts
- Bottom-fixed CTAs

## Code Implementation Examples

### Complete Card Component
```javascript
<div style={{
  backgroundColor: 'white',
  borderRadius: '12px',
  border: '2px solid #E6F4FF',
  padding: '24px',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden'
}}
onMouseEnter={(e) => {
  e.currentTarget.style.transform = 'translateY(-4px)'
  e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 111, 238, 0.15)'
  e.currentTarget.style.borderColor = '#006FEE'
}}
onMouseLeave={(e) => {
  e.currentTarget.style.transform = 'translateY(0)'
  e.currentTarget.style.boxShadow = 'none'
  e.currentTarget.style.borderColor = '#E6F4FF'
}}>
  {/* Card content */}
</div>
```

### Complete Button with Loading State
```javascript
<button
  onClick={handleClick}
  disabled={isLoading}
  style={{
    padding: '12px 24px',
    backgroundColor: !isLoading ? '#006FEE' : '#E5E7EB',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: !isLoading ? 'pointer' : 'not-allowed',
    transition: 'all 0.2s ease',
    boxShadow: !isLoading ? '0 2px 8px rgba(0, 111, 238, 0.25)' : 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  }}
  onMouseOver={(e) => {
    if (!isLoading) {
      e.currentTarget.style.backgroundColor = '#0050B3'
      e.currentTarget.style.transform = 'translateY(-1px)'
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 111, 238, 0.35)'
    }
  }}
  onMouseOut={(e) => {
    if (!isLoading) {
      e.currentTarget.style.backgroundColor = '#006FEE'
      e.currentTarget.style.transform = 'translateY(0)'
      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 111, 238, 0.25)'
    }
  }}
>
  {isLoading ? <Spinner size={16} /> : <Icon size={16} />}
  {buttonText}
</button>
```

## Important Rules

1. **Always use the exact color values** - Never approximate or use similar colors
2. **Maintain consistent spacing** - Use the spacing system, don't use arbitrary values
3. **Follow hover patterns** - Every interactive element needs hover feedback
4. **Use proper transitions** - All state changes should be animated
5. **Respect the hierarchy** - Headers use gradients, content uses solid colors
6. **Keep shadows subtle** - Use blue-tinted shadows for primary elements
7. **Border consistency** - 2px borders for primary elements, 1px for secondary
8. **Typography hierarchy** - Clear distinction between heading levels
9. **Loading states** - Always provide visual feedback during async operations
10. **Accessibility** - Maintain proper contrast ratios and focus states

## File Structure Reference
When implementing this design system:
- Check this file first for any design decisions
- Use consistent naming conventions
- Keep styles inline for React components
- Use CSS-in-JS patterns shown above
- Maintain the established visual hierarchy

## Quick Reference Checklist
Before completing any UI work, ensure:
- [ ] Colors match the palette exactly
- [ ] Spacing follows the system
- [ ] Hover states are implemented
- [ ] Transitions are smooth
- [ ] Shadows are applied correctly
- [ ] Typography hierarchy is clear
- [ ] Borders use the right style
- [ ] Focus states are visible
- [ ] Loading states are handled
- [ ] Mobile responsiveness is considered