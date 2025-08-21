import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })
dotenv.config({ path: path.join(process.cwd(), '.env.local'), override: true })

// Allow either MONGO_URI (preferred) or legacy MONGO_URL from .env
const mongoFromEnv = process.env.MONGO_URI || process.env.MONGO_URL

// Production-ready frontend origins
const getFrontendOrigins = () => {
  const envOrigins = process.env.FRONTEND_ORIGIN
  if (envOrigins) {
    return envOrigins.split(',').map(origin => origin.trim())
  }
  
  // Default origins for different environments
  if (process.env.NODE_ENV === 'production') {
    return [
      'https://invoice-hnj93etwp-kartikey-katyals-projects.vercel.app',
      'https://invoice-app-beta-lac.vercel.app/',
      'https://invoice-m5gkv5vbq-kartikey-katyals-projects.vercel.app',
      'https://invoice-app-kartikey-katyals-projects.vercel.app',
      'https://your-vercel-domain.vercel.app' // Replace with actual domain
    ]
  }
  
  return ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000']
}

export const env = {
  node: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '4000', 10),
  mongoUri: mongoFromEnv || 'mongodb://127.0.0.1:27017/invoice_app',
  jwtSecret: process.env.JWT_SECRET || 'secret',
  frontendOrigin: getFrontendOrigins(),
  rateLimitWindowMs: 15 * 60 * 1000,
  rateLimitMax: process.env.NODE_ENV === 'production' ? 100 : 1000 // More lenient for dev
}

export const mail = {
  host: process.env.MAILTRAP_HOST || 'sandbox.smtp.mailtrap.io',
  port: parseInt(process.env.MAILTRAP_PORT || '25', 10),
  user: process.env.MAILTRAP_USER || '',
  pass: process.env.MAILTRAP_PASSWORD || ''
}
