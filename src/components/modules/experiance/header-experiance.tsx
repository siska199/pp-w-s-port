import { useContext } from 'react'

import HeaderPage from '@components/ui/header-page'

import {
  ACTION_TYPE_EXPERIANCE,
  experianceContext
} from '@context/modules/experiance/experiance-context'
import { TTypeActionModalForm } from '@typescript/global.d'

const HeaderExperiance = () => {
  const { dispatch } = useContext(experianceContext)

  const handleAddData = () => {
    dispatch({
      type: ACTION_TYPE_EXPERIANCE.SET_MODAL_FORM_EXPERIANCE,
      payload: {
        isShow: true,
        action: TTypeActionModalForm.ADD
      }
    })
  }

  return <HeaderPage title='Experiance' onClickAddData={handleAddData} />
}

export default HeaderExperiance
