import { useContext } from 'react'

import HeaderPage from '@components/ui/header-page'

import { skillContext } from '@context/modules/skill/skill-context'
import { TTypeActionModalForm } from '@typescript/global.d'

const HeaderSkill = () => {
  const { handleToggleModalFormSkill } = useContext(skillContext)

  const handleAddSkill = () => {
    try {
      handleToggleModalFormSkill({
        isShow: true,
        action: TTypeActionModalForm.ADD
      })
    } catch (error: any) {
      console.log('error: ', error.mesage)
    }
  }
  return <HeaderPage title={'Skill'} onClickAddData={handleAddSkill} />
}

export default HeaderSkill
