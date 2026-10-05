import { formatPrice } from '@/lib/format'
import { cn } from '@/lib/cn'

export function PriceTag({ price, className }: { price: number; className?: string }) {
  return <span className={cn('tabular-nums', className)}>{formatPrice(price)}</span>
}
