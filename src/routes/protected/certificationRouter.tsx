import { route } from '@lib/data/global'
import menuSidebar from '@lib/data/menu-sidebar'
import Certification from '@pages/certification/certification'
import { RouteObject } from 'react-router-dom'

const certificationRouter: RouteObject[] = [
  {
    path: route.certification.fullPath,
    element: <Certification/>,
    handle : menuSidebar?.filter(data=>(data.name===route.certification.name))[0]
  }
]

export default certificationRouter
