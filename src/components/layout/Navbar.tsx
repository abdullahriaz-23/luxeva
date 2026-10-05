import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { primaryNav } from '@/data/navigation'
import { useCart, useUI, useWishlist } from '@/hooks/useStore'
import { Icon } from '@/components/ui/Icon'
import { Logo } from '@/components/ui/Logo'
import { cn } from '@/lib/cn'
import { MegaPanel } from './MegaPanel'
import { MobileMenu } from './MobileMenu'

const iconBase = 'relative size-10 items-center justify-center transition-opacity hover:opacity-60 min-[380px]:size-11'
const iconBtn = `${iconBase} inline-flex`

export function Navbar() {
  const { count } = useCart()
  const { count: wishCount } = useWishlist()
  const { openSearch, openBag } = useUI()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mega, setMega] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const closeTimer = useRef<number | undefined>(undefined)
  const location = useLocation()

  /** Query-aware active state: "/shop?category=women" is only active on that filter. */
  const isActive = (to: string) => {
    const url = new URL(to, 'https://x.invalid')
    if (url.search) {
      const current = new URLSearchParams(location.search)
      return location.pathname === url.pathname && [...url.searchParams].every(([k, v]) => current.get(k) === v)
    }
    return location.pathname === url.pathname || location.pathname.startsWith(`${url.pathname}/`)
  }

  const [lastPath, setLastPath] = useState(location.pathname + location.search)
  if (lastPath !== location.pathname + location.search) {
    setLastPath(location.pathname + location.search)
    setMobileOpen(false)
    setMega(null)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // "/" opens search from anywhere (except while typing)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement
      if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName) && !t.isContentEditable) {
        e.preventDefault()
        openSearch()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openSearch])

  const openMega = (label: string) => {
    window.clearTimeout(closeTimer.current)
    setMega(label)
  }
  const scheduleClose = () => {
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setMega(null), 140)
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b bg-ivory/95 backdrop-blur-[6px] transition-colors duration-300',
        scrolled || mega ? 'border-line' : 'border-transparent',
      )}
      onMouseLeave={scheduleClose}
    >
      <div className="container-site grid h-16 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 lg:h-[4.75rem]">
        {/* Left */}
        <div className="flex items-center">
          <button type="button" className={cn(iconBase, 'inline-flex -ml-2.5 min-[380px]:-ml-3 lg:hidden')} onClick={() => setMobileOpen(true)} aria-label="Open menu" aria-expanded={mobileOpen} aria-haspopup="dialog">
            <Icon name="menu" size={22} />
          </button>
          <Link to="/" aria-label="LUXEVA — home" className="hidden lg:block">
            <Logo />
          </Link>
        </div>

        {/* Centre */}
        <div className="flex justify-center">
          <Link to="/" aria-label="LUXEVA — home" className="lg:hidden">
            <Logo className="!text-[1.1rem] min-[380px]:!text-[1.25rem]" />
          </Link>
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-9 xl:gap-11">
              {primaryNav.map((item) => {
                const panelId = `mega-${item.label.toLowerCase().replace(/\s+/g, '-')}`
                return (
                  <li
                    key={item.label}
                    onMouseEnter={() => (item.mega ? openMega(item.label) : scheduleClose())}
                    onFocus={() => (item.mega ? openMega(item.label) : setMega(null))}
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget as Node)) setMega((m) => (m === item.label ? null : m))
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Escape' && mega) {
                        setMega(null)
                        ;(e.currentTarget.querySelector('a') as HTMLElement | null)?.focus()
                      }
                    }}
                  >
                    <Link
                      to={item.to}
                      aria-current={isActive(item.to) ? 'page' : undefined}
                      aria-expanded={item.mega ? mega === item.label : undefined}
                      aria-controls={item.mega ? panelId : undefined}
                      className={cn('link-underline py-7 text-[0.7rem] font-medium uppercase tracking-[0.2em]', mega === item.label && 'bg-[length:100%_1px]')}
                    >
                      {item.label}
                    </Link>
                    {item.mega && <MegaPanel menu={item.mega} open={mega === item.label} id={panelId} label={item.label} />}
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>

        {/* Right */}
        <div className="-mr-2.5 flex items-center justify-end min-[380px]:-mr-3">
          <button type="button" className={iconBtn} onClick={openSearch} aria-label="Search (press /)" aria-haspopup="dialog">
            <Icon name="search" />
          </button>
          <Link to="/account" className={cn(iconBase, 'hidden sm:inline-flex')} aria-label="Account">
            <Icon name="user" />
          </Link>
          <Link to="/wishlist" className={cn(iconBase, 'hidden sm:inline-flex')} aria-label={`Wishlist, ${wishCount} ${wishCount === 1 ? 'item' : 'items'}`}>
            <Icon name="heart" />
            {wishCount > 0 && <span className="absolute right-2 top-2 size-1.5 rounded-full bg-brass" aria-hidden="true" />}
          </Link>
          <button type="button" className={iconBtn} onClick={openBag} aria-label={`Bag, ${count} ${count === 1 ? 'item' : 'items'}`} aria-haspopup="dialog">
            <Icon name="bag" />
            {count > 0 && (
              <span
                key={count}
                className="absolute right-0 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-ink px-1 text-[0.6rem] font-medium tabular-nums text-ivory transition-[scale] duration-300 ease-luxe starting:scale-50 min-[380px]:right-0.5 min-[380px]:top-1.5"
                aria-hidden="true"
              >
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  )
}
