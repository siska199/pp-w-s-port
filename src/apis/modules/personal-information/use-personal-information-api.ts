import ENDPOINT from '@apis/constant'
import useAPI from '@hooks/use-api'

const usePersonalInformation = () => {
  const { apiClient } = useAPI()

  const getDetailPersonalInformation = async (param: string) => {
    const idPortofolio = param
    const result = await apiClient({
      endpoint: `${ENDPOINT.PERSONAL_INFORMATION.GET_DETAIL_PERSONAL_INFORMATION}/${idPortofolio}`
    })
    return result?.data?.data
  }
  return {
    getDetailPersonalInformation
  }
}

export default usePersonalInformation
