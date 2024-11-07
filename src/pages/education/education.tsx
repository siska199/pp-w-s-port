import FormEducation from '@components/modules/education/form-education'
import FormFilterEducation from '@components/modules/education/form-filter-education'
import HeaderEducation from '@components/modules/education/header-education'
import TableEducation from '@components/modules/education/table-education'
import ContainerProtectedPage from '@components/ui/container/container-protected-page'


const Education = () => {
  return (
      <>
        <ContainerProtectedPage>
          <HeaderEducation />
          <FormFilterEducation/>
          <TableEducation/>
        </ContainerProtectedPage>
        <FormEducation />
      </>
  )
}

export default Education
