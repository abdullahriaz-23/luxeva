/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Public URL of the deployed site, e.g. https://your-domain.com (used for canonical + Open Graph tags) */
  readonly VITE_SITE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
