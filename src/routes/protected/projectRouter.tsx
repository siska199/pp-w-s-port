import { route } from '@lib/data/global'
import menuSidebar from '@lib/data/menu-sidebar'
import Project from '@pages/project/project'
import { RouteObject } from 'react-router-dom'

const projectRouter: RouteObject[] = [
  {
    path: route.project.fullPath,
    element: <Project/>,
    handle : menuSidebar?.filter(data=>(data.name===route.project.name))[0]
  }
]

export default projectRouter
