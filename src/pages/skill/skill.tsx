import FormFilterSKill from '@components/modules/skill/form-filter-skill';
import FormSkill from '@components/modules/skill/form-skill';
import HeaderSkill from '@components/modules/skill/header-skill';
import TableSkill from '@components/modules/skill/table-skill';
import ContainerProtectedPage from '@components/ui/container/container-protected-page';
import { SkillContextProvider } from '@context/modules/skill/skill-context';

const Skill = () => {
  return (
    <SkillContextProvider>
      <ContainerProtectedPage className="space-y-8">
        <HeaderSkill />
        <FormFilterSKill />
        <TableSkill />
      </ContainerProtectedPage>
      <FormSkill />
    </SkillContextProvider>
  );
};

export default Skill;
