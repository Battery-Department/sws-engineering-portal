#!/bin/bash

# Vercel Project Setup Script
PROJECT_NAME="battery-dashboard"
NEXTAUTH_SECRET="i7a2WXB7sCk0aGA//CBWVfpBMTCxpqDbTTlZfzlABmw="

echo "Setting up Vercel environment variables for production..."

# Since we need a PostgreSQL database for production, we have a few options:
echo "
==========================================================
IMPORTANT: Production Database Setup Required
==========================================================

For Vercel deployment, you need a PostgreSQL database.
Here are your options:

1. Vercel Postgres (Recommended for Vercel deployments):
   - Go to: https://vercel.com/dashboard/stores
   - Create a new Postgres database
   - Connect it to your project
   
2. Supabase (Free tier available):
   - Go to: https://supabase.com
   - Create a new project
   - Get the connection string from Settings > Database
   
3. Railway (Easy setup):
   - Go to: https://railway.app
   - Create a new PostgreSQL database
   - Copy the connection URL

Once you have your database URL, run this command:
"

# Prompt for database URL
read -p "Enter your PostgreSQL DATABASE_URL: " DATABASE_URL

# Set environment variables in Vercel
echo "Setting environment variables in Vercel..."

vercel env add DATABASE_URL production <<< "$DATABASE_URL"
vercel env add NEXTAUTH_SECRET production <<< "$NEXTAUTH_SECRET"
vercel env add NEXTAUTH_URL production <<< "https://$PROJECT_NAME.vercel.app"

echo "
Environment variables set successfully!

Next steps:
1. Run database migrations:
   DATABASE_URL='$DATABASE_URL' npx prisma migrate deploy

2. Deploy to production:
   vercel --prod

3. Visit your app:
   https://$PROJECT_NAME.vercel.app
"