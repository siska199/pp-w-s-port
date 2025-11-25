import React, { createContext, SetStateAction, useCallback, useState } from 'react'

import EVENT_PROJECT from '@features/project/event-emitters/project-event'
import { initialFormInformationProject } from '@features/project/validation/information-project-schema'
import { initialFormProjectMenu } from '@features/project/validation/project-menu-schema'
import {
  initialFormResponsibilityProject,
  TResponsibilityProject
} from '@features/project/validation/responsiblity-project-schema'

import useEventEmitter from '@hooks/use-event-emitter'
import { deepCopy, mappingValuesToForm } from '@lib/helper/function'
import { TTypeActionData } from '@typescript/index-type'
import { TEventOnChange } from '@typescript/ui-types'
import { TProjectMenu } from '@features/project/types/project-type'

export interface TContextFormProject {
  formInformationProject: typeof initialFormInformationProject
  formProjectMenu: typeof initialFormProjectMenu
  formResponsibilityProject: typeof initialFormResponsibilityProject
  setFormInformationProject: React.Dispatch<
    SetStateAction<TContextFormProject['formInformationProject']>
  >
  setFormProjectMenu: React.Dispatch<SetStateAction<TContextFormProject['formProjectMenu']>>
  setFormResponsibilityProject: React.Dispatch<
    SetStateAction<TContextFormProject['formResponsibilityProject']>
  >
  handleOnChangeFormInformationProject: (e: TEventOnChange) => void
  handleOnChangeFormProjectMenu: (e: TEventOnChange) => void
  handleOnChangeFormResponsibilityProject: (e: TEventOnChange) => void
  listResponsibility: TResponsibilityProject[]
  listProjectMenu: TProjectMenu[]
}

const initialContextFormProject = {
  formInformationProject: initialFormInformationProject,
  formProjectMenu: initialFormProjectMenu,
  formResponsibilityProject: initialFormResponsibilityProject,
  handleOnChangeFormInformationProject: () => null,
  handleOnChangeFormProjectMenu: () => null,
  handleOnChangeFormResponsibilityProject: () => null,
  setFormInformationProject: () => null,
  setFormProjectMenu: () => null,
  setFormResponsibilityProject: () => null,
  listResponsibility: [],
  listProjectMenu: []
}

export const contextFormProject = createContext<TContextFormProject>(initialContextFormProject)

const ContextFormProjectProvider = (props: { children: React.ReactNode }) => {
  const { children } = props
  const [formInformationProject, setFormInformationProject] = useState(
    deepCopy({ ...initialFormInformationProject })
  )

  const [formProjectMenu, setFormProjectMenu] = useState(deepCopy({ ...initialFormProjectMenu }))

  const [formResponsibilityProject, setFormResponsibilityProject] = useState(
    deepCopy({ ...initialFormResponsibilityProject })
  )

  const [listResponsibility, setListResponsibility] = useState<TResponsibilityProject[]>([])
  const [listProjectMenu, setListProjectMenu] = useState([])

  type TKeyFormInformationProject = keyof typeof formInformationProject
  type TKeyFormProjectMenu = keyof typeof formProjectMenu
  type TKeyFormResponsibilityProject = keyof typeof formResponsibilityProject

  useEventEmitter(EVENT_PROJECT.SET_SELECTED_MENU_PROJECT, ({ data, action }) => {
    if (action === TTypeActionData.EDIT) {
      setFormProjectMenu({ ...mappingValuesToForm({ values: data, form: formProjectMenu }) })
    }

    if (action === TTypeActionData.DELETE) {
      setListProjectMenu((prev) => prev?.filter((projectMenu) => projectMenu !== data?.id))
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

  const handleOnChangeFormProjectMenu = useCallback((e: TEventOnChange) => {
    const currForm = formProjectMenu
    const name = e.target.name as TKeyFormProjectMenu
    const value = e.target.value
    currForm[name].value = value
    setFormProjectMenu({
      ...currForm
    })
  },[])

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
        formProjectMenu,
        formResponsibilityProject,
        handleOnChangeFormInformationProject,
        handleOnChangeFormProjectMenu,
        handleOnChangeFormResponsibilityProject,
        setFormInformationProject,
        setFormProjectMenu,
        setFormResponsibilityProject,
        listResponsibility,
        listProjectMenu
      }}
    >
      {children}
    </contextFormProject.Provider>
  )
}
export default ContextFormProjectProvider
