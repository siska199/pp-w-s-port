import ContainerProtectedPage from '@components/ui/container/container-protected-page'
import Divider from '@components/ui/divider'
import HeaderPage from '@components/ui/header/header-page'

const ProjectUpsertPage = () => {
  return (
    <ContainerProtectedPage className='space-y-8'>
      <HeaderPage title='Form Project' />
      <Divider />
    </ContainerProtectedPage>
  )
}

export default ProjectUpsertPage
