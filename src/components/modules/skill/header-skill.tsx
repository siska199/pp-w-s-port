import { useContext } from 'react'

import HeaderPage from '@components/ui/header-page'

import { ACTION_TYPE_SKILL, skillContext } from '@context/modules/skill/skill-context'
import { TTypeActionModalForm } from '@typescript/global.d'

const HeaderSkill = () => {
  const { dispatch } = useContext(skillContext)

  const handleAddSkill = () => {
    dispatch({
      type: ACTION_TYPE_SKILL.SET_MODAL_FORM_SKILL,
      payload: {
        isShow: true,
        action: TTypeActionModalForm.ADD
      }
    })
  }
  return <HeaderPage title={'Skill'} onClickAddData={handleAddSkill} />
}

export default HeaderSkill
