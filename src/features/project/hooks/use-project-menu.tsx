import { useState } from 'react'

import EVENT_PROJECT from '@features/project/event-emitters/project-event'
import { TProjectMenu } from '@features/project/validation/project-menu-schema'

import useEventEmitter from '@hooks/use-event-emitter'
import { TTypeActionData } from '@typescript/index-type'

const useProjectMenu = () => {
  const [listProjectMenu, setListProjectMenu] = useState<TProjectMenu[]>([])

  useEventEmitter(EVENT_PROJECT.ONCHANGE_LIST_MENU_PROJECT, (data) => {
    let listMenuProjectUpdated = listProjectMenu
    const action = data.action
    const projectMenu = data.projectMenu
    const index = listProjectMenu.findIndex((item) => item?.id === projectMenu?.id)

    switch (action) {
      case TTypeActionData.ADD:
        listMenuProjectUpdated.push(projectMenu)
        break
      case TTypeActionData.EDIT:
        listMenuProjectUpdated[index] = projectMenu
        break
      case TTypeActionData.DELETE:
        listMenuProjectUpdated = listMenuProjectUpdated.filter((item) => item.id !== projectMenu.id)
        break
    }

    setListProjectMenu([...listMenuProjectUpdated])
  })

  return {
    listProjectMenu
  }
}

export default useProjectMenu
