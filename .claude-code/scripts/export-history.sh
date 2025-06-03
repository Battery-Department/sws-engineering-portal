#!/bin/bash
# Claude Code: Export History Script

PROJECT_ROOT="/Users/oliver/South_West_Steam_Engineering/engineering-dashboard"
CLAUDE_DIR="$PROJECT_ROOT/.claude-code"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
EXPORT_DIR="$PROJECT_ROOT/.claude-code/exports"
EXPORT_FILE="$EXPORT_DIR/claude-code-export-$TIMESTAMP.tar.gz"

echo "📦 Exporting Claude Code History..."

# Create export directory
mkdir -p "$EXPORT_DIR"

# Create temporary directory for export
TEMP_DIR=$(mktemp -d)
EXPORT_NAME="claude-code-export-$TIMESTAMP"
mkdir -p "$TEMP_DIR/$EXPORT_NAME"

# Copy all Claude Code data
cp -r "$CLAUDE_DIR/state" "$TEMP_DIR/$EXPORT_NAME/"
cp -r "$CLAUDE_DIR/checkpoints" "$TEMP_DIR/$EXPORT_NAME/"
cp -r "$CLAUDE_DIR/logs" "$TEMP_DIR/$EXPORT_NAME/"

# Copy documentation files
cp "$PROJECT_ROOT/PROJECT_STATUS.md" "$TEMP_DIR/$EXPORT_NAME/" 2>/dev/null || true
cp "$PROJECT_ROOT/DEPLOYMENT_HISTORY.md" "$TEMP_DIR/$EXPORT_NAME/" 2>/dev/null || true
cp "$PROJECT_ROOT/ERROR_LOG.md" "$TEMP_DIR/$EXPORT_NAME/" 2>/dev/null || true
cp "$PROJECT_ROOT/FILE_CHANGES.md" "$TEMP_DIR/$EXPORT_NAME/" 2>/dev/null || true

# Create summary
cat > "$TEMP_DIR/$EXPORT_NAME/EXPORT_SUMMARY.md" << EOF
# Claude Code Export Summary
- Export Date: $(date)
- Project: South West Steam Engineering Portal
- Total Checkpoints: $(ls -1 $CLAUDE_DIR/checkpoints | wc -l)
- Total Sessions: $(ls -1 $CLAUDE_DIR/logs | wc -l)
- Export Location: $EXPORT_FILE

## Contents
- /state - Current project state files
- /checkpoints - All checkpoint files
- /logs - All session logs
- Documentation files

## Import Instructions
1. Extract to project root
2. Run: tar -xzf $EXPORT_FILE
3. Verify .claude-code directory exists
4. Use resume-work.sh to continue
EOF

# Create archive
cd "$TEMP_DIR"
tar -czf "$EXPORT_FILE" "$EXPORT_NAME"

# Cleanup
rm -rf "$TEMP_DIR"

# Report
echo "✅ Export complete!"
echo "📁 File: $EXPORT_FILE"
echo "📊 Size: $(du -h "$EXPORT_FILE" | cut -f1)"
echo ""
echo "To import on another system:"
echo "  tar -xzf $(basename "$EXPORT_FILE")"