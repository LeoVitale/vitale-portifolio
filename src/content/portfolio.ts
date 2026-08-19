import type { CareerMilestone, Project, ProjectAsset, ProjectId } from './types'

export const contact = {
  email: 'leonardo.vitale@outlook.com',
  phoneDisplay: '+55 11 99676-2153',
  phoneHref: '+5511996762153',
} as const

export const projects: readonly Project[] = [
  {
    id: 'net-now',
    slug: 'net-now',
    period: 'circa 2015–2017',
    role: 'Front-End Tech Lead + UX Lead',
    tags: ['React', 'JavaScript', 'UX', 'VOD'],
    status: 'shipped',
    featuredAsset: {
      src: '/assets/projects/net-now/player-aovivo-web.webp',
      width: 1920,
      height: 1080,
      altKey: 'projects.net-now.alt',
    },
    translationKey: 'projects.net-now',
  },
  {
    id: 'xbox-one',
    slug: 'xbox-one',
    period: '2013',
    role: 'UX / UI Designer at Agile Content',
    tags: ['Xbox One', 'HTML5', 'UX', 'VOD'],
    status: 'shipped',
    featuredAsset: {
      src: '/assets/projects/xbox-one/globosat-play/home.webp',
      width: 1920,
      height: 1080,
      altKey: 'projects.xbox-one.alt',
    },
    translationKey: 'projects.xbox-one',
  },
  {
    id: 'sky-online',
    slug: 'sky-online',
    period: '2013–2017 era',
    role: 'UX / UI Designer, prototype owner',
    tags: ['Product Design', 'UX', 'Web', 'VOD'],
    status: 'prototype',
    featuredAsset: {
      src: '/assets/projects/sky-online/home.webp',
      width: 1920,
      height: 2724,
      altKey: 'projects.sky-online.alt',
    },
    translationKey: 'projects.sky-online',
  },
  {
    id: 'microsoft-gpa',
    slug: 'microsoft-gpa',
    period: 'circa 2010',
    role: 'Web Designer / Interactive Developer',
    tags: ['Silverlight', 'Interaction Design', 'Enterprise UI'],
    status: 'shipped',
    featuredAsset: {
      src: '/assets/projects/microsoft-gpa/01-inicio.webp',
      width: 1440,
      height: 900,
      altKey: 'projects.microsoft-gpa.alt',
    },
    translationKey: 'projects.microsoft-gpa',
  },
  {
    id: 'xelix',
    slug: null,
    period: '2021–present',
    role: 'Front-End Tech Lead',
    tags: ['React', 'TypeScript', 'Architecture', 'Leadership'],
    status: 'leadership',
    translationKey: 'projects.xelix',
  },
]

export const careerMilestones: readonly CareerMilestone[] = [
  ['web-design', '2001–2009'],
  ['silverlight', '2009–2011'],
  ['streaming', '2011–2013'],
  ['xbox', '2013'],
  ['react', '2015–2018'],
  ['global-engineering', '2018–2021'],
  ['architecture', '2021–present'],
  ['ai', 'present'],
].map(([id, period]) => ({
  id,
  period,
  labelKey: `timeline.${id}.label`,
  descriptionKey: `timeline.${id}.description`,
}))

export const projectBySlug = new Map(
  projects.filter((project) => project.slug).map((project) => [project.slug, project]),
)

export const casePreviewAssets: Partial<Record<ProjectId, readonly ProjectAsset[]>> = {
  'net-now': [
    {
      src: '/assets/projects/net-now/home-web-mouse-over.webp',
      width: 1920,
      height: 2953,
      altKey: 'projects.net-now.previewAlt',
    },
    {
      src: '/assets/projects/net-now/home-web-kids-personagem.webp',
      width: 1920,
      height: 3070,
      altKey: 'projects.net-now.kidsAlt',
    },
    {
      src: '/assets/projects/net-now/home-web-programas-tv.webp',
      width: 1920,
      height: 4335,
      altKey: 'projects.net-now.programmesAlt',
    },
    {
      src: '/assets/projects/net-now/grade-programacao.webp',
      width: 1920,
      height: 1200,
      altKey: 'projects.net-now.scheduleAlt',
    },
    {
      src: '/assets/projects/net-now/detalhe-serie-web-03.webp',
      width: 1920,
      height: 3589,
      altKey: 'projects.net-now.seriesAlt',
    },
  ],
}
