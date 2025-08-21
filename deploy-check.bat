@echo off
echo 🚀 Production Deployment Checklist
echo ==================================

echo 📁 Checking environment configuration...
if exist "frontend\.env.production" (
    echo ✅ frontend\.env.production exists
) else (
    echo ❌ frontend\.env.production missing
)

if exist "backend\.env.example" (
    echo ✅ backend\.env.example exists
) else (
    echo ❌ backend\.env.example missing
)

echo.
echo 🔗 Checking for placeholder URLs...
findstr /C:"your-railway-app.railway.app" "frontend\.env.production" >nul 2>&1
if %errorlevel% equ 0 (
    echo ⚠️  Replace placeholder Railway URL in frontend\.env.production
) else (
    echo ✅ Railway URL configured in frontend\.env.production
)

echo.
echo 📦 Checking build scripts...
cd backend
call pnpm build >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Backend builds successfully
) else (
    echo ❌ Backend build failed
)

cd ..\frontend
call pnpm build >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Frontend builds successfully
) else (
    echo ❌ Frontend build failed
)

cd ..

echo.
echo 📋 Manual checklist:
echo □ MongoDB Atlas database created and configured
echo □ Railway environment variables set
echo □ Vercel environment variables set
echo □ CORS origins updated with actual domains
echo □ JWT secret is strong and secure
echo □ SMTP credentials configured (if using email features)
echo.
echo ✨ Ready for production deployment!
