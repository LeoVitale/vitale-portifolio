import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { contact } from '../content/portfolio'
import { education, expertise, resumeExperiences } from '../content/resume'

const resumePath = '/resume/leonardo-vitale-resume-en.pdf'
const accomplishmentKeys = ['architecture', 'onboarding', 'standards', 'quality'] as const

export function AboutPage() {
  const { t } = useTranslation('about')
  const [pdfUnavailable, setPdfUnavailable] = useState(false)

  useEffect(() => {
    let active = true
    fetch(resumePath, { method: 'HEAD' })
      .then((response) => {
        if (active && !response.ok) setPdfUnavailable(true)
      })
      .catch(() => {
        if (active) setPdfUnavailable(true)
      })
    return () => {
      active = false
    }
  }, [])

  return (
    <article className="about-page">
      <header className="about-page__intro">
        <div>
          <p className="eyebrow">{t('eyebrow')}</p>
          <h1>{t('title')}</h1>
          <p className="about-page__profile">{t('profile')}</p>
        </div>
        <a
          className="button button--primary about-page__resume-link"
          href={resumePath}
          rel="noreferrer"
          target="_blank"
        >
          {t('resumeDownload')}
        </a>
        {pdfUnavailable ? <p role="status">{t('resumeUnavailable')}</p> : null}
      </header>

      <section aria-labelledby="accomplishments-title">
        <h2 id="accomplishments-title">{t('accomplishmentsTitle')}</h2>
        <ul className="about-page__accomplishments">
          {accomplishmentKeys.map((key) => (
            <li key={key}>{t(`accomplishments.${key}`)}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="experience-title" id="resume">
        <h2 id="experience-title">{t('experienceTitle')}</h2>
        <div className="resume-chronology">
          {resumeExperiences.map((experience) => (
            <article key={experience.id}>
              <div className="resume-chronology__marker" aria-hidden="true" />
              <div className="resume-chronology__heading">
                <h3>{experience.company}</h3>
                <p>{t(experience.titleKey)}</p>
              </div>
              <div className="resume-chronology__meta">
                <time>{experience.period}</time>
                <span>{t(experience.locationKey)}</span>
              </div>
              <ul>
                {experience.achievementKeys.map((key) => (
                  <li key={key}>{t(key)}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="education-title" className="about-page__education">
        <h2 id="education-title">{t('educationTitle')}</h2>
        <p>
          <strong>{t(education.courseKey)}</strong>
          <span>{education.institution}</span>
          <span>
            {education.period} · {education.location}
          </span>
        </p>
      </section>

      <section aria-labelledby="expertise-title">
        <h2 id="expertise-title">{t('expertiseTitle')}</h2>
        <ul className="about-page__expertise">
          {expertise.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="contact-title" className="about-page__contact" id="contact">
        <h2 id="contact-title">{t('contactTitle')}</h2>
        <address>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <a href={`tel:${contact.phoneHref}`}>{contact.phoneDisplay}</a>
        </address>
      </section>
    </article>
  )
}
