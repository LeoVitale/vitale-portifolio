import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { casePreviewAssets, projects } from '../../content/portfolio'
import { localizedPath } from '../../content/routes'
import { useLocaleContext } from '../../i18n/LocaleContext'

function getXelixChapterAssets() {
  const project = projects.find((item) => item.id === 'xelix')
  if (!project?.featuredAsset) {
    throw new Error('Xelix featured asset is required for the current chapter')
  }

  return [project.featuredAsset, ...(casePreviewAssets.xelix ?? [])]
}

export function CurrentChapter() {
  const { locale } = useLocaleContext()
  const { t } = useTranslation(['home', 'common'])
  const visuals = getXelixChapterAssets()

  return (
    <>
      <section aria-labelledby="current-chapter-title" className="current-chapter site-grid">
        <div className="current-chapter__copy">
          <p className="eyebrow">{t('current.eyebrow')}</p>
          <h2 id="current-chapter-title">{t('current.title')}</h2>
          <p>{t('current.description')}</p>
          <p className="current-chapter__team-outcome">{t('current.teamOutcome')}</p>
          <div className="current-chapter__metric">
            <strong>{t('current.metric')}</strong>
            <span>{t('current.metricNote')}</span>
          </div>
        </div>
        <div className="current-chapter__visual">
          {visuals.map((asset) => (
            <img
              alt={t(asset.altKey)}
              height={asset.height}
              key={asset.src}
              loading="lazy"
              src={asset.src}
              width={asset.width}
            />
          ))}
        </div>
      </section>
      <section aria-labelledby="about-preview-title" className="about-preview">
        <div>
          <p className="eyebrow">{t('aboutPreview.eyebrow')}</p>
          <h2 id="about-preview-title">{t('aboutPreview.title')}</h2>
          <p>{t('aboutPreview.description')}</p>
        </div>
        <Link className="button about-preview__link" to={localizedPath(locale, 'about')}>
          {t('common:actions.viewAbout')}
        </Link>
      </section>
    </>
  )
}
