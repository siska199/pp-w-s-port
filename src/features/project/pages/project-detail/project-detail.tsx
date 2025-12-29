import ContainerLandingPage from '@components/ui/container/container-landing-page';
import IntroductionSection from '@features/project/components/project-detail/introduction-section';
import MenuSection from '@features/project/components/project-detail/menu-section/menu-section';
import ResponsibilitySection from '@features/project/components/project-detail/responsibility-section';
import TechStackSection from '@features/project/components/project-detail/tech-stack-section';

const ProjectDetailPage = () => {
    return (
        <>
            <ContainerLandingPage className="p-8 flex flex-col items-center">
                <IntroductionSection />
                <TechStackSection />
                <MenuSection />
                <ResponsibilitySection />
            </ContainerLandingPage>
        </>
    );
};

export default ProjectDetailPage;
