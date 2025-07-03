import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { blogPosts } from '../data/blog';

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Post Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            The blog post you're looking for doesn't exist.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/blog"
            className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mb-8 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
          
          <div className="text-center">
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 animate-slide-up">
              {post.title}
            </h1>
            
            <div className="flex items-center justify-center text-gray-500 dark:text-gray-400 mb-8 animate-slide-up" style={{ animationDelay: '150ms' }}>
              <Calendar className="h-5 w-5 mr-2" />
              <span className="mr-6">{new Date(post.date).toLocaleDateString()}</span>
              <Clock className="h-5 w-5 mr-2" />
              <span>{post.readTime} min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-8 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl shadow-2xl animate-slide-up" style={{ animationDelay: '300ms' }}>
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg dark:prose-invert max-w-none animate-slide-up" style={{ animationDelay: '450ms' }}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 mt-12">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4 mt-10">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3 mt-8">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {children}
                  </p>
                ),
                code: ({ children, className }) => {
                  const isInline = !className;
                  if (isInline) {
                    return (
                      <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm text-primary-600 dark:text-primary-400">
                        {children}
                      </code>
                    );
                  }
                  return (
                    <code className="block bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
                      {children}
                    </code>
                  );
                },
                ul: ({ children }) => (
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-6 space-y-2">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside text-gray-600 dark:text-gray-300 mb-6 space-y-2">
                    {children}
                  </ol>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-primary-600 pl-6 my-6 text-gray-600 dark:text-gray-300 italic">
                    {children}
                  </blockquote>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            More Articles
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {blogPosts
              .filter(p => p.id !== post.id)
              .slice(0, 2)
              .map((relatedPost, index) => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.id}`}
                  className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1 animate-slide-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <img
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <Tag className="h-4 w-4 text-primary-600 dark:text-primary-400 mr-2" />
                      <span className="text-primary-600 dark:text-primary-400 text-sm">
                        {relatedPost.tags[0]}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {relatedPost.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;