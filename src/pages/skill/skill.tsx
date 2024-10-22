import MainSkill from '@components/modules/skill/main-skill';
import ContainerProtectedPage from '@components/ui/container/container-protected-page';
import { SkillContextProvider } from '@context/modules/skill/skill-context';

const Skill = () => {
  return (
    <ContainerProtectedPage>
      <SkillContextProvider>
        <MainSkill />
      </SkillContextProvider>
    </ContainerProtectedPage>
  );
};

export default Skill;
