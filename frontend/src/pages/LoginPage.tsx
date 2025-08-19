import { useState } from 'react'
import { z } from 'zod'
import { loginStart, loginSuccess, loginFailure } from '@/store/slices/authSlice'
import type { RootState } from '@/store'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RightImage } from '@/components/layout/RightImage'
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
    <AuthLayout reverse action={<div className="hidden sm:block border border-lime-300/60 text-lime-300 rounded-sm text-[11px] px-3 py-1 hover:bg-lime-300/5 transition-colors">Connecting People With Technology</div>} right={<RightImage type="login" /> }>
      <div className="flex items-start gap-4 mb-8 sm:mb-10">
        <span className="bg-white text-black w-12 h-12 rounded-lg inline-flex items-center justify-center font-bold text-lg shadow-lg flex-shrink-0">⟪⟫</span>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold leading-tight mb-3">Let the Journey Begin!</h1>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-md">This is basic login page which is used for levitation assignment purpose.</p>
        </div>
      </div>
      <form onSubmit={submit} className="space-y-5 sm:space-y-6 max-w-lg">
        <div className="space-y-2">
          <Label requiredMark>Email Address</Label>
          <Input 
            value={form.email} 
            onChange={e=>setForm(f=>({...f,email:e.target.value}))} 
            placeholder="Enter Email ID" 
            className="h-11"
          />
          <p className="text-[10px] sm:text-[11px] text-neutral-500">This email will be displayed with your inquiry</p>
        </div>
        <div className="space-y-2">
          <Label requiredMark>Current Password</Label>
          <Input 
            type="password" 
            value={form.password} 
            onChange={e=>setForm(f=>({...f,password:e.target.value}))} 
            placeholder="Enter the Password" 
            className="h-11"
          />
        </div>
        {error && <div className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">{error}</div>}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
          <Button disabled={status==='loading'} className="bg-neutral-800 hover:bg-neutral-700 text-lime-300 rounded-lg h-11 px-8 font-medium transition-all hover:shadow-lg w-full sm:w-auto">
            {status === 'loading' ? 'Signing in...' : 'Login now'}
          </Button>
          <Link to="/forgot" className="text-xs sm:text-sm text-neutral-400 hover:text-lime-300 transition-colors text-center sm:text-left">Forget password ?</Link>
        </div>
        <div className="pt-4 border-t border-white/10">
          <p className="text-[10px] sm:text-xs text-neutral-500 text-center">Don't have account? <Link to="/register" className="text-lime-300 hover:text-lime-200 font-medium transition-colors">Register here</Link></p>
        </div>
      </form>
    </AuthLayout>
  )
}

export default LoginPage
