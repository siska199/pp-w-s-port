import AboutMeSection from '@components/modules/portofolio/section/aboutme-section';
import EducationSection from '@components/modules/portofolio/section/education-section';
import ExperianceSection from '@components/modules/portofolio/section/experiance-section';
import HeroSection from '@components/modules/portofolio/section/hero-section';
import ProjectSection from '@components/modules/portofolio/section/project-section';
import SkillSection from '@components/modules/portofolio/section/skill-section';
import ContainerLandingPage from '@components/ui/container/container-landing-page';

const Portofolio = () => {
  return (
    <ContainerLandingPage id="container-page-portofolio">
      <HeroSection />
      <AboutMeSection />
      <SkillSection />
      <ProjectSection />
      <ExperianceSection />
      <EducationSection />
    </ContainerLandingPage>
  );
};

export default Portofolio;
