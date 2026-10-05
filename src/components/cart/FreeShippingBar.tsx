import { site } from '@/config/site'
import { formatPrice } from '@/lib/format'

export function FreeShippingBar({ subtotal }: { subtotal: number }) {
  const threshold = site.commerce.freeShippingThreshold
  const remaining = Math.max(0, threshold - subtotal)
  const pct = Math.min(100, (subtotal / threshold) * 100)
  return (
    <div>
      <p className="text-[0.8rem] text-taupe">
        {remaining > 0 ? (
          <>
            You are <span className="text-ink">{formatPrice(remaining)}</span> away from complimentary delivery.
          </>
        ) : (
          <span className="text-ink">Your order qualifies for complimentary delivery.</span>
        )}
      </p>
      <div className="mt-3 h-px w-full bg-line" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pct)} aria-label="Progress towards complimentary delivery">
        <div className="h-px bg-ink transition-[width] duration-700 ease-luxe" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
