import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '../models/User'
import { env } from '../config/env'

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
