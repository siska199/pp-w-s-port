import React from 'react'

export const PortofolioDetailPage = React.lazy(
  () => import('@features/portofolio/pages/portofolio-detail/portofolio-detail')
)

export const AuthPage = React.lazy(() => import('@features/auth/pages/auth'))

export const PersonalInformationUpsertPage = React.lazy(
  () =>
    import(
      '@features/personal-information/pages/personal-information-upsert/personal-information-upsert'
    )
)

export const EducationListPage = React.lazy(
  () => import('@features/education/pages/education-list/education-list')
)

export const SkillListPage = React.lazy(() => import('@features/skill/pages/skill-list/skill-list'))

export const ExperianceDetailPage = React.lazy(
  () => import('@features/experiance/pages/experiace-detail/experiance-detail')
)

export const ExperianceListPage = React.lazy(
  () => import('@features/experiance/pages/experiance-list/experiance-list')
)

export const ProjectDetailPage = React.lazy(
  () => import('@features/project/pages/project-detail/project-detail')
)

export const ProjectListPage = React.lazy(
  () => import('@features/project/pages/project-list/project-list')
)

export const ProjectUpsertPage = React.lazy(
  () => import('@features/project/pages/project-upsert/project-upsert')
)
