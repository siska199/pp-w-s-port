import React from 'react'

import Loading from '@components/loading'

interface TProps {
  children: React.ReactNode
}
const LazyLoad = (props: TProps) => {
  const { children } = props
  return <React.Suspense fallback={<Loading />}>{children}</React.Suspense>
}

export default LazyLoad
