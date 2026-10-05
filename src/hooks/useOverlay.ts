import { useEffect, useRef, type RefObject } from 'react'

let lockCount = 0
let savedPadding = ''

function lockScroll() {
  if (lockCount === 0) {
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    savedPadding = document.body.style.paddingRight
    document.body.style.overflow = 'hidden'
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`
    document.documentElement.style.setProperty('--scrollbar-comp', `${scrollbar}px`)
    const root = document.getElementById('root')
    if (root) root.inert = true
  }
  lockCount++
}

function unlockScroll() {
  lockCount = Math.max(0, lockCount - 1)
  if (lockCount === 0) {
    document.body.style.overflow = ''
    document.body.style.paddingRight = savedPadding
    document.documentElement.style.setProperty('--scrollbar-comp', '0px')
    const root = document.getElementById('root')
    if (root) root.inert = false
  }
}

const FOCUSABLE =
  'a[href], area[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Accessible overlay behaviour shared by every modal, drawer and menu:
 * - locks page scroll and makes the app behind it inert
 * - traps keyboard focus inside the panel
 * - closes on Escape
 * - restores focus to the trigger when closed
 */
export function useOverlay(
  active: boolean,
  panelRef: RefObject<HTMLElement | null>,
  onClose: () => void,
  initialFocusRef?: RefObject<HTMLElement | null>,
) {
  const onCloseRef = useRef(onClose)
  useEffect(() => {
    onCloseRef.current = onClose
  })

  useEffect(() => {
    if (!active) return
    const previouslyFocused = document.activeElement as HTMLElement | null
    lockScroll()

    const focusFirst = () => {
      const panel = panelRef.current
      if (!panel) return
      const target = initialFocusRef?.current ?? panel.querySelector<HTMLElement>(FOCUSABLE) ?? panel
      target.focus({ preventScroll: true })
    }
    const raf = requestAnimationFrame(focusFirst)

    const onKey = (e: KeyboardEvent) => {
      const panel = panelRef.current
      if (!panel) return
      if (e.key === 'Escape') {
        // Only the top-most overlay should react
        const overlays = document.querySelectorAll('[data-overlay-panel]')
        if (overlays[overlays.length - 1] !== panel) return
        e.stopPropagation()
        onCloseRef.current()
        return
      }
      if (e.key !== 'Tab') return
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      )
      if (items.length === 0) {
        e.preventDefault()
        return
      }
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && (document.activeElement === first || !panel.contains(document.activeElement))) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && (document.activeElement === last || !panel.contains(document.activeElement))) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('keydown', onKey)
      unlockScroll()
      if (previouslyFocused && document.contains(previouslyFocused)) previouslyFocused.focus({ preventScroll: true })
    }
  }, [active, panelRef, initialFocusRef])
}
