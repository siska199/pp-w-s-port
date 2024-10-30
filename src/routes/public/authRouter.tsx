import { RouteObject } from 'react-router-dom'

import { AuthPage } from '@pages'

import { routes } from '@routes/constant'

const authRouter: RouteObject[] = [
  {
    path: routes.auth.name,
    children: [
      {
        index: true,
        path: routes.auth?.child?.signIn.name,
        element: <AuthPage />,
        handle: routes?.auth
      }
    ]
  }
]

export default authRouter
