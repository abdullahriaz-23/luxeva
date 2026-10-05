import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import { useSeo } from '@/hooks/useSeo'
import { useToast } from '@/hooks/useStore'
import { TextField } from '@/components/ui/Field'
import { Button } from '@/components/ui/Button'
import { DemoNotice } from '@/components/ui/DemoNotice'
import { AuthLayout } from './AuthLayout'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
type F = { firstName: string; lastName: string; email: string; password: string; confirm: string; terms: boolean }

export default function Signup() {
  useSeo({ title: 'Create account', noindex: true })
  const navigate = useNavigate()
  const { notify } = useToast()
  const [f, setF] = useState<F>({ firstName: '', lastName: '', email: '', password: '', confirm: '', terms: false })
  const [errors, setErrors] = useState<Partial<Record<keyof F, string>>>({})

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const er: Partial<Record<keyof F, string>> = {}
    if (!f.firstName.trim()) er.firstName = 'First name is required.'
    if (!f.lastName.trim()) er.lastName = 'Last name is required.'
    if (!EMAIL.test(f.email.trim())) er.email = 'Enter a valid email address.'
    if (f.password.length < 8 || !/\d/.test(f.password)) er.password = 'Use at least 8 characters, including a number.'
    if (f.confirm !== f.password || !f.confirm) er.confirm = 'Passwords do not match.'
    if (!f.terms) er.terms = 'Please accept the terms to continue.'
    setErrors(er)
    const first = Object.keys(er)[0]
    if (first) return document.getElementById(`su-${first}`)?.focus()
    notify({ title: 'Demo account', description: 'Sign-up is not connected to a backend — showing the demo account.' })
    navigate('/account')
  }

  const bind = (k: Exclude<keyof F, 'terms'>) => ({
    id: `su-${k}`,
    value: f[k],
    error: errors[k],
    onChange: (e: { target: { value: string } }) => setF((p) => ({ ...p, [k]: e.target.value })),
  })

  return (
    <AuthLayout
      title={<>Join <em>LUXEVA.</em></>}
      intro="Create an account for faster checkout, order tracking and early access to new collections."
      image="lookbook/look-02.svg"
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="link-underline-static text-ink">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={submit} noValidate className="space-y-8">
        <div className="grid gap-8 sm:grid-cols-2">
          <TextField label="First name" autoComplete="given-name" required {...bind('firstName')} />
          <TextField label="Last name" autoComplete="family-name" required {...bind('lastName')} />
        </div>
        <TextField label="Email" type="email" autoComplete="email" required {...bind('email')} />
        <TextField label="Password" type="password" autoComplete="new-password" required hint="At least 8 characters, including a number." {...bind('password')} />
        <TextField label="Confirm password" type="password" autoComplete="new-password" required {...bind('confirm')} />
        <div>
          <label className="flex cursor-pointer items-start gap-3 text-sm">
            <input
              id="su-terms"
              type="checkbox"
              checked={f.terms}
              onChange={(e) => setF((p) => ({ ...p, terms: e.target.checked }))}
              aria-invalid={errors.terms ? true : undefined}
              aria-describedby={errors.terms ? 'su-terms-err' : undefined}
              className="mt-1 size-4 shrink-0 accent-ink"
            />
            <span className="text-taupe">
              I agree to the{' '}
              <Link to="/terms" className="link-underline-static text-ink">terms</Link> and{' '}
              <Link to="/privacy" className="link-underline-static text-ink">privacy policy</Link>.
            </span>
          </label>
          {errors.terms && (
            <p id="su-terms-err" role="alert" className="mt-2 text-xs text-danger">
              {errors.terms}
            </p>
          )}
        </div>
        <Button type="submit" size="lg" className="w-full" arrow>
          Create account
        </Button>
        <DemoNotice>Frontend validation only. No account is created — authentication is not implemented in this template.</DemoNotice>
      </form>
    </AuthLayout>
  )
}
