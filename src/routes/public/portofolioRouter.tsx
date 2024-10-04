import { routes } from '@routes/constant';
import Portofolio from '@pages/portofolio/portofolio';
import { RouteObject } from 'react-router-dom';

const portofolioRouter: RouteObject[] = [
  {
    path: routes.portofolio.name,
    children: [
      {
        path: ':id',
        element: <Portofolio />,
        handle: {
          ...routes.portofolio,
        },
      },
    ],
  },
];
export default portofolioRouter;
