import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import { blogPosts } from '../data/blog';

const Blog: React.FC = () => {
  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600">Blog</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Thoughts, tutorials, and insights about web development, technology trends, and best practices.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Featured Article
          </h2>
          <div className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl overflow-hidden shadow-xl animate-slide-up">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover min-h-[300px]"
                />
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex flex-wrap gap-2 mb-4">
                  {featuredPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {featuredPost.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-6">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="mr-4">{new Date(featuredPost.date).toLocaleDateString()}</span>
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{featuredPost.readTime} min read</span>
                </div>
                <Link
                  to={`/blog/${featuredPost.id}`}
                  className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold"
                >
                  Read Full Article
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Posts */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Recent Articles
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {otherPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

interface BlogCardProps {
  post: typeof blogPosts[0];
  index: number;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, index }) => {
  return (
    <article
      className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1 animate-slide-up"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="relative overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <div className="flex items-center space-x-1">
            <Tag className="h-3 w-3 text-white" />
            <span className="text-white text-xs bg-black/50 px-2 py-1 rounded">
              {post.tags[0]}
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
          <Link to={`/blog/${post.id}`}>
            {post.title}
          </Link>
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
            <Calendar className="h-4 w-4 mr-1" />
            <span className="mr-3">{new Date(post.date).toLocaleDateString()}</span>
            <Clock className="h-4 w-4 mr-1" />
            <span>{post.readTime} min</span>
          </div>
          <Link
            to={`/blog/${post.id}`}
            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm"
          >
            Read More →
          </Link>
        </div>
      </div>
    </article>
  );
};

export default Blog;