import GlobalLayout from '@components/layouts/GlobalLayout'
import PublicLayout from '@components/layouts/PublicLayout'
import Loading from '@components/loading'
import { route } from '@lib/data/global'
import { SignInPage } from '@pages'
import React from 'react'
import { RouteObject } from 'react-router-dom'

const authRouter: RouteObject[] = [
  {
    path: route.auth.name,
    element: (
      <React.Suspense fallback={<Loading />}>
        <GlobalLayout>
          <PublicLayout />
        </GlobalLayout>
      </React.Suspense>
    ),
    children: [
      {
        path: route.auth.child.signIn.name,
        element: <SignInPage />
      }
    ]
  }
]

export default authRouter
