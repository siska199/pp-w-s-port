import { RouteObject } from 'react-router-dom'

import { ProjectListPage, ProjectUpsertPage } from '@features/project/pages'
import LazyLoad from '@components/ui/lazy-load'

import { routes } from '@routes/constant'

const projectRouter: RouteObject[] = [
  {
    path: routes.project.name,
    children: [
      {
        index: true,
        element: (
          <LazyLoad>
            <ProjectListPage />
          </LazyLoad>
        ),
        handle: routes.project
      },
      {
        path: routes.project.child?.upsert.name,
        element: (
          <LazyLoad>
            <ProjectUpsertPage />
          </LazyLoad>
        ),
        handle: routes.project.child?.upsert
      }
    ]
  }
]

export default projectRouter
