import { createContext, useContext, useEffect, type ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import {
  BrowserRouter,
  Link,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom'
import { localizedPath } from '../content/routes'
import type { Locale } from '../content/types'
import i18n from '../i18n/config'
import {
  readStoredLocale,
  resolveInitialLocale,
  switchLocale,
  writeStoredLocale,
} from '../i18n/locale'

const LocaleContext = createContext<Locale>('pt-BR')
const prioritySlugs = new Set(['net-now', 'xbox-one', 'sky-online', 'microsoft-gpa'])

function useActiveLocale() {
  return useContext(LocaleContext)
}

function LocaleBoundary({ locale }: { locale: Locale }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { t } = useTranslation('common')

  useEffect(() => {
    document.documentElement.lang = locale
    void i18n.changeLanguage(locale)
  }, [locale])

  function selectLocale(target: Locale) {
    writeStoredLocale(window.localStorage, target)
    navigate(switchLocale(location.pathname, target))
  }

  return (
    <LocaleContext.Provider value={locale}>
      <fieldset aria-label={t('language.label')}>
        <button
          aria-pressed={locale === 'pt-BR'}
          onClick={() => selectLocale('pt-BR')}
          type="button"
        >
          {t('language.pt-BR')}
        </button>
        <button
          aria-pressed={locale === 'en'}
          onClick={() => selectLocale('en')}
          type="button"
        >
          {t('language.en')}
        </button>
      </fieldset>
      <main id="main-content">
        <Outlet />
      </main>
    </LocaleContext.Provider>
  )
}

function HomePlaceholder() {
  const { t } = useTranslation('home')
  return <h1>{t('hero.headline')}</h1>
}

function WorkPlaceholder() {
  const { t } = useTranslation('work')
  return <h1>{t('title')}</h1>
}

function AboutPlaceholder() {
  const { t } = useTranslation('about')
  return <h1>{t('title')}</h1>
}

function CasePlaceholder() {
  const { projectSlug } = useParams()
  const { t } = useTranslation('cases')
  if (!projectSlug || !prioritySlugs.has(projectSlug)) return <NotFoundPage />
  return <h1>{t(`projects.${projectSlug}.title`)}</h1>
}

function NotFoundPage() {
  const locale = useActiveLocale()
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
      <Route element={<HomePlaceholder />} index />
      <Route element={<WorkPlaceholder />} path="work" />
      <Route element={<CasePlaceholder />} path="work/:projectSlug" />
      <Route element={<AboutPlaceholder />} path="about" />
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
