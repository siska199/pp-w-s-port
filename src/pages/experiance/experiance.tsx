import FormFilterExperiance from '@components/modules/experiance/experiance-list/form-filter-experiance'
import HeaderExperiance from '@components/modules/experiance/experiance-list/header-experiance'
import TableExperiance from '@components/modules/experiance/experiance-list/table-experiance'
import ContainerProtectedPage from '@components/ui/container/container-protected-page'

const ExperiancePage = () => {
  return (
    <ContainerProtectedPage>
      <HeaderExperiance />
      <FormFilterExperiance />
      <TableExperiance />
    </ContainerProtectedPage>
  )
}

export default ExperiancePage
