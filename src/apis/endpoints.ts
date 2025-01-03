const ENDPOINTS = {
  GENERAL: {
    GET_LIST_PROVINCE: '/provinces',
    GET_LIST_CITY: '/cities',
    GET_LIST_DISTRICT: '/districts',
    GET_LIST_POSTAL_CODE: '/postal-codes',
    GET_LIST_SKILL: '/skills',
    GET_LIST_PROFESSION: '/professions',
    GET_LIST_CATEGORY_SOCIAL_LINK: '/category-social-links',
    GET_LIST_EDUCATION_LEVEL: '/education-levels',
    GET_LIST_EDUCATION_MAJOR: '/education-majors',
    GET_LIST_EDUCATION_SCHOOL: '/education-schools'
  },
  AUTH: {
    SIGN_UP: '/sign-up',
    SIGN_IN: '/sign-in'
  },
  SOCIAL_LINK: {
    GET_LIST_SOCIAL_LINK: '/social-links',
    UPSERT_BULK_SOCIAL_LINKS: '/social-links'
  },
  PERSONAL_INFORMATION: {
    GET_DETAIL_PERSONAL_INFORMATION: '/personal-information',
    UPSERT_PERSONAL_INFORMATION: '/personal-information'
  },
  EDUCATION: {
    GET_LIST_EDUCATION: '/educations',
    GET_DETAIL_EDUCATION: (id: string) => `/education/${id}`,
    UPSERT_EDUCATION: '/education',
    DELETE_EDUCATION: (id: string) => `/education/${id}`
  },
  SKILL_USER: {
    GET_LIST_SKILL_USER: '/skill-users'
  },
  EXPERIANCE: {
    GET_LIST_EXPERIANCE: '/experiances',
    UPSERT_EXPERIANCE: '/experiance',
    GET_DETAIL_EXPERIANCE: (id: string) => `/GET_DETAIL_EXPERIANCE/${id}`
  }
}

export default ENDPOINTS
