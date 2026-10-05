import { getCollectionProducts, products } from '@/data/products'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ArrowLink } from '@/components/ui/Button'
import { ProductCard } from '@/components/product/ProductCard'
import { Reveal } from '@/components/ui/Reveal'
import { pad } from '@/lib/format'
import { cn } from '@/lib/cn'

const SLUG = 'autumn-winter-2026'

export function FeaturedCollection() {
  const inCollection = getCollectionProducts(SLUG)
  const items = [...inCollection, ...products.filter((p) => p.featured && !inCollection.includes(p))].slice(0, 8)

  return (
    <section aria-labelledby="featured-title" className="container-site pb-[var(--spacing-section)]">
      <SectionHeader
        id="featured-title"
        index="02"
        eyebrow="Featured collection"
        title={
          <>
            Autumn / <em>Winter</em> 2026
          </>
        }
        aside={
          <div className="max-w-xs">
            <p className="text-[0.95rem] text-taupe">Dense wools, brushed cashmere and polished leather — built on weight, warmth and line.</p>
            <ArrowLink to={`/collections/${SLUG}`} className="mt-5">
              View the collection
            </ArrowLink>
          </div>
        }
      />
      <ul className="mt-14 grid grid-cols-2 gap-x-3 gap-y-12 sm:gap-x-5 lg:mt-20 lg:grid-cols-4 lg:gap-x-6">
        {items.map((p, i) => (
          <li key={p.id} className={cn(i % 2 === 1 && 'mt-10 sm:mt-16', i % 4 === 1 || i % 4 === 3 ? 'lg:mt-24' : 'lg:mt-0')}>
            <Reveal delay={(i % 4) * 80}>
              <ProductCard product={p} index={pad(i + 1)} />
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  )
}
