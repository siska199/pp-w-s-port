import { RouteObject } from 'react-router-dom'

import { ProjectListPage, ProjectUpsertPage } from '@pages'

import { routes } from '@routes/constant'

const projectRouter: RouteObject[] = [
  {
    path: routes.project.name,
    children: [
      {
        index: true,
        element: <ProjectListPage />,
        handle: routes.project
      },
      {
        path: routes.project.child?.upsert.name,
        element: <ProjectUpsertPage />,
        handle: routes.project.child?.upsert
      }
    ]
  }
]

export default projectRouter
