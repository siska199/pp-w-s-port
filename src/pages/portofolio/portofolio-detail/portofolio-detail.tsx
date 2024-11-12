import AboutMeSection from '@features/portofolio/components/portofolio-detail/aboutme-section'
import EducationSection from '@features/portofolio/components/portofolio-detail/education-section'
import ExperianceSection from '@features/portofolio/components/portofolio-detail/experiance-section'
import HeroSection from '@features/portofolio/components/portofolio-detail/hero-section'
import ProjectSection from '@features/portofolio/components/portofolio-detail/project-section'
import SkillSection from '@features/portofolio/components/portofolio-detail/skill-section'
import Footer from '@components/footer'
import ContainerLandingPage from '@components/ui/container/container-landing-page'

const PortofolioDetailPage = () => {
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

export default PortofolioDetailPage
