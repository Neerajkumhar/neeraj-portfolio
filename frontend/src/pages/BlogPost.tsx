import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getPostById, getPostsByDate } from '../data/blog';

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

// Every post's markdown opens by repeating its own title as an `# h1`. The page
// header already renders that title, so strip it to avoid two <h1>s per page.
const stripLeadingTitle = (markdown: string) =>
  markdown.replace(/^\s*#\s+.*(?:\r?\n)+/, '');

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = getPostById(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const relatedPosts = getPostsByDate()
    .filter((candidate) => candidate.id !== post?.id)
    .slice(0, 2);

  if (!post) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-5 sm:px-8">
        <div className="text-center">
          <p className="label text-[var(--text-faint)] mb-3">404</p>
          <h1 className="font-display text-3xl mb-3">Post not found</h1>
          <p className="text-[var(--text-soft)] mb-8">
            That article doesn&apos;t exist or has been moved.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center px-5 py-2.5 border border-[var(--rule-strong)] text-[var(--text)] rounded-sm hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors duration-150 text-sm font-medium"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            All articles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <article className="max-w-3xl mx-auto px-5 sm:px-8 pt-16 sm:pt-20 pb-12">
        <Link
          to="/blog"
          className="inline-flex items-center py-1 label text-[var(--text-faint)] hover:text-[var(--accent)] transition-colors duration-150 mb-8"
        >
          <ArrowLeft className="mr-2 h-3.5 w-3.5" />
          All articles
        </Link>

        <header className="pb-8 border-b border-[var(--rule)]">
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.12]">
            {post.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="label text-[var(--text-faint)]">{formatDate(post.date)}</span>
            <span className="label text-[var(--text-faint)]">{post.readTime} min read</span>
            {post.tags.map((tag) => (
              <span key={tag} className="label text-[var(--text-faint)]">
                {tag}
              </span>
            ))}
          </div>
        </header>

        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="mt-10 w-full h-52 sm:h-72 object-cover rounded-sm"
          />
        )}

        <div className="prose-body mt-12 max-w-prose">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{stripLeadingTitle(post.content)}</ReactMarkdown>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="border-t border-[var(--rule)]">
          <div className="max-w-3xl mx-auto px-5 sm:px-8 py-14">
            <h2 className="label text-[var(--text-faint)] pb-4 border-b border-[var(--rule)]">
              Read next
            </h2>
            {relatedPosts.map((related) => (
              <Link
                key={related.id}
                to={`/blog/${related.id}`}
                className="group block py-6 border-b border-[var(--rule)] last:border-b-0"
              >
                <p className="label text-[var(--text-faint)]">{formatDate(related.date)}</p>
                <h3 className="font-display text-lg mt-1.5 group-hover:text-[var(--accent)] transition-colors duration-150">
                  {related.title}
                </h3>
                <p className="mt-2 text-[var(--text-soft)] text-[0.95rem] leading-relaxed">
                  {related.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogPost;