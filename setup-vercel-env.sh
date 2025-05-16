#!/bin/bash

# Script to set up Vercel environment variables
echo "Setting up Vercel environment variables for Battery Dashboard..."

# Generate a NextAuth secret if not provided
NEXTAUTH_SECRET=$(openssl rand -base64 32)

# Set environment variables
vercel env add DATABASE_URL production < /dev/null
vercel env add NEXTAUTH_SECRET production --force < /dev/null
vercel env add NEXTAUTH_URL production < /dev/null
vercel env add OPENAI_API_KEY production < /dev/null

echo "
Please set the following environment variables in Vercel:

1. DATABASE_URL - Your database connection string
   Example: file:./dev.db (for SQLite)
   
2. NEXTAUTH_SECRET - Your NextAuth secret key
   Generated value: $NEXTAUTH_SECRET
   
3. NEXTAUTH_URL - Your production URL
   Example: https://your-domain.vercel.app
   
4. OPENAI_API_KEY - Your OpenAI API key (optional)

You can set these at: https://vercel.com/battery-departments-projects/battery-dashboard/settings/environment-variables
"