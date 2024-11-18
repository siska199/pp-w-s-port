import React from 'react'

export const ProjectDetailPage = React.lazy(
  () => import('@features/project/pages/project-detail/project-detail')
)

export const ProjectListPage = React.lazy(
  () => import('@features/project/pages/project-list/project-list')
)

export const ProjectUpsertPage = React.lazy(
  () => import('@features/project/pages/project-upsert/project-upsert')
)
