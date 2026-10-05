import { img } from '@/lib/asset'
import { useSeo } from '@/hooks/useSeo'
import { ButtonLink } from '@/components/ui/Button'

export default function NotFound() {
  useSeo({ title: 'Page not found', noindex: true })
  return (
    <section className="container-site grid items-center gap-12 py-16 sm:py-24 lg:min-h-[calc(100svh-7.1rem)] lg:grid-cols-12">
      <div className="lg:col-span-6">
        <p className="eyebrow text-taupe">Error 404</p>
        <h1 className="mt-6 font-display text-[clamp(6rem,22vw,16rem)] italic leading-[0.8] tracking-[-0.04em]">404</h1>
        <p className="display-md mt-8">This page has stepped out.</p>
        <p className="mt-4 max-w-md text-taupe">
          The piece or page you are looking for may have moved, sold out or never existed. Let us take you somewhere more
          inspiring.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink to="/" size="lg" arrow>
            Return home
          </ButtonLink>
          <ButtonLink to="/shop" size="lg" variant="ghost">
            Shop the collection
          </ButtonLink>
        </div>
      </div>
      <div className="lg:col-span-5 lg:col-start-8">
        <img src={img('categories/women.svg')} alt="" className="aspect-[4/5] w-full bg-sand object-cover" />
      </div>
    </section>
  )
}
