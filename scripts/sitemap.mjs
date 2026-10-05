/**
 * Generates public/sitemap.xml from the routes and the slugs in src/data.
 * Usage: SITE_URL=https://www.your-domain.com npm run sitemap
 */
import { readFileSync, writeFileSync } from 'node:fs'

const site = (process.env.SITE_URL || process.env.VITE_SITE_URL || 'https://your-domain.com').replace(/\/$/, '')
const slugs = (file) => [...readFileSync(new URL(`../src/data/${file}`, import.meta.url), 'utf8').matchAll(/slug: '([^']+)'/g)].map((m) => m[1])

const routes = [
  '/', '/shop', '/collections', '/journal', '/about', '/contact', '/privacy', '/terms',
  ...slugs('products.ts').map((s) => `/product/${s}`),
  ...slugs('collections.ts').map((s) => `/collections/${s}`),
  ...slugs('articles.ts').map((s) => `/journal/${s}`),
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((r) => `  <url><loc>${site}${r}</loc></url>`).join('\n')}
</urlset>
`
writeFileSync(new URL('../public/sitemap.xml', import.meta.url), xml)
console.log(`sitemap.xml written with ${routes.length} URLs for ${site}`)
