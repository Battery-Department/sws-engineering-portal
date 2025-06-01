# 🚀 GitHub & Vercel Deployment Guide

## Quick Deployment Steps

### 1️⃣ Run the Deployment Script

```bash
./github-deploy.sh
```

This interactive script will guide you through:
- Creating a GitHub repository
- Pushing the code
- Setting up Vercel deployment

### 2️⃣ Manual Steps (if needed)

#### Create GitHub Repository

1. Go to https://github.com/new
2. Sign in as **Joseph Hawkins**
3. Create repository:
   - Name: `sws-engineering-portal`
   - Private: Yes (recommended)
   - **Don't** add README, .gitignore, or license

#### Push Code to GitHub

```bash
# Add remote
git remote add origin https://github.com/josephhawkins/sws-engineering-portal.git

# Push code
git push -u origin main
```

#### Deploy to Vercel

1. Visit https://vercel.com/new
2. Import the GitHub repository
3. Configure environment variables:

```env
DATABASE_URL=postgresql://user:pass@host:5432/dbname
JWT_SECRET=[generate with: openssl rand -base64 32]
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=[generate with: openssl rand -base64 32]
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@swsteamengineering.co.uk
BLOB_READ_WRITE_TOKEN=[from Vercel Blob storage]
```

4. Click **Deploy**

## 📱 Access Your Portals

Once deployed, access your portals at:
- **Main Site**: `https://your-app.vercel.app`
- **Engineering Portal**: `https://your-app.vercel.app/portal`
- **Customer Portal**: `https://your-app.vercel.app/customer`

## 🔧 Post-Deployment Setup

### 1. Database Setup (if using PostgreSQL)

```bash
# In Vercel dashboard, run:
npx prisma db push
```

### 2. Configure Vercel Blob Storage

1. Go to Vercel Dashboard > Storage
2. Create a new Blob store
3. Copy the token to `BLOB_READ_WRITE_TOKEN`

### 3. Set Up Email (Gmail)

1. Enable 2-factor authentication
2. Generate app-specific password
3. Use as `EMAIL_PASS`

### 4. Custom Domain (Optional)

1. Go to Vercel Dashboard > Domains
2. Add your domain
3. Update DNS records

## ✅ Deployment Checklist

- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] Environment variables configured
- [ ] Database connected
- [ ] Email service working
- [ ] Blob storage configured
- [ ] Test document generation
- [ ] Test customer portal access
- [ ] Configure custom domain

## 🆘 Troubleshooting

### Build Fails
- Check environment variables
- Ensure `DATABASE_URL` is set
- Try with SQLite first: `DATABASE_URL=file:./prod.db`

### Database Issues
- Use Vercel Postgres addon
- Or use external PostgreSQL service
- Run `npx prisma generate` in build command

### Email Not Working
- Verify Gmail app password
- Check spam folder
- Test with console.log first

## 🎉 Success!

Your South West Steam Engineering Portal is now live!

Features available:
- ✅ Complete project management
- ✅ Document generation (invoices, reports, certificates)
- ✅ Material cost tracking
- ✅ Customer portal with real-time updates
- ✅ Professional engineering workflow

For support: enquiries@swsteamengineering.co.uk