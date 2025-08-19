import { useAppSelector } from '@/store/hooks'
import type { RootState } from '@/store'
import type { ProductInput } from '@/store/slices/productSlice'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Button } from '@/components/ui/button'
import { Table, TBody, THead, TRow, THeadCell, TCell } from '@/components/ui/table'
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
    <AuthLayout action={<Button asChild className="bg-lime-300 text-black hover:bg-lime-300/90 h-9 px-6 text-sm font-medium rounded-lg transition-all hover:shadow-lg"><Link to="/products">← Back</Link></Button>}>
      <div className="mb-8 sm:mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 leading-tight">Main Sample output - invoice</h1>
        <div className="space-y-3 sm:space-y-4 text-neutral-300">
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-md">Sample Output : How Invoice format should look.</p>
          <h2 className="text-lime-300 font-medium text-base sm:text-lg">Frontend Design pixel perfect</h2>
          <h3 className="text-sky-400 font-medium text-sm sm:text-base">pdf and image format</h3>
        </div>
      </div>
      <div className="max-w-4xl">
        <div className="bg-white rounded-xl text-neutral-900 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-black text-white rounded-lg flex items-center justify-center font-bold text-lg shadow-lg">⟪⟫</div>
              <div className="text-sm">
                <div className="font-semibold text-lg">Levitation</div>
                <div className="text-xs text-neutral-500 -mt-1">infotech</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm tracking-wide font-semibold text-neutral-800">INVOICE GENERATOR</div>
              <div className="text-xs text-neutral-500 mt-1">Sample Output should be this</div>
            </div>
          </div>

          {/* User Info Section */}
          <div className="rounded-xl bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 text-white p-6 mb-8 flex justify-between items-center">
            <div>
              <div className="text-xs uppercase tracking-wide mb-2 text-neutral-300">Name</div>
              <div className="font-semibold text-lg">{user?.name ?? 'Person_name'}</div>
            </div>
            <div className="text-right text-sm">
              <div className="mb-3 text-neutral-300">Date : {new Date().toLocaleDateString()}</div>
              <div className="bg-white text-neutral-900 rounded-lg px-3 py-2 text-xs font-medium">{user?.email ?? 'example@email.com'}</div>
            </div>
          </div>

          {/* Products Table */}
          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          <Table className="w-full min-w-[640px] text-xs sm:text-sm mb-10 border-separate border-spacing-y-2">
            <THead>
              <TRow className="bg-lime-900 text-white rounded-lg">
                <THeadCell className="rounded-l-lg bg-transparent px-4 py-3 font-semibold">Product</THeadCell>
                <THeadCell className="bg-transparent px-4 py-3 font-semibold text-center">Qty</THeadCell>
                <THeadCell className="bg-transparent px-4 py-3 font-semibold text-center">Rate</THeadCell>
                <THeadCell className="rounded-r-lg bg-transparent px-4 py-3 font-semibold text-center">Total Amount</THeadCell>
              </TRow>
            </THead>
            <TBody>
              {items.map((p: ProductInput) => (
                <TRow key={p.id} className="bg-neutral-50 hover:bg-neutral-100 transition-colors">
                  <TCell className="px-4 py-3 italic rounded-l-lg">( {p.name} )</TCell>
                  <TCell className="px-4 py-3 text-center">{p.qty}</TCell>
                  <TCell className="px-4 py-3 text-center">₹{p.rate}</TCell>
                  <TCell className="px-4 py-3 text-center font-medium rounded-r-lg">₹{p.rate * p.qty}</TCell>
                </TRow>
              ))}
            </TBody>
          </Table>
          </div>

          {/* Total Section */}
          <div className="flex justify-end mb-8 sm:mb-10">
            <div className="border border-neutral-200 rounded-xl p-5 sm:p-6 w-64 sm:w-80 text-xs sm:text-sm space-y-3 bg-neutral-50">
              <div className="flex justify-between"><span className="text-neutral-600">Total Charges</span><span className="font-medium">₹{subTotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-neutral-600">GST 18%</span><span className="font-medium">₹{gst.toFixed(2)}</span></div>
              <div className="pt-3 border-t border-neutral-300 font-semibold flex justify-between text-lg">
                <span>Total Amount</span>
                <span className="text-blue-600">₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-xs text-neutral-500 mb-6 pt-4 border-t border-neutral-200">
            Date: {new Date().toLocaleDateString()}
          </div>
          <div className="text-xs bg-neutral-900 text-white p-4 rounded-xl text-center leading-relaxed">
            We are pleased to provide any further information you may require and look forward to assisting with your next order. Rest assured, it will receive our prompt and dedicated attention.
          </div>
        </div>
        
        <div className="mt-6 sm:mt-8">
          <Button onClick={downloadInvoice} className="bg-neutral-800 hover:bg-neutral-700 text-lime-300 rounded-lg h-11 px-8 font-medium transition-all hover:shadow-lg w-full sm:w-auto">
            Download PDF
          </Button>
        </div>
      </div>
    </AuthLayout>
  )
}

export default InvoicePage
