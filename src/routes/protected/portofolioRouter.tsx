import { route } from '@lib/data/global'
import menuSidebar from '@lib/data/menu-sidebar'
import Portofolio from '@pages/portofolio/portofolio'
import { RouteObject } from 'react-router-dom'

const portofolioRouter: RouteObject[] = [
  {
    path: route.portofolio.fullPath,
    element: <Portofolio/>,
    handle : menuSidebar?.filter(data=>(data.name===route.portofolio.name))[0]
  }
]

export default portofolioRouter
