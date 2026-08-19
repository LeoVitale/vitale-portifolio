import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { localizedPath } from '../../content/routes'
import { useLocaleContext } from '../../i18n/LocaleContext'
import { LanguageSelector } from './LanguageSelector'

export function SiteLayout() {
  const { locale } = useLocaleContext()
  const { t } = useTranslation('common')
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const homePath = localizedPath(locale, 'home')
  const aboutPath = localizedPath(locale, 'about')

  useEffect(() => setMenuOpen(false), [location.pathname])

  return (
    <>
      <a className="skip-link" href="#main-content">
        {t('skipLink')}
      </a>
      <header className="site-header">
        <div className="site-header__inner site-grid">
          <Link className="wordmark" to={homePath}>
            {t('brand')}
          </Link>
          <button
            aria-controls="primary-navigation"
            aria-expanded={menuOpen}
            className="menu-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            {t('nav.menu')}
          </button>
          <nav
            aria-label={t('nav.label')}
            className="primary-navigation"
            data-open={menuOpen}
            id="primary-navigation"
          >
            <Link to={localizedPath(locale, 'work')}>{t('nav.work')}</Link>
            <Link to={`${homePath}#timeline`}>{t('nav.timeline')}</Link>
            <Link to={aboutPath}>{t('nav.about')}</Link>
            <Link to={`${aboutPath}#resume`}>{t('nav.resume')}</Link>
            <Link to={`${aboutPath}#contact`}>{t('nav.contact')}</Link>
            <LanguageSelector />
          </nav>
        </div>
      </header>
      <main className="site-main" id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="site-footer__inner site-grid">
          <p>{t('footer.summary')}</p>
          <p>© {t('footer.copyright')}</p>
        </div>
      </footer>
    </>
  )
}
