import GlobalLayout from '@components/layouts/GlobalLayout'
import Protectedlayout from '@components/layouts/Protectedlayout'
import React from 'react'

const protectedRoutes = [
  {
    path: '',
    element: (
      <React.Suspense fallback={'Loading...'}>
        <GlobalLayout>
          <Protectedlayout />
        </GlobalLayout>
      </React.Suspense>
    ),
    errorElement: <div>Not Found</div>,
    children: []
  }
]

export default protectedRoutes
