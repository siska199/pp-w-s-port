import { RouteObject } from 'react-router-dom';

import { AuthPage } from '@features/auth/pages';
import LazyLoad from '@components/ui/lazy-load';

import { routes } from '@routes/constant';

const authRouter: RouteObject[] = [
    {
        path: routes.auth.name,
        children: [
            {
                index: true,
                element: (
                    <LazyLoad>
                        <AuthPage />
                    </LazyLoad>
                ),
                handle: routes?.auth,
            },
        ],
    },
];

export default authRouter;
