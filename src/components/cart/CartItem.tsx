import { Link } from 'react-router'
import type { ResolvedCartLine } from '@/context/contexts'
import { useCart } from '@/hooks/useStore'
import { QuantitySelector } from '@/components/ui/QuantitySelector'
import { PriceTag } from '@/components/product/PriceTag'
import { cn } from '@/lib/cn'

/** A single line in the bag (drawer + cart page). */
export function CartItem({ line, compact = false }: { line: ResolvedCartLine; compact?: boolean }) {
  const { setQuantity, remove } = useCart()
  const { product } = line
  const href = `/product/${product.slug}`

  return (
    <li className={cn('flex gap-4 sm:gap-6', compact ? 'py-5' : 'py-7')}>
      <Link to={href} className={cn('shrink-0 overflow-hidden bg-sand', compact ? 'w-22 sm:w-24' : 'w-24 sm:w-36')} tabIndex={-1} aria-hidden="true">
        <img src={product.images[0]} alt="" className="aspect-[4/5] h-auto w-full object-cover" loading="lazy" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className={cn('font-display leading-snug', compact ? 'text-base' : 'text-lg sm:text-xl')}>
              <Link to={href} className="link-underline">
                {product.name}
              </Link>
            </h3>
            <p className="mt-1.5 text-[0.8rem] text-taupe">
              {line.color}
              {line.size !== 'One Size' && <> · Size {line.size}</>}
            </p>
          </div>
          <PriceTag price={line.lineTotal} className="shrink-0 text-sm" />
        </div>
        {!compact && line.quantity > 1 && (
          <p className="mt-1 text-xs text-taupe">
            <PriceTag price={product.price} /> each
          </p>
        )}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
          <QuantitySelector
            size="sm"
            value={line.quantity}
            onChange={(q) => setQuantity(line.key, q)}
            label={`quantity for ${product.name}`}
          />
          <button
            type="button"
            onClick={() => remove(line.key)}
            className="eyebrow link-underline-static text-taupe hover:text-ink"
            aria-label={`Remove ${product.name} from bag`}
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  )
}
