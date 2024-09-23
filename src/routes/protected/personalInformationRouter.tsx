import { route } from '@lib/data/global'
import { PersonalInformation } from '@pages'
import { RouteObject } from 'react-router-dom'

const personalInformationRouter: RouteObject[] = [
  {
    path: route.personalInformation.fullPath,
    element: <PersonalInformation />
  }
]

export default personalInformationRouter
