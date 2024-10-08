import IntroductionSection from '@components/modules/project-detail/introduction-section';
import MenuSection from '@components/modules/project-detail/menu-section';
import TechStackSection from '@components/modules/project-detail/tech-stack-section';
import ContainerLandingPage from '@components/ui/container/container-landing-page';
import ResponsibilitySection from '@components/ui/container/responsibility-section';

const ProjectDetailPage = () => {
  return (
    <ContainerLandingPage>
      <IntroductionSection />
      <TechStackSection />
      <MenuSection />
      <ResponsibilitySection />
    </ContainerLandingPage>
  );
};

export default ProjectDetailPage;
