import { RouteObject } from 'react-router-dom'

import ProjectDetailPage from '@pages/project/project-detail'

import { routes } from '@routes/constant'

const projectDetailRouter: RouteObject[] = [
  {
    path: routes.project.child?.detail.name,
    children: [
      {
        path: ':id',
        element: <ProjectDetailPage />,
        handle: {
          ...routes.project?.child?.detail
        }
      }
    ]
  }
]

export default projectDetailRouter
