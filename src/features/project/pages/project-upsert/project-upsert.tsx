import FormProject from '@features/project/components/project-upsert/form-information-project'
import FormMenuProject from '@features/project/components/project-upsert/menu-project/form-menu-project'
import FormResponsiblityProject from '@features/project/components/project-upsert/responsibility-project/form-responsibility-project'
import ContainerProtectedPage from '@components/ui/container/container-protected-page'
import HeaderPage from '@components/ui/header/header-page'

const ProjectUpsertPage = () => {
  return (
    <>
      <ContainerProtectedPage className=' mb-0'>
        <HeaderPage title='Form Project' isNested />
        <FormProject />
      </ContainerProtectedPage>
      <FormMenuProject />
      <FormResponsiblityProject />
    </>
  )
}

export default ProjectUpsertPage
