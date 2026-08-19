import type { Locale } from '../content/types'

export const localeStorageKey = 'portfolio.locale'

interface StorageLike {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
}

export function normalizeLocale(value: string | undefined | null): Locale | null {
  if (!value) return null
  const normalized = value.toLowerCase()
  if (normalized === 'en' || normalized.startsWith('en-')) return 'en'
  if (normalized === 'pt-br' || normalized === 'pt_br') return 'pt-BR'
  return null
}

export function resolveInitialLocale(
  stored: unknown,
  browserLanguages: readonly string[],
): Locale {
  const storedLocale = typeof stored === 'string' ? normalizeLocale(stored) : null
  if (storedLocale) return storedLocale

  for (const browserLanguage of browserLanguages) {
    const locale = normalizeLocale(browserLanguage)
    if (locale) return locale
  }

  return 'pt-BR'
}

export function readStoredLocale(storage: StorageLike): Locale | null {
  try {
    return normalizeLocale(storage.getItem(localeStorageKey))
  } catch {
    return null
  }
}

export function writeStoredLocale(storage: StorageLike, locale: Locale) {
  try {
    storage.setItem(localeStorageKey, locale)
  } catch {
    // Locale-prefixed navigation remains authoritative when storage is unavailable.
  }
}

export function switchLocale(pathname: string, target: Locale) {
  const targetSegment = target === 'pt-BR' ? 'pt-br' : 'en'
  const segments = pathname.split('/').filter(Boolean)
  if (normalizeLocale(segments[0])) segments.shift()
  return `/${[targetSegment, ...segments].join('/')}`
}
