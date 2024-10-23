import { routes } from '@routes/constant';

const menuSidebar = [
  {
    title: 'Personal Information',
    src: 'sidebar/certification.png',
    url: routes.personalInformation.fullPath,
    name: 'personal-information',
  },
  {
    title: 'Skill',
    src: 'sidebar/skill.png',
    url: routes.skill.fullPath,
    name: 'skill',
  },
  {
    title: 'Work History',
    src: 'sidebar/work-history.png',
    url: routes.workHistory.fullPath,
    name: 'work-history',
  },
  {
    title: 'Education',
    src: 'sidebar/education.png',
    url: routes.education.fullPath,
    name: 'education',
  },
  {
    title: 'Project',
    src: 'sidebar/project.png',
    url: routes.project.fullPath,
    name: 'project',
  },
  {
    title: 'Certification',
    src: 'sidebar/certification.png',
    url: routes.certification.fullPath,
    name: 'certification',
  },
  {
    title: 'Generate Resume',
    src: 'sidebar/generate-resume.png',
    url: routes.generateResume.fullPath,
    name: 'generate-resume',
  },
];

export default menuSidebar;
