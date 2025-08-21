import { createApp } from './app'
import { connectDB } from './utils/db'
import { env } from './config/env'

async function start() {
  try {
    await connectDB(env.mongoUri)
    const app = createApp()
    app.listen(env.port, ()=> console.log(`🚀 Server ready on port ${env.port} env=${env.node}`))
  } catch (err) {
    console.error('Startup failed', err)
    process.exit(1)
  }
}

start()
