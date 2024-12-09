import SectionEducationDetail from '@features/education/components/education-detail/section-education-detail'
import ContainerProtectedPage from '@components/ui/container/container-protected-page'
import HeaderPage from '@components/ui/header/header-page'

const EducationDetailPage = () => {
  return (
    <ContainerProtectedPage>
      <HeaderPage title='Education Detail' isNested />
      <SectionEducationDetail />
    </ContainerProtectedPage>
  )
}

export default EducationDetailPage
