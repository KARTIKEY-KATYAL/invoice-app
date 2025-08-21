import { Request, Response } from 'express'
// bcrypt already imported at top
import jwt from 'jsonwebtoken'
import { User } from '../models/User'
import { env } from '../config/env'
import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import { sendMail } from '../utils/mailer'

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body as { name: string; email: string; password: string }
  const existing = await User.findOne({ email })
  if (existing) return res.status(409).json({ message: 'Email already registered' })
  const hash = await bcrypt.hash(password, 10)
  const user = await User.create({ name, email, password: hash })
  return res.status(201).json({ id: user.id, name: user.name, email: user.email })
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body as { email: string; password: string }
  const user = await User.findOne({ email })
  if (!user) return res.status(401).json({ message: 'Invalid credentials' })
  const ok = await bcrypt.compare(password, user.password)
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' })
  const token = jwt.sign({ id: user.id }, env.jwtSecret, { expiresIn: '1d' })
  return res.json({ id: user.id, name: user.name, email: user.email, token })
}

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body as { email: string }
  const user = await User.findOne({ email })
  if (!user) return res.status(200).json({ message: 'If an account exists, a reset link has been sent' })
  const token = crypto.randomBytes(20).toString('hex')
  user.resetPasswordToken = token
  user.resetPasswordExpires = new Date(Date.now() + 3600 * 1000) // 1 hour
  await user.save()

  // Build reset link and send email
  const clientUrl = Array.isArray(env.frontendOrigin) && env.frontendOrigin.length ? env.frontendOrigin[0] : 'http://localhost:5173'
  const resetLink = `${clientUrl.replace(/\/$/, '')}/reset/${token}`
  try {
    await sendMail({
      to: email,
      subject: 'Password reset',
      html: `<p>Click the link to reset your password:</p><p><a href="${resetLink}">${resetLink}</a></p>`
    })
  } catch (err) {
    // Fallback to logging if mail fails
    console.error('Failed to send reset email', err)
    console.log(`Password reset for ${email}: ${resetLink}`)
  }

  return res.json({ message: 'If an account exists, a reset link has been sent' })
}

export const resetPassword = async (req: Request, res: Response) => {
  const { token, password } = req.body as { token: string; password: string }
  const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: new Date() } })
  if (!user) return res.status(400).json({ message: 'Invalid or expired token' })
  const hash = await bcrypt.hash(password, 10)
  user.password = hash
  user.resetPasswordToken = undefined as any
  user.resetPasswordExpires = undefined as any
  await user.save()
  return res.json({ message: 'Password reset successful' })
}
