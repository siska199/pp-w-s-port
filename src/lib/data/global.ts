export const secretkey = import.meta.env.VITE_SECRET_KEY
export const baseURLEndpoint = import.meta.env.BASE_URL

export const endpoint = {}

export const route = {
  auth: {
    name: 'auth',
    fullPath: '/auth',
    child: {
      signIn: {
        name: 'sign-in',
        fullPath: '/auth/sign-in'
      },
      signUp: {
        name: 'sign-up',
        fullPath: '/auth/sign-up'
      }
    }
  },
  personalInformation: {
    fullPath: '/personal-information'
  }
}
