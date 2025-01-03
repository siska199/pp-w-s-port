import { eventEmitter } from '@event-emitters'

import EVENT_SKILL_USER from '@features/skill-user/event-emitters/skill-user-event'
import HeaderPage from '@components/ui/header/header-page'

import { TTypeActionModalForm } from '@typescript/index-type'

const HeaderSkillUser = () => {
  const handleAddSkill = () => {
    eventEmitter.emit(EVENT_SKILL_USER.SET_MODAL_FORM_SKILL_USER, {
      isShow: true,
      action: TTypeActionModalForm.ADD
    })
  }
  return <HeaderPage title={'Skill User'} onClickAddData={handleAddSkill} />
}

export default HeaderSkillUser
