import { routes } from '@routes/constant';
import menuSidebar from '@lib/data/menu-sidebar';
import Project from '@pages/project/project';
import { RouteObject } from 'react-router-dom';

const projectRouter: RouteObject[] = [
  {
    path: routes.project.fullPath,
    element: <Project />,
    handle: menuSidebar?.filter((data) => data.name === routes.project.name)[0],
  },
];

export default projectRouter;
