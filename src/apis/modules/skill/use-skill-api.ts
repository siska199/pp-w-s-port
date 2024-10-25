import ENDPOINT from '@apis/constant'
import useAPI from '@hooks/use-api'

const useSkillAPI = () => {
  const { apiClient } = useAPI()

  const getListSkill = async () => {
    const result = await apiClient({
      endpoint: ENDPOINT.SKILL.GET_LIST_SKILL
    })
    return result?.data?.data
  }

  return {
    getListSkill
  }
}

export default useSkillAPI
