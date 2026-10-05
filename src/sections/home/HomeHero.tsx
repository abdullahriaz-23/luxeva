import { img } from '@/lib/asset'
import { ButtonLink } from '@/components/ui/Button'

const marquee = ['Considered essentials', 'Refined silhouettes', 'Made in small runs', 'Designed to last', 'Autumn / Winter 2026']

export function HomeHero() {
  return (
    <section aria-labelledby="hero-title" className="relative">
      <div className="container-site grid gap-y-10 pb-10 pt-8 sm:pt-12 lg:min-h-[calc(100svh-7.1rem)] lg:grid-cols-12 lg:gap-x-6 lg:py-0">
        {/* Visual — first in DOM so the headline paints above it on desktop */}
        <div className="relative order-2 lg:order-none lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:-mr-[var(--spacing-gutter)]">
          <div className="relative overflow-hidden bg-charcoal lg:absolute lg:inset-0">
            <img
              src={img('campaign/hero.svg')}
              alt="A long camel coat standing in a warm-lit stone archway"
              fetchPriority="high"
              className="aspect-[4/5] w-full object-cover sm:aspect-[5/4] lg:h-full lg:aspect-auto"
            />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-ivory sm:bottom-7 sm:left-7 sm:right-7">
              <p className="text-[0.66rem] uppercase tracking-[0.2em]">
                <span className="opacity-60">Look 01 —</span> The Aurelia coat
              </p>
              <p className="hidden font-display text-sm italic opacity-80 sm:block">MMXXVI</p>
            </div>
          </div>
        </div>

        {/* Copy */}
        <div className="relative order-1 flex flex-col justify-center lg:order-none lg:col-span-7 lg:col-start-1 lg:row-start-1 lg:py-20">
          <p className="eyebrow flex items-center gap-4 text-taupe">
            <span className="font-display text-sm normal-case italic tracking-normal">N°08</span>
            <span className="h-px w-8 bg-current opacity-50" aria-hidden="true" />
            Autumn / Winter 2026
          </p>
          <h1
            id="hero-title"
            className="mt-6 font-display text-[clamp(2.75rem,7.8vw,8.75rem)] uppercase leading-[0.9] tracking-[-0.025em] lg:mt-8 lg:text-ivory lg:mix-blend-difference [&>span]:block lg:[&>span]:whitespace-nowrap"
          >
            <span>The new</span>
            <em className="block font-normal lg:whitespace-nowrap">language</em>
            <span>of luxury.</span>
          </h1>
          <p className="lede mt-8 max-w-md text-taupe lg:mt-10">
            Considered essentials, refined silhouettes, and modern pieces designed to move with you.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink to="/shop?new=1" size="lg" arrow>
              Shop New In
            </ButtonLink>
            <ButtonLink to="/collections/autumn-winter-2026" size="lg" variant="ghost">
              Explore Collection
            </ButtonLink>
          </div>

          <div className="mt-16 hidden items-end gap-5 xl:flex">
            <img src={img('campaign/hero-detail.svg')} alt="The Mira top-handle bag on a stone plinth" className="aspect-[4/5] w-28 object-cover" />
            <div className="pb-1 text-sm text-taupe">
              <p className="eyebrow text-ink">Atelier</p>
              <p className="mt-1 max-w-[16rem]">The Mira bag — forty-two hand-cut pieces of box calf, assembled by a single artisan.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden border-y border-line py-4" aria-hidden="true">
        <div className="flex w-max animate-marquee">
          {[0, 1].map((k) => (
            <ul key={k} className="flex shrink-0 items-center">
              {marquee.map((m) => (
                <li key={m} className="flex items-center whitespace-nowrap px-6 font-display text-xl italic sm:px-10 sm:text-2xl">
                  {m}
                  <span className="ml-12 inline-block size-1.5 rotate-45 bg-brass sm:ml-20" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  )
}
