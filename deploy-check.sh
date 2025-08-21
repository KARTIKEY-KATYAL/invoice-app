#!/bin/bash

# Production Deployment Check Script
# Run this before deploying to production

echo "🚀 Production Deployment Checklist"
echo "=================================="

# Check for required environment files
echo "📁 Checking environment configuration..."
if [ -f "frontend/.env.production" ]; then
    echo "✅ frontend/.env.production exists"
else
    echo "❌ frontend/.env.production missing"
fi

if [ -f "backend/.env.example" ]; then
    echo "✅ backend/.env.example exists"
else
    echo "❌ backend/.env.example missing"
fi

# Check if placeholder URLs are still present
echo ""
echo "🔗 Checking for placeholder URLs..."
if grep -q "your-railway-app.railway.app" frontend/.env.production; then
    echo "⚠️  Replace placeholder Railway URL in frontend/.env.production"
else
    echo "✅ Railway URL configured in frontend/.env.production"
fi

# Check package.json scripts
echo ""
echo "📦 Checking build scripts..."
cd backend
if npm run build > /dev/null 2>&1; then
    echo "✅ Backend builds successfully"
else
    echo "❌ Backend build failed"
fi

cd ../frontend
if npm run build > /dev/null 2>&1; then
    echo "✅ Frontend builds successfully"
else
    echo "❌ Frontend build failed"
fi

echo ""
echo "📋 Manual checklist:"
echo "□ MongoDB Atlas database created and configured"
echo "□ Railway environment variables set"
echo "□ Vercel environment variables set"
echo "□ CORS origins updated with actual domains"
echo "□ JWT secret is strong and secure"
echo "□ SMTP credentials configured (if using email features)"
echo ""
echo "✨ Ready for production deployment!"
