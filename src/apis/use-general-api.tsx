import ENDPOINTS from '@apis/endpoints'

import useAPI from '@hooks/use-api'
import { TCategorySocialLink, TProfession } from '@typescript/general-module-types'

const useGeneralAPI = () => {
  const { apiClient } = useAPI()

  const getListProvince = async () => {
    const result = await apiClient<{ id: string; name: string }[]>({
      endpoint: ENDPOINTS.GENERAL.GET_LIST_PROVINCE,
      isLodiang: false
    })
    return result
  }

  const getListCity = async (queryObject: { province_code: string }) => {
    const { province_code } = queryObject
    const result = await apiClient<{ id: string; name: string }[]>({
      endpoint: ENDPOINTS.GENERAL.GET_LIST_CITY,
      queryObject: {
        province_code
      },
      isLodiang: false
    })
    return result
  }

  const getListDistrict = async (queryObject: { city_code: string }) => {
    const { city_code } = queryObject
    const result = await apiClient<{ id: string; name: string }[]>({
      endpoint: ENDPOINTS.GENERAL.GET_LIST_DISTRICT,
      queryObject: {
        city_code
      },
      isLodiang: false
    })
    return result
  }

  const getListPostalCode = async (queryObject: { city_name: string; district_name: string }) => {
    const { city_name, district_name } = queryObject

    const result = await apiClient({
      endpoint: ENDPOINTS.GENERAL.GET_LIST_POSTAL_CODE,
      queryObject: {
        city_name,
        district_name
      },
      isLodiang: false
    })
    return result
  }

  const getListProfession = async () => {
    const result = await apiClient<TProfession[]>({
      endpoint: ENDPOINTS.GENERAL.GET_LIST_PROFESSION,
      isLodiang: false
    })

    return result
  }

  const getListCategorySocialLink = async () => {
    const result = await apiClient<TCategorySocialLink[]>({
      endpoint: ENDPOINTS.GENERAL.GET_LIST_CATEGORY_SOCIAL_LINK,
      isLodiang: false
    })

    return result
  }

  return {
    getListProvince,
    getListCity,
    getListDistrict,
    getListPostalCode,
    getListProfession,
    getListCategorySocialLink
  }
}

export default useGeneralAPI
