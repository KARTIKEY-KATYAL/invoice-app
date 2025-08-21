import { Request, Response, NextFunction, RequestHandler } from 'express'

// Wrap async handlers to automatically forward errors to Express error middleware
export function asyncHandler(fn: (req: Request, res: Response, next: NextFunction) => Promise<any>): RequestHandler {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}
