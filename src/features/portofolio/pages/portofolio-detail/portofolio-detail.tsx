import AboutMeSection from '@features/portofolio/components/portofolio-detail/aboutme-section';
import EducationSection from '@features/portofolio/components/portofolio-detail/education-section';
import ExperianceSection from '@features/portofolio/components/portofolio-detail/experiance-section';
import HeroSection from '@features/portofolio/components/portofolio-detail/hero-section';
import ProjectSection from '@features/portofolio/components/portofolio-detail/project-section';
import SkillSection from '@features/portofolio/components/portofolio-detail/skill-section';
import ContextPortfolioProvider from '@features/portofolio/context/context-portofolio';
import Footer from '@components/footer';
import ContainerLandingPage from '@components/ui/container/container-landing-page';

const PortofolioDetailPage = () => {
    return (
        <ContextPortfolioProvider>
            <ContainerLandingPage id="container-page-portofolio">
                <HeroSection />
                <AboutMeSection />
                <SkillSection />
                <ProjectSection />
                <ExperianceSection />
                <EducationSection />
                <Footer />
            </ContainerLandingPage>
        </ContextPortfolioProvider>
    );
};

export default PortofolioDetailPage;
