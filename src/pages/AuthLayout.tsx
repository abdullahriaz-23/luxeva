import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { img } from '@/lib/asset'
import { Logo } from '@/components/ui/Logo'

/** Split-screen layout for login / sign-up. */
export function AuthLayout({ title, intro, image, children, footer }: { title: ReactNode; intro: string; image: string; children: ReactNode; footer: ReactNode }) {
  return (
    <section className="grid lg:min-h-[calc(100svh-7.1rem)] lg:grid-cols-2">
      <div className="relative hidden bg-charcoal lg:block">
        <img src={img(image)} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-12 text-ivory">
          <Logo size="lg" />
          <p className="mt-4 max-w-sm font-display text-2xl italic">Designed for the moments that matter.</p>
        </div>
      </div>
      <div className="flex items-center justify-center px-[var(--spacing-gutter)] py-16 sm:py-24">
        <div className="w-full max-w-md">
          <Link to="/" className="eyebrow text-taupe link-underline">
            ← Back to the store
          </Link>
          <h1 className="display-lg mt-10">{title}</h1>
          <p className="mt-4 text-taupe">{intro}</p>
          <div className="mt-10">{children}</div>
          <div className="mt-10 border-t border-line pt-6 text-sm text-taupe">{footer}</div>
        </div>
      </div>
    </section>
  )
}
