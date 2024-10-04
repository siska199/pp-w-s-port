export const personalInformation = {};

export const skills = [
  {
    id: 1,
    name: 'React',
    category: 'Frontend',
    years_of_experience: 3,
    level: 'Intermediate',
    projects: [
      'E-commerce Web App',
      'Project Management Dashboard',
      'Portfolio Website',
    ],
  },
  {
    id: 2,
    name: 'Node.js',
    category: 'Backend',
    years_of_experience: 4,
    level: 'Advanced',
    projects: [
      'API for Social Media App',
      'Real-time Chat Application',
      'Microservices for E-commerce',
    ],
  },
  {
    id: 3,
    name: 'Figma',
    category: 'UI/UX',
    years_of_experience: 2,
    level: 'Beginner',
    projects: [
      'Mobile App Design for Fintech',
      'Landing Page Wireframe',
      'Prototyping for Web Application',
    ],
  },
  {
    id: 4,
    name: 'PostgreSQL',
    category: 'Database',
    years_of_experience: 3,
    level: 'Intermediate',
    projects: [
      'Customer Management System',
      'Data Warehousing Solution',
      'Analytics Dashboard',
    ],
  },
  {
    id: 5,
    name: 'Docker',
    category: 'DevOps',
    years_of_experience: 2,
    level: 'Intermediate',
    projects: [
      'Containerized Microservices',
      'CI/CD Pipeline Setup',
      'Development Environment Automation',
    ],
  },
  {
    id: 6,
    name: 'AWS',
    category: 'Cloud Technologies',
    years_of_experience: 4,
    level: 'Advanced',
    projects: [
      'Serverless Application',
      'S3 Data Storage for Video Platform',
      'Lambda Functions for Processing Data',
    ],
  },
  {
    id: 7,
    name: 'Jest',
    category: 'Testing',
    years_of_experience: 2,
    level: 'Intermediate',
    projects: [
      'Unit Testing for React App',
      'End-to-End Testing for Web App',
      'Test Coverage for Backend Services',
    ],
  },
  {
    id: 8,
    name: 'JavaScript',
    category: 'Frontend',
    years_of_experience: 5,
    level: 'Advanced',
    projects: [
      'Interactive Web Game',
      'Single Page Application',
      'Custom Web Components',
    ],
  },
  {
    id: 9,
    name: 'Django',
    category: 'Backend',
    years_of_experience: 3,
    level: 'Intermediate',
    projects: [
      'Content Management System',
      'RESTful API for Healthcare App',
      'E-commerce Backend',
    ],
  },
  {
    id: 10,
    name: 'MongoDB',
    category: 'Database',
    years_of_experience: 2,
    level: 'Beginner',
    projects: [
      'NoSQL Database for Social Media',
      'Document-based Data Storage',
      'Data Handling for Real-time App',
    ],
  },
];

export const projects = [
  {
    id: 1,
    title: 'DevPort - Developer Portfolio Generator',
    description:
      'A web app that allows developers to showcase their projects, resumes, and work experiences in an organized manner. It provides recruiters with an intuitive way to search for candidates.',
    thumbnail: 'dummy-images/s-port.png',
    techStack: [
      'Next.js',
      'TypeScript',
      'Preline UI',
      'NextAuth.js',
      'Tailwind CSS',
    ],
  },
  {
    id: 2,
    title: 'GOA - Garda Oto Akses',
    description:
      'Reengineered the GOA application, transforming it from .NET 4 to a modern React-based application with a focus on enhanced user experience and global state management.',
    thumbnail: 'dummy-images/goa.png',
    techStack: [
      'React',
      'Zustand',
      'Chart.js',
      'React-Select',
      'Axios',
      'React-Router-DOM',
    ],
  },
  {
    id: 3,
    title: 'Endcustomer Reseller Eiger',
    description:
      "An e-commerce platform for Eiger's resellers, enabling seamless catalog browsing, shopping cart management, and product customization using drag-and-drop features.",
    thumbnail: 'dummy-images/riang.png',
    techStack: [
      'Nuxt.js',
      'TypeScript',
      'Vuex',
      'Tailwind CSS',
      'vue-drag-resize',
    ],
  },
  {
    id: 4,
    title: 'Quadra - Employee Management System',
    description:
      'An employee management system providing secure login, timesheet management, and authorization control. Developed with a full stack approach for efficient and automated workflows.',
    thumbnail: 'https://dummyimage.com/600x400/333/fff&text=Quadra',
    techStack: [
      'Vite',
      'React',
      'TypeScript',
      'Redux Toolkit',
      'Material UI',
      'Python Django',
      'PostgreSQL',
    ],
  },
  {
    id: 5,
    title: 'iPast - Real-Time Asset Tracking',
    description:
      'A web app for real-time asset tracking, improving efficiency in managing the location and status of valuable company assets.',
    thumbnail: 'https://dummyimage.com/600x400/444/fff&text=iPast',
    techStack: [
      'React',
      'TypeScript',
      'Formik',
      'React-Hook-Form',
      'Tailwind CSS',
      'Node.js',
    ],
  },
];

