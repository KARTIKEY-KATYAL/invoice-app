import { useState } from 'react'
import { z } from 'zod'
import { loginStart, loginSuccess, loginFailure } from '@/store/slices/authSlice'
import type { RootState } from '@/store'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Button } from '@/components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store/hooks'

const schema = z.object({ email: z.string().email(), password: z.string().min(6) })

export const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { status, error } = useAppSelector((s: RootState) => s.auth)
  const [form, setForm] = useState({ email: '', password: '' })

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const parsed = schema.safeParse(form)
    if(!parsed.success) { alert(parsed.error.issues[0].message); return }
    try {
      dispatch(loginStart())
      // TODO: replace with real API
      await new Promise(r=>setTimeout(r,400))
      dispatch(loginSuccess({ id: '1', name: 'User', email: form.email, token: 'demo-token'}))
      navigate('/products')
    } catch (err: any) {
      dispatch(loginFailure('Login failed'))
    }
  }

  return (
    <AuthLayout action={<div className="border border-lime-300/60 text-lime-300 rounded-sm text-[11px] px-3 py-1">Connecting People With Technology</div>} right={<div className="w-full max-w-md aspect-[4/3] rounded-md bg-[url('https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&w=800&q=60')] bg-cover" /> }>
      <div className="flex items-center gap-4 mb-8">
        <span className="bg-white text-black w-12 h-12 rounded-md inline-flex items-center justify-center font-bold">⟪⟫</span>
        <div>
          <h1 className="text-3xl font-bold">Let the Journey Begin!</h1>
          <p className="text-sm text-neutral-400 mt-2 max-w-sm">This is basic login page which is used for levitation assignment purpose.</p>
        </div>
      </div>
      <form onSubmit={submit} className="space-y-6 max-w-lg">
        <div>
          <label className="block text-sm mb-1 font-medium">Email Address</label>
          <input value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} placeholder="Enter Email ID" className="w-full bg-neutral-900 border border-neutral-700 rounded-sm h-12 px-3 text-sm" />
          <p className="text-[11px] text-neutral-500 mt-1">This email will be displayed with your inquiry</p>
        </div>
        <div>
          <label className="block text-sm mb-1 font-medium">Current Password</label>
          <input type="password" value={form.password} onChange={e=>setForm(f=>({...f,password:e.target.value}))} placeholder="Enter the Password" className="w-full bg-neutral-900 border border-neutral-700 rounded-sm h-12 px-3 text-sm" />
        </div>
        {error && <div className="text-red-400 text-sm">{error}</div>}
        <div className="flex items-center gap-6">
          <Button disabled={status==='loading'} className="bg-neutral-800 hover:bg-neutral-700 text-lime-300 rounded-sm">Login now</Button>
          <Link to="/forgot" className="text-sm text-neutral-400">Forget password ?</Link>
        </div>
        <p className="text-xs text-neutral-500">Don't have account? <Link to="/register" className="text-lime-300">Register</Link></p>
      </form>
    </AuthLayout>
  )
}

export default LoginPage
