# Invoice App (MERN + Puppeteer)

This repository contains a full-stack Invoice Generator built with:

- Frontend: React + Vite + TypeScript + Tailwind + shadcn UI + Redux + TanStack Query
- Backend: Node.js + Express + TypeScript, MongoDB, Puppeteer for server-side PDF generation

Important: do NOT commit secrets. Use `.env` locally (see `backend/.env.example`).

## Quick local setup (backend)

1. Create a `.env` file in `backend/` (copy from `.env.example`) and fill in values.
2. Install dependencies and run:

```powershell
cd backend
pnpm install
pnpm run build
pnpm start
```

## Quick local setup (frontend)

```powershell
cd frontend
pnpm install
pnpm run dev
```

## Environment variables (backend)

- `MONGO_URL` - MongoDB connection string
- `JWT_SECRET` - secret used for signing JWT tokens
- `FRONTEND_ORIGIN` - allowed frontend origin for CORS
- `PORT` - backend port
- `CHROME_PATH` (optional) - absolute path to Chrome/Chromium binary for Puppeteer

## Notes

- The backend uses Puppeteer to generate PDFs; some hosting providers require you to install a Chrome binary or allow headless chrome. The code allows specifying `CHROME_PATH`.
- Remove any leaked secrets from git history if necessary.

