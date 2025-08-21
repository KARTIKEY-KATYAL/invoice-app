# 🔧 Request Failed - Troubleshooting Guide

## ✅ Fixed Issues

1. **Frontend Environment Configuration**: Updated `.env.local` to use production backend
2. **CORS Configuration**: Verified and working for your Vercel domain
3. **Backend Health**: Confirmed backend is running and accessible
4. **API Endpoints**: Tested and working (registration endpoint confirmed)

## 🚀 Current Status

- **Backend**: ✅ Working at `https://backend-production-1474.up.railway.app`
- **Frontend Local**: ✅ Running at `http://localhost:5174`
- **Frontend Production**: ✅ Deployed at `https://invoice-hnj93etwp-kartikey-katyals-projects.vercel.app`

## 🔍 If You're Still Getting "Request Failed"

### 1. Check Which Environment You're Testing

**For Local Development** (http://localhost:5174):
- ✅ Updated `.env.local` to use production backend
- ✅ Added localhost:5174 to CORS origins

**For Production** (Vercel):
- ✅ Environment variable `VITE_API_URL` should be set in Vercel dashboard
- ✅ CORS is configured for your Vercel domain

### 2. Verify Environment Variables

**In Railway Dashboard**, ensure these are set:
```
NODE_ENV=production
PORT=3000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/invoice_app
JWT_SECRET=your-super-secure-jwt-secret
FRONTEND_ORIGIN=https://invoice-hnj93etwp-kartikey-katyals-projects.vercel.app
```

**In Vercel Dashboard**, ensure this is set:
```
VITE_API_URL=https://backend-production-1474.up.railway.app
```

### 3. Database Connection Issues

If registration/login fails, check:
1. MongoDB Atlas cluster is running
2. Connection string is correct in Railway
3. IP whitelist includes Railway IPs (or use 0.0.0.0/0)
4. Database user has read/write permissions

### 4. Common Error Messages and Solutions

**"Request failed" or "Network Error"**:
- Check if backend is accessible: `curl https://backend-production-1474.up.railway.app/health`
- Verify CORS headers in browser DevTools Network tab

**"Request timeout"**:
- Backend might be cold starting (wait 30 seconds and try again)
- Check Railway logs for backend errors

**"Unauthorized" or "403 Forbidden"**:
- Check JWT_SECRET is set in Railway
- Verify token is being sent correctly

### 5. Testing Steps

1. **Test Backend Health**:
   ```bash
   curl https://backend-production-1474.up.railway.app/health
   ```

2. **Test API Endpoint**:
   ```bash
   curl -X POST -H "Content-Type: application/json" \
   -d '{"email":"test@example.com","password":"testpass","name":"Test"}' \
   https://backend-production-1474.up.railway.app/api/auth/register
   ```

3. **Check Browser Console**:
   - Open DevTools → Console
   - Look for any JavaScript errors
   - Check Network tab for failed requests

### 6. Immediate Actions

1. **Redeploy Backend** (if you made CORS changes):
   ```bash
   cd backend
   git add .
   git commit -m "Update CORS configuration"
   git push origin main
   ```

2. **Redeploy Frontend** (if environment variables changed):
   ```bash
   cd frontend
   git add .
   git commit -m "Update environment configuration"
   git push origin main
   ```

3. **Restart Development Server** (if testing locally):
   - Stop current server (Ctrl+C)
   - Run `pnpm run dev` again

## 🎯 Quick Test

Visit your frontend at http://localhost:5174 and try to:
1. Register a new account
2. Login with the account
3. Check browser DevTools for any errors

If issues persist, check the Railway backend logs for specific error messages.

## 📱 Contact Information

- Backend Health: https://backend-production-1474.up.railway.app/health
- Frontend Local: http://localhost:5174
- Frontend Production: https://invoice-hnj93etwp-kartikey-katyals-projects.vercel.app
