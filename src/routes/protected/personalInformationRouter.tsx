import { PersonalInformation } from '@pages';
import { routes } from '@routes/constant';
import { RouteObject } from 'react-router-dom';

const personalInformationRouter: RouteObject[] = [
  {
    path: routes.personalInformation.fullPath,
    element: <PersonalInformation />,
    handle: routes.personalInformation,
  },
];

export default personalInformationRouter;
