import React from 'react'

const protectedRoutes = [
  {
    path: '',
    element: (
      <React.Suspense>
        <div>SISKA</div>
      </React.Suspense>
    )
  }
]

export default protectedRoutes
