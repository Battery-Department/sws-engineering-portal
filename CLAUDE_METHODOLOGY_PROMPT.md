# CLAUDE CODE METHODOLOGY PROMPT - LITHI AI PROJECT

**File Location**: `/Users/oliver/Lithi_AI/battery-dashboard/CLAUDE_METHODOLOGY_PROMPT.md`

## 🚨 CRITICAL INSTRUCTIONS FOR ALL CLAUDE CODE SESSIONS

This document contains the **EXACT METHODOLOGY** used to successfully build the Lithi AI battery dashboard enterprise system. Follow this approach to maintain consistency and avoid errors.

---

## MODULE 1: MANDATORY PRE-WORK ANALYSIS

### 1.1 CONTEXT DISCOVERY PHASE
**BEFORE TOUCHING ANY CODE**, you MUST perform this complete analysis:

```markdown
STEP 1: READ ALL DOCUMENTATION FILES
- Read: /Users/oliver/Lithi_AI/battery-dashboard/LITHI_AI_PROJECT_CONTEXT.md (ENTIRE FILE)
- Read: /Users/oliver/Lithi_AI/battery-dashboard/DESIGN_SYSTEM.md (COMPLETE)
- Read: /Users/oliver/Lithi_AI/battery-dashboard/CLAUDE.md (FULL)
- Read: package.json to understand dependencies
- Scan: prisma/schema.prisma for database structure

STEP 2: UNDERSTAND THE BUSINESS CONTEXT
- Company: Lithi AI / Battery Department
- Products: FlexVolt Batteries (6Ah $95, 9Ah $125, 15Ah $245)
- Target: Professional contractors, fleet managers
- Platform: Enterprise e-commerce + CRM system

STEP 3: TECHNOLOGY STACK VERIFICATION
- Framework: Next.js 15.3.2 with TypeScript
- Styling: Tailwind CSS with Lithi brand colors (#006FEE primary)
- UI: Radix UI components with custom styling
- Database: PostgreSQL with Prisma ORM
- Charts: Recharts for data visualization
- Authentication: Custom JWT implementation
```

### 1.2 ARCHITECTURE UNDERSTANDING
**Map the complete system architecture**:

```markdown
CUSTOMER PORTAL (/customer)
├── Authentication (login/register)
├── Product catalog with FlexVolt batteries
├── AI-powered chat (Claude integration)
├── Battery configuration quiz
├── Shopping cart & checkout
└── Account management

DEALER PORTAL (/dealer-portal)
├── CRM Dashboard overview
├── CRM Intelligence System (20+ dashboards)
│   ├── Content Creation Hub (3 dashboards)
│   ├── Analytics Hub (4 dashboards)
│   ├── Cost Management (4 dashboards)
│   ├── Operations Center (4 dashboards)
│   └── Meta Integration (4 dashboards)
└── Sales pipeline management

ADMIN PORTAL (/portal)
├── Business management
├── Order & inventory tracking
├── Billing & invoicing
└── System analytics
```

---

## MODULE 2: CODE ANALYSIS METHODOLOGY

### 2.1 EXISTING CODE STUDY PROTOCOL
**NEVER modify code without understanding the existing patterns**:

```markdown
STEP 1: IDENTIFY PATTERNS
- Examine 3-5 similar existing files before creating new ones
- Note naming conventions (kebab-case for files, PascalCase for components)
- Study component structure and prop patterns
- Understand state management approaches

STEP 2: DESIGN SYSTEM ADHERENCE
- Colors: Use EXACT values (#006FEE, #F8FAFC, #111827, #E5E7EB)
- Components: Follow established card, button, and layout patterns
- Spacing: Use 4px base unit system
- Transitions: Use 'all 0.3s ease' for animations
- Hover effects: translateY(-4px) with shadow

STEP 3: LITHI BRANDING REQUIREMENTS
- Primary blue: #006FEE (never approximate)
- Background: #F8FAFC for main areas
- Text hierarchy: #111827 primary, #6B7280 secondary
- Cards: White bg, 12px radius, #E6F4FF border
- Focus states: 0 0 0 3px rgba(0, 111, 238, 0.1) glow
```

