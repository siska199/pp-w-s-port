import { RouteObject } from 'react-router-dom'

import { EducationListPage } from '@pages'
import LazyLoad from '@components/ui/lazy-load'

import menuSidebar from '@lib/data/menu-sidebar'
import { routes } from '@routes/constant'

const educationRouter: RouteObject[] = [
  {
    path: routes.education.fullPath,
    element: (
      <LazyLoad>
        <EducationListPage />
      </LazyLoad>
    ),
    handle: menuSidebar?.filter((data) => data.name === routes.education.name)[0]
  }
]

export default educationRouter
