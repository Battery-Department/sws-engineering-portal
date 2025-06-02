#!/bin/bash

echo "Pushing to GitHub Battery-Department account..."
echo ""
echo "You'll need to authenticate with GitHub."
echo "Use one of these methods:"
echo ""
echo "1. Personal Access Token (Recommended):"
echo "   - Go to: https://github.com/settings/tokens"
echo "   - Generate new token (classic)"
echo "   - Select 'repo' scope"
echo "   - Copy the token"
echo "   - Use as password when prompted"
echo ""
echo "2. GitHub CLI:"
echo "   - Install: brew install gh"
echo "   - Run: gh auth login"
echo "   - Then run this script again"
echo ""
echo "Press Enter to continue with push..."
read

# Try to push
git push -u origin main

echo ""
echo "If successful, continue with Vercel deployment:"
echo "1. Go to: https://vercel.com/new"
echo "2. Import: Battery-Department/sws-engineering-portal"
echo "3. Deploy!"