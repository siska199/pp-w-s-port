import FormFilterSKill from '@components/modules/skill/form-filter-skill';
import TableSkill from '@components/modules/skill/table-skill';
import ContainerProtectedPage from '@components/ui/container/container-protected-page';

const Skill = () => {
  const handleAddSkill = () => {};
  return (
    <ContainerProtectedPage title="Skill" onClickAddData={handleAddSkill}>
      <FormFilterSKill />
      <TableSkill />
    </ContainerProtectedPage>
  );
};

export default Skill;
