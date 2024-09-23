import menuSidebar from '@lib/data/menu-sidebar'
import { UIMatch, useMatches } from 'react-router-dom'

const useCurrentPath = () => {
  const matches = useMatches()

  const currentPath = matches?.find(
    (match: any) =>match?.pathname == location?.pathname,
  ) as Omit<UIMatch, "handle"> & {
    handle : typeof menuSidebar[0]
  }

  return { currentPath }
}

export default useCurrentPath
