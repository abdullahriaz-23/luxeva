import { createContext } from 'react'
import type { CartLine, Order, Product } from '@/types'

export interface ResolvedCartLine extends CartLine {
  product: Product
  lineTotal: number
}

export interface CartContextValue {
  lines: ResolvedCartLine[]
  count: number
  subtotal: number
  add: (product: Product, options: { color: string; size: string; quantity?: number }) => void
  setQuantity: (key: string, quantity: number) => void
  remove: (key: string) => void
  clear: () => void
}

export interface WishlistContextValue {
  ids: string[]
  count: number
  has: (productId: string) => boolean
  toggle: (product: Product) => void
  remove: (productId: string) => void
}

export interface OrdersContextValue {
  orders: Order[]
  addOrder: (order: Order) => void
}

export interface UIContextValue {
  bagOpen: boolean
  openBag: () => void
  closeBag: () => void
  searchOpen: boolean
  openSearch: () => void
  closeSearch: () => void
  quickView: Product | null
  openQuickView: (product: Product) => void
  closeQuickView: () => void
  sizeGuide: string | null
  openSizeGuide: (tableId?: string) => void
  closeSizeGuide: () => void
}

export interface Toast {
  id: number
  title: string
  description?: string
  image?: string
  action?: { label: string; to: string }
}

export interface ToastContextValue {
  toasts: Toast[]
  notify: (toast: Omit<Toast, 'id'>) => void
  dismiss: (id: number) => void
}

export const CartContext = createContext<CartContextValue | null>(null)
export const WishlistContext = createContext<WishlistContextValue | null>(null)
export const OrdersContext = createContext<OrdersContextValue | null>(null)
export const UIContext = createContext<UIContextValue | null>(null)
export const ToastContext = createContext<ToastContextValue | null>(null)
