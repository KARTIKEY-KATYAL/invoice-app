import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import rateLimit from 'express-rate-limit'
import { env } from './config/env'
import { httpLogger, httpLoggerDev } from './config/logger'
import authRoutes from './routes/auth'
import invoiceRoutes from './routes/invoice'

export function createApp() {
  const app = express()
  
  // Trust proxy for Railway deployment
  app.set('trust proxy', 1)
  
  // CORS configuration for production
  app.use(cors({ 
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true)
      
      if (env.frontendOrigin.some(allowedOrigin => {
        // Support wildcard subdomains for vercel
        if (allowedOrigin.includes('*')) {
          const pattern = allowedOrigin.replace(/\*/g, '.*')
          return new RegExp(`^${pattern}$`).test(origin)
        }
        return allowedOrigin === origin
      })) {
        return callback(null, true)
      }
      
      return callback(new Error('Not allowed by CORS'))
    },
    credentials: true 
  }))
  
  // Security middleware
  app.use(helmet({
    crossOriginEmbedderPolicy: false, // Required for PDF generation
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
  }))
  
  app.use(compression())
  app.use(express.json({ limit: '1mb' }))
  
  // Rate limiting
  app.use(rateLimit({ 
    windowMs: env.rateLimitWindowMs, 
    max: env.rateLimitMax,
    message: { error: 'Too many requests, please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
  }))
  
  // Logging
  app.use(env.node === 'development' ? httpLoggerDev : httpLogger)

  // Health check endpoint
  app.get('/health', (req, res) => res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: env.node,
    version: process.env.npm_package_version || '1.0.0'
  }))
  
  // API routes
  app.use('/api/auth', authRoutes)
  app.use('/api/invoice', invoiceRoutes)

  // 404 handler
  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' })
  })
  
  // Global error handler
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Unhandled error:', err)
    
    // Don't leak error details in production
    const message = env.node === 'production' 
      ? 'Internal Server Error' 
      : err.message || 'Internal Server Error'
    
    res.status(err.status || 500).json({ error: message })
  })

  return app
}
