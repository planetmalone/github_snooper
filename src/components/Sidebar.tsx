import GitHubUserList from './GitHubUserList';
import { useState } from 'react';
import SearchBar from './SearchBar';

const Sidebar = () => {
  const [search, setSearch] = useState<string>('');

  const handleSearchUpdate = (value: string) => setSearch(value);

  return (
      <aside className="h-full flex flex-col items-center py-16 bg-neutral-800">
        <SearchBar value={search} onUpdate={handleSearchUpdate} />
        <GitHubUserList/>
      </aside>
  );
};

export default Sidebar;