import { useState } from 'react'
import { z } from 'zod'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RightImage } from '@/components/layout/RightImage'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '@/lib/api'

const schema = z.object({ 
  name: z.string().min(2, 'Name must be at least 2 characters'), 
  email: z.string().email('Please enter a valid email address'), 
  password: z.string().min(6, 'Password must be at least 6 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number')
})

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const validateField = (field: keyof typeof form, value: string) => {
    const fieldSchema = field === 'name' 
      ? z.string().min(2, 'Name must be at least 2 characters')
      : field === 'email'
      ? z.string().email('Please enter a valid email address')
      : z.string().min(6, 'Password must be at least 6 characters')
          .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number')
    
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
    setIsSubmitting(true)
    
    const parsed = schema.safeParse(form)
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
    
    try {
      await api.register(form)
      setIsSuccess(true)
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (e: any) {
      setValidationErrors({ general: e.message || 'Registration failed' })
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <AuthLayout reverse right={<RightImage type="register" />}>
        <div className="text-center space-y-6">
          <div className="text-6xl">🎉</div>
          <div>
            <h1 className="text-3xl font-bold text-white mb-4">Registration Successful!</h1>
            <p className="text-neutral-400 mb-6">
              Your account has been created successfully. Redirecting to login...
            </p>
            <div className="animate-spin text-lime-300 text-2xl">⏳</div>
          </div>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout 
      reverse 
      action={
        <Button 
          asChild 
          className="bg-lime-500 hover:bg-lime-600 text-black font-semibold h-10 px-6 text-sm rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-lime-500/25"
        >
          <Link to="/login">Already have an account?</Link>
        </Button>
      } 
      right={<RightImage type="register" />}
    >
      <div className="mb-8 sm:mb-10">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 text-white">
          Join Us Today! 🚀
        </h1>
        <p className="text-sm sm:text-base text-neutral-400 leading-relaxed max-w-md">
          Create your account to start managing invoices and products efficiently.
        </p>
      </div>
      
      <form onSubmit={submit} className="space-y-6 w-full max-w-xl">
        <div className="space-y-2">
          <Label requiredMark className="text-sm font-medium">Full Name</Label>
          <Input 
            value={form.name} 
            onChange={e => {
              const value = e.target.value
              setForm(f => ({...f, name: value}))
              if (value) validateField('name', value)
            }}
            onBlur={e => validateField('name', e.target.value)}
            placeholder="Enter your full name" 
            className={`h-12 text-base transition-all duration-200 ${
              validationErrors.name ? 'border-red-400 focus:border-red-400' : 'focus:border-lime-300'
            }`}
            disabled={isSubmitting}
            autoComplete="name"
          />
          {validationErrors.name && (
            <p className="text-xs text-red-400 flex items-center gap-1">
              <span>⚠️</span> {validationErrors.name}
            </p>
          )}
          <p className="text-xs text-neutral-500">
            This name will be displayed on your invoices
          </p>
        </div>

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
            disabled={isSubmitting}
            autoComplete="email"
          />
          {validationErrors.email && (
            <p className="text-xs text-red-400 flex items-center gap-1">
              <span>⚠️</span> {validationErrors.email}
            </p>
          )}
          <p className="text-xs text-neutral-500">
            We'll use this email for account notifications
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
            placeholder="Create a strong password" 
            className={`h-12 text-base transition-all duration-200 ${
              validationErrors.password ? 'border-red-400 focus:border-red-400' : 'focus:border-lime-300'
            }`}
            disabled={isSubmitting}
            autoComplete="new-password"
          />
          {validationErrors.password && (
            <p className="text-xs text-red-400 flex items-center gap-1">
              <span>⚠️</span> {validationErrors.password}
            </p>
          )}
          <p className="text-xs text-neutral-500">
            Must include uppercase, lowercase, and a number
          </p>
        </div>

        {validationErrors.general && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 flex items-center gap-2">
            <span className="text-red-400">❌</span>
            <p className="text-sm text-red-400">{validationErrors.general}</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4">
          <Button 
            type="submit"
            disabled={isSubmitting || Object.keys(validationErrors).length > 0}
            className="bg-lime-500 hover:bg-lime-600 text-black font-semibold rounded-lg h-12 px-8 transition-all duration-200 hover:shadow-lg hover:shadow-lime-500/25 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">⏳</span> Creating Account...
              </span>
            ) : (
              'Create Account'
            )}
          </Button>
          <span className="text-sm text-neutral-400 text-center sm:text-left">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="text-lime-300 hover:text-lime-200 font-medium transition-colors underline underline-offset-4 hover:underline-offset-2"
            >
              Sign in here
            </Link>
          </span>
        </div>

        <div className="pt-6 border-t border-white/10">
          <p className="text-xs text-neutral-500 text-center leading-relaxed">
            By creating an account, you agree to our{' '}
            <span className="text-lime-300">Terms of Service</span> and{' '}
            <span className="text-lime-300">Privacy Policy</span>
          </p>
        </div>
      </form>
    </AuthLayout>
  )
}

export default RegisterPage
