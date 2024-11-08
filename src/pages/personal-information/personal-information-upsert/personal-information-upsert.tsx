import SocialLinks from '@components/modules/personal-information/personal-information-upsert/associate-link/social-links'
import FormPersonlaInformation from '@components/modules/personal-information/personal-information-upsert/form-personal-information'
import ContainerProtectedPage from '@components/ui/container/container-protected-page'
import Divider from '@components/ui/divider'
import HeaderPage from '@components/ui/header/header-page'

const PersonalInformationUpsertPage = () => {
  return (
    <ContainerProtectedPage className='mb-8 space-y-8'>
      <HeaderPage title='Personal Information' />
      <FormPersonlaInformation />
      <Divider />
      <SocialLinks />
    </ContainerProtectedPage>
  )
}

export default PersonalInformationUpsertPage
