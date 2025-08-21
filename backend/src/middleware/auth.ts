import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization
  if(!header) return res.status(401).json({ message: 'Missing auth header' })
  const token = header.replace('Bearer ', '')
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { id: string }
    req.userId = decoded.id
    next()
  } catch (e) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}
