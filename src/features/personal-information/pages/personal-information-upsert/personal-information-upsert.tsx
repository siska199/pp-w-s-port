import FormPersonlaInformation from '@features/personal-information/components/form-personal-information'
import ContainerProtectedPage from '@components/ui/container/container-protected-page'
import HeaderPage from '@components/ui/header/header-page'

const PersonalInformationUpsertPage = () => {
  return (
    <ContainerProtectedPage className='mb-8 space-y-8'>
      <HeaderPage title='Personal Information' />
      <FormPersonlaInformation />
    </ContainerProtectedPage>
  )
}

export default PersonalInformationUpsertPage
