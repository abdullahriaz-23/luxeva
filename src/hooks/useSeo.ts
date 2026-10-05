import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { site } from '@/config/site'

interface SeoOptions {
  title?: string
  description?: string
  image?: string
  type?: 'website' | 'article' | 'product'
  noindex?: boolean
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

const absolute = (path: string) => {
  if (/^https?:\/\//.test(path)) return path
  const origin = site.url || window.location.origin
  return `${origin}${path.startsWith('/') ? '' : '/'}${path}`
}

/** Sets the document title, description, canonical and Open Graph / Twitter tags per page. */
export function useSeo({ title, description, image, type = 'website', noindex }: SeoOptions) {
  const { pathname } = useLocation()
  useEffect(() => {
    const fullTitle = title ? `${title} — ${site.titleSuffix}` : `${site.name} — ${site.tagline}`
    const desc = description ?? site.description
    const ogImage = absolute(image && !image.endsWith('.svg') ? image : `${import.meta.env.BASE_URL}${site.ogImage}`)
    const url = absolute(pathname)

    document.title = fullTitle
    setMeta('name', 'description', desc)
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow')
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', desc)
    setMeta('property', 'og:type', type === 'product' ? 'product' : type)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', ogImage)
    setMeta('property', 'og:site_name', site.name)
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', desc)
    setMeta('name', 'twitter:image', ogImage)

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url
  }, [title, description, image, type, noindex, pathname])
}
