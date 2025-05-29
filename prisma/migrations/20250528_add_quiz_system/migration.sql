-- Migration: Add Quiz Funnel System Tables
-- Date: 2025-05-28
-- Description: Extends existing schema with quiz functionality

-- Quiz definitions table
CREATE TABLE "quizzes" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL DEFAULT 'lead_generation', -- 'lead_generation', 'assessment', 'survey'
    "status" TEXT NOT NULL DEFAULT 'active', -- 'draft', 'active', 'archived'
    "questions" TEXT NOT NULL, -- JSON string of questions array
    "settings" TEXT, -- JSON string of quiz settings
    "created_by" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("created_by") REFERENCES "User" ("id") ON DELETE SET NULL
);

-- Quiz sessions table (tracks individual quiz attempts)
CREATE TABLE "quiz_sessions" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    "quiz_id" TEXT NOT NULL,
    "user_id" TEXT,
    "visitor_id" TEXT, -- For anonymous users
    "status" TEXT NOT NULL DEFAULT 'in_progress', -- 'in_progress', 'completed', 'abandoned'
    "current_step" INTEGER NOT NULL DEFAULT 0,
    "responses" TEXT, -- JSON string of user responses
    "score" REAL,
    "completion_rate" REAL,
    "recommendation" TEXT, -- JSON string of generated recommendation
    "source" TEXT, -- 'facebook_ad', 'google_ad', 'organic', 'direct'
    "utm_source" TEXT,
    "utm_medium" TEXT,
    "utm_campaign" TEXT,
    "utm_content" TEXT, -- UTM content parameter
    "utm_term" TEXT, -- UTM term parameter
    "content_id" TEXT, -- Links to content_items(id) from content machine
    "campaign_id" TEXT, -- Links to marketing campaigns
    "device_info" TEXT, -- JSON string of device information
    "landing_page" TEXT, -- Which page they landed on (/quiz vs /customer/quiz)
    "referrer" TEXT, -- HTTP referrer
    "ip_address" TEXT, -- Client IP for geo analysis
    "user_agent" TEXT, -- Full user agent string
    "start_time" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_time" DATETIME,
    "last_activity" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("quiz_id") REFERENCES "quizzes" ("id") ON DELETE CASCADE,
    FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE SET NULL
);

-- Quiz responses table (detailed response tracking)
CREATE TABLE "quiz_responses" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    "session_id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "question_type" TEXT NOT NULL, -- 'single-choice', 'multi-choice', 'scale', 'text', 'image-choice'
    "response_value" TEXT, -- JSON string of response data
    "response_time" INTEGER, -- Time taken to answer in milliseconds
    "is_skipped" BOOLEAN NOT NULL DEFAULT FALSE,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("session_id") REFERENCES "quiz_sessions" ("id") ON DELETE CASCADE
);

-- Quiz analytics events table (detailed event tracking)
CREATE TABLE "quiz_analytics_events" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    "session_id" TEXT NOT NULL,
    "event_type" TEXT NOT NULL, -- 'quiz_started', 'question_viewed', 'question_answered', 'quiz_completed', etc.
    "event_data" TEXT, -- JSON string of event-specific data
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "page_url" TEXT,
    "referrer" TEXT,
    "user_agent" TEXT,
    FOREIGN KEY ("session_id") REFERENCES "quiz_sessions" ("id") ON DELETE CASCADE
);

-- Quiz A/B tests table (for optimization experiments)
CREATE TABLE "quiz_ab_tests" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    "quiz_id" TEXT NOT NULL,
    "test_name" TEXT NOT NULL,
    "variant_a" TEXT NOT NULL, -- JSON string of variant A configuration
    "variant_b" TEXT NOT NULL, -- JSON string of variant B configuration
    "traffic_split" REAL NOT NULL DEFAULT 50.0, -- Percentage of traffic to variant B
    "status" TEXT NOT NULL DEFAULT 'running', -- 'draft', 'running', 'completed', 'paused'
    "start_date" DATETIME,
    "end_date" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("quiz_id") REFERENCES "quizzes" ("id") ON DELETE CASCADE
);

-- Quiz conversion tracking table
CREATE TABLE "quiz_conversions" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    "session_id" TEXT NOT NULL,
    "conversion_type" TEXT NOT NULL, -- 'cart_add', 'purchase', 'lead_form', 'phone_call'
    "conversion_value" REAL, -- Monetary value if applicable
    "product_ids" TEXT, -- JSON array of product IDs
    "converted_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "attribution_window" INTEGER NOT NULL DEFAULT 30, -- Days
    FOREIGN KEY ("session_id") REFERENCES "quiz_sessions" ("id") ON DELETE CASCADE
);

