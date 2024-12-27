import React from 'react'

interface TProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}
const LazyLoad = (props: TProps) => {
  const { children, fallback } = props

  return (
    <React.Suspense fallback={fallback ?? <div className='p-4 md:p-8'>load page...</div>}>
      {children}
    </React.Suspense>
  )
}

export default LazyLoad
