# 🚂 Railway Deployment Guide - Slumberland

This guide explains how to deploy the Slumberland backend API to Railway.

## 🚨 Issues That Were Fixed

### Problem 1: Monorepo Structure
Railway didn't know which application to deploy (server vs slumberland-ui).

**Solution:** Added `railway.json` and `railway.toml` specifying the `server/` directory.

### Problem 2: Missing Root Package.json
Railway couldn't detect the project type without a root package.json.

**Solution:** Added root `package.json` with deployment scripts.

### Problem 3: No Node Version Specified
Railway might use an incompatible Node version.

**Solution:** Added `engines` field in package.json and `.nvmrc` file.

### Problem 4: No Start Command Configuration
Railway didn't know how to start the server from the monorepo root.

**Solution:** Added `Procfile` and deployment commands in railway config files.

---

## 📦 Files Added for Railway

1. **`railway.json`** - Primary Railway configuration
2. **`railway.toml`** - Alternative TOML configuration
3. **`package.json`** (root) - Monorepo package.json with start scripts
4. **`Procfile`** - Process file for deployment
5. **`.nvmrc`** - Node version specification
6. **`server/package.json`** - Updated with engines field

---

## 🚀 Deployment Steps

### Option 1: Deploy via Railway Dashboard (Recommended)

1. **Go to Railway Dashboard**
   - Visit https://railway.app
   - Sign in with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your Slumberland repository

3. **Configure Environment Variables**
   - Railway will auto-detect the configuration
   - Add these environment variables:
     ```
     PORT=5000
     NODE_ENV=production
     ```

4. **Deploy**
   - Railway will automatically:
     - Read `railway.json` or `railway.toml`
     - Install dependencies from `server/`
     - Start with `cd server && npm start`
   - Wait for deployment to complete

5. **Get Your URL**
   - Railway provides a URL like: `https://slumberland-production.up.railway.app`
   - Test it: `https://your-url.railway.app/health`

### Option 2: Deploy via Railway CLI

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Link to your repo (if needed)
railway link

# Deploy
railway up

# Add environment variables
railway variables set PORT=5000
railway variables set NODE_ENV=production

# Open in browser
railway open
```

---

## ⚙️ Railway Configuration Explained

### railway.json / railway.toml

These files tell Railway:
- **Build Command**: `cd server && npm install`
  - Go into server directory
  - Install Node dependencies

- **Start Command**: `cd server && npm start`
  - Go into server directory
  - Run the start script (`node src/server.js`)

- **Restart Policy**: Restart on failure, max 10 retries

### package.json (root)

```json
{
  "scripts": {
    "start": "cd server && npm start"
  },
  "engines": {
    "node": ">=16.x",
    "npm": ">=8.x"
  }
}
```

- **start script**: Railway will run this if no other config is found
- **engines**: Specifies Node.js 16 or higher

### .nvmrc

```
18
```

- Tells Railway to use Node.js 18.x

---

## 🔍 Verify Deployment

After deployment, test these endpoints:

```bash
# Replace YOUR_URL with your Railway URL
export API_URL=https://your-app.railway.app

# Health check
curl $API_URL/health
# Expected: {"status":"OK","timestamp":"..."}

# Root endpoint
curl $API_URL/
# Expected: API info with version and endpoints

# Get all markets
curl $API_URL/api/markets
# Expected: {"success":true,"count":3,"data":[...]}

# Get all influencers
curl $API_URL/api/influencers
# Expected: {"success":true,"count":5,"data":[...]}

