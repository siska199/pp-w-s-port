import GlobalLayout from '@components/layouts/GlobalLayout';
import PublicLayout from '@components/layouts/PublicLayout';
import Loading from '@components/loading';
import authRouter from '@routes/public/authRouter';
import portofolioRouter from '@routes/public/portofolioRouter';
import projectDetailRouter from '@routes/public/projectDetailRouter';
import React from 'react';
import { RouteObject } from 'react-router-dom';
import playgroundRouter from './playgroundRouter';

const publicRoutes: RouteObject[] = [
  {
    path: '',
    element: (
      <React.Suspense fallback={<Loading />}>
        <GlobalLayout>
          <PublicLayout />
        </GlobalLayout>
      </React.Suspense>
    ),
    children: [
      ...authRouter,
      ...playgroundRouter,
      ...portofolioRouter,
      ...projectDetailRouter,
    ],
  },
];

export default publicRoutes;
