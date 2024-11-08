import { RouteObject } from 'react-router-dom'

import { AuthPage } from '@pages'

import { routes } from '@routes/constant'

const authRouter: RouteObject[] = [
  {
    path: routes.auth.name,
    children: [
      {
        index: true,
        element: <AuthPage />,
        handle: routes?.auth
      }
    ]
  }
]

export default authRouter
