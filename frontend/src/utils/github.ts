export const GITHUB_USERNAME = "Neerajkumhar";

const API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`;
const CACHE_KEY = "portfolio:github-repos:v1";
const CACHE_TTL_MS = 6 * 60 * 60 * 1000;
const DESCRIPTION_MAX_LENGTH = 160;

export interface Project {
  id: string;
  title: string;
  description: string;
  language: string;
  demoUrl?: string;
  githubUrl: string;
  stars: number;
  forks: number;
  issues: number;
  updatedAt: string;
}

interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  updated_at: string;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
}

export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  HTML: "#e34c26",
  CSS: "#563d7c",
  SCSS: "#c6538c",
  "C++": "#f34b7d",
  Python: "#3572A5",
  Java: "#b07219",
  Go: "#00ADD8",
  Rust: "#dea584",
  PHP: "#4F5D95",
  Shell: "#89e051",
  Jupyter: "#DA5B0B",
  "C#": "#178600",
};

const FALLBACK_COLOR = "#6b7280";

export const getLanguageColor = (language: string | null | undefined): string =>
  (language && LANGUAGE_COLORS[language]) || FALLBACK_COLOR;

const stripMarkdown = (text: string): string =>
  text
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]*)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[*_~>#]+/g, "")
    .replace(/\s+/g, " ")
    .trim();

const clampDescription = (text: string): string =>
  text.length <= DESCRIPTION_MAX_LENGTH
    ? text
    : `${text.slice(0, DESCRIPTION_MAX_LENGTH).replace(/\s+\S*$/, "")}...`;

const titleCaseFromName = (name: string): string =>
  name
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();

const buildFallbackDescription = (
  name: string,
  language: string | null,
): string => {
  const title = titleCaseFromName(name);
  if (!language) return `${title}. Source code hosted on GitHub.`;
  return `${title}. A ${language} project. Source code hosted on GitHub.`;
};

const summarizeMarkdown = (markdown: string): { text: string } => {
  const withoutCodeBlocks = markdown.replace(/```[\s\S]*?```/g, " ");
  const lines = withoutCodeBlocks
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .filter(
      (line) =>
        !/^!?\[.*\]\(.*\)$/.test(line) &&
        !/^[-*+]\s/.test(line) &&
        !/^\|/.test(line) &&
        !/^#{1,6}\s*$/.test(line),
    );

  const paragraphs = lines.join(" ").trim();
  return { text: stripMarkdown(paragraphs) };
};

const normalizeRepo = (
  repo: GithubRepo,
  readmeSummary?: string,
): Project => {
  const description = repo.description
    ? clampDescription(stripMarkdown(repo.description))
    : readmeSummary
      ? clampDescription(readmeSummary)
      : "";

  return {
    id: String(repo.id),
    title: repo.name,
    description:
      description || buildFallbackDescription(repo.name, repo.language),
    language: repo.language || "Other",
    demoUrl: repo.homepage ? repo.homepage : undefined,
    githubUrl: repo.html_url,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    issues: repo.open_issues_count,
    updatedAt: repo.pushed_at || repo.updated_at,
  };
};

const isUsableRepo = (repo: GithubRepo): boolean =>
  !repo.fork && !repo.archived;

interface CachedPayload {
  timestamp: number;
  repos: GithubRepo[];
  readmeSummaries: Record<string, string>;
}

const readCache = (): CachedPayload | null => {
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as CachedPayload;
    if (!parsed || !Array.isArray(parsed.repos)) return null;
    if (Date.now() - parsed.timestamp > CACHE_TTL_MS) return null;

    return parsed;
  } catch {
    return null;
  }
};

const writeCache = (
  repos: GithubRepo[],
  readmeSummaries: Map<string, string>,
): void => {
  try {
    const payload: CachedPayload = {
      timestamp: Date.now(),
      repos,
      readmeSummaries: Object.fromEntries(readmeSummaries),
    };
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch {
    /* storage full or unavailable; the fetch still succeeds */
  }
};

const mapWithConcurrency = async <T, R>(
  items: T[],
  limit: number,
  worker: (item: T, index: number) => Promise<R>,
): Promise<R[]> => {
  const results: R[] = new Array(items.length);
  let cursor = 0;

  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await worker(items[index], index);
    }
  });

  await Promise.all(runners);
  return results;
};

const fetchReadmeSummary = async (
  repo: GithubRepo,
  signal?: AbortSignal,
): Promise<string | null> => {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${repo.full_name}/readme`,
      {
        signal,
        headers: {
          Accept: "application/vnd.github.raw",
          "X-GitHub-Api-Version": "2022-11-28",
        },
      },
    );

    if (!response.ok) return null;

    const markdown = await response.text();
    const { text } = summarizeMarkdown(markdown);
    return text || null;
  } catch {
    return null;
  }
};

export const fetchRepos = async (
  signal?: AbortSignal,
): Promise<Project[]> => {
  const cached = readCache();
  if (cached) {
    const summaries = new Map(
      Object.entries(cached.readmeSummaries ?? {}),
    );
    return cached.repos
      .filter(isUsableRepo)
      .map((repo) => normalizeRepo(repo, summaries.get(repo.name)));
  }

  const response = await fetch(API_URL, {
    signal,
    headers: { Accept: "application/vnd.github+json" },
  });

  if (!response.ok) {
    throw new Error(`GitHub responded with ${response.status}`);
  }

  const repos = (await response.json()) as GithubRepo[];
  if (!Array.isArray(repos)) throw new Error("Unexpected response from GitHub");

  const usable = repos.filter(isUsableRepo);

  const withoutDescription = usable.filter((repo) => !repo.description);
  const summaries = await mapWithConcurrency(
    withoutDescription,
    4,
    (repo) => fetchReadmeSummary(repo, signal),
  );

  const summaryByName = new Map<string, string>();
  withoutDescription.forEach((repo, index) => {
    const summary = summaries[index];
    if (summary) summaryByName.set(repo.name, summary);
  });

  writeCache(usable, summaryByName);

  return usable.map((repo) =>
    normalizeRepo(repo, summaryByName.get(repo.name)),
  );
};

export const clearRepoCache = (): void => {
  try {
    window.localStorage.removeItem(CACHE_KEY);
  } catch {
    /* nothing to clear */
  }
};

export const getLanguages = (repos: Project[]): string[] =>
  Array.from(new Set(repos.map((repo) => repo.language))).sort((a, b) =>
    a.localeCompare(b),
  );

export const formatRelativeDate = (isoDate: string): string => {
  const then = new Date(isoDate).getTime();
  if (Number.isNaN(then)) return "";

  const days = Math.floor((Date.now() - then) / (1000 * 60 * 60 * 24));
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days} days ago`;
  if (days < 365) return `${Math.floor(days / 30)} mo ago`;
  return `${Math.floor(days / 365)} yr ago`;
};
