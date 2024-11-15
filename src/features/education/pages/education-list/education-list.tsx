import React from 'react'

import FormFilterEducation from '@features/education/components/education-list/form-filter-education'
import HeaderEducation from '@features/education/components/education-list/header-education'
import TableEducation from '@features/education/components/education-list/table-education'
import ContainerProtectedPage from '@components/ui/container/container-protected-page'
import LazyLoad from '@components/ui/lazy-load'

const FormEducation = React.lazy(
  () => import('@features/education/components/education-list/form-education')
)

const EducationListPage = () => {
  return (
    <>
      <ContainerProtectedPage>
        <HeaderEducation />
        <FormFilterEducation />
        <TableEducation />
      </ContainerProtectedPage>
      <LazyLoad fallback={'Loading...'}>
        <FormEducation />
      </LazyLoad>
    </>
  )
}

export default EducationListPage
