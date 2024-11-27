import ENDPOINTS from '@apis/endpoints'

import useAPI from '@hooks/use-api'

const useAuthAPI = () => {
  const { apiClient } = useAPI()

  interface TParamsSignIn {
    email: string
    password: string
  }
  const signIn = async (params: TParamsSignIn) => {
    const payload = params
    const result = await apiClient({
      endpoint: ENDPOINTS.AUTH.SIGN_IN,
      payload,
      method: 'post'
    })

    return result
  }

  interface TParamsSignUp {
    first_name: string
    last_name: string
    email: string
    username: string
    password: string
    id_profession: string
  }
  const signUp = async (params: TParamsSignUp) => {
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
