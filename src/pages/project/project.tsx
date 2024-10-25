import HeaderProject from '@components/modules/project/header-project'
import ContainerProtectedPage from '@components/ui/container/container-protected-page'

const ProjectPage = () => {
  return (
    <ContainerProtectedPage className='space-y-8'>
      <HeaderProject />
    </ContainerProtectedPage>
  )
}

export default ProjectPage
