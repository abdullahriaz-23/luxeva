import { lazy } from 'react'
import { Route, Routes } from 'react-router'
import { Layout } from '@/components/layout/Layout'
import Home from '@/pages/Home'

// Every page except the homepage is code-split and loaded on demand.
const Shop = lazy(() => import('@/pages/Shop'))
const Product = lazy(() => import('@/pages/Product'))
const Cart = lazy(() => import('@/pages/Cart'))
const Checkout = lazy(() => import('@/pages/Checkout'))
const Wishlist = lazy(() => import('@/pages/Wishlist'))
const Search = lazy(() => import('@/pages/Search'))
const Collections = lazy(() => import('@/pages/Collections'))
const CollectionDetail = lazy(() => import('@/pages/CollectionDetail'))
const About = lazy(() => import('@/pages/About'))
const Journal = lazy(() => import('@/pages/Journal'))
const Article = lazy(() => import('@/pages/Article'))
const Contact = lazy(() => import('@/pages/Contact'))
const Account = lazy(() => import('@/pages/Account'))
const Login = lazy(() => import('@/pages/Login'))
const Signup = lazy(() => import('@/pages/Signup'))
const Privacy = lazy(() => import('@/pages/Privacy'))
const Terms = lazy(() => import('@/pages/Terms'))
const NotFound = lazy(() => import('@/pages/NotFound'))

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="product/:slug" element={<Product />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="search" element={<Search />} />
        <Route path="collections" element={<Collections />} />
        <Route path="collections/:slug" element={<CollectionDetail />} />
        <Route path="about" element={<About />} />
        <Route path="journal" element={<Journal />} />
        <Route path="journal/:slug" element={<Article />} />
        <Route path="contact" element={<Contact />} />
        <Route path="account" element={<Account />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
