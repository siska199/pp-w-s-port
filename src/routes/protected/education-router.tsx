import { RouteObject } from 'react-router-dom'

import { EducationListPage } from '@pages'

import menuSidebar from '@lib/data/menu-sidebar'
import { routes } from '@routes/constant'

const educationRouter: RouteObject[] = [
  {
    path: routes.education.fullPath,
    element: <EducationListPage />,
    handle: menuSidebar?.filter((data) => data.name === routes.education.name)[0]
  }
]

export default educationRouter
