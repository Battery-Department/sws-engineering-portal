-- Migration: Add Enhanced Analytics System Tables
-- Date: 2025-05-29
-- Description: Adds comprehensive analytics tracking with 150+ data points

-- Analytics Events table - stores all tracked events
CREATE TABLE "AnalyticsEvent" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    "sessionId" TEXT NOT NULL,
    "userId" TEXT,
    "eventName" TEXT NOT NULL,
    "eventCategory" TEXT NOT NULL,
    "eventData" TEXT NOT NULL, -- JSON compressed event data
    "dataPoints" TEXT NOT NULL, -- JSON compressed data points (150+)
    "context" TEXT NOT NULL, -- JSON context data
    "timestamp" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Analytics Sessions table - tracks user sessions
CREATE TABLE "AnalyticsSession" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    "userId" TEXT,
    "visitorId" TEXT,
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME,
    "duration" INTEGER,
    "pageViews" INTEGER NOT NULL DEFAULT 0,
    "events" INTEGER NOT NULL DEFAULT 0,
    "bounced" BOOLEAN NOT NULL DEFAULT false,
    
    -- Attribution data
    "source" TEXT,
    "medium" TEXT,
    "campaign" TEXT,
    "content" TEXT,
    "term" TEXT,
    
    -- Device/Browser
    "deviceType" TEXT,
    "deviceBrand" TEXT,
    "browser" TEXT,
    "os" TEXT,
    "screenResolution" TEXT,
    
    -- Geographic
    "country" TEXT,
    "region" TEXT,
    "city" TEXT,
    
    -- Aggregated metrics
    "engagementScore" REAL,
    "conversionValue" REAL,
    
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Analytics Metrics table - stores metric definitions and cached values
CREATE TABLE "AnalyticsMetric" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    "name" TEXT NOT NULL UNIQUE,
    "type" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "calculation" TEXT NOT NULL, -- JSON calculation definition
    
    -- Cached aggregations
    "dailyValues" TEXT, -- JSON last 30 days
    "weeklyValues" TEXT, -- JSON last 12 weeks
    "monthlyValues" TEXT, -- JSON last 12 months
    
    "lastCalculated" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Analytics Cohorts table - user cohort definitions
CREATE TABLE "AnalyticsCohort" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    "name" TEXT NOT NULL UNIQUE,
    "definition" TEXT NOT NULL, -- JSON cohort definition
    "userCount" INTEGER NOT NULL DEFAULT 0,
    
    -- Cached metrics
    "retentionData" TEXT, -- JSON retention data
    "engagementData" TEXT, -- JSON engagement metrics
    "revenueData" TEXT, -- JSON revenue metrics
    
    "lastUpdated" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Analytics Funnels table - conversion funnel definitions
CREATE TABLE "AnalyticsFunnel" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    "name" TEXT NOT NULL UNIQUE,
    "steps" TEXT NOT NULL, -- JSON funnel steps
    
    -- Cached conversion data
    "conversionRates" TEXT, -- JSON conversion rates
    "dropoffRates" TEXT, -- JSON dropoff rates
    "avgTimePerStep" TEXT, -- JSON average time per step
    
    "lastCalculated" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Analytics Attribution table - marketing attribution data
CREATE TABLE "AnalyticsAttribution" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    "userId" TEXT NOT NULL,
    "conversionId" TEXT,
    "conversionType" TEXT NOT NULL,
    "conversionValue" REAL,
    
    -- Attribution data
    "touchpoints" TEXT NOT NULL, -- JSON array of touchpoints
    "model" TEXT NOT NULL, -- Attribution model
    "channelWeights" TEXT NOT NULL, -- JSON channel weights
    
    "convertedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Analytics Segments table - user segment definitions
CREATE TABLE "AnalyticsSegment" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    "name" TEXT NOT NULL UNIQUE,
    "type" TEXT NOT NULL,
    "conditions" TEXT NOT NULL, -- JSON segment conditions
    "userCount" INTEGER NOT NULL DEFAULT 0,
    
    -- Performance metrics
    "avgEngagement" REAL,
    "avgRevenue" REAL,
    "conversionRate" REAL,
    
    "lastUpdated" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Analytics Reports table - scheduled reports
