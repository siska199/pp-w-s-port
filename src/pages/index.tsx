import React from 'react'

export const PortofolioDetailPage = React.lazy(
  () => import('@pages/portofolio/portofolio-detail/portofolio-detail')
)

export const AuthPage = React.lazy(() => import('@pages/auth/auth'))
export const PersonalInformationUpsertPage = React.lazy(
  () =>
    import('@pages/personal-information/personal-information-upsert/personal-information-upsert')
)
export const EducationListPage = React.lazy(
  () => import('@pages/education/education-list/education-list')
)

export const SkillListPage = React.lazy(() => import('@pages/skill/skill-list/skill-list'))
export const ExperianceDetailPage = React.lazy(
  () => import('@pages/experiance/experiace-detail/experiance-detail')
)
export const ExperianceListPage = React.lazy(
  () => import('@pages/experiance/experiance-list/experiance-list')
)
export const ProjectDetailPage = React.lazy(
  () => import('@pages/project/project-detail/project-detail')
)
export const ProjectListPage = React.lazy(() => import('@pages/project/project-list/project-list'))
export const ProjectUpsertPage = React.lazy(
  () => import('@pages/project/project-upsert/project-upsert')
)
