import ENDPOINTS from '@apis/endpoints'

import useAPI from '@hooks/use-api'
import {
  TCategorySocialLink,
  TEducationLevel,
  TEducationMajor,
  TEducationSchool,
  TProfession
} from '@typescript/general-module-types'

const useGeneralAPI = () => {
  const { apiClient } = useAPI()

  const getListProvince = async () => {
    const result = await apiClient<{ id: string; name: string }[]>({
      endpoint: ENDPOINTS.GENERAL.GET_LIST_PROVINCE,
      isLodiang: false
    })
    return result
  }

  const getListCity = async (queryObject: { id_province: string }) => {
    const { id_province } = queryObject
    const result = await apiClient<{ id: string; name: string }[]>({
      endpoint: ENDPOINTS.GENERAL.GET_LIST_CITY,
      queryObject: {
        id_province
      },
      isLodiang: false
    })
    return result
  }

  const getListDistrict = async (queryObject: { id_city: string }) => {
    const { id_city } = queryObject
    const result = await apiClient<{ id: string; name: string }[]>({
      endpoint: ENDPOINTS.GENERAL.GET_LIST_DISTRICT,
      queryObject: {
        id_city
      },
      isLodiang: false
    })
    return result
  }

  const getListPostalCode = async (queryObject: { id_district: string }) => {
    const { id_district } = queryObject

    const result = await apiClient<{ id: string; name: string; postal_code: string }[]>({
      endpoint: ENDPOINTS.GENERAL.GET_LIST_POSTAL_CODE,
      queryObject: {
        id_district
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

  const getListEducationLevel = async () => {
    const result = await apiClient<TEducationLevel[]>({
      endpoint: ENDPOINTS.GENERAL.GET_LIST_EDUCATION_LEVEL,
      isLodiang: false
    })

    return result
  }

  const getListEducationMajor = async () => {
    const result = await apiClient<TEducationMajor[]>({
      endpoint: ENDPOINTS.GENERAL.GET_LIST_EDUCATION_MAJOR,
      isLodiang: false
    })

    return result
  }

  const getListEducationSchool = async () => {
    const result = await apiClient<TEducationSchool[]>({
      endpoint: ENDPOINTS.GENERAL.GET_LIST_EDUCATION_SCHOOL,
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
    getListCategorySocialLink,
    getListEducationLevel,
    getListEducationMajor,
    getListEducationSchool
  }
}

export default useGeneralAPI
