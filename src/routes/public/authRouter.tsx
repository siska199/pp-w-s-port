import { routes } from '@routes/constant';
import { SignInPage } from '@pages';
import { RouteObject } from 'react-router-dom';

const authRouter: RouteObject[] = [
  {
    path: routes.auth.name,
    children: [
      {
        path: routes.auth?.child?.signIn.name,
        element: <SignInPage />,
      },
    ],
  },
];

export default authRouter;
