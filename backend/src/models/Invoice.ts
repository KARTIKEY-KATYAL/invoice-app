import mongoose, { Schema, Document } from 'mongoose'

export interface IInvoiceItem {
  name: string
  qty: number
  rate: number
  total: number
}
export interface IInvoice extends Document {
  user: mongoose.Types.ObjectId
  items: IInvoiceItem[]
  subTotal: number
  gst: number
  total: number
  createdAt: Date
}

const invoiceItemSchema = new Schema<IInvoiceItem>({
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  rate: { type: Number, required: true },
  total: { type: Number, required: true }
})

const invoiceSchema = new Schema<IInvoice>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: { type: [invoiceItemSchema], required: true },
  subTotal: { type: Number, required: true },
  gst: { type: Number, required: true },
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
})

export const Invoice = mongoose.model<IInvoice>('Invoice', invoiceSchema)
