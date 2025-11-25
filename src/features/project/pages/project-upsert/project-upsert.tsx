import FormProject from '@features/project/components/project-upsert/form-information-project'
import FormResponsiblityProject from '@features/project/components/project-upsert/responsibility-project/form-responsibility-project'
import ContainerProtectedPage from '@components/ui/container/container-protected-page'
import HeaderPage from '@components/ui/header/header-page'
import FormProjectMenu from '@features/project/components/project-upsert/project-menu/form-project-menu'
import ContextFormProjectProvider from '@features/project/context/form-project-context'

const ProjectUpsertPage = () => {
  return (
    <ContextFormProjectProvider>
      <ContainerProtectedPage className=' mb-0'>
        <HeaderPage title='Form Project' isNested />
        <FormProject />
      </ContainerProtectedPage>
      <FormProjectMenu />
      <FormResponsiblityProject />
    </ContextFormProjectProvider>
  )
}

export default ProjectUpsertPage
