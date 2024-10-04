import { routes } from '@routes/constant';
import ProjectDetailPage from '@pages/project/project-detail';
import { RouteObject } from 'react-router-dom';

const projectDetailRouter: RouteObject[] = [
  {
    path: routes.project.name,
    children: [
      {
        path: ':id',
        element: <ProjectDetailPage />,
        handle: {
          ...routes.project?.child?.detail,
        },
      },
    ],
  },
];

export default projectDetailRouter;
