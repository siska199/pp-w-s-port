import { RouteObject } from 'react-router-dom'
import Portofolio from '@pages/portofolio/portofolio'
import { routes } from '@routes/constant'

const portofolioRouter: RouteObject[] = [
  {
    path: routes.portofolio.name,
    children: [
      {
        path: ':id',
        element: <Portofolio />,
        handle: {
          ...routes.portofolio
        }
      }
    ]
  }
]
export default portofolioRouter
