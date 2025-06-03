#!/bin/bash
# Simplified SWSE Auto-Init Script (No jq required)

PROJECT_ROOT="/Users/oliver/South_West_Steam_Engineering/engineering-dashboard"

echo "╔══════════════════════════════════════════════════════════════════╗"
echo "║  🚂 South West Steam Engineering Portal - Claude Code          ║"
echo "╚══════════════════════════════════════════════════════════════════╝"
echo ""
echo "📝 Claude Code Quick Start Prompt:"
echo "════════════════════════════════════"
echo ""
cat << 'EOF'
I'm working on the South West Steam Engineering (SWSE) Portal project. Please load the project context and continue where we left off.

Project location: /Users/oliver/South_West_Steam_Engineering/engineering-dashboard

Please:
1. Read .claude-code/state/current-state.json for the current project state
2. Review SWSE_PROJECT_CONTEXT.md for project architecture
3. Check DESIGN_SYSTEM.md for UI/UX standards
4. Continue with pending tasks from the state file

Current focus: Creating missing portal pages and fixing broken links

Pending tasks include:
- Create /portal/operations/workshop page
- Create /portal/operations/inventory page
- Create /portal/analytics/projects page
- Create /portal/analytics/performance page
- Fix customer documents with sample files
- Implement dynamic client pages routing
- Validate all links across both portals

Key design elements:
- Primary Blue: #006FEE
- Use exact components from DESIGN_SYSTEM.md
- Maintain consistent SWSE branding throughout

Last deployment: https://engineering-dashboard-hl5vejen5-battery-departments-projects.vercel.app

Please acknowledge you've loaded the context and continue with the highest priority task.
EOF
echo ""
echo "⚡ Quick Commands Available:"
echo "──────────────────────────"
echo "• swse-status    - Show project status"
echo "• swse-checkpoint - Save progress"
echo "• swse-commit    - Auto-commit changes"
echo ""