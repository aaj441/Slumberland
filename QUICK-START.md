# ⚡ Slumberland - Quick Start

## 🚀 Deploy in 3 Commands

```bash
cd Slumberland
./auto-deploy.sh
./deploy.sh
```

That's it! Follow the prompts.

---

## What the Scripts Do

### `auto-deploy.sh` - Build Preparation
- Installs dependencies (`pnpm install`)
- Sets up database (`pnpm db:push`)
- Builds the app (`pnpm build`)
- Verifies everything is ready

### `deploy.sh` - GitHub Setup & Push
- Initializes git (if needed)
- Creates environment file from template
- Commits everything
- Sets up GitHub remote
- Pushes to GitHub
- Provides deployment URLs

---

## Deployment Platforms (Choose One)

### 1. Vercel (FASTEST - 2 minutes) ⚡
**After running `./deploy.sh`:**
1. Go to: https://vercel.com/new
2. Import your GitHub repo
3. Click "Deploy"
4. Add environment variables from `env.example`
5. Done! ✅

### 2. Railway (BEST for PostgreSQL) 🚂
**After running `./deploy.sh`:**
1. Go to: https://railway.app/new
2. "Deploy from GitHub repo"
3. Select Slumberland
4. Railway auto-detects everything ✅
5. Add environment variables

### 3. Render (Enterprise) 🎨
**After running `./deploy.sh`:**
1. Go to: https://render.com
2. "New Web Service"
3. Connect GitHub
4. Select Slumberland
5. Add environment variables
6. Deploy! ✅

---

## Required Environment Variables

Copy from `env.example`:
- `NODE_ENV=production`
- `OPENROUTER_API_KEY=...` (get from https://openrouter.ai)
- `JWT_SECRET=...` (any random string)
- `ADMIN_PASSWORD=...` (any secure password)
- `STRIPE_SECRET_KEY=...` (optional, for payments)

---

## Continuous Deployment

Once deployed, **every push to main automatically deploys!**

```bash
git add .
git commit -m "Update"
git push
# ✅ Auto-deployed!
```

---

## 🌙 That's It!

Slumberland is production-ready with:
- ✅ 12 agentic gods archetype system
- ✅ AI dream analysis
- ✅ All 46 backend procedures
- ✅ Frontend fully wired
- ✅ Database schema complete
- ✅ Auto-deployment configured

**Just run `./auto-deploy.sh` then `./deploy.sh` and follow the prompts!**

