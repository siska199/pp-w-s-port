import { listMenuProject } from '@features/project/constants'
import Badge from '@components/ui/badge'
import Button from '@components/ui/button'
import Header from '@components/ui/header/header'

import { IconDelete, IconEdit } from '@assets/icons'

const MenuProjects = () => {
  const handleOnClickAddData = () => {}
  return (
    <div className='space-y-4'>
      <Header title='Menu Project' onClickAddData={handleOnClickAddData} />
      <div className='md:w-[50%] space-y-4'>
        {listMenuProject?.map((menuProject, i) => <CardMenuProject key={i} {...menuProject} />)}
      </div>
    </div>
  )
}

interface TPropsCardMenuProject {
  id: string
  name: string
  description: string
  main_image?: string
  features?: string
}

const CardMenuProject = (props: TPropsCardMenuProject) => {
  const { name, id, description, main_image, features } = props

  const handleEditProject = (id: string) => {}

  const handleDeleteProject = (id: string) => {}

  return (
    <div className='border rounded-md p-4 w-full relative'>
      <div className='absolute right-4 flex gap-1'>
        <Badge
          variant={'softborder-warning'}
          label={<IconEdit className='icon-warning' />}
          shape={'pilled'}
          className={'!p-1 !min-h-auto !min-w-auto cursor-pointer-custome'}
          onClick={() => handleDeleteProject(id)}
        />
        <Badge
          variant={'softborder-warning'}
          label={<IconDelete className='icon-error' />}
          shape={'pilled'}
          className={'!p-1 !min-h-auto !min-w-auto cursor-pointer-custome'}
          onClick={() => handleEditProject(id)}
        />
      </div>
      <h5 className='text-body-large text-normal'>{name}</h5>
    </div>
  )
}
export default MenuProjects
