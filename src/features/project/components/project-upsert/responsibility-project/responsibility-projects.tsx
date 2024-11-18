import { responsibilities } from '@features/project/constants'
import Header from '@components/ui/header/header'

const ResponsibilityProjects = () => {
  const handleOnClickAddData = () => {}
  return (
    <div className='space-y-10'>
      <Header title='Responsibility Project' onClickAddData={handleOnClickAddData} />
      <ul className='space-y-4 list-disc'>
        {responsibilities?.map((responsibility) => <li>{responsibility.description}</li>)}
      </ul>
    </div>
  )
}

export default ResponsibilityProjects
