#!/bin/bash
# Claude Code: Rollback to Checkpoint Script

PROJECT_ROOT="/Users/oliver/South_West_Steam_Engineering/engineering-dashboard"
CLAUDE_DIR="$PROJECT_ROOT/.claude-code"

# Check if checkpoint name provided
if [ -z "$1" ]; then
    echo "❌ Usage: ./rollback-to.sh <checkpoint-name>"
    echo ""
    echo "Available checkpoints:"
    ls -1 "$CLAUDE_DIR/checkpoints/" | sed 's/^/  /'
    exit 1
fi

CHECKPOINT="$1"
CHECKPOINT_FILE="$CLAUDE_DIR/checkpoints/$CHECKPOINT"

# Check if checkpoint exists
if [ ! -f "$CHECKPOINT_FILE" ]; then
    echo "❌ Checkpoint not found: $CHECKPOINT"
    echo ""
    echo "Available checkpoints:"
    ls -1 "$CLAUDE_DIR/checkpoints/" | sed 's/^/  /'
    exit 1
fi

echo "⚠️  WARNING: Rolling back to checkpoint: $CHECKPOINT"
echo "This will:"
echo "  - Create a backup of current state"
echo "  - Show git status at checkpoint time"
echo "  - Provide recovery instructions"
echo ""
read -p "Continue? (y/N) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Rollback cancelled."
    exit 0
fi

# Backup current state
BACKUP_TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="$CLAUDE_DIR/backups/backup-$BACKUP_TIMESTAMP"
mkdir -p "$BACKUP_DIR"

echo "📦 Creating backup of current state..."
cp -r "$CLAUDE_DIR/state" "$BACKUP_DIR/"
cp "$PROJECT_ROOT/PROJECT_STATUS.md" "$BACKUP_DIR/" 2>/dev/null || true

# Display checkpoint content
echo ""
echo "📋 Checkpoint Content:"
echo "═════════════════════"
cat "$CHECKPOINT_FILE"
echo ""

# Create rollback instructions
echo "📝 Rollback Instructions:"
echo "════════════════════════"
echo "1. Review the checkpoint above"
echo "2. Current state backed up to: $BACKUP_DIR"
echo "3. Use git to restore files if needed:"
echo "   git status"
echo "   git checkout <file> # to restore specific files"
echo ""
echo "4. Update current state:"
echo "   # Copy this checkpoint's state if available"
echo "   # Or manually update .claude-code/state/current-state.json"
echo ""
echo "✅ Rollback information prepared. Proceed manually with caution."