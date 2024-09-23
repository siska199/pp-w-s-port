import menuSidebar from '@lib/data/menu-sidebar'
import { UIMatch, useMatches } from 'react-router-dom'

const useCurrentPath = () => {

  const matches:UIMatch[] = useMatches()
  const currentPath = matches?.find(
    (match: any) =>match?.pathname == location?.pathname,
  )

  return { currentPath }
}

export default useCurrentPath
