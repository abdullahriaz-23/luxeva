import { Link } from 'react-router'
import { useCart } from '@/hooks/useStore'
import { useSeo } from '@/hooks/useSeo'
import { PageHeader } from '@/components/ui/PageHeader'
import { ButtonLink } from '@/components/ui/Button'
import { CartItem } from '@/components/cart/CartItem'
import { FreeShippingBar } from '@/components/cart/FreeShippingBar'
import { estimateShipping, estimateTax } from '@/components/cart/totals'
import { ProductGrid } from '@/components/product/ProductGrid'
import { DemoNotice } from '@/components/ui/DemoNotice'
import { Icon } from '@/components/ui/Icon'
import { products } from '@/data/products'
import { formatPrice } from '@/lib/format'

export default function Cart() {
  useSeo({ title: 'Shopping bag', noindex: true })
  const { lines, count, subtotal, clear } = useCart()
  const shipping = estimateShipping(subtotal)
  const tax = estimateTax(subtotal)
  const total = subtotal + shipping + tax
  const suggestions = products.filter((p) => p.featured && !lines.some((l) => l.productId === p.id)).slice(0, 4)

  if (lines.length === 0) {
    return (
      <>
        <PageHeader crumbs={[{ label: 'Home', to: '/' }, { label: 'Bag' }]} eyebrow="Shopping bag" title={<>Your bag is <em>empty.</em></>} intro="Pieces you add will appear here and are saved on this device." aside={<ButtonLink to="/shop" size="lg" arrow>Continue shopping</ButtonLink>} />
        <section className="container-site border-t border-line pb-[var(--spacing-section)] pt-16">
          <p className="eyebrow text-taupe">Most wanted</p>
          <ProductGrid products={suggestions} className="mt-8" />
        </section>
      </>
    )
  }

  return (
    <>
      <PageHeader crumbs={[{ label: 'Home', to: '/' }, { label: 'Bag' }]} eyebrow={`${count} ${count === 1 ? 'item' : 'items'}`} title="Shopping bag" />
      <section className="container-site grid gap-12 pb-[var(--spacing-section)] lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-7 xl:col-span-8">
          <div className="flex items-center justify-between border-b border-line pb-4">
            <p className="label">Items</p>
            <button type="button" onClick={clear} className="eyebrow link-underline-static text-taupe hover:text-ink">
              Clear bag
            </button>
          </div>
          <ul className="divide-y divide-line border-b border-line">
            {lines.map((line) => (
              <CartItem key={line.key} line={line} />
            ))}
          </ul>
          <Link to="/shop" className="eyebrow mt-8 inline-flex items-center gap-3 link-underline-static">
            <Icon name="arrowLeft" size={14} /> Continue shopping
          </Link>
        </div>

        <aside className="lg:col-span-5 xl:col-span-4" aria-labelledby="summary-title">
          <div className="bg-cream p-6 sm:p-8 lg:sticky lg:top-28">
            <h2 id="summary-title" className="font-display text-2xl">Order summary</h2>
            <div className="mt-6">
              <FreeShippingBar subtotal={subtotal} />
            </div>
            <dl className="mt-8 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-taupe">Subtotal</dt>
                <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-taupe">Estimated shipping</dt>
                <dd className="tabular-nums">{shipping === 0 ? 'Complimentary' : formatPrice(shipping)}</dd>
              </div>
              {tax > 0 && (
                <div className="flex justify-between">
                  <dt className="text-taupe">Estimated tax</dt>
                  <dd className="tabular-nums">{formatPrice(tax)}</dd>
                </div>
              )}
              <div className="flex justify-between border-t border-line-strong pt-4 text-base">
                <dt>Estimated total</dt>
                <dd className="font-medium tabular-nums">{formatPrice(total)}</dd>
              </div>
            </dl>
            <ButtonLink to="/checkout" size="lg" arrow className="mt-8 w-full">
              Proceed to checkout
            </ButtonLink>
            <DemoNotice className="mt-5">
              Template demo — checkout is a frontend demonstration. No payment is taken and no order is placed.
            </DemoNotice>
            <ul className="mt-6 space-y-2 text-xs text-taupe">
              <li className="flex items-center gap-2"><Icon name="returns" size={16} /> Complimentary 30-day returns</li>
              <li className="flex items-center gap-2"><Icon name="lock" size={16} /> Bag saved on this device</li>
            </ul>
          </div>
        </aside>
      </section>
    </>
  )
}
