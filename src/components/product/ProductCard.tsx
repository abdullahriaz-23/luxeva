import { Link } from 'react-router'
import type { Product } from '@/types'
import { categoryLabel, isSingleSize } from '@/data/products'
import { useUI } from '@/hooks/useStore'
import { useAddToBag } from '@/hooks/useAddToBag'
import { cn } from '@/lib/cn'
import { WishlistButton } from './WishlistButton'
import { PriceTag } from './PriceTag'
import { Icon } from '@/components/ui/Icon'

interface ProductCardProps {
  product: Product
  className?: string
  /** Eager-load the image (use for the first row above the fold) */
  priority?: boolean
  /** Small index shown above the card, e.g. "01" */
  index?: string
  sizes?: 'default' | 'compact'
}

/**
 * Editorial product card:
 * image swap + subtle zoom on hover, wishlist, quick view and quick add for one-size pieces.
 */
export function ProductCard({ product, className, priority, index, sizes = 'default' }: ProductCardProps) {
  const { openQuickView } = useUI()
  const addToBag = useAddToBag()
  const href = `/product/${product.slug}`
  const [primary, secondary] = product.images
  const oneSize = isSingleSize(product)

  return (
    <article className={cn('group/card relative', className)}>
      <div className="relative overflow-hidden bg-sand">
        <div className="aspect-[4/5]">
          <img
            src={primary}
            alt=""
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-[scale,opacity] duration-[1200ms] ease-luxe group-hover/card:scale-[1.035]"
          />
          {secondary && (
            <img
              src={secondary}
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-[opacity,scale] duration-700 ease-luxe group-hover/card:scale-[1.035] group-hover/card:opacity-100"
            />
          )}
        </div>

        {product.newArrival && (
          <span className="pointer-events-none absolute left-3 top-3 bg-ivory/90 px-2.5 py-1 text-[0.6rem] font-medium uppercase tracking-[0.2em] sm:left-4 sm:top-4">
            New
          </span>
        )}

        <WishlistButton product={product} className="absolute right-1 top-1 z-10 sm:right-2 sm:top-2" />

        {/* Quick actions — always visible on touch, revealed on hover/focus with a pointer */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-end p-2 transition-[opacity,translate] duration-500 ease-luxe sm:p-3 [@media(hover:hover)]:translate-y-2 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover/card:translate-y-0 [@media(hover:hover)]:group-hover/card:opacity-100 [@media(hover:hover)]:group-focus-within/card:translate-y-0 [@media(hover:hover)]:group-focus-within/card:opacity-100">
          <div className="flex w-full items-stretch justify-end gap-px [@media(hover:hover)]:justify-stretch">
            <button
              type="button"
              onClick={() => openQuickView(product)}
              className="pointer-events-auto inline-flex min-h-11 min-w-11 items-center justify-center gap-2 bg-ivory/95 px-3 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:bg-ink hover:text-ivory [@media(hover:hover)]:flex-1"
              aria-label={`Quick view ${product.name}`}
            >
              <Icon name="eye" size={16} />
              <span className="hidden [@media(hover:hover)]:inline">Quick view</span>
            </button>
            {oneSize && (
              <button
                type="button"
                onClick={() => addToBag(product, { color: product.colors[0].name, size: product.sizes[0] }, 'toast')}
                className="pointer-events-auto inline-flex min-h-11 min-w-11 items-center justify-center gap-2 bg-ivory/95 px-3 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:bg-ink hover:text-ivory [@media(hover:hover)]:flex-1"
                aria-label={`Add ${product.name} to bag`}
              >
                <Icon name="bag" size={16} />
                <span className="hidden [@media(hover:hover)]:inline">Add</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className={cn('flex items-start justify-between gap-3', sizes === 'compact' ? 'pt-3' : 'pt-4')}>
        <div className="min-w-0">
          <p className="eyebrow mb-1.5 text-taupe">
            {index && <span className="mr-2 font-display text-xs normal-case italic tracking-normal">{index}</span>}
            {categoryLabel(product.category)}
          </p>
          <h3 className={cn('font-display leading-snug', sizes === 'compact' ? 'text-base' : 'text-[1.05rem] sm:text-lg')}>
            <Link to={href} className="link-underline after:absolute after:inset-0 after:content-['']">
              {product.name}
            </Link>
          </h3>
        </div>
        <PriceTag price={product.price} className="shrink-0 pt-[1.35rem] text-sm" />
      </div>
      {product.colors.length > 1 && (
        <ul className="mt-2.5 flex items-center gap-1.5" aria-label={`Available in ${product.colors.map((c) => c.name).join(', ')}`}>
          {product.colors.map((c) => (
            <li key={c.name} className="size-2.5 rounded-full ring-1 ring-ink/20" style={{ backgroundColor: c.hex }} title={c.name} />
          ))}
        </ul>
      )}
    </article>
  )
}
