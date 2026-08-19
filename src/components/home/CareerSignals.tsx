import { useTranslation } from 'react-i18next'

const signalIds = ['experience', 'react', 'leadership', 'onboarding'] as const

export function CareerSignals() {
  const { t } = useTranslation('home')

  return (
    <section aria-label={t('signals.label')} className="career-signals">
      <ul>
        {signalIds.map((signalId) => (
          <li key={signalId}>
            <strong>{t(`signals.${signalId}.value`)}</strong>
            <span>{t(`signals.${signalId}.label`)}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
