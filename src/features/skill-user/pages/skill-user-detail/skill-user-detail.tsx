import SectionSkillUserDetail from '@features/skill-user/components/skill-user-detail/section-skill-user-detail';
import ContainerProtectedPage from '@components/ui/container/container-protected-page';
import HeaderPage from '@components/ui/header/header-page';

const SkillUserDetailPage = () => {
    return (
        <ContainerProtectedPage>
            <HeaderPage title="Detail Skill" isNested />
            <SectionSkillUserDetail />
        </ContainerProtectedPage>
    );
};

export default SkillUserDetailPage;
