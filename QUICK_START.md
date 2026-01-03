# Quick Start Guide - GoFood MERN App

## 🚀 Running the Application

### Step 1: Start MongoDB

MongoDB must be running for the backend to work.

**On Windows:**

```bash
# If MongoDB is installed as service, it may already be running
# Or start it manually:
mongod
```

### Step 2: Terminal 1 - Start Backend

```bash
cd Gofood/backend
npm install  # First time only
npm run dev
```

Expected output:

```
[nodemon] 3.1.11
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] starting `node index.js`
✓ MongoDB Connected: mongodb://localhost:27017/gofood
✓ Server running on port 5000
```

### Step 3: Terminal 2 - Start Frontend

```bash
cd Gofood
npm install  # First time only
npm start
```

The app will automatically open at http://localhost:3000

---

## 📋 Testing Workflow

### 1. Create a New Account

- Go to "Signup" page
- Enter: Name, Email, Password
- Click "Get Current Location" (requires location permission)
- Click "Sign Up"

### 2. Login

- Go to "Login" page
- Enter your email and password
- Click "Login"

### 3. Browse Food

- Home page shows available food items
- Use search bar to find specific items
- Click category buttons to filter

### 4. Add to Cart

- Click on food cards to open modal
- Select size and quantity
- Click "Add to Cart"

### 5. Checkout

- Click cart icon (top right)
- Review items
- Click "Check Out"
- Order will be saved and cart will clear

### 6. View Orders

- After login, click "My Orders" in navbar
- View all your past orders with dates

---

## 🔍 Verify Setup

### Backend Connection Status

```bash
# Terminal shows this when successful:
# ✓ MongoDB Connected: mongodb://localhost:27017/gofood
# ✓ Server running on port 5000
```

### Frontend Status

```bash
# Terminal shows:
# Compiled successfully!
# You can now view mernapp in the browser.
# Local:            http://localhost:3000
```

---

## ⚙️ Configuration Files

### Backend (.env)

Located: `Gofood/backend/.env`

```
MONGO_URI=mongodb://localhost:27017/gofood
JWT_SECRET=your_super_secret_jwt_key_change_in_production
PORT=5000
NODE_ENV=development
OPENCAGE_API_KEY=74c89b3be64946ac96d777d08b878d43
```

### Frontend (.env)

Located: `Gofood/.env`

```
REACT_APP_API_URL=http://localhost:5000
```

---

## 🐛 Common Issues & Fixes

### Issue: "MongoDB connection refused"

**Solution:**

- Ensure MongoDB is running
- Start with: `mongod`
- Check MONGO_URI in backend/.env

### Issue: "Port 5000 already in use"

**Solution:**

- Change PORT in backend/.env to different port (e.g., 5001)
- Update REACT_APP_API_URL in frontend/.env to match

### Issue: "Port 3000 already in use"

**Solution:**

- Terminal will ask "Would you like to run on 3001 instead? (Y/n)"
- Type: `Y`

### Issue: "Cannot find module '@material-ui/icons'"

**Solution:**

- Run: `npm install` in frontend directory
- Then: `npm start`

### Issue: "API calls returning 401 Unauthorized"

**Solution:**

- Ensure you're logged in (token in localStorage)
- Try logging in again
- Check browser console for error details

### Issue: "Geolocation not working in signup"

**Solution:**

- Browser requires HTTPS for geolocation (unless localhost)
- Allow location permission when prompted
- Check browser DevTools console for errors

---

## 📱 API Endpoints Reference

Base URL: `http://localhost:5000/api/auth`

### User Authentication

```
POST /createuser
Body: { name, email, password, location }
Response: { success: true, message: "User created" }

POST /login
Body: { email, password }
Response: { success: true, token: "jwt_token_here" }

POST /getuser
Headers: { auth-token: "jwt_token" }
Response: { success: true, data: { name, email, ... } }
```

### Data Endpoints

```
POST /foodData
Response: { success: true, foodItems: [...] }

POST /orderData
Body: { order_data, email, order_date }
Headers: { auth-token: "jwt_token" }
Response: { success: true }

POST /myOrderData
Body: { email }
Headers: { auth-token: "jwt_token" }
Response: { success: true, orderData: {...} }

POST /getlocation
Body: { latlong: { lat, long } }
Response: { success: true, location: "address" }
```

---

## 🎯 Project Structure Overview

```
Gofood/
├── backend/           # Express.js server
│   ├── db.js         # MongoDB connection
│   ├── index.js      # Express setup & routes
│   ├── Routes/       # API endpoints
│   ├── models/       # Database schemas
│   └── middleware/   # Auth middleware
├── src/              # React frontend
│   ├── components/   # React components
│   ├── screens/      # Page components
│   ├── utils/        # Utilities (API calls)
│   └── App.js        # Main app component
├── public/           # Static assets
└── package.json      # Dependencies
```

---

## 💡 Development Tips

1. **Auto-restart backend on file changes**

   - Nodemon is configured and running

2. **Auto-reload frontend on file changes**

   - React dev server watches all files automatically

3. **View API requests in browser**

   - Open DevTools → Network tab
   - Browse to see all API calls

4. **View Console Logs**

   - Frontend: Browser DevTools → Console
   - Backend: Terminal where you ran `npm run dev`

5. **Debug Authentication**
   - Check `localStorage` in browser DevTools
   - Should have: `token` and `userEmail` after login

---

## 📊 Performance Notes

- First load: ~2-3 seconds
- API calls: <500ms
- Images: Lazy loaded for performance
- No unnecessary re-renders (optimized components)

---

## ✅ Success Indicators

You'll know everything is working when:

1. ✅ Backend terminal shows: "Server running on port 5000"
2. ✅ Frontend shows: "Compiled successfully!"
3. ✅ App opens at http://localhost:3000
4. ✅ Can create account and see confirmation
5. ✅ Can login and see "My Orders" navbar link
6. ✅ Can view food items on home page
7. ✅ Can add items to cart
8. ✅ Can checkout and see order confirmation
9. ✅ Can view past orders in "My Orders"

---

**Ready to develop!** 🎉
