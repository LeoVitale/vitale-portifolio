import type { ResumeExperience } from './types'

export const resumeExperiences: readonly ResumeExperience[] = [
  {
    id: 'xelix',
    company: 'Xelix',
    period: 'Nov 2021–present',
    titleKey: 'experience.xelix.title',
    locationKey: 'experience.xelix.location',
    achievementKeys: [
      'experience.xelix.achievements.architecture',
      'experience.xelix.achievements.team',
      'experience.xelix.achievements.standards',
    ],
  },
  {
    id: 'tacx',
    company: 'Tacx / Garmin',
    period: 'Oct 2020–Nov 2021',
    titleKey: 'experience.tacx.title',
    locationKey: 'experience.tacx.location',
    achievementKeys: ['experience.tacx.achievements.platform'],
  },
  {
    id: 'carnext',
    company: 'CarNext.com',
    period: 'Sep 2019–Oct 2020',
    titleKey: 'experience.carnext.title',
    locationKey: 'experience.carnext.location',
    achievementKeys: ['experience.carnext.achievements.products'],
  },
  {
    id: 'publicis',
    company: 'Publicis Sapient',
    period: 'Oct 2018–Aug 2019',
    titleKey: 'experience.publicis.title',
    locationKey: 'experience.publicis.location',
    achievementKeys: ['experience.publicis.achievements.modernization'],
  },
  {
    id: 'agile-content',
    company: 'Agile Content',
    period: 'Jun 2013–Oct 2018',
    titleKey: 'experience.agile.title',
    locationKey: 'experience.agile.location',
    achievementKeys: [
      'experience.agile.achievements.xbox',
      'experience.agile.achievements.react',
      'experience.agile.achievements.netNow',
    ],
  },
]

export const expertise = [
  'React',
  'TypeScript',
  'Clean Architecture / SOLID',
  'TanStack Query',
  'Redux Toolkit / Zustand',
  'Vite / Turborepo',
  'Monorepo architecture',
  'Front-end performance',
  'UX / UI and Figma',
  'Integration / E2E strategy',
  'AI-assisted development workflows',
] as const

export const education = {
  institution: 'UNIP',
  courseKey: 'education.course',
  period: '2007–2009',
  location: 'São Paulo',
} as const
