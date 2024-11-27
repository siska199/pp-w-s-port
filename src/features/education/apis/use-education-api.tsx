import { educationDetail } from '@features/education/constants'
import ENDPOINT from '@apis/endpoints'

import useAPI from '@hooks/use-api'
import { TResponseSuccessAPI } from '@typescript/index-type'

const useEducationApi = () => {
  const { apiClient } = useAPI()
  const getEducationDetail = async (
    param: string
  ): Promise<TResponseSuccessAPI<{ id: string }>> => {
    const id = param

    await apiClient({
      endpoint: ENDPOINT.EDUCATION.GET_DETAIL_EDUCATION(id)
    })

    return {
      status: 200,
      message: 'Successfully Get Data',
      data: educationDetail
    }
  }

  return {
    getEducationDetail
  }
}

export default useEducationApi
