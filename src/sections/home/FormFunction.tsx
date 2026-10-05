import { img } from '@/lib/asset'
import { getProductsBySlugs } from '@/data/products'
import { EditorialSplit } from '@/components/editorial/EditorialSplit'
import { ButtonLink } from '@/components/ui/Button'
import { Link } from 'react-router'
import { PriceTag } from '@/components/product/PriceTag'

export function FormFunction() {
  const featured = getProductsBySlugs(['vera-tailored-blazer', 'remy-unstructured-blazer', 'mira-top-handle-bag'])
  return (
    <EditorialSplit
      image={img('campaign/form-function.svg')}
      imageAlt="An ink blazer on a stone plinth with draped fabric and a pale sun"
      caption="Chapter II — The Atelier"
    >
      <p className="eyebrow text-taupe">The Atelier collection</p>
      <h2 className="display-xl mt-6 uppercase">
        Form <em className="normal-case">/</em>
        <br />
        Function
      </h2>
      <p className="lede mt-8 text-taupe">Pieces defined by proportion, texture, and movement.</p>
      <p className="mt-4 text-[0.95rem] leading-relaxed text-taupe">
        Half-canvas tailoring, hand-stitched lapels and leather goods assembled by a single artisan — produced in small,
        numbered runs.
      </p>
      <ButtonLink to="/collections/atelier" size="lg" arrow className="mt-10">
        Discover the collection
      </ButtonLink>

      <div className="mt-14 border-t border-line pt-6">
        <p className="eyebrow text-taupe">In this story</p>
        <ul className="mt-5 grid grid-cols-3 gap-3 sm:gap-4">
          {featured.map((p) => (
            <li key={p.id}>
              <Link to={`/product/${p.slug}`} className="group block">
                <div className="overflow-hidden bg-sand">
                  <img src={p.images[0]} alt="" loading="lazy" className="aspect-[4/5] w-full object-cover transition-[scale] duration-700 ease-luxe group-hover:scale-105" />
                </div>
                <span className="mt-2 block text-[0.78rem] leading-snug">{p.name}</span>
                <PriceTag price={p.price} className="text-[0.75rem] text-taupe" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </EditorialSplit>
  )
}
