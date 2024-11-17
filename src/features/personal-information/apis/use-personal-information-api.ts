import { listCategorySocialLink } from '@features/personal-information/constants'
import ENDPOINT from '@apis/constant'

import useAPI from '@hooks/use-api'
import { TResponseSuccessAPI } from '@typescript/global'

const usePersonalInformation = () => {
  const { apiClient } = useAPI()

  const getDetailPersonalInformation = async (param: string) => {
    const idPortofolio = param
    const result = await apiClient({
      endpoint: `${ENDPOINT.PERSONAL_INFORMATION.GET_DETAIL_PERSONAL_INFORMATION}/${idPortofolio}`
    })
    return result?.data?.data
  }

  const getListCategorySocialLink = async (): Promise<
    TResponseSuccessAPI<
      {
        name: string
        image: string
        placeholder: string
        defaultValue: string
      }[]
    >
  > => {
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
