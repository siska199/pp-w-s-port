import { eventEmitter } from '@event-emitters'

import { responsibilities } from '@features/project/constants'
import EVENT_PROJECT from '@features/project/event-emitters/project-event'
import CardAction from '@components/ui/card/card-action'
import Header from '@components/ui/header/header'

import { TTypeActionModalForm } from '@typescript/index-type'

const ResponsibilityProjects = () => {
  const handleOnClickAddData = () => {
    eventEmitter.emit(EVENT_PROJECT.SET_MODAL_FORM_RESPONSIBILITY_PROJECT, {
      isShow: true,
      action: TTypeActionModalForm.ADD
    })
  }
  return (
    <div className='space-y-10'>
      <Header title='Responsibility Project' onClickAddData={handleOnClickAddData} />
      <ul className='space-y-4 list-disc'>
        {responsibilities?.map((responsibility, i) => (
          <CardResponsibility key={i} {...responsibility} />
        ))}
      </ul>
    </div>
  )
}

interface TPropsCardResponsibility {
  id: string
  description: string
}
const CardResponsibility = (props: TPropsCardResponsibility) => {
  const { id, description } = props

  const handleEditData = (id: string) => {
    console.log('id: ', id)
    eventEmitter.emit(EVENT_PROJECT.SET_MODAL_FORM_RESPONSIBILITY_PROJECT, {
      isShow: true,
      action: TTypeActionModalForm.EDIT
    })
  }

  const handleDeleteData = (id: string) => {
    console.log('id: ', id)
  }
  return (
    <CardAction onEditData={() => handleEditData(id)} onDeleteData={() => handleDeleteData(id)}>
      <li className='ml-4'>{description}</li>
    </CardAction>
  )
}

export default ResponsibilityProjects
