import { useTranslation } from 'react-i18next'
import { careerMilestones } from '../../content/portfolio'

export function CareerTimeline() {
  const { t } = useTranslation('home')

  return (
    <section aria-labelledby="timeline-title" className="career-timeline" id="timeline">
      <header className="section-heading">
        <p className="eyebrow">{t('timeline.eyebrow')}</p>
        <h2 id="timeline-title">{t('timeline.title')}</h2>
      </header>
      <ol className="timeline">
        {careerMilestones.map((milestone) => (
          <li className="timeline__item" key={milestone.id}>
            <time>{milestone.period}</time>
            <div>
              <h3 className="timeline__label">{t(milestone.labelKey)}</h3>
              <p className="timeline__description">{t(milestone.descriptionKey)}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
