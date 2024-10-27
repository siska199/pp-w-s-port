const ENDPOINT = {
  GENERAL: {
    GET_LIST_PROVINCE: '/provinces',
    GET_LIST_CITY: '/cities',
    GET_LIST_DISTRICTS: '/districts',
    GET_LIST_POSTAL_CODE: '/postal-codes'
  },
  PERSONAL_INFORMATION: {
    GET_DETAIL_PERSONAL_INFORMATION: (id: string) => `/personal-information/${id}`
  },
  SKILL: {
    GET_LIST_SKILL: '/skills'
  },
  EXPERIANCE: {
    GET_LIST_EXPERIANCE: '/experiances',
    GET_DETAIL_EXPERIANCE: (id: string) => `/experiance/${id}`,
    ADD_EXPERIANCE: '/experiance',
    EDIT_EXPERIANCE: (id: string) => `/experiance/${id}`,
    DELETE_EXPERIANCE: (id: string) => `/experiance/${id}`
  }
}

export default ENDPOINT
