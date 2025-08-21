# Production Deployment Guide

## Overview
This application consists of:
- **Frontend**: React + TypeScript + Vite (deployed on Vercel)
- **Backend**: Node.js + Express + TypeScript (deployed on Railway)

## Prerequisites

### Railway Backend Setup
1. **Connect to Railway**:
   - Go to [Railway.app](https://railway.app) and sign in
   - Connect your GitHub repository
   - Select the `backend` folder as the root directory

2. **Environment Variables**:
   Set these in the Railway dashboard:
   ```bash
   NODE_ENV=production
   PORT=3000
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/invoice_app
   JWT_SECRET=your-super-secure-jwt-secret-here
   FRONTEND_ORIGIN=https://your-vercel-app.vercel.app,https://your-vercel-app-git-main.vercel.app
   ```

3. **Domain Setup**:
   - Railway will provide a domain like `https://your-app.railway.app`
   - Note this URL for frontend configuration

### MongoDB Setup
1. **MongoDB Atlas** (recommended for production):
   - Create account at [MongoDB Atlas](https://cloud.mongodb.com)
   - Create a new cluster
   - Get connection string and update `MONGO_URI`
   - Whitelist Railway's IP addresses or use `0.0.0.0/0` for all IPs

### Vercel Frontend Setup
1. **Environment Variables**:
   In Vercel dashboard, set:
   ```bash
   VITE_API_URL=https://your-railway-app.railway.app
   ```

2. **Deploy Settings**:
   - Framework Preset: Vite
   - Build Command: `pnpm build`
   - Output Directory: `dist`
   - Install Command: `pnpm install`

## Post-Deployment Steps

### 1. Update API URL
Replace the placeholder in `frontend/.env.production`:
```bash
VITE_API_URL=https://your-actual-railway-domain.railway.app
```

### 2. Update CORS Origins
In Railway environment variables, update `FRONTEND_ORIGIN` with your actual Vercel URLs:
```bash
FRONTEND_ORIGIN=https://your-actual-vercel-app.vercel.app,https://your-actual-vercel-app-git-main.vercel.app
```

### 3. Test the Application
1. Check backend health: `https://your-railway-app.railway.app/health`
2. Test frontend API connection
3. Test full user flow: register → login → generate invoice

## Production Optimizations Included

### Backend
- ✅ CORS configuration for production domains
- ✅ Security headers with Helmet
- ✅ Rate limiting
- ✅ Request compression
- ✅ Production error handling
- ✅ Health check endpoint
- ✅ Proper logging
- ✅ Puppeteer Chrome configuration for Railway

### Frontend
- ✅ Production Vite configuration
- ✅ Code splitting and chunk optimization
- ✅ Environment-specific API URLs
- ✅ Request timeout handling
- ✅ Error boundary handling
- ✅ Security headers via Vercel config

## Monitoring & Maintenance

### Railway Monitoring
- Monitor logs in Railway dashboard
- Set up monitoring for health check endpoint
- Monitor resource usage

### Vercel Monitoring
- Check deployment logs in Vercel dashboard
- Monitor Vercel analytics
- Set up error tracking (Sentry recommended)

## Troubleshooting

### Common Issues
1. **CORS Errors**: Update `FRONTEND_ORIGIN` environment variable
2. **API Connection**: Verify `VITE_API_URL` points to correct Railway domain
3. **PDF Generation**: Ensure Puppeteer Chrome is properly configured
4. **Database Connection**: Check MongoDB Atlas connection string and IP whitelist

### Debug Commands
```bash
# Check backend health
curl https://your-railway-app.railway.app/health

# Check environment variables (Railway logs)
echo $NODE_ENV
echo $FRONTEND_ORIGIN
```

## Security Considerations
- ✅ Strong JWT secrets
- ✅ Environment variables secured
- ✅ CORS properly configured
- ✅ Rate limiting enabled
- ✅ Security headers configured
- ✅ No sensitive data in client-side code

## Performance Optimizations
- ✅ Code splitting
- ✅ Compression enabled
- ✅ Asset optimization
- ✅ Proper caching headers
- ✅ Database connection pooling
