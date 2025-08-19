import { useState } from 'react'
import { addProduct, removeProduct } from '@/store/slices/productSlice'
import { logout } from '@/store/slices/authSlice'
import { AuthLayout, TopLogoutButton } from '@/components/layout/AuthLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, THead, TBody, TRow, THeadCell, TCell } from '@/components/ui/table'
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
      <div className="mb-8 md:mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">Add Products</h1>
        <p className="text-xs md:text-sm text-neutral-400 leading-relaxed max-w-md">This is basic login page which is used for levitation assignment purpose.</p>
      </div>
      <form onSubmit={add} className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl items-end mb-10 md:mb-12">
        <div className="space-y-2">
          <Label requiredMark>Product Name</Label>
          <Input 
            value={form.name} 
            onChange={e=>setForm(f=>({...f,name:e.target.value}))} 
            placeholder="Enter the product name" 
            className="h-11"
          />
        </div>
        <div className="space-y-2">
          <Label requiredMark>Product Price</Label>
          <Input 
            value={form.rate} 
            onChange={e=>setForm(f=>({...f,rate:e.target.value}))} 
            placeholder="Enter the price" 
            className="h-11"
          />
        </div>
        <div className="space-y-2">
          <Label requiredMark>Quantity</Label>
          <Input 
            value={form.qty} 
            onChange={e=>setForm(f=>({...f,qty:e.target.value}))} 
            placeholder="Enter the Qty" 
            className="h-11"
          />
        </div>
        <div className="flex items-center gap-3">
          <Button type="submit" className="bg-neutral-800 hover:bg-neutral-700 text-lime-300 rounded-lg h-11 px-6 font-medium transition-all hover:shadow-lg">Add Product +</Button>
        </div>
      </form>
  <div className="w-full max-w-6xl overflow-x-auto rounded-md -mx-4 px-4 md:mx-0 md:px-0">
        <Table className="text-sm border border-white/10 rounded-xl overflow-hidden">
          <THead>
            <TRow className="bg-white text-neutral-900 text-xs font-medium">
              <THeadCell className="px-4 py-3 text-left">Product name</THeadCell>
              <THeadCell className="px-4 py-3 text-center">Price</THeadCell>
              <THeadCell className="px-4 py-3 text-center">Quantity</THeadCell>
              <THeadCell className="px-4 py-3 text-center">Total Price</THeadCell>
              <THeadCell className="px-4 py-3 text-center">Actions</THeadCell>
            </TRow>
          </THead>
          <TBody className="bg-neutral-950/50 text-neutral-200">
            {items.map((p: ProductInput) => (
              <TRow key={p.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <TCell className="px-4 py-4 italic">( {p.name} )</TCell>
                <TCell className="px-4 py-4 text-center">₹{p.rate}</TCell>
                <TCell className="px-4 py-4 text-center">{p.qty}</TCell>
                <TCell className="px-4 py-4 text-center font-medium">₹{p.rate * p.qty}</TCell>
                <TCell className="px-4 py-4 text-center">
                  <button 
                    onClick={()=>dispatch(removeProduct(p.id))} 
                    className="text-red-400 text-xs hover:text-red-300 hover:bg-red-400/10 px-2 py-1 rounded transition-colors"
                  >
                    remove
                  </button>
                </TCell>
              </TRow>
            ))}
            <TRow className="font-medium border-t-2 border-white/20">
              <TCell colSpan={3} className="px-4 py-4 text-right text-neutral-400">Sub-Total</TCell>
              <TCell className="px-4 py-4 text-center">₹{subTotal.toFixed(2)}</TCell>
              <TCell className="px-4 py-4" />
            </TRow>
            <TRow className="font-medium">
              <TCell colSpan={3} className="px-4 py-4 text-right text-neutral-400">Incl + GST 18%</TCell>
              <TCell className="px-4 py-4 text-center text-lime-300 font-semibold">₹{total.toFixed(2)}</TCell>
              <TCell className="px-4 py-4" />
            </TRow>
          </TBody>
        </Table>
      </div>
      <div className="mt-10">
        <Button asChild className="bg-neutral-800 hover:bg-neutral-700 text-lime-300 rounded-lg h-11 px-8 font-medium transition-all hover:shadow-lg">
          <Link to="/invoice">Generate PDF Invoice</Link>
        </Button>
      </div>
    </AuthLayout>
  )
}

export default ProductsPage
