import React from 'react'
import { RouteObject } from 'react-router-dom'

import GlobalLayout from '@components/layouts/global-layout'
import Protectedlayout from '@components/layouts/protected-layout'
import Loading from '@components/loading'

import educationRouter from '@routes/protected/educationRouter'
import workHistoryRouter from '@routes/protected/experianceRouter'
import personalInformationRouter from '@routes/protected/personalInformationRouter'
import projectRouter from '@routes/protected/projectRouter'
import skillRouter from '@routes/protected/skillRouter'

const protectedRoutes: RouteObject[] = [
  {
    path: '',
    element: (
      <React.Suspense fallback={<Loading />}>
        <GlobalLayout>
          <Protectedlayout />
        </GlobalLayout>
      </React.Suspense>
    ),
    errorElement: <div>Not Found</div>,
    children: [
      ...personalInformationRouter,
      ...skillRouter,
      ...workHistoryRouter,
      ...educationRouter,
      ...projectRouter,
    ]
  }
]

export default protectedRoutes
