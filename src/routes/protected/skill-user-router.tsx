import { RouteObject } from 'react-router-dom'

import SkillUserDetailPage from '@features/skill-user/pages/skill-user-detail/skill-user-detail'
import SkillUserListPage from '@features/skill-user/pages/skill-user-list/skill-user-list'
import LazyLoad from '@components/ui/lazy-load'

import { routes } from '@routes/constant'

const skillUserRouter: RouteObject[] = [
  {
    path: routes.skillUser.name,
    children: [
      {
        element: (
          <LazyLoad>
            <SkillUserListPage />
          </LazyLoad>
        ),
        handle: routes.skillUser,
        index: true
      },
      {
        path: routes.skillUser.child.detail.name,
        element: (
          <LazyLoad>
            <SkillUserDetailPage />
          </LazyLoad>
        ),
        handle: routes.skillUser.child.detail
      }
    ]
  }
]

export default skillUserRouter
