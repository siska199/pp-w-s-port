import ContainerProtectedPage from '@components/ui/container/container-protected-page';
import HeaderPage from '@components/ui/header/header-page';

const SkillUserDetailPage = () => {
    return (
        <ContainerProtectedPage>
            <HeaderPage title="Detail Skill" isNested />
        </ContainerProtectedPage>
    );
};

export default SkillUserDetailPage;
