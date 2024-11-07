import Footer from '@components/footer'
import AboutMeSection from '@components/modules/portofolio/portofolio-detail/aboutme-section'
import EducationSection from '@components/modules/portofolio/portofolio-detail/education-section'
import ExperianceSection from '@components/modules/portofolio/portofolio-detail/experiance-section'
import HeroSection from '@components/modules/portofolio/portofolio-detail/hero-section'
import ProjectSection from '@components/modules/portofolio/portofolio-detail/project-section'
import SkillSection from '@components/modules/portofolio/portofolio-detail/skill-section'
import ContainerLandingPage from '@components/ui/container/container-landing-page'

const Portofolio = () => {
  return (
    <ContainerLandingPage id='container-page-portofolio'>
      <HeroSection />
      <AboutMeSection />
      <SkillSection />
      <ProjectSection />
      <ExperianceSection />
      <EducationSection />
      <Footer />
    </ContainerLandingPage>
  )
}

export default Portofolio
