import authRouter from '@routes/public/authRouter'
import { RouteObject } from 'react-router-dom'
import playgroundRouter from './playgroundRouter'
import portofolioRouter from '@routes/public/portofolioRouter'
import React from 'react'
import GlobalLayout from '@components/layouts/GlobalLayout'
import PublicLayout from '@components/layouts/PublicLayout'
import Loading from '@components/loading'

const publicRoutes: RouteObject[] = [
    {
        path : '',
        element: (
            <React.Suspense fallback={<Loading />}>
              <GlobalLayout>
                <PublicLayout />
              </GlobalLayout>
            </React.Suspense>
          ),
        children : [
            ...authRouter, ...playgroundRouter, ...portofolioRouter
        ]
    }
]

export default publicRoutes
