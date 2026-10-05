# LUXEVA

### Luxury Fashion E-commerce Template

LUXEVA is a premium, editorial frontend template for fashion, accessories and lifestyle brands. It combines the art direction of a fashion magazine with a complete, working storefront experience: product listing, filtering, product detail, quick view, wishlist, shopping bag and a demonstration checkout.

> **Frontend only.** LUXEVA ships with no backend, database, authentication or payment processing. The checkout, customer account, login/sign-up, contact form and newsletter are **frontend demonstrations** that validate input and show polished success states — nothing is sent, charged or stored on a server. See [Connecting a backend](#connecting-a-backend).

LUXEVA is a fictional brand. All names, copy, statistics, addresses and imagery are demo content created for this template.

---

## Contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Installation](#installation)
- [Development](#development)
- [Production build](#production-build)
- [Project structure](#project-structure)
- [Customization](#customization)
  - [Brand name](#changing-the-brand-name) · [Logo](#changing-the-logo) · [Colours](#changing-colours) · [Typography](#changing-typography)
  - [Products](#addingremoving-products) · [Product images](#changing-product-images) · [Prices](#changing-prices) · [Collections](#changing-collections) · [Articles](#changing-articles) · [Navigation](#changing-navigation)
- [Connecting a backend](#connecting-a-backend) · [Authentication](#connecting-authentication) · [Payments](#connecting-a-real-payment-provider)
- [SEO](#seo)
- [Deployment](#deployment) — Vercel · Netlify · Cloudflare Pages
- [Accessibility](#accessibility)
- [Asset licensing](#asset-licensing)
- [Support](#support)

---

## Features

**Pages (19 routes)**

| Route | Page |
| --- | --- |
| `/` | Editorial homepage |
| `/shop` | Product listing with filters, sorting, search and load-more |
| `/product/:slug` | Product detail with gallery, colour/size selection, size guide, accordions, related products |
| `/cart` | Shopping bag with quantities, subtotal, shipping estimate and total |
| `/checkout` | Demo checkout (contact, address, delivery, demo payment) + confirmation |
| `/wishlist` | Saved pieces with move-to-bag |
| `/search?q=` | Search results |
| `/collections` | All collections |
| `/collections/:slug` | Collection story, products and campaign |
| `/about` | Story, philosophy, craftsmanship, materials, timeline, values |
| `/journal` | Editorial articles with category filters |
| `/journal/:slug` | Article |
| `/contact` | Validated contact form, client services, showroom, FAQ |
| `/account` | Demo customer account (profile, orders, saved, addresses, preferences) |
| `/login`, `/signup` | Demo authentication screens with validation |
| `/privacy`, `/terms` | Template legal pages |
| `*` | Custom 404 |

**Homepage sections** — cinematic hero with blended headline · editorial “Less, but better.” intro · featured collection with staggered grid · FORM / FUNCTION split campaign · New Arrivals rail with working tabs and sorting · Lookbook with “Shop the look” modals · Craftsmanship story with statistics · dramatic category panels · Journal preview · Newsletter.

**Commerce interactions (all working locally)**

- Add to bag, change quantity, remove, clear — persisted in `localStorage` and synced across tabs
- Slide-in bag drawer with complimentary-delivery progress
- Wishlist persisted in `localStorage`, with move-to-bag
- Quick view modal (gallery, colour, size, add to bag)
- Size guide modal with tabbed tables and cm / inch toggle
- Shop filters (category, price range, new arrivals), sorting, in-shop search, load more — all reflected in the URL so filtered views are shareable
- Instant search overlay (press <kbd>/</kbd> anywhere)
- Demo checkout with validation, delivery methods and order confirmation; demo orders appear in the account page
- Toast notifications

**Quality**

- React + TypeScript (strict), Tailwind CSS v4 with centralised design tokens
- Code-split routes, lazy-loaded imagery, self-hosted variable fonts
- Accessible dialogs (focus trap, Escape, inert background, focus restore), accordions, tabs, menus and forms
- `prefers-reduced-motion` support
- Responsive from 320 px to 1920 px+, tested without horizontal scrolling
- Per-page titles, descriptions, canonical URLs and Open Graph / Twitter tags; `robots.txt`, `sitemap.xml`, favicon, web manifest

---

## Tech stack

| | |
| --- | --- |
| Framework | React 19 |
| Language | TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Routing | React Router 7 |
| Fonts | Bodoni Moda & Jost (variable, self-hosted via Fontsource, SIL OFL) |
| Linting | ESLint 10 + typescript-eslint + react-hooks |

There are no other runtime dependencies: no UI kit, no state library, no animation library.

**Requirements:** Node.js 20.19+ or 22.13+ (Node 22 LTS recommended — see `.nvmrc`).

---

## Installation

```bash
# npm
npm install

# or pnpm
pnpm install
```

Optionally copy the environment example and set your public URL (used for canonical and Open Graph tags):

```bash
cp .env.example .env
```

## Development

```bash
npm run dev        # or: pnpm dev
```

Open http://localhost:5173.

Other scripts:

```bash
npm run lint       # ESLint
npm run typecheck  # TypeScript project check
npm run sitemap    # regenerate public/sitemap.xml (see SEO)
```

## Production build

```bash
npm run build      # or: pnpm build — outputs to /dist
npm run preview    # serve the production build locally
```

---

## Project structure

```
luxeva/
├── public/
│   ├── images/
│   │   ├── products/        ← product images  (<slug>-1/-2/-3)
│   │   ├── campaign/        ← hero & campaign visuals
│   │   ├── categories/      ← Women / Men / Accessories panels
│   │   ├── collections/     ← collection heroes
│   │   ├── lookbook/        ← lookbook looks
│   │   ├── journal/         ← article images
│   │   └── og-image.png     ← social sharing image (1200 × 630)
│   ├── favicon.svg, apple-touch-icon.png, site.webmanifest
│   ├── robots.txt, sitemap.xml
├── scripts/sitemap.mjs      ← sitemap generator
├── src/
│   ├── config/site.ts       ← brand name, contact details, currency, shipping rules
│   ├── data/                ← ALL demo content (typed)
│   │   ├── products.ts      ← catalogue
│   │   ├── collections.ts
│   │   ├── articles.ts
│   │   ├── lookbook.ts
│   │   ├── navigation.ts    ← header, mega menus, footer
│   │   ├── sizeGuide.ts
│   │   └── faq.ts
│   ├── styles/index.css     ← DESIGN TOKENS + base styles
│   ├── components/
│   │   ├── layout/          ← Navbar, MegaPanel, MobileMenu, Footer, Layout…
│   │   ├── ui/              ← Button, Dialog, Accordion, Field, Icon, Logo, Toaster…
│   │   ├── product/         ← ProductCard, ProductGrid, QuickView, SizeGuide, selectors…
│   │   ├── cart/            ← BagDrawer, CartItem, FreeShippingBar
│   │   ├── search/          ← SearchOverlay
│   │   └── editorial/       ← EditorialSplit, LookbookGrid, ArticleCard, CollectionCard, Newsletter
│   ├── sections/home/       ← homepage sections
│   ├── pages/               ← one file per route
│   ├── context/             ← cart / wishlist / orders / UI / toast state
│   ├── hooks/               ← useStore, useOverlay, useSeo, useReveal, useAddToBag
│   ├── lib/                 ← formatting, search, storage, asset helper
│   ├── types/               ← shared TypeScript types
│   ├── App.tsx              ← routes
│   └── main.tsx
├── netlify.toml, vercel.json
└── .env.example
```

---

## Customization

Almost everything a buyer typically changes lives in **three places**: `src/config/site.ts`, `src/data/*` and `src/styles/index.css`.

### Changing the brand name

Edit `src/config/site.ts`:

```ts
export const site = {
  name: 'LUXEVA',
  titleSuffix: 'LUXEVA',
  tagline: 'Designed for the moments that matter.',
  description: '…',
  contact: { email: '…', phone: '…', showroom: { … } },
  …
}
```

The name flows into the header wordmark, footer, page titles and meta tags. Also update the static fallbacks in `index.html`, `public/site.webmanifest` and any copy in `src/data/*` / `src/pages/About.tsx` that mentions the brand.

### Changing the logo

The logo is typographic — `src/components/ui/Logo.tsx`. To use an image logo, replace the `<span>` with an image:

```tsx
<img src="/logo.svg" alt="Your Brand" className="h-6 w-auto" />
```

Replace `public/favicon.svg` and `public/apple-touch-icon.png` (180 × 180) with your own icons.

### Changing colours

All colours are design tokens in `src/styles/index.css` inside the `@theme { … }` block:

```css
--color-ivory: #f6f2ea;   /* page background */
--color-cream: #efe8dc;   /* alternate sections */
--color-sand:  #e4dbcc;   /* image placeholders */
--color-taupe: #6b6359;   /* muted text */
--color-ink:   #141210;   /* text, primary buttons, dark sections */
--color-brass: #a8875a;   /* accent */
```

Every utility (`bg-ivory`, `text-ink`, `border-line` …) updates automatically. Keep muted text at a 4.5:1 contrast ratio against the background.

Spacing, motion (`--ease-luxe`, durations), shadows and the container width are tokens in the same block.

**Theme:** LUXEVA is designed as a light luxury theme; dark tones are used editorially (lookbook, categories, footer) rather than as a global dark mode, to keep the fashion aesthetic intact.

### Changing typography

Fonts are self-hosted with [Fontsource](https://fontsource.org). To swap:

```bash
npm install @fontsource-variable/your-font
```

Then in `src/styles/index.css` replace the `@import` lines at the top and update:

```css
--font-display: 'Your Display Font Variable', Georgia, serif;
--font-sans: 'Your Sans Variable', Arial, sans-serif;
```

Type scale utilities (`display-xxl`, `display-xl`, `display-lg`, `display-md`, `eyebrow`, `lede`) are defined in the same file.

### Adding/removing products

Products live in `src/data/products.ts`. Copy an existing entry and change the fields:

```ts
{
  id: 'p-025',                       // unique
  slug: 'my-new-product',            // used in /product/my-new-product
  name: 'My New Product',
  category: 'women',                 // women | men | shoes | bags | accessories
  price: 450,
  summary: 'One-line description for cards & quick view.',
  description: 'Full product description.',
  details: ['Bullet', 'points'],
  composition: '100% wool',
  care: 'Dry clean only.',
  madeIn: 'Made in Italy',
  images: ['/images/products/my-new-product-1.jpg', '/images/products/my-new-product-2.jpg'],
  colors: [{ name: 'Black', hex: '#111111' }],
  sizes: ['XS', 'S', 'M', 'L'],      // use ['One Size'] for bags/accessories
  soldOutSizes: ['XS'],              // optional
  featured: true,                    // homepage / suggestions
  newArrival: true,                  // "New In" and New Arrivals rail
  collections: ['essentials'],       // collection slugs
  addedAt: '2026-10-01',             // used for "Newest" sorting
},
```

To remove a product, delete its entry. Bag and wishlist entries that reference removed products are ignored automatically.

> Tip: use `img('products/file.jpg')` (from `@/lib/asset`) instead of a hard-coded `/images/...` path if you deploy the site to a sub-folder.

### Changing product images

1. Add your photography to **`public/images/products/`** (JPG/WebP recommended, **4:5 ratio**, e.g. 1600 × 2000 px).
2. Point the product’s `images` array at the new files in `src/data/products.ts`. The demo uses a small helper:

   ```ts
   const gallery = (slug: string) => [1, 2, 3].map((n) => img(`products/${slug}-${n}.svg`))
   ```

   Change `.svg` to `.jpg` and name your files `<slug>-1.jpg`, `<slug>-2.jpg`, `<slug>-3.jpg` — or list paths by hand.
3. The **first** image is the main image; the **second** is shown on hover in product cards; all images appear in the product gallery.

**Other imagery**

| What | Where to replace | Referenced in |
| --- | --- | --- |
| Homepage hero | `public/images/campaign/hero.svg` (+ `hero-detail.svg`) | `src/sections/home/HomeHero.tsx` |
| FORM / FUNCTION campaign | `public/images/campaign/form-function.svg` | `src/sections/home/FormFunction.tsx` |
| Craft / atelier | `public/images/campaign/craft.svg`, `atelier.svg` | home sections, About |
| Category panels | `public/images/categories/*.svg` | `src/sections/home/CategoryExperience.tsx` |
| Lookbook | `public/images/lookbook/*.svg` | `src/data/lookbook.ts` |
| Collections | `public/images/collections/*.svg` | `src/data/collections.ts` |
| Journal | `public/images/journal/*.svg` | `src/data/articles.ts` |
| Mega-menu features | — | `src/data/navigation.ts` |
| Social sharing | `public/images/og-image.png` (1200 × 630) | `src/config/site.ts` |

Recommended ratios: hero 4:5 or 5:4 (it is cropped with `object-cover`), categories 9:13, lookbook 9:13, collections 4:5, journal 4:3.

### Changing prices

Edit `price` on each product in `src/data/products.ts`. Currency, locale, the complimentary-delivery threshold, standard shipping and an optional tax rate are in `src/config/site.ts`:

```ts
commerce: {
  currency: 'USD',          // e.g. 'EUR', 'GBP'
  locale: 'en-US',          // e.g. 'fr-FR'
  freeShippingThreshold: 500,
  standardShipping: 25,
  taxRate: 0,               // e.g. 0.2 to show 20 % estimated tax
},
```

Delivery methods for checkout are in `deliveryMethods` in the same file.

### Changing collections

Edit `src/data/collections.ts` (name, season, statement, story, hero and campaign images). Assign products to a collection by adding its `slug` to the product’s `collections` array.

### Changing articles

Edit `src/data/articles.ts`. The body is a list of blocks:

```ts
body: [
  { type: 'p', text: 'Paragraph…' },
  { type: 'h2', text: 'Heading' },
  { type: 'quote', text: 'Pull quote', cite: 'Optional' },
  { type: 'image', src: img('journal/photo.jpg'), alt: '…', caption: '…' },
]
```

Categories are listed in `articleCategories`.

### Changing navigation

`src/data/navigation.ts` contains:

- `primaryNav` — header links; items with a `mega` object get a desktop mega menu and an expandable mobile section
- `footerNav` — footer columns

Social links are in `src/config/site.ts`.

---

## Connecting a backend

All data access goes through `src/data/*` and the state in `src/context/StoreProvider.tsx`, so replacing demo data is straightforward:

- **Products / collections / articles** — replace the arrays with data fetched from a headless CMS or commerce API (e.g. Shopify Storefront API, Medusa, Saleor, Sanity, Contentful). Keep the `Product`, `Collection` and `Article` types in `src/types` as your mapping layer and fetch in the page components (or adopt React Router data loaders).
- **Bag** — `add`, `setQuantity`, `remove` and `clear` in `StoreProvider.tsx` currently write to `localStorage`. Swap their bodies for calls to your cart API.
- **Forms** — the contact form (`src/pages/Contact.tsx`) and newsletter (`src/components/editorial/Newsletter.tsx`) validate locally and show a demo success state. Post to your endpoint (Formspree, a serverless function, your CRM / email platform) inside the `submit` handlers.
- **Environment variables** — expose public values with the `VITE_` prefix (see `.env.example`). Never put secret keys in frontend code.

## Connecting authentication

`/login`, `/signup` and `/account` are visual demonstrations: they validate input and then show a sample account. **No user is created or authenticated.** To add real accounts:

1. Choose a provider (Auth0, Clerk, Supabase Auth, Firebase Auth, or your commerce platform’s customer API).
2. Call it from the `submit` handlers in `src/pages/Login.tsx` and `src/pages/Signup.tsx`.
3. Store the session in a context alongside the existing providers and protect `/account` with a redirect when no session exists.
4. Replace the sample data in `src/pages/Account.tsx` (`sampleOrders`, profile defaults) with the customer’s data.

## Connecting a real payment provider

The checkout (`src/pages/Checkout.tsx`) **does not collect or process card details**. The payment step shows a clearly labelled demo method (“Demo card ending in •••• 4242”) and `submit` simulates a short delay before showing the confirmation.

To take real payments, use a hosted or PCI-compliant integration — never handle raw card numbers yourself:

- **Stripe Checkout / Payment Element**, **Adyen Drop-in**, **PayPal**, or your commerce platform’s hosted checkout (e.g. Shopify).
- Create the payment session on a server (serverless function) using your secret key, then redirect or mount the provider’s component in the payment step.
- Create the order server-side after the provider confirms payment (webhooks), then show the confirmation screen.

---

## SEO

- Per-page `<title>`, description, canonical, Open Graph and Twitter tags via `src/hooks/useSeo.ts`.
- Set `VITE_SITE_URL` in `.env` so canonical and `og:url` use your production domain.
- `public/robots.txt` — update the `Sitemap:` URL.
- `public/sitemap.xml` — regenerate after changing products, collections or articles:

  ```bash
  SITE_URL=https://www.your-domain.com npm run sitemap
  ```

- Utility pages (bag, checkout, account, search, auth) are marked `noindex`.

> LUXEVA is a client-rendered single-page app. Most search engines render JavaScript, but if SEO is critical you can pre-render routes or move to a framework with server rendering.

---

## Deployment

The build output is a static folder (`dist`). All routes must fall back to `index.html` (single-page app) — configs are included.

### Vercel

1. Import the repository in Vercel.
2. Framework preset: **Vite** · Build command: `npm run build` · Output: `dist`.
3. `vercel.json` already contains the SPA rewrite.
4. Add `VITE_SITE_URL` under *Environment Variables*.

### Netlify

1. New site from Git.
2. `netlify.toml` sets the build command, publish directory and SPA redirect automatically.
3. Add `VITE_SITE_URL` under *Site configuration → Environment variables*.

### Cloudflare Pages

1. Create a project and connect the repository.
2. Framework preset: **Vite** (or *None*) · Build command: `npm run build` · Output directory: `dist`.
3. Cloudflare Pages serves `index.html` for unknown routes automatically when no `404.html` is present, so client-side routing works without extra configuration.
4. Add `VITE_SITE_URL` (and `NODE_VERSION=22` if needed) under *Settings → Environment variables*.

**Sub-folder deployments:** set `base: '/your-folder/'` in `vite.config.ts`. Routing and all images referenced through `img()` respect it.

---

## Accessibility

- Semantic landmarks, skip link, breadcrumbs and headings
- Dialogs (quick view, bag, menu, search, size guide, look modal): `role="dialog"`, `aria-modal`, focus trap, Escape to close, background made `inert`, scroll lock, focus restored to the trigger
- Accordions with `aria-expanded` / `aria-controls`; tabs with arrow-key navigation
- Colour and size selectors use native radio inputs; sold-out sizes are announced
- Visible focus states throughout; touch targets ≥ 40 px
- Live regions for search results, filters and notifications
- `prefers-reduced-motion` disables reveals, marquee and transitions

---

## Asset licensing

- **Imagery** — every image in `public/images` is an original vector illustration generated for this template (tonal still-life and abstract compositions). They contain no photography, models, logos or third-party artwork, and may be used in projects built with this template. They are intended as **placeholders**: replace them with photography you own or have licensed.
- **Fonts** — Bodoni Moda and Jost are licensed under the [SIL Open Font License 1.1](https://openfontlicense.org) and bundled via Fontsource.
- **Icons** — drawn for this template (`src/components/ui/Icon.tsx`).
- **Copy** — all text (brand story, products, articles, legal pages) is fictional demo content. Legal pages are **not legal advice** — replace them with policies reviewed by a qualified professional.

Make sure any photography, fonts or content you add are properly licensed for commercial use.

---

## Support

Please read this README first — it covers the most common customisations. When requesting support, include your Node.js version, package manager, the command you ran and the full error output. Support covers the template as supplied; custom development, backend integrations and third-party services are outside its scope.

See `LICENSE.txt` for licensing terms.
