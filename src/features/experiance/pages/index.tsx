import React from 'react'

export const ExperianceDetailPage = React.lazy(
  () => import('@features/experiance/pages/experiace-detail/experiance-detail')
)

export const ExperianceListPage = React.lazy(
  () => import('@features/experiance/pages/experiance-list/experiance-list')
)
