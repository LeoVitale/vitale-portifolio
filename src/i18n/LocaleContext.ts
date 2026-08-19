import { createContext, useContext } from 'react'
import type { Locale } from '../content/types'

export interface LocaleContextValue {
  locale: Locale
  selectLocale(target: Locale): void
}

export const LocaleContext = createContext<LocaleContextValue | null>(null)

export function useLocaleContext() {
  const value = useContext(LocaleContext)
  if (!value) throw new Error('LocaleContext must be used within LocaleBoundary')
  return value
}
