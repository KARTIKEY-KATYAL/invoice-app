import { Router } from 'express'
import { body, validationResult } from 'express-validator'
import { register, login } from '../controllers/authController'
import { forgotPassword, resetPassword } from '../controllers/authController'
import { asyncHandler } from '../utils/asyncHandler'

const router = Router()

router.post('/register',
  body('name').isLength({ min: 2 }),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
    return register(req, res)
  })
)

router.post('/login',
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
    return login(req, res)
  })
)

router.post('/forgot',
  body('email').isEmail(),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
    return forgotPassword(req, res)
  })
)

router.post('/reset',
  body('token').isLength({ min: 10 }),
  body('password').isLength({ min: 6 }),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
    return resetPassword(req, res)
  })
)

export default router
