import { Link, useSearchParams } from 'react-router'
import { formatDate } from '@/lib/format'
import type { ArticleCategory } from '@/types'
import { articleCategories, articles } from '@/data/articles'
import { useSeo } from '@/hooks/useSeo'
import { PageHeader } from '@/components/ui/PageHeader'
import { ArticleCard } from '@/components/editorial/ArticleCard'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/cn'

export default function Journal() {
  useSeo({ title: 'Journal', description: 'Stories on craft, collections, care and style from the LUXEVA journal.' })
  const [params, setParams] = useSearchParams()
  const active = params.get('category') as ArticleCategory | null
  const list = active ? articles.filter((a) => a.category === active) : articles
  const [lead, ...rest] = list

  const filters: (ArticleCategory | null)[] = [null, ...articleCategories]

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Journal' }]}
        eyebrow="The LUXEVA Journal"
        title={<>Notes on craft, <em>collections</em> & style</>}
      />
      <div className="container-site pb-[var(--spacing-section)]">
        <div className="border-y border-line">
          <ul className="no-scrollbar -mx-[var(--spacing-gutter)] flex gap-7 overflow-x-auto px-[var(--spacing-gutter)]" aria-label="Filter articles by category">
            {filters.map((c) => {
              const isActive = active === c
              const count = c ? articles.filter((a) => a.category === c).length : articles.length
              return (
                <li key={c ?? 'all'} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setParams(c ? { category: c } : {}, { replace: true, preventScrollReset: true })}
                    aria-pressed={isActive}
                    className={cn('-mb-px border-b py-4 text-[0.7rem] font-medium uppercase tracking-[0.2em] transition-colors', isActive ? 'border-ink text-ink' : 'border-transparent text-taupe hover:text-ink')}
                  >
                    {c ?? 'All'} <span className="text-taupe">({count})</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        <p className="sr-only" aria-live="polite">
          {list.length} articles
        </p>

        {lead ? (
          <>
            <Reveal key={lead.slug} className="mt-14 lg:mt-20">
              <article className="group relative grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-x-10">
                <div className="overflow-hidden bg-sand lg:col-span-7">
                  <img src={lead.image} alt={lead.imageAlt} className="aspect-[4/3] w-full object-cover transition-[scale] duration-[1400ms] ease-luxe group-hover:scale-[1.03]" />
                </div>
                <div className="lg:col-span-5">
                  <p className="eyebrow flex items-center gap-3 text-taupe">
                    <span className="text-ink">{lead.category}</span>
                    <span className="h-px w-5 bg-current opacity-40" aria-hidden="true" />
                    {lead.readingTime} min read
                  </p>
                  <h2 className="display-lg mt-5">
                    <Link to={`/journal/${lead.slug}`} className="link-underline after:absolute after:inset-0 after:content-['']">
                      {lead.title}
                    </Link>
                  </h2>
                  <p className="lede mt-6 text-taupe">{lead.excerpt}</p>
                  <p className="mt-6 text-sm text-taupe">
                    By {lead.author} · <time dateTime={lead.date}>{formatDate(lead.date)}</time>
                  </p>
                </div>
              </article>
            </Reveal>
            {rest.length > 0 && (
              <div className="mt-20 grid gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((a, i) => (
                  <Reveal key={a.slug} delay={(i % 3) * 90}>
                    <ArticleCard article={a} />
                  </Reveal>
                ))}
              </div>
            )}
          </>
        ) : (
          <p className="py-24 text-center font-display text-3xl italic">No articles in this category yet.</p>
        )}
      </div>
    </>
  )
}
