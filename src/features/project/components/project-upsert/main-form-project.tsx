
import FormGeneralProject from '@features/project/components/project-upsert/form-information-project'
import ResponsibilityProjects from '@features/project/components/project-upsert/responsibility-project/responsibility-projects'

import ProjectMenus from '@features/project/components/project-upsert/project-menu/project-menus'

const MainFromProject = () => {

  return (
    <div className='space-y-10 '>
        <FormGeneralProject />
        <ProjectMenus />
        <ResponsibilityProjects />
    </div>
  )
}

export default MainFromProject
