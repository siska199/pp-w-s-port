import { useRef, useState } from 'react'
import axios, { CancelTokenSource } from 'axios'

import { handleSetAlertConfig, handleSetIsloading } from '@store/ui-slice'
import CONFIG from '@lib/config/config'
import appMessage from '@lib/data/app-message'
import { generateUrlQueryParams } from '@lib/helper/function'
import { TObject, TResponseAPI } from '@typescript/index-type'

interface TParamsApiClient {
  baseURL?: string
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

const useAPI = () => {
  const [progress, setProgress] = useState(0)
  const cancelTokenRef = useRef<CancelTokenSource | null>(null)

  const apiClient = async <TData extends object>({
    baseURL,
    method = 'get',
    bareerToken,
    endpoint,
    isForm = false,
    payload,
    message,
    queryObject,
    isNoCache
  }: TParamsApiClient): Promise<Partial<TResponseAPI<TData>>> => {
    handleSetIsloading(true)
    try {
      /*BASE URL */
      baseURL = baseURL || CONFIG.SERVER_BASE_URL

      /*SET URL WITH QUERY PARAM */
      let url = endpoint
      if (method === 'get' && queryObject) {
        url = generateUrlQueryParams({ url, queryObject })
      }

      /*CACHE CONTROL*/
      const noCacheConfig = {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: '0'
      }

      /*HEADER CONFIGURATION*/
      const headers = {
        Authorization: bareerToken ? `Bearer ${bareerToken}` : null,
        'Content-Type': isForm ? 'multipart/form-data' : 'application/json',
        ...(isNoCache && noCacheConfig)
      }

      /*CANCEL TOKEN */
      cancelTokenRef.current = axios.CancelToken.source()

      const response = await axios({
        baseURL,
        url,
        method,
        headers,
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

      return response.data
    } catch (error: any) {
      console.log('error: ', error?.message)

      handleSetAlertConfig({
        show: true,
        message: message?.error || error?.message || appMessage.systemErrorMessage,
        type: 'error',
        withIcon: true
      })
      return {
        status: false,
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
