import { useTranslation } from 'react-i18next'
import { projects } from '../../content/portfolio'
import { ProjectCard } from '../work/ProjectCard'

export function SelectedWork() {
  const { t } = useTranslation('home')

  return (
    <section aria-labelledby="selected-work-title" className="selected-work">
      <header className="section-heading">
        <p className="eyebrow">{t('selectedWork.eyebrow')}</p>
        <h2 id="selected-work-title">{t('selectedWork.title')}</h2>
        <p>{t('selectedWork.description')}</p>
      </header>
      <div className="selected-work__mosaic">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}
