import FormFilterExperiance from '@features/experiance/components/experiance-list/form-filter-experiance'
import HeaderExperiance from '@features/experiance/components/experiance-list/header-experiance'
import TableExperiance from '@features/experiance/components/experiance-list/table-experiance'
import ContainerProtectedPage from '@components/ui/container/container-protected-page'

const ExperianceListPage = () => {
  return (
    <ContainerProtectedPage>
      <HeaderExperiance />
      <FormFilterExperiance />
      <TableExperiance />
    </ContainerProtectedPage>
  )
}

export default ExperianceListPage
