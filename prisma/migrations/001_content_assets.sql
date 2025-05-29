-- Content Management Tables for AI-Powered Marketing Content Generation

-- Baseline Assets (user-uploaded original images)
CREATE TABLE IF NOT EXISTS "BaselineAsset" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "tenantId" TEXT NOT NULL,
  "category" TEXT NOT NULL DEFAULT 'general',
  "name" TEXT NOT NULL,
  "fileUrl" TEXT NOT NULL,
  "assetType" TEXT NOT NULL,
  "tags" TEXT,
  "metadata" TEXT,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("tenantId") REFERENCES "User"("id") ON DELETE CASCADE
);

-- Content Assets (processed/generated images)
CREATE TABLE IF NOT EXISTS "ContentAsset" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "baselineAssetId" TEXT,
  "tenantId" TEXT NOT NULL,
  "assetType" TEXT NOT NULL, -- 'processed_image', 'ai_generated', 'composite'
  "fileUrl" TEXT NOT NULL,
  "format" TEXT, -- Meta ad format (FEED_SQUARE, STORY_PORTRAIT, etc.)
  "dimensions" TEXT, -- JSON: {width, height}
  "metadata" TEXT, -- JSON: processing options, AI params, etc.
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("baselineAssetId") REFERENCES "BaselineAsset"("id") ON DELETE CASCADE,
  FOREIGN KEY ("tenantId") REFERENCES "User"("id") ON DELETE CASCADE
);

-- Content Items (complete marketing content pieces)
CREATE TABLE IF NOT EXISTS "ContentItem" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "tenantId" TEXT NOT NULL,
  "type" TEXT NOT NULL, -- 'image', 'carousel', 'video', 'story'
  "status" TEXT NOT NULL DEFAULT 'draft', -- 'draft', 'review', 'approved', 'published', 'archived'
  "title" TEXT NOT NULL,
  "description" TEXT,
  "metadata" TEXT, -- JSON: campaign info, target audience, etc.
  "brandComplianceScore" REAL,
  "createdBy" TEXT NOT NULL,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("tenantId") REFERENCES "User"("id") ON DELETE CASCADE,
  FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE
);

-- Content Item Assets (many-to-many relationship)
CREATE TABLE IF NOT EXISTS "ContentItemAsset" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "contentItemId" TEXT NOT NULL,
  "contentAssetId" TEXT NOT NULL,
  "position" INTEGER NOT NULL DEFAULT 0, -- Order in carousel, etc.
  "role" TEXT NOT NULL DEFAULT 'main', -- 'main', 'background', 'overlay', 'logo'
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("contentItemId") REFERENCES "ContentItem"("id") ON DELETE CASCADE,
  FOREIGN KEY ("contentAssetId") REFERENCES "ContentAsset"("id") ON DELETE CASCADE
);

-- AI Generation Jobs
CREATE TABLE IF NOT EXISTS "AIGenerationJob" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "tenantId" TEXT NOT NULL,
  "type" TEXT NOT NULL, -- 'image_generation', 'text_generation', 'optimization'
  "status" TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed'
  "provider" TEXT NOT NULL, -- 'stable_diffusion', 'dall_e', 'midjourney', 'claude'
  "prompt" TEXT NOT NULL,
  "parameters" TEXT, -- JSON: model params, styles, etc.
  "inputAssetIds" TEXT, -- JSON array of baseline asset IDs
  "outputAssetIds" TEXT, -- JSON array of generated content asset IDs
  "progress" INTEGER NOT NULL DEFAULT 0, -- 0-100
  "error" TEXT,
  "metadata" TEXT, -- JSON: costs, processing time, etc.
  "createdBy" TEXT NOT NULL,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("tenantId") REFERENCES "User"("id") ON DELETE CASCADE,
  FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE
);

