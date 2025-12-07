export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export const projects: Project[] = [
  // Promoted case studies first
  {
    id: '2',
    title: 'Task Management App',
    description: 'Collaborative productivity tool. Built with Next.js and Node. Implemented Drag-and-Drop (dnd-kit), live team updates via WebSockets, and role-based access control (RBAC).',
    image: '/img/taskflow.png',
    technologies: ['Next.js', 'Node.js', 'dnd-kit', 'WebSockets', 'TypeScript'],
    category: 'Full Stack',
    demoUrl: 'https://remarkable-mandazi-a53c25.netlify.app/',
    githubUrl: 'https://github.com/Neerajkumhar/taskflow',
    featured: true,
  },

  {
    id: '4',
    title: 'Employee Management System',
    description: 'Full-stack HR dashboard. Features: Payroll calculation automation, attendance tracking, and PDF report generation. Backend powered by Express and PostgreSQL.',
    image: '/img/employee.png',
    technologies: ['React', 'Express', 'PostgreSQL', 'TypeScript'],
    category: 'Full Stack',
    demoUrl: 'https://vagwiin-emp.vercel.app/',
    githubUrl: 'https://github.com/Neerajkumhar/Vagwiin-Emp',
    featured: true,
  },

  {
    id: '7',
    title: 'Vagwiin Website',
    description: 'Marketing & portfolio site with client-side React and asset optimization. Implements accessibility-first design, dark mode, and CI/CD deployment for fast, reliable updates.',
    image: '/img/vagwiin-2.png',
    technologies: ['React', 'Node', 'MongoDB'],
    category: 'Full Stack',
    demoUrl: 'https://vagwiin.vercel.app/',
    githubUrl: 'https://github.com/visuark-core/Vagwiin-frontend',
    featured: true,
  },

  {
    id: '8',
    title: 'Culturaft Website (E-commerce of Furniture)',
    description: 'Multi-vendor marketplace handling 500+ SKUs. Features: Real-time inventory syncing (Socket.io), secure Stripe integration, and a Redux-managed cart system. Reduced page load to <1.2s.',
    image: '/img/culturaft.png',
    technologies: ['React', 'Redux', 'MongoDB', 'TypeScript'],
    category: 'Full Stack',
    demoUrl: 'https://cultureaft.vercel.app/',
    githubUrl: 'https://github.com/visuark-core/cultureaft',
    featured: true,
  },

  {
    id: '1',
    title: 'Car Dealership Website',
    description: 'Inventory management dashboard featuring role-based authentication (JWT), image optimization pipelines, and a Next.js frontend.',
    image: 'https://visuark.vercel.app/img/Car-Dealership.png',
    technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'TypeScript'],
    category: 'Full Stack',
    demoUrl: 'https://neerajkumhar.github.io/Car-Delership-website/',
    githubUrl: 'https://github.com/Neerajkumhar/Car-Delership-website',
    featured: false,
  },

  {
    id: '3',
    title: 'Property Dealer Website',
    description: 'A responsive Property Dealer dashboard with location-based houses, interactive maps, and 3D property visualization.',
    image: '/img/propertypulse.png',
    technologies: ['React', 'Chart.js', 'Map API', 'Tailwindcss'],
    category: 'Backend',
    demoUrl: 'https://dashing-beignet-75a287.netlify.app/',
    githubUrl: 'https://github.com/Neerajkumhar/PropertyPulse',
    featured: false,
  },
];

export const categories = ['All', 'Frontend', 'Backend', 'Full Stack'];