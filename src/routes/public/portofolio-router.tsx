import { RouteObject } from 'react-router-dom'

import { PortofolioDetailPage } from '@pages'

import { routes } from '@routes/constant'

const portofolioRouter: RouteObject[] = [
  {
    path: routes.portofolio.name,
    children: [
      {
        path: ':id',
        element: <PortofolioDetailPage />,
        handle: {
          ...routes.portofolio
        }
      }
    ]
  }
]
export default portofolioRouter
