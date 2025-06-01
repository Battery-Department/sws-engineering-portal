# Claude Code Instructions - South West Steam Engineering Portal

## ⚠️ CRITICAL: MANDATORY FILE READING BEFORE ANY WORK ⚠️

**STOP! You MUST read these files first using the Read tool:**

1. **🔴 REQUIRED**: `/Users/oliver/South_West_Steam_Engineering/engineering-dashboard/SWSE_PROJECT_CONTEXT.md`
   - This contains ALL project context, architecture, and implementation details
   - Read the ENTIRE file before making any changes
   - Contains navigation structure, API details, database schema, and more

2. **🔴 REQUIRED FOR UI**: `/Users/oliver/South_West_Steam_Engineering/engineering-dashboard/DESIGN_SYSTEM.md`
   - Read this for ANY user interface changes
   - Contains exact color values, component standards, and styling rules

**DO NOT PROCEED WITHOUT READING THESE FILES FIRST**

## Project Overview
This is the South West Steam Engineering portal - an enterprise engineering project management platform specializing in steam locomotive restoration, CAD design, and bespoke fabrication services. The platform uses a consistent, professional design language throughout.

## Key Design Elements to Always Follow

### Primary Colors
- Primary Blue: `#006FEE` (Professional engineering blue)
- Dark Blue: `#0050B3`
- Blue Gradient: `linear-gradient(to right, #006FEE, #0050B3)`

### Component Patterns
1. **Cards**: White background, 12px radius, 2px solid #E6F4FF border, 24px padding
2. **Buttons**: Primary (#006FEE), Secondary (white with border), always with hover effects
3. **Inputs**: 2px borders, #F9FAFB background, focus glow effect
4. **Headers**: Blue gradient for main headers, white for section headers

### Must-Have Effects
- Hover lift: `translateY(-4px)` with shadow
- Focus glow: `0 0 0 3px rgba(0, 111, 238, 0.1)`
- Transitions: `all 0.3s ease` for smooth animations
- Blue shadows for primary elements

### Service Information
- Steam Locomotive Restoration
- 3D CAD Design Services
- Plant & Machinery Repair
- Commercial Railway Services
- Bespoke Engineering Solutions
- Custom Rolling Stock Fabrication

### Typography Rules
- Font: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
- Headings: 700-800 weight, #111827 color
- Body: 400-500 weight, #374151 color
- Always use proper hierarchy

### Layout Standards
- Max content width: 1280px
- Chat max width: 840px
- Card grid gap: 24px
- Section padding: 32px
- Consistent spacing using 4px base unit

### Quality Checklist
Before completing any task:
- [ ] Read DESIGN_SYSTEM.md
- [ ] Use exact color values
- [ ] Implement all hover states
- [ ] Add proper transitions
- [ ] Follow spacing system
- [ ] Test responsive behavior
- [ ] Ensure loading states
- [ ] Check accessibility

## File Locations
- Design System: `/Users/oliver/South_West_Steam_Engineering/engineering-dashboard/DESIGN_SYSTEM.md`
- Main App: `/Users/oliver/South_West_Steam_Engineering/engineering-dashboard/src/app`
- Customer Pages: `/Users/oliver/South_West_Steam_Engineering/engineering-dashboard/src/app/customer`

## Remember
ALWAYS maintain the established design patterns. When in doubt, refer to DESIGN_SYSTEM.md for the exact specifications. Never approximate or deviate from the design system.