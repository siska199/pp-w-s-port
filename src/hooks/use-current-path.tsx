import { UIMatch, useMatches } from 'react-router-dom'
import { TRoute } from '@routes/constant'

const useCurrentPath = () => {
  const matches = useMatches()

  const currentPath = matches?.find((match: any) => match?.pathname == location?.pathname) as Omit<
    UIMatch,
    'handle'
  > & {
    handle: TRoute
  }

  return { currentPath }
}

export default useCurrentPath
