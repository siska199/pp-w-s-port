import React from 'react'

export const SkillUserListPage = React.lazy(
  () => import('@features/skill-user/pages/skill-user-list/skill-user-list')
)
export const SkillUserDetailPage = React.lazy(
  () => import('@features/skill-user/pages/skill-user-detail/skill-user-detail')
)
