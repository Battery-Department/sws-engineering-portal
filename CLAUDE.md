# Claude Code Instructions - Battery Department Project

## IMPORTANT: Read DESIGN_SYSTEM.md First
Before making ANY UI changes, you MUST read the complete design system documentation at `/Users/oliver/Lithi_AI/battery-dashboard/DESIGN_SYSTEM.md`

## Project Overview
This is the Battery Department e-commerce platform specializing in FlexVolt batteries for contractors. The platform uses a consistent, modern design language throughout.

## Key Design Elements to Always Follow

### Primary Colors
- Primary Blue: `#006FEE`
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

### Product Information
- FlexVolt Batteries: 6Ah ($95), 9Ah ($125), 15Ah ($245)
- All batteries are 20V/60V MAX compatible
- Focus on contractor/professional use cases
- Volume discounts: 10% ($1000+), 15% ($2500+), 20% ($5000+)

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
- Design System: `/Users/oliver/Lithi_AI/battery-dashboard/DESIGN_SYSTEM.md`
- Main App: `/Users/oliver/Lithi_AI/battery-dashboard/src/app`
- Customer Pages: `/Users/oliver/Lithi_AI/battery-dashboard/src/app/customer`

## Remember
ALWAYS maintain the established design patterns. When in doubt, refer to DESIGN_SYSTEM.md for the exact specifications. Never approximate or deviate from the design system.