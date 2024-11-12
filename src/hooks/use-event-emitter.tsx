import { useCallback, useEffect } from 'react'
import { eventEmitter, TEventMap } from '@event-emitters'

const useEventEmitter = <T extends keyof TEventMap>(
  event: T,
  callback: (data: TEventMap[T]) => void
) => {
  const memoizedCallback = useCallback(callback, [callback])

  useEffect(() => {
    eventEmitter.on(event, memoizedCallback)

    return () => {
      eventEmitter.off(event, memoizedCallback)
    }
  }, [event, memoizedCallback])
}

export default useEventEmitter
