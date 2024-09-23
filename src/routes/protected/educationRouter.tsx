import { route } from '@lib/data/global'
import menuSidebar from '@lib/data/menu-sidebar'
import Education from '@pages/education/education'
import { RouteObject } from 'react-router-dom'

const educationRouter: RouteObject[] = [
  {
    path: route.education.fullPath,
    element: <Education/>,
    handle : menuSidebar?.filter(data=>(data.name===route.education.name))[0]
  }
]

export default educationRouter
