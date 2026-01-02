import ContainerLandingPage from '@components/ui/container/container-landing-page';
import IntroductionSection from '@features/project/components/project-detail/introduction-section';
import MenuSection from '@features/project/components/project-detail/menu-section/menu-section';
import ResponsibilitySection from '@features/project/components/project-detail/responsibility-section';
import TechStackSection from '@features/project/components/project-detail/tech-stack-section';
import ContextProjectProvider from '@features/project/context/context-project';

const ProjectDetailPage = () => {
    return (
        <ContextProjectProvider>
            <ContainerLandingPage className="p-8 flex flex-col items-center">
                <>
                    <IntroductionSection />
                    <TechStackSection />
                    <MenuSection />
                    <ResponsibilitySection />
                </>
            </ContainerLandingPage>
        </ContextProjectProvider>
    );
};

export default ProjectDetailPage;
