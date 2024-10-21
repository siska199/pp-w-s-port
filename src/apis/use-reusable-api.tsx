import ENDPOINT from '@apis/constant';
import useAPI from '@hooks/useAPI';

const useReusableAPI = () => {
  const { apiClient } = useAPI();

  const getListProvince = async () => {
    const result = await apiClient({
      endpoint: ENDPOINT.GET_LIST_PROVINCE,
    });
    return result?.data?.data;
  };

  const getListCity = async (queryParam: { provinceCode: string }) => {
    const { apiClient } = useAPI();

    return await apiClient({
      endpoint: ENDPOINT.GET_LIST_CITY,
      queryObject: queryParam,
    });
  };
  return {
    getListProvince,
    getListCity,
  };
};

export default useReusableAPI;
