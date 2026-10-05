import { site } from '@/config/site'
import { formatPrice } from '@/lib/format'

export function AnnouncementBar() {
  return (
    <div className="bg-ink text-ivory">
      <p className="container-site flex h-9 items-center justify-center gap-3 text-center text-[0.62rem] font-medium uppercase tracking-[0.2em]">
        <span>Complimentary delivery over {formatPrice(site.commerce.freeShippingThreshold)}</span>
        <span aria-hidden="true" className="hidden opacity-50 sm:inline">·</span>
        <span className="hidden text-ivory/70 sm:inline">Demo storefront — no real orders are processed</span>
      </p>
    </div>
  )
}
