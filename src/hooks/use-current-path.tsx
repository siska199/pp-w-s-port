import { UIMatch, useMatches } from 'react-router-dom'
import { TRoute } from '@routes/constant'

const useCurrentPath = () => {
  const matches = useMatches()

  const currentPath = matches?.find((match: UIMatch) => {
    return match?.pathname?.replace(/\/+$/, '') == location?.pathname && match?.handle
  }) as Omit<UIMatch, 'handle'> & {
    handle: TRoute
  }

  console.log(matches)

  return { currentPath }
}

export default useCurrentPath
