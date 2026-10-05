import { useRef, useState } from 'react'
import { Link, useParams } from 'react-router'
import type { Product as ProductType } from '@/types'
import { availableSizes, categoryLabel, getProductBySlug, getRelatedProducts, isSingleSize } from '@/data/products'
import { collections } from '@/data/collections'
import { site } from '@/config/site'
import { useSeo } from '@/hooks/useSeo'
import { useUI } from '@/hooks/useStore'
import { useAddToBag } from '@/hooks/useAddToBag'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { Button } from '@/components/ui/Button'
import { Accordion } from '@/components/ui/Accordion'
import { QuantitySelector } from '@/components/ui/QuantitySelector'
import { Icon } from '@/components/ui/Icon'
import { ColorSelector } from '@/components/product/ColorSelector'
import { SizeSelector } from '@/components/product/SizeSelector'
import { WishlistButton } from '@/components/product/WishlistButton'
import { PriceTag } from '@/components/product/PriceTag'
import { ProductGrid } from '@/components/product/ProductGrid'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { sizeTableFor } from '@/components/product/sizeTableFor'
import { formatPrice } from '@/lib/format'
import { cn } from '@/lib/cn'
import NotFound from './NotFound'

export default function Product() {
  const { slug = '' } = useParams()
  const product = getProductBySlug(slug)
  if (!product) return <NotFound />
  return <ProductView key={product.id} product={product} />
}

