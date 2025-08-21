// Deprecated: use server.ts instead
import { createApp } from './app'
import { connectDB } from './utils/db'
import { env } from './config/env'

const app = createApp()
connectDB(env.mongoUri).then(()=> {
	app.listen(env.port, ()=> console.log(`Server listening on port ${env.port}`))
}).catch(err=> {
	console.error('Failed to connect DB', err)
	process.exit(1)
})
