import { eventEmitter } from '@event-emitters'

import EVENT_SKILL from '@features/skill/event-emitters/skill-event'
import HeaderPage from '@components/ui/header/header-page'

import { TTypeActionModalForm } from '@typescript/index-type'

const HeaderSkill = () => {
  const handleAddSkill = () => {
    eventEmitter.emit(EVENT_SKILL.SET_MODAL_FORM_SKILL, {
      isShow: true,
      action: TTypeActionModalForm.ADD
    })
  }
  return <HeaderPage title={'Skill'} onClickAddData={handleAddSkill} />
}

export default HeaderSkill
