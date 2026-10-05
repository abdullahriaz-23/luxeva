import { looks } from '@/data/lookbook'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { LookbookGrid } from '@/components/editorial/LookbookGrid'

export function LookbookSection() {
  return (
    <section aria-labelledby="lookbook-title" className="on-dark bg-ink text-ivory">
      <div className="container-site section-y">
        <SectionHeader
          id="lookbook-title"
          tone="dark"
          index="04"
          eyebrow="Lookbook"
          title={
            <>
              Six ways to <em>wear</em> the season
            </>
          }
          aside={<p className="max-w-xs text-[0.95rem] text-ivory/65">Composed in the studio — each look can be shopped piece by piece.</p>}
        />
        <div className="mt-16 lg:mt-24">
          <LookbookGrid looks={looks} />
        </div>
      </div>
    </section>
  )
}
