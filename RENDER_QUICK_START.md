# Quick Render Deployment - 3 Steps

## Step 1: Create Render Account
Go to https://render.com → Sign up with GitHub

## Step 2: Deploy Backend
1. Dashboard → "New +" → "Web Service"
2. Connect repo: `anuragchoudhary2313/Minor-Project-1`
3. Configure:
   - Name: `gofood-backend`
   - Root Directory: `Gofood/backend`
   - Runtime: `Node`
   - Build: `npm install`
   - Start: `npm start`
   - Plan: `Free`
4. Click "Create Web Service"

## Step 3: Add Environment Variables
After deployment:
1. Service Dashboard → Environment
2. Add:
   ```
   MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/gofood
   JWT_SECRET=your_strong_secret_key
   OPENCAGE_API_KEY=your_api_key
   NODE_ENV=production
   ```
3. Save → Auto redeploy

---

## Get Your Backend URL
- Dashboard shows URL like: `https://gofood-backend.onrender.com`
- Use this in Vercel frontend as `REACT_APP_API_URL`

## Test It Works
```bash
curl https://gofood-backend.onrender.com/api/health
```

---

For detailed guide, see [RENDER_DEPLOYMENT_GUIDE.md](RENDER_DEPLOYMENT_GUIDE.md)
