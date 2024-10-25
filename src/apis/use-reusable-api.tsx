import ENDPOINT from '@apis/constant';
import useAPI from '@hooks/use-api';

const useReusableAPI = () => {
  const { apiClient } = useAPI();

  const getListProvince = async () => {
    const result = await apiClient({
      endpoint: ENDPOINT.GENERAL.GET_LIST_PROVINCE,
    });
    return result?.data?.data;
  };

  const getListCity = async (queryObject: { provinceCode: string }) => {
    const { apiClient } = useAPI();

    return await apiClient({
      endpoint: ENDPOINT.GENERAL.GET_LIST_CITY,
      queryObject,
    });
  };
  return {
    getListProvince,
    getListCity,
  };
};

export default useReusableAPI;
