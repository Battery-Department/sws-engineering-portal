#!/bin/bash
# Claude Code: Auto-commit Script

PROJECT_ROOT="/Users/oliver/South_West_Steam_Engineering/engineering-dashboard"
CLAUDE_DIR="$PROJECT_ROOT/.claude-code"
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")

# Function to update state before commit
update_state() {
    if [ -f "$CLAUDE_DIR/state/current-state.json" ]; then
        # Update last update time
        temp_file=$(mktemp)
        jq --arg time "$(date -u +"%Y-%m-%dT%H:%M:%SZ")" '.lastUpdate = $time' "$CLAUDE_DIR/state/current-state.json" > "$temp_file"
        mv "$temp_file" "$CLAUDE_DIR/state/current-state.json"
    fi
}

# Function to perform commit
perform_commit() {
    local message="$1"
    
    # Update state
    update_state
    
    # Add all Claude Code files
    git add "$CLAUDE_DIR" 2>/dev/null
    git add "$PROJECT_ROOT/PROJECT_STATUS.md" 2>/dev/null
    git add "$PROJECT_ROOT/DEPLOYMENT_HISTORY.md" 2>/dev/null
    git add "$PROJECT_ROOT/ERROR_LOG.md" 2>/dev/null
    git add "$PROJECT_ROOT/FILE_CHANGES.md" 2>/dev/null
    
    # Add any other staged files
    git add -A
    
    # Commit with descriptive message
    git commit -m "Claude Code: $message - [$TIMESTAMP]

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>" 2>/dev/null
    
    if [ $? -eq 0 ]; then
        echo "✅ Auto-commit successful: $message"
        return 0
    else
        echo "ℹ️  No changes to commit"
        return 1
    fi
}

# Check if message provided
if [ -z "$1" ]; then
    # Default message based on recent changes
    MESSAGE="Automatic checkpoint"
    
    # Try to get more specific message from state
    if [ -f "$CLAUDE_DIR/state/current-state.json" ]; then
        CURRENT_TASK=$(jq -r '.currentTask // "Update"' "$CLAUDE_DIR/state/current-state.json")
        MESSAGE="$CURRENT_TASK"
    fi
else
    MESSAGE="$1"
fi

# Perform the commit
cd "$PROJECT_ROOT"
perform_commit "$MESSAGE"

# Update file manifest after commit
if [ $? -eq 0 ]; then
    echo "📊 Updating file manifest..."
    # This would update the file manifest with commit info
fi