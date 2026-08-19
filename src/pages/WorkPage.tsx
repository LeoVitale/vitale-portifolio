import { useTranslation } from 'react-i18next'
import { projects } from '../content/portfolio'
import { ProjectCard } from '../components/work/ProjectCard'

const priorityProjects = projects.filter((project) => project.slug)

function getLeadershipProject() {
  const project = projects.find((item) => item.id === 'xelix')
  if (!project) throw new Error('Xelix leadership record is required for the Work index')
  return project
}

export function WorkPage() {
  const { t } = useTranslation('work')
  const leadershipProject = getLeadershipProject()

  return (
    <div className="work-index">
      <header className="work-index__header">
        <p className="eyebrow">{t('eyebrow')}</p>
        <h1>{t('title')}</h1>
        <p>{t('description')}</p>
      </header>
      <section aria-labelledby="priority-work-title">
        <h2 id="priority-work-title">{t('priorityTitle')}</h2>
        <div className="work-index__grid">
          {priorityProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
      <section aria-labelledby="leadership-work-title" className="work-index__leadership">
        <h2 id="leadership-work-title">{t('leadershipTitle')}</h2>
        <ProjectCard project={leadershipProject} />
      </section>
      <p className="work-index__archive-note">{t('archiveNote')}</p>
    </div>
  )
}
