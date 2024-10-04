import { routes } from '@routes/constant';
import menuSidebar from '@lib/data/menu-sidebar';
import WorkHistory from '@pages/work-history/work-history';
import { RouteObject } from 'react-router-dom';

const workHistoryRouter: RouteObject[] = [
  {
    path: routes.workHistory.fullPath,
    element: <WorkHistory />,
    handle: menuSidebar?.filter(
      (data) => data.name === routes.workHistory.name
    )[0],
  },
];

export default workHistoryRouter;
