import React, { useState } from 'react';
import { ExternalLink, Github, Filter } from 'lucide-react';
import { projects, categories, Project } from '../data/projects';

const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const featuredProjects = projects.filter(project => project.featured);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600">Projects</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
              A collection of projects I've worked on, showcasing different technologies and approaches to solving real-world problems.
            </p>
            
            {/* Filter Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Desktop Filter */}
              <div className="hidden sm:flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                <span className="text-gray-600 dark:text-gray-300">Filter by:</span>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === category
                        ? 'bg-primary-600 text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Mobile Filter */}
              <div className="sm:hidden w-full max-w-xs">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="w-full flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-300"
                >
                  <span>Filter: {selectedCategory}</span>
                  <Filter className="h-5 w-5" />
                </button>
                {isFilterOpen && (
                  <div className="absolute z-10 mt-2 w-full max-w-xs bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category);
                          setIsFilterOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                          selectedCategory === category ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-300'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      {selectedCategory === 'All' && (
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              Featured Projects
            </h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {featuredProjects.slice(0, 2).map((project, index) => (
                <ProjectCard key={project.id} project={project} featured index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Projects */}
      <section className={`py-20 ${selectedCategory === 'All' ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            {selectedCategory === 'All' ? 'All Projects' : `${selectedCategory} Projects`}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, featured = false, index }) => {
  return (
    <div
      className={`bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-2 animate-slide-up ${
        featured ? 'lg:col-span-1' : ''
      }`}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="relative overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-primary-600 text-white text-xs rounded-full">
            {project.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {project.description}
        </p>
        
        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs rounded"
            >
              {tech}
            </span>
          ))}
        </div>
        
        {/* Action Buttons */}
        <div className="flex space-x-3">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center px-4 py-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:border-primary-600 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <Github className="mr-2 h-4 w-4" />
              Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;