import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { localizedPath } from '../content/routes'
import { useLocaleContext } from '../i18n/LocaleContext'

export function NotFoundPage() {
  const { locale } = useLocaleContext()
  const { t } = useTranslation('common')

  return (
    <article className="not-found">
      <p className="eyebrow">404</p>
      <h1>{t('notFound.title')}</h1>
      <p>{t('notFound.description')}</p>
      <Link className="button button--primary" to={localizedPath(locale, 'home')}>
        {t('actions.home')}
      </Link>
    </article>
  )
}
