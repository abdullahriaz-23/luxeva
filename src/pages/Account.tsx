import { useState, type ReactNode } from 'react'
import { Link, useSearchParams } from 'react-router'
import type { Order, Product } from '@/types'
import { getProductById } from '@/data/products'
import { useOrders, useToast, useWishlist } from '@/hooks/useStore'
import { useSeo } from '@/hooks/useSeo'
import { PageHeader } from '@/components/ui/PageHeader'
import { DemoNotice } from '@/components/ui/DemoNotice'
import { Button, ButtonLink } from '@/components/ui/Button'
import { TextField } from '@/components/ui/Field'
import { ProductGrid } from '@/components/product/ProductGrid'
import { formatDate, formatPrice } from '@/lib/format'
import { img } from '@/lib/asset'
import { cn } from '@/lib/cn'

const tabs = [
  { id: 'profile', label: 'Profile' },
  { id: 'orders', label: 'Orders' },
  { id: 'saved', label: 'Saved items' },
  { id: 'addresses', label: 'Addresses' },
  { id: 'preferences', label: 'Preferences' },
] as const
type Tab = (typeof tabs)[number]['id']

/** Example orders shown alongside any demo orders placed in this browser. */
const sampleOrders: Order[] = [
  {
    id: 'LX-204811',
    date: '2026-09-02',
    lines: [{ productId: 'p-003', name: 'Maren Cashmere Crewneck', color: 'Oat', size: 'S', quantity: 1, price: 420, image: img('products/maren-cashmere-knit-1.svg') }],
    subtotal: 420,
    shipping: 25,
    total: 445,
    delivery: 'Standard delivery',
    status: 'Delivered',
  },
  {
    id: 'LX-198305',
    date: '2026-06-14',
    lines: [
      { productId: 'p-016', name: 'Mira Top-Handle Bag', color: 'Black', size: 'One Size', quantity: 1, price: 1250, image: img('products/mira-top-handle-bag-1.svg') },
      { productId: 'p-024', name: 'Halo Sculpted Earrings', color: 'Gold', size: 'One Size', quantity: 1, price: 310, image: img('products/halo-sculpted-earrings-1.svg') },
    ],
    subtotal: 1560,
    shipping: 0,
    total: 1560,
    delivery: 'Express delivery',
    status: 'Delivered',
  },
]

