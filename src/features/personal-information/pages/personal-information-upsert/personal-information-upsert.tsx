import FormPersonalInfo from '@features/personal-information/components/form-personal-info'
import ContextFormPersonalInfo from '@features/personal-information/context/context-form-personal-info'
import ContainerProtectedPage from '@components/ui/container/container-protected-page'
import HeaderPage from '@components/ui/header/header-page'

const PersonalInformationUpsertPage = () => {
  return (
    <ContextFormPersonalInfo>
      <ContainerProtectedPage className='mb-8 space-y-8'>
        <HeaderPage title='Personal Information' />
        <FormPersonalInfo />
      </ContainerProtectedPage>
    </ContextFormPersonalInfo>
  )
}

export default PersonalInformationUpsertPage