export const skillsByCategory = [
  {
    name: 'Frontend',
    skills: [
      {
        name: 'React',
        url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg',
      },
      {
        name: 'JavaScript',
        url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg',
      },
      {
        name: 'HTML',
        url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg',
      },
      {
        name: 'CSS',
        url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg',
      },
      {
        name: 'TypeScript',
        url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg',
      },
      {
        name: 'Redux',
        url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg',
      },
      {
        name: 'Next.js',
        url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original-wordmark.svg',
      },
      {
        name: 'Vue.js',
        url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original-wordmark.svg',
      },
      {
        name: 'Angular',
        url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/angularjs/angularjs-original.svg',
      },
      {
        name: 'Tailwind CSS',
        url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-plain.svg',
      },
    ],
  },
  {
    name: 'Backend',
    skills: [
      {
        name: 'Node.js',
        url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg',
      },
      {
        name: 'Django',
        url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/django/django-original.svg',
      },
      {
        name: 'Express.js',
        url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg',
      },
      {
        name: 'Ruby on Rails',
        url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/rails/rails-original-wordmark.svg',
      },
      {
        name: 'Spring Boot',
        url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/spring/spring-original-wordmark.svg',
      },
      {
        name: 'Flask',
        url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/flask/flask-original-wordmark.svg',
      },
      {
        name: 'PHP',
        url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/php/php-original.svg',
      },
      {
        name: 'Laravel',
        url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/laravel/laravel-original-wordmark.svg',
      },
      {
        name: 'Koa.js',
        url: 'https://avatars.githubusercontent.com/u/1273335?s=200&v=4',
      },
      {
        name: 'ASP.NET',
        url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/dot-net/dot-net-original-wordmark.svg',
      },
    ],
  },
  {
    name: 'UI/UX',
    skills: [
      {
        name: 'Figma',
        url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/figma/figma-original.svg',
      },
      {
        name: 'Sketch',
        url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/sketch/sketch-original-wordmark.svg',
      },
      {
        name: 'Adobe XD',
        url: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Adobe_XD_CC_icon.svg',
      },
      {
        name: 'InVision',
        url: 'https://static.invisionapp.com/img/press/rebrand/press-logo-invision-one.png',
      },
      {
        name: 'Axure RP',
        url: 'https://axureassets.s3.amazonaws.com/icon-axure.png',
      },
      {
        name: 'Marvel',
        url: 'https://avatars.githubusercontent.com/u/5540243?s=200&v=4',
      },
      {
        name: 'Balsamiq',
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Balsamiq_Icon.svg/1024px-Balsamiq_Icon.svg.png',
      },
      {
        name: 'Framer',
        url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/framer/framer-original.svg',
      },
      { name: 'Principle', url: 'https://cdn-principle.app/presskit/icon.png' },
      {
        name: 'Zeplin',
        url: 'https://avatars.githubusercontent.com/u/1154899?s=200&v=4',
      },
    ],
  },
  {
    name: 'Database',
    skills: [
      {
        name: 'PostgreSQL',
        url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg',
      },
      {
        name: 'MongoDB',
        url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg',
      },
      {
        name: 'MySQL',
        url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg',
      },
      {
        name: 'SQLite',
        url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/sqlite/sqlite-original-wordmark.svg',
      },
      {
        name: 'MariaDB',
        url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mariadb/mariadb-original-wordmark.svg',
      },
      {
        name: 'Redis',
        url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/redis/redis-original-wordmark.svg',
      },
      {
        name: 'Cassandra',
        url: 'https://avatars.githubusercontent.com/u/2208412?s=200&v=4',
      },
      {
        name: 'Oracle DB',
        url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/oracle/oracle-original.svg',
      },
      {
        name: 'DynamoDB',
        url: 'https://upload.wikimedia.org/wikipedia/commons/f/fd/DynamoDB.png',
      },
      {
        name: 'Firebase Firestore',
        url: 'https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg',
      },
    ],
  },
  {
    name: 'DevOps',
    skills: [
      {
        name: 'Docker',
        url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg',
      },
      {
        name: 'Kubernetes',
        url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/kubernetes/kubernetes-plain.svg',
      },
      {
        name: 'Jenkins',
        url: 'https://www.vectorlogo.zone/logos/jenkins/jenkins-icon.svg',
      },
      {
        name: 'Terraform',
        url: 'https://www.vectorlogo.zone/logos/terraformio/terraformio-icon.svg',
      },
      {
        name: 'Ansible',
        url: 'https://www.vectorlogo.zone/logos/ansible/ansible-icon.svg',
      },
      {
        name: 'Vagrant',
        url: 'https://www.vectorlogo.zone/logos/vagrantup/vagrantup-icon.svg',
      },
      {
        name: 'Prometheus',
        url: 'https://www.vectorlogo.zone/logos/prometheusio/prometheusio-icon.svg',
      },
      {
        name: 'Grafana',
        url: 'https://www.vectorlogo.zone/logos/grafana/grafana-icon.svg',
      },
      {
        name: 'Nagios',
        url: 'https://www.vectorlogo.zone/logos/nagios/nagios-icon.svg',
      },
      {
        name: 'Puppet',
        url: 'https://www.vectorlogo.zone/logos/puppet/puppet-icon.svg',
      },
    ],
  },
  {
    name: 'Cloud Technologies',
    skills: [
      {
        name: 'AWS',
        url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
      },
      {
        name: 'Microsoft Azure',
        url: 'https://www.vectorlogo.zone/logos/microsoft_azure/microsoft_azure-icon.svg',
      },
      {
        name: 'Google Cloud Platform',
        url: 'https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg',
      },
      {
        name: 'Heroku',
        url: 'https://www.vectorlogo.zone/logos/heroku/heroku-icon.svg',
      },
      {
        name: 'IBM Cloud',
        url: 'https://www.vectorlogo.zone/logos/ibm_cloud/ibm_cloud-icon.svg',
      },
      {
        name: 'Alibaba Cloud',
        url: 'https://www.vectorlogo.zone/logos/alibabacloud/alibabacloud-icon.svg',
      },
      {
        name: 'Oracle Cloud',
        url: 'https://www.vectorlogo.zone/logos/oracle/oracle-icon.svg',
      },
      {
        name: 'Cloudflare',
        url: 'https://www.vectorlogo.zone/logos/cloudflare/cloudflare-icon.svg',
      },
      {
        name: 'DigitalOcean',
        url: 'https://www.vectorlogo.zone/logos/digitalocean/digitalocean-official.svg',
      },
      {
        name: 'Netlify',
        url: 'https://www.vectorlogo.zone/logos/netlify/netlify-icon.svg',
      },
    ],
  },
  {
    name: 'Testing',
    skills: [
      {
        name: 'Jest',
        url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/jest/jest-plain.svg',
      },
      {
        name: 'Mocha',
        url: 'https://www.vectorlogo.zone/logos/mochajs/mochajs-icon.svg',
      },
      {
        name: 'Chai',
        url: 'https://www.vectorlogo.zone/logos/chaijs/chaijs-icon.svg',
      },
      {
        name: 'Cypress',
        url: 'https://www.vectorlogo.zone/logos/cypressio/cypressio-icon.svg',
      },
      {
        name: 'Selenium',
        url: 'https://www.vectorlogo.zone/logos/selenium/selenium-icon.svg',
      },
      {
        name: 'Playwright',
        url: 'https://playwright.dev/img/playwright-logo.svg',
      },
      { name: 'Puppeteer', url: 'https://pptr.dev/images/pptr-logo.svg' },
      {
        name: 'Testing Library',
        url: 'https://testing-library.com/img/octopus-128x128.png',
      },
      {
        name: 'Karma',
        url: 'https://avatars.githubusercontent.com/u/5133152?s=200&v=4',
      },
      { name: 'QUnit', url: 'https://qunitjs.com/assets/qunit-logo.png' },
    ],
  },
];

