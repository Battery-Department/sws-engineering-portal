#!/bin/bash

echo "====================================="
echo "SWS Engineering Portal - Auto Deploy"
echo "====================================="
echo ""

# Check if gh CLI is installed
if command -v gh &> /dev/null; then
    echo "✅ GitHub CLI detected"
    echo ""
    echo "Attempting to create repository..."
    
    # Try to create repo with gh CLI
    gh repo create Battery-Department/sws-engineering-portal \
        --private \
        --description "South West Steam Engineering Portal - Project Management System" \
        --source . \
        --push \
        --remote origin
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ Repository created and code pushed!"
        echo ""
        echo "🚀 Now deploy to Vercel:"
        echo "1. Go to: https://vercel.com/new"
        echo "2. Import: Battery-Department/sws-engineering-portal"
        echo "3. Add environment variables from DEPLOY_NOW.md"
        echo "4. Click Deploy!"
    else
        echo ""
        echo "❌ Failed to create repo. Try manual steps in DEPLOY_NOW.md"
    fi
else
    echo "❌ GitHub CLI not found"
    echo ""
    echo "Option 1: Install GitHub CLI"
    echo "  brew install gh"
    echo "  gh auth login"
    echo "  Then run this script again"
    echo ""
    echo "Option 2: Follow manual steps in DEPLOY_NOW.md"
    echo ""
    echo "Opening DEPLOY_NOW.md..."
    open DEPLOY_NOW.md 2>/dev/null || cat DEPLOY_NOW.md
fi