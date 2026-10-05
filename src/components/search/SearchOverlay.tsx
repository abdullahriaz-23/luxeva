import { useDeferredValue, useId, useRef, useState, type FormEvent, type RefObject } from 'react'
import { Link, useNavigate } from 'react-router'
import { useUI } from '@/hooks/useStore'
import { Dialog, CloseButton } from '@/components/ui/Dialog'
import { Icon } from '@/components/ui/Icon'
import { PriceTag } from '@/components/product/PriceTag'
import { categoryLabel, products } from '@/data/products'
import { popularSearches, searchProducts } from '@/lib/search'
import { Logo } from '@/components/ui/Logo'

/** Full-width search overlay with instant results from local product data. */
export function SearchOverlay() {
  const { searchOpen, closeSearch } = useUI()
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <Dialog open={searchOpen} onClose={closeSearch} label="Search" variant="top" initialFocusRef={inputRef} className="h-[100svh] sm:h-auto">
      <SearchBody inputRef={inputRef} onClose={closeSearch} />
    </Dialog>
  )
}

function SearchBody({ inputRef, onClose }: { inputRef: RefObject<HTMLInputElement | null>; onClose: () => void }) {
  const [query, setQuery] = useState('')
  const deferred = useDeferredValue(query)
  const navigate = useNavigate()
  const listId = useId()
  const results = searchProducts(deferred)
  const trimmed = deferred.trim()
  const suggestions = products.filter((p) => p.featured).slice(0, 4)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
      <div className="container-site flex items-center justify-between py-4">
        <Logo size="sm" />
        <CloseButton onClick={onClose} label="Close search" className="-mr-3" />
      </div>
      <div className="container-site pb-10 pt-4 sm:pt-8">
        <form role="search" onSubmit={submit} className="flex items-center gap-4 border-b border-ink pb-3">
          <Icon name="search" size={24} className="shrink-0" />
          <label htmlFor={`${listId}-input`} className="sr-only">
            Search products
          </label>
          <input
            ref={inputRef}
            id={`${listId}-input`}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search coats, cashmere, leather…"
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent py-2 font-display text-2xl outline-none placeholder:text-taupe/60 sm:text-4xl lg:text-5xl [&::-webkit-search-cancel-button]:hidden"
            aria-controls={listId}
          />
          {query && (
            <button type="button" onClick={() => { setQuery(''); inputRef.current?.focus() }} className="eyebrow shrink-0 text-taupe hover:text-ink">
              Clear
            </button>
          )}
        </form>

        <div id={listId} aria-live="polite" className="mt-8 sm:mt-10">
          {!trimmed && (
            <div className="grid gap-10 md:grid-cols-[1fr_2fr]">
              <div>
                <p className="eyebrow text-taupe">Popular searches</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {popularSearches.map((s) => (
                    <li key={s}>
                      <button type="button" onClick={() => setQuery(s)} className="border border-line-strong px-4 py-2 text-sm transition-colors hover:border-ink hover:bg-ink hover:text-ivory">
                        {s}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="eyebrow text-taupe">Most wanted</p>
                <ResultGrid items={suggestions} />
              </div>
            </div>
          )}

          {trimmed && results.length > 0 && (
            <>
              <div className="flex items-baseline justify-between gap-4">
                <p className="eyebrow text-taupe">
                  {results.length} {results.length === 1 ? 'result' : 'results'} for “{trimmed}”
                </p>
                <Link to={`/search?q=${encodeURIComponent(trimmed)}`} className="eyebrow link-underline-static">
                  View all
                </Link>
              </div>
              <ResultGrid items={results.slice(0, 8)} />
            </>
          )}

          {trimmed && results.length === 0 && (
            <div className="py-10 text-center sm:py-16">
              <p className="font-display text-3xl italic sm:text-4xl">Nothing found for “{trimmed}”.</p>
              <p className="mx-auto mt-4 max-w-md text-sm text-taupe">Check the spelling or try a broader term — such as a category, colour or material.</p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {popularSearches.slice(0, 4).map((s) => (
                  <button key={s} type="button" onClick={() => setQuery(s)} className="border border-line-strong px-4 py-2 text-sm hover:border-ink">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ResultGrid({ items }: { items: typeof products }) {
  return (
    <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4">
      {items.map((p) => (
        <li key={p.id}>
          <Link to={`/product/${p.slug}`} className="group block">
            <div className="overflow-hidden bg-sand">
              <img src={p.images[0]} alt="" className="aspect-[4/5] w-full object-cover transition-[scale] duration-700 ease-luxe group-hover:scale-[1.04]" loading="lazy" />
            </div>
            <p className="eyebrow mt-3 text-taupe">{categoryLabel(p.category)}</p>
            <p className="mt-1 font-display text-base leading-snug">
              <span className="link-underline">{p.name}</span>
            </p>
            <PriceTag price={p.price} className="mt-1 block text-sm" />
          </Link>
        </li>
      ))}
    </ul>
  )
}
