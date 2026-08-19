import { useEffect, type ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import { SiteLayout } from '../components/layout/SiteLayout'
import { localizedPath } from '../content/routes'
import type { Locale } from '../content/types'
import i18n from '../i18n/config'
import { LocaleContext, useLocaleContext } from '../i18n/LocaleContext'
import {
  readStoredLocale,
  resolveInitialLocale,
  switchLocale,
  writeStoredLocale,
} from '../i18n/locale'
import { AboutPage } from '../pages/AboutPage'
import { CaseStudyPage } from '../pages/CaseStudyPage'
import { HomePage } from '../pages/HomePage'
import { WorkPage } from '../pages/WorkPage'

const prioritySlugs = new Set(['net-now', 'xbox-one', 'sky-online', 'microsoft-gpa'])

function LocaleBoundary({ locale }: { locale: Locale }) {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    document.documentElement.lang = locale
    void i18n.changeLanguage(locale)
  }, [locale])

  function selectLocale(target: Locale) {
    writeStoredLocale(window.localStorage, target)
    navigate(switchLocale(location.pathname, target))
  }

  return (
    <LocaleContext.Provider value={{ locale, selectLocale }}>
      <SiteLayout />
    </LocaleContext.Provider>
  )
}

function NotFoundPage() {
  const { locale } = useLocaleContext()
  const { t } = useTranslation('common')
  return (
    <>
      <h1>{t('notFound.title')}</h1>
      <p>{t('notFound.description')}</p>
      <Link to={localizedPath(locale, 'home')}>{t('actions.home')}</Link>
    </>
  )
}

function safeStoredLocale() {
  try {
    return readStoredLocale(window.localStorage)
  } catch {
    return null
  }
}

function isKnownLocaleLessPath(segments: readonly string[]) {
  if (segments.length === 0) return true
  if (segments.length === 1) return segments[0] === 'work' || segments[0] === 'about'
  return segments.length === 2 && segments[0] === 'work' && prioritySlugs.has(segments[1])
}

function LocaleResolver() {
  const location = useLocation()
  const segments = location.pathname.split('/').filter(Boolean)
  let routeSegments = segments
  let locale: Locale

  if (isKnownLocaleLessPath(segments)) {
    locale = resolveInitialLocale(safeStoredLocale(), navigator.languages)
  } else {
    locale = 'pt-BR'
    const withoutUnsupportedPrefix = segments.slice(1)
    routeSegments = isKnownLocaleLessPath(withoutUnsupportedPrefix)
      ? withoutUnsupportedPrefix
      : []
  }

  const localeSegment = locale === 'pt-BR' ? 'pt-br' : 'en'
  return <Navigate replace to={`/${[localeSegment, ...routeSegments].join('/')}`} />
}

function localizedRoutes(segment: string, locale: Locale): ReactElement {
  return (
    <Route element={<LocaleBoundary locale={locale} />} path={segment}>
      <Route element={<HomePage />} index />
      <Route element={<WorkPage />} path="work" />
      <Route element={<CaseStudyPage notFound={<NotFoundPage />} />} path="work/:projectSlug" />
      <Route element={<AboutPage />} path="about" />
      <Route element={<NotFoundPage />} path="*" />
    </Route>
  )
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {localizedRoutes('/pt-br', 'pt-BR')}
        {localizedRoutes('/en', 'en')}
        <Route element={<LocaleResolver />} path="*" />
      </Routes>
    </BrowserRouter>
  )
}
