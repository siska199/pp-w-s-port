import FormProject from '@features/project/components/project-upsert/form-project'
import FormMenuProject from '@features/project/components/project-upsert/menu-project/form-menu-project'
import MenuProjects from '@features/project/components/project-upsert/menu-project/menu-projects'
import ContainerProtectedPage from '@components/ui/container/container-protected-page'
import Divider from '@components/ui/divider'
import HeaderPage from '@components/ui/header/header-page'

const ProjectUpsertPage = () => {
  return (
    <>
      <ContainerProtectedPage className='space-y-8'>
        <HeaderPage title='Form Project' />
        <FormProject />
        <Divider />
        <MenuProjects />
      </ContainerProtectedPage>
      <FormMenuProject />
    </>
  )
}

export default ProjectUpsertPage
