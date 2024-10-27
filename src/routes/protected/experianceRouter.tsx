import { RouteObject } from 'react-router-dom'
import ExperiancePage from '@pages/experiance/experiance'
import ExperianceAddPage from '@pages/experiance/experiance-add'
import ExperianceDetailPage from '@pages/experiance/experiance-detail'
import ExperianceEditPage from '@pages/experiance/experiance-edit'
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
      },
      {
        path: routes.experiance.child.add.name,
        element: <ExperianceAddPage />,
        handle: routes.experiance.child.add
      },
      {
        path: routes.experiance.child.edit.name,
        element: <ExperianceEditPage />,
        handle: routes.experiance.child.edit
      }
    ]
  }
]

export default experianceRouter
