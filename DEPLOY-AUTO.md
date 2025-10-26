# 🚀 Automated Deployment for Slumberland

## Quick Deploy (ONE Command)

```bash
cd Slumberland
./auto-deploy.sh
```

This script:
1. ✅ Installs dependencies
2. ✅ Sets up database
3. ✅ Builds the app
4. ✅ Prepares for deployment

---

## Automated Deployment Platforms

### Option 1: Deploy via GitHub + Automation (RECOMMENDED)

#### Setup (One Time):
```bash
cd Slumberland

# Create GitHub repo
git remote add origin https://github.com/YOUR_USERNAME/Slumberland.git

# Push code
git push -u origin main
```

#### Then Deploy Automatically:

**Vercel (Easiest - 2 minutes):**
1. Visit: https://vercel.com/new
2. Click "Import Git Repository"
3. Select your Slumberland repo
4. Click "Deploy" ✅
5. Add environment variables (from `env.example`)
6. Done!

**Railway (Best for Full Stack - 5 minutes):**
1. Visit: https://railway.app/new
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose Slumberland
5. Railway auto-detects and deploys ✅
6. Add environment variables

**Render (Enterprise - 5 minutes):**
1. Visit: https://dashboard.render.com
2. Click "New Web Service"
3. Connect GitHub
4. Select Slumberland repo
5. Click "Create Web Service" ✅
6. Add environment variables

---

## Environment Variables (REQUIRED)

Copy these from `env.example` and add to your deployment platform:

```bash
# Required
NODE_ENV=production
OPENROUTER_API_KEY=your_openrouter_key
JWT_SECRET=your_jwt_secret
ADMIN_PASSWORD=your_admin_password

# Optional but recommended
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

---

## Continuous Deployment (Automatic)

Once deployed, every push to `main` branch automatically deploys:

```bash
git add .
git commit -m "New feature"
git push origin main
# ✅ Automatic deployment triggered!
```

All platforms (Vercel, Railway, Render) auto-deploy on push.

---

## Local Development

```bash
cd Slumberland
./auto-deploy.sh
pnpm dev
```

Visit: http://localhost:3000

---

## Platform-Specific Auto-Setup

### Vercel Auto-Deploy:
- ✅ Configured in `vercel.json`
- ✅ Auto-deploys on push to main
- ✅ Build command: `pnpm build`
- ✅ Start command: `pnpm start`

### Railway Auto-Deploy:
- ✅ Configured in `railway.json`
- ✅ Auto-detects build settings
- ✅ Docker support ready
- ✅ Database auto-provisioned

### Render Auto-Deploy:
- ✅ Configured in `render.yaml`
- ✅ PostgreSQL included
- ✅ Redis included
- ✅ Auto-scaling enabled

---

## 🎯 Recommended: Deploy to Vercel NOW

**Fastest option:**
1. Run: `./auto-deploy.sh`
2. Push to GitHub
3. Import to Vercel
4. Add environment variables
5. Deploy! 🚀

**Total time: 5 minutes**

---

## Deployment Checklist

Before deploying:
- [ ] Run `./auto-deploy.sh`
- [ ] Create GitHub repo
- [ ] Push to GitHub
- [ ] Choose deployment platform
- [ ] Add environment variables
- [ ] Deploy!

After deploying:
- [ ] Verify app loads
- [ ] Test dream creation
- [ ] Test AI analysis
- [ ] Check database connection

---

## Troubleshooting

**Build fails:**
- Make sure `pnpm install` ran successfully
- Check environment variables are set
- Verify database connection

**App won't start:**
- Check environment variables
- Verify database is running
- Check build logs

**Database errors:**
- Run `pnpm db:push` locally first
- Make sure migrations run on deployment

---

**Your Slumberland app is ready for automated deployment!** 🌙

