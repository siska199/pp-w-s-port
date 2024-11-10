import { RouteObject } from 'react-router-dom'

import { ExperianceListPage } from '@pages'
import ExperianceDetailPage from '@pages/experiance/experiace-detail/experiance-detail'
import LazyLoad from '@components/ui/lazy-load'

import { routes } from '@routes/constant'

const experianceRouter: RouteObject[] = [
  {
    path: routes.experiance.name,
    children: [
      {
        element: (
          <LazyLoad>
            <ExperianceListPage />
          </LazyLoad>
        ),
        index: true,
        handle: routes.experiance
      },
      {
        path: routes.experiance.child.detail.name,
        element: (
          <LazyLoad>
            <ExperianceDetailPage />
          </LazyLoad>
        ),
        handle: routes.experiance.child.detail
      }
    ]
  }
]

export default experianceRouter
