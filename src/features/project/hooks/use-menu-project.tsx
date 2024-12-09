import { useState } from 'react'

import EVENT_PROJECT from '@features/project/event-emitters/project-event'
import { TMenuProject } from '@features/project/validation/menu-project-schema'

import useEventEmitter from '@hooks/use-event-emitter'
import { TTypeActionData } from '@typescript/index-type'

const useMenuProject = () => {
  const [listMenuProject, setListMenuProject] = useState<TMenuProject[]>([])

  useEventEmitter(EVENT_PROJECT.ONCHANGE_LIST_MENU_PROJECT, (data) => {
    let listMenuProjectUpdated = listMenuProject
    const action = data.action
    const menuProject = data.menuProject
    const index = listMenuProject.findIndex((item) => item?.id === menuProject?.id)

    switch (action) {
      case TTypeActionData.ADD:
        listMenuProjectUpdated.push(menuProject)
        break
      case TTypeActionData.EDIT:
        listMenuProjectUpdated[index] = menuProject
        break
      case TTypeActionData.DELETE:
        listMenuProjectUpdated = listMenuProjectUpdated.filter((item) => item.id !== menuProject.id)
        break
    }

    setListMenuProject([...listMenuProjectUpdated])
  })

  return {
    listMenuProject
  }
}

export default useMenuProject
