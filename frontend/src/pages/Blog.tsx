import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BlogPost, getPostsByDate } from '../data/blog';

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

const PostRow: React.FC<{ post: BlogPost }> = ({ post }) => (
  <article className="group py-7 border-b border-[var(--rule)] grid md:grid-cols-[7rem_minmax(0,1fr)] gap-x-8 gap-y-2">
    <p className="label text-[var(--text-faint)] md:pt-1.5">{formatDate(post.date)}</p>
    <div>
      <h2 className="font-display text-xl sm:text-2xl leading-snug">
        <Link to={`/blog/${post.id}`} className="hover:text-[var(--accent)] transition-colors duration-150">
          {post.title}
        </Link>
      </h2>
      <p className="mt-2.5 text-[var(--text-soft)] leading-relaxed">{post.excerpt}</p>
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
        {post.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="label text-[var(--text-faint)]">
            {tag}
          </span>
        ))}
        <span className="label text-[var(--text-faint)]">{post.readTime} min read</span>
      </div>
    </div>
  </article>
);

const Blog: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const allPosts = getPostsByDate();
  const featuredPost = allPosts[0];
  const otherPosts = allPosts.slice(1);

  if (!featuredPost) {
    return (
      <div className="min-h-screen pt-20 pb-12 px-5 sm:px-8 flex flex-col items-center justify-center">
        <h2 className="section-heading mb-3">No posts yet</h2>
        <p className="text-[var(--text-soft)]">Check back later for new articles.</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <section className="max-w-6xl mx-auto px-5 sm:px-8 pt-20 pb-12 sm:pt-28">
        <p className="label text-[var(--text-faint)] mb-6">Writing</p>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight max-w-3xl">
          Notes on building for the web.
        </h1>
        <p className="mt-7 text-lg text-[var(--text-soft)] max-w-prose">
          Architecture decisions, performance work, and the occasional CSS rabbit hole — written up
          from production projects.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="pb-4 border-b border-[var(--rule-strong)]">
          <span className="label text-[var(--text-faint)]">Latest</span>
          <h2 className="font-display text-xl mt-1.5">{featuredPost.title}</h2>
          <p className="mt-2.5 text-[var(--text-soft)] max-w-prose leading-relaxed">
            {featuredPost.excerpt}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="label text-[var(--text-faint)]">{formatDate(featuredPost.date)}</span>
            <span className="label text-[var(--text-faint)]">{featuredPost.readTime} min read</span>
            {featuredPost.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="label text-[var(--text-faint)]">
                {tag}
              </span>
            ))}
          </div>
          <Link
            to={`/blog/${featuredPost.id}`}
            className="mt-5 inline-flex items-center py-1 label text-[var(--accent)] hover:underline"
          >
            Read article →
          </Link>
        </div>

        {otherPosts.length > 0 && (
          <>
            <h2 className="label text-[var(--text-faint)] pt-12 pb-1">Archive</h2>
            {otherPosts.map((post) => (
              <PostRow key={post.id} post={post} />
            ))}
          </>
        )}
      </section>
    </div>
  );
};

export default Blog;
