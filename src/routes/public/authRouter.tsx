import { route } from '@lib/data/global'
import { SignInPage } from '@pages'
import { RouteObject } from 'react-router-dom'

const authRouter: RouteObject[] = [
  {
    path: route.auth.name,
    children: [
      {
        path: route.auth.child.signIn.name,
        element: <SignInPage />
      }
    ]
  }
]

export default authRouter
