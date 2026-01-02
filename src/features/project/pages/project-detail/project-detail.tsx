import IntroductionSection from '@features/project/components/project-detail/introduction-section';
import ResponsibilitySection from '@features/project/components/project-detail/responsibility-section';
import TechStackSection from '@features/project/components/project-detail/tech-stack-section';
import ContextProjectProvider from '@features/project/context/context-project';
import ContainerLandingPage from '@components/ui/container/container-landing-page';

const ProjectDetailPage = () => {
    return (
        <ContextProjectProvider>
            <ContainerLandingPage className="p-4 flex flex-col items-center">
                <>
                    <IntroductionSection />
                    <TechStackSection />
                    {/* <MenuSection /> */}
                    <ResponsibilitySection />
                </>
            </ContainerLandingPage>
        </ContextProjectProvider>
    );
};

export default ProjectDetailPage;
