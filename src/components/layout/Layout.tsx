import { Suspense } from 'react'
import { Outlet } from 'react-router'
import { AnnouncementBar } from './AnnouncementBar'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { ScrollManager } from './ScrollManager'
import { QuickView } from '@/components/product/QuickView'
import { SizeGuide } from '@/components/product/SizeGuide'
import { BagDrawer } from '@/components/cart/BagDrawer'
import { SearchOverlay } from '@/components/search/SearchOverlay'
import { Toaster } from '@/components/ui/Toaster'

function PageFallback() {
  return (
    <div className="flex min-h-[70svh] items-center justify-center" role="status" aria-label="Loading">
      <span className="font-display text-2xl italic text-taupe">LUXEVA</span>
    </div>
  )
}

export function Layout() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-5 focus:py-3 focus:text-ivory">
        Skip to content
      </a>
      <ScrollManager />
      <AnnouncementBar />
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <QuickView />
      <SizeGuide />
      <BagDrawer />
      <SearchOverlay />
      <Toaster />
    </>
  )
}
