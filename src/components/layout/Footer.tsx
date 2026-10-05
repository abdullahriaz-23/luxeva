import { Link } from 'react-router'
import { footerNav } from '@/data/navigation'
import { site } from '@/config/site'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="on-dark relative overflow-hidden bg-ink text-ivory">
      <div className="container-site pt-20 sm:pt-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-display text-3xl leading-tight italic sm:text-4xl">{site.tagline}</p>
            <div className="mt-8 space-y-1.5 text-sm text-ivory/65">
              <p>
                <a href={`mailto:${site.contact.email}`} className="link-underline hover:text-ivory">
                  {site.contact.email}
                </a>
              </p>
              <p>{site.contact.phone}</p>
              <p>{site.contact.hours}</p>
            </div>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:col-span-8">
            {footerNav.map((col) => (
              <div key={col.title}>
                <h2 className="eyebrow font-sans text-ivory/50">{col.title}</h2>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link to={l.to} className="link-underline text-[0.92rem] text-ivory/85 hover:text-ivory">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <p
          aria-hidden="true"
          className="mt-20 select-none text-center font-display leading-[0.8] tracking-[0.06em] text-ivory/95 sm:mt-28"
          style={{ fontSize: 'clamp(4rem, 19.5vw, 25rem)' }}
        >
          {site.name}
        </p>

        <div className="mt-8 flex flex-col gap-4 border-t border-line-light py-7 text-[0.72rem] text-ivory/55 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.name}. A fictional brand — demo content for a website template.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 uppercase tracking-[0.18em]">
            {site.social.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-ivory">
                  {s.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
