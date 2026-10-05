import { useId, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import type { Category, Product } from '@/types'
import { products } from '@/data/products'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ArrowLink } from '@/components/ui/Button'
import { ProductCard } from '@/components/product/ProductCard'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'

const tabs: { id: string; label: string; match: (c: Category) => boolean }[] = [
  { id: 'all', label: 'All', match: () => true },
  { id: 'women', label: 'Women', match: (c) => c === 'women' },
  { id: 'men', label: 'Men', match: (c) => c === 'men' },
  { id: 'accessories', label: 'Accessories', match: (c) => c === 'accessories' || c === 'bags' || c === 'shoes' },
]

type Sort = 'newest' | 'price-asc' | 'price-desc'
const sorters: Record<Sort, (a: Product, b: Product) => number> = {
  newest: (a, b) => b.addedAt.localeCompare(a.addedAt),
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
}

export function NewArrivals() {
  const [tab, setTab] = useState('all')
  const [sort, setSort] = useState<Sort>('newest')
  const railRef = useRef<HTMLUListElement>(null)
  const id = useId()

  const items = useMemo(() => {
    const t = tabs.find((x) => x.id === tab) ?? tabs[0]
    // New arrivals first, then the most recent additions to fill the rail
    const pool = products.filter((p) => t.match(p.category))
    const fresh = pool.filter((p) => p.newArrival)
    const list = fresh.length >= 4 ? fresh : [...fresh, ...pool.filter((p) => !p.newArrival).sort(sorters.newest)].slice(0, 6)
    return [...list].sort(sorters[sort])
  }, [tab, sort])

  const scroll = (dir: 1 | -1) => {
    const rail = railRef.current
    if (!rail) return
    rail.scrollBy({ left: dir * rail.clientWidth * 0.8, behavior: 'smooth' })
  }

  const onTabKey = (e: KeyboardEvent, i: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length]
    setTab(next.id)
    document.getElementById(`${id}-tab-${next.id}`)?.focus()
  }

  return (
    <section aria-labelledby={`${id}-title`} className="section-y overflow-hidden">
      <div className="container-site">
        <SectionHeader
          id={`${id}-title`}
          index="03"
          eyebrow="New arrivals"
          title={
            <>
              Just <em>arrived</em>
            </>
          }
          aside={<ArrowLink to="/shop?new=1">Shop all new arrivals</ArrowLink>}
        />

        <div className="mt-12 flex flex-col gap-5 border-b border-line sm:flex-row sm:items-end sm:justify-between">
          <div role="tablist" aria-label="Filter new arrivals" className="no-scrollbar -mb-px flex gap-7 overflow-x-auto">
            {tabs.map((t, i) => (
              <button
                key={t.id}
                id={`${id}-tab-${t.id}`}
                role="tab"
                type="button"
                aria-selected={tab === t.id}
                aria-controls={`${id}-panel`}
                tabIndex={tab === t.id ? 0 : -1}
                onClick={() => setTab(t.id)}
                onKeyDown={(e) => onTabKey(e, i)}
                className={cn(
                  'shrink-0 border-b py-4 text-[0.7rem] font-medium uppercase tracking-[0.2em] transition-colors',
                  tab === t.id ? 'border-ink text-ink' : 'border-transparent text-taupe hover:text-ink',
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between gap-4 pb-3">
            <label className="flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.18em] text-taupe">
              Sort
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="field-input !min-h-9 !w-auto !py-1 text-[0.8rem] normal-case tracking-normal text-ink"
              >
                <option value="newest">Newest</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
              </select>
            </label>
            <div className="flex gap-1">
              <button type="button" onClick={() => scroll(-1)} aria-label="Scroll products left" className="inline-flex size-11 items-center justify-center border border-line-strong transition-colors hover:border-ink">
                <Icon name="arrowLeft" size={16} />
              </button>
              <button type="button" onClick={() => scroll(1)} aria-label="Scroll products right" className="inline-flex size-11 items-center justify-center border border-line-strong transition-colors hover:border-ink">
                <Icon name="arrowRight" size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${tab}`} className="container-site mt-10">
        <ul
          ref={railRef}
          key={tab}
          className="no-scrollbar -mx-[var(--spacing-gutter)] grid snap-x snap-mandatory auto-cols-[68%] grid-flow-col gap-3 overflow-x-auto scroll-px-[var(--spacing-gutter)] px-[var(--spacing-gutter)] sm:auto-cols-[42%] sm:gap-5 lg:auto-cols-[calc((100%-3*1.5rem)/4)] lg:gap-6"
        >
          {items.map((p) => (
            <li key={p.id} className="snap-start transition-[opacity,translate] duration-700 ease-luxe starting:translate-y-3 starting:opacity-0">
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
