# Deployment Guide: Express Engineering Consultancy

This guide provides step-by-step instructions on how to deploy the entire stack for **100% free** with **zero wake-up/sleep delays** using Vercel Serverless and Supabase.

---

## Architecture Overview

```mermaid
graph TD
    ClientSite[Client Frontend - Vercel Project 1] -->|Same Domain /api| ExpressBackend[Express Serverless - Vercel Project 1]
    AdminSite[Admin Portal - Vercel Project 2] -->|API Requests| ExpressBackend
    ExpressBackend <--> CloudDB[(Postgres DB - Supabase/Neon)]
    ExpressBackend <--> LocalDB[(SQLite Local DB - fallback)]
```

For optimal performance, security, and persistence, we deploy the entire system using two Vercel projects and one Supabase database:
1. **Database**: Hosted on **Supabase** (Free Tier PostgreSQL).
2. **Main Project (Frontend & Backend)**: Hosted on **Vercel** as a single project. The client-side files are static, and the Node/Express backend runs as Vercel Serverless Functions under `/api`.
3. **Secret Admin Portal**: Hosted on **Vercel** as a separate, standalone static project.

---

## Phase 1: Set Up the Free Database (Supabase)

To prevent data loss (essential for serverless environments which do not persist local files), we connect our backend to a free cloud PostgreSQL database.

1. Sign up for a free account at [Supabase](https://supabase.com).
2. Click **New Project** and name it (e.g., `Express Consultancy DB`).
3. Set a secure database password.
4. Once the project is created, go to **Project Settings** (gear icon) → **Database** → **Connection String** → **URI**.
5. Copy the connection string. It looks like:
   `postgresql://postgres.[username]:[password]@aws-0-us-east-1.pooler.supabase.com:6543/postgres`
6. Replace `[password]` with the database password you chose in Step 3.

---

## Phase 2: Deploy the Main Project (Client Site + Backend)

We deploy the main repository folder to Vercel. Vercel will build the React/Vite client and host the Express app as serverless functions.

1. Log in to [Vercel](https://vercel.com).
2. Click **Add New** → **Project**.
3. Import your GitHub repository.
4. Configure the project settings:
   - **Project Name**: `express-engineering-consultancy`
   - **Framework Preset**: `Vite`
   - **Root Directory**: Keep empty or set to `.` (the main repository folder)
   - **Build & Development Settings**:
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
5. Expand the **Environment Variables** section and add:
   - **Key**: `DATABASE_URL` | **Value**: `[Your Supabase Connection String]` *(Paste the URI copied in Phase 1)*
   - **Key**: `VITE_API_URL` | **Value**: `/` *(Using `/` tells the frontend to use relative routes since the API is hosted on the same domain!)*
6. Click **Deploy**.

* Vercel will build your static client files to `/dist` and compile `/api/index.js` into a serverless function.
* Once the deployment finishes, copy your live project URL (e.g., `https://express-engineering-consultancy.vercel.app`).

---

## Phase 3: Deploy the Secret Admin Portal

The Admin Portal is deployed as its own standalone project on Vercel to maintain complete security isolation.

1. In Vercel, click **Add New** → **Project** to create a separate deployment.
2. Select the **same** GitHub repository.
3. Configure the project settings:
   - **Project Name**: `express-consultancy-admin`
   - **Framework Preset**: `Vite`
   - **Root Directory**: Click "Edit" and select `secret-admin`
   - **Build & Development Settings**:
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist` *(which resolves to `secret-admin/dist`)*
4. Expand the **Environment Variables** section and add:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://express-engineering-consultancy.vercel.app` *(use the Main Project URL from Phase 2)*
5. Click **Deploy**.

---

## Accessing Your Websites

Once deployment finishes, you will receive two distinct URLs:
- **Client Website**: `https://express-engineering-consultancy.vercel.app` (includes your main page, inquiry tracking, shop checkout, and the serverless `/api` backend).
- **Admin Dashboard**: `https://express-consultancy-admin.vercel.app` (standalone dashboard, requires password `admin123` to unlock, connects to the serverless backend on the main site).
