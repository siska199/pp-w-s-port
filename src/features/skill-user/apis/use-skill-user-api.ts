import { TFilterSkillUser } from '@features/skill-user/components/skill-user-list/form-filter-skill-user'
import { TSkillUser } from '@features/skill-user/types/skill-user-type'
import { TSkillUserSchema } from '@features/skill-user/validation/skill-user-schema'
import ENDPOINT from '@apis/endpoints'

import useAPI from '@hooks/use-api'
import appMessage from '@lib/data/app-message'
import { removeKeyWithUndifienedValue } from '@lib/helper/function'
import { TPaginationQueryParams, TResponseDataPaginationAPI } from '@typescript/index-type'

const useSkillUserAPI = () => {
  const { apiClient } = useAPI()

  type TParamsListSkillUser = TPaginationQueryParams & Partial<TFilterSkillUser>
  const getListSkillUser = async (params: TParamsListSkillUser) => {
    const result = await apiClient<TResponseDataPaginationAPI<TSkillUser>>({
      endpoint: ENDPOINT.SKILL_USER.GET_LIST_SKILL_USER,
      queryObject: removeKeyWithUndifienedValue(params)
    })
    return result
  }

  const upsertSkillUser = async (params: TSkillUserSchema) => {
    const response = await apiClient<TSkillUser>({
      endpoint: ENDPOINT.SKILL_USER.UPSERT_SKILL_USER,
      payload: {
        ...params
      },
      method: 'post',
      message: appMessage.upsertModule(params?.id, 'Skill')
    })

    return response
  }

  const deleteSkillUser = async (param: string) => {
    const id = param
    const response = await apiClient<TSkillUser>({
      endpoint: ENDPOINT.SKILL_USER.DELETE_SKILL_USER(id),
      method: 'delete',
      message: appMessage.deleteModule('Skill User')
    })

    return response
  }

  return {
    getListSkillUser,
    upsertSkillUser,
    deleteSkillUser
  }
}

export default useSkillUserAPI
