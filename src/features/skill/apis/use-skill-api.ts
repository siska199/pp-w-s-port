import ENDPOINT from '@apis/endpoints'

import useAPI from '@hooks/use-api'

const useSkillAPI = () => {
  const { apiClient } = useAPI()

  const getListSkill = async () => {
    const result = await apiClient({
      endpoint: ENDPOINT.SKILL_USER.GET_LIST_SKILL_USER
    })
    return result
  }

  return {
    getListSkill
  }
}

export default useSkillAPI
