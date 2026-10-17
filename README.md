# Event Management Platform

A Jira-like project and issue tracker.

## Stack

- **Backend**: Node.js, Express, TypeScript, Prisma, PostgreSQL
- **Frontend**: React, TypeScript, Vite
- Monorepo managed with npm workspaces

## Project structure

```
backend/   Express API + Prisma schema (projects, issues, users, comments)
frontend/  React app (Vite)
```

## Getting started

1. Install dependencies:

   ```
   npm install
   ```

2. Start Postgres (via Docker):

   ```
   docker compose up -d postgres
   ```

3. Configure the backend environment:

   ```
   cp backend/.env.example backend/.env
   ```

4. Run database migrations:

   ```
   npm run --workspace=backend prisma:migrate
   ```

5. Start both apps (in separate terminals):

   ```
   npm run dev:backend
   npm run dev:frontend
   ```

   - Backend: http://localhost:4000
   - Frontend: http://localhost:5173 (proxies `/api` to the backend)
