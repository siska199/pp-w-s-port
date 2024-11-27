import { useRef, useState } from 'react'
import axios, { CancelTokenSource } from 'axios'

import { handleSetAlertConfig, handleSetIsloading } from '@store/ui-slice'
import CONFIG from '@lib/config/config'
import appMessage from '@lib/data/app-message'
import { generateUrlQueryParams, isEmptyValue } from '@lib/helper/function'
import { TObject } from '@typescript/index-type'

interface TParamsApiClient {
  baseUrl?: string
  method?: 'get' | 'post' | 'put' | 'post'
  bareerToken?: string
  endpoint: string
  payload?: TObject
  isForm?: boolean
  message?: {
    sucess?: string
    error?: string
  }
  queryObject?: TObject
  noChace?: boolean
  isNoCache?: boolean
}

type TResultApiClient = Promise<{
  data: TObject | null
  sucess: boolean
  message: string
}>

const useAPI = () => {
  const [progress, setProgress] = useState(0)
  const cancelTokenRef = useRef<CancelTokenSource | null>(null)

  const apiClient = async (params: TParamsApiClient): TResultApiClient => {
    handleSetIsloading(true)
    const {
      baseUrl,
      method = 'get',
      bareerToken,
      endpoint,
      isForm = false,
      payload,
      message,
      queryObject,
      isNoCache = false
    } = params
    try {
      cancelTokenRef.current = axios.CancelToken.source()

      let url = endpoint
      if (method === 'get' && queryObject) {
        url = generateUrlQueryParams({ url, queryObject })
      }
      const noCacheConfig = {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: '0'
      }

      const response = await axios({
        baseURL: baseUrl || CONFIG.SERVER_BASE_URL,
        url,
        method: !isEmptyValue(payload) ? 'post' : method,
        headers: {
          Authorization: bareerToken ? `Bearer ${bareerToken}` : null,

          'Content-Type': isForm ? 'multipart/form-data' : 'application/json',
          ...(isNoCache && noCacheConfig)
        },
        withCredentials: !!bareerToken,
        cancelToken: cancelTokenRef.current.token,
        data: payload,
        onUploadProgress: (event) => {
          setProgress(Math.round((100 * event.loaded) / (event?.total || 100)))
        }
      })

      handleSetAlertConfig({
        show: true,
        message: message?.sucess || 'Successfully',
        type: 'sucess',
        withIcon: true
      })

      return {
        sucess: true,
        data: response.data,
        message: 'Success'
      }
    } catch (error: any) {
      console.log('error: ', error?.message)

      handleSetAlertConfig({
        show: true,
        message: message?.error || error?.message || appMessage.systemErrorMessage,
        type: 'error',
        withIcon: true
      })
      return {
        sucess: false,
        data: null,
        message: 'error'
      }
    } finally {
      handleSetIsloading(false)
    }
  }

  const cancelRequest = () => {
    if (cancelTokenRef.current) {
      cancelTokenRef.current.cancel('Operation canceled by the user.')
    }
  }

  return {
    apiClient,
    progress,
    cancelRequest,
    setProgress
  }
}

export default useAPI
