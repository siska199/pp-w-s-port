import FormFilterSKill from '@components/modules/skill/form-filter-skill'
import FormSkill from '@components/modules/skill/form-skill'
import HeaderSkill from '@components/modules/skill/header-skill'
import TableSkill from '@components/modules/skill/table-skill'
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
