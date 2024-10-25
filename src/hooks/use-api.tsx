import CONFIG from '@lib/config/config';
import appMessage from '@lib/data/app-message';
import { generateUrlQueryParams, isEmptyValue } from '@lib/helper';
import {
  handleSetAlertConfig,
  handleSetIsloading,
} from '@store/modules/ui/ui-slice';

import axios, { CancelTokenSource } from 'axios';
import { useRef, useState } from 'react';

interface TParamsApiClient {
  baseUrl?: string;
  method?: 'get' | 'post' | 'put' | 'post';
  bareerToken?: string;
  endpoint: string;
  payload?: TObject;
  isForm?: boolean;
  message?: {
    sucess?: string;
    error?: string;
  };
  queryObject?: TObject;
}

type TResultApiClient = Promise<{
  data: TObject | null;
  sucess: boolean;
  message: string;
}>;

const useAPI = () => {
  const [progress, setProgress] = useState(0);
  const cancelTokenRef = useRef<CancelTokenSource | null>(null);

  const apiClient = async (params: TParamsApiClient): TResultApiClient => {
    handleSetIsloading(true);
    const {
      baseUrl,
      method = 'get',
      bareerToken,
      endpoint,
      isForm = false,
      payload,
      message,
      queryObject,
    } = params;
    try {
      cancelTokenRef.current = axios.CancelToken.source();

      let url = endpoint;

      if (method === 'get' && queryObject) {
        url = generateUrlQueryParams({ url, queryObject });
      }

      const response = await axios({
        baseURL: baseUrl || CONFIG.SERVER_BASE_URL,
        url: endpoint,
        method: !isEmptyValue(payload) ? 'post' : method,
        headers: {
          Authorization: bareerToken ? `Bearer ${bareerToken}` : null,
          'Content-Type': isForm ? 'multipart/form-data' : 'application/json',
        },
        withCredentials: !!bareerToken,
        cancelToken: cancelTokenRef.current.token,
        data: payload,
        onUploadProgress: (event) => {
          setProgress(Math.round((100 * event.loaded) / (event?.total || 100)));
        },
      });

      handleSetAlertConfig({
        show: true,
        message: message?.sucess || 'Successfully',
        type: 'sucess',
        withIcon: true,
      });

      return {
        sucess: true,
        data: response.data,
        message: 'Success',
      };
    } catch (error: any) {
      handleSetAlertConfig({
        show: true,
        message: message?.error || appMessage.systemErrorMessage,
        type: 'error',
        withIcon: true,
      });
      return {
        sucess: false,
        data: null,
        message: 'error',
      };
    } finally {
      handleSetIsloading(false);
    }
  };

  const cancelRequest = () => {
    if (cancelTokenRef.current) {
      cancelTokenRef.current.cancel('Operation canceled by the user.');
    }
  };

  return {
    apiClient,
    progress,
    cancelRequest,
    setProgress,
  };
};

export default useAPI;
