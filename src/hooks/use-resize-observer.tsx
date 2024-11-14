import React, { useEffect, useRef } from 'react'

interface TPropsUseResizeObserver {
  containerRef: React.RefObject<HTMLElement>
  resizeOptions: ResizeObserverOptions
  onResize: ResizeObserverCallback
}

const useResizeObserver = (params: TPropsUseResizeObserver) => {
  const { containerRef, resizeOptions = {}, onResize } = params
  const observerRef = useRef<ResizeObserver | null>(null)

  useEffect(() => {
    if (!containerRef.current || !onResize) return

    observerRef.current = new ResizeObserver(onResize)

    observerRef.current.observe(containerRef?.current, resizeOptions)

    if (containerRef?.current) {
      observerRef.current.observe(containerRef?.current, resizeOptions)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [containerRef, onResize, resizeOptions])
  return {}
}

export default useResizeObserver
