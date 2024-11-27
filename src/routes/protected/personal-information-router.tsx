import { RouteObject } from 'react-router-dom'

import { PersonalInformationUpsertPage } from '@features/personal-information/pages'
import LazyLoad from '@components/ui/lazy-load'

import { routes } from '@routes/constant'

const personalInformationRouter: RouteObject[] = [
  {
    path: routes.personalInformation.fullPath,
    element: (
      <LazyLoad>
        <PersonalInformationUpsertPage />
      </LazyLoad>
    ),
    handle: routes.personalInformation
  }
]

export default personalInformationRouter
