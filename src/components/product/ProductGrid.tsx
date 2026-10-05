import type { Product } from '@/types'
import { cn } from '@/lib/cn'
import { ProductCard } from './ProductCard'

/** Responsive product grid: 2 columns on mobile, up to 4 on wide screens. */
export function ProductGrid({
  products,
  columns = 4,
  className,
  priorityCount = 0,
}: {
  products: Product[]
  columns?: 3 | 4
  className?: string
  priorityCount?: number
}) {
  return (
    <ul
      className={cn(
        'grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 md:gap-y-14',
        columns === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3',
        className,
      )}
    >
      {products.map((p, i) => (
        <li key={p.id}>
          <ProductCard product={p} priority={i < priorityCount} />
        </li>
      ))}
    </ul>
  )
}
