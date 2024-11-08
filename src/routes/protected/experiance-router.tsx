import { RouteObject } from 'react-router-dom'

import { ExperianceListPage } from '@pages'
import ExperianceDetailPage from '@pages/experiance/experiace-detail/experiance-detail'

import { routes } from '@routes/constant'

const experianceRouter: RouteObject[] = [
  {
    path: routes.experiance.name,
    children: [
      {
        element: <ExperianceListPage />,
        index: true,
        handle: routes.experiance
      },
      {
        path: routes.experiance.child.detail.name,
        element: <ExperianceDetailPage />,
        handle: routes.experiance.child.detail
      }
    ]
  }
]

export default experianceRouter
