import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import { CaseGallery } from '../components/work/CaseGallery'
import { casePreviewAssets, projectBySlug } from '../content/portfolio'
import { localizedPath } from '../content/routes'
import { useLocaleContext } from '../i18n/LocaleContext'

export function CaseStudyPage({ notFound }: { notFound: ReactNode }) {
  const { projectSlug } = useParams()
  const { locale } = useLocaleContext()
  const { t } = useTranslation('cases')
  const project = projectSlug ? projectBySlug.get(projectSlug) : undefined

  if (!project?.featuredAsset) return notFound

  const projectKey = `projects.${project.id}`
  const galleryAssets = [
    project.featuredAsset,
    ...(casePreviewAssets[project.id] ?? []),
  ].map((asset) => {
    const group = asset.groupKey
      ? {
          id: asset.groupKey.split('.').at(-1) ?? asset.groupKey,
          label: t(asset.groupKey),
        }
      : undefined
    return {
      src: asset.src,
      width: asset.width,
      height: asset.height,
      alt: group
        ? t(`${projectKey}.imageAltTemplate`, {
            brand: group.label,
            screen: t(asset.altKey),
          })
        : t(asset === project.featuredAsset ? `${projectKey}.imageAlt` : asset.altKey),
      group,
    }
  })

  return (
    <article className="case-study" data-project={project.id}>
      <header className="case-study__header">
        <p className="eyebrow">{t('eyebrow')}</p>
        <h1>{t(`${projectKey}.title`)}</h1>
        <div className="case-study__metadata">
          <time>{project.period}</time>
          <span className="case-study__role">{project.role}</span>
        </div>
        <ul aria-label={t('tagsLabel')} className="case-study__tags">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <p className="case-study__thesis">{t(`${projectKey}.thesis`)}</p>
      </header>

      <section aria-labelledby="case-context-title" className="case-study__section">
        <h2 id="case-context-title">{t('sections.context')}</h2>
        <p>{t(`${projectKey}.context`)}</p>
      </section>

      <section aria-labelledby="case-role-title" className="case-study__section case-study__section--detail">
        <h2 id="case-role-title">{t('sections.role')}</h2>
        <p>{t(`${projectKey}.role`)}</p>
      </section>

      <section aria-labelledby="case-visual-title" className="case-study__visual-story">
        <div className="case-study__section">
          <h2 id="case-visual-title">{t('sections.visualStory')}</h2>
        </div>
        <CaseGallery assets={galleryAssets} unavailableMessage={t('imageUnavailable')} />
      </section>

      <section aria-labelledby="case-impact-title" className="case-study__impact">
        <h2 id="case-impact-title">{t('sections.impact')}</h2>
        <p>{t(`${projectKey}.impact`)}</p>
      </section>

      <section aria-labelledby="case-next-title" className="case-study__next">
        <div>
          <h2 id="case-next-title">{t('sections.next')}</h2>
          <p>{t(`${projectKey}.next`)}</p>
        </div>
        <Link className="button case-study__next-link" to={localizedPath(locale, 'work')}>
          {t('backToWork')}
        </Link>
      </section>
    </article>
  )
}
