import { createPortal } from 'react-dom'
import { Link } from 'react-router'
import { useToast } from '@/hooks/useStore'
import { Icon } from './Icon'

/** Toast stack — rendered in a portal so it stays visible above modals. */
export function Toaster() {
  const { toasts, dismiss } = useToast()
  return createPortal(
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[95] flex flex-col items-center gap-2 p-4 sm:bottom-6 sm:items-end sm:px-6"
      aria-live="polite"
      aria-atomic="false"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          className="pointer-events-auto flex w-full max-w-sm items-center gap-4 bg-ink p-3 pr-2 text-ivory shadow-[var(--shadow-panel)] transition-[opacity,translate] duration-500 ease-luxe starting:translate-y-4 starting:opacity-0"
        >
          {t.image && <img src={t.image} alt="" className="h-16 w-13 shrink-0 object-cover" />}
          <div className="min-w-0 flex-1 py-1">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em]">{t.title}</p>
            {t.description && <p className="mt-1 truncate text-sm text-ivory/70">{t.description}</p>}
            {t.action && (
              <Link to={t.action.to} className="on-dark mt-2 inline-block text-[0.68rem] uppercase tracking-[0.18em] link-underline-static">
                {t.action.label}
              </Link>
            )}
          </div>
          <button type="button" onClick={() => dismiss(t.id)} aria-label="Dismiss notification" className="on-dark flex size-10 shrink-0 items-center justify-center opacity-70 hover:opacity-100">
            <Icon name="close" size={16} />
          </button>
        </div>
      ))}
    </div>,
    document.body,
  )
}
