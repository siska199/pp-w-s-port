import GlobalLayout from '@components/layouts/GlobalLayout'
import Protectedlayout from '@components/layouts/Protectedlayout'
import certificationRouter from '@routes/protected/certificationRouter'
import educationRouter from '@routes/protected/educationRouter'
import personalInformationRouter from '@routes/protected/personalInformationRouter'
import projectRouter from '@routes/protected/projectRouter'
import skillRouter from '@routes/protected/skillRouter'
import workHistoryRouter from '@routes/protected/workHistoryRouter copy'
import React from 'react'
import { RouteObject } from 'react-router-dom'


const protectedRoutes: RouteObject[] = [
  {
    path: '',
    element: (
      <React.Suspense fallback={'Loading...'}>
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
      ...certificationRouter
    ]
  }
]

export default protectedRoutes
