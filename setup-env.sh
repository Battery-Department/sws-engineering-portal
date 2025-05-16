#!/bin/bash

# Setup script for Vercel environment variables
echo "Setting up environment variables for Battery Dashboard..."

# Add DATABASE_URL for all environments
echo "file:./data/lithi.db" | vercel env add DATABASE_URL production
echo "file:./data/lithi.db" | vercel env add DATABASE_URL preview
echo "file:./data/lithi.db" | vercel env add DATABASE_URL development

# Add NEXTAUTH_SECRET for all environments
echo "i7a2WXB7sCk0aGA//CBWVfpBMTCxpqDbTTlZfzlABmw=" | vercel env add NEXTAUTH_SECRET production
echo "i7a2WXB7sCk0aGA//CBWVfpBMTCxpqDbTTlZfzlABmw=" | vercel env add NEXTAUTH_SECRET preview
echo "i7a2WXB7sCk0aGA//CBWVfpBMTCxpqDbTTlZfzlABmw=" | vercel env add NEXTAUTH_SECRET development

# Add NEXTAUTH_URL for production
echo "https://battery-dashboard.vercel.app" | vercel env add NEXTAUTH_URL production

# Add NEXTAUTH_URL for preview/development
echo "http://localhost:3000" | vercel env add NEXTAUTH_URL preview
echo "http://localhost:3000" | vercel env add NEXTAUTH_URL development

echo "All environment variables have been added!"
echo "You can now deploy with: vercel --prod"