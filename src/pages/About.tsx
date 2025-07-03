import React from 'react';
import { Download, Award, Calendar, MapPin, Heart, Code2, Palette, Database } from 'lucide-react';

const About: React.FC = () => {
  const skills = {
    'Frontend': {
      icon: <Palette className="h-6 w-6" />,
      items: ['React', 'Vue.js', 'TypeScript', 'Next.js', 'Tailwind CSS', 'SASS/SCSS', 'Webpack', 'Vite']
    },
    'Backend': {
      icon: <Database className="h-6 w-6" />,
      items: ['Node.js', 'Express.js', 'Python', 'Django', 'PostgreSQL', 'MongoDB', 'Redis', 'GraphQL']
    },
    'Tools & DevOps': {
      icon: <Code2 className="h-6 w-6" />,
      items: ['Git', 'Docker', 'AWS', 'Vercel', 'Jest', 'Cypress', 'CI/CD', 'Linux']
    }
  };

  const experience = [
    {
      title: 'Internship - Full Stack Developer',
      company: 'TechFrigate',
      period: '2025 - Present',
      description: 'Lead development of enterprise web applications serving 100k+ users. Architected microservices infrastructure and mentored junior developers.',
      achievements: ['Improved app performance by 40%', 'Led team of 5 developers', 'Implemented CI/CD pipeline']
    },
    {
      title: 'Project Lead',
      company: 'Vagwiin',
      period: '2025 - Present',
      description: 'Developed responsive web applications using React and modern CSS frameworks. Collaborated with UX designers to implement pixel-perfect designs.',
      achievements: ['Built 15+ client projects', 'Reduced bundle size by 35%', 'Introduced TypeScript to team']
    },
    {
      title: 'Junior Web Developer',
      company: 'JodhanaShop Startup',
      period: '2022 - 2024',
      description: 'Built dynamic web applications and learned full-stack development fundamentals. Contributed to both frontend and backend development.',
      achievements: ['Completed 25+ features', 'Learned 10+ technologies', 'Improved code coverage to 80%']
    }
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600">Me</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                I'm a passionate full-stack developer with over 5 years of experience creating digital experiences that make a difference. I believe in writing clean, maintainable code and building products that users love.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                  <MapPin className="h-4 w-4" />
                  <span>Jodhpur Rajasthan, IND</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                  <Calendar className="h-4 w-4" />
                  <span>5+ Years Experience</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                  <Heart className="h-4 w-4" />
                  <span>Passionate about UX</span>
                </div>
              </div>
              <a
                href="/src/img/resume.pdf"
                download
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </a>
            </div>
            <div className="animate-slide-up">
              <div className="relative">
                <img
                  src="/src/img/heroimg.png"
                  alt="Working on projects"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                  <div className="flex items-center space-x-2">
                    <Award className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white">50+</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Projects</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Technical Skills
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              I work with a diverse set of technologies to deliver comprehensive solutions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, { icon, items }], index) => (
              <div
                key={category}
                className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl animate-slide-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg text-primary-600 dark:text-primary-400">
                    {icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {category}
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {items.map((skill) => (
                    <div
                      key={skill}
                      className="px-3 py-2 bg-white dark:bg-gray-900 rounded-lg text-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Professional Experience
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              My journey in web development has been filled with exciting challenges and continuous learning
            </p>
          </div>

          <div className="space-y-8">
            {experience.map((job, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg animate-slide-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {job.title}
                    </h3>
                    <p className="text-primary-600 dark:text-primary-400 font-semibold">
                      {job.company}
                    </p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <span className="px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-sm font-medium">
                      {job.period}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {job.description}
                </p>
                <div className="space-y-2">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Key Achievements:
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                    {job.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Personal Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Beyond the Code
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  When I'm not coding, you'll find me exploring the latest in tech, contributing to open-source projects, or sharing my knowledge through blog posts and mentoring.
                </p>
                <p>
                  I'm passionate about creating inclusive and accessible web experiences that make technology available to everyone. I believe that great code should not only work well but also be maintainable and understandable by other developers.
                </p>
                <p>
                  I'm always eager to take on new challenges and collaborate with teams that share my passion for building exceptional digital products.
                </p>
              </div>
            </div>
            <div className="animate-slide-up">
              <img
                src="/src/img/2.png"
                alt="Alex in a casual setting"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;