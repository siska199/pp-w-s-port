import { routes } from '@routes/constant';
import menuSidebar from '@lib/data/menu-sidebar';
import Education from '@pages/education/education';
import { RouteObject } from 'react-router-dom';

const educationRouter: RouteObject[] = [
  {
    path: routes.education.fullPath,
    element: <Education />,
    handle: menuSidebar?.filter(
      (data) => data.name === routes.education.name
    )[0],
  },
];

export default educationRouter;
