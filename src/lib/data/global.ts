export const secretkey = import.meta.env.VITE_SECRET_KEY
export const baseURLAPI = import.meta.env.VITE_BASE_URL_API

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
    name : 'personal-information',
    fullPath: '/personal-information'
  },
  skill : {
    name : 'skill',
    fullPath : '/skill'
  },
  workHistory : {
    name : 'work-history',
    fullPath : '/work-history'
  },
  education : {
    name : 'education',
    fullPath : '/education'
  },
  project : {
    name : 'project',
    fullPath : '/project'
  },
  certification : {
    name : 'certification',
    fullPath : '/certification'
  },
  portofolio : {
    name : 'portofolio',
    fullpath : '/portofolio'
  }
}

