import { useId, useState } from 'react'
import { Link } from 'react-router'
import type { Look } from '@/types'
import { getProductsBySlugs } from '@/data/products'
import { useUI } from '@/hooks/useStore'
import { Dialog, CloseButton } from '@/components/ui/Dialog'
import { PriceTag } from '@/components/product/PriceTag'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/cn'

/** Staggered magazine grid of looks, each with a "Shop the look" modal. */
export function LookbookGrid({ looks }: { looks: Look[] }) {
  const [active, setActive] = useState<Look | null>(null)
  const [last, setLast] = useState<Look | null>(null)
  if (active && active !== last) setLast(active)
  const shown = active ?? last
  const titleId = useId()

  return (
    <>
      <ul className="grid grid-cols-2 gap-x-3 gap-y-12 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-20">
        {looks.map((look, i) => (
          <li key={look.id} className={cn(i % 2 === 1 && 'mt-16', i % 3 === 1 ? 'lg:mt-32' : i % 3 === 2 ? 'lg:mt-14' : 'lg:mt-0')}>
            <Reveal delay={(i % 3) * 90}>
              <figure className="group">
                <button
                  type="button"
                  onClick={() => setActive(look)}
                  className="relative block w-full overflow-hidden bg-charcoal text-left"
                  aria-label={`Shop look ${look.number}: ${look.title}`}
                >
                  <img
                    src={look.image}
                    alt=""
                    loading="lazy"
                    className="aspect-[9/13] w-full object-cover transition-[scale,opacity] duration-[1400ms] ease-luxe group-hover:scale-[1.04] group-hover:opacity-85"
                  />
                  <span className="absolute left-3 top-3 font-display text-3xl italic text-ivory mix-blend-difference sm:left-5 sm:top-4 sm:text-5xl">
                    {look.number}
                  </span>
                  <span className="absolute inset-x-3 bottom-3 hidden translate-y-2 items-center justify-center bg-ivory py-3 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-ink opacity-0 transition-[opacity,translate] duration-500 ease-luxe group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:flex">
                    Shop the look
                  </span>
                </button>
                <figcaption className="mt-4 sm:mt-5">
                  <p className="eyebrow text-ivory/55">Look {look.number}</p>
                  <p className="mt-1.5 font-display text-xl leading-tight sm:text-2xl">{look.title}</p>
                  <p className="mt-2 hidden text-sm text-ivory/65 sm:block">{look.description}</p>
                  <button type="button" onClick={() => setActive(look)} className="eyebrow mt-3 link-underline-static sm:hidden">
                    Shop the look
                  </button>
                </figcaption>
              </figure>
            </Reveal>
          </li>
        ))}
      </ul>

      <Dialog open={Boolean(active)} onClose={() => setActive(null)} labelledBy={titleId} variant="center">
        {shown && <LookDetail look={shown} titleId={titleId} onClose={() => setActive(null)} />}
      </Dialog>
    </>
  )
}

function LookDetail({ look, titleId, onClose }: { look: Look; titleId: string; onClose: () => void }) {
  const items = getProductsBySlugs(look.productSlugs)
  const { openQuickView } = useUI()
  return (
    <div className="relative grid min-h-0 flex-1 overflow-y-auto sm:grid-cols-[0.9fr_1.1fr] sm:overflow-hidden">
      <CloseButton onClick={onClose} className="absolute right-2 top-2 z-10 bg-ivory/80 sm:bg-transparent" label="Close look" />
      <div className="bg-charcoal">
        <img src={look.image} alt={`Look ${look.number}: ${look.description}`} className="aspect-[9/13] w-full object-cover sm:h-full sm:aspect-auto" />
      </div>
      <div className="flex flex-col p-6 sm:overflow-y-auto sm:p-10">
        <p className="eyebrow text-taupe">Look {look.number}</p>
        <h2 id={titleId} className="mt-3 font-display text-3xl leading-tight sm:text-4xl">
          {look.title}
        </h2>
        <p className="mt-3 text-sm text-taupe">{look.description}</p>
        <ul className="mt-8 divide-y divide-line border-y border-line">
          {items.map((p) => (
            <li key={p.id} className="flex items-center gap-4 py-4">
              <img src={p.images[0]} alt="" className="aspect-[4/5] w-16 shrink-0 bg-sand object-cover" loading="lazy" />
              <div className="min-w-0 flex-1">
                <Link to={`/product/${p.slug}`} className="font-display text-lg leading-tight link-underline">
                  {p.name}
                </Link>
                <PriceTag price={p.price} className="mt-1 block text-sm text-taupe" />
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose()
                  openQuickView(p)
                }}
                className="eyebrow shrink-0 border border-line-strong px-3 py-2.5 transition-colors hover:border-ink hover:bg-ink hover:text-ivory"
                aria-label={`Quick view ${p.name}`}
              >
                Quick view
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
