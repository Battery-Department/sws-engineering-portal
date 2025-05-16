# Production Database Setup for Battery Dashboard

Since you need a PostgreSQL database for Vercel deployment, I'll guide you through setting up a free PostgreSQL database with Supabase.

## Quick Setup with Supabase (Free Tier)

1. **Create a Supabase Account**
   - Go to https://supabase.com
   - Sign up for a free account

2. **Create a New Project**
   - Click "New project"
   - Choose your organization
   - Set a project name (e.g., "battery-dashboard")
   - Generate a secure database password (save it!)
   - Select a region close to you
   - Click "Create new project"

3. **Get Your Database URL**
   - Wait for project to be created (1-2 minutes)
   - Go to Settings → Database
   - Find "Connection string" section
   - Copy the "URI" connection string
   - It will look like: `postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`

4. **Set Up Environment Variables in Vercel**

Run this command:
```bash
cd /Users/oliver/Lithi_AI/battery-dashboard
./setup-vercel-production.sh
```

Or manually set these in Vercel dashboard:
- `DATABASE_URL`: Your Supabase connection string
- `NEXTAUTH_SECRET`: `i7a2WXB7sCk0aGA//CBWVfpBMTCxpqDbTTlZfzlABmw=`
- `NEXTAUTH_URL`: `https://battery-dashboard.vercel.app`

5. **Deploy to Vercel**
```bash
vercel --prod
```

## Alternative: Deploy with SQLite (Not Recommended for Production)

If you want to quickly test deployment without setting up PostgreSQL:

1. Modify `vercel.json` to use SQLite build:
```json
{
  "buildCommand": "mkdir -p data && touch data/lithi.db && npm run build",
  ...
}
```

2. Deploy with SQLite (development only):
```bash
vercel --prod
```

⚠️ **Note**: SQLite is not recommended for production Vercel deployments due to the ephemeral file system.

## Complete Production Setup

For a production-ready deployment:

1. Set up PostgreSQL (Supabase/Neon/Railway)
2. Configure environment variables
3. Run production migrations
4. Deploy to Vercel
5. Configure custom domain (optional)

Would you like me to help you with any of these steps?