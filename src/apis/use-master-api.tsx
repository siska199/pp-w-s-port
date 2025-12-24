import ENDPOINTS from '@apis/endpoints'

import useAPI from '@hooks/use-api'
import {
  TMasterCategorySkill,
  TMasterCategorySocialLink,
  TMasterCompany,
  TMasterEducationLevel,
  TMasterEducationMajor,
  TMasterEducationSchool,
  TMasterProfession,
  TMasterSkill
} from '@typescript/master-module-types'

const useMasterAPI = () => {
  const { apiClient } = useAPI()

  const getListMasterProvince = async () => {
    const result = await apiClient<{ id: string; name: string }[]>({
      endpoint: ENDPOINTS.MASTER.GET_LIST_MASTER_PROVINCE,
      isLodiang: false
    })
    return result
  }

  const getListMasterCity = async (queryObject: { id_province: string }) => {
    const { id_province } = queryObject
    const result = await apiClient<{ id: string; name: string }[]>({
      endpoint: ENDPOINTS.MASTER.GET_LIST_MASTER_CITY,
      queryObject: {
        id_province
      },
      isLodiang: false
    })
    return result
  }

  const getListMasterDistrict = async (queryObject: { id_city: string }) => {
    const { id_city } = queryObject
    const result = await apiClient<{ id: string; name: string }[]>({
      endpoint: ENDPOINTS.MASTER.GET_LIST_MASTER_DISTRICT,
      queryObject: {
        id_city
      },
      isLodiang: false
    })
    return result
  }

  const getListMasterPostalCode = async (queryObject: { id_district: string }) => {
    const { id_district } = queryObject

    const result = await apiClient<{ id: string; name: string; postal_code: string }[]>({
      endpoint: ENDPOINTS.MASTER.GET_LIST_MASTER_POSTAL_CODE,
      queryObject: {
        id_district
      },
      isLodiang: false
    })
    return result
  }

  const getListMasterProfession = async () => {
    const result = await apiClient<TMasterProfession[]>({
      endpoint: ENDPOINTS.MASTER.GET_LIST_MASTER_PROFESSION,
      isLodiang: false
    })

    return result
  }

  const getListMasterCategorySocialLink = async () => {
    const result = await apiClient<TMasterCategorySocialLink[]>({
      endpoint: ENDPOINTS.MASTER.GET_LIST_MASTER_CATEGORY_SOCIAL_LINK,
      isLodiang: false
    })

    return result
  }

  const getListMasterEducationLevel = async () => {
    const result = await apiClient<TMasterEducationLevel[]>({
      endpoint: ENDPOINTS.MASTER.GET_LIST_MASTER_EDUCATION_LEVEL,
      isLodiang: false
    })

    return result
  }

  const getListMasterEducationMajor = async () => {
    const result = await apiClient<TMasterEducationMajor[]>({
      endpoint: ENDPOINTS.MASTER.GET_LIST_MASTER_EDUCATION_MAJOR,
      isLodiang: false
    })

    return result
  }

  const getListMasterEducationSchool = async () => {
    const result = await apiClient<TMasterEducationSchool[]>({
      endpoint: ENDPOINTS.MASTER.GET_LIST_MASTER_EDUCATION_SCHOOL,
      isLodiang: false
    })

    return result
  }

  const getListMasterCategorySkill = async () => {
    const result = await apiClient<TMasterCategorySkill[]>({
      endpoint: ENDPOINTS.MASTER.GET_LIST_MASTER_CATEGORY_SKILL,
      isLodiang: false
    })
    return result
  }

  const getListMasterSkill = async () => {
    const result = await apiClient<TMasterSkill[]>({
      endpoint: ENDPOINTS.MASTER.GET_LIST_MASTER_SKILL,
      isLodiang: false
    })
    return result
  }

  const getListMasterCompany = async () => {
    const result = await apiClient<TMasterCompany[]>({
      endpoint: ENDPOINTS.MASTER.GET_LIST_MASTER_COMPANY,
      isLodiang: false
    })
    return result
  }


  return {
    getListMasterProvince,
    getListMasterCity,
    getListMasterDistrict,
    getListMasterPostalCode,

    getListMasterProfession,
    getListMasterCategorySocialLink,

    getListMasterEducationLevel,
    getListMasterEducationMajor,
    getListMasterEducationSchool,

    getListMasterCategorySkill,
    getListMasterSkill,

    getListMasterCompany
  }
}

export default useMasterAPI
