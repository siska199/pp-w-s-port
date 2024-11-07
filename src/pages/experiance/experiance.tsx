import FormFilterExperiance from '@components/modules/experiance/form-filter-experiance'
import HeaderExperiance from '@components/modules/experiance/header-experiance'
import TableExperiance from '@components/modules/experiance/table-experiance'
import ContainerProtectedPage from '@components/ui/container/container-protected-page'

const ExperiancePage = () => {
  return (
    <ContainerProtectedPage>
      <HeaderExperiance />
      <FormFilterExperiance/>
      <TableExperiance/>
    </ContainerProtectedPage>
  )
}

export default ExperiancePage
