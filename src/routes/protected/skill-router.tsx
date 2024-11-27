import { RouteObject } from 'react-router-dom'

import { SkillDetailPage, SkillListPage } from '@features/skill/pages'
import LazyLoad from '@components/ui/lazy-load'

import { routes } from '@routes/constant'

const skillRouter: RouteObject[] = [
  {
    path: routes.skill.name,
    children: [
      {
        element: (
          <LazyLoad>
            <SkillListPage />
          </LazyLoad>
        ),
        handle: routes.skill,
        index: true
      },
      {
        path: routes.skill.child.detail.name,
        element: (
          <LazyLoad>
            <SkillDetailPage />
          </LazyLoad>
        ),
        handle: routes.skill.child.detail
      }
    ]
  }
]

export default skillRouter
