import { RouteObject } from 'react-router-dom';

import { EducationDetailPage, EducationListPage } from '@features/education/pages';
import LazyLoad from '@components/ui/lazy-load';

import { routes } from '@routes/constant';

const educationRouter: RouteObject[] = [
    {
        path: routes.education.name,
        children: [
            {
                index: true,
                element: (
                    <LazyLoad>
                        <EducationListPage />
                    </LazyLoad>
                ),
                handle: routes.education,
            },
            {
                path: routes.education.child.detail.name,
                element: (
                    <LazyLoad>
                        <EducationDetailPage />
                    </LazyLoad>
                ),
                handle: routes.education.child.detail,
            },
        ],
    },
];

export default educationRouter;
