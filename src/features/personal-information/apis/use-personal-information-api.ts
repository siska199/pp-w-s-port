import { listCategorySocialLink } from '@features/personal-information/constants'
import ENDPOINT from '@apis/endpoints'

import useAPI from '@hooks/use-api'

const usePersonalInformation = () => {
  const { apiClient } = useAPI()

  const getDetailPersonalInformation = async () => {
    const result = await apiClient({
      endpoint: `${ENDPOINT.PERSONAL_INFORMATION.GET_DETAIL_PERSONAL_INFORMATION}`
    })
    return result?.data
  }

  const getListCategorySocialLink = async () => {
    return {
      data: listCategorySocialLink,
      message: 'Successfully Get Data',
      status: 200
    }
  }
  return {
    getDetailPersonalInformation,
    getListCategorySocialLink
  }
}

export default usePersonalInformation
