import { img } from '@/lib/asset'
import { useSeo } from '@/hooks/useSeo'
import { PageHeader } from '@/components/ui/PageHeader'
import { EditorialSplit } from '@/components/editorial/EditorialSplit'
import { ButtonLink } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'

const principles = [
  { title: 'Remove, then refine', text: 'Every design begins by asking what can be taken away. What remains is refined until nothing more can be.' },
  { title: 'Made to be worn', text: 'We test every piece in motion — walking, sitting, reaching — because a garment that only works standing still is not finished.' },
  { title: 'Slow by design', text: 'Two main collections a year and a permanent wardrobe of essentials. We would rather make less, and make it properly.' },
]

const materials = [
  { name: 'Double-face wool', origin: 'Biella, Italy', text: 'Two cloths woven as one and separated by hand at the seams — warm, structured and unlined.' },
  { name: 'Mongolian cashmere', origin: 'Spun in Scotland', text: 'Long-staple fibres combed by hand and knitted on fine twelve-gauge machines.' },
  { name: 'Vegetable-tanned leather', origin: 'Tuscany, Italy', text: 'Tanned slowly with bark extracts, it develops a rich patina with every year of use.' },
  { name: 'Sand-washed silk', origin: 'Como, Italy', text: 'Heavyweight crepe, washed for a matte, fluid hand that moves like water.' },
  { name: 'Solid brass', origin: 'Cast in France', text: 'Hardware is cast, brushed and finished by hand — never plated base metal.' },
  { name: 'Bridle leather', origin: 'Walsall, England', text: 'Stuffed with waxes and tallow for a firm, burnished finish that lasts decades.' },
]

/** Demo timeline — replace with your own brand history. */
const timeline = [
  { year: '2014', title: 'A single coat', text: 'LUXEVA begins with one coat pattern, cut on a kitchen table and sold to friends.' },
  { year: '2016', title: 'The first atelier', text: 'A small studio opens with two pattern cutters and one sewing machine.' },
  { year: '2019', title: 'Leather goods', text: 'The Mira bag is introduced, made from start to finish by a single artisan.' },
  { year: '2022', title: 'Fourteen makers', text: 'Our circle of independent workshops grows across four countries.' },
  { year: '2024', title: 'The showroom', text: 'A private showroom opens for appointments, fittings and repairs.' },
  { year: '2026', title: 'Collection N°08', text: 'Autumn / Winter 2026 returns to the very first coat — redrawn eleven times.' },
]

const values = [
  { title: 'Longevity', text: 'Complimentary repairs on leather goods and lifetime resoling for welted shoes.' },
  { title: 'Transparency', text: 'We name the region and workshop behind every material and every piece.' },
  { title: 'Fair making', text: 'Long-term partnerships, fair prices and no rushed production schedules.' },
  { title: 'Less waste', text: 'Small runs, made-to-order tailoring and recyclable packaging throughout.' },
]

