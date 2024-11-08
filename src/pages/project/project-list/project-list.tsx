import FormFilterProject from '@components/modules/project/project-list/form-filter-project'
import HeaderProject from '@components/modules/project/project-list/header-project'
import TableProject from '@components/modules/project/project-list/table-project'
import ContainerProtectedPage from '@components/ui/container/container-protected-page'

const ProjectListPage = () => {
  return (
    <ContainerProtectedPage className='space-y-8'>
      <HeaderProject />
      <FormFilterProject />
      <TableProject />
    </ContainerProtectedPage>
  )
}

export default ProjectListPage