export const socialLinks = [
  {
    name: 'github',
    src: 'github.png',
    url: 'github.com',
  },
  {
    name: 'linkind',
    src: 'linkedin.png',
    url: 'linkind.com',
  },
  {
    name: 'whatsapp',
    src: 'whatsapp.png',
    url: 'whatsapp.com',
  },
  {
    name: 'gmail',
    src: 'gmail.png',
    url: 'gmail.com',
  },
];

export const aboutMeData = {
  experienceMetrics: [
    {
      title: '3+',
      description: 'Years of experience',
    },
    {
      title: '8+',
      description: 'Company Projects completed',
    },
    {
      title: '10+',
      description: 'Personal Projects completed',
    },
    {
      title: '4+',
      description: 'Happy Customers',
    },
  ],
  aboutMe: `
              Frontend Developer with 3+ years of experience specializing in
            React.js, Next.js, and TypeScript. Skilled in architecting scalable
            web applications from the ground up, including setting up folder and
            file structure, routing, protected routes, authorization, state
            management (Zustand, Redux, Context API), and API integrations using
            Axios. Expertise in component architecture, custom hooks,
            implementing Figma designs from UIUX, creating responsive layouts,
            and developing design systems using various CSS frameworks such as
            Tailwind, Bootstrap, and Styled Components. Proven ability to work
            collaboratively in a team, successfully delivering projects on tight
            deadlines. Eager to expand my skills in backend development to
            further enhance my capabilities in creating full-stack applications.
  `,
};
