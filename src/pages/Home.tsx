import { useSeo } from '@/hooks/useSeo'
import { HomeHero } from '@/sections/home/HomeHero'
import { EditorialIntro } from '@/sections/home/EditorialIntro'
import { FeaturedCollection } from '@/sections/home/FeaturedCollection'
import { FormFunction } from '@/sections/home/FormFunction'
import { NewArrivals } from '@/sections/home/NewArrivals'
import { LookbookSection } from '@/sections/home/LookbookSection'
import { CategoryExperience } from '@/sections/home/CategoryExperience'
import { Craftsmanship } from '@/sections/home/Craftsmanship'
import { JournalPreview } from '@/sections/home/JournalPreview'
import { Newsletter } from '@/components/editorial/Newsletter'

export default function Home() {
  useSeo({})
  return (
    <>
      <HomeHero />
      <EditorialIntro />
      <FeaturedCollection />
      <FormFunction />
      <NewArrivals />
      <LookbookSection />
      <Craftsmanship />
      <CategoryExperience />
      <div className="pt-[var(--spacing-section)]">
        <JournalPreview />
      </div>
      <Newsletter />
    </>
  )
}
