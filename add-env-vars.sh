#!/bin/bash

# Add environment variables to Vercel
echo "file:./data/lithi.db" | vercel env add DATABASE_URL production development preview
echo "i7a2WXB7sCk0aGA//CBWVfpBMTCxpqDbTTlZfzlABmw=" | vercel env add NEXTAUTH_SECRET production development preview  
echo "https://battery-dashboard.vercel.app" | vercel env add NEXTAUTH_URL production
echo "http://localhost:3000" | vercel env add NEXTAUTH_URL development preview

echo "Environment variables added to Vercel!"