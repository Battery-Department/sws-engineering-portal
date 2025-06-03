#!/bin/bash
# Claude Code: Save Checkpoint Script

TIMESTAMP=$(date +"%Y-%m-%d-%H%M%S")
PROJECT_ROOT="/Users/oliver/South_West_Steam_Engineering/engineering-dashboard"
CLAUDE_DIR="$PROJECT_ROOT/.claude-code"

echo "🔄 Saving Claude Code Checkpoint..."

# Update current state
cat > "$CLAUDE_DIR/state/current-state.json" << EOF
{
  "projectName": "South West Steam Engineering Portal",
  "projectPath": "$PROJECT_ROOT",
  "lastUpdate": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "currentTask": "Manual checkpoint save",
  "lastCheckpoint": "$TIMESTAMP",
  "checksumStatus": "$(find $PROJECT_ROOT/src -type f -name "*.tsx" -o -name "*.ts" | wc -l) source files"
}
EOF

# Create checkpoint file
CHECKPOINT_FILE="$CLAUDE_DIR/checkpoints/checkpoint-$TIMESTAMP.md"

cat > "$CHECKPOINT_FILE" << EOF
# Claude Code Checkpoint - $(date +"%Y-%m-%d %H:%M:%S")

## Status
- Manual checkpoint created
- Git status: $(git status --porcelain | wc -l) uncommitted changes

## Files Changed
$(git status --porcelain)

## Current Branch
$(git branch --show-current)

## Recovery Command
\`\`\`bash
cd $PROJECT_ROOT
cat .claude-code/state/current-state.json
\`\`\`
EOF

echo "✅ Checkpoint saved: checkpoint-$TIMESTAMP.md"
echo "📁 Location: $CHECKPOINT_FILE"