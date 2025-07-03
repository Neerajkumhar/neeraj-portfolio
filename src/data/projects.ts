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
  {
    id: '1',
    title: 'Car Dealership Website',
    description: 'A full-stack car dealership solution with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, inventory management, and admin dashboard.',
    image: 'https://media.istockphoto.com/id/460913341/photo/salesman-selling-a-car-to-young-businessman.jpg?s=612x612&w=0&k=20&c=TuQHMYhLzXhFCjjtKO4tWMag1pOhGy8NAXS50CJmPjM=',
    technologies: ['Html', 'Css', 'Javascript'],
    category: 'Full Stack',
    demoUrl: 'https://neerajkumhar.github.io/Car-Delership-website/',
    githubUrl: 'https://github.com/Neerajkumhar/Car-Delership-website',
    featured: true,
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features built with React and Firebase.',
    image: 'https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg?auto=compress&cs=tinysrgb&w=600',
    technologies: ['React', 'Firebase', 'Material-UI', 'TypeScript'],
    category: 'Frontend',
    demoUrl: 'https://remarkable-mandazi-a53c25.netlify.app/',
    githubUrl: 'https://github.com/Neerajkumhar/taskflow',
    featured: true,
  },
  {
    id: '3',
    title: 'Property Dealer Website',
    description: 'A responsive Property Dealer dashboard with location-based houses, interactive maps, and 3d property visualization using modern web technologies.',
    image: 'https://wallpapers.com/images/high/real-estate-background-cpj4gmarjlovj8g1.webp',
    technologies: ['React.js', 'Chart.js', 'Map API', 'Tailwindcss'],
    category: 'Backend',
    demoUrl: 'https://dashing-beignet-75a287.netlify.app/',
    githubUrl: 'https://github.com/Neerajkumhar/PropertyPulse',
    featured: false,
  },
  {
    id: '4',
    title: 'Employee Management System',
    description: 'A employee management system built with react.js, featuring employee salary, employee department, request for leave, and comprehensive logging.',
    image: 'https://images.pexels.com/photos/140945/pexels-photo-140945.jpeg',
    technologies: ['react.js', 'Express', 'Redis', 'github'],
    category: 'Frontend',
    demoUrl: 'https://vagwiin-emp.vercel.app/',
    githubUrl: 'https://github.com/Neerajkumhar/Vagwiin-Emp',
    featured: false,
  },
  {
    id: '5',
    title: 'Recipe Media Application',
    description: 'A modern Recipe application with real-time Recipe Storing, file sharing, emoji reactions, and group chat functionality using Socket.io and React.',
    image: 'https://media.istockphoto.com/id/1044645782/photo/chef-cook-preparing-vegetables-in-his-kitchen.jpg?s=2048x2048&w=is&k=20&c=eY3iEBbUU6Es6aI6A6YV9EOV5mUGFUFu8tjyH2EXtAQ=',
    technologies: ['React', 'Socket.io', 'Node.js', 'MongoDB', 'JWT'],
    category: 'Full Stack',
    demoUrl: 'https://recipemedia.vercel.app/signin',
    githubUrl: 'https://github.com/Neerajkumhar/Recipe-Media',
    featured: true,
  },
  {
    id: '6',
    title: 'Portfolio Website',
    description: 'A responsive portfolio website built with modern web technologies, featuring dark mode, smooth animations, and optimized performance.',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
    technologies: ['Html', 'Css', 'JavaScript'],
    category: 'Frontend',
    demoUrl: 'https://neerajkumhar.github.io/Master-Sunil/',
    githubUrl: 'https://github.com/Neerajkumhar/Master-Sunil',
    featured: false,
  },
];

export const categories = ['All', 'Frontend', 'Backend', 'Full Stack'];