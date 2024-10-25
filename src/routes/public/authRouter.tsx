import { RouteObject } from 'react-router-dom'
import { SignInPage } from '@pages'
import { routes } from '@routes/constant'

const authRouter: RouteObject[] = [
  {
    path: routes.auth.name,
    children: [
      {
        path: routes.auth?.child?.signIn.name,
        element: <SignInPage />
      }
    ]
  }
]

export default authRouter
