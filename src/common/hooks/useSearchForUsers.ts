import { useDebounce } from './useDebounce';
import { getGitHubUsers } from '../api';
import { GitHubUserSummary } from '../types/GitHub';
import { useState } from 'react';

export const useSearchForUsers = (): [GitHubUserSummary[], (search: string, numberOfResults?: number) => void] => {
  const [cachedSearch, setCachedSearch] = useState<Map<string, GitHubUserSummary[]>>(new Map());
  const [query, setQuery] = useState<string>('');
  const [numResults, setNumResults] = useState<number>(25);
  const [users, setUsers] = useState<GitHubUserSummary[]>([]);

  const updateCache = (q: string, value: GitHubUserSummary[]) => {
    setCachedSearch(cachedSearch.set(q, value));
  }

  useDebounce(async () => {
    const lowerQuery = query.toLowerCase();
    if (!cachedSearch.has(lowerQuery)) {
      const users = await getGitHubUsers(lowerQuery, numResults);
      updateCache(lowerQuery, users);
    }

    setUsers(cachedSearch.get(lowerQuery)!);
  }, 300, [query, numResults]);

  const fetchResults = (search: string, numberOfResults = 25) => {
    if (search !== query) {
      setQuery(search);
    }
    if (numberOfResults !== numResults) {
      setNumResults(numberOfResults);
    }
  };

  return [users, fetchResults];
};