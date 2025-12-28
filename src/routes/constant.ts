interface RouteComponent {
    publicNavbar?: boolean;
}

export interface TRoute {
    name: string;
    fullPath: string | ((id: string) => void);
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
    },
    personalInformation: {
        name: 'personal-information',
        fullPath: '/personal-information',
        isPrivate: true,
    },
    education: {
        name: 'education',
        fullPath: '/education',
        isPrivate: true,
        child: {
            detail: {
                name: 'detail/:id',
                fullPath: (id: string) => `/education/detail/${id}`,
                isPrivate: true,
            },
        },
    },
    skillUser: {
        name: 'skill-user',
        fullPath: '/skill-user',
        isPrivate: true,
        child: {
            detail: {
                name: 'detail/:id',
                fullPath: (id: string) => `/skill-user/detail/${id}`,
                isPrivate: true,
            },
        },
    },
    experiance: {
        name: 'experiance',
        fullPath: '/experiance',
        isPrivate: true,
        child: {
            detail: {
                name: 'detail',
                fullPath: (id: string) => `/experiance/detail/${id}`,
                isPrivate: true,
            },
        },
    },
    project: {
        name: 'project',
        fullPath: '/project',
        isPrivate: true,
        child: {
            detail: {
                name: 'project-detail',
                fullPath: (id: string) => `/project/${id}`,
                isPrivate: true,
                isOpenRoute: true,
                component: {
                    publicNavbar: true,
                },
            },
            upsert: {
                name: 'upsert',
                fullPath: (id?: string) => {
                    const params = new URLSearchParams(id ? { id } : {});
                    return `/project/upsert${params.toString() ? `?${params}` : ''}`;
                },
                isPrivate: true,
            },
        },
    },
    certification: {
        name: 'certification',
        fullPath: '/certification',
        isPrivate: true,
    },
    generateResume: {
        name: 'generate-resume',
        fullPath: '/generate-resume',
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

export const routes = route;
