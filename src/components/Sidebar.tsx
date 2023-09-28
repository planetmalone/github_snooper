import { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import GitHubUserList from './GitHubUserList';
import SearchBar from './SearchBar';
import { useSearchForUsers } from '../common/hooks/useSearchForUsers';
export interface SidebarProps {
  onUserSelection: () => void;
}

const Sidebar: FC<SidebarProps> = ({ onUserSelection }) => {
  const [search, setSearch] = useState<string>('');
  const [users, fetchResults] = useSearchForUsers();

  useEffect(() => {
    const currentSearchParams = new URLSearchParams(window.location.search);
    setSearch(currentSearchParams.get('q') ?? '');
  }, []);

  useEffect(() => {
    (async () => {
      await fetchResults(search);
      // Add logic to update query string
    })();
  }, [search, fetchResults]);

  const handleSearchUpdate = (value: string) => {
    // Using setQueryParams would be more elegant, but it triggers a rerender of the entire route tree causing side effects.
    const currentSearchParams = new URLSearchParams(window.location.search);
    const q = currentSearchParams.get('q');
    if (q === null || q !== value) {
      const url = new URL(window.location.href);
      url.searchParams.set('q', value);
      window.history.replaceState({}, '', url);
    }
    setSearch(value);
  }

  return (<>
    <div
      id="sidebar"
      className="w-full h-full flex flex-col items-center pt-12 bg-gradient-to-tl from-zinc-100 bg-zinc-200 dark:from-zinc-800 dark:bg-zinc-900">
      <SearchBar value={search} onUpdate={handleSearchUpdate}/>
      <GitHubUserList users={users} onSelection={onUserSelection}/>
    </div>
  </>);
};

export default Sidebar;