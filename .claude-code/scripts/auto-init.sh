#!/bin/bash
# Claude Code Auto-Initialization Script for SWSE Portal
# This script automatically loads project context when terminal opens

PROJECT_ROOT="/Users/oliver/South_West_Steam_Engineering/engineering-dashboard"
CLAUDE_DIR="$PROJECT_ROOT/.claude-code"

# ANSI color codes
BLUE='\033[0;34m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# Function to display banner
show_banner() {
    echo -e "${BLUE}╔══════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║${NC}  ${BOLD}🚂 South West Steam Engineering Portal - Claude Code${NC}          ${BLUE}║${NC}"
    echo -e "${BLUE}╚══════════════════════════════════════════════════════════════════╝${NC}"
    echo ""
}

# Function to check if we're in the right directory
check_directory() {
    if [ ! -f "$CLAUDE_DIR/state/current-state.json" ]; then
        echo -e "${RED}❌ Claude Code state not found. Please run from project root.${NC}"
        return 1
    fi
    return 0
}

# Function to display current state
display_state() {
    echo -e "${BOLD}📊 Current Project State:${NC}"
    echo -e "────────────────────────"
    
    if [ -f "$CLAUDE_DIR/state/current-state.json" ]; then
        # Check if jq is available
        if command -v jq &> /dev/null; then
            # Extract key information using jq
            LAST_UPDATE=$(jq -r '.lastUpdate' "$CLAUDE_DIR/state/current-state.json" 2>/dev/null || echo "Unknown")
            CURRENT_TASK=$(jq -r '.currentTask' "$CLAUDE_DIR/state/current-state.json" 2>/dev/null || echo "No current task")
            COMPLETED_COUNT=$(jq -r '.completedTasks | length' "$CLAUDE_DIR/state/current-state.json" 2>/dev/null || echo "0")
            PENDING_COUNT=$(jq -r '.pendingTasks | length' "$CLAUDE_DIR/state/current-state.json" 2>/dev/null || echo "0")
        else
            # Fallback to grep/sed parsing
            LAST_UPDATE=$(grep -o '"lastUpdate"[[:space:]]*:[[:space:]]*"[^"]*"' "$CLAUDE_DIR/state/current-state.json" | sed 's/.*: *"\([^"]*\)".*/\1/' || echo "Unknown")
            CURRENT_TASK=$(grep -o '"currentTask"[[:space:]]*:[[:space:]]*"[^"]*"' "$CLAUDE_DIR/state/current-state.json" | sed 's/.*: *"\([^"]*\)".*/\1/' || echo "No current task")
            COMPLETED_COUNT=$(grep -c '"Created\|"Fixed\|"Rebranded\|"Converted"' "$CLAUDE_DIR/state/current-state.json" || echo "0")
            PENDING_COUNT=$(grep -c '"Create /portal\|"Fix customer\|"Implement\|"Validate"' "$CLAUDE_DIR/state/current-state.json" || echo "0")
        fi
        
        echo -e "Last Update: ${GREEN}$LAST_UPDATE${NC}"
        echo -e "Current Task: ${YELLOW}$CURRENT_TASK${NC}"
        echo -e "Progress: ${GREEN}$COMPLETED_COUNT completed${NC}, ${YELLOW}$PENDING_COUNT pending${NC}"
        echo ""
    fi
}

# Function to display pending tasks
display_pending_tasks() {
    echo -e "${BOLD}📋 Pending Tasks:${NC}"
    echo -e "─────────────────"
    
    if [ -f "$CLAUDE_DIR/state/current-state.json" ]; then
        PENDING_TASKS=$(jq -r '.pendingTasks[]?' "$CLAUDE_DIR/state/current-state.json" 2>/dev/null)
        if [ -z "$PENDING_TASKS" ]; then
            echo -e "${GREEN}✅ No pending tasks!${NC}"
        else
            echo "$PENDING_TASKS" | while IFS= read -r task; do
                echo -e "  ${YELLOW}•${NC} $task"
            done
        fi
        echo ""
    fi
}

# Function to display recent errors
display_errors() {
    if [ -f "$CLAUDE_DIR/state/current-state.json" ]; then
        ERROR_COUNT=$(jq -r '.errors | length' "$CLAUDE_DIR/state/current-state.json" 2>/dev/null || echo "0")
        if [ "$ERROR_COUNT" -gt 0 ]; then
            echo -e "${BOLD}⚠️  Recent Errors:${NC}"
            echo -e "─────────────────"
            jq -r '.errors[-3:][]?' "$CLAUDE_DIR/state/current-state.json" 2>/dev/null | while IFS= read -r error; do
                echo -e "  ${RED}•${NC} $error"
            done
            echo ""
        fi
    fi
}

# Function to display known issues
display_known_issues() {
    if [ -f "$CLAUDE_DIR/state/current-state.json" ]; then
        ISSUES=$(jq -r '.knownIssues[]?' "$CLAUDE_DIR/state/current-state.json" 2>/dev/null)
        if [ ! -z "$ISSUES" ]; then
            echo -e "${BOLD}🔧 Known Issues to Address:${NC}"
            echo -e "──────────────────────────"
            echo "$ISSUES" | while IFS= read -r issue; do
                echo -e "  ${YELLOW}!${NC} $issue"
            done
            echo ""
        fi
    fi
}

