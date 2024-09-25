import AboutMeSection from "@components/modules/portofolio/aboutme-section";
import HeroSection from "@components/modules/portofolio/hero-section";
import ProjectSection from "@components/modules/portofolio/project-section";


const Portofolio = () => {

  return <div className=" h-full overflow-y-auto space-y-16 ">
    <HeroSection/>
    <AboutMeSection/>
    <ProjectSection/>

  </div>;
};

export default Portofolio;
