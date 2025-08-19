import { useAppSelector } from '@/store/hooks'
import type { RootState } from '@/store'
import type { ProductInput } from '@/store/slices/productSlice'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export const InvoicePage: React.FC = () => {
  const { items } = useAppSelector((s: RootState) => s.products as any)
  const { user } = useAppSelector((s: RootState) => s.auth as any)
  const subTotal = items.reduce((s:number,p:ProductInput)=> s + p.rate * p.qty, 0)
  const gst = subTotal * 0.18
  const total = subTotal + gst

  const downloadInvoice = async () => {
    // TODO: call backend /api/invoice generate endpoint returning PDF blob
    alert('Backend integration pending. This will download PDF.')
  }

  return (
    <AuthLayout action={<Button asChild className="bg-lime-300 text-black hover:bg-lime-300/90 h-8 px-6 text-xs font-medium rounded-sm"><Link to="/products">Back</Link></Button>}>
      <h1 className="text-4xl font-bold mb-6">Main Sample output - invoice</h1>
      <div className="max-w-3xl text-neutral-300 space-y-6">
        <p className="text-neutral-400 leading-relaxed max-w-md">Sample Output : How Invoice format should look.</p>
        <h2 className="text-lime-300 font-medium">Frontend Design pixel perfect</h2>
        <h3 className="text-sky-400 font-medium">pdf and image format</h3>
        <div className="bg-white rounded-md text-neutral-900 p-10 shadow relative">
          <div className="flex justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black text-white rounded flex items-center justify-center font-bold">⟪⟫</div>
              <div className="text-sm"><div className="font-semibold">Levitation</div><div className="text-[10px] text-neutral-500 -mt-0.5">infotech</div></div>
            </div>
            <div className="text-right">
              <div className="text-xs tracking-wide font-semibold">INVOICE GENERATOR</div>
              <div className="text-[10px] text-neutral-500">Sample Output should be this</div>
            </div>
          </div>
          <div className="rounded-md bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 text-white p-5 mb-6 flex justify-between">
            <div>
              <div className="text-xs uppercase tracking-wide mb-1">Name</div>
              <div className="font-semibold">{user?.name ?? 'Person_name'}</div>
            </div>
            <div className="text-right text-xs">
              <div className="mb-1">Date : {new Date().toLocaleDateString()}</div>
              <div className="bg-white text-neutral-900 rounded px-2 py-1 text-[11px]">{user?.email ?? 'example@email.com'}</div>
            </div>
          </div>
          <table className="w-full text-xs mb-8 border-separate border-spacing-y-1">
            <thead>
              <tr className="bg-lime-900 text-white">
                <th className="text-left px-3 py-2 rounded-l-md">Product</th>
                <th className="text-left px-3 py-2">Qty</th>
                <th className="text-left px-3 py-2">Rate</th>
                <th className="text-left px-3 py-2 rounded-r-md">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((p: ProductInput) => (
                <tr key={p.id} className="bg-neutral-100">
                  <td className="px-3 py-2 italic">( {p.name} )</td>
                  <td className="px-3 py-2">{p.qty}</td>
                  <td className="px-3 py-2">USD {p.rate}</td>
                  <td className="px-3 py-2">USD {p.rate * p.qty}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end mb-10">
            <div className="border rounded-md p-4 w-56 text-xs space-y-2">
              <div className="flex justify-between"><span>Total Charges</span><span>${subTotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>GST 18%</span><span>${gst.toFixed(2)}</span></div>
              <div className="pt-2 border-t font-semibold flex justify-between"><span>Total Amount</span><span className="text-blue-600">${total.toFixed(2)}</span></div>
            </div>
          </div>
          <div className="text-[10px] text-neutral-500 mt-10 pt-2 border-t">Date: {new Date().toLocaleDateString()}</div>
          <div className="mt-8 text-[10px] bg-neutral-900 text-white p-3 rounded-full text-center">We are pleased to provide any further information you may require and look forward to assisting with your next order. Rest assured, it will receive our prompt and dedicated attention.</div>
        </div>
        <Button onClick={downloadInvoice} className="bg-neutral-800 hover:bg-neutral-700 text-lime-300 rounded-sm">Download PDF</Button>
      </div>
    </AuthLayout>
  )
}

export default InvoicePage
