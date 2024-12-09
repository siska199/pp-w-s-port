import { routes } from '@routes/constant'

const menuSidebar = [
  {
    title: 'Personal Information',
    src: 'sidebar/certification.png',
    url: routes.personalInformation.fullPath,
    name: 'personal-information'
  },
  {
    title: 'Education',
    src: 'sidebar/education.png',
    url: routes.education.fullPath,
    name: 'education'
  },
  {
    title: 'Skill',
    src: 'sidebar/skill.png',
    url: routes.skill.fullPath,
    name: 'skill'
  },
  {
    title: 'Experiance',
    src: 'sidebar/experiance.png',
    url: routes.experiance.fullPath,
    name: 'experiance'
  },
  {
    title: 'Project',
    src: 'sidebar/project.png',
    url: routes.project.fullPath,
    name: 'project'
  }
]

export default menuSidebar
