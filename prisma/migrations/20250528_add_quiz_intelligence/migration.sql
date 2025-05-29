-- Migration: Add Quiz Intelligence System
-- Date: 2025-05-28
-- Description: Extends quiz system with behavioral tracking and ML capabilities

-- Behavioral tracking for micro-interactions
CREATE TABLE "quiz_interactions" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    "session_id" TEXT NOT NULL,
    "interaction_type" TEXT NOT NULL, -- 'click', 'hover', 'scroll', 'hesitation', 'focus', 'blur'
    "element_id" TEXT, -- DOM element identifier
    "interaction_data" TEXT, -- JSON data specific to interaction type
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processed" BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY ("session_id") REFERENCES "quiz_sessions" ("id") ON DELETE CASCADE
);

-- User behavioral profiles
CREATE TABLE "quiz_user_profiles" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    "user_id" TEXT,
    "visitor_id" TEXT,
    "behavioral_profile" TEXT, -- JSON: mouse patterns, click behavior, hesitation metrics
    "cognitive_profile" TEXT, -- JSON: comprehension speed, decision patterns, cognitive load
    "psychological_profile" TEXT, -- JSON: personality markers, emotional state, motivation
    "business_profile" TEXT, -- JSON: B2B vs B2C indicators, purchase intent, value prediction
    "predictive_scores" TEXT, -- JSON: dropout risk, conversion probability, LTV prediction
    "segment" TEXT, -- Primary user segment
    "confidence_score" REAL DEFAULT 0, -- Confidence in profiling (0-1)
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE SET NULL
);

-- ML feature vectors for model training
CREATE TABLE "quiz_ml_features" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    "session_id" TEXT NOT NULL,
    "feature_vector" TEXT NOT NULL, -- JSON: encoded features for ML model
    "outcome_data" TEXT, -- JSON: actual outcomes (completion, conversion, etc.)
    "model_version" TEXT NOT NULL,
    "prediction_accuracy" REAL, -- How accurate was the prediction
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("session_id") REFERENCES "quiz_sessions" ("id") ON DELETE CASCADE
);

-- Real-time interventions
CREATE TABLE "quiz_interventions" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    "session_id" TEXT NOT NULL,
    "intervention_type" TEXT NOT NULL, -- 'tooltip', 'encouragement', 'simplification', 'exit_intent'
    "trigger_reason" TEXT NOT NULL, -- What caused the intervention
    "intervention_data" TEXT, -- JSON: intervention configuration
    "outcome" TEXT, -- 'success', 'ignored', 'abandoned'
    "impact_score" REAL, -- Measured impact on session
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("session_id") REFERENCES "quiz_sessions" ("id") ON DELETE CASCADE
);

-- A/B test experiments
CREATE TABLE "quiz_experiments" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    "experiment_name" TEXT NOT NULL,
    "quiz_id" TEXT NOT NULL,
    "variant_a" TEXT NOT NULL, -- JSON: control configuration
    "variant_b" TEXT NOT NULL, -- JSON: test configuration
    "traffic_split" REAL NOT NULL DEFAULT 50.0,
    "status" TEXT NOT NULL DEFAULT 'running', -- 'draft', 'running', 'completed', 'paused'
    "start_date" DATETIME,
    "end_date" DATETIME,
    "statistical_significance" REAL, -- p-value
    "winning_variant" TEXT, -- 'A', 'B', or NULL
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("quiz_id") REFERENCES "quizzes" ("id") ON DELETE CASCADE
);

-- Experiment assignments
CREATE TABLE "quiz_experiment_assignments" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    "session_id" TEXT NOT NULL,
    "experiment_id" TEXT NOT NULL,
    "variant" TEXT NOT NULL, -- 'A' or 'B'
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("session_id") REFERENCES "quiz_sessions" ("id") ON DELETE CASCADE,
    FOREIGN KEY ("experiment_id") REFERENCES "quiz_experiments" ("id") ON DELETE CASCADE
);

-- Real-time session monitoring
CREATE TABLE "quiz_session_monitoring" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    "session_id" TEXT NOT NULL,
    "current_question" INTEGER NOT NULL,
    "engagement_score" REAL NOT NULL DEFAULT 0,
    "dropout_risk" REAL NOT NULL DEFAULT 0,
    "intervention_needed" BOOLEAN NOT NULL DEFAULT FALSE,
    "last_activity" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_active" BOOLEAN NOT NULL DEFAULT TRUE,
    FOREIGN KEY ("session_id") REFERENCES "quiz_sessions" ("id") ON DELETE CASCADE
);

