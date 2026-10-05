import { useParams } from 'react-router'
import { collections, getCollection } from '@/data/collections'
import { getCollectionProducts } from '@/data/products'
import { useSeo } from '@/hooks/useSeo'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { ProductGrid } from '@/components/product/ProductGrid'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ButtonLink } from '@/components/ui/Button'
import { CollectionCard } from '@/components/editorial/CollectionCard'
import { Reveal } from '@/components/ui/Reveal'
import NotFound from './NotFound'

export default function CollectionDetail() {
  const { slug = '' } = useParams()
  const collection = getCollection(slug)
  useSeo({ title: collection?.name ?? 'Collection not found', description: collection?.description })
  if (!collection) return <NotFound />

  const items = getCollectionProducts(collection.slug)
  const others = collections.filter((c) => c.slug !== collection.slug).slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="on-dark relative bg-ink text-ivory">
        <div className="grid lg:min-h-[calc(100svh-7.1rem)] lg:grid-cols-12">
          <div className="relative lg:col-span-7">
            <img src={collection.heroImage} alt="" fetchPriority="high" className="aspect-[4/5] w-full object-cover sm:aspect-[5/4] lg:absolute lg:inset-0 lg:h-full lg:aspect-auto" />
          </div>
          <div className="flex flex-col justify-between gap-12 px-[var(--spacing-gutter)] py-12 sm:py-16 lg:col-span-5 lg:px-[clamp(2.5rem,5vw,6rem)] lg:py-14">
            <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Collections', to: '/collections' }, { label: collection.name }]} className="text-ivory/60 [&_[aria-current]]:text-ivory" />
            <div>
              <p className="font-display text-6xl italic text-ivory/30 sm:text-7xl">N°{collection.index}</p>
              <p className="eyebrow mt-8 text-ivory/60">{collection.season}</p>
              <h1 className="display-xl mt-4">{collection.name}</h1>
              <p className="mt-5 font-display text-2xl italic text-ivory/85">{collection.tagline}</p>
              <p className="mt-6 max-w-md text-[0.98rem] leading-relaxed text-ivory/70">{collection.description}</p>
              <ButtonLink to="#pieces" variant="light" size="lg" arrow className="mt-10">
                Shop the collection
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* Statement */}
      <section className="container-site section-y">
        <Reveal className="mx-auto max-w-5xl text-center">
          <p className="eyebrow text-taupe">Editorial statement</p>
          <blockquote className="mt-8 font-display text-[clamp(1.9rem,4.2vw,4rem)] leading-[1.12]">
            “{collection.statement}”
          </blockquote>
        </Reveal>
      </section>

      {/* Products */}
      <section id="pieces" className="container-site scroll-mt-24 pb-[var(--spacing-section)]">
        <SectionHeader eyebrow={`${items.length} pieces`} title={<>The <em>pieces</em></>} />
        <ProductGrid products={items} className="mt-12" />
      </section>

      {/* Campaign + story */}
      <section className="bg-cream">
        <div className="container-site section-y grid gap-12 lg:grid-cols-12 lg:gap-x-10">
          <Reveal className="lg:col-span-6">
            <figure>
              <img src={collection.campaignImage} alt={collection.campaignCaption} loading="lazy" className="aspect-[4/5] w-full bg-sand object-cover" />
              <figcaption className="mt-3 text-xs text-taupe">{collection.campaignCaption}</figcaption>
            </figure>
          </Reveal>
          <div className="lg:col-span-5 lg:col-start-8 lg:self-center">
            <Reveal>
              <p className="eyebrow text-taupe">The story</p>
              <h2 className="display-lg mt-5">
                Behind <em>{collection.name}</em>
              </h2>
              <div className="mt-8 space-y-5 text-[0.98rem] leading-relaxed text-taupe">
                {collection.story.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
              <ButtonLink to="/shop" variant="secondary" size="lg" arrow className="mt-10">
                Shop all pieces
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </section>

      {/* More collections */}
      <section className="container-site section-y">
        <SectionHeader eyebrow="Continue exploring" title={<>More <em>collections</em></>} />
        <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((c) => (
            <CollectionCard key={c.slug} collection={c} />
          ))}
        </div>
      </section>
    </>
  )
}
