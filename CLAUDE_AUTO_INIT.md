# Claude Code Auto-Initialization Setup

## 🚀 Automatic Initialization

The SWSE project now has automatic initialization that triggers when you navigate to the project directory. This ensures Claude Code always has the full context of your project without you having to remember specific prompts.

## 🔧 Setup Instructions

### Option 1: Using direnv (Recommended)
1. Install direnv if you haven't already:
   ```bash
   # macOS
   brew install direnv
   
   # Add to your shell (.zshrc or .bashrc)
   eval "$(direnv hook zsh)"  # or bash
   ```

2. Allow the .envrc file in the project:
   ```bash
   cd /Users/oliver/South_West_Steam_Engineering/engineering-dashboard
   direnv allow
   ```

3. Now whenever you `cd` into the project, it will automatically:
   - Load the project context
   - Show pending tasks
   - Display recent changes
   - Generate the Claude prompt

### Option 2: Add to Shell Profile
Add this to your `~/.zshrc` or `~/.bashrc`:
```bash
# SWSE Auto-init
alias swse='cd /Users/oliver/South_West_Steam_Engineering/engineering-dashboard && source .claude-code/scripts/swse-commands.sh && .claude-code/scripts/auto-init.sh'

# Or use the simple version (no dependencies)
alias swse-simple='cd /Users/oliver/South_West_Steam_Engineering/engineering-dashboard && .claude-code/scripts/swse-init-simple.sh'

# Auto-run when entering directory
cd() {
    builtin cd "$@"
    if [[ "$PWD" == "/Users/oliver/South_West_Steam_Engineering/engineering-dashboard" ]]; then
        .claude-code/scripts/swse-init-simple.sh
    fi
}
```

Then just type `swse` to jump to the project with full initialization.

### Option 3: VS Code Terminal Profile
If using VS Code, add this to your settings.json:
```json
{
  "terminal.integrated.profiles.osx": {
    "SWSE Portal": {
      "path": "zsh",
      "args": ["-c", "cd /Users/oliver/South_West_Steam_Engineering/engineering-dashboard && source .claude-code/scripts/swse-commands.sh && .claude-code/scripts/auto-init.sh && exec zsh"],
      "icon": "terminal"
    }
  }
}
```

## 📋 Quick Commands Available

Once initialized, these commands are available anywhere in the project:

- **`swse-status`** - Show full project status
- **`swse-tasks`** - List pending tasks and known issues
- **`swse-resume`** - Generate resume prompt for Claude
- **`swse-checkpoint`** - Save current progress
- **`swse-commit [message]`** - Auto-commit with descriptive message
- **`swse-init`** - Re-run initialization

## 📝 What Gets Loaded Automatically

When you enter the project directory:

1. **Project State** - Current task, completed items, pending work
2. **Known Issues** - Any bugs or problems to address
3. **Git Status** - Uncommitted changes and current branch
4. **Recent Checkpoints** - Last saved progress points
5. **Claude Prompt** - Ready-to-paste prompt with full context

## 🎯 Claude Code Prompt Template

The auto-generated prompt includes:
- Project location and context files
- Current state from `.claude-code/state/current-state.json`
- Recent session logs
- Pending tasks in priority order
- References to SWSE_PROJECT_CONTEXT.md and DESIGN_SYSTEM.md

## 💡 Usage Example

```bash
# Terminal opens or you navigate to project
$ cd /Users/oliver/South_West_Steam_Engineering/engineering-dashboard

# Auto-initialization runs and shows:
╔══════════════════════════════════════════════════════════════════╗
║  🚂 South West Steam Engineering Portal - Claude Code          ║
╚══════════════════════════════════════════════════════════════════╝

📊 Current Project State:
────────────────────────
Last Update: 2025-01-06T11:30:00Z
Current Task: Creating missing portal pages and fixing broken links
Progress: 13 completed, 7 pending

📋 Pending Tasks:
─────────────────
  • Create /portal/operations/workshop page
  • Create /portal/operations/inventory page
  • Create /portal/analytics/projects page
  • Create /portal/analytics/performance page
  • Fix customer documents with sample files
  • Implement dynamic client pages routing
  • Validate all links across both portals

[... more status info ...]

📝 Claude Code Initialization Prompt:
════════════════════════════════════
[Ready-to-paste prompt for Claude]
```

## 🔄 Updating the Auto-Init System

To modify what gets loaded or displayed:
1. Edit `.claude-code/scripts/auto-init.sh`
2. Update display functions or add new checks
3. The changes take effect next time you enter the directory

## 🛡️ Troubleshooting

If auto-init doesn't work:
1. Ensure scripts have execute permissions: `chmod +x .claude-code/scripts/*.sh`
2. Check if direnv is installed and allowed: `direnv status`
3. Manually run: `.claude-code/scripts/auto-init.sh`
4. Verify jq is installed for JSON parsing: `brew install jq`

---

This system ensures you never lose context when working on the SWSE project!