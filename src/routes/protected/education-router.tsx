import { RouteObject } from 'react-router-dom'

import { EducationListPage } from '@features/education/pages'
import EducationDetail from '@features/education/pages/education-detail/education-detail'
import LazyLoad from '@components/ui/lazy-load'

import { routes } from '@routes/constant'

const educationRouter: RouteObject[] = [
  {
    path: routes.education.name,
    children: [
      {
        index: true,
        element: (
          <LazyLoad>
            <EducationListPage />
          </LazyLoad>
        ),
        handle: routes.education
      },
      {
        path: routes.education.child.detail.name,
        element: (
          <LazyLoad>
            <EducationDetail />
          </LazyLoad>
        ),
        handle: routes.education.child.detail
      }
    ]
  }
]

export default educationRouter
