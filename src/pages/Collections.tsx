import { Link } from 'react-router'
import { collections } from '@/data/collections'
import { getCollectionProducts } from '@/data/products'
import { useSeo } from '@/hooks/useSeo'
import { PageHeader } from '@/components/ui/PageHeader'
import { ArrowLink } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/cn'

export default function Collections() {
  useSeo({ title: 'Collections', description: 'Five collections, one point of view — seasonal stories and permanent essentials from LUXEVA.' })
  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Collections' }]}
        eyebrow="Five stories, one point of view"
        title={<>The <em>Collections</em></>}
        intro="Seasonal chapters and permanent wardrobes — each designed to work with everything else we make."
      />
      <div className="container-site pb-[var(--spacing-section)]">
        <ol className="border-t border-line">
          {collections.map((c, i) => {
            const count = getCollectionProducts(c.slug).length
            const reverse = i % 2 === 1
            return (
              <li key={c.slug} className="border-b border-line py-12 sm:py-16 lg:py-20">
                <Reveal className="grid items-center gap-8 lg:grid-cols-12 lg:gap-x-10">
                  <Link
                    to={`/collections/${c.slug}`}
                    className={cn('group block overflow-hidden bg-sand lg:col-span-6', reverse && 'lg:order-2 lg:col-start-7')}
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    <img
                      src={c.heroImage}
                      alt=""
                      loading={i === 0 ? 'eager' : 'lazy'}
                      className="aspect-[4/5] w-full object-cover transition-[scale] duration-[1400ms] ease-luxe group-hover:scale-[1.03] sm:aspect-[5/4] lg:aspect-[4/5] xl:aspect-[5/5]"
                    />
                  </Link>
                  <div className={cn('lg:col-span-5', reverse ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-8')}>
                    <p className="font-display text-[clamp(3.5rem,8vw,7rem)] italic leading-none text-brass/60">{c.index}</p>
                    <p className="eyebrow mt-6 text-taupe">{c.season}</p>
                    <h2 className="display-lg mt-3">
                      <Link to={`/collections/${c.slug}`} className="link-underline">
                        {c.name}
                      </Link>
                    </h2>
                    <p className="mt-3 font-display text-xl italic">{c.tagline}</p>
                    <p className="mt-6 max-w-md text-[0.98rem] leading-relaxed text-taupe">{c.description}</p>
                    <div className="mt-8 flex items-center gap-6">
                      <ArrowLink to={`/collections/${c.slug}`}>Explore</ArrowLink>
                      <span className="text-xs uppercase tracking-[0.18em] text-taupe">{count} pieces</span>
                    </div>
                  </div>
                </Reveal>
              </li>
            )
          })}
        </ol>
      </div>
    </>
  )
}
