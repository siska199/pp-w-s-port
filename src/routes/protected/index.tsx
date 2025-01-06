import { RouteObject } from 'react-router-dom'

import GlobalLayout from '@components/layouts/global-layout'
import Protectedlayout from '@components/layouts/protected-layout'

import educationRouter from '@routes/protected/education-router'
import workHistoryRouter from '@routes/protected/experiance-router'
import personalInformationRouter from '@routes/protected/personal-information-router'
import projectRouter from '@routes/protected/project-router'
import skillUserRouter from '@routes/protected/skill-user-router'

const protectedRoutes: RouteObject[] = [
  {
    path: '',
    element: (
      <GlobalLayout>
        <Protectedlayout />
      </GlobalLayout>
    ),
    errorElement: <div>Not Found</div>,
    children: [
      ...personalInformationRouter,
      ...workHistoryRouter,
      ...educationRouter,
      ...projectRouter,
      ...skillUserRouter
    ]
  }
]

export default protectedRoutes
