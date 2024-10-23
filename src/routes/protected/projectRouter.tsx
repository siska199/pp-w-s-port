import ProjectPage from '@pages/project/project';
import { routes } from '@routes/constant';
import { RouteObject } from 'react-router-dom';

const projectRouter: RouteObject[] = [
  {
    path: routes.project.fullPath,
    element: <ProjectPage />,
    handle: routes.project,
  },
];

export default projectRouter;
