import AboutMeSection from '@components/modules/portofolio/section/aboutme-section';
import ExperianceSection from '@components/modules/portofolio/section/experiance-section';
import HeroSection from '@components/modules/portofolio/section/hero-section';
import ProjectSection from '@components/modules/portofolio/section/project-section';
import SkillSection from '@components/modules/portofolio/section/skill-section';

const Portofolio = () => {
  return (
    <div className=" h-full overflow-y-auto space-y-16 text-white">
      <HeroSection />
      <AboutMeSection />
      <SkillSection />
      <ProjectSection />
      <ExperianceSection />
    </div>
  );
};

export default Portofolio;
