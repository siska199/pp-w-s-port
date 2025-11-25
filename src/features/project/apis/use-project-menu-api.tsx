import ENDPOINT from '@apis/endpoints'
import { TProject } from '@features/project/types/project-type'
import { TProjectMenu } from '@features/project/validation/project-menu-schema'

import useAPI from '@hooks/use-api'
import appMessage from '@lib/data/app-message'
import { removeKeyWithUndifienedValue } from '@lib/helper/function'
import { TPaginationQueryParams } from '@typescript/index-type'

export interface TParamsListProjectMenu extends TPaginationQueryParams {
  id_project?: string
}
const useProjectMenuApi = () => {
  const { apiClient } = useAPI()

  const getListProjectMenu = async (params: TParamsListProjectMenu) => {
    const response = await apiClient<TProjectMenu[]>({
      endpoint: ENDPOINT.PROJECT_MENU.GET_LIST_PROJECT_MENU,
      queryObject: removeKeyWithUndifienedValue(params)
    })

    return response
  }

  const getProjectMenuDetail = async (param: string) => {
    const id = param

    const response = await apiClient<TProject>({
      endpoint: ENDPOINT.PROJECT_MENU.GET_DETAIL_PROJECT_MENU(id)
    })

    return response
  }

  const upsertProjectMenu = async (params: TProjectMenu) => {
    const response = await apiClient<TProject>({
      endpoint: ENDPOINT.PROJECT.UPSERT_PROJECT,
      payload: {
        ...params
      },
      method: 'post',
      message: appMessage.upsertModule(params?.id, 'Project'),
      isForm: true
    })

    return response
  }

  const deleteProjectMenu = async (param: string) => {
    const id = param
    const response = await apiClient<TProject>({
      endpoint: ENDPOINT.PROJECT_MENU.DELETE_PROJECT_MENU(id),
      method: 'delete',
      message: appMessage.deleteModule('Project')
    })

    return response
  }

  return {
    getProjectMenuDetail,
    getListProjectMenu,
    upsertProjectMenu,
    deleteProjectMenu
  }
}

export default useProjectMenuApi
