import ContainerProtectedPage from '@components/ui/container/container-protected-page';
import HeaderPage from '@components/ui/header-page';

const ProjectPage = () => {
  return (
    <ContainerProtectedPage className="mb-8 space-y-8">
      <HeaderPage title="Project" />
    </ContainerProtectedPage>
  );
};

export default ProjectPage;
