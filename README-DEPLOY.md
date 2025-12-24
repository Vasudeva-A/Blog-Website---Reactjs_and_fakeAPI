Deployment guide

Overview

- Frontend: Vite React app in the repo root (`blog`). Build output is in `dist`.
- Backend (fake API): json-server in `src/Components/fake-api` serving `db.json`.
- The frontend uses `VITE_API_URL` at build time to set the API base URL (`src/api/axios.js`).

Prepare for deployment

1. Ensure all changes are committed to your Git repo.
2. Set the backend base URL in Render/Netlify environment variables as `VITE_API_URL`.
   - Example: `https://my-fake-api.onrender.com/` (include trailing slash).

Render (recommended for both frontend and backend)
Option A — Separate services (recommended):

- Create two services on Render:
  1. Static Site (frontend)
     - Connect to your repo and branch.
     - Build Command: `npm install && npm run build`
     - Publish Directory: `dist`
     - Set Environment Variable: `VITE_API_URL` -> your backend URL.
  2. Web Service (backend)
     - In the same repo, create a Web Service but set the "Root Directory" to `src/Components/fake-api`.
     - Build Command: `npm install`
     - Start Command: `npm start`
     - Render exposes a `$PORT` environment variable; `fake-api/package.json` start script uses this.
     - (Optional) Set `NODE_ENV=production`.

Option B — Single monorepo service (not recommended for static frontend):

- You can deploy the whole repo as a web service, but you'll need a Node server to serve static `dist` files and run json-server — this repo doesn't include that. Use Option A.

Netlify (frontend only)

- Create a site on Netlify connected to your repo.
- Build command: `npm install && npm run build`
- Publish directory: `dist`
- Set environment variable `VITE_API_URL` to your backend URL (must point to the Render backend or another hosted API).

Backend hosting alternatives

- Render Web Service (recommended)
- Heroku (deprecated for free tier) — same approach: point to `src/Components/fake-api` and run `npm start`.

Important notes

- CORS: `fake-api/server.js` uses `cors()` so cross-origin requests from the frontend are allowed.
- API persistence: `json-server` modifies `db.json` on writes. On many hosting providers the filesystem is ephemeral or shared per instance. For production, use a real database.
- Environment variable: `VITE_API_URL` must be set at build time for Vite. On Netlify/Render set it in the service settings prior to building.

Quick verification locally

1. Start backend:

```bash
cd blog/src/Components/fake-api
npx json-server --watch db.json --port 5000 --host 0.0.0.0
```

2. Build frontend:

```bash
cd blog
npm install
npm run build
```

3. Serve `dist` locally (optional):

```bash
npm install -g serve
serve -s dist -l 5001
# open http://localhost:5001 and set browser to use VITE_API_URL pointing to http://localhost:5000/
```

If you want, I can:

- Add `render.yaml` manifest to the repo to create both services on Render automatically.
- Create a small Node static server to deploy frontend+backend together.

Tell me which option you prefer and I will proceed to add manifest files or a static server.
