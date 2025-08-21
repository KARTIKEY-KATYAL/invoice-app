import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import puppeteer from 'puppeteer'
import { Invoice } from '../models/Invoice'
import { buildInvoiceHTML } from '../utils/pdfTemplate'

export const generateInvoice = async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
  const { items } = req.body as { items: { name: string; qty: number; rate: number }[] }
  const mapped = items.map(i => ({ ...i, total: i.qty * i.rate }))
  const subTotal = mapped.reduce((s, i) => s + i.total, 0)
  const gst = subTotal * 0.18
  const total = subTotal + gst
  const invoice = await Invoice.create({ user: req.userId!, items: mapped, subTotal, gst, total })
  const populated = await Invoice.findById(invoice.id).populate('user')
  const html = buildInvoiceHTML(populated as any)
  // Allow specifying a custom Chrome executable path (useful in CI/Windows where default download might differ)
  const executablePath = process.env.CHROME_PATH || process.env.PUPPETEER_EXECUTABLE_PATH
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox','--disable-setuid-sandbox','--font-render-hinting=none'],
    executablePath: executablePath && executablePath.trim().length > 0 ? executablePath : undefined
  })
  const page = await browser.newPage()
  await page.setContent(html, { waitUntil: 'networkidle0' })
  const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true })
  await browser.close()
  res.setHeader('Content-Type', 'application/pdf')
  res.setHeader('Content-Disposition', 'attachment; filename=invoice.pdf')
  return res.send(pdfBuffer)
}

export const listInvoices = async (req: Request, res: Response) => {
  const invoices = await Invoice.find({ user: req.userId }).sort({ createdAt: -1 }).limit(50)
  return res.json(invoices)
}
