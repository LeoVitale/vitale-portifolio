import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import aboutEn from '../locales/en/about.json'
import casesEn from '../locales/en/cases.json'
import commonEn from '../locales/en/common.json'
import homeEn from '../locales/en/home.json'
import workEn from '../locales/en/work.json'
import aboutPtBr from '../locales/pt-BR/about.json'
import casesPtBr from '../locales/pt-BR/cases.json'
import commonPtBr from '../locales/pt-BR/common.json'
import homePtBr from '../locales/pt-BR/home.json'
import workPtBr from '../locales/pt-BR/work.json'

const resources = {
  en: { about: aboutEn, cases: casesEn, common: commonEn, home: homeEn, work: workEn },
  'pt-BR': {
    about: aboutPtBr,
    cases: casesPtBr,
    common: commonPtBr,
    home: homePtBr,
    work: workPtBr,
  },
} as const

void i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: false,
  supportedLngs: ['en', 'pt-BR'],
  defaultNS: 'common',
  interpolation: { escapeValue: false },
})

export default i18n
