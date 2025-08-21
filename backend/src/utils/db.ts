import mongoose from 'mongoose'

export async function connectDB(uri: string) {
	if (mongoose.connection.readyState === 1) return
	try {
		await mongoose.connect(uri, {
			// modern connection options are defaults in Mongoose 8, but you can still pass placeholders
		})
		console.log('✅ MongoDB connected')
	} catch (err) {
		console.error('❌ MongoDB connection error:', (err as Error).message)
		throw err
	}
}

export function disconnectDB() {
	return mongoose.disconnect()
}
