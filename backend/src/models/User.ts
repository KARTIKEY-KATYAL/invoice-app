import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  password: string
  createdAt: Date
  resetPasswordToken?: string
  resetPasswordExpires?: Date
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  // Token and expiry used for password reset flow
  resetPasswordToken: { type: String, required: false },
  resetPasswordExpires: { type: Date, required: false }
})

export const User = mongoose.model<IUser>('User', userSchema)
