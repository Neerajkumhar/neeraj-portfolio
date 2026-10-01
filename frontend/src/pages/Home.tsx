import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowDownToLine, Github, Linkedin, Mail, MapPin, Zap } from 'lucide-react';
import { profile, stats, capabilities, featuredProjects } from '../data/profile';

const socials = [
  { href: profile.links.github, icon: Github, label: 'GitHub' },
  { href: profile.links.linkedin, icon: Linkedin, label: 'LinkedIn' },
  { href: `mailto:${profile.email}`, icon: Mail, label: 'Email' },
];

const Home: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 pt-20 pb-16 sm:pt-28 sm:pb-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-16 items-center">
          <div>
            <p className="label text-[var(--accent)]">Hello, I&rsquo;m</p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight mt-4">
              {profile.name}
            </h1>
            <p className="font-display text-xl sm:text-2xl text-[var(--text-soft)] mt-4">
              {profile.title}
            </p>

            <p className="mt-7 text-lg text-[var(--text-soft)] max-w-prose leading-relaxed">
              {profile.summary}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                to="/projects"
                className="inline-flex items-center px-5 py-2.5 bg-[var(--accent-solid)] text-white rounded-sm hover:bg-[var(--accent-hover)] transition-colors duration-150 text-sm font-medium"
              >
                View projects
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={profile.resume}
                download
                className="inline-flex items-center px-5 py-2.5 border border-[var(--rule-strong)] text-[var(--text)] rounded-sm hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors duration-150 text-sm font-medium"
              >
                <ArrowDownToLine className="mr-2 h-4 w-4" aria-hidden="true" />
                Download resume
              </a>
            </div>

            <dl className="mt-12 pt-8 border-t border-[var(--rule)] grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="label text-[var(--text-faint)]">{stat.label}</dt>
                  <dd className="font-display text-3xl mt-1">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <figure>
            {/* Square source, so `h-auto` with the intrinsic width/height keeps
                it 1:1 instead of cropping it into a banner. */}
            <img
              src={profile.images.portrait.src}
              alt={profile.images.portrait.alt}
              width={profile.images.portrait.width}
              height={profile.images.portrait.height}
              fetchPriority="high"
              decoding="async"
              className="w-full max-w-md h-auto rounded-sm border border-[var(--rule)]"
            />
          </figure>
        </div>
      </section>

      {/* Capabilities */}
      <section className="border-y border-[var(--rule)] bg-[var(--bg-sunken)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
          <p className="label text-[var(--accent)]">What I work on</p>
          <div className="mt-8 grid gap-10 md:grid-cols-3">
            {capabilities.map((capability) => (
              <div key={capability.title}>
                <h2 className="font-display text-xl">{capability.title}</h2>
                <p className="mt-3 text-[var(--text-soft)] leading-relaxed">
                  {capability.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Selected work */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="section-heading">Selected work</h2>
          <Link
            to="/projects"
            className="label text-[var(--text-soft)] hover:text-[var(--accent)] transition-colors duration-150 inline-flex items-center py-1"
          >
            All repositories
            <ArrowRight className="ml-2 h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.slice(0, 6).map((project) => (
            <article
              key={project.name}
              className="bg-[var(--bg-raised)] border border-[var(--rule)] rounded-sm p-5 flex flex-col"
            >
              <h3 className="font-display text-lg">{project.name}</h3>
              <p className="label text-[var(--accent)] mt-1">{project.type}</p>

              <ul className="mt-4 space-y-2 text-[var(--text-soft)] text-[0.9rem] flex-1">
                {project.outcomes.map((outcome) => (
                  <li key={outcome} className="flex gap-3">
                    <span aria-hidden="true" className="text-[var(--accent)] select-none">
                      &rsaquo;
                    </span>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 pt-4 border-t border-[var(--rule)] flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="label text-[var(--text-faint)] border border-[var(--rule)] rounded-sm px-2 py-0.5"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[var(--rule)] bg-[var(--bg-sunken)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-20 text-center">
          <h2 className="section-heading max-w-2xl mx-auto">
            Have something that needs shipping?
          </h2>
          <p className="mt-5 text-[var(--text-soft)] max-w-prose mx-auto leading-relaxed">
            I&rsquo;m {profile.availability.toLowerCase()} and take on freelance work. Email is the
            fastest way to reach me.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <Link
              to="/contact"
              className="inline-flex items-center px-5 py-2.5 bg-[var(--accent-solid)] text-white rounded-sm hover:bg-[var(--accent-hover)] transition-colors duration-150 text-sm font-medium"
            >
              Get in touch
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href={`mailto:${profile.email}`}
              className="label text-[var(--text-soft)] hover:text-[var(--accent)] transition-colors duration-150 inline-flex items-center py-1"
            >
              <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
              {profile.email}
            </a>
          </div>

          <div className="mt-10 flex items-center justify-center gap-6">
            {socials.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="-m-1.5 p-1.5 text-[var(--text-soft)] hover:text-[var(--accent)] transition-colors duration-150"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </a>
            ))}
          </div>

          <p className="mt-8 inline-flex items-center gap-2 label text-[var(--text-faint)]">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            {profile.location}
            <span aria-hidden="true">&middot;</span>
            <Zap className="h-3.5 w-3.5" aria-hidden="true" />
            {profile.availability}
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
