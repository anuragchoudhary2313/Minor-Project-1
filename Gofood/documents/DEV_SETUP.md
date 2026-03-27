Developer setup to restore hot-reload (npm start)

Option A — Install Node LTS (recommended)

1. Install Node.js LTS (v18 or v20):

   - Windows: https://nodejs.org/en/download/ choose "LTS" (v18.x or v20.x)
   - After installing, restart your terminal/VS Code.

2. From project root run:

```powershell
npm install
npm start
```

Option B — Upgrade create-react-app / react-scripts (only if you cannot change Node)

1. Upgrade `react-scripts` in `package.json` (may require code changes):

```powershell
npm install --save-dev react-scripts@latest
```

2. If that breaks, consider migrating to Vite or updating dependencies carefully; prefer Option A if possible.

Notes

Automated upgrade (optional)

To try an automated upgrade of `react-scripts` and related dependencies (creates a new branch):

```powershell
git checkout -b feat/upgrade-react-scripts
npm install --save-dev react-scripts@latest
npm install
npm run build
```

If the build succeeds, open the app with `npm start` and verify hot-reload. If it fails, revert the branch and prefer installing Node LTS.

Environment variables for OAuth

To enable real OAuth redirects configure environment variables in a `.env` file at the project root (restart dev server after changes):

```
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id
REACT_APP_APPLE_CLIENT_ID=your-apple-client-id
```

The frontend will redirect to the backend route `/api/auth/oauth/google` or `/api/auth/oauth/apple` when those variables are present. Your backend must implement those routes to handle provider redirects and callback exchange.
