import { site } from '@/config/site'

const key = (name: string) => `${site.storagePrefix}:${name}`

/** Safe localStorage read — returns fallback in private mode / SSR / bad JSON. */
export function readStorage<T>(name: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key(name))
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

export function writeStorage<T>(name: string, value: T) {
  try {
    window.localStorage.setItem(key(name), JSON.stringify(value))
  } catch {
    /* storage unavailable — state simply won't persist */
  }
}
