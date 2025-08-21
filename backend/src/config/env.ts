import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })
dotenv.config({ path: path.join(process.cwd(), '.env.local'), override: true })

// Allow either MONGO_URI (preferred) or legacy MONGO_URL from .env
const mongoFromEnv = process.env.MONGO_URI || process.env.MONGO_URL

export const env = {
  node: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '4000', 10),
  mongoUri: mongoFromEnv || 'mongodb://127.0.0.1:27017/invoice_app',
  jwtSecret: process.env.JWT_SECRET || 'secret',
  frontendOrigin: (process.env.FRONTEND_ORIGIN || 'http://localhost:5173').split(','),
  rateLimitWindowMs: 15 * 60 * 1000,
  rateLimitMax: 100
}
