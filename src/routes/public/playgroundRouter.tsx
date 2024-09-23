import GlobalLayout from '@components/layouts/GlobalLayout'
import PublicLayout from '@components/layouts/PublicLayout'
import Loading from '@components/loading'
import { PlaygroundPage } from '@pages'
import React from 'react'

const playgroundRouter = [
  {
    path: 'playground',
    element: (
      <React.Suspense fallback={<Loading />}>
        <GlobalLayout>
          <PublicLayout />
        </GlobalLayout>
      </React.Suspense>
    ),
    children: [
      {
        index: true,
        element: <PlaygroundPage />
      }
    ]
  }
]

export default playgroundRouter
