import FormFilterSkillUser from '@features/skill-user/components/skill-user-list/form-filter-skill-user'
import FormSkillUser from '@features/skill-user/components/skill-user-list/form-skill-user'
import HeaderSkillUser from '@features/skill-user/components/skill-user-list/header-skill-user'
import TableSkillUser from '@features/skill-user/components/skill-user-list/table-skill-user'
import ContainerProtectedPage from '@components/ui/container/container-protected-page'

const SkillUserListPage = () => {
  return (
    <>
      <ContainerProtectedPage>
        <HeaderSkillUser />
        <FormFilterSkillUser />
        <TableSkillUser />
      </ContainerProtectedPage>
      <FormSkillUser />
    </>
  )
}

export default SkillUserListPage
