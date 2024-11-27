import React, { useMemo } from 'react'
import { eventEmitter } from '@event-emitters'

import EVENT_PROJECT from '@features/project/event-emitters/project-event'
import useMenuProject from '@features/project/hooks/use-menu-project'
import { TMenuProject } from '@features/project/validation/menu-project-schema'
import Badge from '@components/ui/badge'
import Header from '@components/ui/header/header'
import Image from '@components/ui/image'

import { TKeyVariantBadge } from '@lib/helper/variant/variant-badge'
import { TTypeActionModalForm } from '@typescript/index-type'
import { IconDelete, IconEdit } from '@assets/icons'

const MenuProjects = React.memo(() => {
  const { listMenuProject } = useMenuProject()

  const handleOnClickAddData = () => {
    eventEmitter.emit(EVENT_PROJECT.SET_MODAL_FORM_MENU_PROJECT, {
      isShow: true,
      action: TTypeActionModalForm.ADD
    })
  }
  return (
    <div className='space-y-10'>
      <Header title='Menu Project' onClickAddData={handleOnClickAddData} />
      <div className='md:w-[50%] space-y-4'>
        {listMenuProject?.map((menuProject) => (
          <CardMenuProject key={menuProject.id} {...menuProject} />
        ))}
      </div>
    </div>
  )
})

const CardMenuProject = React.memo((props: TMenuProject) => {
  const { name, id, description, main_image, features } = props

  const handleEditProject = (id: string) => {
    console.log('id: ', id)
  }

  const handleDeleteProject = (id: string) => {
    console.log('id:', id)
  }

  const listBtnAction = useMemo(
    () => [
      {
        name: 'edit',
        variant: 'softborder-warning' as TKeyVariantBadge,
        label: <IconEdit className='icon-warning' />,
        onClick: () => handleEditProject(id),
        isShow: true
      },
      {
        name: 'delete',
        variant: 'softborder-error' as TKeyVariantBadge,
        label: <IconDelete className='icon-error' />,
        onClick: () => handleDeleteProject(id),
        isShow: true
      }
    ],
    [id, handleDeleteProject, handleEditProject]
  )

  return (
    <div className='border rounded-md p-4 w-full relative space-y-1 '>
      <div className='absolute right-4 flex gap-1'>
        {listBtnAction?.map((btn, i) => (
          <Badge
            key={i}
            {...btn}
            shape={'pilled'}
            className={'!p-1 !min-h-auto !min-w-auto cursor-pointer-custome'}
          />
        ))}
      </div>
      <h4 className='text-body-large text-normal'>{name}</h4>
      {main_image && <Image src={main_image.preview ?? ''} className='w-[5rem] aspect-video' />}
      <p className='line-clamp-2 '>{description}</p>
      <div>
        <h5 className='text-body-base font-medium'>Features : </h5>
        <div
          className='container-list-disc-style '
          dangerouslySetInnerHTML={{ __html: features ?? '' }}
        ></div>
      </div>
    </div>
  )
})
export default MenuProjects
