import React from 'react'

import Loading from '@components/loading'

interface TProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}
const LazyLoad = (props: TProps) => {
  const { children, fallback } = props
  return <React.Suspense fallback={fallback ?? <Loading />}>{children}</React.Suspense>
}

export default LazyLoad
