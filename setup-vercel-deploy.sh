#!/bin/bash

echo "Setting up Vercel environment variables for SWSE deployment..."

# Database
vercel env add DATABASE_URL production < /dev/null
echo "DATABASE_URL added (you'll need to set the actual PostgreSQL connection string)"

# Authentication
vercel env add JWT_SECRET production < /dev/null
echo "JWT_SECRET added (you'll need to set a secure secret)"

vercel env add NEXTAUTH_URL production < /dev/null
echo "NEXTAUTH_URL added (set to your production domain)"

vercel env add NEXTAUTH_SECRET production < /dev/null
echo "NEXTAUTH_SECRET added (generate with: openssl rand -base64 32)"

# Email Service
vercel env add EMAIL_HOST production < /dev/null
echo "EMAIL_HOST added (default: smtp.gmail.com)"

vercel env add EMAIL_PORT production < /dev/null
echo "EMAIL_PORT added (default: 587)"

vercel env add EMAIL_SECURE production < /dev/null
echo "EMAIL_SECURE added (default: false)"

vercel env add EMAIL_USER production < /dev/null
echo "EMAIL_USER added (your email address)"

vercel env add EMAIL_PASS production < /dev/null
echo "EMAIL_PASS added (app-specific password)"

vercel env add EMAIL_FROM production < /dev/null
echo "EMAIL_FROM added (default: noreply@swsteamengineering.co.uk)"

# Vercel Blob Storage
vercel env add BLOB_READ_WRITE_TOKEN production < /dev/null
echo "BLOB_READ_WRITE_TOKEN added (get from Vercel dashboard)"

# WebSocket
vercel env add NEXT_PUBLIC_WEBSOCKET_URL production < /dev/null
echo "NEXT_PUBLIC_WEBSOCKET_URL added (your WebSocket server URL)"

# Optional APIs
vercel env add ANTHROPIC_API_KEY production < /dev/null
echo "ANTHROPIC_API_KEY added (optional - for AI features)"

echo ""
echo "Environment variables configured!"
echo ""
echo "IMPORTANT: You need to set the actual values for these variables in the Vercel dashboard:"
echo "https://vercel.com/battery-departments-projects/battery-dashboard/settings/environment-variables"
echo ""
echo "Required values:"
echo "- DATABASE_URL: Your PostgreSQL connection string"
echo "- JWT_SECRET: A secure random string"
echo "- NEXTAUTH_URL: Your production URL (e.g., https://swse-portal.vercel.app)"
echo "- NEXTAUTH_SECRET: Generate with 'openssl rand -base64 32'"
echo "- EMAIL_USER and EMAIL_PASS: Your email credentials"
echo "- BLOB_READ_WRITE_TOKEN: From Vercel Blob storage settings"
echo ""
echo "After setting these values, run: vercel --prod"