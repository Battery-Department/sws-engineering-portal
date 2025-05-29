# LITHI AI PROJECT CONTEXT - COMPREHENSIVE DOCUMENTATION

**IMPORTANT: This file contains critical project context. Read this ENTIRE file before making ANY changes to the codebase.**

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Design System](#design-system)
4. [Project Structure](#project-structure)
5. [Major Features Implemented](#major-features-implemented)
6. [Dealer Portal CRM System](#dealer-portal-crm-system)
7. [Customer Portal](#customer-portal)
8. [API Architecture](#api-architecture)
9. [Database Schema](#database-schema)
10. [Authentication System](#authentication-system)
11. [Meta Integration](#meta-integration)
12. [AI Services](#ai-services)
13. [Common Issues & Solutions](#common-issues--solutions)
14. [Development Workflow](#development-workflow)
15. [Deployment Information](#deployment-information)

---

## 1. PROJECT OVERVIEW

### Business Context
- **Company**: Lithi AI / Battery Department
- **Product**: FlexVolt Batteries for contractors
- **Main Products**: 6Ah ($95), 9Ah ($125), 15Ah ($245) - All 20V/60V MAX compatible
- **Target Market**: Professional contractors and fleet managers
- **Volume Discounts**: 10% ($1000+), 15% ($2500+), 20% ($5000+)

### Application Overview
This is a comprehensive e-commerce and CRM platform featuring:
- Customer-facing e-commerce portal
- Dealer portal with advanced CRM capabilities
- AI-powered content generation
- Meta (Facebook) Pixel and Conversions API integration
- Real-time analytics and business intelligence
- Enterprise-grade management dashboards

### Key URLs
- **Production**: https://battery-dashboard-16dwryeg6-battery-departments-projects.vercel.app
- **Repository**: /Users/oliver/Lithi_AI/battery-dashboard

---

## 2. TECHNOLOGY STACK

### Core Technologies
```json
{
  "framework": "Next.js 15.3.2",
  "language": "TypeScript",
  "styling": "Tailwind CSS",
  "ui_components": "Radix UI + Custom Components",
  "database": "PostgreSQL with Prisma ORM",
  "authentication": "Custom JWT implementation",
  "deployment": "Vercel",
  "package_manager": "npm"
}
```

### Key Dependencies
- **Charts**: Recharts for data visualization
- **Forms**: React Hook Form with Zod validation
- **State Management**: React hooks and context
- **HTTP Client**: Axios
- **Queue System**: BullMQ with Redis
- **AI Integration**: OpenAI, Anthropic Claude
- **Image Processing**: Sharp
- **Meta SDK**: Facebook Pixel and Conversions API

---

## 3. DESIGN SYSTEM

### CRITICAL: Always Read DESIGN_SYSTEM.md
**File Location**: `/Users/oliver/Lithi_AI/battery-dashboard/DESIGN_SYSTEM.md`

### Lithi Brand Colors
```css
/* Primary Colors - MUST USE EXACT VALUES */
--primary-blue: #006FEE;
--dark-blue: #0050B3;
--darker-blue: #003A82;
--blue-gradient: linear-gradient(to right, #006FEE, #0050B3);

/* Background Colors */
--background-primary: #F8FAFC;
--background-secondary: #FFFFFF;
--background-hover: #F9FAFB;

/* Text Colors */
--text-primary: #111827;
--text-secondary: #374151;
--text-muted: #6B7280;
--text-light: #9CA3AF;

/* Border Colors */
--border-primary: #E5E7EB;
--border-secondary: #E6F4FF;
--border-focus: #006FEE;
```

### Component Standards
1. **Cards**: 
   - White background
   - 12px border radius
   - 2px solid #E6F4FF border
   - 24px padding
   - Hover effect: `translateY(-4px)` with shadow

2. **Buttons**:
   - Primary: #006FEE background, white text
   - Secondary: White background, #006FEE border
   - Hover states required
   - Transition: `all 0.3s ease`

3. **Focus States**:
   - Glow effect: `0 0 0 3px rgba(0, 111, 238, 0.1)`
   - All interactive elements must have focus states

---

## 4. PROJECT STRUCTURE

```
/Users/oliver/Lithi_AI/battery-dashboard/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── customer/          # Customer portal pages
│   │   ├── dealer-portal/     # Dealer portal pages
│   │   │   └── crm/          # CRM system with 20+ dashboards
│   │   ├── portal/           # Admin portal pages
│   │   └── api/              # API routes
│   ├── components/
│   │   ├── ui/               # Radix-based UI components
│   │   ├── layout/           # Layout components (Sidebar, Header)
│   │   └── features/         # Feature-specific components
│   ├── services/
│   │   ├── analytics/        # Analytics services
│   │   ├── meta/            # Meta integration services
│   │   ├── ai/              # AI provider services
│   │   └── queue/           # Job queue services
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions
│   └── types/               # TypeScript type definitions
├── prisma/
│   └── schema.prisma        # Database schema
├── public/                  # Static assets
├── DESIGN_SYSTEM.md        # Design system documentation
├── CLAUDE.md              # Claude AI instructions
└── LITHI_AI_PROJECT_CONTEXT.md  # This file
```

---

## 5. MAJOR FEATURES IMPLEMENTED

### Customer Portal (/customer)
1. **Authentication System**
   - Login/Register with JWT tokens
   - Session management
   - Protected routes

2. **E-commerce Features**
   - Product catalog with FlexVolt batteries
   - Shopping cart functionality
   - Checkout process
   - Order history
   - Invoice generation

3. **AI-Powered Chat**
   - Claude integration for customer support
   - Product recommendations
   - Real-time responses

4. **Battery Configuration Quiz**
   - Interactive quiz for battery selection
   - Personalized recommendations
   - Meta Pixel tracking

### Dealer Portal (/dealer-portal)
1. **Dashboard Overview**
   - Key metrics and KPIs
   - Sales performance
   - Recent activities

2. **CRM System** (/dealer-portal/crm)
   - Lead management
   - Customer relationship tracking
   - Sales pipeline
   - Activity logging

3. **Content Creation Suite**
   - AI-powered content generation
   - Asset library management
   - Social media content creator
   - Meta optimization

### Admin Portal (/portal)
1. **Business Management**
   - Order management
   - Inventory tracking
   - Billing and invoicing
   - Shipping management

2. **Analytics Dashboard**
   - Sales analytics
   - Customer insights
   - Performance metrics

3. **Settings & Configuration**
   - System settings
   - User management
   - API configuration

---

## 6. DEALER PORTAL CRM SYSTEM

### Overview
The CRM system is a comprehensive enterprise-grade solution with 20+ specialized dashboards.

### Navigation Structure
Located in: `/src/components/layout/sidebar.tsx`

```typescript
CRM Intelligence (Main Menu)
├── Content Creation Hub
│   ├── Content Studio (/dealer-portal/crm/content-studio)
│   ├── Asset Library (/dealer-portal/crm/assets)
│   └── AI Generator (/dealer-portal/crm/generate)
├── Analytics Hub
│   ├── Content Performance (/dealer-portal/crm/analytics/content)
│   ├── ROI Tracking (/dealer-portal/crm/analytics/roi)
│   ├── A/B Test Results (/dealer-portal/crm/analytics/testing)
│   └── Audience Insights (/dealer-portal/crm/analytics/audience)
├── Cost Management
│   ├── API Cost Tracking (/dealer-portal/crm/costs/api)
│   ├── Cost Per Content (/dealer-portal/crm/costs/content)
│   ├── Budget Tracking (/dealer-portal/crm/costs/budget)
│   └── Invoice History (/dealer-portal/crm/costs/invoices)
├── Operations Center
│   ├── System Health (/dealer-portal/crm/ops/health)
│   ├── Job Queue Monitor (/dealer-portal/crm/ops/queue)
│   ├── Error Tracking (/dealer-portal/crm/ops/errors)
│   └── API Keys (/dealer-portal/crm/ops/api-keys)
└── Meta Integration
    ├── Campaign Manager (/dealer-portal/crm/meta/campaigns)
    ├── Audience Builder (/dealer-portal/crm/meta/audiences)
    ├── Event Tracking (/dealer-portal/crm/meta/events)
    └── Performance (/dealer-portal/crm/meta/performance)
```

### Dashboard Features
Each dashboard includes:
- Real-time data updates (5-minute intervals)
- Interactive Recharts visualizations
- Comprehensive data tables
- Export functionality
- Responsive design
- Lithi branding throughout

### Key Services
1. **Dashboard Aggregator** (`/src/services/analytics/dashboard-aggregator.ts`)
   - Centralized data aggregation
   - Caching layer
   - Mock data generation for demos

2. **Content Generator** 
   - AI-powered content creation
   - Multiple content types (social, blog, email, video scripts)
   - Meta optimization

3. **Analytics Engine**
   - Performance tracking
   - ROI calculations
   - Audience segmentation

---

## 7. CUSTOMER PORTAL

### Key Pages
1. **Home** (`/customer`)
   - Product showcase
   - Featured batteries
   - Quick actions

2. **Products** (`/customer/products`)
   - FlexVolt battery catalog
   - Filtering and search
   - Add to cart functionality

3. **Chat Assistant** (`/customer/chat`)
   - Claude AI integration
   - Product recommendations
   - Support queries

4. **Battery Quiz** (`/customer/quiz`)
   - Interactive questionnaire
   - Personalized recommendations
   - Meta Pixel tracking

5. **Account Management** (`/customer/account`)
   - Profile settings
   - Order history
   - Saved addresses

### Shopping Flow
1. Browse products → 2. Add to cart → 3. Configure → 4. Payment → 5. Order confirmation

---

## 8. API ARCHITECTURE

### API Routes Structure
```
/api/
├── auth/                 # Authentication endpoints
│   ├── login
│   ├── register
│   └── session
├── customer/            # Customer-specific endpoints
│   └── auth/
├── ai/                  # AI service endpoints
│   └── providers
├── chat/               # Chat functionality
│   └── claude
├── quiz/               # Quiz system
│   ├── start
│   ├── response
│   └── complete
├── assets/             # Asset management
│   ├── upload
│   └── process
├── queue/              # Job queue management
│   ├── jobs
│   └── status
└── meta/               # Meta integration
    └── events
```

### Authentication Flow
1. User submits credentials
2. Server validates and generates JWT
3. Token stored in httpOnly cookie
4. Subsequent requests include token
5. Middleware validates token on protected routes

---

## 9. DATABASE SCHEMA

### Key Models (Prisma)
```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  role          UserRole  @default(CUSTOMER)
  passwordHash  String
  createdAt     DateTime  @default(now())
  sessions      Session[]
  orders        Order[]
}

model Product {
  id          String   @id @default(cuid())
  name        String
  sku         String   @unique
  price       Decimal
  description String?
  category    String
  stock       Int      @default(0)
}

model Order {
  id         String      @id @default(cuid())
  userId     String
  user       User        @relation(fields: [userId])
  status     OrderStatus
  total      Decimal
  items      OrderItem[]
  createdAt  DateTime    @default(now())
}
```

### Database Migrations
- Run `npx prisma migrate dev` for development
- Run `npx prisma migrate deploy` for production
- Schema location: `/prisma/schema.prisma`

---

## 10. AUTHENTICATION SYSTEM

### Implementation Details
- **Type**: Custom JWT-based authentication
- **Token Storage**: httpOnly cookies
- **Session Management**: Database-backed sessions
- **Role-Based Access**: CUSTOMER, DEALER, ADMIN roles

### Protected Routes
- Customer routes: `/customer/*` (except auth pages)
- Dealer routes: `/dealer-portal/*`
- Admin routes: `/portal/*`

### Authentication Hooks
- `useAuth()`: Current user state
- `useSession()`: Session management
- `useProtectedRoute()`: Route protection

---

## 11. META INTEGRATION

### Facebook Pixel
- **Service**: `/src/services/meta/pixel.ts`
- **Hook**: `useMetaPixel()`
- **Events Tracked**:
  - PageView
  - ViewContent
  - AddToCart
  - InitiateCheckout
  - Purchase
  - Lead
  - CompleteRegistration

### Conversions API
- **Service**: `/src/services/meta/conversions-api.ts`
- **Server-side event tracking**
- **Deduplication with Pixel events**
- **Enhanced user matching**

### Event Manager
- **Service**: `/src/services/meta/event-manager.ts`
- **Coordinates Pixel and CAPI**
- **Event deduplication**
- **Error handling and retry logic**

---

## 12. AI SERVICES

### Providers Integrated
1. **Claude (Anthropic)**
   - Customer chat support
   - Content generation
   - Product recommendations

2. **OpenAI**
   - GPT-4 for content creation
   - DALL-E 3 for image generation

3. **Stable Diffusion**
   - Product image generation
   - Marketing visuals

### AI Provider Manager
- **Location**: `/src/services/ai/provider-manager.ts`
- **Features**:
  - Provider health checks
  - Automatic fallback
  - Rate limiting
  - Error handling

---

## 13. COMMON ISSUES & SOLUTIONS

### Build Errors
1. **Missing UI Components**
   - Solution: Check `/src/components/ui/` for all required components
   - Common missing: Alert, Dialog, Checkbox

2. **Import Errors**
   - Meta services: Use `MetaPixel` not `MetaPixelService`
   - Always check exact export names

3. **Redis Connection Errors**
   - These are warnings, not failures
   - App works without Redis in development

### Development Issues
1. **Port 3000 in use**
   - Dev server will use 3001 automatically
   - Check with `lsof -i :3000` to find process

2. **TypeScript Errors**
   - Run `npm run type-check` to identify issues
   - Most common: missing types in `/src/types/`

---

## 14. DEVELOPMENT WORKFLOW

### Starting Development
```bash
cd /Users/oliver/Lithi_AI/battery-dashboard
npm install
npm run dev
```

### Running Tests
```bash
npm run test
npm run test:e2e
npm run test:integration
```

### Building for Production
```bash
npm run build
npm run start
```

### Database Commands
```bash
npx prisma migrate dev    # Create migration
npx prisma generate      # Generate client
npx prisma studio       # Open database GUI
```

### Linting and Formatting
```bash
npm run lint
npm run format
npm run type-check
```

---

## 15. DEPLOYMENT INFORMATION

### Vercel Deployment
- **Production URL**: https://battery-dashboard-16dwryeg6-battery-departments-projects.vercel.app
- **Deploy Command**: `vercel --prod`
- **Build Command**: `npm run build`
- **Environment Variables**: Set in Vercel dashboard

### Required Environment Variables
```env
DATABASE_URL=
JWT_SECRET=
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
META_PIXEL_ID=
META_ACCESS_TOKEN=
REDIS_URL=
NEXT_PUBLIC_APP_URL=
```

### Deployment Checklist
- [ ] Run build locally first
- [ ] Check all environment variables
- [ ] Test Meta Pixel integration
- [ ] Verify API endpoints
- [ ] Check responsive design
- [ ] Test authentication flow

---

## CRITICAL REMINDERS

1. **ALWAYS** read `/DESIGN_SYSTEM.md` before UI changes
2. **NEVER** use approximate colors - use exact Lithi brand values
3. **ALWAYS** implement hover and focus states
4. **TEST** responsive behavior on all screen sizes
5. **MAINTAIN** consistent spacing (4px base unit)
6. **FOLLOW** established patterns in existing code

## File References for Claude
When starting work on this project, Claude should always:
1. Read this file (`LITHI_AI_PROJECT_CONTEXT.md`)
2. Read `DESIGN_SYSTEM.md` for UI specifications
3. Read `CLAUDE.md` for general instructions
4. Check relevant component files before making changes

---

**Last Updated**: January 2025
**Version**: 1.0.0
**Maintained By**: Lithi AI Development Team