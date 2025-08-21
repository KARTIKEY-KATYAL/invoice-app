import { IInvoice } from '../models/Invoice'
import { IUser } from '../models/User'

export function buildInvoiceHTML(invoice: IInvoice & { populatedUser?: IUser }) {
  const dateStr = new Date(invoice.createdAt).toLocaleDateString()
  const rows = invoice.items.map(i=>`<tr>
      <td style="padding:8px 12px;font-style:italic">( ${i.name} )</td>
      <td style="padding:8px 12px;text-align:center">${i.qty}</td>
      <td style="padding:8px 12px;text-align:center">₹${i.rate}</td>
      <td style="padding:8px 12px;text-align:center;font-weight:600">₹${i.total}</td>
    </tr>`).join('')
  return `<!DOCTYPE html><html><head><meta charset='utf-8'/>
  <title>Invoice</title>
  <style>
    body { font-family: system-ui, Arial, sans-serif; background:#f5f5f5; margin:0; padding:32px; }
    .card { background:#fff; border-radius:16px; padding:48px; max-width:900px; margin:0 auto; position:relative; }
    .gradient { background:linear-gradient(90deg,#0a0a0a,#1f1f1f,#0a0a0a); color:#fff; padding:24px 32px; border-radius:16px; display:flex; justify-content:space-between; align-items:center; }
    table { width:100%; border-collapse:separate; border-spacing:0 8px; font-size:14px; }
    thead tr { background:#365314; color:#fff; }
    thead th { padding:12px; text-align:left; font-weight:600; }
    tbody tr { background:#fafafa; }
    tbody tr td:first-child { border-radius:8px 0 0 8px; }
    tbody tr td:last-child { border-radius:0 8px 8px 0; }
  </style>
  </head><body>
    <div class='card'>
      <div style='display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:40px;'>
        <div style='display:flex;align-items:center;gap:12px;'>
          <div style='width:56px;height:56px;background:#000;color:#fff;border-radius:12px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:20px'>⟪⟫</div>
          <div style='font-size:14px;'>
            <div style='font-weight:600;font-size:18px;'>Levitation</div>
            <div style='color:#666;font-size:11px;margin-top:-2px;'>infotech</div>
          </div>
        </div>
        <div style='text-align:right;'>
          <div style='font-size:13px;font-weight:600;letter-spacing:.5px;'>INVOICE GENERATOR</div>
          <div style='font-size:11px;color:#666;margin-top:4px;'>Sample Output should be this</div>
        </div>
      </div>
      <div class='gradient' style='margin-bottom:40px;'>
        <div>
          <div style='font-size:10px;letter-spacing:1px;color:#ccc;margin-bottom:6px;text-transform:uppercase;'>Name</div>
          <div style='font-size:20px;font-weight:600;'>${(invoice as any).user?.name || 'User'}</div>
        </div>
        <div style='text-align:right;font-size:13px;'>
          <div style='margin-bottom:10px;color:#ddd;'>Date : ${dateStr}</div>
          <div style='background:#fff;color:#000;border-radius:8px;padding:6px 12px;font-size:11px;font-weight:600;'>${(invoice as any).user?.email || ''}</div>
        </div>
      </div>
      <table>
        <thead><tr><th>Product</th><th style='text-align:center'>Qty</th><th style='text-align:center'>Rate</th><th style='text-align:center'>Total Amount</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <div style='display:flex;justify-content:flex-end;margin-top:40px;margin-bottom:40px;'>
        <div style='border:1px solid #e5e5e5;border-radius:16px;padding:24px 28px;width:280px;font-size:14px;'>
          <div style='display:flex;justify-content:space-between;margin-bottom:8px;color:#555;'><span>Total Charges</span><span style='font-weight:600'>₹${invoice.subTotal.toFixed(2)}</span></div>
          <div style='display:flex;justify-content:space-between;margin-bottom:16px;color:#555;'><span>GST 18%</span><span style='font-weight:600'>₹${invoice.gst.toFixed(2)}</span></div>
          <div style='border-top:1px solid #ddd;padding-top:12px;font-size:18px;font-weight:600;display:flex;justify-content:space-between;'>
            <span>Total Amount</span><span style='color:#2563eb;'>₹${invoice.total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <div style='color:#666;font-size:11px;margin-bottom:20px;padding-top:16px;border-top:1px solid #e5e5e5;'>Date: ${dateStr}</div>
      <div style='background:#0a0a0a;color:#fff;font-size:11px;padding:16px 20px;border-radius:12px;text-align:center;line-height:1.5;'>We are pleased to provide any further information you may require and look forward to assisting with your next order. Rest assured, it will receive our prompt and dedicated attention.</div>
    </div>
  </body></html>`
}
