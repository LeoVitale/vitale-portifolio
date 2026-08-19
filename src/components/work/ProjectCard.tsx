import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import type { Project } from '../../content/types'
import { useLocaleContext } from '../../i18n/LocaleContext'

export function ProjectCard({ project }: { project: Project }) {
  const { locale } = useLocaleContext()
  const { t } = useTranslation(['home', 'common'])
  const translationKey = project.translationKey
  const content = (
    <div className="project-card__content">
      <div className="project-card__metadata">
        <span className="project-card__period">{project.period}</span>
        <span className="project-card__role">{t(`${translationKey}.role`)}</span>
      </div>
      <h3>{t(`${translationKey}.name`)}</h3>
      <p className="project-card__significance">{t(`${translationKey}.significance`)}</p>
      {project.slug ? <span className="project-card__action">{t('common:actions.viewCase')}</span> : null}
    </div>
  )

  return (
    <article
      className={`project-card project-card--${project.id}`}
      data-project={project.id}
    >
      {project.featuredAsset ? (
        <figure className="project-card__visual">
          <img
            alt={t(project.featuredAsset.altKey)}
            height={project.featuredAsset.height}
            loading="lazy"
            src={project.featuredAsset.src}
            width={project.featuredAsset.width}
          />
        </figure>
      ) : (
        <div aria-hidden="true" className="project-card__abstract">
          <span>Architecture</span>
          <span>Leadership</span>
          <span>AI</span>
        </div>
      )}
      {project.slug ? (
        <Link className="project-card__link" to={`/${locale === 'pt-BR' ? 'pt-br' : 'en'}/work/${project.slug}`}>
          {content}
        </Link>
      ) : (
        content
      )}
    </article>
  )
}
