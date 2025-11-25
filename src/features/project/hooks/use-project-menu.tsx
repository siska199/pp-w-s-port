import { useState } from 'react'

import EVENT_PROJECT from '@features/project/event-emitters/project-event'
import { TProjectMenu } from '@features/project/validation/project-menu-schema'

import useEventEmitter from '@hooks/use-event-emitter'
import { TTypeActionData } from '@typescript/index-type'
import useProjectMenuApi, { TParamsListProjectMenu } from '@features/project/apis/use-project-menu-api'

const useProjectMenu = () => {
  const [listProjectMenu, setListProjectMenu] = useState<TProjectMenu[]>([]);
  const { getListProjectMenu: getListProjectMenuApi } = useProjectMenuApi()

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

  const getListProjectMenu = async (params: TParamsListProjectMenu) => {
    const result = await getListProjectMenuApi(params);
    if(!result.data) return
    setListProjectMenu(result.data)
  }

  return {
    listProjectMenu,
    getListProjectMenu
  }
}

export default useProjectMenu
