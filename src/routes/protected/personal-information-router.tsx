import { RouteObject } from 'react-router-dom'

import { PersonalInformationUpsertPage } from '@pages'

import { routes } from '@routes/constant'

const personalInformationRouter: RouteObject[] = [
  {
    path: routes.personalInformation.fullPath,
    element: <PersonalInformationUpsertPage />,
    handle: routes.personalInformation
  }
]

export default personalInformationRouter
