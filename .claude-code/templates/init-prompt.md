# Claude Code Session Initialization - SWSE Portal

## Project Context
I'm working on the South West Steam Engineering (SWSE) Portal project located at:
`/Users/oliver/South_West_Steam_Engineering/engineering-dashboard`

## Required Initial Actions
1. **Load State**: Read `.claude-code/state/current-state.json` to understand current progress
2. **Check Context**: Review `SWSE_PROJECT_CONTEXT.md` for project architecture
3. **Design Standards**: Reference `DESIGN_SYSTEM.md` for all UI work
4. **Recent Logs**: Check `.claude-code/logs/` for the last session's work

## Current Focus Areas
Based on the state file, please continue with:
{{PENDING_TASKS}}

## Known Issues to Address
{{KNOWN_ISSUES}}

## Recent Changes
- Last update: {{LAST_UPDATE}}
- Current task: {{CURRENT_TASK}}
- Uncommitted files: {{GIT_STATUS}}

## Key Requirements
1. **Maintain Design Consistency**: Use exact colors and components from DESIGN_SYSTEM.md
2. **Track Progress**: Update todos and state files as you work
3. **Save Checkpoints**: Use `swse-checkpoint` after major completions
4. **Test Thoroughly**: Run builds and check for errors before marking tasks complete

## Quick Reference
- **Primary Blue**: #006FEE
- **Portal Routes**: /portal/* (engineering) and /customer/* (client-facing)
- **Tech Stack**: Next.js 15, TypeScript, Prisma, Tailwind CSS
- **Deployment**: Vercel

Please acknowledge you've loaded the context and begin with the highest priority pending task.