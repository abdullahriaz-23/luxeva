import { useState, type FormEvent, type ReactNode } from 'react'
import type { Order } from '@/types'
import { deliveryMethods, site, type DeliveryMethodId } from '@/config/site'
import { useCart, useOrders } from '@/hooks/useStore'
import { useSeo } from '@/hooks/useSeo'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { Button, ButtonLink } from '@/components/ui/Button'
import { TextField, SelectField } from '@/components/ui/Field'
import { DemoNotice } from '@/components/ui/DemoNotice'
import { Icon } from '@/components/ui/Icon'
import { estimateTax } from '@/components/cart/totals'
import { formatPrice } from '@/lib/format'
import { cn } from '@/lib/cn'

type FormState = {
  email: string
  firstName: string
  lastName: string
  address: string
  apartment: string
  city: string
  postcode: string
  country: string
  phone: string
}

const empty: FormState = { email: '', firstName: '', lastName: '', address: '', apartment: '', city: '', postcode: '', country: 'United States', phone: '' }
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const countries = ['United States', 'United Kingdom', 'France', 'Italy', 'Germany', 'Spain', 'Japan', 'Canada', 'Australia', 'United Arab Emirates']

function validate(f: FormState) {
  const e: Partial<Record<keyof FormState, string>> = {}
  if (!EMAIL.test(f.email.trim())) e.email = 'Enter a valid email address.'
  if (!f.firstName.trim()) e.firstName = 'First name is required.'
  if (!f.lastName.trim()) e.lastName = 'Last name is required.'
  if (f.address.trim().length < 4) e.address = 'Enter your street address.'
  if (!f.city.trim()) e.city = 'City is required.'
  if (f.postcode.trim().length < 3) e.postcode = 'Enter a valid postcode.'
  return e
}

