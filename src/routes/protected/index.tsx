import GlobalLayout from '@components/layouts/GlobalLayout'
import Protectedlayout from '@components/layouts/Protectedlayout'
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
      {
        path: '/'
      }
    ]
  }
]

export default protectedRoutes
