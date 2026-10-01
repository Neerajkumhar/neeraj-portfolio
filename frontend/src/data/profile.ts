export const profile = {
  name: 'Neeraj Kumhar',
  title: 'Full-Stack Developer',
  location: 'Jodhpur, Rajasthan',
  availability: 'Remote ready',
  email: 'neerajarod@gmail.com',
  phone: '+91 7878-539633',
  links: {
    github: 'https://github.com/Neerajkumhar',
    linkedin: 'https://www.linkedin.com/in/neeraj-kumhar/',
    leetcode: 'https://leetcode.com/u/neerajkumhar2005',
  },
  resume: '/img/resume.pdf',
  images: {
    portrait: { src: '/img/profile.webp', width: 500, height: 500, alt: 'Neeraj Kumhar' },
    desk: {
      src: '/img/heroimg.webp',
      width: 600,
      height: 400,
      alt: 'Neeraj Kumhar working at a desk',
    },
    about: { src: '/img/2.webp', width: 600, height: 400, alt: 'Neeraj Kumhar' },
  },
  summary:
    'Full-stack developer with 3+ years building production applications across the MERN and Next.js ecosystems. Focused on real-time systems, e-commerce architecture, and performance work — including a 35% bundle-size reduction on production builds and sub-1.2s storefront loads through caching.',
};

export const stats = [
  { value: '3+', label: 'Years experience' },
  { value: '30', label: 'Public repositories' },
  { value: '109', label: 'LeetCode solved' },
  { value: '2', label: 'Degrees in CS & robotics' },
];

export const skills = [
  {
    category: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux Toolkit', 'dnd-kit', 'Chart.js'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express.js', 'Python', 'Django', 'Socket.io', 'PostgreSQL', 'MongoDB'],
  },
  {
    category: 'DevOps & Tools',
    items: ['Docker', 'AWS', 'Git', 'CI/CD', 'Vercel', 'Postman'],
  },
  {
    category: 'Core Concepts',
    items: ['Real-time Systems', 'API Optimization', 'RBAC', 'System Design', 'Data Structures'],
  },
];

// Every role here appears verbatim in resume.pdf. Nothing inferred.
export const experience = [
  {
    title: 'Freelance Full-Stack Developer',
    company: 'Independent',
    period: '2023 – Present',
    location: 'Remote',
    summary:
      'Deliver full-stack solutions for clients using React, Node.js, and Next.js.',
    achievements: [
      'Built secure, scalable APIs and optimized performance across multiple projects.',
      'Collaborated with clients and designers to refine UX and ship production-ready builds.',
    ],
  },
  {
    title: 'Web Developer Intern',
    company: 'TechFrigate',
    period: 'Jan 2025 – Jun 2025',
    location: 'Remote / Hybrid',
    summary:
      'Developed reusable frontend components and backend endpoints for live production systems.',
    achievements: [
      'Improved reliability through systematic bug fixing and code reviews.',
      'Participated in agile sprints and increased overall test coverage.',
    ],
  },
  {
    title: 'Python Trainee',
    company: 'WsCube Tech',
    period: 'May 2024 – Jul 2024',
    location: 'Jodhpur, Rajasthan',
    summary:
      'Built multiple full-stack mini-projects focused on Python, REST design, and deployment.',
    achievements: ['Integrated 10+ third-party tools and libraries to solve business problems.'],
  },
];

export const education = [
  {
    degree: 'B.Tech in Computer Science & Engineering',
    institution: 'Jodhpur Institute of Engineering and Technology (JIET)',
    period: '2024 – Present',
    location: 'Jodhpur, Rajasthan',
  },
  {
    degree: 'Diploma in Automation & Robotics',
    institution: 'Government Polytechnic College',
    period: '2022 – 2024',
    location: 'Jodhpur, Rajasthan',
  },
];

export const capabilities = [
  {
    title: 'Real-time systems',
    body: 'Socket.io channels, presence tracking, and race-condition handling for concurrent users. RBAC across admin, manager, and team roles.',
  },
  {
    title: 'E-commerce architecture',
    body: 'Multi-vendor catalogs at 500+ SKUs, Stripe checkout, and aggregation pipelines that hold query time under 100ms.',
  },
  {
    title: 'Performance work',
    body: 'Bundle reduction, image pipelines, caching strategies, and SSR. Measurable outcomes, not tuning for its own sake.',
  },
];

// Key projects from resume.pdf, with the repo that backs each where one exists.
export const featuredProjects = [
  {
    name: 'Culturcraft',
    type: 'Multi-vendor e-commerce',
    stack: ['React', 'Redux', 'MongoDB', 'Stripe'],
    outcomes: [
      'Multi-vendor store handling 500+ SKUs.',
      'Stripe checkout integrated, load times under 1.2s via caching.',
    ],
  },
  {
    name: 'TaskFlow',
    type: 'Real-time task board',
    stack: ['Next.js', 'Node.js', 'Socket.io', 'dnd-kit'],
    outcomes: [
      'Real-time board with drag-and-drop.',
      'RBAC for admin, manager, and team roles.',
    ],
  },
  {
    name: 'Employee Management System',
    type: 'HR dashboard',
    stack: ['React', 'Express', 'PostgreSQL', 'TypeScript'],
    outcomes: [
      'Payroll automation and attendance tracking.',
      'Downloadable PDF reports via server-side rendering.',
    ],
  },
  {
    name: 'PropertyPulse',
    type: 'Real estate platform',
    stack: ['Next.js', 'Node.js', 'PostgreSQL'],
    outcomes: [
      'Optimized image pipelines for listings.',
      'JWT authentication and improved SEO performance.',
    ],
  },
  {
    name: 'TalentTap',
    type: 'Recruitment platform',
    stack: ['TypeScript', 'Node.js'],
    outcomes: ['Full-stack hiring workflow built as production work.'],
  },
  {
    name: 'Parallel Image Processing System',
    type: 'Systems project',
    stack: ['C++'],
    outcomes: ['Parallel processing pipeline for batch image operations.'],
  },
];

export const contactChannels = [
  { label: 'Email', value: 'neerajarod@gmail.com', href: 'mailto:neerajarod@gmail.com' },
  { label: 'Phone', value: '+91 7878-539633', href: 'tel:+917878539633' },
  { label: 'GitHub', value: 'github.com/Neerajkumhar', href: 'https://github.com/Neerajkumhar' },
  { label: 'LinkedIn', value: 'linkedin.com/in/neeraj-kumhar', href: 'https://www.linkedin.com/in/neeraj-kumhar/' },
  { label: 'LeetCode', value: 'leetcode.com/u/neerajkumhar2005', href: 'https://leetcode.com/u/neerajkumhar2005' },
];