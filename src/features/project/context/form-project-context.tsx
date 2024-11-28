import React, { createContext, SetStateAction, useCallback, useState } from 'react'

import EVENT_PROJECT from '@features/project/event-emitters/project-event'
import { initialFormInformationProject } from '@features/project/validation/information-project-schema'
import { initialFormMenuProject } from '@features/project/validation/menu-project-schema'
import { initialFormResponsibilityProject } from '@features/project/validation/responsiblity-project-schema'

import useEventEmitter from '@hooks/use-event-emitter'
import { deepCopy, mappingValuesToForm } from '@lib/helper/function'
import { TTypeActionData } from '@typescript/index-type'
import { TEventOnChange } from '@typescript/ui-types'

export interface TContextFormProject {
  formInformationProject: typeof initialFormInformationProject
  formMenuProject: typeof initialFormMenuProject
  formResponsibilityProject: typeof initialFormResponsibilityProject
  setFormInformationProject: React.Dispatch<
    SetStateAction<TContextFormProject['formInformationProject']>
  >
  setFormMenuProject: React.Dispatch<SetStateAction<TContextFormProject['formMenuProject']>>
  setFormResponsibilityProject: React.Dispatch<
    SetStateAction<TContextFormProject['formResponsibilityProject']>
  >
  handleOnChangeFormInformationProject: (e: TEventOnChange) => void
  handleOnChangeFormMenuProject: (e: TEventOnChange) => void
  handleOnChangeFormResponsibilityProject: (e: TEventOnChange) => void
}

const initialContextFormProject = {
  formInformationProject: initialFormInformationProject,
  formMenuProject: initialFormMenuProject,
  formResponsibilityProject: initialFormResponsibilityProject,
  handleOnChangeFormInformationProject: () => null,
  handleOnChangeFormMenuProject: () => null,
  handleOnChangeFormResponsibilityProject: () => null,
  setFormInformationProject: () => null,
  setFormMenuProject: () => null,
  setFormResponsibilityProject: () => null
}

export const contextFormProject = createContext<TContextFormProject>(initialContextFormProject)

const ContextFormProjectProvider = (props: { children: React.ReactNode }) => {
  const { children } = props
  const [formInformationProject, setFormInformationProject] = useState(
    deepCopy({ ...initialFormInformationProject })
  )

  const [formMenuProject, setFormMenuProject] = useState(deepCopy({ ...initialFormMenuProject }))

  const [formResponsibilityProject, setFormResponsibilityProject] = useState(
    deepCopy({ ...initialFormResponsibilityProject })
  )

  const [listResponsibility, setListResponsibility] = useState([])
  const [listMenuProject, setListMenuProject] = useState([])

  type TKeyFormInformationProject = keyof typeof formInformationProject
  type TKeyFormMenuProject = keyof typeof formMenuProject
  type TKeyFormResponsibilityProject = keyof typeof formResponsibilityProject

  useEventEmitter(EVENT_PROJECT.SET_SELECTED_MENU_PROJECT, ({ data, action }) => {
    if (action === TTypeActionData.EDIT) {
      setFormMenuProject({ ...mappingValuesToForm({ values: data, form: formMenuProject }) })
    }

    if (action === TTypeActionData.DELETE) {
      setListMenuProject((prev) => prev?.filter((menuProject) => menuProject !== data?.id))
    }
  })

  useEventEmitter(EVENT_PROJECT.SET_SELECTED_RESPONSIBILITY_PROJECT, ({ data, action }) => {
    if (action === TTypeActionData.EDIT) {
      setFormResponsibilityProject({
        ...mappingValuesToForm({ values: data, form: formResponsibilityProject })
      })
    }

    if (action === TTypeActionData.DELETE) {
      setListResponsibility((prev) =>
        prev?.filter((responsibility) => responsibility?.id === data?.id)
      )
    }
  })

  const handleOnChangeFormInformationProject = useCallback((e: TEventOnChange) => {
    const currForm = formInformationProject
    const name = e.target.name as TKeyFormInformationProject
    const value = e.target.value
    currForm[name].value = value
    setFormInformationProject({
      ...currForm
    })
  }, [])

  const handleOnChangeFormMenuProject = useCallback((e: TEventOnChange) => {
    const currForm = formMenuProject
    const name = e.target.name as TKeyFormMenuProject
    const value = e.target.value
    currForm[name].value = value

    setFormMenuProject({
      ...currForm
    })
  }, [])

  const handleOnChangeFormResponsibilityProject = useCallback((e: TEventOnChange) => {
    const currForm = formResponsibilityProject
    const name = e.target.name as TKeyFormResponsibilityProject
    const value = e.target.value
    currForm[name].value = value

    setFormResponsibilityProject({
      ...currForm
    })
  }, [])

  return (
    <contextFormProject.Provider
      value={{
        formInformationProject,
        formMenuProject,
        formResponsibilityProject,
        handleOnChangeFormInformationProject,
        handleOnChangeFormMenuProject,
        handleOnChangeFormResponsibilityProject,
        setFormInformationProject,
        setFormMenuProject,
        setFormResponsibilityProject,
        listResponsibility,
        listMenuProject
      }}
    >
      {children}
    </contextFormProject.Provider>
  )
}
export default ContextFormProjectProvider
