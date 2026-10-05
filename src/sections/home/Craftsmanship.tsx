import { img } from '@/lib/asset'
import { Reveal } from '@/components/ui/Reveal'
import { ArrowLink } from '@/components/ui/Button'

const pillars = [
  { title: 'Craftsmanship', text: 'Every piece is finished by hand — from rolled silk hems to seven-layer painted leather edges.' },
  { title: 'Materials', text: 'Double-face wool, Mongolian cashmere, vegetable-tanned leather and solid brass. Nothing synthetic where nature does it better.' },
  { title: 'Attention to detail', text: 'A collar narrowed by two millimetres. A pocket moved by one. The details you feel before you see.' },
  { title: 'Timeless design', text: 'We design outside the trend cycle, for pieces that look better in their fifth year than their first.' },
]

/** Demo statistics — replace with your own brand figures. */
const stats = [
  { value: '32', label: 'Signature pieces' },
  { value: '14', label: 'Independent makers' },
  { value: '08', label: 'Seasonal collections' },
]

export function Craftsmanship() {
  return (
    <section aria-labelledby="craft-title" className="container-site section-y">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-6">
        <Reveal className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <img src={img('campaign/atelier.svg')} alt="Garments awaiting final pressing in a pale atelier" loading="lazy" className="aspect-[4/5] w-full bg-sand object-cover sm:aspect-[7/5] lg:aspect-[4/5]" />
            <p className="mt-3 text-xs text-taupe">The atelier, before the final press.</p>
          </div>
        </Reveal>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal>
            <p className="eyebrow flex items-center gap-4 text-taupe">
              <span className="font-display text-sm normal-case italic tracking-normal">N°05</span>
              <span className="h-px w-8 bg-current opacity-50" aria-hidden="true" />
              The Maison
            </p>
            <h2 id="craft-title" className="display-xl mt-6">
              Made with <em>intention.</em>
            </h2>
            <p className="lede mt-8 text-taupe">
              LUXEVA works with a small circle of independent workshops. We never ask a maker to work faster — quality, we
              have learned, cannot be scheduled.
            </p>
          </Reveal>

          <ol className="mt-14 grid gap-x-8 sm:grid-cols-2">
            {pillars.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 80} className="border-t border-line py-7">
                <p className="font-display text-sm italic text-brass-deep">0{i + 1}</p>
                <h3 className="mt-3 font-display text-2xl">{p.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-taupe">{p.text}</p>
              </Reveal>
            ))}
          </ol>

          <dl className="mt-10 grid grid-cols-3 border-y border-line">
            {stats.map((s, i) => (
              <div key={s.label} className={`flex flex-col-reverse justify-end ${i > 0 ? 'border-l border-line pl-4 sm:pl-8' : ''}`}>
                <dt className="pb-7 pt-3 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-taupe sm:text-[0.68rem]">{s.label}</dt>
                <dd className="pt-7 font-display text-[clamp(3rem,7vw,5.5rem)] leading-none">{s.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs text-taupe">Figures shown are fictional demo content.</p>
            <ArrowLink to="/about#craft">Inside the atelier</ArrowLink>
          </div>
        </div>
      </div>
    </section>
  )
}
