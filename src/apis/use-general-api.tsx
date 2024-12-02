import ENDPOINTS from '@apis/endpoints'

import useAPI from '@hooks/use-api'
import cities from '@lib/data/dummy/cities.json'
import districts from '@lib/data/dummy/districts.json'
import postal_codes from '@lib/data/dummy/postal_codes.json'
import provinces from '@lib/data/dummy/provinces.json'
import { TProfession } from '@typescript/general-module-types'

const useGeneralAPI = () => {
  const { apiClient } = useAPI()

  const getListProvince = async () => {
    return provinces
  }

  const getListCity = async (queryObject: { id_province: string }) => {
    const { id_province } = queryObject
    const data = cities?.filter((data) => data?.id_province === Number(id_province))
    return data
  }

  const getListDistrict = async (queryObject: { id_city: string }) => {
    const { id_city } = queryObject
    const data = districts?.filter((data) => data?.id_city === Number(id_city))
    return data
  }

  const getListPostalCode = async (queryObject: { id_district: string }) => {
    const { id_district } = queryObject
    const data = postal_codes?.filter((data) => data?.id_district === Number(id_district))
    return data
  }

  const getListProfession = async () => {
    const result = await apiClient<TProfession[]>({
      endpoint: ENDPOINTS.MASTER.GET_LIST_PROFESSION
    })

    return result
  }

  return {
    getListProvince,
    getListCity,
    getListDistrict,
    getListPostalCode,
    getListProfession
  }
}

export default useGeneralAPI
