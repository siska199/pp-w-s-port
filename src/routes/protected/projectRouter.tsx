import { RouteObject } from 'react-router-dom'

import ProjectPage from '@pages/project/project'

import { routes } from '@routes/constant'

import ProjectUpSert from '../../pages/project/project-upsert'

const projectRouter: RouteObject[] = [
  {
    path: routes.project.name,
    children: [
      {
        index: true,
        element: <ProjectPage />,
        handle: routes.project
      },
      {
        path: routes.project.child?.upsert.name,
        element: <ProjectUpSert />,
        handle: routes.project.child?.upsert
      }
    ]
  }
]

export default projectRouter
