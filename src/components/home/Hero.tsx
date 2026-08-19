import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { localizedPath } from '../../content/routes'
import { contact } from '../../content/portfolio'
import { useLocaleContext } from '../../i18n/LocaleContext'

export function Hero() {
  const { locale } = useLocaleContext()
  const { t } = useTranslation(['home', 'common'])
  const aboutPath = localizedPath(locale, 'about')

  return (
    <section aria-labelledby="home-title" className="home-hero site-grid">
      <div className="home-hero__narrative">
        <p className="eyebrow">{t('hero.eyebrow')}</p>
        <h1 id="home-title">{t('hero.headline')}</h1>
        <p className="home-hero__description">{t('hero.description')}</p>
        <div className="action-row">
          <Link className="button button--primary" to={localizedPath(locale, 'work')}>
            {t('common:actions.exploreWork')}
          </Link>
          <Link className="button button--secondary" to={`${aboutPath}#resume`}>
            {t('common:actions.aboutResume')}
          </Link>
          <a className="button button--secondary" href={`mailto:${contact.email}`}>
            {t('common:actions.contact')}
          </a>
        </div>
        <address className="home-hero__contact">
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <a href={`tel:${contact.phoneHref}`}>{contact.phoneDisplay}</a>
        </address>
      </div>
      <figure className="home-hero__visual">
        <img
          alt={t('hero.imageAlt')}
          height="1080"
          src="/assets/projects/net-now/player-aovivo-web.webp"
          width="1920"
        />
      </figure>
    </section>
  )
}
