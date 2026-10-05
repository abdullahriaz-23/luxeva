import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router'
import type { CartLine, Order, Product } from '@/types'
import { getProductById } from '@/data/products'
import { readStorage, writeStorage } from '@/lib/storage'
import { site } from '@/config/site'
import {
  CartContext,
  OrdersContext,
  ToastContext,
  UIContext,
  WishlistContext,
  type ResolvedCartLine,
  type Toast,
} from './contexts'

const MAX_QTY = 10

/** Keeps a piece of state in sync with localStorage and with other browser tabs. */
function usePersistentState<T>(name: string, fallback: T) {
  const [value, setValue] = useState<T>(() => readStorage(name, fallback))
  useEffect(() => writeStorage(name, value), [name, value])
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === `${site.storagePrefix}:${name}`) setValue(readStorage(name, fallback))
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
    // fallback is intentionally excluded — it is a constant default
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name])
  return [value, setValue] as const
}

export function StoreProvider({ children }: { children: ReactNode }) {
  /* ───────── Cart ───────── */
  const [rawLines, setRawLines] = usePersistentState<CartLine[]>('bag', [])

  const lines = useMemo<ResolvedCartLine[]>(
    () =>
      rawLines.flatMap((line) => {
        const product = getProductById(line.productId)
        return product ? [{ ...line, product, lineTotal: product.price * line.quantity }] : []
      }),
    [rawLines],
  )
  const count = lines.reduce((n, l) => n + l.quantity, 0)
  const subtotal = lines.reduce((n, l) => n + l.lineTotal, 0)

  const add = useCallback(
    (product: Product, { color, size, quantity = 1 }: { color: string; size: string; quantity?: number }) => {
      const key = `${product.id}|${color}|${size}`
      setRawLines((prev) => {
        const existing = prev.find((l) => l.key === key)
        if (existing) {
          return prev.map((l) => (l.key === key ? { ...l, quantity: Math.min(MAX_QTY, l.quantity + quantity) } : l))
        }
        return [...prev, { key, productId: product.id, color, size, quantity: Math.min(MAX_QTY, quantity) }]
      })
    },
    [setRawLines],
  )
  const setQuantity = useCallback(
    (key: string, quantity: number) =>
      setRawLines((prev) =>
        quantity <= 0
          ? prev.filter((l) => l.key !== key)
          : prev.map((l) => (l.key === key ? { ...l, quantity: Math.min(MAX_QTY, quantity) } : l)),
      ),
    [setRawLines],
  )
  const remove = useCallback((key: string) => setRawLines((prev) => prev.filter((l) => l.key !== key)), [setRawLines])
  const clear = useCallback(() => setRawLines([]), [setRawLines])

  const cart = useMemo(
    () => ({ lines, count, subtotal, add, setQuantity, remove, clear }),
    [lines, count, subtotal, add, setQuantity, remove, clear],
  )

  /* ───────── Wishlist ───────── */
  const [ids, setIds] = usePersistentState<string[]>('wishlist', [])
  const validIds = useMemo(() => ids.filter((id) => getProductById(id)), [ids])
  const has = useCallback((id: string) => validIds.includes(id), [validIds])
  const toggle = useCallback(
    (product: Product) =>
      setIds((prev) => (prev.includes(product.id) ? prev.filter((i) => i !== product.id) : [product.id, ...prev])),
    [setIds],
  )
  const removeWish = useCallback((id: string) => setIds((prev) => prev.filter((i) => i !== id)), [setIds])
  const wishlist = useMemo(
    () => ({ ids: validIds, count: validIds.length, has, toggle, remove: removeWish }),
    [validIds, has, toggle, removeWish],
  )

  /* ───────── Orders (demo) ───────── */
  const [orders, setOrders] = usePersistentState<Order[]>('orders', [])
  const addOrder = useCallback((order: Order) => setOrders((prev) => [order, ...prev].slice(0, 20)), [setOrders])
  const ordersValue = useMemo(() => ({ orders, addOrder }), [orders, addOrder])

  /* ───────── UI overlays ───────── */
  const [bagOpen, setBagOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [quickView, setQuickView] = useState<Product | null>(null)
  const [sizeGuide, setSizeGuide] = useState<string | null>(null)

  const { pathname, search } = useLocation()
  const [lastLocation, setLastLocation] = useState(pathname + search)
  if (lastLocation !== pathname + search) {
    // Close every overlay when the route changes (adjusting state during render).
    setLastLocation(pathname + search)
    setBagOpen(false)
    setSearchOpen(false)
    setQuickView(null)
    setSizeGuide(null)
  }

  const ui = useMemo(
    () => ({
      bagOpen,
      openBag: () => setBagOpen(true),
      closeBag: () => setBagOpen(false),
      searchOpen,
      openSearch: () => setSearchOpen(true),
      closeSearch: () => setSearchOpen(false),
      quickView,
      openQuickView: (p: Product) => setQuickView(p),
      closeQuickView: () => setQuickView(null),
      sizeGuide,
      openSizeGuide: (tableId = 'women') => setSizeGuide(tableId),
      closeSizeGuide: () => setSizeGuide(null),
    }),
    [bagOpen, searchOpen, quickView, sizeGuide],
  )

  /* ───────── Toasts ───────── */
  const [toasts, setToasts] = useState<Toast[]>([])
  const nextId = useRef(1)
  const dismiss = useCallback((id: number) => setToasts((prev) => prev.filter((t) => t.id !== id)), [])
  const notify = useCallback(
    (toast: Omit<Toast, 'id'>) => {
      const id = nextId.current++
      setToasts((prev) => [...prev.slice(-2), { ...toast, id }])
      window.setTimeout(() => dismiss(id), 4200)
    },
    [dismiss],
  )
  const toastValue = useMemo(() => ({ toasts, notify, dismiss }), [toasts, notify, dismiss])

  return (
    <CartContext.Provider value={cart}>
      <WishlistContext.Provider value={wishlist}>
        <OrdersContext.Provider value={ordersValue}>
          <UIContext.Provider value={ui}>
            <ToastContext.Provider value={toastValue}>{children}</ToastContext.Provider>
          </UIContext.Provider>
        </OrdersContext.Provider>
      </WishlistContext.Provider>
    </CartContext.Provider>
  )
}
