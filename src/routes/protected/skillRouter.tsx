import { RouteObject } from 'react-router-dom'
import SkillPage from '@pages/skill/skill'
import SkillDetailPage from '@pages/skill/skill-detail'
import { routes } from '@routes/constant'

const skillRouter: RouteObject[] = [
  {
    path: routes.skill.name,
    children: [
      {
        element: <SkillPage />,
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
