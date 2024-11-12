import { useNavigate } from 'react-router-dom'

import HeaderPage from '@components/ui/header/header-page'

import { routes } from '@routes/constant'

const HeaderProject = () => {
  const navigate = useNavigate()
  const handleAddProject = () => {
    navigate(routes.project.child.upsert.fullPath)
  }
  return <HeaderPage title={'Project'} onClickAddData={handleAddProject} />
}

export default HeaderProject
