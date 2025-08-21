# Invoice App (MERN + Puppeteer)

This repository contains a full-stack Invoice Generator built with:

- **Frontend**: React + Vite + TypeScript + Tailwind + shadcn UI + Redux + TanStack Query
- **Backend**: Node.js + Express + TypeScript, MongoDB, Puppeteer for server-side PDF generation

## 🚀 Production Deployment

### Live Application
- **Frontend**: Deployed on Vercel
- **Backend**: Deployed on Railway

### Quick Production Setup
1. **Backend on Railway**: Set environment variables in Railway dashboard
2. **Frontend on Vercel**: Set `VITE_API_URL` to your Railway domain
3. **Database**: Use MongoDB Atlas for production

📖 **Detailed deployment guide**: See [PRODUCTION.md](./PRODUCTION.md)

## 🛠️ Local Development

### Backend Setup
1. Create a `.env` file in `backend/` (copy from `.env.example`) and fill in values
2. Install dependencies and run:

```bash
cd backend
pnpm install
pnpm run dev
```

### Frontend Setup
```bash
cd frontend
pnpm install
pnpm run dev
```

## 📋 Environment Variables

### Backend (.env)
```bash
MONGO_URI=mongodb://localhost:27017/invoice_app
JWT_SECRET=your-secret-key
FRONTEND_ORIGIN=http://localhost:5173
PORT=3000
```

### Frontend (.env.local)
```bash
VITE_API_URL=http://localhost:3000
```

## 🔧 Production Features

### Security & Performance
- ✅ CORS configuration for production domains
- ✅ Rate limiting and security headers
- ✅ Request compression and optimization
- ✅ Environment-specific configurations
- ✅ Error handling and logging
- ✅ Health check endpoints

### Deployment Ready
- ✅ Vercel configuration (`vercel.json`)
- ✅ Railway configuration (`railway.toml`)
- ✅ Docker support with multi-stage builds
- ✅ Production environment files
- ✅ Deployment checklist scripts

## 🏃‍♂️ Quick Deploy Check

Run the deployment checklist:
```bash
# Windows
deploy-check.bat

# Linux/Mac
./deploy-check.sh
```

## 📝 Notes

- The backend uses Puppeteer for PDF generation with Chrome/Chromium
- Railway automatically handles Chrome installation
- Never commit secrets - use environment variables
- MongoDB Atlas recommended for production database

## 🔗 Key Files

- `PRODUCTION.md` - Detailed production deployment guide
- `frontend/vercel.json` - Vercel deployment configuration
- `backend/railway.toml` - Railway deployment configuration
- `backend/Dockerfile` - Docker configuration for containerized deployment

