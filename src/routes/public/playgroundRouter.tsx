import { PlaygroundPage } from '@pages'

const playgroundRouter = [
  {
    path: 'playground',
    children: [
      {
        index: true,
        element: <PlaygroundPage />
      }
    ]
  }
]

export default playgroundRouter
