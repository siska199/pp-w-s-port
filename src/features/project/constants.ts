import { TTypeCategoryProject, TTypeTypeProject } from '@features/project/types/project-type'

import { generateOptionsFromEnum } from '@lib/helper/function'

export const optionsCategoryProject = generateOptionsFromEnum(TTypeCategoryProject)

export const optionsTypeProject = generateOptionsFromEnum(TTypeTypeProject)

export const listMenuProject = [
  {
    id: '1',
    name: 'Menu Login',
    description: '-',
    main_image:
      'https://res.cloudinary.com/dkig5fihk/image/upload/v1730800346/projects/twitter/twitter%20clone%20thumbnail.png',
    features: `<ul><li>Form login</li><li>Remember me</li><li>Forgot password</li></ul>`
  },
  {
    id: '2',
    name: 'Menu Dashboard',
    description: 'Main dashboard with user overview and quick access links.',
    main_image:
      'https://res.cloudinary.com/dkig5fihk/image/upload/v1730800346/projects/twitter/twitter%20clone%20thumbnail.png',
    features: `<ul><li>User overview</li><li>Notifications</li><li>Quick links</li><li>Statistics</li></ul>`
  },
  {
    id: '3',
    name: 'Menu Profile',
    description: 'User profile page with personal information and settings.',
    main_image: '',
    features: `<ul><li>Edit personal info</li><li>Change password</li><li>Profile picture update</li><li>Security settings</li></ul>`
  },
  {
    id: '4',
    name: 'Menu Projects',
    description: 'View and manage ongoing projects, add new projects.',
    main_image: '',
    features: `<ul><li>Project list</li><li>Project detail</li><li>Create new project</li><li>Assign tasks</li></ul>`
  },
  {
    id: '5',
    name: 'Menu Notifications',
    description: 'View system and user notifications.',
    main_image: '',
    features: `<ul><li>System alerts</li><li>Message notifications</li><li>Activity log</li></ul>`
  },
  {
    id: '6',
    name: 'Menu Settings',
    description: 'Application settings and user preferences.',
    main_image: '',
    features: `<ul><li>Account settings</li><li>Privacy settings</li><li>Language preferences</li><li>Notifications settings</li></ul>`
  },
  {
    id: '7',
    name: 'Menu Reports',
    description: 'Generate and view various reports from the application data.',
    main_image: '',
    features: `<ul><li>Generate sales report</li><li>Generate user activity report</li><li>Export reports to CSV/PDF</li></ul>`
  },
  {
    id: '8',
    name: 'Menu Help',
    description: 'Access help documentation and contact support.',
    main_image: '',
    features: `<ul><li>FAQs</li><li>Contact support</li><li>Submit a ticket</li></ul>`
  },
  {
    id: '9',
    name: 'Menu Logout',
    description: 'Logout from the application securely.',
    main_image: '',
    features: `<ul><li>Logout</li><li>Redirect to login screen</li><li>Session management</li></ul>`
  }
]
