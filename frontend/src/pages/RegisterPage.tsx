import { useState } from 'react'
import { z } from 'zod'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Button } from '@/components/ui/button'
import { Link, useNavigate } from 'react-router-dom'

const schema = z.object({ name: z.string().min(2), email: z.string().email(), password: z.string().min(6) })

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const parsed = schema.safeParse(form)
    if(!parsed.success) { alert(parsed.error.issues[0].message); return }
    // TODO call registration API
    await new Promise(r=>setTimeout(r,500))
    navigate('/login')
  }

  return (
    <AuthLayout action={<Button asChild className="bg-lime-300 text-black hover:bg-lime-300/90 h-8 px-6 text-xs font-medium rounded-sm"><Link to="/login">Login</Link></Button>} right={<div className="w-full max-w-md aspect-[4/3] rounded-md bg-[url('https://images.unsplash.com/photo-1523824921871-d6f1a15151f1?auto=format&fit=crop&w=800&q=60')] bg-cover" /> }>
      <div className="mb-10">
        <h1 className="text-4xl font-bold">Sign up to begin journey</h1>
        <p className="text-sm text-neutral-400 mt-4 max-w-sm">This is basic signup page which is used for levitation assignment purpose.</p>
      </div>
      <form onSubmit={submit} className="space-y-6 max-w-xl">
        <div>
          <label className="block text-sm mb-1 font-medium">Enter your name</label>
          <input value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="Enter Full Name" className="w-full bg-neutral-900 border border-neutral-700 rounded-sm h-12 px-3 text-sm" />
          <p className="text-[11px] text-neutral-500 mt-1">This name will be displayed with your inquiry</p>
        </div>
        <div>
          <label className="block text-sm mb-1 font-medium">Email Address</label>
          <input value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} placeholder="Enter Email ID" className="w-full bg-neutral-900 border border-neutral-700 rounded-sm h-12 px-3 text-sm" />
          <p className="text-[11px] text-neutral-500 mt-1">This email will be displayed with your inquiry</p>
        </div>
        <div>
          <label className="block text-sm mb-1 font-medium">Password</label>
          <input type="password" value={form.password} onChange={e=>setForm(f=>({...f,password:e.target.value}))} placeholder="Enter the Password" className="w-full bg-neutral-900 border border-neutral-700 rounded-sm h-12 px-3 text-sm" />
          <p className="text-[11px] text-neutral-500 mt-1">Any further updates will be forwarded on this Email ID</p>
        </div>
        <div className="flex items-center gap-6">
          <Button className="bg-neutral-800 hover:bg-neutral-700 text-lime-300 rounded-sm">Register</Button>
          <span className="text-xs text-neutral-400">Already have account ? <Link to="/login" className="text-lime-300">Login</Link></span>
        </div>
      </form>
    </AuthLayout>
  )
}

export default RegisterPage