# Function to check recent changes
check_recent_changes() {
    echo -e "${BOLD}📁 Recent Changes:${NC}"
    echo -e "─────────────────"
    
    # Check git status
    cd "$PROJECT_ROOT"
    CHANGED_FILES=$(git status --porcelain 2>/dev/null | wc -l | tr -d ' ')
    CURRENT_BRANCH=$(git branch --show-current 2>/dev/null || echo "unknown")
    
    echo -e "Branch: ${GREEN}$CURRENT_BRANCH${NC}"
    echo -e "Uncommitted changes: ${YELLOW}$CHANGED_FILES files${NC}"
    
    # Show last checkpoint
    if [ -d "$CLAUDE_DIR/checkpoints" ]; then
        LAST_CHECKPOINT=$(ls -t "$CLAUDE_DIR/checkpoints/" 2>/dev/null | head -1)
        if [ ! -z "$LAST_CHECKPOINT" ]; then
            echo -e "Last checkpoint: ${GREEN}$LAST_CHECKPOINT${NC}"
        fi
    fi
    echo ""
}

# Function to generate Claude prompt
generate_claude_prompt() {
    echo -e "${BOLD}📝 Claude Code Initialization Prompt:${NC}"
    echo -e "════════════════════════════════════"
    echo ""
    
    # Generate dynamic prompt from template
    if [ -f "$CLAUDE_DIR/templates/init-prompt.md" ]; then
        # Get dynamic values
        PENDING_TASKS=$(jq -r '.pendingTasks[]?' "$CLAUDE_DIR/state/current-state.json" 2>/dev/null | sed 's/^/- /' || echo "- No pending tasks")
        KNOWN_ISSUES=$(jq -r '.knownIssues[]?' "$CLAUDE_DIR/state/current-state.json" 2>/dev/null | sed 's/^/- /' || echo "- No known issues")
        LAST_UPDATE=$(jq -r '.lastUpdate' "$CLAUDE_DIR/state/current-state.json" 2>/dev/null || echo "Unknown")
        CURRENT_TASK=$(jq -r '.currentTask' "$CLAUDE_DIR/state/current-state.json" 2>/dev/null || echo "No current task")
        GIT_STATUS=$(cd "$PROJECT_ROOT" && git status --porcelain 2>/dev/null | wc -l | tr -d ' ')
        
        # Use sed to replace placeholders
        cat "$CLAUDE_DIR/templates/init-prompt.md" | \
            sed "s|{{PENDING_TASKS}}|$PENDING_TASKS|g" | \
            sed "s|{{KNOWN_ISSUES}}|$KNOWN_ISSUES|g" | \
            sed "s|{{LAST_UPDATE}}|$LAST_UPDATE|g" | \
            sed "s|{{CURRENT_TASK}}|$CURRENT_TASK|g" | \
            sed "s|{{GIT_STATUS}}|$GIT_STATUS files|g"
    else
        # Fallback to static prompt
        cat << 'EOF'
I'm working on the South West Steam Engineering (SWSE) Portal project. Please load the project context and continue where we left off.

Project location: /Users/oliver/South_West_Steam_Engineering/engineering-dashboard

Please:
1. Read .claude-code/state/current-state.json for the current project state
2. Check .claude-code/logs/ for recent session logs
3. Review pending tasks from the task queue
4. Continue with the highest priority pending tasks

Key files to be aware of:
- SWSE_PROJECT_CONTEXT.md - Complete project documentation
- DESIGN_SYSTEM.md - UI/UX standards to follow
- .claude-code/state/current-state.json - Current state and pending tasks

Focus on completing the pending tasks in priority order while maintaining the established design patterns and code quality standards.
EOF
    fi
    echo ""
}

# Function to create quick commands
create_quick_commands() {
    echo -e "${BOLD}⚡ Quick Commands:${NC}"
    echo -e "─────────────────"
    echo -e "${GREEN}swse-status${NC}    - Show current project status"
    echo -e "${GREEN}swse-tasks${NC}     - Display pending tasks"
    echo -e "${GREEN}swse-resume${NC}    - Generate resume prompt for Claude"
    echo -e "${GREEN}swse-checkpoint${NC} - Save current progress"
    echo -e "${GREEN}swse-commit${NC}    - Auto-commit changes"
    echo ""
}

# Main execution
main() {
    clear
    show_banner
    
    if check_directory; then
        display_state
        display_pending_tasks
        display_known_issues
        check_recent_changes
        create_quick_commands
        
        echo -e "${BOLD}${GREEN}✅ SWSE Project Context Loaded!${NC}"
        echo -e "─────────────────────────────────"
        echo ""
        echo -e "To start working, copy and paste the following prompt to Claude Code:"
        echo ""
        generate_claude_prompt
    else
        echo -e "${RED}Please navigate to the SWSE project directory first:${NC}"
        echo -e "cd $PROJECT_ROOT"
    fi
}

# Run main function
main