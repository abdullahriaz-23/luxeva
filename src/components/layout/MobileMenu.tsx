import { useState } from 'react'
import { Link } from 'react-router'
import { primaryNav } from '@/data/navigation'
import { site } from '@/config/site'
import { useCart, useUI, useWishlist } from '@/hooks/useStore'
import { Dialog, CloseButton } from '@/components/ui/Dialog'
import { Logo } from '@/components/ui/Logo'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null)
  const { count } = useCart()
  const { count: wishCount } = useWishlist()
  const { openBag, openSearch } = useUI()

  return (
    <Dialog open={open} onClose={onClose} label="Menu" variant="left" className="max-w-none sm:max-w-[30rem]">
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5">
        <Link to="/" onClick={onClose} aria-label="LUXEVA — home">
          <Logo size="sm" />
        </Link>
        <CloseButton onClick={onClose} label="Close menu" className="-mr-3" />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-10">
        <button
          type="button"
          onClick={() => {
            onClose()
            openSearch()
          }}
          className="mt-5 flex w-full items-center gap-3 border-b border-line-strong pb-3 text-left text-taupe"
        >
          <Icon name="search" size={18} />
          <span className="text-sm">Search the collection</span>
        </button>

        <nav aria-label="Mobile primary" className="mt-6">
          <ul>
            {primaryNav.map((item, i) => {
              const isOpen = expanded === item.label
              const subId = `m-sub-${i}`
              return (
                <li
                  key={item.label}
                  className="border-b border-line transition-[opacity,translate] duration-500 ease-luxe starting:-translate-x-3 starting:opacity-0"
                  style={{ transitionDelay: `${120 + i * 45}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <Link to={item.to} onClick={onClose} className="block flex-1 py-4 font-display text-[2rem] leading-none">
                      {item.label}
                    </Link>
                    {item.mega && (
                      <button
                        type="button"
                        className="inline-flex size-12 items-center justify-center"
                        aria-expanded={isOpen}
                        aria-controls={subId}
                        aria-label={`${isOpen ? 'Hide' : 'Show'} ${item.label} links`}
                        onClick={() => setExpanded(isOpen ? null : item.label)}
                      >
                        <Icon name="chevronDown" size={18} className={cn('transition-transform duration-300', isOpen && 'rotate-180')} />
                      </button>
                    )}
                  </div>
                  {item.mega && (
                    <div id={subId} className={cn('grid transition-[grid-template-rows] duration-500 ease-luxe', isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
                      <div className="overflow-hidden" inert={!isOpen}>
                        <div className="grid grid-cols-2 gap-6 pb-6 pt-1">
                          {item.mega.columns.map((col) => (
                            <div key={col.title}>
                              <p className="eyebrow mb-3 text-taupe">{col.title}</p>
                              <ul className="space-y-2.5">
                                {col.links.map((l) => (
                                  <li key={l.label}>
                                    <Link to={l.to} onClick={onClose} className="text-[0.95rem]">
                                      {l.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>

        <ul className="mt-8 grid grid-cols-2 gap-px border border-line bg-line text-[0.7rem] font-medium uppercase tracking-[0.18em]">
          <li className="bg-ivory">
            <Link to="/account" onClick={onClose} className="flex min-h-14 items-center gap-3 px-4">
              <Icon name="user" size={18} /> Account
            </Link>
          </li>
          <li className="bg-ivory">
            <Link to="/wishlist" onClick={onClose} className="flex min-h-14 items-center gap-3 px-4">
              <Icon name="heart" size={18} /> Wishlist ({wishCount})
            </Link>
          </li>
          <li className="bg-ivory">
            <button
              type="button"
              onClick={() => {
                onClose()
                openBag()
              }}
              className="flex min-h-14 w-full items-center gap-3 px-4 uppercase tracking-[0.18em]"
            >
              <Icon name="bag" size={18} /> Bag ({count})
            </button>
          </li>
          <li className="bg-ivory">
            <Link to="/contact" onClick={onClose} className="flex min-h-14 items-center gap-3 px-4">
              <Icon name="mail" size={18} /> Contact
            </Link>
          </li>
        </ul>

        <div className="mt-10 space-y-1 text-sm text-taupe">
          <p className="eyebrow mb-3 text-ink">Client services</p>
          <p>{site.contact.email}</p>
          <p>{site.contact.phone}</p>
          <p className="pt-4 font-display text-lg italic text-ink">{site.tagline}</p>
        </div>
      </div>
    </Dialog>
  )
}
