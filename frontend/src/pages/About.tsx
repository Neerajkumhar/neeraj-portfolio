import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowDownToLine,
  ArrowRight,
  Briefcase,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  User,
  Zap,
} from 'lucide-react';
import { profile, skills, experience, education } from '../data/profile';

const fields = [
  { icon: User, label: 'Name', value: profile.name },
  { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  {
    icon: Phone,
    label: 'Phone',
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s/g, '')}`,
  },
  { icon: MapPin, label: 'Location', value: profile.location },
  { icon: Zap, label: 'Availability', value: profile.availability },
];

const About: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="animate-fade-in">
      <section className="max-w-6xl mx-auto px-5 sm:px-8 pt-20 pb-12 sm:pt-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16 items-center">
          <div>
            <p className="label text-[var(--text-faint)] mb-6">About</p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight">
              The short version, with the details below.
            </h1>
            <p className="mt-7 text-lg text-[var(--text-soft)] leading-relaxed">
              {profile.summary}
            </p>

            <a
              href={profile.resume}
              download
              className="mt-8 inline-flex items-center px-5 py-2.5 border border-[var(--rule-strong)] text-[var(--text)] rounded-sm hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors duration-150 text-sm font-medium"
            >
              <ArrowDownToLine className="mr-2 h-4 w-4" aria-hidden="true" />
              Download resume
            </a>
          </div>

          {/* Hero image. 600x400 source, so h-auto keeps the native 3:2. */}
          <figure>
            <img
              src={profile.images.about.src}
              alt={profile.images.about.alt}
              width={profile.images.about.width}
              height={profile.images.about.height}
              fetchPriority="high"
              decoding="async"
              className="w-full h-auto rounded-sm border border-[var(--rule)]"
            />
          </figure>
        </div>
      </section>

      {/* Key/value fields */}
      <section className="border-t border-[var(--rule)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
          <dl className="grid gap-x-12 gap-y-6 sm:grid-cols-2">
            {fields.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-4">
                <span className="mt-0.5 text-[var(--accent)]">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <dt className="label text-[var(--text-faint)] w-24 shrink-0 pt-0.5">{label}</dt>
                <dd className="text-[var(--text)] break-words">
                  {href ? (
                    <a
                      href={href}
                      className="hover:text-[var(--accent)] transition-colors duration-150"
                    >
                      {value}
                    </a>
                  ) : (
                    value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Skills */}
      <section className="border-t border-[var(--rule)] bg-[var(--bg-sunken)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
          <h2 className="section-heading">Skills</h2>
          <div className="mt-10 grid gap-x-12 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((group) => (
              <div key={group.category}>
                <h3 className="label text-[var(--accent)]">{group.category}</h3>
                <ul className="mt-3 space-y-1.5">
                  {group.items.map((item) => (
                    <li key={item} className="text-[var(--text-soft)]">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="border-t border-[var(--rule)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
          <h2 className="section-heading">Experience</h2>
          <div className="mt-10 space-y-8">
            {experience.map((role) => (
              <article
                key={role.title}
                className="border-t border-[var(--rule)] pt-8 first:border-t-0 first:pt-0 grid gap-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] sm:gap-10"
              >
                <div className="flex gap-4">
                  <span className="mt-1 text-[var(--accent)] shrink-0">
                    <Briefcase className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg">{role.title}</h3>
                    <p className="text-[var(--text-soft)] mt-0.5">{role.company}</p>
                    <p className="label text-[var(--text-faint)] mt-2">{role.period}</p>
                    <p className="label text-[var(--text-faint)] mt-1">{role.location}</p>
                  </div>
                </div>

                <div className="text-[var(--text-soft)] leading-relaxed">
                  <p>{role.summary}</p>
                  <ul className="mt-4 space-y-2">
                    {role.achievements.map((achievement) => (
                      <li key={achievement} className="flex gap-3">
                        <span aria-hidden="true" className="text-[var(--accent)] select-none">
                          &rsaquo;
                        </span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="border-t border-[var(--rule)] bg-[var(--bg-sunken)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
          <h2 className="section-heading">Education</h2>
          <div className="mt-10 space-y-8">
            {education.map((entry) => (
              <article
                key={entry.degree}
                className="border-t border-[var(--rule)] pt-8 first:border-t-0 first:pt-0 flex gap-4"
              >
                <span className="mt-1 text-[var(--accent)] shrink-0">
                  <GraduationCap className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-lg">{entry.degree}</h3>
                  <p className="text-[var(--text-soft)] mt-0.5">{entry.institution}</p>
                  <p className="label text-[var(--text-faint)] mt-2">
                    {entry.period} &middot; {entry.location}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Second image. Same 3:2 source ratio, full container width so its left
          and right edges line up with the section text. */}
      <section className="border-t border-[var(--rule)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
          <figure>
            <img
              src={profile.images.desk.src}
              alt={profile.images.desk.alt}
              width={profile.images.desk.width}
              height={profile.images.desk.height}
              loading="lazy"
              decoding="async"
              className="w-full h-auto rounded-sm border border-[var(--rule)]"
            />
          </figure>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[var(--rule)] bg-[var(--bg-sunken)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-20 text-center">
          <h2 className="section-heading max-w-2xl mx-auto">Want the full picture?</h2>
          <p className="mt-5 text-[var(--text-soft)] max-w-prose mx-auto leading-relaxed">
            Every public repository is pulled live from GitHub on the projects page.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/projects"
              className="inline-flex items-center px-5 py-2.5 bg-[var(--accent-solid)] text-white rounded-sm hover:bg-[var(--accent-hover)] transition-colors duration-150 text-sm font-medium"
            >
              Browse projects
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-5 py-2.5 border border-[var(--rule-strong)] text-[var(--text)] rounded-sm hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors duration-150 text-sm font-medium"
            >
              Contact me
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
