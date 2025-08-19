import { useState } from 'react'
import { z } from 'zod'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RightImage } from '@/components/layout/RightImage'
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
    <AuthLayout reverse action={<Button asChild className="bg-lime-300 text-black hover:bg-lime-300/90 h-9 px-6 text-sm font-medium rounded-lg transition-all hover:shadow-lg"><Link to="/login">Login</Link></Button>} right={<RightImage type="register" /> }>
      <div className="mb-8 sm:mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">Sign up to begin journey</h1>
        <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-md">This is basic signup page which is used for levitation assignment purpose.</p>
      </div>
      <form onSubmit={submit} className="space-y-5 sm:space-y-6 max-w-xl">
        <div className="space-y-2">
          <Label requiredMark>Enter your name</Label>
          <Input 
            value={form.name} 
            onChange={e=>setForm(f=>({...f,name:e.target.value}))} 
            placeholder="Enter Full Name" 
            className="h-11"
          />
          <p className="text-[10px] sm:text-[11px] text-neutral-500">This name will be displayed with your inquiry</p>
        </div>
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
          <Label requiredMark>Password</Label>
          <Input 
            type="password" 
            value={form.password} 
            onChange={e=>setForm(f=>({...f,password:e.target.value}))} 
            placeholder="Enter the Password" 
            className="h-11"
          />
          <p className="text-[10px] sm:text-[11px] text-neutral-500">Any further updates will be forwarded on this Email ID</p>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4">
          <Button className="bg-neutral-800 hover:bg-neutral-700 text-lime-300 rounded-lg h-11 px-8 font-medium transition-all hover:shadow-lg w-full sm:w-auto">Register</Button>
          <span className="text-[10px] sm:text-xs text-neutral-400 text-center sm:text-left">Already have account ? <Link to="/login" className="text-lime-300 hover:text-lime-200 font-medium transition-colors">Login here</Link></span>
        </div>
      </form>
    </AuthLayout>
  )
}

export default RegisterPage