-- Content Workflows
CREATE TABLE IF NOT EXISTS "ContentWorkflow" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "contentItemId" TEXT NOT NULL,
  "currentStage" TEXT NOT NULL DEFAULT 'generated', -- 'generated', 'review', 'approved', 'published'
  "assignedTo" TEXT,
  "dueDate" DATETIME,
  "priority" INTEGER NOT NULL DEFAULT 1, -- 1=low, 2=medium, 3=high, 4=urgent
  "workflowData" TEXT, -- JSON: stage history, comments, etc.
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("contentItemId") REFERENCES "ContentItem"("id") ON DELETE CASCADE,
  FOREIGN KEY ("assignedTo") REFERENCES "User"("id") ON DELETE SET NULL
);

-- Workflow History
CREATE TABLE IF NOT EXISTS "WorkflowHistory" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "contentItemId" TEXT NOT NULL,
  "action" TEXT NOT NULL, -- 'created', 'moved', 'approved', 'rejected', 'published'
  "fromStage" TEXT,
  "toStage" TEXT,
  "performedBy" TEXT NOT NULL,
  "comments" TEXT,
  "metadata" TEXT, -- JSON: additional context
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("contentItemId") REFERENCES "ContentItem"("id") ON DELETE CASCADE,
  FOREIGN KEY ("performedBy") REFERENCES "User"("id") ON DELETE CASCADE
);

-- Content Feedback
CREATE TABLE IF NOT EXISTS "ContentFeedback" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "contentItemId" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "feedbackType" TEXT NOT NULL, -- 'approval', 'rejection', 'revision'
  "category" TEXT, -- 'brand_compliance', 'quality', 'creative_direction'
  "comments" TEXT,
  "metadata" TEXT, -- JSON: specific issues, suggestions
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("contentItemId") REFERENCES "ContentItem"("id") ON DELETE CASCADE,
  FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE
);

-- Content Performance (for published content)
CREATE TABLE IF NOT EXISTS "ContentPerformance" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "contentItemId" TEXT NOT NULL,
  "platform" TEXT NOT NULL, -- 'meta_ads', 'instagram', 'facebook'
  "campaignId" TEXT, -- External platform campaign ID
  "impressions" INTEGER NOT NULL DEFAULT 0,
  "clicks" INTEGER NOT NULL DEFAULT 0,
  "conversions" INTEGER NOT NULL DEFAULT 0,
  "spend" REAL NOT NULL DEFAULT 0,
  "revenue" REAL NOT NULL DEFAULT 0,
  "engagementData" TEXT, -- JSON: likes, shares, comments, etc.
  "recordedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("contentItemId") REFERENCES "ContentItem"("id") ON DELETE CASCADE
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS "idx_baseline_asset_tenant" ON "BaselineAsset"("tenantId");
CREATE INDEX IF NOT EXISTS "idx_baseline_asset_category" ON "BaselineAsset"("category");
CREATE INDEX IF NOT EXISTS "idx_content_asset_tenant" ON "ContentAsset"("tenantId");
CREATE INDEX IF NOT EXISTS "idx_content_asset_baseline" ON "ContentAsset"("baselineAssetId");
CREATE INDEX IF NOT EXISTS "idx_content_asset_format" ON "ContentAsset"("format");
CREATE INDEX IF NOT EXISTS "idx_content_item_tenant" ON "ContentItem"("tenantId");
CREATE INDEX IF NOT EXISTS "idx_content_item_status" ON "ContentItem"("status");
CREATE INDEX IF NOT EXISTS "idx_content_item_created_by" ON "ContentItem"("createdBy");
CREATE INDEX IF NOT EXISTS "idx_ai_job_tenant" ON "AIGenerationJob"("tenantId");
CREATE INDEX IF NOT EXISTS "idx_ai_job_status" ON "AIGenerationJob"("status");
CREATE INDEX IF NOT EXISTS "idx_workflow_content" ON "ContentWorkflow"("contentItemId");
CREATE INDEX IF NOT EXISTS "idx_workflow_assigned" ON "ContentWorkflow"("assignedTo");
CREATE INDEX IF NOT EXISTS "idx_workflow_stage" ON "ContentWorkflow"("currentStage");
CREATE INDEX IF NOT EXISTS "idx_performance_content" ON "ContentPerformance"("contentItemId");
CREATE INDEX IF NOT EXISTS "idx_performance_platform" ON "ContentPerformance"("platform");