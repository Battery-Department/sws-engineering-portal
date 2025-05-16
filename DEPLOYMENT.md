# Battery Dashboard - Vercel Deployment Guide

## Prerequisites

1. A Vercel account (https://vercel.com)
2. A PostgreSQL database (recommended providers: Vercel Postgres, Supabase, or Neon)
3. An OpenAI API key (optional, for AI features)

## Environment Variables

Before deploying, you need to set up the following environment variables in Vercel:

1. **DATABASE_URL**: Your PostgreSQL connection string
   - Example: `postgresql://user:password@host:port/database?sslmode=require`
   
2. **NEXTAUTH_SECRET**: A secure random string for NextAuth
   - Generate one with: `openssl rand -base64 32`
   
3. **NEXTAUTH_URL**: Your production URL
   - Example: `https://battery-dashboard.vercel.app`
   
4. **OPENAI_API_KEY**: Your OpenAI API key (optional)

## Deployment Steps

### Option 1: Using Vercel CLI

1. Install Vercel CLI (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. Set up environment variables in Vercel Dashboard:
   - Go to https://vercel.com/battery-departments-projects/battery-dashboard/settings/environment-variables
   - Add all required environment variables

3. Deploy:
   ```bash
   vercel --prod
   ```

### Option 2: Using GitHub Integration

1. Push your code to GitHub
2. Import the project in Vercel Dashboard
3. Set up environment variables during import
4. Vercel will automatically deploy on every push to main

## Database Setup

1. Create a PostgreSQL database with your preferred provider
2. Copy the database connection string
3. Update the DATABASE_URL environment variable in Vercel

### Database Migration

After setting up the database, run migrations:

```bash
# For production database
DATABASE_URL="your-production-database-url" npx prisma migrate deploy
```

## Post-Deployment

1. Visit your deployed app URL
2. Test the authentication flow
3. Create an admin user (you may need to manually update the role in the database)

## Troubleshooting

### Build Failures

- Check that all environment variables are set correctly
- Ensure your database is accessible from Vercel's servers
- Check the build logs in Vercel Dashboard

### Database Connection Issues

- Verify your DATABASE_URL is correct
- Ensure SSL is enabled (add `?sslmode=require` to the connection string)
- Check if your database provider requires specific connection parameters

### Authentication Issues

- Verify NEXTAUTH_URL matches your deployment URL exactly
- Ensure NEXTAUTH_SECRET is set and consistent across deployments
- Check that your database migrations have run successfully

## Local Development vs Production

- Local: Uses SQLite database (file-based)
- Production: Uses PostgreSQL (cloud database)
- The schema files are slightly different due to database differences

## Monitoring

1. Enable Vercel Analytics for performance monitoring
2. Set up error tracking (e.g., Sentry) for production debugging
3. Monitor your database performance and connections

## Security Checklist

- [ ] All sensitive environment variables are set in Vercel (not in code)
- [ ] Database connection uses SSL
- [ ] NEXTAUTH_SECRET is a strong, unique value
- [ ] API routes are properly secured
- [ ] CORS settings are configured correctly

## Support

For issues specific to:
- Vercel deployment: https://vercel.com/docs
- Next.js: https://nextjs.org/docs
- Prisma: https://www.prisma.io/docs
- NextAuth: https://next-auth.js.org/