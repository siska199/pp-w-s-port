import cities from '@lib/data/dummy/cities.json'
import districts from '@lib/data/dummy/districts.json'
import postal_codes from '@lib/data/dummy/postal_codes.json'
import professions from '@lib/data/dummy/professions.json'
import provinces from '@lib/data/dummy/provinces.json'

const useGeneralAPI = () => {
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
    return professions
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
