import IntroductionSection from '@components/modules/project/project-detail/introduction-section'
import MenuSection from '@components/modules/project/project-detail/menu-section'
import ResponsibilitySection from '@components/modules/project/project-detail/responsibility-section'
import TechStackSection from '@components/modules/project/project-detail/tech-stack-section'
import ContainerLandingPage from '@components/ui/container/container-landing-page'

const ProjectDetailPage = () => {
  return (
    <>
      <ContainerLandingPage className='p-8 flex flex-col items-center'>
        <IntroductionSection />
        <TechStackSection />
        <MenuSection />
        <ResponsibilitySection />
      </ContainerLandingPage>
    </>
  )
}

export default ProjectDetailPage
