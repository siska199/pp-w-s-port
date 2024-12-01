import ENDPOINTS from '@apis/endpoints'

import useAPI from '@hooks/use-api'
import { TUser } from '@typescript/general-module-types'

const useAuthAPI = () => {
  const { apiClient } = useAPI()

  const signIn = async (params: Pick<TUser, 'email' | 'password'>) => {
    const payload = params
    const result = await apiClient({
      endpoint: ENDPOINTS.AUTH.SIGN_IN,
      payload,
      method: 'post'
    })

    return result
  }

  const signUp = async (params: Omit<TUser, 'id' | 'image' | 'profession'>) => {
    const payload = params
    const result = await apiClient({
      endpoint: ENDPOINTS.AUTH.SIGN_UP,
      payload,
      method: 'post'
    })
    return result
  }

  return {
    signIn,
    signUp
  }
}

export default useAuthAPI
