#!/bin/bash

echo "Building for Vercel deployment..."

# Copy SQLite schema for production
cp prisma/schema.production.sqlite.prisma prisma/schema.prisma

# Generate Prisma client
npx prisma generate

# Create empty SQLite database
npx prisma db push --skip-seed

# Run Next.js build
npm run build