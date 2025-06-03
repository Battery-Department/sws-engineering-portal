#!/bin/bash
# Claude Code: Resume Work Script

PROJECT_ROOT="/Users/oliver/South_West_Steam_Engineering/engineering-dashboard"
CLAUDE_DIR="$PROJECT_ROOT/.claude-code"

echo "🚀 Resuming Claude Code Session..."
echo ""

# Check if state exists
if [ ! -f "$CLAUDE_DIR/state/current-state.json" ]; then
    echo "❌ No previous state found. Starting fresh session."
    exit 1
fi

# Display current state
echo "📊 Loading Previous State:"
echo "══════════════════════════"
jq -r '
    "Project: \(.projectName)",
    "Last Update: \(.lastUpdate)",
    "Last Task: \(.currentTask)"
' "$CLAUDE_DIR/state/current-state.json"
echo ""

# Show pending tasks
echo "📋 Pending Tasks:"
echo "═════════════════"
jq -r '.queue[] | select(.status == "pending") | "[\(.priority)] \(.title) - \(.description)"' "$CLAUDE_DIR/state/task-queue.json" 2>/dev/null || echo "No pending tasks"
echo ""

# Show recent errors
echo "⚠️  Recent Errors:"
echo "═════════════════"
jq -r '.errors[-3:][]? | "• \(.)"' "$CLAUDE_DIR/state/current-state.json" 2>/dev/null || echo "No recent errors"
echo ""

# Show files modified
echo "📁 Recently Modified Files:"
echo "══════════════════════════"
jq -r '.filesModified | to_entries[-5:][] | "• \(.key) - \(.value)"' "$CLAUDE_DIR/state/current-state.json" 2>/dev/null || echo "No recent modifications"
echo ""

# Create resume prompt
echo "📝 Resume Prompt for Claude:"
echo "════════════════════════════"
cat << 'EOF'
Load the Claude Code project state from .claude-code/state/current-state.json and resume work on the South West Steam Engineering dashboard. The state has been loaded above. Please:

1. Review the pending tasks from the task queue
2. Check for any unresolved errors
3. Continue with the next task in priority order
4. Save progress after each operation
5. Update state files as you work

The project is located at: /Users/oliver/South_West_Steam_Engineering/engineering-dashboard
EOF

echo ""
echo "✅ State loaded. Copy the prompt above to resume your session."