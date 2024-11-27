import FormFilterSKill from '@features/skill/components/skill-list/form-filter-skill'
import FormSkill from '@features/skill/components/skill-list/form-skill'
import HeaderSkill from '@features/skill/components/skill-list/header-skill'
import TableSkill from '@features/skill/components/skill-list/table-skill'
import ContainerProtectedPage from '@components/ui/container/container-protected-page'

const SkillListPage = () => {
  return (
    <>
      <ContainerProtectedPage>
        <HeaderSkill />
        <FormFilterSKill />
        <TableSkill />
      </ContainerProtectedPage>
      <FormSkill />
    </>
  )
}

export default SkillListPage
