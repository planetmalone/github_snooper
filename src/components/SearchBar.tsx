import { ChangeEventHandler, FC, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

export interface SearchBarProps {
  value: string;
  onUpdate: (value: string) => void;
}

const SearchBar: FC<SearchBarProps> = () => {
  const [search, setSearch] = useState<string>('');

  const handleSearchUpdate: ChangeEventHandler<HTMLInputElement> = (event) => setSearch(event.target.value);

  return (
      <>
        <div className="relative shadow">
          <FaSearch className="absolute top-1/2 left-2 -translate-y-1/2 text-zinc-50" />
          <input
              className="p-2 pl-8 text-sm rounded bg-zinc-600 text-zinc-50 hover:bg-zinc-500 focus:text-white"
              type="text"
              value={search}
              onChange={handleSearchUpdate}
              placeholder="Search..."
          />
        </div>
      </>
  );
};

export default SearchBar;