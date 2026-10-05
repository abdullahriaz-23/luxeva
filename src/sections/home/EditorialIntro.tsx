import { img } from '@/lib/asset'
import { ArrowLink } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'

export function EditorialIntro() {
  return (
    <section aria-labelledby="intro-title" className="container-site section-y overflow-hidden">
      <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-6">
        <p className="eyebrow flex items-center gap-4 text-taupe lg:col-span-12">
          <span className="font-display text-sm normal-case italic tracking-normal">N°01</span>
          <span className="h-px w-8 bg-current opacity-50" aria-hidden="true" />
          Philosophy
        </p>

        <Reveal className="lg:col-span-9 lg:col-start-2">
          <h2 id="intro-title" className="font-display text-[clamp(3.6rem,13vw,12.5rem)] leading-[0.86] tracking-[-0.03em]">
            Less,
            <br />
            <em className="block pl-[14%]">but better.</em>
          </h2>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-4 lg:col-start-8 lg:row-start-3 lg:self-end lg:pb-24">
          <p className="lede">
            We make fewer pieces, and we make them slowly. Every LUXEVA garment begins with a question — what can be
            removed? — and ends only when nothing more can be.
          </p>
          <p className="mt-6 text-[0.98rem] leading-relaxed text-taupe">
            Our clothes are cut from honest materials by independent makers, finished by hand, and designed to be worn for
            many years rather than a single season. Craftsmanship, for us, is not decoration; it is the discipline of
            intention.
          </p>
          <ArrowLink to="/about" className="mt-8">
            Our philosophy
          </ArrowLink>
        </Reveal>

        <Reveal className="grid grid-cols-[1.4fr_1fr] items-end gap-4 sm:gap-6 lg:col-span-5 lg:col-start-2 lg:row-start-3 lg:mt-6">
          <figure>
            <img src={img('campaign/craft.svg')} alt="Saddle-stitched cognac leather with a brushed brass buckle" loading="lazy" className="aspect-[4/5] w-full bg-sand object-cover" />
            <figcaption className="mt-3 text-xs text-taupe">Saddle-stitching, brushed brass.</figcaption>
          </figure>
          <figure className="pb-16 sm:pb-24">
            <img src={img('products/maren-cashmere-knit-2.svg')} alt="Close detail of an oat cashmere crewneck" loading="lazy" className="aspect-[4/5] w-full bg-sand object-cover" />
            <figcaption className="mt-3 text-xs text-taupe">Twelve-gauge cashmere.</figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  )
}
