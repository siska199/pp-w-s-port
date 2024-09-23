import { route } from '@lib/data/global'
import menuSidebar from '@lib/data/menu-sidebar'
import Skill from '@pages/skill/skill'
import { RouteObject } from 'react-router-dom'

const skillRouter: RouteObject[] = [
  {
    path: route.skill.fullPath,
    element: <Skill/>,
    handle : menuSidebar?.filter(data=>(data.name===route.skill.name))[0]
  }
]

export default skillRouter
