import { useState } from 'react'
import { z } from 'zod'
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

const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  rate: z.string().min(1, 'Price is required').refine(val => !isNaN(parseFloat(val)) && parseFloat(val) > 0, 'Price must be a positive number'),
  qty: z.string().min(1, 'Quantity is required').refine(val => !isNaN(parseInt(val)) && parseInt(val) > 0, 'Quantity must be a positive number')
})

export const ProductsPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const items = useAppSelector((s: RootState) => s.products.items)
  const user = useAppSelector((s: RootState) => s.auth.user)
  const [form, setForm] = useState({ name: '', rate: '', qty: '' })
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateField = (field: keyof typeof form, value: string) => {
    const fieldSchema = field === 'name' 
      ? z.string().min(1, 'Product name is required')
      : field === 'rate'
      ? z.string().min(1, 'Price is required').refine(val => !isNaN(parseFloat(val)) && parseFloat(val) > 0, 'Price must be a positive number')
      : z.string().min(1, 'Quantity is required').refine(val => !isNaN(parseInt(val)) && parseInt(val) > 0, 'Quantity must be a positive number')
    
    const result = fieldSchema.safeParse(value)
    if (!result.success) {
      setValidationErrors(prev => ({ ...prev, [field]: result.error.issues[0].message }))
    } else {
      setValidationErrors(prev => {
        const { [field]: _, ...rest } = prev
        return rest
      })
    }
  }

  const add = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const parsed = productSchema.safeParse(form)
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {}
      parsed.error.issues.forEach(issue => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as string] = issue.message
        }
      })
      setValidationErrors(fieldErrors)
      setIsSubmitting(false)
      return
    }

    const rate = parseFloat(form.rate)
    const qty = parseInt(form.qty)
    
    dispatch(addProduct({ name: form.name, rate, qty }))
    setForm({ name: '', rate: '', qty: '' })
    setValidationErrors({})
    setIsSubmitting(false)
  }

  const handleRemoveProduct = (id: string) => {
    if (window.confirm('Are you sure you want to remove this product?')) {
      dispatch(removeProduct(id))
    }
  }

  const subTotal = items.reduce((s: number, p: ProductInput) => s + p.rate * p.qty, 0)
  const gst = subTotal * 0.18
  const total = subTotal + gst

  return (
    <AuthLayout 
      action={
        <TopLogoutButton 
          onClick={() => {
            if (window.confirm('Are you sure you want to logout?')) {
              dispatch(logout())
              navigate('/login')
            }
          }} 
        />
      }
    >      
      <div className="mb-8 md:mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 leading-tight text-white">
              Product Management 📦
            </h1>
            <p className="text-sm md:text-base text-neutral-400 leading-relaxed">
              Add products to generate professional invoices. Welcome back, {user?.name}!
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-neutral-500">Total Products</p>
            <p className="text-2xl font-bold text-lime-300">{items.length}</p>
          </div>
        </div>
      </div>

      {/* Add Product Form */}
      <div className="bg-neutral-900/50 border border-white/10 rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6 text-white flex items-center gap-2">
          <span>➕</span> Add New Product
        </h2>
        <form onSubmit={add} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
          <div className="space-y-2">
            <Label requiredMark className="text-sm font-medium">Product Name</Label>
            <Input 
              value={form.name} 
              onChange={e => {
                const value = e.target.value
                setForm(f => ({...f, name: value}))
                if (value) validateField('name', value)
              }}
              onBlur={e => validateField('name', e.target.value)}
              placeholder="Enter product name" 
              className={`h-12 text-base transition-all duration-200 ${
                validationErrors.name ? 'border-red-400 focus:border-red-400' : 'focus:border-lime-300'
              }`}
              disabled={isSubmitting}
            />
            {validationErrors.name && (
              <p className="text-xs text-red-400 flex items-center gap-1">
                <span>⚠️</span> {validationErrors.name}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label requiredMark className="text-sm font-medium">Price (₹)</Label>
            <Input 
              type="number"
              step="0.01"
              min="0"
              value={form.rate} 
              onChange={e => {
                const value = e.target.value
                setForm(f => ({...f, rate: value}))
                if (value) validateField('rate', value)
              }}
              onBlur={e => validateField('rate', e.target.value)}
              placeholder="0.00" 
              className={`h-12 text-base transition-all duration-200 ${
                validationErrors.rate ? 'border-red-400 focus:border-red-400' : 'focus:border-lime-300'
              }`}
              disabled={isSubmitting}
            />
            {validationErrors.rate && (
              <p className="text-xs text-red-400 flex items-center gap-1">
                <span>⚠️</span> {validationErrors.rate}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label requiredMark className="text-sm font-medium">Quantity</Label>
            <Input 
              type="number"
              min="1"
              value={form.qty} 
              onChange={e => {
                const value = e.target.value
                setForm(f => ({...f, qty: value}))
                if (value) validateField('qty', value)
              }}
              onBlur={e => validateField('qty', e.target.value)}
              placeholder="1" 
              className={`h-12 text-base transition-all duration-200 ${
                validationErrors.qty ? 'border-red-400 focus:border-red-400' : 'focus:border-lime-300'
              }`}
              disabled={isSubmitting}
            />
            {validationErrors.qty && (
              <p className="text-xs text-red-400 flex items-center gap-1">
                <span>⚠️</span> {validationErrors.qty}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Button 
              type="submit" 
              disabled={isSubmitting || Object.keys(validationErrors).length > 0}
              className="bg-lime-500 hover:bg-lime-600 text-black font-semibold rounded-lg h-12 px-6 transition-all duration-200 hover:shadow-lg hover:shadow-lime-500/25 w-full lg:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin">⏳</span> Adding...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <span>➕</span> Add Product
                </span>
              )}
            </Button>
          </div>
        </form>
      </div>

      {/* Products Table */}
      {items.length > 0 ? (
        <div className="bg-neutral-900/50 border border-white/10 rounded-xl overflow-hidden mb-8">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <span>📋</span> Product List
            </h2>
          </div>
          <div className="overflow-x-auto">
            <Table className="text-sm">
              <THead>
                <TRow className="bg-neutral-800 text-white">
                  <THeadCell className="px-6 py-4 text-left font-semibold">Product Name</THeadCell>
                  <THeadCell className="px-6 py-4 text-center font-semibold">Price (₹)</THeadCell>
                  <THeadCell className="px-6 py-4 text-center font-semibold">Quantity</THeadCell>
                  <THeadCell className="px-6 py-4 text-center font-semibold">Total (₹)</THeadCell>
                  <THeadCell className="px-6 py-4 text-center font-semibold">Actions</THeadCell>
                </TRow>
              </THead>
              <TBody className="bg-neutral-950/50">
                {items.map((p: ProductInput) => (
                  <TRow key={p.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <TCell className="px-6 py-4 font-medium text-white">{p.name}</TCell>
                    <TCell className="px-6 py-4 text-center text-neutral-300">₹{p.rate.toFixed(2)}</TCell>
                    <TCell className="px-6 py-4 text-center text-neutral-300">{p.qty}</TCell>
                    <TCell className="px-6 py-4 text-center font-semibold text-lime-300">₹{(p.rate * p.qty).toFixed(2)}</TCell>
                    <TCell className="px-6 py-4 text-center">
                      <button 
                        onClick={() => handleRemoveProduct(p.id)} 
                        className="text-red-400 hover:text-red-300 hover:bg-red-400/10 px-3 py-1 rounded-lg transition-all duration-200 text-sm font-medium"
                      >
                        🗑️ Remove
                      </button>
                    </TCell>
                  </TRow>
                ))}
              </TBody>
            </Table>
          </div>
          
          {/* Summary */}
          <div className="p-6 bg-neutral-800/50 border-t border-white/10">
            <div className="space-y-2 text-right max-w-md ml-auto">
              <div className="flex justify-between items-center text-neutral-400">
                <span>Subtotal:</span>
                <span className="font-medium">₹{subTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-neutral-400">
                <span>GST (18%):</span>
                <span className="font-medium">₹{gst.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold text-lime-300 border-t border-white/10 pt-2">
                <span>Total Amount:</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-neutral-900/50 border border-white/10 rounded-xl p-12 text-center mb-8">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-xl font-semibold text-white mb-2">No Products Added</h3>
          <p className="text-neutral-400">Add your first product using the form above to get started.</p>
        </div>
      )}

      {/* Generate Invoice Button */}
      {items.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
          <Button asChild className="bg-lime-500 hover:bg-lime-600 text-black font-semibold rounded-lg h-12 px-8 transition-all duration-200 hover:shadow-lg hover:shadow-lime-500/25">
            <Link to="/invoice" className="flex items-center gap-2">
              <span>📄</span> Generate PDF Invoice
            </Link>
          </Button>
          <Button 
            onClick={() => {
              if (window.confirm('Are you sure you want to clear all products?')) {
                items.forEach(item => dispatch(removeProduct(item.id)))
              }
            }}
            className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 hover:border-red-500/40 font-semibold rounded-lg h-12 px-8 transition-all duration-200"
          >
            <span className="flex items-center gap-2">
              <span>🗑️</span> Clear All
            </span>
          </Button>
        </div>
      )}
    </AuthLayout>
  )
}

export default ProductsPage