### 2.2 COMPONENT CREATION STANDARDS
**Follow these patterns exactly**:

```typescript
// File structure pattern
'use client'

import React, { useState, useEffect } from 'react'
import { Icon1, Icon2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
// ... other imports

interface ComponentProps {
  // Define props with TypeScript
}

export default function ComponentName({ props }: ComponentProps) {
  // State management
  const [loading, setLoading] = useState(true)
  
  // Effects for data fetching
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        // API calls with error handling
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
    const interval = setInterval(fetchData, 300000) // 5-minute updates
    return () => clearInterval(interval)
  }, [dependencies])

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] p-6 flex items-center justify-center">
        <div className="text-[#6B7280]">Loading...</div>
      </div>
    )
  }

  // Main render with Lithi styling
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Content structure */}
      </div>
    </div>
  )
}
```

---

## MODULE 3: INCREMENTAL DEVELOPMENT APPROACH

### 3.1 ADDITIVE-ONLY PHILOSOPHY
**CRITICAL: Never remove existing working code**

```markdown
✅ ALWAYS DO:
- Add new features alongside existing ones
- Extend existing components with new props
- Add new API routes without modifying existing ones
- Create new utility functions rather than modifying existing
- Add new database fields/tables without breaking existing schema

❌ NEVER DO:
- Delete working components or functions
- Remove existing props or API endpoints
- Break existing functionality to add new features
- Rewrite large sections of working code
- Change established naming conventions
```

### 3.2 TASK MANAGEMENT PROTOCOL
**Use TodoWrite/TodoRead extensively**:

```markdown
STEP 1: ANALYZE THE REQUEST
- Break down user request into specific tasks
- Identify all affected systems and components
- Plan the implementation approach

STEP 2: CREATE TODO LIST
TodoWrite with specific, actionable items:
- "Create [Component] at [exact path]"
- "Add [feature] to existing [component]"
- "Implement [API endpoint] with [functionality]"
- "Test [feature] works with [existing system]"

STEP 3: EXECUTE INCREMENTALLY
- Mark tasks as in_progress (only ONE at a time)
- Complete each task fully before moving to next
- Mark completed immediately after finishing
- Update todo list with new tasks if discovered

STEP 4: VERIFY AND VALIDATE
- Test each component as it's built
- Check integration with existing systems
- Verify Lithi branding is correct
- Ensure responsive behavior works
```

---

## MODULE 4: ENTERPRISE DASHBOARD METHODOLOGY

### 4.1 DASHBOARD CREATION PATTERN
**Based on successful implementation of 20+ CRM dashboards**:

```markdown
STANDARD DASHBOARD STRUCTURE:
1. Header with title, description, and timeframe controls
2. Key metrics cards (4 across on desktop)
3. Primary visualization (charts/graphs)
4. Secondary visualizations (2 across)
5. Detailed data table
6. All with real-time updates (5-minute intervals)

REQUIRED FEATURES PER DASHBOARD:
- Loading states with proper UX
- Error handling and fallbacks
- Mock data for demonstrations
- Responsive design (mobile-friendly)
- Export functionality consideration
- Search and filtering where appropriate
- Consistent Lithi branding throughout
```

### 4.2 DATA VISUALIZATION STANDARDS
**Using Recharts library consistently**:

```typescript
// Standard chart configuration
<ResponsiveContainer width="100%" height={400}>
  <BarChart data={chartData}>
    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
    <XAxis dataKey="category" stroke="#6B7280" />
    <YAxis stroke="#6B7280" />
    <Tooltip 
      contentStyle={{ 
        backgroundColor: 'white', 
        border: '1px solid #E5E7EB',
        borderRadius: '8px'
      }}
    />
    <Bar dataKey="value" fill="#006FEE" />
  </BarChart>
</ResponsiveContainer>
```

---

## MODULE 5: INTEGRATION METHODOLOGY

