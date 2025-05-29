# CRM Enhancement with Meta-Ready Mode - Deployment Guide

## 📋 Table of Contents
1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Environment Configuration](#environment-configuration)
4. [Step-by-Step Activation](#step-by-step-activation)
5. [Testing in Production](#testing-in-production)
6. [Monitoring Setup](#monitoring-setup)
7. [Troubleshooting](#troubleshooting)
8. [Rollback Procedures](#rollback-procedures)

## 🎯 Overview

The CRM Enhancement system is designed to work in two modes:
- **Test Mode** (Default): Fully functional with simulated data, no Meta credentials required
- **Production Mode**: Real Meta integration with Pixel and Conversions API

### Key Features
- 150+ behavioral data points collection
- Meta Pixel and Conversions API integration
- AI-powered audience segmentation
- Privacy-compliant tracking (GDPR/CCPA)
- Real-time analytics dashboard

## ✅ Prerequisites

### Required Services
- Node.js 18+ and npm/yarn
- PostgreSQL database
- Redis instance (or Vercel KV)
- Vercel account (for hosting and blob storage)

### Optional Services (for production)
- Meta Business Account
- Meta Pixel ID
- Meta Access Token
- SSL certificate for HTTPS

## 🔧 Environment Configuration

### 1. Copy Environment Template
```bash
cp .env.example .env.local
```

### 2. Configure Core Services

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/lithiai"

# Redis (Vercel KV)
KV_REST_API_URL="https://your-kv-instance.vercel.app"
KV_REST_API_TOKEN="your-kv-token"

# Vercel Blob Storage
BLOB_READ_WRITE_TOKEN="your-blob-token"
```

### 3. Meta Configuration (Test Mode - Default)

```env
# Meta Integration (Test Mode)
NEXT_PUBLIC_META_TEST_MODE="true"
NEXT_PUBLIC_META_PIXEL_ID="TEST_PIXEL_123"
META_ACCESS_TOKEN="TEST_ACCESS_TOKEN"
META_BUSINESS_ID="TEST_BUSINESS_123"

# Feature Flags
ENABLE_CRM_ENHANCEMENT="true"
ENABLE_META_INTEGRATION="false"  # Keep false for test mode
```

### 4. Production Meta Configuration

When ready to activate real Meta integration:

```env
# Meta Integration (Production)
NEXT_PUBLIC_META_TEST_MODE="false"
NEXT_PUBLIC_META_PIXEL_ID="your-actual-pixel-id"
META_ACCESS_TOKEN="your-actual-access-token"
META_BUSINESS_ID="your-business-id"
META_APP_ID="your-app-id"
META_APP_SECRET="your-app-secret"

# Enable Meta Integration
ENABLE_META_INTEGRATION="true"

# Conversions API
META_DATASET_ID="your-dataset-id"
META_TEST_EVENT_CODE=""  # Remove for production
```

## 🚀 Step-by-Step Activation

### Phase 1: Deploy in Test Mode

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Database Migrations**
   ```bash
   npx prisma migrate deploy
   ```

3. **Build Application**
   ```bash
   npm run build
   ```

4. **Start in Test Mode**
   ```bash
   npm run start
   ```

5. **Verify Test Mode**
   - Navigate to `/dealer-portal/crm`
   - Check "Meta Integration Status" shows "Test Mode"
   - Verify events are being logged in Event Timeline

### Phase 2: Validate Test Mode

Run through this checklist:
- [ ] CRM Dashboard loads successfully
- [ ] Meta Simulator generates test events
- [ ] User profiles display with 150+ data points
- [ ] Audience segments update dynamically
- [ ] Privacy consent banner appears
- [ ] Export functions work (CSV/JSON)

### Phase 3: Prepare for Production

1. **Create Meta Assets**
   - Log into Meta Business Manager
   - Create/locate your Pixel ID
   - Generate System User Access Token
   - Set up Conversions API dataset

2. **Configure Domain Verification**
   ```html
   <!-- Add to your domain's root -->
   <meta name="facebook-domain-verification" content="your-verification-code" />
   ```

3. **Update Privacy Policy**
   - Include Meta Pixel disclosure
   - Update data collection practices
   - Add opt-out instructions

### Phase 4: Activate Production Mode

1. **Update Environment Variables**
   ```bash
   # Edit .env.local with real Meta credentials
   NEXT_PUBLIC_META_TEST_MODE="false"
   NEXT_PUBLIC_META_PIXEL_ID="284052970499437"  # Example
   META_ACCESS_TOKEN="EAAGm3..."  # Your token
   ENABLE_META_INTEGRATION="true"
   ```

2. **Deploy Changes**
   ```bash
   npm run build
   npm run deploy
   ```

3. **Verify Meta Events**
   - Open Meta Events Manager
   - Check for incoming events
   - Verify event parameters

## 🧪 Testing in Production

### 1. Use Meta Test Events
```env
# Temporarily enable test events
META_TEST_EVENT_CODE="TEST12345"
```

### 2. Verify Event Flow
1. Navigate to your site
2. Complete a user journey (browse → quiz → purchase)
3. Check Meta Events Manager Test Events tab
4. Verify all events appear correctly

### 3. Production Smoke Tests
```bash
# Health check
curl https://your-domain.com/api/health

# Expected response:
{
  "status": "healthy",
  "services": {
    "meta_pixel": { "status": "healthy" },
    "conversions_api": { "status": "healthy" }
  }
}
```

## 📊 Monitoring Setup

### 1. Key Metrics to Monitor

#### Event Collection
- Events per minute: Target > 100
- Failed events: Should be < 1%
- Event latency: < 500ms

#### API Performance
- CAPI success rate: > 99%
- Queue size: < 1000 events
- Processing time: < 2s per batch

#### User Engagement
- Active users: Track daily
- Conversion rate: Monitor trends
- Audience growth: Weekly review

### 2. Set Up Alerts

```javascript
// Add to your monitoring service
const alerts = [
  {
    metric: "event_failure_rate",
    threshold: 0.05,  // 5%
    action: "email"
  },
  {
    metric: "api_response_time",
    threshold: 2000,  // 2 seconds
    action: "slack"
  },
  {
    metric: "queue_size",
    threshold: 5000,
    action: "pagerduty"
  }
];
```

### 3. Dashboard Access
- Production metrics: `/dealer-portal/crm`
- Health endpoint: `/api/health`
- Metrics export: `/api/metrics`

## 🔍 Troubleshooting

### Common Issues and Solutions

#### 1. Meta Pixel Not Firing
```javascript
// Check in browser console
if (typeof fbq === 'undefined') {
  console.error('Meta Pixel not loaded');
}

// Verify initialization
localStorage.getItem('meta_test_events');  // Should have events in test mode
```

#### 2. CAPI Events Not Sending
```bash
# Check API access
curl -X GET \
  "https://graph.facebook.com/v18.0/YOUR_PIXEL_ID" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

#### 3. High Event Failure Rate
- Check network connectivity
- Verify Meta credentials
- Review error logs: `npm run logs`

#### 4. Memory Issues
```bash
# Increase Node memory
NODE_OPTIONS="--max-old-space-size=4096" npm run start
```

### Debug Mode
```env
# Enable debug logging
DEBUG="meta:*,analytics:*"
LOG_LEVEL="debug"
```

## 🔄 Rollback Procedures

### Quick Rollback to Test Mode
```bash
# 1. Update environment
NEXT_PUBLIC_META_TEST_MODE="true"
ENABLE_META_INTEGRATION="false"

# 2. Restart application
npm run restart

# 3. Verify test mode active
curl https://your-domain.com/api/health | jq '.services.meta_pixel.test_mode'
```

### Full Rollback
```bash
# 1. Disable CRM features
ENABLE_CRM_ENHANCEMENT="false"

# 2. Deploy previous version
git checkout previous-release-tag
npm run deploy

# 3. Clear browser data
localStorage.clear();  // Run in browser console
```

## 📝 Post-Deployment Checklist

### Day 1
- [ ] Verify all services healthy
- [ ] Check Meta Events Manager
- [ ] Monitor error rates
- [ ] Review user consent rates
- [ ] Test export functionality

### Week 1
- [ ] Analyze event collection rates
- [ ] Review audience growth
- [ ] Check attribution accuracy
- [ ] Optimize slow queries
- [ ] Update documentation

### Month 1
- [ ] Full performance audit
- [ ] Privacy compliance review
- [ ] ROI analysis
- [ ] Plan optimizations
- [ ] Team training session

## 🆘 Support Contacts

### Internal
- Tech Lead: tech@lithiai.com
- DevOps: devops@lithiai.com

### External
- Meta Support: https://business.facebook.com/help
- Vercel Support: https://vercel.com/support

## 📚 Additional Resources

- [Meta Pixel Documentation](https://developers.facebook.com/docs/meta-pixel)
- [Conversions API Guide](https://developers.facebook.com/docs/marketing-api/conversions-api)
- [Privacy Best Practices](https://www.facebook.com/business/help/2061095827442514)
- [Performance Optimization](https://web.dev/vitals/)

---

**Remember**: Always test in Test Mode first. The system is designed to be fully functional without Meta credentials, allowing complete validation before going live.