/** Tiny className joiner — avoids pulling in an extra dependency. */
export const cn = (...parts: Array<string | false | null | undefined>) => parts.filter(Boolean).join(' ')