### 5.1 NAVIGATION INTEGRATION
**All new features MUST be accessible via navigation**:

```markdown
SIDEBAR INTEGRATION PROCESS:
1. Examine /src/components/layout/sidebar.tsx
2. Find appropriate menu section
3. Add new routes to existing dropdown structure
4. Test navigation works from all entry points
5. Verify mobile responsiveness

DROPDOWN STRUCTURE:
- Use existing CRM Intelligence menu for dealer features
- Follow established icon and naming patterns
- Maintain alphabetical ordering within sections
```

### 5.2 API INTEGRATION PATTERNS
**Follow established API route structure**:

```typescript
// API route pattern (/src/app/api/[feature]/route.ts)
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Validate authentication if required
    // Process request
    // Return structured response
    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

---

## MODULE 6: QUALITY ASSURANCE CHECKLIST

### 6.1 PRE-DEPLOYMENT VERIFICATION
**MANDATORY checks before considering work complete**:

```markdown
VISUAL VERIFICATION:
□ All colors match Lithi brand exactly (#006FEE, #F8FAFC, etc.)
□ Hover states work on all interactive elements
□ Focus states visible and properly styled
□ Loading states display correctly
□ Error states handled gracefully
□ Mobile responsiveness works (test 375px, 768px, 1024px)

FUNCTIONAL VERIFICATION:
□ All navigation links work correctly
□ API endpoints respond properly
□ Data updates in real-time where expected
□ Form submissions work and validate
□ Authentication flows function properly
□ Search and filtering work if applicable

INTEGRATION VERIFICATION:
□ New features don't break existing functionality
□ Components work in different contexts
□ Database operations don't conflict
□ Performance remains acceptable
□ Build process completes without errors
```

### 6.2 BUILD AND DEPLOYMENT PROTOCOL
**Follow this exact sequence**:

```bash
# 1. Build verification
npm run build

# 2. Fix any build errors using established patterns
# 3. Test critical paths manually
# 4. Deploy to Vercel
vercel --prod

# 5. Verify deployment works
# 6. Test key features on production
```

---

## MODULE 7: ERROR PREVENTION STRATEGIES

### 7.1 COMMON PITFALLS TO AVOID
**Based on issues encountered during development**:

```markdown
IMPORT ERRORS:
- Always check exact export names (MetaPixel not MetaPixelService)
- Verify component dependencies exist before importing
- Use consistent import ordering (React, external libs, local components)

MISSING COMPONENTS:
- Check /src/components/ui/ for all required UI components
- Create missing components using Radix UI patterns
- Follow established component prop interfaces

STYLING INCONSISTENCIES:
- Never approximate colors - use exact Lithi values
- Maintain consistent spacing (multiples of 4px)
- Always implement hover and focus states
- Use established transition patterns

TYPESCRIPT ERRORS:
- Define proper interfaces for all props and data
- Use existing type definitions where available
- Avoid 'any' types - create proper interfaces
```

### 7.2 DEBUGGING METHODOLOGY
**When things go wrong**:

```markdown
SYSTEMATIC DEBUGGING:
1. Read error messages completely
2. Check file paths and imports first
3. Verify component dependencies exist
4. Test in isolation before integration
5. Use browser dev tools for runtime issues
6. Check Network tab for API problems
7. Examine console for JavaScript errors

BUILD ERROR RESOLUTION:
1. Focus on the first error (others may be cascading)
2. Check for missing imports/components
3. Verify TypeScript interfaces match usage
4. Ensure all paths are correct
5. Test locally before deploying
```

---

## MODULE 8: COLLABORATION AND HANDOFF

### 8.1 DOCUMENTATION REQUIREMENTS
**Every significant change must be documented**:

```markdown
REQUIRED DOCUMENTATION:
- Update LITHI_AI_PROJECT_CONTEXT.md with new features
- Add new components to component library reference
- Document API changes in appropriate sections
- Update navigation structure documentation
- Note any new dependencies or configuration

HANDOFF CHECKLIST:
□ All code properly commented where complex
□ Component props documented with TypeScript
□ API endpoints documented with expected inputs/outputs
□ Database schema changes documented
□ Any configuration changes noted
```

### 8.2 KNOWLEDGE TRANSFER PROTOCOL
**For future Claude sessions**:

```markdown
CONTEXT PRESERVATION:
- Always update LITHI_AI_PROJECT_CONTEXT.md
- Reference this methodology document
- Maintain consistent patterns across all work
- Document any deviations from standard patterns
- Preserve institutional knowledge in comments

SESSION HANDOFF:
- Summarize work completed
- Note any incomplete tasks
- Document any issues encountered
- Reference exact file paths and line numbers
- Maintain TodoWrite list for continuity
```

---

## MODULE 9: PERFORMANCE AND OPTIMIZATION

### 9.1 PERFORMANCE STANDARDS
**Maintain system performance**:

```markdown
LOADING OPTIMIZATION:
- Use loading states for all async operations
- Implement progressive loading where appropriate
- Cache data appropriately (5-minute intervals for dashboards)
- Minimize unnecessary re-renders
- Optimize image loading and sizing

CODE OPTIMIZATION:
- Follow React best practices (useCallback, useMemo where needed)
- Minimize bundle size by importing only needed components
- Use dynamic imports for large components
- Implement proper error boundaries
- Avoid memory leaks in useEffect hooks
```

### 9.2 SCALABILITY CONSIDERATIONS
**Build for growth**:

```markdown
ARCHITECTURAL DECISIONS:
- Use modular component structure
- Implement consistent data fetching patterns
- Design flexible API interfaces
- Plan for feature flags and A/B testing
- Consider multi-tenancy in data design
- Build reusable utility functions
```

---

## MODULE 10: SUCCESS METRICS AND VALIDATION

### 10.1 DEFINITION OF DONE
**Work is complete when**:

```markdown
FEATURE COMPLETION CRITERIA:
□ Feature works as specified in requirements
□ Integration with existing system confirmed
□ All error cases handled appropriately
□ Mobile responsiveness verified
□ Performance impact assessed and acceptable
□ Documentation updated
□ Build passes without warnings
□ Deployment successful
□ Post-deployment verification completed

QUALITY GATES:
□ Code follows established patterns
□ TypeScript types properly defined
□ Lithi branding consistent throughout
□ Accessibility considerations addressed
□ Security implications reviewed
□ User experience optimized
```

### 10.2 CONTINUOUS IMPROVEMENT
**Learn from each session**:

```markdown
POST-COMPLETION REVIEW:
- What patterns worked well?
- What caused unnecessary rework?
- How can the process be improved?
- What knowledge should be preserved?
- What tools/techniques were most effective?

METHODOLOGY UPDATES:
- Update this document with new learnings
- Refine patterns based on experience
- Add new error prevention strategies
- Improve efficiency techniques
- Document new best practices
```

---

## 🎯 FINAL MANDATE FOR ALL CLAUDE SESSIONS

**This methodology was used to successfully build a comprehensive enterprise system with 20+ dashboards, complete authentication, Meta integration, AI services, and full e-commerce functionality. It works. Follow it exactly.**

### CORE PRINCIPLES:
1. **UNDERSTAND FIRST** - Never code without complete context
2. **ADD, DON'T SUBTRACT** - Preserve existing functionality always
3. **MAINTAIN CONSISTENCY** - Follow established patterns religiously
4. **VERIFY THOROUGHLY** - Test everything before considering done
5. **DOCUMENT CHANGES** - Preserve knowledge for future sessions

### SUCCESS FORMULA:
```
Complete Context + Established Patterns + Incremental Changes + Thorough Testing = Successful Implementation
```

**Remember: This system serves real business needs for contractor battery sales. Every decision impacts user experience and business outcomes. Build with that responsibility in mind.**

---

**Created**: January 2025  
**Based on**: Successful implementation of Lithi AI battery dashboard system  
**Methodology proven through**: 20+ dashboard creation, complete CRM system, Meta integration, AI services  
**Success rate**: 100% when followed completely