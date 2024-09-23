import { route } from "@lib/data/global";

  
  const menuSidebar = [
    {
      title : 'Personal Information',
      src   : 'sidebar/certification.png',
      url   : route.personalInformation.fullPath,
      name  : 'personal-information',
    },
    {
      title : 'Skill',
      src   :  'sidebar/skill.png',
      url   : route.skill.fullPath,
      name  : 'skill',
    },
    {
      title : 'Work History',
      src   : 'sidebar/work-history.png',
      url   : route.workHistory.fullPath,
      name  : 'work-history',
    },
    {
      title : 'Education',
      src   : 'sidebar/education.png',
      url   : route.education.fullPath,
      name  : 'education',
    },
    {
      title : 'Portofolio',
      src   : 'sidebar/portofolio.png',
      url   : route.portofolio.fullPath,
      name  : 'portofolio',
    },
    {
      title : 'Certification',
      src   : 'sidebar/certification.png',
      url   : route.certification.fullPath,
      name  : 'certification',
    },
  ];
  
  export default menuSidebar;
  