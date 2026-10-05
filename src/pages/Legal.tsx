import type { ReactNode } from 'react'
import { site } from '@/config/site'
import { PageHeader } from '@/components/ui/PageHeader'
import { DemoNotice } from '@/components/ui/DemoNotice'

/** Shared layout for privacy / terms pages. */
export function LegalLayout({ title, updated, sections }: { title: string; updated: string; sections: { heading: string; body: ReactNode }[] }) {
  return (
    <>
      <PageHeader crumbs={[{ label: 'Home', to: '/' }, { label: title }]} eyebrow={`Last updated ${updated}`} title={title} />
      <div className="container-site grid gap-12 pb-[var(--spacing-section)] lg:grid-cols-12">
        <nav aria-label="On this page" className="hidden lg:col-span-3 lg:block">
          <ol className="sticky top-28 space-y-2.5 text-sm text-taupe">
            {sections.map((s, i) => (
              <li key={s.heading}>
                <a href={`#s-${i + 1}`} className="link-underline hover:text-ink">
                  {i + 1}. {s.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="max-w-2xl lg:col-span-8 lg:col-start-5">
          <DemoNotice>
            <strong className="font-medium">Demo/template content — buyers should replace this with their own legally reviewed policies.</strong>{' '}
            {site.name} is a fictional brand and this text is not legal advice.
          </DemoNotice>
          <div className="mt-12 space-y-12">
            {sections.map((s, i) => (
              <section key={s.heading} id={`s-${i + 1}`} className="scroll-mt-28">
                <h2 className="font-display text-2xl sm:text-3xl">
                  {i + 1}. {s.heading}
                </h2>
                <div className="mt-4 space-y-4 text-[0.98rem] leading-relaxed text-taupe">{s.body}</div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