-- Meta attribution tracking (Meta-ready placeholders)
CREATE TABLE "quiz_meta_attribution" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    "session_id" TEXT NOT NULL,
    "facebook_click_id" TEXT, -- fbclid
    "facebook_browser_id" TEXT, -- fbc
    "facebook_pixel_id" TEXT, -- Meta Pixel ID
    "meta_campaign_id" TEXT,
    "meta_adset_id" TEXT,
    "meta_ad_id" TEXT,
    "meta_placement" TEXT,
    "meta_objective" TEXT,
    "attribution_data" TEXT, -- JSON: full Meta attribution payload
    "events_sent" TEXT, -- JSON: array of events sent to Meta
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("session_id") REFERENCES "quiz_sessions" ("id") ON DELETE CASCADE
);

-- Performance optimization indexes
CREATE INDEX "idx_quiz_interactions_session" ON "quiz_interactions" ("session_id");
CREATE INDEX "idx_quiz_interactions_type" ON "quiz_interactions" ("interaction_type");
CREATE INDEX "idx_quiz_interactions_timestamp" ON "quiz_interactions" ("timestamp");
CREATE INDEX "idx_quiz_interactions_processed" ON "quiz_interactions" ("processed");

CREATE INDEX "idx_quiz_user_profiles_user" ON "quiz_user_profiles" ("user_id");
CREATE INDEX "idx_quiz_user_profiles_visitor" ON "quiz_user_profiles" ("visitor_id");
CREATE INDEX "idx_quiz_user_profiles_segment" ON "quiz_user_profiles" ("segment");
CREATE INDEX "idx_quiz_user_profiles_updated" ON "quiz_user_profiles" ("updated_at");

CREATE INDEX "idx_quiz_ml_features_session" ON "quiz_ml_features" ("session_id");
CREATE INDEX "idx_quiz_ml_features_model" ON "quiz_ml_features" ("model_version");
CREATE INDEX "idx_quiz_ml_features_created" ON "quiz_ml_features" ("created_at");

CREATE INDEX "idx_quiz_interventions_session" ON "quiz_interventions" ("session_id");
CREATE INDEX "idx_quiz_interventions_type" ON "quiz_interventions" ("intervention_type");
CREATE INDEX "idx_quiz_interventions_outcome" ON "quiz_interventions" ("outcome");
CREATE INDEX "idx_quiz_interventions_created" ON "quiz_interventions" ("created_at");

CREATE INDEX "idx_quiz_experiments_status" ON "quiz_experiments" ("status");
CREATE INDEX "idx_quiz_experiments_quiz" ON "quiz_experiments" ("quiz_id");

CREATE INDEX "idx_quiz_experiment_assignments_session" ON "quiz_experiment_assignments" ("session_id");
CREATE INDEX "idx_quiz_experiment_assignments_experiment" ON "quiz_experiment_assignments" ("experiment_id");

CREATE INDEX "idx_quiz_session_monitoring_active" ON "quiz_session_monitoring" ("is_active");
CREATE INDEX "idx_quiz_session_monitoring_dropout_risk" ON "quiz_session_monitoring" ("dropout_risk");
CREATE INDEX "idx_quiz_session_monitoring_last_activity" ON "quiz_session_monitoring" ("last_activity");

CREATE INDEX "idx_quiz_meta_attribution_session" ON "quiz_meta_attribution" ("session_id");
CREATE INDEX "idx_quiz_meta_attribution_fbclid" ON "quiz_meta_attribution" ("facebook_click_id");
CREATE INDEX "idx_quiz_meta_attribution_campaign" ON "quiz_meta_attribution" ("meta_campaign_id");

-- Insert sample experiment for testing
INSERT INTO "quiz_experiments" (
    "experiment_name", 
    "quiz_id", 
    "variant_a", 
    "variant_b", 
    "status"
) VALUES (
    'Question Order Optimization',
    'battery-assessment-quiz',
    '{"questionOrder": ["project-size", "daily-runtime", "primary-tools", "budget-range"], "style": "standard"}',
    '{"questionOrder": ["budget-range", "project-size", "primary-tools", "daily-runtime"], "style": "budget_first"}',
    'running'
);