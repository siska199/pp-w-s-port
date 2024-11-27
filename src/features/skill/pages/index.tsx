import React from 'react'

export const SkillListPage = React.lazy(() => import('@features/skill/pages/skill-list/skill-list'))
export const SkillDetailPage = React.lazy(
  () => import('@features/skill/pages/skill-detail/skill-detail')
)
