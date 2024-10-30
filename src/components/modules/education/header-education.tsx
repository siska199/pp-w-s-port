import { useContext } from 'react'

import HeaderPage from '@components/ui/header/header-page'

import { educationContext } from '@context/modules/education/education-context'
import { TTypeActionModalForm } from '@typescript/global.d'

const HeaderEducation = () => {
  const { handleToggleModalFormEducation } = useContext(educationContext)
  const handleAddEducation = () => {
    handleToggleModalFormEducation({
      isShow: true,
      action: TTypeActionModalForm.ADD
    })
  }
  return <HeaderPage title={'Education'} onClickAddData={handleAddEducation} />
}

export default HeaderEducation