export default function Checkout() {
  useSeo({ title: 'Checkout', noindex: true })
  const { lines, subtotal, clear } = useCart()
  const { addOrder } = useOrders()
  const [form, setForm] = useState<FormState>(empty)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [delivery, setDelivery] = useState<DeliveryMethodId>('standard')
  const [payment, setPayment] = useState<'card' | 'later'>('card')
  const [placing, setPlacing] = useState(false)
  const [confirmed, setConfirmed] = useState<{ order: Order; name: string; email: string } | null>(null)

  const method = deliveryMethods.find((d) => d.id === delivery) ?? deliveryMethods[0]
  const shipping = delivery === 'standard' && subtotal >= site.commerce.freeShippingThreshold ? 0 : method.price
  const tax = estimateTax(subtotal)
  const total = subtotal + shipping + tax

  const set = (key: keyof FormState) => (e: { target: { value: string } }) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }))
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const found = validate(form)
    setErrors(found)
    const first = Object.keys(found)[0]
    if (first) {
      document.getElementById(`co-${first}`)?.focus()
      return
    }
    setPlacing(true)
    // Simulated processing delay — replace with your payment provider integration.
    window.setTimeout(() => {
      const order: Order = {
        id: `LX-${Date.now().toString().slice(-6)}`,
        date: new Date().toISOString().slice(0, 10),
        lines: lines.map((l) => ({
          productId: l.productId,
          name: l.product.name,
          color: l.color,
          size: l.size,
          quantity: l.quantity,
          price: l.product.price,
          image: l.product.images[0],
        })),
        subtotal,
        shipping,
        total,
        delivery: method.name,
        status: 'Processing',
      }
      addOrder(order)
      clear()
      setConfirmed({ order, name: form.firstName.trim(), email: form.email.trim() })
      setPlacing(false)
      window.scrollTo({ top: 0 })
    }, 900)
  }

  if (confirmed) return <Confirmation {...confirmed} />

  if (lines.length === 0) {
    return (
      <section className="container-site flex min-h-[60svh] flex-col items-center justify-center py-24 text-center">
        <p className="eyebrow text-taupe">Checkout</p>
        <h1 className="display-lg mt-5">Your bag is empty.</h1>
        <p className="mt-4 max-w-sm text-taupe">Add a few pieces to your bag to try the demo checkout.</p>
        <ButtonLink to="/shop" size="lg" arrow className="mt-10">
          Shop the collection
        </ButtonLink>
      </section>
    )
  }

  return (
    <div className="container-site pb-[var(--spacing-section)] pt-8 sm:pt-10">
      <Breadcrumbs items={[{ label: 'Bag', to: '/cart' }, { label: 'Checkout' }]} />
      <h1 className="display-lg mt-8">Checkout</h1>

      <form onSubmit={submit} noValidate className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-x-12">
        <div className="space-y-14 lg:col-span-7">
          <DemoNotice>
            <strong className="font-medium">Template demo.</strong> This checkout is a frontend demonstration: no payment is
            processed, no order is sent and no personal data leaves your browser.
          </DemoNotice>

          <Step n="01" title="Contact">
            <TextField id="co-email" label="Email address" type="email" autoComplete="email" required value={form.email} onChange={set('email')} error={errors.email} hint="For your order confirmation (not sent in this demo)." />
          </Step>

          <Step n="02" title="Shipping address">
            <div className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
              <TextField id="co-firstName" label="First name" autoComplete="given-name" required value={form.firstName} onChange={set('firstName')} error={errors.firstName} />
              <TextField id="co-lastName" label="Last name" autoComplete="family-name" required value={form.lastName} onChange={set('lastName')} error={errors.lastName} />
              <TextField id="co-address" label="Street address" autoComplete="address-line1" required value={form.address} onChange={set('address')} error={errors.address} className="sm:col-span-2" />
              <TextField id="co-apartment" label="Apartment, suite (optional)" autoComplete="address-line2" value={form.apartment} onChange={set('apartment')} className="sm:col-span-2" />
              <TextField id="co-city" label="City" autoComplete="address-level2" required value={form.city} onChange={set('city')} error={errors.city} />
              <TextField id="co-postcode" label="Postcode" autoComplete="postal-code" required value={form.postcode} onChange={set('postcode')} error={errors.postcode} />
              <SelectField id="co-country" label="Country" autoComplete="country-name" value={form.country} onChange={set('country')}>
                {countries.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </SelectField>
              <TextField id="co-phone" label="Phone (optional)" type="tel" autoComplete="tel" value={form.phone} onChange={set('phone')} />
            </div>
          </Step>

          <Step n="03" title="Delivery method">
            <fieldset>
              <legend className="sr-only">Delivery method</legend>
              <div className="divide-y divide-line border border-line">
                {deliveryMethods.map((d) => {
                  const price = d.id === 'standard' && subtotal >= site.commerce.freeShippingThreshold ? 0 : d.price
                  return (
                    <label key={d.id} className={cn('flex cursor-pointer items-center gap-4 px-5 py-4 transition-colors', delivery === d.id ? 'bg-cream' : 'hover:bg-cream/60')}>
                      <input type="radio" name="delivery" value={d.id} checked={delivery === d.id} onChange={() => setDelivery(d.id)} className="peer sr-only" />
                      <Radio checked={delivery === d.id} />
                      <span className="flex-1">
                        <span className="block text-[0.95rem]">{d.name}</span>
                        <span className="block text-xs text-taupe">{d.detail}</span>
                      </span>
                      <span className="text-sm tabular-nums">{price === 0 ? 'Complimentary' : formatPrice(price)}</span>
                    </label>
                  )
                })}
              </div>
            </fieldset>
          </Step>

          <Step n="04" title="Payment">
            <fieldset>
              <legend className="sr-only">Payment (demo)</legend>
              <p className="mb-5 text-sm text-taupe">
                No card details are collected. Connect a payment provider such as Stripe, Adyen or Shopify Checkout — see
                the README.
              </p>
              <div className="divide-y divide-line border border-line">
                <label className={cn('flex cursor-pointer items-center gap-4 px-5 py-4', payment === 'card' ? 'bg-cream' : 'hover:bg-cream/60')}>
                  <input type="radio" name="payment" checked={payment === 'card'} onChange={() => setPayment('card')} className="peer sr-only" />
                  <Radio checked={payment === 'card'} />
                  <span className="flex flex-1 items-center gap-3">
                    <Icon name="card" size={20} />
                    <span>
                      <span className="block text-[0.95rem]">Demo card ending in •••• 4242</span>
                      <span className="block text-xs text-taupe">Saved demo payment method — not a real card</span>
                    </span>
                  </span>
                </label>
                <label className={cn('flex cursor-pointer items-center gap-4 px-5 py-4', payment === 'later' ? 'bg-cream' : 'hover:bg-cream/60')}>
                  <input type="radio" name="payment" checked={payment === 'later'} onChange={() => setPayment('later')} className="peer sr-only" />
                  <Radio checked={payment === 'later'} />
                  <span className="flex-1">
                    <span className="block text-[0.95rem]">Pay on delivery (demo)</span>
                    <span className="block text-xs text-taupe">Placeholder for an alternative payment method</span>
                  </span>
                </label>
              </div>
            </fieldset>
          </Step>
        </div>

        <aside className="lg:col-span-5" aria-labelledby="co-summary">
          <div className="bg-cream p-6 sm:p-8 lg:sticky lg:top-28">
            <h2 id="co-summary" className="font-display text-2xl">Order summary</h2>
            <ul className="mt-6 divide-y divide-line">
              {lines.map((l) => (
                <li key={l.key} className="flex items-center gap-4 py-4">
                  <div className="relative shrink-0">
                    <img src={l.product.images[0]} alt="" className="aspect-[4/5] w-16 bg-sand object-cover" />
                    <span className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-ink text-[0.65rem] text-ivory" aria-label={`Quantity ${l.quantity}`}>
                      {l.quantity}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-base">{l.product.name}</p>
                    <p className="text-xs text-taupe">
                      {l.color}
                      {l.size !== 'One Size' && ` · ${l.size}`}
                    </p>
                  </div>
                  <span className="text-sm tabular-nums">{formatPrice(l.lineTotal)}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-4 space-y-3 border-t border-line pt-5 text-sm">
              <Row label="Subtotal" value={formatPrice(subtotal)} />
              <Row label={method.name} value={shipping === 0 ? 'Complimentary' : formatPrice(shipping)} />
              {tax > 0 && <Row label="Estimated tax" value={formatPrice(tax)} />}
              <div className="flex justify-between border-t border-line-strong pt-4 text-base">
                <dt>Total</dt>
                <dd className="font-medium tabular-nums">{formatPrice(total)}</dd>
              </div>
            </dl>
            <Button type="submit" size="lg" className="mt-8 w-full" disabled={placing}>
              {placing ? 'Placing demo order…' : 'Place demo order'}
            </Button>
            <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-taupe">
              <Icon name="lock" size={14} /> No payment will be taken
            </p>
          </div>
        </aside>
      </form>
    </div>
  )
}

function Step({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={`step-${n}`}>
      <h2 id={`step-${n}`} className="mb-7 flex items-baseline gap-4 border-b border-line pb-4 font-display text-2xl sm:text-3xl">
        <span className="font-display text-sm italic text-brass-deep">{n}</span>
        {title}
      </h2>
      {children}
    </section>
  )
}

function Radio({ checked }: { checked: boolean }) {
  return (
    <span className="flex size-4 shrink-0 items-center justify-center rounded-full border border-line-strong peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2" aria-hidden="true">
      <span className={cn('size-2 rounded-full bg-ink transition-transform', checked ? 'scale-100' : 'scale-0')} />
    </span>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-taupe">{label}</dt>
      <dd className="tabular-nums">{value}</dd>
    </div>
  )
}

function Confirmation({ order, name, email }: { order: Order; name: string; email: string }) {
  return (
    <section className="container-site grid gap-12 pb-[var(--spacing-section)] pt-14 sm:pt-20 lg:grid-cols-12">
      <div className="lg:col-span-6">
        <span className="flex size-14 items-center justify-center rounded-full border border-ink">
          <Icon name="check" size={22} />
        </span>
        <p className="eyebrow mt-10 text-taupe">Order {order.id}</p>
        <h1 className="display-xl mt-5">
          Thank you, <em>{name}.</em>
        </h1>
        <p className="lede mt-6 max-w-lg text-taupe">
          Your demo order has been placed. In a live store a confirmation would now be sent to <span className="text-ink">{email}</span>.
        </p>
        <DemoNotice className="mt-8 max-w-lg">
          This was a template demonstration — no payment was taken, no email was sent and nothing will be shipped. The order
          is stored only in this browser so you can see it in the demo account.
        </DemoNotice>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink to="/shop" size="lg" arrow>
            Continue shopping
          </ButtonLink>
          <ButtonLink to="/account?tab=orders" size="lg" variant="ghost">
            View orders
          </ButtonLink>
        </div>
      </div>
      <div className="lg:col-span-5 lg:col-start-8">
        <div className="bg-cream p-6 sm:p-8">
          <p className="label">Summary</p>
          <ul className="mt-5 divide-y divide-line">
            {order.lines.map((l) => (
              <li key={`${l.productId}-${l.color}-${l.size}`} className="flex items-center gap-4 py-4">
                <img src={l.image} alt="" className="aspect-[4/5] w-14 bg-sand object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display">{l.name}</p>
                  <p className="text-xs text-taupe">
                    {l.color}
                    {l.size !== 'One Size' && ` · ${l.size}`} · Qty {l.quantity}
                  </p>
                </div>
                <span className="text-sm tabular-nums">{formatPrice(l.price * l.quantity)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-3 border-t border-line pt-5 text-sm">
            <Row label="Subtotal" value={formatPrice(order.subtotal)} />
            <Row label={order.delivery} value={order.shipping === 0 ? 'Complimentary' : formatPrice(order.shipping)} />
            <div className="flex justify-between border-t border-line-strong pt-4 text-base">
              <dt>Total</dt>
              <dd className="font-medium tabular-nums">{formatPrice(order.total)}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
