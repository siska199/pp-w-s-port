import { RouteObject } from 'react-router-dom'
import menuSidebar from '@lib/data/menu-sidebar'
import Certification from '@pages/certification/certification'
import { routes } from '@routes/constant'

const certificationRouter: RouteObject[] = [
  {
    path: routes.certification.fullPath,
    element: <Certification />,
    handle: menuSidebar?.filter((data) => data.name === routes.certification.name)[0]
  }
]

export default certificationRouter
