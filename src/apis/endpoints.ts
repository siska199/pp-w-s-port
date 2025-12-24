const ENDPOINTS = {
    MASTER: {
        GET_LIST_MASTER_PROVINCE: '/provinces',
        GET_LIST_MASTER_CITY: '/cities',
        GET_LIST_MASTER_DISTRICT: '/districts',
        GET_LIST_MASTER_POSTAL_CODE: '/postal-codes',
        GET_LIST_MASTER_SKILL: '/skills',
        GET_LIST_MASTER_PROFESSION: '/professions',
        GET_LIST_MASTER_CATEGORY_SOCIAL_LINK: '/category-social-links',
        GET_LIST_MASTER_EDUCATION_LEVEL: '/education-levels',
        GET_LIST_MASTER_EDUCATION_MAJOR: '/education-majors',
        GET_LIST_MASTER_EDUCATION_SCHOOL: '/education-schools',
        GET_LIST_MASTER_CATEGORY_SKILL: '/category-skills',
        GET_LIST_MASTER_COMPANY: '/companies',
    },
    AUTH: {
        SIGN_UP: '/sign-up',
        SIGN_IN: '/sign-in',
    },
    SOCIAL_LINK: {
        GET_LIST_SOCIAL_LINK: '/social-links',
        UPSERT_BULK_SOCIAL_LINKS: '/social-links',
    },
    KEY_METRIC: {
        GET_LIST_KEY_METRIC: '/key-metrics',
        UPSERT_BULK_KEY_METRICS: '/key-metric',
    },
    PERSONAL_INFORMATION: {
        GET_DETAIL_PERSONAL_INFORMATION: '/personal-information',
        UPSERT_PERSONAL_INFORMATION: '/personal-information',
    },
    EDUCATION: {
        GET_LIST_EDUCATION: '/educations',
        GET_DETAIL_EDUCATION: (id: string) => `/education/${id}`,
        UPSERT_EDUCATION: '/education',
        DELETE_EDUCATION: (id: string) => `/education/${id}`,
    },
    SKILL_USER: {
        GET_LIST_SKILL_USER: '/skill-users',
        GET_DETAIL_SKILL_USER: (id: string) => `/skill-users/${id}`,
        UPSERT_SKILL_USER: '/skill-user',
        DELETE_SKILL_USER: (id: string) => `/skill-user/${id}`,
    },
    PROJECT: {
        GET_LIST_PROJECT: '/projects',
        UPSERT_PROJECT: '/project',
        GET_DETAIL_PROJECT: (id: string) => `/project/${id}`,
        DELETE_PROJECT: (id: string) => `/project/${id}`,
    },
    PROJECT_MENU: {
        GET_LIST_PROJECT_MENU: '/project-menus',
        UPSERT_PROJECT_MENU: '/project-menu',
        GET_DETAIL_PROJECT_MENU: (id: string) => `/project-menu/${id}`,
        DELETE_PROJECT_MENU: (id: string) => `/project-menu/${id}`,
    },
    EXPERIANCE: {
        GET_LIST_EXPERIANCE: '/experiances',
        UPSERT_EXPERIANCE: '/experiance',
        GET_DETAIL_EXPERIANCE: (id: string) => `/experiance/${id}`,
        DELETE_EXPERIANCE: (id: string) => `/experiance/${id}`,
    },
};

export default ENDPOINTS;
