import React, { useEffect, useState } from 'react';
import { profile } from '../data/profile';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  };

  // No backend exists, so the form composes a real email rather than
  // pretending to POST somewhere.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.message.trim()) {
      setError('Add your name and a message so the email has somewhere to go.');
      return;
    }

    const subject = encodeURIComponent(`Portfolio enquiry from ${formData.name.trim()}`);
    const body = encodeURIComponent(
      `${formData.message.trim()}\n\n—\n${formData.name.trim()}${
        formData.email.trim() ? `\n${formData.email.trim()}` : ''
      }`
    );

    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  const channels = [
    { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    { label: 'Phone', value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` },
    { label: 'Location', value: `${profile.location} · ${profile.availability}` },
    { label: 'GitHub', value: 'github.com/Neerajkumhar', href: profile.links.github },
    { label: 'LinkedIn', value: 'linkedin.com/in/neeraj-kumhar', href: profile.links.linkedin },
    { label: 'LeetCode', value: 'leetcode.com/u/neerajkumhar2005', href: profile.links.leetcode },
  ];

  const fieldClass =
    'w-full px-3.5 py-2.5 bg-[var(--bg-raised)] border border-[var(--rule-strong)] rounded-sm text-[var(--text)] placeholder:text-[var(--text-faint)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition-colors duration-150';

  return (
    <div className="animate-fade-in">
      <section className="max-w-6xl mx-auto px-5 sm:px-8 pt-20 pb-12 sm:pt-28">
        <p className="label text-[var(--text-faint)] mb-6">Contact</p>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight max-w-3xl">
          Available for remote work and freelance contracts.
        </h1>
        <p className="mt-7 text-lg text-[var(--text-soft)] max-w-prose">
          If you have a product that needs shipping or a backlog that needs clearing, email is the
          fastest route. I reply to everything.
        </p>
      </section>

      <section className="border-t border-[var(--rule)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-x-16 gap-y-14">
          {/* Channels */}
          <div>
            <h2 className="label text-[var(--text-faint)] pb-4 border-b border-[var(--rule)]">
              Direct
            </h2>
            <dl>
              {channels.map((channel) => (
                <div
                  key={channel.label}
                  className="py-4 border-b border-[var(--rule)] grid grid-cols-[6rem_minmax(0,1fr)] gap-4 items-baseline"
                >
                  <dt className="label text-[var(--text-faint)]">{channel.label}</dt>
                  <dd className="font-mono text-sm text-[var(--text-soft)] break-all">
                    {channel.href ? (
                      <a
                        href={channel.href}
                        target={channel.href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="hover:text-[var(--accent)] transition-colors duration-150"
                      >
                        {channel.value}
                      </a>
                    ) : (
                      channel.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Mail composer */}
          <div>
            <h2 className="label text-[var(--text-faint)] pb-4 border-b border-[var(--rule)]">
              Write a message
            </h2>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
              <div>
                <label htmlFor="name" className="label text-[var(--text-faint)] block mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={fieldClass}
                  placeholder="Your name"
                  autoComplete="name"
                />
              </div>

              <div>
                <label htmlFor="email" className="label text-[var(--text-faint)] block mb-2">
                  Email <span className="normal-case tracking-normal">(optional)</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={fieldClass}
                  placeholder="you@company.com"
                  autoComplete="email"
                />
              </div>

              <div>
                <label htmlFor="message" className="label text-[var(--text-faint)] block mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={7}
                  className={`${fieldClass} resize-y`}
                  placeholder="What are you building, and what do you need help with?"
                />
              </div>

              {error && (
                <p role="alert" className="text-sm text-[var(--accent)]">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="w-full sm:w-auto px-5 py-2.5 bg-[var(--accent-solid)] text-white rounded-sm hover:bg-[var(--accent-hover)] transition-colors duration-150 text-sm font-medium"
              >
                Open in mail client
              </button>

              <p className="text-sm text-[var(--text-faint)] leading-relaxed">
                This opens your own mail app with the message pre-filled. Or write directly to{' '}
                <a
                  href={`mailto:${profile.email}`}
                  className="text-[var(--accent)] hover:underline"
                >
                  {profile.email}
                </a>
                .
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