function ProductView({ product }: { product: ProductType }) {
  useSeo({ title: product.name, description: product.summary, type: 'product' })
  const { openSizeGuide } = useUI()
  const addToBag = useAddToBag()
  const single = isSingleSize(product)
  const [color, setColor] = useState(product.colors[0].name)
  const [size, setSize] = useState(single ? product.sizes[0] : '')
  const [qty, setQty] = useState(1)
  const [error, setError] = useState(false)
  const [active, setActive] = useState(0)
  const galleryRef = useRef<HTMLDivElement>(null)
  const soldOutAll = availableSizes(product).length === 0
  const related = getRelatedProducts(product, 4)
  const collection = collections.find((c) => product.collections.includes(c.slug))

  const submit = () => {
    if (!size) {
      setError(true)
      return
    }
    addToBag(product, { color, size, quantity: qty })
  }

  // Mobile gallery: keep thumbnails/dots in sync with swipe position
  const onGalleryScroll = () => {
    const el = galleryRef.current
    if (!el) return
    const i = Math.round(el.scrollLeft / el.clientWidth)
    if (i !== active) setActive(i)
  }
  const goTo = (i: number) => {
    setActive(i)
    const el = galleryRef.current
    if (el && el.scrollWidth > el.clientWidth) el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' })
  }

  return (
    <>
      <div className="container-site pt-6 sm:pt-8">
        <Breadcrumbs
          items={[
            { label: 'Home', to: '/' },
            { label: categoryLabel(product.category), to: `/shop?category=${product.category}` },
            { label: product.name },
          ]}
        />
      </div>

      <section className="container-site grid gap-10 pb-20 pt-6 lg:grid-cols-12 lg:gap-x-10 lg:pt-10 xl:gap-x-16">
        {/* Gallery */}
        <div className="min-w-0 lg:col-span-7">
          <div className="flex gap-4">
            <ul className="hidden w-20 shrink-0 flex-col gap-3 md:flex" aria-label="Product images">
              {product.images.map((src, i) => (
                <li key={src}>
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Show image ${i + 1} of ${product.images.length}`}
                    aria-current={active === i}
                    className={cn('block w-full overflow-hidden border transition-opacity', active === i ? 'border-ink' : 'border-transparent opacity-65 hover:opacity-100')}
                  >
                    <img src={src} alt="" className="aspect-[4/5] w-full bg-sand object-cover" />
                  </button>
                </li>
              ))}
            </ul>

            <div className="relative min-w-0 flex-1">
              {/* Mobile: swipeable; Desktop: single large image */}
              <div
                ref={galleryRef}
                onScroll={onGalleryScroll}
                className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto md:block md:overflow-visible"
                aria-roledescription="carousel"
                aria-label={`${product.name} images`}
              >
                {product.images.map((src, i) => (
                  <div
                    key={src}
                    className={cn('w-full shrink-0 snap-center bg-sand', i !== active && 'md:hidden')}
                    aria-hidden={i !== active}
                  >
                    <img
                      src={src}
                      alt={`${product.name} in ${color} — view ${i + 1}`}
                      loading={i === 0 ? 'eager' : 'lazy'}
                      fetchPriority={i === 0 ? 'high' : undefined}
                      className="aspect-[4/5] w-full object-cover"
                    />
                  </div>
                ))}
              </div>

              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 md:hidden">
                {product.images.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Show image ${i + 1}`}
                    aria-current={active === i}
                    className="flex size-6 items-center justify-center"
                  >
                    <span className={cn('h-px transition-all', active === i ? 'w-6 bg-ink' : 'w-3 bg-ink/40')} />
                  </button>
                ))}
              </div>

              <div className="absolute bottom-4 right-4 hidden gap-1 md:flex">
                <button type="button" onClick={() => goTo((active - 1 + product.images.length) % product.images.length)} aria-label="Previous image" className="inline-flex size-11 items-center justify-center bg-ivory/90 hover:bg-ivory">
                  <Icon name="arrowLeft" size={16} />
                </button>
                <button type="button" onClick={() => goTo((active + 1) % product.images.length)} aria-label="Next image" className="inline-flex size-11 items-center justify-center bg-ivory/90 hover:bg-ivory">
                  <Icon name="arrowRight" size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="min-w-0 lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <div className="flex items-start justify-between gap-4">
              <div>
                {collection && (
                  <Link to={`/collections/${collection.slug}`} className="eyebrow link-underline text-taupe hover:text-ink">
                    {collection.name}
                  </Link>
                )}
                <h1 className="mt-3 font-display text-[clamp(2.1rem,3.6vw,3.25rem)] leading-[1.02]">{product.name}</h1>
              </div>
              <WishlistButton product={product} className="-mr-2 -mt-1 shrink-0" />
            </div>
            <PriceTag price={product.price} className="mt-4 block text-xl" />
            <p className="mt-1 text-xs text-taupe">Duties and taxes calculated at checkout (demo).</p>

            <p className="mt-7 text-[0.98rem] leading-relaxed text-taupe">{product.description}</p>

            <div className="mt-9 space-y-8">
              <ColorSelector colors={product.colors} value={color} onChange={setColor} />
              {!single && (
                <SizeSelector
                  sizes={product.sizes}
                  soldOut={product.soldOutSizes}
                  value={size}
                  onChange={(s) => {
                    setSize(s)
                    setError(false)
                  }}
                  onSizeGuide={() => openSizeGuide(sizeTableFor(product))}
                  error={error}
                />
              )}
              <div className="flex items-end gap-4">
                <div>
                  <p className="eyebrow mb-3 text-taupe">
                    Quantity
                  </p>
                  <QuantitySelector value={qty} onChange={setQty} />
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-2">
              <Button size="lg" className="flex-1" onClick={submit} disabled={soldOutAll}>
                {soldOutAll ? 'Sold out' : `Add to bag — ${formatPrice(product.price * qty)}`}
              </Button>
              <div className="hidden sm:block">
                <WishlistButton product={product} variant="full" className="h-full" />
              </div>
            </div>

            <ul className="mt-8 grid gap-3 text-[0.85rem] text-taupe">
              <li className="flex items-center gap-3">
                <Icon name="truck" size={18} className="text-ink" />
                Complimentary delivery on orders over {formatPrice(site.commerce.freeShippingThreshold)}
              </li>
              <li className="flex items-center gap-3">
                <Icon name="returns" size={18} className="text-ink" />
                Complimentary returns within 30 days
              </li>
            </ul>

            <Accordion
              className="mt-10"
              defaultOpen={['details']}
              items={[
                {
                  id: 'details',
                  title: 'Details & fit',
                  content: (
                    <ul className="list-inside list-disc space-y-1.5 marker:text-brass">
                      {product.details.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  ),
                },
                {
                  id: 'composition',
                  title: 'Composition & care',
                  content: (
                    <div className="space-y-3">
                      <p>
                        <span className="text-ink">Composition:</span> {product.composition}
                      </p>
                      <p>
                        <span className="text-ink">Care:</span> {product.care}
                      </p>
                      <p>{product.madeIn}.</p>
                    </div>
                  ),
                },
                {
                  id: 'shipping',
                  title: 'Shipping',
                  content: (
                    <p>
                      Standard delivery in 3 – 5 business days, complimentary over {formatPrice(site.commerce.freeShippingThreshold)}.
                      Express (1 – 2 days) and same-day atelier courier available at checkout. Every order arrives in our
                      signature recyclable packaging.
                    </p>
                  ),
                },
                {
                  id: 'returns',
                  title: 'Returns & exchanges',
                  content: (
                    <p>
                      Unworn pieces may be returned within 30 days of delivery in their original packaging. Returns and
                      exchanges are complimentary. See our <Link to="/terms" className="link-underline-static text-ink">terms</Link> for details.
                    </p>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container-site border-t border-line pb-[var(--spacing-section)] pt-20" aria-labelledby="related-title">
          <SectionHeader id="related-title" eyebrow="Complete the look" title={<>You may also <em>like</em></>} />
          <ProductGrid products={related} className="mt-12" />
        </section>
      )}
    </>
  )
}
