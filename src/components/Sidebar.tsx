import { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import GitHubUserList from './GitHubUserList';
import SearchBar from './SearchBar';
import { useSearchForUsers } from '../common/hooks/useSearchForUsers';
export interface SidebarProps {
  onUserSelection: () => void;
}

const Sidebar: FC<SidebarProps> = ({ onUserSelection }) => {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState<string>(searchParams.get('q') ?? '');
  const [users, fetchResults] = useSearchForUsers();

  useEffect(() => {
    (async () => {
      await fetchResults(search);
      // Add logic to update query string
    })();
  }, [search, fetchResults]);

  const handleSearchUpdate = (value: string) => {
    const q = searchParams.get('q');
    // Using setQueryParams from useSearchParams triggers a rerender of the entire route tree. This causes some weird side effects.
    // Instead, we use replaceState to update the query parameter
    if (q === null || q !== value) {
      const url = new URL(window.location.href);
      url.searchParams.set('q', value);
      window.history.replaceState({}, '', url);
    }
    setSearch(value);
  }

  return (<>
    <div
      className="w-full h-full flex flex-col items-center pt-12 bg-gradient-to-tl from-zinc-100 bg-zinc-200 dark:from-zinc-800 dark:bg-zinc-900">
      <SearchBar value={search} onUpdate={handleSearchUpdate}/>
      <GitHubUserList users={users} onSelection={onUserSelection}/>
    </div>
  </>);
};

export default Sidebar;