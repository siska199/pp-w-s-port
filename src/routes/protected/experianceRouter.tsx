import { RouteObject } from 'react-router-dom'
import ExperiancePage from '@pages/experiance/experiance'
import ExperianceDetailPage from '@pages/experiance/experiance-detail'
import { routes } from '@routes/constant'

const experianceRouter: RouteObject[] = [
  {
    path: routes.experiance.name,
    children: [
      {
        element: <ExperiancePage />,
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
