import { useId, useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { site } from '@/config/site'
import { Reveal } from '@/components/ui/Reveal'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** Newsletter sign-up. Frontend demo only — nothing is sent or stored. */
export function Newsletter() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState<string | null>(null)
  const id = useId()

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!EMAIL.test(email.trim())) {
      setError('Please enter a valid email address.')
      return
    }
    setDone(email.trim())
    setEmail('')
    setError('')
  }

  return (
    <section className="bg-cream" aria-labelledby={`${id}-title`}>
      <div className="container-site section-y">
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="eyebrow text-taupe">The LUXEVA letter</p>
          <h2 id={`${id}-title`} className="display-xl mt-6">
            Enter the world <br className="hidden sm:block" />
            of <em>{site.name}.</em>
          </h2>
          <p className="lede mx-auto mt-6 max-w-xl text-taupe">
            Early access to new collections, private appointments and stories from the atelier — a few times a season, never more.
          </p>

          {done ? (
            <div className="mx-auto mt-12 max-w-xl border border-line-strong bg-ivory px-6 py-8 sm:px-10" role="status">
              <span className="mx-auto flex size-12 items-center justify-center rounded-full border border-ink">
                <Icon name="check" size={20} />
              </span>
              <p className="mt-5 font-display text-2xl">Thank you — you’re on the list.</p>
              <p className="mt-3 text-sm text-taupe">
                This is a template demo: no email has been sent and <span className="text-ink">{done}</span> has not been stored.
              </p>
              <button type="button" onClick={() => setDone(null)} className="eyebrow mt-6 link-underline-static">
                Subscribe another address
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="mx-auto mt-12 max-w-xl text-left">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                <div className="flex-1">
                  <label htmlFor={`${id}-email`} className="sr-only">
                    Email address
                  </label>
                  <input
                    id={`${id}-email`}
                    type="email"
                    autoComplete="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (error) setError('')
                    }}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error ? `${id}-err` : `${id}-note`}
                    className="field-input text-lg"
                  />
                </div>
                <Button type="submit" size="lg" arrow>
                  Subscribe
                </Button>
              </div>
              {error ? (
                <p id={`${id}-err`} role="alert" className="mt-3 text-xs text-danger">
                  {error}
                </p>
              ) : (
                <p id={`${id}-note`} className="mt-4 text-xs text-taupe">
                  By subscribing you agree to our privacy policy. You can unsubscribe at any time.
                </p>
              )}
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}
