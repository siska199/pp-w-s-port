import FormEducation from '@features/education/components/education-list/form-education'
import FormFilterEducation from '@features/education/components/education-list/form-filter-education'
import HeaderEducation from '@features/education/components/education-list/header-education'
import TableEducation from '@features/education/components/education-list/table-education'
import ContainerProtectedPage from '@components/ui/container/container-protected-page'

const EducationListPage = () => {
  return (
    <>
      <ContainerProtectedPage>
        <HeaderEducation />
        <FormFilterEducation />
        <TableEducation />
      </ContainerProtectedPage>
      <FormEducation />
    </>
  )
}

export default EducationListPage
