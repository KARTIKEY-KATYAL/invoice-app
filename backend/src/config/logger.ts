import morgan from 'morgan'
import fs from 'fs'
import path from 'path'

const logDir = path.join(process.cwd(), 'logs')
if(!fs.existsSync(logDir)) fs.mkdirSync(logDir)
const accessLogStream = fs.createWriteStream(path.join(logDir, 'access.log'), { flags: 'a' })

export const httpLogger = morgan(':remote-addr :method :url :status :res[content-length] - :response-time ms', { stream: accessLogStream })
export const httpLoggerDev = morgan('dev')
