# Vercel Deployment Guide for GoFood

This guide explains how to deploy the GoFood MERN application on Vercel.

## Overview

GoFood consists of two parts:

- **Frontend**: React application deployed on Vercel
- **Backend**: Node.js/Express API deployed on Vercel Functions (Serverless)

---

## Prerequisites

1. **Node.js** v14+ installed locally
2. **Git** installed and initialized
3. **GitHub account** (Vercel integrates with GitHub)
4. **MongoDB Atlas** account (cloud database)
5. **Vercel account** (free at https://vercel.com)

---

## Step 1: Prepare MongoDB Atlas

### Create MongoDB Cloud Database

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up or log in
3. Create a free cluster:
   - Click "Create a Deployment"
   - Select "M0 Sandbox" (free tier)
   - Choose your region (preferably close to your users)
   - Click "Create"
4. Set up authentication:
   - Create a database user (username & password)
   - Add IP address to whitelist (add `0.0.0.0/0` for development or your IP for production)
5. Get connection string:
   - Click "Connect"
   - Select "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password

**Example connection string:**

```
mongodb+srv://username:password@cluster.mongodb.net/gofood?retryWrites=true&w=majority
```

---

## Step 2: Push Code to GitHub

Ensure your code is pushed to GitHub:

```bash
cd Minor-Project-1
git add -A
git commit -m "Prepare for Vercel deployment"
git push origin main
```

---

## Step 3: Deploy Backend on Vercel

### Option 1: Using Vercel CLI (Recommended)

1. **Install Vercel CLI:**

   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**

   ```bash
   vercel login
   ```

3. **Deploy Backend:**

   ```bash
   cd Gofood/backend
   vercel --prod
   ```

4. **Set Environment Variables:**

   - Go to your Vercel project dashboard
   - Settings → Environment Variables
   - Add:
     - `MONGO_URI`: Your MongoDB connection string
     - `JWT_SECRET`: A strong secret key (generate one: `openssl rand -hex 32`)
     - `NODE_ENV`: `production`
     - `OPENCAGE_API_KEY`: Your API key (same as development)

5. **Update Backend Route:**
   - Copy the deployment URL (e.g., `https://gofood-backend.vercel.app`)
   - This will be used for frontend API calls

### Option 2: GitHub Integration

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Select root directory: `Gofood/backend`
5. Add environment variables:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `NODE_ENV`: `production`
   - `OPENCAGE_API_KEY`
6. Click "Deploy"

---

## Step 4: Deploy Frontend on Vercel

### Option 1: Using Vercel CLI

1. **Deploy Frontend:**

   ```bash
   cd Gofood
   vercel --prod
   ```

2. **Set Environment Variables:**

   - Go to Vercel project settings
   - Environment Variables
   - Add:
     - `REACT_APP_API_URL`: Your backend URL (e.g., `https://gofood-backend.vercel.app`)

3. **Redeploy** to apply environment variables:
   ```bash
   vercel --prod
   ```

### Option 2: GitHub Integration

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Select root directory: `Gofood`
5. Set build command: `npm run build`
6. Set output directory: `build`
7. Add environment variables:
   - `REACT_APP_API_URL`: Your backend URL
8. Click "Deploy"

---

## Step 5: Configure API Endpoints

Update your frontend's API endpoint:

**File:** `Gofood/src/utils/api.js`

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_BASE_URL,
});
```

**Or in your component:**

```javascript
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
```

---

## Step 6: Add Custom Domain (Optional)

1. Go to Vercel project settings
2. Domains → Add Custom Domain
3. Follow instructions to add DNS records

---

## Environment Variables Reference

### Backend Variables

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/gofood
JWT_SECRET=your_super_secret_key_here_change_this_in_production
NODE_ENV=production
PORT=3000
OPENCAGE_API_KEY=your_opencage_api_key
```

### Frontend Variables

```env
REACT_APP_API_URL=https://your-backend-url.vercel.app
```

---

## Deployment Checklist

