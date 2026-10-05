import { useContext, type Context } from 'react'
import { CartContext, OrdersContext, ToastContext, UIContext, WishlistContext } from '@/context/contexts'

function useRequired<T>(ctx: Context<T | null>, name: string): T {
  const value = useContext(ctx)
  if (!value) throw new Error(`${name} must be used inside <StoreProvider>`)
  return value
}

export const useCart = () => useRequired(CartContext, 'useCart')
export const useWishlist = () => useRequired(WishlistContext, 'useWishlist')
export const useOrders = () => useRequired(OrdersContext, 'useOrders')
export const useUI = () => useRequired(UIContext, 'useUI')
export const useToast = () => useRequired(ToastContext, 'useToast')
