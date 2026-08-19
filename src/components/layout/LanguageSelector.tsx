import { useTranslation } from 'react-i18next'
import { useLocaleContext } from '../../i18n/LocaleContext'

export function LanguageSelector() {
  const { locale, selectLocale } = useLocaleContext()
  const { t } = useTranslation('common')

  return (
    <fieldset aria-label={t('language.label')} className="language-selector">
      <button
        aria-pressed={locale === 'pt-BR'}
        onClick={() => selectLocale('pt-BR')}
        type="button"
      >
        {t('language.pt-BR')}
      </button>
      <button
        aria-pressed={locale === 'en'}
        onClick={() => selectLocale('en')}
        type="button"
      >
        {t('language.en')}
      </button>
    </fieldset>
  )
}
