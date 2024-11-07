import { eventEmitter } from '@event-emmitter'
import skillEvent from '@event-emmitter/modules/skill-event'

import HeaderPage from '@components/ui/header/header-page'

import { TTypeActionModalForm } from '@typescript/global.d'

const HeaderSkill = () => {
  const handleAddSkill = () => {
    eventEmitter.emit(skillEvent.SET_MODAL_FORM_SKILL, {
      isShow: true,
      action: TTypeActionModalForm.ADD
    })
  }
  return <HeaderPage title={'Skill'} onClickAddData={handleAddSkill} />
}

export default HeaderSkill
