#!/bin/bash
# SWSE Quick Commands for Claude Code

PROJECT_ROOT="/Users/oliver/South_West_Steam_Engineering/engineering-dashboard"
CLAUDE_DIR="$PROJECT_ROOT/.claude-code"

# Quick status command
swse-status() {
    "$CLAUDE_DIR/scripts/show-status.sh"
}

# Quick tasks command
swse-tasks() {
    echo "📋 Pending Tasks for SWSE Portal:"
    echo "════════════════════════════════"
    jq -r '.pendingTasks[]?' "$CLAUDE_DIR/state/current-state.json" 2>/dev/null | nl -s '. ' || echo "No pending tasks"
    echo ""
    echo "Known Issues:"
    echo "─────────────"
    jq -r '.knownIssues[]?' "$CLAUDE_DIR/state/current-state.json" 2>/dev/null | nl -s '. ' || echo "No known issues"
}

# Quick resume command
swse-resume() {
    "$CLAUDE_DIR/scripts/resume-work.sh"
}

# Quick checkpoint command
swse-checkpoint() {
    "$CLAUDE_DIR/scripts/save-checkpoint.sh"
}

# Quick commit command
swse-commit() {
    if [ -z "$1" ]; then
        "$CLAUDE_DIR/scripts/auto-commit.sh"
    else
        "$CLAUDE_DIR/scripts/auto-commit.sh" "$*"
    fi
}

# Quick init command
swse-init() {
    "$CLAUDE_DIR/scripts/auto-init.sh"
}

# Export functions
export -f swse-status
export -f swse-tasks
export -f swse-resume
export -f swse-checkpoint
export -f swse-commit
export -f swse-init