CREATE TABLE "AnalyticsReport" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "definition" TEXT NOT NULL, -- JSON report configuration
    
    -- Scheduling
    "schedule" TEXT,
    "lastRun" DATETIME,
    "nextRun" DATETIME,
    
    -- Distribution
    "recipients" TEXT, -- JSON email addresses
    "format" TEXT NOT NULL DEFAULT 'pdf',
    
    "createdBy" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX "idx_analytics_event_session_id" ON "AnalyticsEvent" ("sessionId");
CREATE INDEX "idx_analytics_event_user_id" ON "AnalyticsEvent" ("userId");
CREATE INDEX "idx_analytics_event_name" ON "AnalyticsEvent" ("eventName");
CREATE INDEX "idx_analytics_event_category" ON "AnalyticsEvent" ("eventCategory");
CREATE INDEX "idx_analytics_event_timestamp" ON "AnalyticsEvent" ("timestamp");
CREATE INDEX "idx_analytics_event_created_at" ON "AnalyticsEvent" ("createdAt");

CREATE INDEX "idx_analytics_session_user_id" ON "AnalyticsSession" ("userId");
CREATE INDEX "idx_analytics_session_visitor_id" ON "AnalyticsSession" ("visitorId");
CREATE INDEX "idx_analytics_session_start_time" ON "AnalyticsSession" ("startTime");
CREATE INDEX "idx_analytics_session_source" ON "AnalyticsSession" ("source");
CREATE INDEX "idx_analytics_session_country" ON "AnalyticsSession" ("country");

CREATE INDEX "idx_analytics_metric_name" ON "AnalyticsMetric" ("name");
CREATE INDEX "idx_analytics_metric_category" ON "AnalyticsMetric" ("category");

CREATE INDEX "idx_analytics_cohort_name" ON "AnalyticsCohort" ("name");

CREATE INDEX "idx_analytics_funnel_name" ON "AnalyticsFunnel" ("name");

CREATE INDEX "idx_analytics_attribution_user_id" ON "AnalyticsAttribution" ("userId");
CREATE INDEX "idx_analytics_attribution_conversion_type" ON "AnalyticsAttribution" ("conversionType");
CREATE INDEX "idx_analytics_attribution_converted_at" ON "AnalyticsAttribution" ("convertedAt");

CREATE INDEX "idx_analytics_segment_name" ON "AnalyticsSegment" ("name");
CREATE INDEX "idx_analytics_segment_type" ON "AnalyticsSegment" ("type");

CREATE INDEX "idx_analytics_report_type" ON "AnalyticsReport" ("type");
CREATE INDEX "idx_analytics_report_created_by" ON "AnalyticsReport" ("createdBy");

-- Add triggers for updated_at
CREATE TRIGGER update_analytics_session_updated_at AFTER UPDATE ON "AnalyticsSession"
BEGIN
  UPDATE "AnalyticsSession" SET "updatedAt" = CURRENT_TIMESTAMP WHERE "id" = NEW."id";
END;

CREATE TRIGGER update_analytics_metric_updated_at AFTER UPDATE ON "AnalyticsMetric"
BEGIN
  UPDATE "AnalyticsMetric" SET "updatedAt" = CURRENT_TIMESTAMP WHERE "id" = NEW."id";
END;

CREATE TRIGGER update_analytics_cohort_updated_at AFTER UPDATE ON "AnalyticsCohort"
BEGIN
  UPDATE "AnalyticsCohort" SET "updatedAt" = CURRENT_TIMESTAMP WHERE "id" = NEW."id";
END;

CREATE TRIGGER update_analytics_funnel_updated_at AFTER UPDATE ON "AnalyticsFunnel"
BEGIN
  UPDATE "AnalyticsFunnel" SET "updatedAt" = CURRENT_TIMESTAMP WHERE "id" = NEW."id";
END;

CREATE TRIGGER update_analytics_segment_updated_at AFTER UPDATE ON "AnalyticsSegment"
BEGIN
  UPDATE "AnalyticsSegment" SET "updatedAt" = CURRENT_TIMESTAMP WHERE "id" = NEW."id";
END;

CREATE TRIGGER update_analytics_report_updated_at AFTER UPDATE ON "AnalyticsReport"
BEGIN
  UPDATE "AnalyticsReport" SET "updatedAt" = CURRENT_TIMESTAMP WHERE "id" = NEW."id";
END;