import { globalErrorMessage } from '@lib/data/error-message'
import { baseURLAPI } from '@lib/data/global'
import { isEmptyValue } from '@lib/helper'
import { handleSetAlertConfig, handleSetIsloading } from '@store/features/ui/uiSlice'
import axios, { CancelTokenSource } from 'axios'
import { useRef, useState } from 'react'

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
}

const useAPI = () => {
  const [progress, setProgress] = useState(0)
  const cancelTokenRef = useRef<CancelTokenSource | null>(null)

  const apiClient = async (params: TParamsApiClient): Promise<{ data: TObject | null; sucess: boolean; message: string }> => {
    handleSetIsloading(true)
    const { baseUrl, method = 'get', bareerToken, endpoint, isForm = false, payload, message } = params
    try {
      cancelTokenRef.current = axios.CancelToken.source()
      const response = await axios({
        baseURL: baseUrl || baseURLAPI,
        url: endpoint,
        method: !isEmptyValue(payload) ? 'post' : method,
        headers: {
          Authorization: bareerToken ? `Bearer ${bareerToken}` : null,
          'Content-Type': isForm ? 'multipart/form-data' : 'application/json'
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
      // console.log("error message: ", error?.message)
      // console.log("error messag api: ", error?.response)

      handleSetAlertConfig({
        show: true,
        message: message?.error || globalErrorMessage,
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
