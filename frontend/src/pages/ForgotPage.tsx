import React, { useState } from 'react'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { RightImage } from '@/components/layout/RightImage'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'
import { Link } from 'react-router-dom'

const ForgotPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle'|'loading'|'sent'|'error'>('idle')
  const [message, setMessage] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res: any = await api.forgot({ email })
      setStatus('sent')
      setMessage(res.message || 'If an account exists, a reset link has been sent')
    } catch (err: any) {
      setStatus('error')
      setMessage(err.message || 'Failed')
    }
  }

  return (
    <AuthLayout right={<RightImage type="login" />}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Forgot password</h2>
        <p className="text-sm text-neutral-400">Enter your account email and we'll send a reset link if it exists.</p>
      </div>
      <form onSubmit={submit} className="space-y-4 max-w-md">
        <div>
          <Label requiredMark>Email</Label>
          <Input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@domain.com" />
        </div>
        {message && <div className="text-sm text-neutral-300 bg-white/5 p-3 rounded">{message}</div>}
        <div className="flex gap-3">
          <Button disabled={status==='loading'} className="bg-lime-300 text-black">{status==='loading' ? 'Sending...' : 'Send reset link'}</Button>
          <Link to="/login" className="text-sm text-neutral-400 self-center">Back to login</Link>
        </div>
      </form>
    </AuthLayout>
  )
}

export default ForgotPage
