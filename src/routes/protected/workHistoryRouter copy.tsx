import { route } from '@lib/data/global'
import menuSidebar from '@lib/data/menu-sidebar'
import WorkHistory from '@pages/work-history/work-history'
import { RouteObject } from 'react-router-dom'

const workHistoryRouter: RouteObject[] = [
  {
    path: route.workHistory.fullPath,
    element:<WorkHistory/>,
    handle : menuSidebar?.filter(data=>(data.name===route.workHistory.name))[0]
  }
]

export default workHistoryRouter
