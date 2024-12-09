import { useContext } from 'react'

import FormGeneralProject from '@features/project/components/project-upsert/form-information-project'
import MenuProjects from '@features/project/components/project-upsert/menu-project/menu-projects'
import ResponsibilityProjects from '@features/project/components/project-upsert/responsibility-project/responsibility-projects'
import { contextFormProject } from '@features/project/context/form-project-context'
import Button from '@components/ui/button'

import { extractValueFromForm } from '@lib/helper/function'
import { TEventSubmitForm } from '@typescript/ui-types'

const MainFromProject = () => {
  const { formInformationProject } = useContext(contextFormProject)

  const handleOnSubmit = (e: TEventSubmitForm) => {
    const generalProject = extractValueFromForm(formInformationProject)
    console.log('general project: ', generalProject)
    e?.preventDefault()
  }
  return (
    <div className='space-y-10 '>
      <form className='space-y-4' onClick={handleOnSubmit}>
        <FormGeneralProject />
        <MenuProjects />
        <ResponsibilityProjects />
        <Button type='submit' className='ml-auto'>
          Save
        </Button>
      </form>
    </div>
  )
}

export default MainFromProject
