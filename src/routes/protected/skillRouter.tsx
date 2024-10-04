import { routes } from '@routes/constant';
import menuSidebar from '@lib/data/menu-sidebar';
import Skill from '@pages/skill/skill';
import { RouteObject } from 'react-router-dom';

const skillRouter: RouteObject[] = [
  {
    path: routes.skill.fullPath,
    element: <Skill />,
    handle: menuSidebar?.filter((data) => data.name === routes.skill.name)[0],
  },
];

export default skillRouter;
