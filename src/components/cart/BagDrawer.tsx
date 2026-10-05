import { useId } from 'react'
import { useCart, useUI } from '@/hooks/useStore'
import { Dialog, CloseButton } from '@/components/ui/Dialog'
import { ButtonLink } from '@/components/ui/Button'
import { formatPrice } from '@/lib/format'
import { CartItem } from './CartItem'
import { FreeShippingBar } from './FreeShippingBar'
import { estimateShipping } from './totals'

/** Slide-in bag drawer, opened after adding to bag or from the header. */
export function BagDrawer() {
  const { bagOpen, closeBag } = useUI()
  const { lines, count, subtotal } = useCart()
  const titleId = useId()
  const shipping = estimateShipping(subtotal)

  return (
    <Dialog open={bagOpen} onClose={closeBag} labelledBy={titleId} variant="right">
      <div className="flex items-center justify-between border-b border-line px-6 py-4 sm:px-8">
        <h2 id={titleId} className="label">
          Your bag <span className="text-taupe">({count})</span>
        </h2>
        <CloseButton onClick={closeBag} label="Close bag" className="-mr-3" />
      </div>

      {lines.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 text-center">
          <p className="font-display text-3xl italic">Your bag is empty.</p>
          <p className="max-w-xs text-sm text-taupe">Discover the new season — considered essentials and refined silhouettes.</p>
          <ButtonLink to="/shop" arrow>
            Shop New In
          </ButtonLink>
        </div>
      ) : (
        <>
          <div className="border-b border-line px-6 py-5 sm:px-8">
            <FreeShippingBar subtotal={subtotal} />
          </div>
          <ul className="min-h-0 flex-1 divide-y divide-line overflow-y-auto px-6 sm:px-8">
            {lines.map((line) => (
              <CartItem key={line.key} line={line} compact />
            ))}
          </ul>
          <div className="border-t border-line bg-cream px-6 py-6 sm:px-8">
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-taupe">Subtotal</dt>
                <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-taupe">Estimated shipping</dt>
                <dd className="tabular-nums">{shipping === 0 ? 'Complimentary' : formatPrice(shipping)}</dd>
              </div>
            </dl>
            <div className="mt-5 grid grid-cols-2 gap-2">
              <ButtonLink to="/cart" variant="secondary">
                View bag
              </ButtonLink>
              <ButtonLink to="/checkout">Checkout</ButtonLink>
            </div>
            <p className="mt-4 text-center text-[0.7rem] text-taupe">Demo store — checkout is a frontend demonstration.</p>
          </div>
        </>
      )}
    </Dialog>
  )
}
