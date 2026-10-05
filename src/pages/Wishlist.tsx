import { useState } from 'react'
import { Link } from 'react-router'
import type { Product } from '@/types'
import { availableSizes, categoryLabel, getProductById, isSingleSize, products } from '@/data/products'
import { useWishlist } from '@/hooks/useStore'
import { useAddToBag } from '@/hooks/useAddToBag'
import { useSeo } from '@/hooks/useSeo'
import { PageHeader } from '@/components/ui/PageHeader'
import { Button, ButtonLink } from '@/components/ui/Button'
import { PriceTag } from '@/components/product/PriceTag'
import { ProductGrid } from '@/components/product/ProductGrid'

export default function Wishlist() {
  useSeo({ title: 'Wishlist', noindex: true })
  const { ids } = useWishlist()
  const items = ids.map(getProductById).filter((p): p is Product => Boolean(p))

  if (items.length === 0) {
    return (
      <>
        <PageHeader
          crumbs={[{ label: 'Home', to: '/' }, { label: 'Wishlist' }]}
          eyebrow="Wishlist"
          title={<>Nothing saved <em>yet.</em></>}
          intro="Tap the heart on any piece to save it here. Your wishlist is kept on this device."
          aside={<ButtonLink to="/shop" size="lg" arrow>Discover the collection</ButtonLink>}
        />
        <section className="container-site border-t border-line pb-[var(--spacing-section)] pt-16">
          <p className="eyebrow text-taupe">You might begin with</p>
          <ProductGrid products={products.filter((p) => p.featured).slice(0, 4)} className="mt-8" />
        </section>
      </>
    )
  }

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Wishlist' }]}
        eyebrow={`${items.length} saved ${items.length === 1 ? 'piece' : 'pieces'}`}
        title="Wishlist"
        intro="Saved on this device. Move pieces to your bag when you are ready."
      />
      <section className="container-site pb-[var(--spacing-section)]">
        <ul className="grid grid-cols-1 gap-x-6 gap-y-14 border-t border-line pt-10 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((p) => (
            <WishlistItem key={p.id} product={p} />
          ))}
        </ul>
      </section>
    </>
  )
}

function WishlistItem({ product }: { product: Product }) {
  const { remove } = useWishlist()
  const addToBag = useAddToBag()
  const single = isSingleSize(product)
  const [size, setSize] = useState(single ? product.sizes[0] : '')
  const [error, setError] = useState(false)
  const sizes = availableSizes(product)

  const moveToBag = () => {
    if (!size) {
      setError(true)
      return
    }
    addToBag(product, { color: product.colors[0].name, size }, 'toast')
    remove(product.id)
  }

  return (
    <li className="flex flex-col">
      <Link to={`/product/${product.slug}`} className="group block overflow-hidden bg-sand">
        <img src={product.images[0]} alt={product.name} loading="lazy" className="aspect-[4/5] w-full object-cover transition-[scale] duration-700 ease-luxe group-hover:scale-[1.03]" />
      </Link>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <p className="eyebrow text-taupe">{categoryLabel(product.category)}</p>
          <h2 className="mt-1.5 font-display text-lg leading-snug">
            <Link to={`/product/${product.slug}`} className="link-underline">
              {product.name}
            </Link>
          </h2>
          <p className="mt-1 text-xs text-taupe">{product.colors[0].name}</p>
        </div>
        <PriceTag price={product.price} className="text-sm" />
      </div>
      <div className="mt-auto pt-5">
        {!single && (
          <div className="mb-3">
            <label htmlFor={`size-${product.id}`} className="sr-only">
              Size for {product.name}
            </label>
            <select
              id={`size-${product.id}`}
              value={size}
              onChange={(e) => {
                setSize(e.target.value)
                setError(false)
              }}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? `size-err-${product.id}` : undefined}
              className="field-input !min-h-11 text-sm"
            >
              <option value="">Select size</option>
              {sizes.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {error && (
              <p id={`size-err-${product.id}`} role="alert" className="mt-2 text-xs text-danger">
                Please select a size first.
              </p>
            )}
          </div>
        )}
        <div className="grid grid-cols-[1fr_auto] gap-2">
          <Button onClick={moveToBag} size="sm" disabled={sizes.length === 0}>
            Move to bag
          </Button>
          <Button variant="ghost" size="sm" onClick={() => remove(product.id)} aria-label={`Remove ${product.name} from wishlist`}>
            Remove
          </Button>
        </div>
      </div>
    </li>
  )
}
