import { useId, useState, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

export interface AccordionItem {
  id: string
  title: ReactNode
  content: ReactNode
}

/** Accessible disclosure list (button + region, aria-expanded/controls). */
export function Accordion({
  items,
  defaultOpen,
  allowMultiple = false,
  className,
  tone = 'light',
}: {
  items: AccordionItem[]
  defaultOpen?: string[]
  allowMultiple?: boolean
  className?: string
  tone?: 'light' | 'dark'
}) {
  const [open, setOpen] = useState<string[]>(defaultOpen ?? [])
  const baseId = useId()

  const toggle = (id: string) =>
    setOpen((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : allowMultiple ? [...prev, id] : [id],
    )

  return (
    <div className={cn('border-t', tone === 'dark' ? 'border-line-light' : 'border-line', className)}>
      {items.map((item) => {
        const isOpen = open.includes(item.id)
        const btnId = `${baseId}-${item.id}-btn`
        const panelId = `${baseId}-${item.id}-panel`
        return (
          <div key={item.id} className={cn('border-b', tone === 'dark' ? 'border-line-light' : 'border-line')}>
            <h3 className="font-sans">
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left text-[0.72rem] font-medium uppercase tracking-[0.18em]"
              >
                <span>{item.title}</span>
                <span className="relative size-3 shrink-0" aria-hidden="true">
                  <span className="absolute left-0 top-1/2 h-px w-3 bg-current" />
                  <span
                    className={cn(
                      'absolute left-1/2 top-0 h-3 w-px bg-current transition-transform duration-300 ease-luxe',
                      isOpen && 'rotate-90 scale-y-0',
                    )}
                  />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className={cn(
                'grid transition-[grid-template-rows] duration-500 ease-luxe',
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
              )}
            >
              <div className="overflow-hidden" inert={!isOpen}>
                <div className={cn('pb-6 text-[0.95rem] leading-relaxed', tone === 'dark' ? 'text-ivory/75' : 'text-taupe')}>
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
