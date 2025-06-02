# 🚀 Deploy to GitHub & Vercel - Quick Steps

## Step 1: Create GitHub Repository

1. **Open this link**: https://github.com/new
2. **Create repository with these EXACT settings**:
   - Owner: `Battery-Department` 
   - Repository name: `sws-engineering-portal`
   - Description: `South West Steam Engineering Portal - Project Management System`
   - Private: Yes ✓
   - **DO NOT** initialize with README, .gitignore, or license

3. Click **Create repository**

## Step 2: Push Code (Copy & Paste)

After creating the repo, run these commands in Terminal:

```bash
cd /Users/oliver/South_West_Steam_Engineering/engineering-dashboard

# If you have GitHub CLI installed:
gh auth login
git push -u origin main

# OR use Personal Access Token:
# 1. Go to: https://github.com/settings/tokens
# 2. Generate new token → Select 'repo' scope
# 3. Copy token and use as password when prompted:
git push -u origin main
```

## Step 3: Deploy to Vercel

1. **Go to**: https://vercel.com/new
2. **Click**: Import Git Repository
3. **Select**: `Battery-Department/sws-engineering-portal`
4. **Add these Environment Variables**:

```
DATABASE_URL = file:./prisma/prod.db
JWT_SECRET = fKAViGA4LfQ9D4HTK/Ip0DxT3wsPUzM6atAr2XMIjcc=
NEXTAUTH_URL = https://sws-engineering-portal.vercel.app
NEXTAUTH_SECRET = bo2bvxOewHIYu0KB5VmNKTHwCZBKCcu8UI7amJgzvas=
```

5. **Click**: Deploy

## ✅ Your Portal URLs

After deployment:
- Engineering: https://sws-engineering-portal.vercel.app/portal
- Customer: https://sws-engineering-portal.vercel.app/customer

## 📱 Quick Verification

1. Visit `/portal` - See all engineering features in navigation
2. Visit `/customer/documents` - See customer document portal
3. All Phase 1-6 features are accessible via menus!

---

**Status**: Code is ready and committed. Just need to:
1. Create GitHub repo (1 minute)
2. Push code (1 minute)
3. Deploy on Vercel (2 minutes)

Total time: ~5 minutes to go live!