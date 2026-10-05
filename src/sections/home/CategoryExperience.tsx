import { img } from '@/lib/asset'
import { ButtonLink } from '@/components/ui/Button'

const panels = [
  {
    id: 'women',
    index: '01',
    title: 'Women',
    statement: 'Fluid tailoring, bias-cut silk and knitwear with quiet precision.',
    image: img('categories/women.svg'),
    alt: 'A champagne slip dress beneath a pale stone arch',
    to: '/shop?category=women',
  },
  {
    id: 'men',
    index: '02',
    title: 'Men',
    statement: 'Long-line outerwear and soft tailoring with an easy authority.',
    image: img('categories/men.svg'),
    alt: 'A stone-grey overcoat in a dark gallery',
    to: '/shop?category=men',
  },
  {
    id: 'accessories',
    index: '03',
    title: 'Accessories',
    statement: 'Leather, brass and acetate — the details that finish everything.',
    image: img('categories/accessories.svg'),
    alt: 'A cognac top-handle bag and sunglasses on stone plinths',
    to: '/shop?category=bags',
  },
]

export function CategoryExperience() {
  return (
    <section aria-label="Shop by category" className="on-dark bg-ink pb-px">
      <ul className="flex flex-col gap-px lg:h-[min(88svh,56rem)] lg:min-h-[38rem] lg:flex-row">
        {panels.map((p) => (
          <li
            key={p.id}
            className="group @container relative overflow-hidden transition-[flex-grow] duration-[900ms] ease-luxe lg:flex-1 lg:hover:flex-[1.55] lg:focus-within:flex-[1.55]"
          >
            <img src={p.image} alt={p.alt} loading="lazy" className="aspect-[4/5] w-full object-cover transition-[scale] duration-[1600ms] ease-luxe group-hover:scale-[1.04] sm:aspect-[16/11] lg:absolute lg:inset-0 lg:h-full lg:aspect-auto" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent lg:via-ink/15" aria-hidden="true" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-ivory sm:p-10">
              <p className="font-display text-lg italic opacity-80">{p.index}</p>
              <h2 className="mt-2 font-display text-[clamp(2.2rem,10.5cqw,5.5rem)] uppercase leading-none tracking-[-0.01em]">{p.title}</h2>
              <p className="mt-4 max-w-sm text-[0.95rem] text-ivory/80 lg:min-h-[3.2em]">{p.statement}</p>
              <ButtonLink to={p.to} variant="outline-light" className="mt-7" arrow>
                Shop {p.title.toLowerCase()}
              </ButtonLink>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
