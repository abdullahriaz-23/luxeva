import { useId } from 'react'
import { useSearchParams } from 'react-router'
import { useSeo } from '@/hooks/useSeo'
import { popularSearches, searchProducts } from '@/lib/search'
import { categoryLabel, products } from '@/data/products'
import { PageHeader } from '@/components/ui/PageHeader'
import { ProductGrid } from '@/components/product/ProductGrid'
import { Icon } from '@/components/ui/Icon'

export default function Search() {
  const [params, setParams] = useSearchParams()
  const q = params.get('q') ?? ''
  const id = useId()
  const results = searchProducts(q)
  useSeo({ title: q ? `Search: ${q}` : 'Search', noindex: true })

  const categoriesFound = [...new Set(results.map((p) => p.category))]

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Search' }]}
        eyebrow={q ? `${results.length} ${results.length === 1 ? 'result' : 'results'}` : 'Search'}
        title={q ? <>“{q}”</> : 'Search the collection'}
      />
      <div className="container-site pb-[var(--spacing-section)]">
        <form role="search" onSubmit={(e) => e.preventDefault()} className="flex max-w-2xl items-center gap-4 border-b border-ink pb-3">
          <Icon name="search" size={22} />
          <label htmlFor={id} className="sr-only">
            Search products
          </label>
          <input
            id={id}
            type="search"
            value={q}
            onChange={(e) => setParams(e.target.value ? { q: e.target.value } : {}, { replace: true })}
            placeholder="Search by name, category, colour or material"
            className="min-w-0 flex-1 bg-transparent py-2 font-display text-2xl outline-none placeholder:text-taupe/60 sm:text-3xl"
          />
        </form>

        {q && categoriesFound.length > 0 && (
          <p className="mt-6 text-sm text-taupe">
            Found in: {categoriesFound.map((c) => categoryLabel(c)).join(', ')}
          </p>
        )}

        <div aria-live="polite">
          {!q && (
            <div className="mt-10">
              <p className="eyebrow text-taupe">Popular searches</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {popularSearches.map((s) => (
                  <button key={s} type="button" onClick={() => setParams({ q: s })} className="border border-line-strong px-4 py-2 text-sm hover:border-ink">
                    {s}
                  </button>
                ))}
              </div>
              <p className="eyebrow mt-16 text-taupe">Most wanted</p>
              <ProductGrid products={products.filter((p) => p.featured).slice(0, 8)} className="mt-8" />
            </div>
          )}

          {q && results.length > 0 && <ProductGrid products={results} className="mt-12" />}

          {q && results.length === 0 && (
            <div className="py-20 text-center">
              <p className="font-display text-3xl italic sm:text-4xl">No results for “{q}”.</p>
              <p className="mx-auto mt-4 max-w-md text-sm text-taupe">Try a different spelling or a broader term.</p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {popularSearches.map((s) => (
                  <button key={s} type="button" onClick={() => setParams({ q: s })} className="border border-line-strong px-4 py-2 text-sm hover:border-ink">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
