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
  app.set('trust proxy', 1)
  app.use(cors({ origin: env.frontendOrigin, credentials: true }))
  app.use(helmet())
  app.use(compression())
  app.use(express.json({ limit: '1mb' }))
  app.use(rateLimit({ windowMs: env.rateLimitWindowMs, max: env.rateLimitMax }))
  app.use(env.node === 'development' ? httpLoggerDev : httpLogger)

  app.get('/health', (req,res)=> res.json({ status:'ok', time: new Date().toISOString() }))
  app.use('/api/auth', authRoutes)
  app.use('/api/invoice', invoiceRoutes)

  app.use((_,__ , next)=> next())
  app.use((err:any, _req:express.Request, res:express.Response, _next:express.NextFunction)=> {
    console.error('Unhandled error', err)
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' })
  })

  return app
}
