import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { RightImage } from '@/components/layout/RightImage'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'

const ResetPage: React.FC = () => {
  const { token } = useParams<{ token: string }>()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [status, setStatus] = useState<'idle'|'loading'|'done'|'error'>('idle')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password.length < 6) { setMessage('Password must be at least 6 characters'); return }
    if (password !== confirm) { setMessage('Passwords do not match'); return }
    setStatus('loading')
    try {
      await api.reset({ token: token || '', password })
      setStatus('done')
      setMessage('Password reset, you can login now')
      setTimeout(()=>navigate('/login'), 1200)
    } catch (err: any) {
      setStatus('error')
      setMessage(err.message || 'Failed')
    }
  }

  return (
    <AuthLayout right={<RightImage type="login" />}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Reset password</h2>
        <p className="text-sm text-neutral-400">Enter a new password for your account.</p>
      </div>
      <form onSubmit={submit} className="space-y-4 max-w-md">
        <div>
          <Label requiredMark>New Password</Label>
          <Input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="New password" />
        </div>
        <div>
          <Label requiredMark>Confirm Password</Label>
          <Input type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} placeholder="Confirm password" />
        </div>
        {message && <div className="text-sm text-neutral-300 bg-white/5 p-3 rounded">{message}</div>}
        <div className="flex gap-3">
          <Button disabled={status==='loading'} className="bg-lime-300 text-black">{status==='loading' ? 'Resetting...' : 'Reset password'}</Button>
          <Link to="/login" className="text-sm text-neutral-400 self-center">Back to login</Link>
        </div>
      </form>
    </AuthLayout>
  )
}

export default ResetPage
