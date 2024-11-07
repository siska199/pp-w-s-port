import { useCallback, useEffect } from 'react'
import { eventEmitter } from '@event-emmitter'
import { TEventSkillMap } from '@event-emmitter/modules/skill/skill-event'

const useEventEmitter = <T extends keyof TEventSkillMap>(
  event: T,
  callback: (data: TEventSkillMap[T]) => void
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
