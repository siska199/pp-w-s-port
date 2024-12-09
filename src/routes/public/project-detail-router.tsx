import { RouteObject } from 'react-router-dom'

import { ProjectDetailPage } from '@features/project/pages'
import LazyLoad from '@components/ui/lazy-load'

import { routes } from '@routes/constant'

const projectDetailRouter: RouteObject[] = [
  {
    path: routes.project.child?.detail.name,
    children: [
      {
        path: ':id',
        element: (
          <LazyLoad>
            <ProjectDetailPage />
          </LazyLoad>
        ),
        handle: {
          ...routes.project?.child?.detail
        }
      }
    ]
  }
]

export default projectDetailRouter