# Filter blue ocean markets
curl "$API_URL/api/markets?blueOcean=true"
# Expected: {"success":true,"count":2,"data":[...]}
```

---

## 🌐 Connect Frontend to Railway Backend

Once deployed, update your frontend to use the Railway URL:

**slumberland-ui/.env.production:**
```env
REACT_APP_API_URL=https://your-app.railway.app/api
REACT_APP_USE_MOCK_DATA=false
```

Then deploy your frontend to Netlify/Vercel/etc.

---

## 🐛 Troubleshooting

### Deployment Fails with "No start command"

**Cause:** Railway couldn't find how to start the app.

**Solution:**
- Check `railway.json` exists in root
- Verify `startCommand` is set to `cd server && npm start`
- Or ensure root `package.json` has a `start` script

### Build Fails with "Cannot find module"

**Cause:** Dependencies not installed in correct directory.

**Solution:**
- Verify `buildCommand` is `cd server && npm install`
- Check `server/package.json` has all dependencies
- Ensure no typos in dependency names

### Server Starts but Crashes Immediately

**Cause:** Usually a missing environment variable or port issue.

**Solution:**
- Check Railway logs: `railway logs`
- Ensure `PORT` env variable is set
- Verify `server.js` uses `process.env.PORT`

### 404 on All Routes

**Cause:** Server might not be listening on correct port.

**Solution:**
- Railway provides `PORT` environment variable automatically
- Verify `server.js` line 51: `const PORT = process.env.PORT || 5000;`

### CORS Errors from Frontend

**Cause:** CORS not configured for your frontend domain.

**Solution:**
Update `server/src/server.js`:
```javascript
const cors = require('cors');

// For development
app.use(cors());

// For production (more secure)
app.use(cors({
  origin: ['https://your-frontend-domain.com', 'http://localhost:3000'],
  credentials: true
}));
```

---

## 📊 Monitoring

### View Logs

```bash
# Railway CLI
railway logs

# Or in Dashboard
# Go to your project → Deployments → Click deployment → View logs
```

### Monitor Performance

Railway Dashboard shows:
- CPU usage
- Memory usage
- Network traffic
- Request counts

---

## 💰 Pricing

Railway Free Tier includes:
- $5 of usage per month
- Should be enough for development/testing
- Monitor your usage in the dashboard

For production:
- Pay as you go
- ~$5-20/month for small API servers

---

## 🔄 Automatic Deployments

Railway automatically redeploys when you push to your main branch:

```bash
# Make changes
git add .
git commit -m "Update API"
git push origin main

# Railway automatically detects push and redeploys
```

---

## 📝 Environment Variables Reference

Required:
```
PORT=5000                    # Railway sets this automatically
NODE_ENV=production          # Set manually
```

Optional (for future features):
```
DATABASE_URL=postgresql://... # When you add database
JWT_SECRET=your-secret-key    # When you add authentication
API_KEY=your-api-key          # For external API access
```

---

## 🎯 Next Steps After Deployment

1. **Test All Endpoints**
   - Use the verification commands above
   - Test with Postman or Insomnia

2. **Update Frontend**
   - Point to new Railway URL
   - Test full-stack integration

3. **Add Database (Optional)**
   - Railway offers PostgreSQL
   - Click "+ New" → Database → PostgreSQL
   - Get connection string from dashboard
   - Update server to use database instead of mock data

4. **Add Domain (Optional)**
   - Go to Settings → Domains
   - Add custom domain
   - Update DNS records

5. **Set Up Monitoring**
   - Add error tracking (Sentry)
   - Set up uptime monitoring
   - Configure alerts

---

## 🆘 Support

- **Railway Docs**: https://docs.railway.app
- **Railway Discord**: https://discord.gg/railway
- **Railway Status**: https://status.railway.app

---

## ✅ Deployment Checklist

Before deploying:
- [ ] `railway.json` or `railway.toml` exists in root
- [ ] Root `package.json` has `start` script
- [ ] Server `package.json` has `engines` field
- [ ] `.nvmrc` specifies Node version
- [ ] All environment variables are set
- [ ] CORS is configured
- [ ] Health endpoint works locally

After deploying:
- [ ] Health check returns 200
- [ ] All API endpoints work
- [ ] CORS allows frontend requests
- [ ] Environment variables are set correctly
- [ ] Logs show no errors
- [ ] Frontend connects successfully

---

**Your Slumberland API is now deployed! 🚂🌊💤**

Test it live at your Railway URL!
