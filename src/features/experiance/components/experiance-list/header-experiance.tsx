import { eventEmitter } from '@event-emitters'
import EVENT_EXPERIANCE from '@features/experiance/event-emitters/experiance-event'

import HeaderPage from '@components/ui/header/header-page'

import { TTypeActionModalForm } from '@typescript/global.d'

const HeaderExperiance = () => {
  const handleAddData = () => {
    eventEmitter.emit(EVENT_EXPERIANCE.SET_MODAL_FORM_EXPERIANCE, {
      isShow: true,
      action: TTypeActionModalForm.ADD
    })
  }

  return <HeaderPage title='Experiance' onClickAddData={handleAddData} />
}

export default HeaderExperiance
