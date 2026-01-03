# Render Deployment Guide - GoFood Backend

This guide explains how to deploy the GoFood backend on Render.

## What is Render?

Render is a modern cloud platform for deploying applications. It offers:
- Free tier with automatic deploys from GitHub
- Native support for Node.js/Express apps
- Free PostgreSQL/MongoDB connection support
- Auto-SSL certificates
- Simple environment variable management

---

## Prerequisites

1. **Node.js backend code** (ready)
2. **GitHub repository** (ready at `anuragchoudhary2313/Minor-Project-1`)
3. **Render account** (free at https://render.com)
4. **MongoDB Atlas connection string** (from earlier setup)
5. **JWT secret key** (generate one)

---

## Step 1: Prepare Your Backend for Render

Your backend is already configured! Key points:

✅ **package.json** has correct scripts:
- `npm start` - runs the server
- `npm dev` - runs with nodemon

✅ **Port handling**: Express server listens on `process.env.PORT || 5000`

✅ **render.yaml** included for automatic configuration

---

## Step 2: Create Render Account

1. Go to https://render.com
2. Click "Sign up"
3. Use GitHub account for easy integration
4. Authorize Render to access your GitHub

---

## Step 3: Deploy Backend on Render

### Option 1: Using render.yaml (Recommended)

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Select "Deploy an existing repository"
4. Connect your GitHub repo: `anuragchoudhary2313/Minor-Project-1`
5. Configure:
   - **Name**: `gofood-backend`
   - **Root Directory**: `Gofood/backend`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free
6. Click "Create Web Service"

### Option 2: Manual Configuration

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repo
4. Fill in details:

   | Field | Value |
   |-------|-------|
   | Name | gofood-backend |
   | Environment | Node |
   | Region | Recommended region close to you |
   | Build Command | `npm install` |
   | Start Command | `npm start` |
   | Plan | Free |

5. Click "Create Web Service"

---

## Step 4: Add Environment Variables

After deployment starts, add environment variables:

1. Go to your Render service dashboard
2. Click "Environment" in the sidebar
3. Add these variables:

```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/gofood
JWT_SECRET=your_very_strong_secret_key_here_minimum_32_characters
OPENCAGE_API_KEY=74c89b3be64946ac96d777d08b878d43
NODE_ENV=production
```

4. Click "Save" - service will redeploy automatically

---

## Step 5: Verify Deployment

1. Wait for deployment to complete (check logs)
2. Copy the service URL (e.g., `https://gofood-backend.onrender.com`)
3. Test the API:

```bash
# In terminal or browser
curl https://gofood-backend.onrender.com/api/health

# Should return:
# {"status":"OK","message":"Backend is running"}
```

---

## Step 6: Get Backend URL for Frontend

Your backend URL will be something like:
```
https://gofood-backend.onrender.com
```

**Update frontend with this URL** in Vercel environment variables:
```
REACT_APP_API_URL=https://gofood-backend.onrender.com
```

---

## Complete Architecture

```
GitHub Repository
    ↓
Vercel (Frontend)  ←→  Render (Backend)  ←→  MongoDB Atlas
```

---

## Environment Variables Reference

### Backend Required Variables

```env
# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/gofood?retryWrites=true&w=majority

# Authentication
JWT_SECRET=generate_a_strong_key_with_32_characters

# Location Services
OPENCAGE_API_KEY=your_api_key

# Server
NODE_ENV=production
PORT=3000 (automatically set by Render)
```

---

## Monitoring & Logs

### View Logs in Render

1. Go to your service dashboard
2. Click "Logs" tab
3. See real-time server logs
4. Check for errors or issues

### Common Issues

#### "Logs show connection timeout"
- Check MongoDB IP whitelist (should be 0.0.0.0/0)
- Verify connection string format
- Test connection string locally first

#### "Service keeps restarting"
- Check environment variables are set correctly
- Review logs for specific errors
- Ensure Node version is compatible

#### "Port already in use"
- Render automatically handles ports
- Don't hardcode ports in code
- Use `process.env.PORT || 5000`

---

## Testing Backend Endpoints

### Health Check
```bash
curl https://gofood-backend.onrender.com/api/health
```

### Create User
```bash
curl -X POST https://gofood-backend.onrender.com/api/auth/createuser \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"password123","location":"Delhi"}'
```

### Login
```bash
curl -X POST https://gofood-backend.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

---

## Update Deployment

### Auto-Deploy on Push

Render automatically redeploys when you push to GitHub:

```bash
# Make changes locally
git add -A
git commit -m "Update backend"
git push origin main
```

Render will:
1. Detect the push
2. Pull latest code
3. Run build command
4. Run start command
5. Deploy new version

### Manual Redeploy

1. Go to Render dashboard
2. Click your service
3. Click "Redeploy" button

---

## Performance Considerations

### Render Free Tier Limitations

- Instance spins down after 15 minutes of inactivity
- Cold starts take 30-60 seconds
- Suitable for development/testing

### Upgrade to Paid (Optional)

For production, upgrade to paid plan:
- Always-on instances
- Better performance
- More resources
- ~$7/month

---

## Troubleshooting

### Build Fails

Check:
1. Node version compatibility
2. All dependencies in package.json
3. Build command runs correctly locally
4. No hardcoded paths or environment variables

### App Crashes After Deploy

Check logs:
1. Go to service → Logs
2. Look for error messages
3. Check MongoDB connection
4. Verify environment variables

### Slow Response Times

- Expected on free tier with cold starts
- Upgrade to paid for better performance
- Optimize database queries

### CORS Errors from Frontend

Update backend `index.js`:
```javascript
app.use(cors({
  origin: [
    'https://your-vercel-frontend.vercel.app',
    'http://localhost:3000'
  ]
}));
```

---

## Security Best Practices

1. ✅ Use strong JWT_SECRET (32+ characters)
2. ✅ Store secrets in environment variables (not in code)
3. ✅ MongoDB IP whitelist: allow 0.0.0.0/0 (for cloud services)
4. ✅ Use HTTPS (Render provides automatic SSL)
5. ✅ Enable CORS only for your frontend
6. ✅ Validate all inputs
7. ✅ Use environment-specific configs

---

## Cost Breakdown

**Render Free Tier:**
- ✅ Free web services
- ✅ 0.5 GB RAM per instance
- ✅ 1 shared CPU
- ✅ 100 GB/month bandwidth
- ✅ Auto sleep after 15 min inactivity

**MongoDB Atlas Free Tier:**
- ✅ M0 Sandbox (512 MB storage)
- ✅ Shared clusters
- ✅ Good for development

**Total Cost:** **FREE** for development/testing! 🎉

---

## Next Steps

1. ✅ Deploy backend on Render
2. ✅ Get backend URL
3. ✅ Update frontend REACT_APP_API_URL
4. ✅ Redeploy frontend on Vercel
5. ✅ Test complete flow
6. ✅ Monitor logs
7. ✅ Celebrate! 🚀

---

## Useful Links

- [Render Documentation](https://render.com/docs)
- [Render Node.js Guide](https://render.com/docs/deploy-node-express-app)
- [MongoDB Atlas Connection String](https://docs.mongodb.com/manual/reference/connection-string/)
- [ExpressJS Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)

---

## Support

For issues:
1. Check Render logs in dashboard
2. Review MongoDB Atlas connection
3. Verify environment variables
4. Check CORS configuration
5. Contact Render support: support@render.com

---

**Ready to deploy? Follow the steps above and your backend will be live!** 🚀