export default function Account() {
  useSeo({ title: 'My account', noindex: true })
  const [params, setParams] = useSearchParams()
  const current = (tabs.find((t) => t.id === params.get('tab'))?.id ?? 'profile') as Tab

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Account' }]}
        eyebrow="Demo account"
        title={<>Welcome back, <em>Alex.</em></>}
        aside={
          <Link to="/login" className="eyebrow link-underline-static">
            Sign out (demo)
          </Link>
        }
      />
      <div className="container-site pb-[var(--spacing-section)]">
        <DemoNotice className="mb-10">
          Authentication is not implemented in this template. This page shows a sample customer account so you can see the
          layout — profile changes are not saved. See README → Connecting authentication.
        </DemoNotice>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-12">
          <nav aria-label="Account sections" className="min-w-0 lg:col-span-3">
            <ul className="no-scrollbar -mx-[var(--spacing-gutter)] flex gap-6 overflow-x-auto border-b border-line px-[var(--spacing-gutter)] lg:mx-0 lg:block lg:space-y-1 lg:border-0 lg:px-0">
              {tabs.map((t) => (
                <li key={t.id} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setParams({ tab: t.id }, { replace: true, preventScrollReset: true })}
                    aria-current={current === t.id ? 'page' : undefined}
                    className={cn(
                      '-mb-px border-b py-4 text-[0.7rem] font-medium uppercase tracking-[0.2em] transition-colors lg:mb-0 lg:w-full lg:border-b-0 lg:border-l lg:py-3 lg:pl-5 lg:text-left',
                      current === t.id ? 'border-ink text-ink' : 'border-transparent text-taupe hover:text-ink',
                    )}
                  >
                    {t.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0 lg:col-span-9">
            {current === 'profile' && <Profile />}
            {current === 'orders' && <Orders />}
            {current === 'saved' && <Saved />}
            {current === 'addresses' && <Addresses />}
            {current === 'preferences' && <Preferences />}
          </div>
        </div>
      </div>
    </>
  )
}

function Panel({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) {
  return (
    <section>
      <div className="mb-8 flex items-end justify-between gap-4 border-b border-line pb-4">
        <h2 className="font-display text-3xl">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  )
}

function Profile() {
  const { notify } = useToast()
  return (
    <Panel title="Profile">
      <form
        className="grid gap-x-6 gap-y-8 sm:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault()
          notify({ title: 'Demo only', description: 'Profile changes are not saved in this template.' })
        }}
      >
        <TextField label="First name" defaultValue="Alex" autoComplete="given-name" />
        <TextField label="Last name" defaultValue="Morgan" autoComplete="family-name" />
        <TextField label="Email" type="email" defaultValue="alex.morgan@example.com" autoComplete="email" />
        <TextField label="Phone" type="tel" defaultValue="+1 (555) 010-0000" autoComplete="tel" />
        <TextField label="Birthday (optional)" type="text" placeholder="DD / MM" />
        <div className="flex items-end sm:col-span-2">
          <Button type="submit">Save changes</Button>
        </div>
      </form>
      <div className="mt-14 grid gap-px bg-line sm:grid-cols-3">
        {[
          ['Member since', '2023'],
          ['Client tier', 'Atelier'],
          ['Size profile', 'S / EU 38'],
        ].map(([k, v]) => (
          <div key={k} className="bg-ivory py-6 sm:px-6 sm:first:pl-0">
            <p className="eyebrow text-taupe">{k}</p>
            <p className="mt-2 font-display text-2xl">{v}</p>
          </div>
        ))}
      </div>
    </Panel>
  )
}

function Orders() {
  const { orders } = useOrders()
  const all = [...orders, ...sampleOrders]
  return (
    <Panel title="Orders">
      <ul className="space-y-6">
        {all.map((o) => (
          <li key={o.id} className="border border-line">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line bg-cream px-5 py-4">
              <dl className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
                <div>
                  <dt className="eyebrow text-taupe">Order</dt>
                  <dd className="mt-1">{o.id}</dd>
                </div>
                <div>
                  <dt className="eyebrow text-taupe">Placed</dt>
                  <dd className="mt-1">{formatDate(o.date)}</dd>
                </div>
                <div>
                  <dt className="eyebrow text-taupe">Total</dt>
                  <dd className="mt-1 tabular-nums">{formatPrice(o.total)}</dd>
                </div>
              </dl>
              <span className={cn('px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.18em]', o.status === 'Delivered' ? 'bg-sand' : 'bg-ink text-ivory')}>
                {o.status}
              </span>
            </div>
            <ul className="divide-y divide-line px-5">
              {o.lines.map((l) => (
                <li key={`${l.productId}-${l.size}-${l.color}`} className="flex items-center gap-4 py-4">
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
          </li>
        ))}
      </ul>
      <p className="mt-6 text-xs text-taupe">Sample orders are demo data. Orders placed through the demo checkout appear first and are stored in this browser only.</p>
    </Panel>
  )
}

function Saved() {
  const { ids } = useWishlist()
  const items = ids.map(getProductById).filter((p): p is Product => Boolean(p))
  return (
    <Panel title="Saved items" action={<Link to="/wishlist" className="eyebrow link-underline-static">Open wishlist</Link>}>
      {items.length === 0 ? (
        <div className="py-12 text-center">
          <p className="font-display text-2xl italic">You haven’t saved anything yet.</p>
          <ButtonLink to="/shop" variant="secondary" className="mt-6" arrow>
            Browse the collection
          </ButtonLink>
        </div>
      ) : (
        <ProductGrid products={items} columns={3} />
      )}
    </Panel>
  )
}

function Addresses() {
  return (
    <Panel title="Addresses">
      <div className="grid gap-6 sm:grid-cols-2">
        {[
          { label: 'Default shipping', lines: ['Alex Morgan', '200 Example Avenue, Apt 4', 'New York, NY 10001', 'United States'] },
          { label: 'Billing', lines: ['Alex Morgan', '200 Example Avenue, Apt 4', 'New York, NY 10001', 'United States'] },
        ].map((a) => (
          <div key={a.label} className="border border-line p-6">
            <p className="eyebrow text-taupe">{a.label}</p>
            <address className="mt-4 not-italic leading-relaxed">
              {a.lines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>
            <div className="mt-6 flex gap-5">
              <button type="button" className="eyebrow link-underline-static" disabled title="Demo only">
                Edit
              </button>
              <button type="button" className="eyebrow link-underline-static text-taupe" disabled title="Demo only">
                Remove
              </button>
            </div>
          </div>
        ))}
        <div className="flex min-h-48 items-center justify-center border border-dashed border-line-strong p-6 text-center">
          <p className="text-sm text-taupe">
            Address management is a demo.
            <br />
            Connect your customer API to enable it.
          </p>
        </div>
      </div>
    </Panel>
  )
}

function Preferences() {
  const [prefs, setPrefs] = useState({ newsletter: true, sms: false, appointments: true, newIn: false })
  const items: { key: keyof typeof prefs; label: string; text: string }[] = [
    { key: 'newsletter', label: 'The LUXEVA letter', text: 'New collections and stories from the atelier, a few times a season.' },
    { key: 'newIn', label: 'New-in alerts', text: 'Be the first to know when new pieces arrive.' },
    { key: 'appointments', label: 'Appointment reminders', text: 'Reminders for showroom and fitting appointments.' },
    { key: 'sms', label: 'SMS updates', text: 'Delivery updates by text message.' },
  ]
  return (
    <Panel title="Preferences">
      <ul className="divide-y divide-line border-y border-line">
        {items.map((it) => (
          <li key={it.key} className="flex items-center justify-between gap-6 py-6">
            <div>
              <p className="font-display text-xl">{it.label}</p>
              <p className="mt-1 text-sm text-taupe">{it.text}</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={prefs[it.key]}
              aria-label={it.label}
              onClick={() => setPrefs((p) => ({ ...p, [it.key]: !p[it.key] }))}
              className={cn('relative h-7 w-12 shrink-0 rounded-full border transition-colors', prefs[it.key] ? 'border-ink bg-ink' : 'border-line-strong bg-transparent')}
            >
              <span className={cn('absolute top-1/2 size-5 -translate-y-1/2 rounded-full transition-[left,background-color] duration-300 ease-luxe', prefs[it.key] ? 'left-[1.45rem] bg-ivory' : 'left-[0.2rem] bg-ink/70')} />
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-xs text-taupe">Preferences are kept for this visit only (demo).</p>
    </Panel>
  )
}
