import {
  TPersonalInformation,
  TSocialLink
} from '@features/personal-information/types/personal-information-types'
import ENDPOINT from '@apis/endpoints'

import useAPI from '@hooks/use-api'

const usePersonalInformationAPI = () => {
  const { apiClient } = useAPI()

  const getDetailPersonalInformation = async () => {
    const result = await apiClient<TPersonalInformation>({
      endpoint: `${ENDPOINT.PERSONAL_INFORMATION.GET_DETAIL_PERSONAL_INFORMATION}`
    })
    return result
  }

  const getListSocialLink = async () => {
    const result = await apiClient<TSocialLink[]>({
      endpoint: `${ENDPOINT.SOCIAL_LINK.GET_LIST_SOCIAL_LINK}`
    })
    return result
  }

  const upsertPersonalInformation = async (params: TPersonalInformation) => {
    const result = await apiClient({
      endpoint: ENDPOINT.PERSONAL_INFORMATION.UPSERT_PERSONAL_INFORMATION,
      payload: params,
      method: 'post',
      isForm: true
    })

    return result
  }

  const upsertBulkSocialLink = async (params: Omit<TSocialLink, 'id_user' | 'category'>[]) => {
    const result = await apiClient({
      endpoint: ENDPOINT.SOCIAL_LINK.UPSERT_BULK_SOCIAL_LINKS,
      payload: params,
      method: 'post'
    })

    return result
  }

  return {
    getDetailPersonalInformation,
    getListSocialLink,
    upsertPersonalInformation,
    upsertBulkSocialLink
  }
}

export default usePersonalInformationAPI
