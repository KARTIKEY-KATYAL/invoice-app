import { useState, useEffect } from 'react'
import { z } from 'zod'
import { loginStart, loginSuccess, loginFailure } from '@/store/slices/authSlice'
import type { RootState } from '@/store'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RightImage } from '@/components/layout/RightImage'
import { BrandLogo } from '@/components/ui/logo'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '@/lib/api'
import { useAppDispatch, useAppSelector } from '@/store/hooks'

const schema = z.object({ 
  email: z.string().email('Please enter a valid email address'), 
  password: z.string().min(6, 'Password must be at least 6 characters') 
})

export const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { status, error, user } = useAppSelector((s: RootState) => s.auth)
  const [form, setForm] = useState({ email: '', password: '' })
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/products')
    }
  }, [user, navigate])

  const validateField = (field: keyof typeof form, value: string) => {
    const fieldSchema = field === 'email' 
      ? z.string().email('Please enter a valid email address')
      : z.string().min(6, 'Password must be at least 6 characters')
    
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

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const parsed = schema.safeParse(form)
    if(!parsed.success) { 
      const fieldErrors: Record<string, string> = {}
      parsed.error.issues.forEach(issue => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as string] = issue.message
        }
      })
      setValidationErrors(fieldErrors)
      return 
    }
    try {
      dispatch(loginStart())
      const data = await api.login(form)
      dispatch(loginSuccess(data))
      navigate('/products')
    } catch (err: any) {
      dispatch(loginFailure(err.message || 'Login failed'))
    }
  }

  return (
    <AuthLayout 
      reverse 
      action={
        <div className="hidden sm:block border border-lime-300/60 text-lime-300 rounded-lg text-[11px] px-4 py-2 hover:bg-lime-300/5 transition-all duration-200 cursor-default">
          Connecting People With Technology
        </div>
      } 
      right={<RightImage type="login" />}
    >
      <div className="flex flex-col items-start gap-4 mb-8 sm:mb-10">
        <BrandLogo size={48} />
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-3 text-white">
            Welcome Back! 👋
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed max-w-md">
            Sign in to your account to continue managing your invoices and products.
          </p>
        </div>
      </div>
      
      <form onSubmit={submit} className="space-y-6 w-full max-w-lg">
        <div className="space-y-2">
          <Label requiredMark className="text-sm font-medium">Email Address</Label>
          <Input 
            type="email"
            value={form.email} 
            onChange={e => {
              const value = e.target.value
              setForm(f => ({...f, email: value}))
              if (value) validateField('email', value)
            }}
            onBlur={e => validateField('email', e.target.value)}
            placeholder="Enter your email address" 
            className={`h-12 text-base transition-all duration-200 ${
              validationErrors.email ? 'border-red-400 focus:border-red-400' : 'focus:border-lime-300'
            }`}
            autoComplete="email"
            disabled={status === 'loading'}
          />
          {validationErrors.email && (
            <p className="text-xs text-red-400 flex items-center gap-1">
              <span>⚠️</span> {validationErrors.email}
            </p>
          )}
          <p className="text-xs text-neutral-500">
            We'll never share your email with anyone else
          </p>
        </div>

        <div className="space-y-2">
          <Label requiredMark className="text-sm font-medium">Password</Label>
          <Input 
            type="password" 
            value={form.password} 
            onChange={e => {
              const value = e.target.value
              setForm(f => ({...f, password: value}))
              if (value) validateField('password', value)
            }}
            onBlur={e => validateField('password', e.target.value)}
            placeholder="Enter your password" 
            className={`h-12 text-base transition-all duration-200 ${
              validationErrors.password ? 'border-red-400 focus:border-red-400' : 'focus:border-lime-300'
            }`}
            autoComplete="current-password"
            disabled={status === 'loading'}
          />
          {validationErrors.password && (
            <p className="text-xs text-red-400 flex items-center gap-1">
              <span>⚠️</span> {validationErrors.password}
            </p>
          )}
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 flex items-center gap-2">
            <span className="text-red-400">❌</span>
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
          <Button 
            type="submit"
            disabled={status === 'loading' || Object.keys(validationErrors).length > 0} 
            className="bg-lime-500 hover:bg-lime-600 text-black font-semibold rounded-lg h-12 px-8 transition-all duration-200 hover:shadow-lg hover:shadow-lime-500/25 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">⏳</span> Signing in...
              </span>
            ) : (
              'Sign In'
            )}
          </Button>
          <Link 
            to="/forgot" 
            className="text-sm text-neutral-400 hover:text-lime-300 transition-colors text-center sm:text-left underline underline-offset-4 hover:underline-offset-2"
          >
            Forgot password?
          </Link>
        </div>

        <div className="pt-6 border-t border-white/10">
          <p className="text-sm text-neutral-500 text-center">
            Don't have an account?{' '}
            <Link 
              to="/register" 
              className="text-lime-300 hover:text-lime-200 font-medium transition-colors underline underline-offset-4 hover:underline-offset-2"
            >
              Create one here
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  )
}

export default LoginPage
