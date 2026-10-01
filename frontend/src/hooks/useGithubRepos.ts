import { useCallback, useEffect, useState } from "react";
import { fetchRepos, Project } from "../utils/github";

interface UseGithubReposResult {
  repos: Project[];
  loading: boolean;
  error: string | null;
  retry: () => void;
}

export const useGithubRepos = (): UseGithubReposResult => {
  const [repos, setRepos] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    setLoading(true);
    setError(null);

    fetchRepos(controller.signal)
      .then((data) => {
        if (active) setRepos(data);
      })
      .catch((err: unknown) => {
        if (!active || controller.signal.aborted) return;
        setError(
          err instanceof Error ? err.message : "Failed to load repositories",
        );
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [attempt]);

  const retry = useCallback(() => setAttempt((prev) => prev + 1), []);

  return { repos, loading, error, retry };
};
