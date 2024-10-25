import { RouteObject } from 'react-router-dom'
import ProjectPage from '@pages/project/project'
import ProjectForm from '@pages/project/project-form'
import { routes } from '@routes/constant'

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
        path: routes.project.child?.form.name,
        element: <ProjectForm />,
        handle: routes.project.child?.form
      }
    ]
  }
]

export default projectRouter
