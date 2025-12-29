import { RouteObject } from 'react-router-dom';

import { PortofolioDetailPage } from '@features/portofolio/pages';
import LazyLoad from '@components/ui/lazy-load';

import { routes } from '@routes/constant';

const portofolioRouter: RouteObject[] = [
    {
        path: routes.portofolio.name,
        children: [
            {
                path: ':username',
                element: (
                    <LazyLoad>
                        <PortofolioDetailPage />
                    </LazyLoad>
                ),
                handle: {
                    ...routes.portofolio,
                },
            },
        ],
    },
];
export default portofolioRouter;
