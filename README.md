# Eddyrose International Academy — Portal

Welcome to the Eddyrose Academy portal monorepo. This repository contains the code for both the user-facing website/dashboard and the backend API server.

## Project Structure

The codebase is organized into two completely separate applications:

- **/frontend** — A Next.js application handling the public website and the secure portal dashboard.
- **/backend** — An Express.js REST API handling the database (Prisma, PostgreSQL), PDF generation, and core business logic.

## Prerequisites

- Node.js v20+
- A PostgreSQL database (e.g. Neon, Supabase, or local)

## Getting Started

### 1. Installation

From the root directory, install the dependencies for both applications:

```bash
npm run install:all
```

### 2. Environment Variables

Create `.env` files in both the `frontend` and `backend` directories using the provided examples:

- `frontend/.env.example` -> `frontend/.env`
- `backend/.env.example` -> `backend/.env`

Ensure that the `INTERNAL_API_SECRET` matches exactly in both `.env` files. This is how the frontend securely communicates with the backend.

### 3. Database Setup (Backend)

The backend handles the database. Run the following commands inside the `/backend` directory:

```bash
cd backend
npm run db:generate  # Generates the Prisma client
npm run db:push      # Pushes the schema to your database
npm run db:seed      # Seeds the database with default Superadmin and data
```

### 4. Running Locally

You can run both the frontend and backend concurrently from the root directory:

```bash
npm run dev
```

This will start:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:4000

## Deployment

Both applications can be deployed independently.

- **Backend**: Deploy the `/backend` folder to a service like Render or Heroku. Make sure to set the build and start scripts as defined in `backend/package.json`.
- **Frontend**: Deploy the `/frontend` folder to Vercel or Netlify. Set `BACKEND_URL` to your live backend URL.
