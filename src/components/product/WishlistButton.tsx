import type { Product } from '@/types'
import { useToast, useWishlist } from '@/hooks/useStore'
import { cn } from '@/lib/cn'

export function WishlistButton({
  product,
  className,
  variant = 'icon',
}: {
  product: Product
  className?: string
  variant?: 'icon' | 'full'
}) {
  const { has, toggle } = useWishlist()
  const { notify } = useToast()
  const saved = has(product.id)

  const onClick = () => {
    toggle(product)
    notify({
      title: saved ? 'Removed from wishlist' : 'Saved to wishlist',
      description: product.name,
      image: product.images[0],
      action: saved ? undefined : { label: 'View wishlist', to: '/wishlist' },
    })
  }

  const heart = (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" className="transition-transform duration-300 ease-luxe group-active/wish:scale-90">
      <path
        d="M12 20.3s-7.8-4.7-8.9-10.1C2.4 6.7 4.6 4 7.6 4c1.9 0 3.4 1 4.4 2.6C13 5 14.5 4 16.4 4c3 0 5.2 2.7 4.5 6.2-1.1 5.4-8.9 10.1-8.9 10.1Z"
        fill={saved ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.25"
      />
    </svg>
  )

  if (variant === 'full') {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={saved}
        className={cn(
          'group/wish inline-flex min-h-14 items-center justify-center gap-3 border border-line-strong px-6 text-[0.7rem] font-medium uppercase tracking-[0.18em] transition-colors hover:border-ink',
          className,
        )}
      >
        {heart}
        {saved ? 'Saved' : 'Save'}
        <span className="sr-only"> {product.name} {saved ? '(remove from wishlist)' : 'to wishlist'}</span>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
      className={cn(
        'group/wish inline-flex size-11 items-center justify-center text-ink transition-opacity hover:opacity-70',
        className,
      )}
    >
      {heart}
    </button>
  )
}
