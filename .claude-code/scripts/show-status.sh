#!/bin/bash
# Claude Code: Show Status Script

PROJECT_ROOT="/Users/oliver/South_West_Steam_Engineering/engineering-dashboard"
CLAUDE_DIR="$PROJECT_ROOT/.claude-code"

echo "╔══════════════════════════════════════════════════════════╗"
echo "║        Claude Code Project Status                        ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

# Show current state
if [ -f "$CLAUDE_DIR/state/current-state.json" ]; then
    echo "📊 Current State:"
    echo "─────────────────"
    jq -r '
        "Project: \(.projectName)",
        "Last Update: \(.lastUpdate)",
        "Current Task: \(.currentTask)",
        "Completed Tasks: \(.completedTasks | length)",
        "Pending Tasks: \(.pendingTasks | length)"
    ' "$CLAUDE_DIR/state/current-state.json" 2>/dev/null || cat "$CLAUDE_DIR/state/current-state.json"
    echo ""
fi

# Show task queue
if [ -f "$CLAUDE_DIR/state/task-queue.json" ]; then
    echo "📋 Task Queue:"
    echo "──────────────"
    jq -r '.queue[] | select(.status == "pending") | "  [\(.priority)] \(.title)"' "$CLAUDE_DIR/state/task-queue.json" 2>/dev/null || echo "  No pending tasks"
    echo ""
fi

# Show recent checkpoints
echo "💾 Recent Checkpoints:"
echo "─────────────────────"
ls -lt "$CLAUDE_DIR/checkpoints/" 2>/dev/null | head -6 | tail -5 | awk '{print "  " $9}' || echo "  No checkpoints found"
echo ""

# Show git status
echo "🔧 Git Status:"
echo "──────────────"
CHANGES=$(git status --porcelain | wc -l)
echo "  Uncommitted changes: $CHANGES"
echo "  Current branch: $(git branch --show-current)"
echo ""

# Show known issues
if [ -f "$CLAUDE_DIR/state/current-state.json" ]; then
    echo "⚠️  Known Issues:"
    echo "────────────────"
    jq -r '.knownIssues[]? | "  • \(.)"' "$CLAUDE_DIR/state/current-state.json" 2>/dev/null || echo "  No known issues"
fi

echo ""
echo "Use './claude-code/scripts/resume-work.sh' to continue working"