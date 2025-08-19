import { useState } from 'react'
import { addProduct, removeProduct } from '@/store/slices/productSlice'
import { logout } from '@/store/slices/authSlice'
import { AuthLayout, TopLogoutButton } from '@/components/layout/AuthLayout'
import { Button } from '@/components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import type { RootState } from '@/store'
import type { ProductInput } from '@/store/slices/productSlice'

export const ProductsPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const items = useAppSelector((s: RootState) => s.products.items)
  const [form, setForm] = useState({ name: '', rate: '', qty: '' })

  const add = (e: React.FormEvent) => {
    e.preventDefault()
    const rate = parseFloat(form.rate); const qty = parseInt(form.qty)
    if(!form.name || isNaN(rate) || isNaN(qty)) return
    dispatch(addProduct({ name: form.name, rate, qty }))
    setForm({ name: '', rate: '', qty: '' })
  }

  const subTotal = items.reduce((s:number,p:ProductInput)=> s + p.rate * p.qty, 0)
  const gst = subTotal * 0.18
  const total = subTotal + gst

  return (
    <AuthLayout action={<TopLogoutButton onClick={()=>{dispatch(logout()); navigate('/login')}} />}>      
      <h1 className="text-4xl font-bold mb-2">Add Products</h1>
      <p className="text-sm text-neutral-400 mb-10 max-w-md">This is basic login page which is used for levitation assignment purpose.</p>
      <form onSubmit={add} className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl items-end mb-10">
        <div>
          <label className="block text-sm mb-1 font-medium">Product Name</label>
          <input value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="Enter the product name" className="w-full bg-neutral-900 border border-neutral-700 rounded-sm h-12 px-3 text-sm" />
        </div>
        <div>
          <label className="block text-sm mb-1 font-medium">Product Price</label>
          <input value={form.rate} onChange={e=>setForm(f=>({...f,rate:e.target.value}))} placeholder="Enter the price" className="w-full bg-neutral-900 border border-neutral-700 rounded-sm h-12 px-3 text-sm" />
        </div>
        <div>
          <label className="block text-sm mb-1 font-medium">Quantity</label>
          <input value={form.qty} onChange={e=>setForm(f=>({...f,qty:e.target.value}))} placeholder="Enter the Qty" className="w-full bg-neutral-900 border border-neutral-700 rounded-sm h-12 px-3 text-sm" />
        </div>
        <div className="flex items-center gap-3 h-12">
          <Button type="submit" className="bg-neutral-800 hover:bg-neutral-700 text-lime-300 rounded-sm h-12">Add Product +</Button>
        </div>
      </form>
      <div className="w-full max-w-5xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-white text-neutral-900 text-xs">
            <tr>
              <th className="text-left font-medium px-4 py-3">Product name</th>
              <th className="text-left font-medium px-4 py-3">Price</th>
              <th className="text-left font-medium px-4 py-3">Quantity</th>
              <th className="text-left font-medium px-4 py-3">Total Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="bg-neutral-950 text-neutral-200 divide-y divide-white/5">
            {items.map((p: ProductInput) => (
              <tr key={p.id} className="">
                <td className="px-4 py-3 italic">( {p.name} )</td>
                <td className="px-4 py-3">{p.rate}</td>
                <td className="px-4 py-3">{p.qty}</td>
                <td className="px-4 py-3">INR {p.rate * p.qty}</td>
                <td className="px-4 py-3 text-right"><button onClick={()=>dispatch(removeProduct(p.id))} className="text-red-400 text-xs">remove</button></td>
              </tr>
            ))}
            <tr className="font-medium">
              <td colSpan={3} className="px-4 py-3 text-right">Sub-Total</td>
              <td className="px-4 py-3">INR {subTotal.toFixed(2)}</td>
              <td></td>
            </tr>
            <tr className="font-medium">
              <td colSpan={3} className="px-4 py-3 text-right">Incl + GST 18%</td>
              <td className="px-4 py-3">INR {total.toFixed(2)}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-10">
        <Button asChild className="bg-neutral-800 hover:bg-neutral-700 text-lime-300 rounded-sm">
          <Link to="/invoice">Generate PDF Invoice</Link>
        </Button>
      </div>
    </AuthLayout>
  )
}

export default ProductsPage
