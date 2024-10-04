import { routes } from '@routes/constant';
import menuSidebar from '@lib/data/menu-sidebar';
import { PersonalInformation } from '@pages';
import { RouteObject } from 'react-router-dom';

const personalInformationRouter: RouteObject[] = [
  {
    path: routes.personalInformation.fullPath,
    element: <PersonalInformation />,
    handle: menuSidebar?.filter(
      (data) => data.name === routes.personalInformation.name
    )[0],
  },
];

export default personalInformationRouter;
