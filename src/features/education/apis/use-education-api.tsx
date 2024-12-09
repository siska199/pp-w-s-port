import { TEducation } from '@features/education/types/education-type'
import ENDPOINT from '@apis/endpoints'

import useAPI from '@hooks/use-api'

const useEducationApi = () => {
  const { apiClient } = useAPI()

  interface TParamsListEducation {
    keyword?: string
    id_level?: string
  }
  const getListEducation = async (params: TParamsListEducation) => {
    const response = await apiClient<TEducation[]>({
      endpoint: ENDPOINT.EDUCATION.GET_LIST_EDUCATION,
      queryObject: params
    })

    return response
  }

  const getEducationDetail = async (param: string) => {
    const id = param

    const response = await apiClient<TEducation>({
      endpoint: ENDPOINT.EDUCATION.GET_DETAIL_EDUCATION(id)
    })

    return response
  }

  return {
    getEducationDetail,
    getListEducation
  }
}

export default useEducationApi
