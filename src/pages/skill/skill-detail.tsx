import ContainerProtectedPage from '@components/ui/container/container-protected-page'
import HeaderPage from '@components/ui/header-page'

const SkillDetailPage = () => {
  return (
    <ContainerProtectedPage>
      <HeaderPage title='Detail Skill' isNested />
    </ContainerProtectedPage>
  )
}

export default SkillDetailPage
