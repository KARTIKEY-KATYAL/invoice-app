import nodemailer, { Transporter } from 'nodemailer'
import { mail as mailConfig } from '../config/env'

// Ports commonly allowed by Mailtrap / SMTP relays when 25 is blocked
const FALLBACK_PORTS = [2525, 587, 465]

let cachedTransporter: Transporter | null = null

async function tryCreateTransport(port: number) {
  const secure = port === 465
  const transporter = nodemailer.createTransport({
    host: mailConfig.host,
    port,
    secure,
    auth: {
      user: mailConfig.user,
      pass: mailConfig.pass
    },
    connectionTimeout: 10000,
    greetingTimeout: 5000,
    socketTimeout: 10000,
    tls: {
      // In sandbox environments this helps avoid some TLS name checks
      rejectUnauthorized: false
    }
  })

  // Verify the transporter can connect (throws on failure)
  await transporter.verify()
  return transporter
}

async function getTransporter() {
  if (cachedTransporter) return cachedTransporter

  const portsToTry = [mailConfig.port, ...FALLBACK_PORTS].filter((v, i, a) => v && a.indexOf(v) === i) as number[]

  let lastErr: any = null
  for (const p of portsToTry) {
    try {
      const t = await tryCreateTransport(p)
      cachedTransporter = t
      return t
    } catch (err) {
      lastErr = err
      // continue to next port
    }
  }

  // If none succeeded, throw the last error
  throw lastErr
}

export async function sendMail(options: { to: string; subject: string; html?: string; text?: string; from?: string }) {
  const { to, subject, html, text, from } = options
  const msg = {
    from: from || `no-reply@example.com`,
    to,
    subject,
    text,
    html
  }

  // Try obtaining a working transporter and send with a small retry loop
  let lastErr: any = null
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const transporter = await getTransporter()
      const info = await transporter.sendMail(msg)
      return info
    } catch (err) {
      lastErr = err
      // If it's a connection issue, clear cached transporter to force trying different ports next time
      const e: any = err
      if (e && (e.code === 'ESOCKET' || e.code === 'ETIMEDOUT' || e.code === 'ECONNECTION')) {
        cachedTransporter = null
      }
      // small backoff
      await new Promise((r) => setTimeout(r, 500 * (attempt + 1)))
    }
  }

  throw lastErr
}
