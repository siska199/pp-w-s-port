const ENDPOINTS = {
  MASTER: {
    GET_LIST_PROVINCE: '/provinces',
    GET_LIST_CITY: '/cities',
    GET_LIST_DISTRICTS: '/districts',
    GET_LIST_POSTAL_CODE: '/postal-codes',
    GET_LIST_SKILL: '/skills'
  },
  AUTH: {
    SIGN_UP: '/signup',
    SIGN_IN: '/sign-in'
  },
  PERSONAL_INFORMATION: {
    GET_DETAIL_PERSONAL_INFORMATION: (id: string) => `/personal-information/${id}`,
    UPSERT_PERSONAL_INFORMATIOn: '/personal-information'
  },
  EDUCATION: {
    GET_LIST_EDUCATION: '/educations',
    GET_DETAIL_EDUCATION: (id: string) => `/education/${id}`
  },
  SKILL_USER: {},
  EXPERIANCE: {
    GET_LIST_EXPERIANCE: '/experiances',
    UPSERT_EXPERIANCE: '/experiance',
    GET_DETAIL_EXPERIANCE: (id: string) => `/GET_DETAIL_EXPERIANCE/${id}`
  }
}

export default ENDPOINTS