export default function About() {
  useSeo({ title: 'About', description: 'The story, philosophy and craftsmanship behind LUXEVA — a fictional luxury fashion house.' })
  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Home', to: '/' }, { label: 'About' }]}
        eyebrow="The Maison"
        title={<>Designed for the moments <em>that matter.</em></>}
      />

      <section className="container-site pb-[var(--spacing-section)]">
        <div className="relative overflow-hidden bg-sand">
          <img src={img('campaign/atelier.svg')} alt="Garments on display in a pale stone atelier" fetchPriority="high" className="aspect-[4/5] w-full object-cover sm:aspect-[16/9]" />
        </div>
        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-x-6">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-taupe">Our story</p>
            <p className="mt-6 font-display text-[clamp(1.7rem,2.8vw,2.6rem)] leading-[1.18]">
              LUXEVA began with a single coat and a simple conviction: that the clothes we love most are the ones we never
              have to think about.
            </p>
          </Reveal>
          <Reveal delay={120} className="space-y-5 text-[0.98rem] leading-relaxed text-taupe lg:col-span-5 lg:col-start-8 lg:pt-12">
            <p>
              Founded in 2014, LUXEVA is a fictional house that designs considered essentials and refined silhouettes for
              women and men. We produce two collections a year alongside a permanent wardrobe of pieces that are refined,
              season after season, rather than replaced.
            </p>
            <p>
              Everything we make is produced in small runs by independent workshops — family businesses, most of them,
              where skills have been handed down across generations. We visit each of them often, and we never ask them to
              hurry.
            </p>
            <p className="text-xs">LUXEVA is a fictional brand created as demo content for a website template.</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream">
        <div className="container-site section-y">
          <SectionHeader index="01" eyebrow="Philosophy" title={<>Less, but <em>better.</em></>} />
          <ol className="mt-14 grid gap-px border border-line bg-line md:grid-cols-3">
            {principles.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 90} className="bg-cream p-8 sm:p-10">
                <p className="font-display text-5xl italic text-brass/70">0{i + 1}</p>
                <h3 className="mt-8 font-display text-2xl">{p.title}</h3>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-taupe">{p.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <div id="craft" className="scroll-mt-20">
        <EditorialSplit image={img('campaign/craft.svg')} imageAlt="Saddle-stitched leather and a brushed brass buckle" caption="Seven layers of edge paint" tone="ivory">
          <p className="eyebrow text-taupe">N°02 — Craftsmanship</p>
          <h2 className="display-lg mt-6">
            Forty-two pieces, <em>one pair of hands.</em>
          </h2>
          <p className="lede mt-8 text-taupe">
            Our Mira bag is cut from forty-two pieces of box calf and assembled by a single artisan, start to finish.
          </p>
          <p className="mt-4 text-[0.95rem] leading-relaxed text-taupe">
            Jackets are built on a floating half-canvas and pressed by hand between every stage. Silk hems are rolled by
            hand. Brass is cast, brushed and finished individually. It is slow work — and it is the only way we know.
          </p>
          <ButtonLink to="/journal/the-makers-behind-luxeva" variant="secondary" arrow className="mt-10">
            Meet the makers
          </ButtonLink>
        </EditorialSplit>
      </div>

      <section className="container-site section-y">
        <SectionHeader index="03" eyebrow="Materials" title={<>Honest <em>materials</em></>} aside={<p className="max-w-xs text-[0.95rem] text-taupe">Sourced from the regions that do them best. Demo origins shown for illustration.</p>} />
        <ul className="mt-14 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
          {materials.map((m, i) => (
            <Reveal as="li" key={m.name} delay={(i % 3) * 80} className="border-t border-line py-8">
              <p className="eyebrow text-brass-deep">{m.origin}</p>
              <h3 className="mt-3 font-display text-2xl">{m.name}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-taupe">{m.text}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="on-dark bg-ink text-ivory">
        <div className="container-site section-y">
          <SectionHeader tone="dark" index="04" eyebrow="Timeline" title={<>A short <em>history</em></>} />
          <ol className="mt-14 border-l border-line-light pl-6 sm:pl-10 lg:grid lg:grid-cols-6 lg:border-l-0 lg:border-t lg:pl-0">
            {timeline.map((t, i) => (
              <Reveal as="li" key={t.year} delay={i * 70} className="relative pb-10 lg:pr-6 lg:pt-10">
                <span className="absolute -left-[1.85rem] top-2 size-2 rotate-45 bg-brass sm:-left-[2.85rem] lg:-top-1 lg:left-0" aria-hidden="true" />
                <p className="font-display text-4xl italic">{t.year}</p>
                <h3 className="mt-3 font-sans text-[0.72rem] font-medium uppercase tracking-[0.18em]">{t.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ivory/65">{t.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-site section-y">
        <SectionHeader index="05" eyebrow="Values" title={<>What we <em>stand</em> for</>} />
        <dl className="mt-14 grid gap-x-8 gap-y-2 sm:grid-cols-2">
          {values.map((v) => (
            <div key={v.title} className="flex flex-col gap-3 border-t border-line py-8 sm:flex-row sm:gap-10">
              <dt className="font-display text-2xl sm:w-48 sm:shrink-0">{v.title}</dt>
              <dd className="text-[0.95rem] leading-relaxed text-taupe">{v.text}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-16 flex flex-wrap gap-3">
          <ButtonLink to="/collections" size="lg" arrow>
            Explore the collections
          </ButtonLink>
          <ButtonLink to="/contact" size="lg" variant="ghost">
            Book an appointment
          </ButtonLink>
        </div>
      </section>
    </>
  )
}
