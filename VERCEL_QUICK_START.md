# Quick Vercel Deployment - 5 Steps

## Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

## Step 2: Create MongoDB Atlas Cluster
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free M0 cluster
3. Create database user and get connection string
4. Copy connection string (format: `mongodb+srv://user:pass@cluster.mongodb.net/gofood`)

## Step 3: Deploy Backend
```bash
cd Gofood/backend
vercel --prod
```
- When asked for environment variables, add:
  - `MONGO_URI`: Your MongoDB connection string
  - `JWT_SECRET`: A strong secret key
  - `NODE_ENV`: production

**Note:** Copy your backend URL after deployment (e.g., `https://xxx.vercel.app`)

## Step 4: Update Frontend with Backend URL
```bash
# In Gofood/package.json, environment variables will be:
# REACT_APP_API_URL=https://your-backend-url.vercel.app
```

## Step 5: Deploy Frontend
```bash
cd Gofood
vercel --prod
```
- Add environment variable:
  - `REACT_APP_API_URL`: Your backend URL from Step 3

---

## Test Your Deployment

1. Open frontend URL in browser
2. Sign up with email and password
3. Login
4. Browse food items
5. Add to cart
6. Place order

---

## If Using GitHub Integration (Alternative)

1. Push code to GitHub
2. Go to https://vercel.com/dashboard
3. Click "Add New Project"
4. Select your GitHub repo
5. For backend: Set root directory to `Gofood/backend`
6. For frontend: Set root directory to `Gofood`
7. Add environment variables
8. Click Deploy

---

## Environment Variables Quick Reference

### Backend
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/gofood
JWT_SECRET=your_strong_secret_key_here
NODE_ENV=production
```

### Frontend
```
REACT_APP_API_URL=https://your-backend.vercel.app
```

---

## Troubleshooting

**CORS Error?** → Update CORS in backend/index.js

**Database Connection Error?** → Check MongoDB IP whitelist (add 0.0.0.0/0)

**API Not Found?** → Verify backend URL in frontend environment variable

---

For detailed guide, see [VERCEL_DEPLOYMENT_GUIDE.md](VERCEL_DEPLOYMENT_GUIDE.md)
