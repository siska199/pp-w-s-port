import { useRef, useState } from 'react'
import axios, { CancelTokenSource } from 'axios'

import { useAppDispatch, useAppSelector } from '@store/store'
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
  isShowAlert?: boolean
  isLodiang?: boolean
}

const useAPI = () => {
  const [progress, setProgress] = useState(0)
  const cancelTokenRef = useRef<CancelTokenSource | null>(null)
  const dispatch = useAppDispatch()
  const jwtToken = useAppSelector((state) => state?.auth?.token)

  const apiClient = async <TData extends object>(
    params: TParamsApiClient
  ): Promise<Partial<TResponseAPI<TData>>> => {
    const {
      method = 'get',
      bareerToken,
      endpoint,
      isForm = false,
      payload,
      message,
      queryObject,
      isNoCache,
      isLodiang = true
    } = params

    let { baseURL, isShowAlert } = params

    isLodiang && dispatch(handleSetIsloading(true))
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
        Authorization: `Bearer ${bareerToken || jwtToken}`,
        'Content-Type': isForm ? 'multipart/form-data' : 'application/json',
        ...(isNoCache && noCacheConfig)
      }

      /*CANCEL TOKEN */
      cancelTokenRef.current = axios.CancelToken.source()

      /*SHOW ALERT */
      isShowAlert = isShowAlert ?? (method === 'get' ? false : true)

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

      isShowAlert &&
        dispatch(
          handleSetAlertConfig({
            show: true,
            message:
              message?.sucess || JSON.stringify(response?.data?.data?.message) || 'Successfully',
            type: 'sucess',
            withIcon: true
          })
        )

      return response.data
    } catch (error: any) {
      const messageError =
        message?.error ||
        JSON.stringify(error?.response?.data?.message) ||
        error?.message ||
        appMessage.systemErrorMessage

      isShowAlert &&
        dispatch(
          handleSetAlertConfig({
            message: messageError,
            show: true,
            type: 'error',
            withIcon: true
          })
        )
      return {
        status: false,
        message: 'error'
      }
    } finally {
      isLodiang && dispatch(handleSetIsloading(false))
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
