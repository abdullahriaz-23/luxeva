import { useEffect, useRef, useState, type ReactNode, type RefObject } from 'react'
import { createPortal } from 'react-dom'
import { useOverlay } from '@/hooks/useOverlay'
import { cn } from '@/lib/cn'

type Variant = 'center' | 'right' | 'left' | 'full' | 'top'

interface DialogProps {
  open: boolean
  onClose: () => void
  /** Accessible name (use either label or labelledBy) */
  label?: string
  labelledBy?: string
  variant?: Variant
  className?: string
  initialFocusRef?: RefObject<HTMLElement | null>
  children: ReactNode
}

const EXIT_MS = 520

const panelVariants: Record<Variant, string> = {
  center:
    'inset-x-0 bottom-0 max-h-[92svh] sm:inset-auto sm:left-1/2 sm:top-1/2 sm:max-h-[min(90svh,56rem)] sm:w-[min(92vw,64rem)] sm:-translate-x-1/2 sm:-translate-y-1/2 ' +
    'translate-y-0 starting:translate-y-full data-[state=closed]:translate-y-full sm:starting:translate-y-[-46%] sm:data-[state=closed]:translate-y-[-46%] sm:starting:opacity-0 sm:data-[state=closed]:opacity-0',
  right: 'inset-y-0 right-0 w-full max-w-[30rem] translate-x-0 starting:translate-x-full data-[state=closed]:translate-x-full',
  left: 'inset-y-0 left-0 w-full max-w-[34rem] translate-x-0 starting:-translate-x-full data-[state=closed]:-translate-x-full',
  full: 'inset-0 opacity-100 starting:opacity-0 data-[state=closed]:opacity-0',
  top: 'inset-x-0 top-0 max-h-[100svh] translate-y-0 starting:-translate-y-8 starting:opacity-0 data-[state=closed]:-translate-y-8 data-[state=closed]:opacity-0',
}

/**
 * Base for every overlay (quick view, bag drawer, mobile menu, search, size guide).
 * Renders into a portal, animates in/out, and delegates accessibility to useOverlay.
 */
export function Dialog({ open, onClose, label, labelledBy, variant = 'center', className, initialFocusRef, children }: DialogProps) {
  const [mounted, setMounted] = useState(open)
  const panelRef = useRef<HTMLDivElement>(null)

  if (open && !mounted) setMounted(true)

  useEffect(() => {
    if (open || !mounted) return
    const t = window.setTimeout(() => setMounted(false), EXIT_MS)
    return () => window.clearTimeout(t)
  }, [open, mounted])

  useOverlay(open && mounted, panelRef, onClose, initialFocusRef)

  if (!mounted) return null
  const state = open ? 'open' : 'closed'

  return createPortal(
    <div className="fixed inset-0 z-[80]" data-state={state}>
      <div
        className="absolute inset-0 bg-ink/45 opacity-100 transition-opacity duration-500 ease-luxe starting:opacity-0 data-[state=closed]:opacity-0"
        data-state={state}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        aria-labelledby={labelledBy}
        tabIndex={-1}
        data-state={state}
        data-overlay-panel
        className={cn(
          'absolute flex flex-col bg-ivory text-ink shadow-[var(--shadow-panel)] outline-none transition-[translate,opacity,transform] duration-500 ease-drawer',
          panelVariants[variant],
          className,
        )}
      >
        {children}
      </div>
    </div>,
    document.body,
  )
}

/** Standard close button for overlays */
export function CloseButton({ onClick, label = 'Close', className }: { onClick: () => void; label?: string; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn('inline-flex size-11 items-center justify-center transition-opacity hover:opacity-60', className)}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true">
        <path d="M5 5l14 14M19 5 5 19" />
      </svg>
    </button>
  )
}
