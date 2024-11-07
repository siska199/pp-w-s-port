
import { eventEmitter } from '@event-emmitter'
import EVENT_NAME_EDUCATION from '@event-emmitter/modules/education/education-event'

import HeaderPage from '@components/ui/header/header-page'

import { TTypeActionModalForm } from '@typescript/global.d'

const HeaderEducation = () => {
  const handleAddEducation = () => {
    eventEmitter.emit(EVENT_NAME_EDUCATION.SET_MODAL_FORM_EDUCATION,{
      isShow : true,
      action : TTypeActionModalForm.ADD
    })
  }
  return <HeaderPage title={'Education'} onClickAddData={handleAddEducation} />
}

export default HeaderEducation
