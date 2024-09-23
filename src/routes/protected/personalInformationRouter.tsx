import { route } from '@lib/data/global'
import menuSidebar from '@lib/data/menu-sidebar'
import { PersonalInformation } from '@pages'
import { RouteObject } from 'react-router-dom'

const personalInformationRouter: RouteObject[] = [
  {
    path: route.personalInformation.fullPath,
    element: <PersonalInformation />,
    handle : menuSidebar?.filter(data=>(data.name===route.personalInformation.name))[0]
  }
]

export default personalInformationRouter
