import { RouteObject } from 'react-router-dom'

import { SkillListPage } from '@pages'
import SkillDetailPage from '@pages/skill/skill-detail/skill-detail'

import { routes } from '@routes/constant'

const skillRouter: RouteObject[] = [
  {
    path: routes.skill.name,
    children: [
      {
        element: <SkillListPage />,
        handle: routes.skill,
        index: true
      },
      {
        path: routes.skill.child.detail.name,
        element: <SkillDetailPage />,
        handle: routes.skill.child.detail
      }
    ]
  }
]

export default skillRouter
