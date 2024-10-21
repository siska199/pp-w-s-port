import SocialLinks from '@components/modules/personal-information/associate-link/social-links';
import FormPersonlaInformation from '@components/modules/personal-information/form-personal-information';
import ContainerProtectedPage from '@components/ui/container/container-protected-page';
import Divider from '@components/ui/divider';

const PersonalInformationPage = () => {
  return (
    <ContainerProtectedPage title="Personal Information" className="mb-8 ">
      <FormPersonlaInformation />
      <Divider />
      <SocialLinks />
    </ContainerProtectedPage>
  );
};

export default PersonalInformationPage;
