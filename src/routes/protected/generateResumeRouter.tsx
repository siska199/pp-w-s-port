import { RouteObject } from 'react-router-dom'

import GenerateResumePage from '@pages/generate-resume/generate-resume'

import { routes } from '@routes/constant'

const generateResumeRouter: RouteObject[] = [
  {
    path: routes.generateResume.name,
    element: <GenerateResumePage />
  }
]

export default generateResumeRouter