-- Indexes for performance optimization
CREATE INDEX "idx_quiz_sessions_quiz_id" ON "quiz_sessions" ("quiz_id");
CREATE INDEX "idx_quiz_sessions_user_id" ON "quiz_sessions" ("user_id");
CREATE INDEX "idx_quiz_sessions_status" ON "quiz_sessions" ("status");
CREATE INDEX "idx_quiz_sessions_source" ON "quiz_sessions" ("source");
CREATE INDEX "idx_quiz_sessions_utm_source" ON "quiz_sessions" ("utm_source");
CREATE INDEX "idx_quiz_sessions_utm_campaign" ON "quiz_sessions" ("utm_campaign");
CREATE INDEX "idx_quiz_sessions_utm_content" ON "quiz_sessions" ("utm_content");
CREATE INDEX "idx_quiz_sessions_content_id" ON "quiz_sessions" ("content_id");
CREATE INDEX "idx_quiz_sessions_campaign_id" ON "quiz_sessions" ("campaign_id");
CREATE INDEX "idx_quiz_sessions_landing_page" ON "quiz_sessions" ("landing_page");
CREATE INDEX "idx_quiz_sessions_created_at" ON "quiz_sessions" ("created_at");
CREATE INDEX "idx_quiz_sessions_last_activity" ON "quiz_sessions" ("last_activity");

CREATE INDEX "idx_quiz_responses_session_id" ON "quiz_responses" ("session_id");
CREATE INDEX "idx_quiz_responses_question_id" ON "quiz_responses" ("question_id");

CREATE INDEX "idx_quiz_analytics_events_session_id" ON "quiz_analytics_events" ("session_id");
CREATE INDEX "idx_quiz_analytics_events_type" ON "quiz_analytics_events" ("event_type");
CREATE INDEX "idx_quiz_analytics_events_timestamp" ON "quiz_analytics_events" ("timestamp");

CREATE INDEX "idx_quiz_conversions_session_id" ON "quiz_conversions" ("session_id");
CREATE INDEX "idx_quiz_conversions_type" ON "quiz_conversions" ("conversion_type");
CREATE INDEX "idx_quiz_conversions_converted_at" ON "quiz_conversions" ("converted_at");

CREATE INDEX "idx_quiz_ab_tests_quiz_id" ON "quiz_ab_tests" ("quiz_id");
CREATE INDEX "idx_quiz_ab_tests_status" ON "quiz_ab_tests" ("status");

-- Insert default quiz
INSERT INTO "quizzes" ("id", "title", "description", "type", "questions", "settings") VALUES (
    'battery-assessment-quiz',
    'Battery Fleet Assessment',
    'Find the perfect battery solution for your construction team',
    'lead_generation',
    '[
        {
            "id": "project-size",
            "type": "image-choice",
            "title": "What size team do you typically work with?",
            "subtitle": "This helps us recommend the right battery fleet size",
            "category": "team-assessment",
            "required": true,
            "options": [
                {"id": "solo", "label": "Solo/1-2 People", "value": "small", "description": "1-2 workers, residential projects"},
                {"id": "mid", "label": "Mid-Size Team", "value": "medium", "description": "3-6 workers, commercial projects"},
                {"id": "large", "label": "Large Crew", "value": "large", "description": "7+ workers, major construction"}
            ]
        },
        {
            "id": "daily-runtime",
            "type": "single-choice",
            "title": "How many hours do you typically use power tools per day?",
            "subtitle": "This determines your daily battery capacity needs",
            "category": "usage-pattern",
            "required": true,
            "options": [
                {"id": "light", "label": "2-4 hours", "value": "light", "description": "Light usage - finish work, occasional cutting"},
                {"id": "moderate", "label": "4-6 hours", "value": "moderate", "description": "Moderate usage - standard construction day"},
                {"id": "heavy", "label": "6-8 hours", "value": "heavy", "description": "Heavy usage - full day heavy construction"},
                {"id": "continuous", "label": "8+ hours", "value": "continuous", "description": "Continuous usage - non-stop operations"}
            ]
        },
        {
            "id": "primary-tools",
            "type": "multi-choice",
            "title": "Which tools do you use most frequently?",
            "subtitle": "Select all that apply - this affects battery drain calculations",
            "category": "tool-assessment",
            "required": true,
            "options": [
                {"id": "circular-saw", "label": "Circular Saw", "value": "circular_saw"},
                {"id": "impact-driver", "label": "Impact Driver", "value": "impact_driver"},
                {"id": "drill", "label": "Drill", "value": "drill"},
                {"id": "reciprocating-saw", "label": "Reciprocating Saw", "value": "reciprocating_saw"},
                {"id": "grinder", "label": "Grinder", "value": "grinder"},
                {"id": "miter-saw", "label": "Miter Saw", "value": "miter_saw"}
            ]
        },
        {
            "id": "budget-range",
            "type": "scale",
            "title": "What is your typical monthly budget for batteries and power supplies?",
            "subtitle": "This helps us recommend the most cost-effective solution",
            "category": "budget-assessment",
            "required": true,
            "options": [
                {"id": "budget-1", "label": "$500-$1,000", "value": 500},
                {"id": "budget-2", "label": "$1,000-$2,500", "value": 1000},
                {"id": "budget-3", "label": "$2,500-$5,000", "value": 2500},
                {"id": "budget-4", "label": "$5,000+", "value": 5000}
            ]
        }
    ]',
    '{
        "allowSkip": false,
        "showProgress": true,
        "enableSwipeNavigation": true,
        "autoAdvanceSingleChoice": true,
        "saveProgress": true,
        "analyticsEnabled": true,
        "mobileOptimized": true,
        "maxTimePerQuestion": 120,
        "collectDeviceInfo": true
    }'
);