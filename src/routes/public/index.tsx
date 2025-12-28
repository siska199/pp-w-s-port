import React from 'react';
import { RouteObject } from 'react-router-dom';

import GlobalLayout from '@components/layouts/global-layout';
import PublicLayout from '@components/layouts/public-layout';
import Loading from '@components/loading';

import authRouter from '@routes/public/auth-router';
import portofolioRouter from '@routes/public/portofolio-router';
import projectDetailRouter from '@routes/public/project-detail-router';

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
        children: [...authRouter, ...portofolioRouter, ...projectDetailRouter],
    },
];

export default publicRoutes;
