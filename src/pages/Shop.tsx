import { useId, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router'
import type { Category, Product } from '@/types'
import { categories, products } from '@/data/products'
import { searchProducts } from '@/lib/search'
import { useSeo } from '@/hooks/useSeo'
import { PageHeader } from '@/components/ui/PageHeader'
import { ProductGrid } from '@/components/product/ProductGrid'
import { Button } from '@/components/ui/Button'
import { Dialog, CloseButton } from '@/components/ui/Dialog'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'

const PAGE_SIZE = 9

const priceRanges = [
  { id: 'all', label: 'All prices', test: () => true },
  { id: 'u300', label: 'Under $300', test: (p: number) => p < 300 },
  { id: '300-600', label: '$300 – $600', test: (p: number) => p >= 300 && p <= 600 },
  { id: '600-1000', label: '$600 – $1,000', test: (p: number) => p > 600 && p <= 1000 },
  { id: 'o1000', label: 'Over $1,000', test: (p: number) => p > 1000 },
] as const

const sorts = {
  featured: { label: 'Featured', fn: (a: Product, b: Product) => Number(b.featured) - Number(a.featured) },
  newest: { label: 'Newest', fn: (a: Product, b: Product) => b.addedAt.localeCompare(a.addedAt) },
  'price-asc': { label: 'Price: low to high', fn: (a: Product, b: Product) => a.price - b.price },
  'price-desc': { label: 'Price: high to low', fn: (a: Product, b: Product) => b.price - a.price },
  name: { label: 'Name: A – Z', fn: (a: Product, b: Product) => a.name.localeCompare(b.name) },
} as const
type SortKey = keyof typeof sorts

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const category = (params.get('category') as Category | null) ?? null
  const onlyNew = params.get('new') === '1'
  const price = params.get('price') ?? 'all'
  const sort = (params.get('sort') as SortKey | null) ?? 'featured'
  const q = params.get('q') ?? ''
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [visible, setVisible] = useState(PAGE_SIZE)
  const [paramKey, setParamKey] = useState(params.toString())
  const searchId = useId()

  // Reset pagination whenever the filters change
  if (paramKey !== params.toString()) {
    setParamKey(params.toString())
    setVisible(PAGE_SIZE)
  }

  const update = (key: string, value: string | null) => {
    const next = new URLSearchParams(params)
    if (value === null || value === '' || value === 'all') next.delete(key)
    else next.set(key, value)
    setParams(next, { replace: true, preventScrollReset: true })
  }

  const filtered = useMemo(() => {
    const range = priceRanges.find((r) => r.id === price) ?? priceRanges[0]
    let list = q.trim() ? searchProducts(q) : [...products]
    list = list.filter(
      (p) => (!category || p.category === category) && (!onlyNew || p.newArrival) && range.test(p.price),
    )
    const sorter = sorts[sort] ?? sorts.featured
    return q.trim() && sort === 'featured' ? list : [...list].sort(sorter.fn)
  }, [category, onlyNew, price, sort, q])

  const activeCat = categories.find((c) => c.id === category)
  const title = onlyNew ? 'New In' : activeCat ? activeCat.label : 'The Collection'
  const intro = onlyNew
    ? 'The latest arrivals from the atelier — new pieces every week of the season.'
    : (activeCat?.description ?? 'Every piece, from tailoring and knitwear to leather goods and the finishing details.')
  const activeCount = [category, onlyNew ? '1' : null, price !== 'all' ? price : null, q || null].filter(Boolean).length

  useSeo({ title, description: intro })

  const shown = filtered.slice(0, visible)

  const filters = (
    <FilterPanel
      category={category}
      onlyNew={onlyNew}
      price={price}
      onCategory={(c) => update('category', c)}
      onNew={(v) => update('new', v ? '1' : null)}
      onPrice={(p) => update('price', p)}
    />
  )

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Shop', to: '/shop' }, ...(activeCat || onlyNew ? [{ label: title }] : [])]}
        eyebrow={`${filtered.length} ${filtered.length === 1 ? 'piece' : 'pieces'}`}
        title={title}
        intro={intro}
      />

      {/* Category chips — mobile & tablet */}
      <div className="container-site lg:hidden">
        <ul className="no-scrollbar -mx-[var(--spacing-gutter)] flex gap-2 overflow-x-auto px-[var(--spacing-gutter)] pb-2" aria-label="Categories">
          <li>
            <button type="button" onClick={() => update('category', null)} aria-pressed={!category} className={chip(!category)}>
              All
            </button>
          </li>
          {categories.map((c) => (
            <li key={c.id}>
              <button type="button" onClick={() => update('category', c.id)} aria-pressed={category === c.id} className={chip(category === c.id)}>
                {c.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="container-site pb-[var(--spacing-section)] pt-6 lg:pt-4">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-10">
          <aside className="hidden lg:col-span-3 lg:block xl:col-span-2" aria-label="Product filters">
            <div className="sticky top-28">{filters}</div>
          </aside>

          <div className="lg:col-span-9 xl:col-span-10">
            {/* Toolbar */}
            <div className="flex flex-col gap-4 border-y border-line py-3 sm:flex-row sm:items-center sm:justify-between">
              <form role="search" onSubmit={(e) => e.preventDefault()} className="flex flex-1 items-center gap-3 sm:max-w-sm">
                <Icon name="search" size={18} className="shrink-0 text-taupe" />
                <label htmlFor={searchId} className="sr-only">
                  Search within the shop
                </label>
                <input
                  id={searchId}
                  type="search"
                  value={q}
                  onChange={(e) => update('q', e.target.value)}
                  placeholder="Search within the shop"
                  className="min-h-11 w-full bg-transparent text-sm outline-none placeholder:text-taupe/70"
                />
              </form>
              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setFiltersOpen(true)}
                  className="inline-flex min-h-11 items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.18em] lg:hidden"
                  aria-haspopup="dialog"
                >
                  <Icon name="sliders" size={18} />
                  Filters{activeCount > 0 && ` (${activeCount})`}
                </button>
                <label className="flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.18em] text-taupe">
                  <span className="hidden sm:inline">Sort by</span>
                  <span className="sr-only sm:hidden">Sort by</span>
                  <select
                    value={sort}
                    onChange={(e) => update('sort', e.target.value === 'featured' ? null : e.target.value)}
                    className="field-input !min-h-11 !w-auto !border-0 !py-0 text-[0.85rem] normal-case tracking-normal text-ink"
                  >
                    {Object.entries(sorts).map(([k, v]) => (
                      <option key={k} value={k}>
                        {v.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>

            {activeCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-4">
                {category && <ActiveChip label={activeCat?.label ?? category} onRemove={() => update('category', null)} />}
                {onlyNew && <ActiveChip label="New arrivals" onRemove={() => update('new', null)} />}
                {price !== 'all' && <ActiveChip label={priceRanges.find((r) => r.id === price)?.label ?? price} onRemove={() => update('price', null)} />}
                {q && <ActiveChip label={`“${q}”`} onRemove={() => update('q', null)} />}
                <button type="button" onClick={() => setParams({}, { replace: true })} className="eyebrow ml-2 link-underline-static text-taupe">
                  Clear all
                </button>
              </div>
            )}

            <p className="sr-only" aria-live="polite">
              {filtered.length} products found
            </p>

            {filtered.length === 0 ? (
              <div className="py-24 text-center">
                <p className="font-display text-3xl italic sm:text-4xl">No pieces match your selection.</p>
                <p className="mx-auto mt-4 max-w-sm text-sm text-taupe">Try removing a filter or searching for something broader.</p>
                <Button variant="secondary" className="mt-8" onClick={() => setParams({}, { replace: true })}>
                  Reset filters
                </Button>
              </div>
            ) : (
              <>
                <ProductGrid products={shown} columns={3} className="mt-8 lg:mt-10" priorityCount={4} />
                <div className="mt-16 flex flex-col items-center gap-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-taupe">
                    Showing {shown.length} of {filtered.length}
                  </p>
                  <div className="h-px w-48 bg-line" aria-hidden="true">
                    <div className="h-px bg-ink transition-[width] duration-700 ease-luxe" style={{ width: `${(shown.length / filtered.length) * 100}%` }} />
                  </div>
                  {shown.length < filtered.length && (
                    <Button variant="secondary" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
                      Load more
                    </Button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <Dialog open={filtersOpen} onClose={() => setFiltersOpen(false)} label="Filters" variant="left">
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5">
          <p className="label">Filters</p>
          <CloseButton onClick={() => setFiltersOpen(false)} label="Close filters" className="-mr-3" />
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6">{filters}</div>
        <div className="grid grid-cols-2 gap-2 border-t border-line p-5">
          <Button variant="ghost" onClick={() => setParams({}, { replace: true })}>
            Clear
          </Button>
          <Button onClick={() => setFiltersOpen(false)}>Show {filtered.length}</Button>
        </div>
      </Dialog>
    </>
  )
}

const chip = (active: boolean) =>
  cn(
    'min-h-10 shrink-0 border px-4 text-[0.68rem] font-medium uppercase tracking-[0.16em] transition-colors',
    active ? 'border-ink bg-ink text-ivory' : 'border-line-strong hover:border-ink',
  )

function ActiveChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <button
      type="button"
      onClick={onRemove}
      className="inline-flex min-h-9 items-center gap-2 bg-cream px-3 text-[0.78rem] transition-colors hover:bg-sand"
      aria-label={`Remove filter ${label}`}
    >
      {label}
      <Icon name="close" size={12} />
    </button>
  )
}

function FilterPanel({
  category,
  onlyNew,
  price,
  onCategory,
  onNew,
  onPrice,
}: {
  category: Category | null
  onlyNew: boolean
  price: string
  onCategory: (c: Category | null) => void
  onNew: (v: boolean) => void
  onPrice: (p: string) => void
}) {
  const name = useId()
  const counts = (c: Category | null) => products.filter((p) => !c || p.category === c).length
  return (
    <div className="space-y-10">
      <fieldset>
        <legend className="eyebrow mb-4 text-taupe">Category</legend>
        <ul className="space-y-1">
          {[null, ...categories.map((c) => c.id)].map((c) => {
            const label = c ? (categories.find((x) => x.id === c)?.label ?? c) : 'All pieces'
            return (
              <li key={c ?? 'all'}>
                <label className="group flex cursor-pointer items-center justify-between gap-3 py-1.5">
                  <span className="flex items-center gap-3">
                    <input type="radio" name={`${name}-cat`} checked={category === c} onChange={() => onCategory(c)} className="peer sr-only" />
                    <span className="size-1.5 rounded-full bg-ink opacity-0 transition-opacity peer-checked:opacity-100" aria-hidden="true" />
                    <span className={cn('text-[0.95rem] transition-colors peer-focus-visible:underline', category === c ? 'text-ink' : 'text-taupe group-hover:text-ink')}>{label}</span>
                  </span>
                  <span className="text-xs tabular-nums text-taupe">{counts(c)}</span>
                </label>
              </li>
            )
          })}
        </ul>
      </fieldset>

      <fieldset>
        <legend className="eyebrow mb-4 text-taupe">Price</legend>
        <ul className="space-y-1">
          {priceRanges.map((r) => (
            <li key={r.id}>
              <label className="group flex cursor-pointer items-center gap-3 py-1.5">
                <input type="radio" name={`${name}-price`} checked={price === r.id} onChange={() => onPrice(r.id)} className="peer sr-only" />
                <span className="flex size-4 items-center justify-center rounded-full border border-line-strong peer-checked:border-ink peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2" aria-hidden="true">
                  <span className={cn('size-2 rounded-full bg-ink transition-transform', price === r.id ? 'scale-100' : 'scale-0')} />
                </span>
                <span className={cn('text-[0.95rem]', price === r.id ? 'text-ink' : 'text-taupe group-hover:text-ink')}>{r.label}</span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      <fieldset>
        <legend className="eyebrow mb-4 text-taupe">Availability</legend>
        <label className="flex cursor-pointer items-center gap-3 py-1.5">
          <input type="checkbox" checked={onlyNew} onChange={(e) => onNew(e.target.checked)} className="peer sr-only" />
          <span className="flex size-4 items-center justify-center border border-line-strong peer-checked:border-ink peer-checked:bg-ink peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2" aria-hidden="true">
            <Icon name="check" size={12} className={cn('text-ivory', !onlyNew && 'opacity-0')} strokeWidth={2} />
          </span>
          <span className="text-[0.95rem]">New arrivals only</span>
        </label>
      </fieldset>
    </div>
  )
}
