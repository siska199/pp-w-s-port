import React from 'react'

export const SignInPage = React.lazy(() => import('@pages/auth/sign-in'))
export const PersonalInformation = React.lazy(
  () => import('@pages/personal-information/personal-information')
)
