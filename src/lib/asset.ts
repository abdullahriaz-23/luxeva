/**
 * Resolves a file inside /public/images respecting Vite's `base` option,
 * so the template also works when deployed to a sub-folder.
 *
 *   img('products/aurelia-wool-coat-1.svg') -> '/images/products/aurelia-wool-coat-1.svg'
 */
export const img = (path: string) => `${import.meta.env.BASE_URL}images/${path.replace(/^\//, '')}`
