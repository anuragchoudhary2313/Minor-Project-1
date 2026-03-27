# FoGood / GoFood

A MERN food ordering application with a React frontend, an Express and MongoDB backend, and a polished menu and ordering flow.

## Repository layout

- `Gofood/` - main application
- `Gofood/src/` - React frontend
- `Gofood/backend/` - Express API and MongoDB integration
- `design-system/` - supporting design assets and references
- root docs - setup, deployment, and project status guides

## Features

- Landing page and menu browsing
- Search and category-based food discovery
- Veg and non-veg filtering
- Cart state with size-based pricing
- User signup and login
- Order placement and order history
- Location lookup via OpenCage
- Local image assets for menu items

## Tech stack

### Frontend

- React 18
- React Router 6
- Bootstrap 5
- Framer Motion
- Recharts
- Lucide React

### Backend

- Node.js 20
- Express 4
- MongoDB with Mongoose 8
- JWT authentication
- bcryptjs
- express-validator

## Prerequisites

- Node.js 20.x
- npm
- MongoDB local instance or MongoDB Atlas

## Environment variables

### Frontend: `Gofood/.env`

```env
REACT_APP_API_URL=http://localhost:5000
```

### Backend: `Gofood/backend/.env`

```env
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_jwt_secret_here
PORT=5000
NODE_ENV=development
OPENCAGE_API_KEY=your_opencage_api_key_here
```

## Local development

### 1. Install frontend dependencies

```powershell
cd Gofood
npm install
```

### 2. Install backend dependencies

```powershell
cd Gofood\backend
npm install
```

### 3. Start the backend

```powershell
cd Gofood\backend
npm run dev
```

The backend starts on `http://localhost:5000` by default and can auto-shift to the next port in development if the preferred port is busy.

### 4. Start the frontend

```powershell
cd Gofood
npm start
```

The frontend runs on `http://localhost:3000`.

## Available scripts

### Frontend: `Gofood/package.json`

- `npm start` - run the React app in development
- `npm run build` - create a production build
- `npm test` - run tests
- `npm run lint` - lint frontend source files
- `npm run format` - format frontend source files

### Backend: `Gofood/backend/package.json`

- `npm start` - start the API server
- `npm run dev` - start the API server with nodemon

## Application routes

### Frontend pages

- `/` - home / landing page
- `/menu` - food catalog
- `/login` - sign in
- `/signup` - registration
- `/myorder` - order history

### Backend API

- `GET /` - API status response
- `POST /api/auth/createuser` - register a user
- `POST /api/auth/login` - authenticate a user
- `POST /api/auth/getuser` - fetch logged-in user details
- `POST /api/auth/getlocation` - reverse geocode coordinates
- `POST /api/auth/foodData` - fetch menu items and categories
- `POST /api/auth/orderData` - place an order
- `POST /api/auth/myOrderData` - fetch a user's past orders

## Notes

- The backend includes mock fallback data so development can still start if MongoDB is unavailable.
- Runtime API discovery is supported in development through `public/backend-runtime.json`.
- Menu seed and image utilities live under `Gofood/backend/`, including `generate_100_items.js`, `count-images.js`, and `check-images.js`.

## Project docs

- [Quick Start](./QUICK_START.md)
- [Project Status](./PROJECT_STATUS.md)
- [Completion Summary](./COMPLETION_SUMMARY.md)
- [Verification Checklist](./VERIFICATION_CHECKLIST.md)
- [Index](./INDEX.md)
- [Render Deployment Guide](./RENDER_DEPLOYMENT_GUIDE.md)
- [Vercel Deployment Guide](./VERCEL_DEPLOYMENT_GUIDE.md)

## Verification

I verified the README against:

- `Gofood/package.json`
- `Gofood/backend/package.json`
- `Gofood/src/App.js`
- `Gofood/backend/Routes/Auth.js`
- `Gofood/.env.example`
- `Gofood/backend/.env.example`
