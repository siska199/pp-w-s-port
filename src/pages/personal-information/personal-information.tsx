import FormPersonlaInformation from '@components/modules/personal-information/form-personal-information';
import ContainerProtectedPage from '@components/ui/container/container-protected-page';

const PersonalInformationPage = () => {
  return (
    <ContainerProtectedPage title="Personal Information">
      <FormPersonlaInformation />
    </ContainerProtectedPage>
  );
};

export default PersonalInformationPage;
