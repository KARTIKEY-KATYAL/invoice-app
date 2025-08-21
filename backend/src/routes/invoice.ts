import { Router } from 'express'
import { body } from 'express-validator'
import { auth } from '../middleware/auth'
import { asyncHandler } from '../utils/asyncHandler'
import { generateInvoice, listInvoices } from '../controllers/invoiceController'

const router = Router()

router.post('/generate', auth,
  body('items').isArray({ min: 1 }),
  body('items.*.name').isString().notEmpty(),
  body('items.*.qty').isInt({ gt: 0 }),
  body('items.*.rate').isFloat({ gt: 0 }),
  asyncHandler(generateInvoice)
)

router.get('/', auth, asyncHandler(listInvoices))

export default router
