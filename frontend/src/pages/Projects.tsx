import React, { useEffect, useMemo, useState } from 'react';
import { ExternalLink, Github, Star, GitFork, CircleDot } from 'lucide-react';
import {
  getLanguageColor,
  getLanguages,
  formatRelativeDate,
  GITHUB_USERNAME,
  Project,
} from '../utils/github';
import { useGithubRepos } from '../hooks/useGithubRepos';

const PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;

const RepoCard: React.FC<{ project: Project }> = ({ project }) => {
  const color = getLanguageColor(project.language);

  return (
    <article className="group bg-[var(--bg-raised)] border border-[var(--rule)] rounded-sm p-5 flex flex-col transition-colors duration-150 hover:border-[var(--rule-strong)]">
      <div className="flex items-start justify-between gap-3">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[0.95rem] text-[var(--text)] hover:text-[var(--accent)] transition-colors duration-150 break-all"
        >
          {project.title}
        </a>
        {project.language !== 'Other' && (
          <span className="label shrink-0 inline-flex items-center gap-1.5 text-[var(--text-soft)]">
            {/* Dot carries the language color; the label text stays on token
                color because GitHub's palette fails WCAG AA as small text. */}
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} aria-hidden="true" />
            {project.language}
          </span>
        )}
      </div>

      <p className="mt-3 text-[var(--text-soft)] text-[0.9rem] leading-relaxed flex-1">
        {project.description}
      </p>

      <div className="mt-5 flex items-center gap-4 label text-[var(--text-faint)]">
        <span className="inline-flex items-center gap-1">
          <Star className="h-3.5 w-3.5" /> {project.stars}
        </span>
        <span className="inline-flex items-center gap-1">
          <GitFork className="h-3.5 w-3.5" /> {project.forks}
        </span>
        <span className="inline-flex items-center gap-1">
          <CircleDot className="h-3.5 w-3.5" /> {project.issues}
        </span>
        <span className="ml-auto">{formatRelativeDate(project.updatedAt)}</span>
      </div>

      <div className="mt-4 pt-4 border-t border-[var(--rule)] flex items-center gap-4">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="label text-[var(--text-soft)] hover:text-[var(--accent)] transition-colors duration-150 inline-flex items-center gap-1.5 py-1"
        >
          <Github className="h-3.5 w-3.5" /> Code
        </a>
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="label text-[var(--text-soft)] hover:text-[var(--accent)] transition-colors duration-150 inline-flex items-center gap-1.5 py-1"
          >
            <ExternalLink className="h-3.5 w-3.5" /> Live demo
          </a>
        )}
      </div>
    </article>
  );
};

const Projects: React.FC = () => {
  const { repos, loading, error, retry } = useGithubRepos();
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const languages = useMemo(() => getLanguages(repos), [repos]);

  useEffect(() => {
    if (selectedLanguage !== 'All' && !languages.includes(selectedLanguage)) {
      setSelectedLanguage('All');
    }
  }, [languages, selectedLanguage]);

  const filteredRepos = useMemo(
    () =>
      selectedLanguage === 'All'
        ? repos
        : repos.filter((repo) => repo.language === selectedLanguage),
    [repos, selectedLanguage],
  );

  const filterOptions = ['All', ...languages];

  return (
    <div className="animate-fade-in">
      <section className="max-w-6xl mx-auto px-5 sm:px-8 pt-20 pb-12 sm:pt-28">
        <p className="label text-[var(--text-faint)] mb-6">{GITHUB_USERNAME}</p>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight max-w-3xl">
          Every public repository, pulled live from GitHub.
        </h1>
        <p className="mt-7 text-lg text-[var(--text-soft)] max-w-prose">
          {!loading && !error && repos.length > 0 &&
            `${repos.length} repositories across ${languages.length} ${
              languages.length === 1 ? 'language' : 'languages'
            }. Sorted by last push. Forked and archived repositories are excluded.`}
        </p>

        <a
          href={PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center px-5 py-2.5 border border-[var(--rule-strong)] text-[var(--text)] rounded-sm hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors duration-150 text-sm font-medium"
        >
          <Github className="mr-2 h-4 w-4" />@{GITHUB_USERNAME}
        </a>
      </section>

      {/* Filter */}
      {!loading && !error && repos.length > 0 && (
        <div className="border-y border-[var(--rule)]">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4 flex items-center gap-4 flex-wrap">
            <span className="label text-[var(--text-faint)]">Filter</span>

            <div className="hidden sm:flex flex-wrap items-center gap-1">
              {filterOptions.map((language) => (
                <button
                  key={language}
                  onClick={() => setSelectedLanguage(language)}
                  aria-pressed={selectedLanguage === language}
                  className={`label px-2.5 py-1.5 rounded-sm transition-colors duration-150 ${
                    selectedLanguage === language
                      ? 'bg-[var(--accent-solid)] text-white'
                      : 'text-[var(--text-faint)] hover:text-[var(--text)]'
                  }`}
                >
                  {language}
                </button>
              ))}
            </div>

            <div className="sm:hidden relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                aria-expanded={isFilterOpen}
                className="label text-[var(--text)] border border-[var(--rule-strong)] px-3 py-1.5 rounded-sm"
              >
                {selectedLanguage}
              </button>
              {isFilterOpen && (
                <div className="absolute right-0 mt-1.5 w-44 bg-[var(--bg-raised)] border border-[var(--rule)] rounded-sm py-1 z-10 max-h-64 overflow-y-auto">
                  {filterOptions.map((language) => (
                    <button
                      key={language}
                      onClick={() => {
                        setSelectedLanguage(language);
                        setIsFilterOpen(false);
                      }}
                      className={`block w-full text-left px-3 py-2 label transition-colors duration-150 ${
                        selectedLanguage === language
                          ? 'text-[var(--accent)]'
                          : 'text-[var(--text-soft)]'
                      }`}
                    >
                      {language}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <span className="label text-[var(--text-faint)] ml-auto">
              {filteredRepos.length} shown
            </span>
          </div>
        </div>
      )}

      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-14">
        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 9 }).map((_, index) => (
              <div
                key={index}
                className="border border-[var(--rule)] rounded-sm p-5 h-48 animate-pulse bg-[var(--bg-raised)]"
              />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="max-w-lg mx-auto text-center py-16">
            <p className="font-display text-2xl mb-3">Could not load repositories</p>
            <p className="text-[var(--text-soft)] mb-7">{error}</p>
            <button
              onClick={retry}
              className="px-5 py-2.5 bg-[var(--accent-solid)] text-white rounded-sm hover:bg-[var(--accent-hover)] transition-colors duration-150 text-sm font-medium"
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && filteredRepos.length === 0 && (
          <p className="text-[var(--text-faint)] py-16 text-center">No repositories match this filter.</p>
        )}

        {!loading && !error && filteredRepos.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredRepos.map((repo) => (
              <RepoCard key={repo.id} project={repo} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Projects;