- [ ] MongoDB Atlas cluster created and configured
- [ ] Environment variables secured (never commit .env files)
- [ ] Code pushed to GitHub
- [ ] Backend deployed on Vercel
- [ ] Backend environment variables set
- [ ] Frontend API URL updated to backend deployment URL
- [ ] Frontend deployed on Vercel
- [ ] Frontend environment variables set
- [ ] Test API calls from deployed frontend
- [ ] Verify authentication flow works
- [ ] Test cart and order functionality
- [ ] Check console for errors

---

## Testing Deployment

After deployment:

1. **Test Frontend:** Open your Vercel frontend URL
2. **Test Sign Up:** Create a new account
3. **Test Login:** Login with credentials
4. **Test Food Browsing:** View food items
5. **Test Cart:** Add items to cart
6. **Test Order:** Place an order
7. **Check Browser Console:** Verify no errors

---

## Troubleshooting

### 1. CORS Errors

**Problem:** Frontend can't communicate with backend

**Solution:**

- Add frontend URL to CORS whitelist in backend:

```javascript
const cors = require("cors");

app.use(
  cors({
    origin: ["https://your-frontend-url.vercel.app", "http://localhost:3000"],
  })
);
```

### 2. Environment Variables Not Loading

**Solution:**

- Verify variables are set in Vercel project settings
- Redeploy after adding variables
- For frontend, ensure variable names start with `REACT_APP_`

### 3. API Call Fails from Frontend

**Solution:**

- Check backend URL in `REACT_APP_API_URL`
- Verify backend is deployed and running
- Check browser console for exact error
- Verify MongoDB connection string is correct

### 4. Database Connection Error

**Solution:**

- Verify MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Check connection string format
- Verify username and password in connection string
- Check network connectivity

---

## Performance Optimization

### Backend

```javascript
// Add caching headers
app.use((req, res, next) => {
  res.set("Cache-Control", "public, max-age=300");
  next();
});
```

### Frontend

- Use `React.memo()` for components
- Implement code splitting with `React.lazy()`
- Optimize images (use WebP format)
- Enable Gzip compression

---

## Security Considerations

1. **Never commit .env files**
2. **Use strong JWT_SECRET** (minimum 32 characters)
3. **Set NODE_ENV=production**
4. **Enable MongoDB IP whitelist**
5. **Use HTTPS only**
6. **Add rate limiting** to API endpoints
7. **Validate all inputs** on backend
8. **Use environment variables** for sensitive data

---

## Monitoring & Logs

### View Deployment Logs

```bash
vercel logs [project-name] --prod
```

### Monitor in Vercel Dashboard

1. Go to project dashboard
2. "Deployments" tab shows all deployments
3. Click deployment to see logs
4. "Analytics" tab shows traffic and performance

---

## Updating Deployment

### Push Updates

```bash
# Make changes
git add -A
git commit -m "Update message"
git push origin main
```

**With GitHub Integration:**

- Vercel automatically redeploys on push

**With Vercel CLI:**

```bash
vercel --prod
```

---

## Rollback Deployment

If something goes wrong:

1. Go to Vercel dashboard
2. "Deployments" tab
3. Find previous working deployment
4. Click the three dots menu
5. Select "Promote to Production"

---

## Cost Considerations

**Vercel Free Tier Includes:**

- Unlimited projects
- Unlimited deployments
- 6GB bandwidth/month
- Serverless Functions with limitations
- Custom domains

**MongoDB Atlas Free Tier:**

- M0 Sandbox (512MB storage)
- Shared clusters
- Limited to 3 users
- 100MB per day reads/writes

**Recommended for Production:**

- Upgrade to Vercel Pro ($20/month)
- Upgrade MongoDB to M2+ ($0.59/month)

---

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [React Deployment Guide](https://reactjs.org/docs/deployment.html)
- [Express Deployment Guide](https://expressjs.com/en/advanced/best-practice-performance.html)

---

## Support

For issues:

1. Check Vercel logs
2. Review MongoDB connection
3. Verify environment variables
4. Check browser console for errors
5. Contact Vercel support or MongoDB support

---

**Happy Deploying! 🚀**
