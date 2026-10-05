import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import { useSeo } from '@/hooks/useSeo'
import { useToast } from '@/hooks/useStore'
import { TextField } from '@/components/ui/Field'
import { Button } from '@/components/ui/Button'
import { DemoNotice } from '@/components/ui/DemoNotice'
import { AuthLayout } from './AuthLayout'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export default function Login() {
  useSeo({ title: 'Sign in', noindex: true })
  const navigate = useNavigate()
  const { notify } = useToast()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const er: typeof errors = {}
    if (!EMAIL.test(email.trim())) er.email = 'Enter a valid email address.'
    if (password.length < 8) er.password = 'Password must be at least 8 characters.'
    setErrors(er)
    if (er.email) return document.getElementById('lg-email')?.focus()
    if (er.password) return document.getElementById('lg-password')?.focus()
    notify({ title: 'Demo sign-in', description: 'Authentication is not implemented — showing the demo account.' })
    navigate('/account')
  }

  return (
    <AuthLayout
      title={<>Welcome <em>back.</em></>}
      intro="Sign in to view orders, saved pieces and appointments."
      image="lookbook/look-04.svg"
      footer={
        <>
          New to LUXEVA?{' '}
          <Link to="/signup" className="link-underline-static text-ink">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={submit} noValidate className="space-y-8">
        <TextField id="lg-email" label="Email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
        <TextField id="lg-password" label="Password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password} />
        <div className="flex items-center justify-between text-sm">
          <label className="flex cursor-pointer items-center gap-2">
            <input type="checkbox" className="size-4 accent-ink" /> Remember me
          </label>
          <span className="text-taupe">Forgot password? (demo)</span>
        </div>
        <Button type="submit" size="lg" className="w-full" arrow>
          Sign in
        </Button>
        <DemoNotice>Frontend validation only. Authentication is not implemented — see README → Connecting authentication.</DemoNotice>
      </form>
    </AuthLayout>
  )
}
