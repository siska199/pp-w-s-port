interface RouteComponent {
  publicNavbar?: boolean;
}

export interface TRoute {
  name: string;
  fullPath: string;
  isPrivate?: boolean;
  isOpenRoute?: boolean;
  component?: RouteComponent;
  child?: {
    [key: string]: TRoute;
  };
}

const route = {
  auth: {
    name: 'auth',
    fullPath: '/auth',
    child: {
      signIn: {
        name: 'sign-in',
        fullPath: '/auth/sign-in',
        isPrivate: false,
      },
      signUp: {
        name: 'sign-up',
        fullPath: '/auth/sign-up',
        isPrivate: false,
      },
    },
  },
  personalInformation: {
    name: 'personal-information',
    fullPath: '/personal-information',
    isPrivate: true,
  },
  skill: {
    name: 'skill',
    fullPath: '/skill',
    isPrivate: true,
  },
  workHistory: {
    name: 'work-history',
    fullPath: '/work-history',
    isPrivate: true,
  },
  education: {
    name: 'education',
    fullPath: '/education',
    isPrivate: true,
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
          publicNavbar: true,
        },
      },
    },
  },
  certification: {
    name: 'certification',
    fullPath: '/certification',
    isPrivate: true,
  },
  portofolio: {
    name: 'portofolio',
    fullPath: '/portofolio',
    isPrivate: false,
    isOpenRoute: true,
    component: {
      publicNavbar: true,
    },
  },
} as const;

export type TRoutes = {
  [K in keyof typeof route]: TRoute;
};

export const routes: TRoutes = route;
