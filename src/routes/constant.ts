interface RouteComponent {
  publicNavbar?: boolean
}

export interface TRoute {
  name: string
  fullPath: string | ((id: string) => void)
  isPrivate?: boolean
  isOpenRoute?: boolean
  component?: RouteComponent
  child?: {
    [key: string]: TRoute
  }
}

const route = {
  auth: {
    name: 'auth',
    fullPath: '/auth'
  },
  personalInformation: {
    name: 'personal-information',
    fullPath: '/personal-information',
    isPrivate: true
  },
  skill: {
    name: 'skill',
    fullPath: '/skill',
    isPrivate: true,
    child: {
      detail: {
        name: 'detail/:id',
        fullPath: (id: string) => `/skill/detail/${id}`,
        isPrivate: true
      }
    }
  },
  experiance: {
    name: 'experiance',
    fullPath: '/experiance',
    isPrivate: true,
    child: {
      detail: {
        name: 'detail',
        fullPath: (id: string) => `/experiance/detail/${id}`,
        isPrivate: true
      }
    }
  },
  education: {
    name: 'education',
    fullPath: '/education',
    isPrivate: true,
    child: {
      detail: {
        name: 'detail',
        fullPath: (id: string) => `/education/detail/${id}`,
        isPrivate: true
      }
    }
  },
  project: {
    name: 'project',
    fullPath: '/project',
    isPrivate: true,
    child: {
      detail: {
        name: 'project-detail',
        fullPath: '/project/:id',
        isPrivate: true,
        isOpenRoute: true,
        component: {
          publicNavbar: true
        }
      },
      form: {
        name: 'form',
        fullPath: '/project/form',
        isPrivate: true
      }
    }
  },
  certification: {
    name: 'certification',
    fullPath: '/certification',
    isPrivate: true
  },
  generateResume: {
    name: 'generate-resume',
    fullPath: '/generate-resume',
    isPrivate: true
  },
  portofolio: {
    name: 'portofolio',
    fullPath: '/portofolio',
    isPrivate: false,
    isOpenRoute: true,
    component: {
      publicNavbar: true
    }
  }
} as const

export type TRoutes = {
  [K in keyof typeof route]: TRoute
}

export const routes = route
