import { RouteObject } from 'react-router-dom'
import PersonalInformationPage from '@pages/personal-information/personal-information'
import { routes } from '@routes/constant'

const personalInformationRouter: RouteObject[] = [
  {
    path: routes.personalInformation.fullPath,
    element: <PersonalInformationPage />,
    handle: routes.personalInformation
  }
]

export default personalInformationRouter
