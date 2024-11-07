import FormFilterSKill from '@components/modules/skill/skill-list/form-filter-skill'
import FormSkill from '@components/modules/skill/skill-list/form-skill'
import HeaderSkill from '@components/modules/skill/skill-list/header-skill'
import TableSkill from '@components/modules/skill/skill-list/table-skill'
import ContainerProtectedPage from '@components/ui/container/container-protected-page'

const SkillPage = () => {
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

export default SkillPage
