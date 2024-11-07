import FormEducation from '@components/modules/education/education-list/form-education'
import FormFilterEducation from '@components/modules/education/education-list/form-filter-education'
import HeaderEducation from '@components/modules/education/education-list/header-education'
import TableEducation from '@components/modules/education/education-list/table-education'
import ContainerProtectedPage from '@components/ui/container/container-protected-page'

const Education = () => {
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

export default Education
