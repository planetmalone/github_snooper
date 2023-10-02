import { ChangeEventHandler, FC } from 'react';
import { FaSearch } from 'react-icons/fa';

export interface SearchBarProps {
  value: string;
  onUpdate: (value: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({
  value,
  onUpdate,
}) => {

  const handleSearchUpdate: ChangeEventHandler<HTMLInputElement> = (event) => onUpdate(event.target.value);

  return (
    <div className="w-full pl-4 pr-8">
      <div className="relative shadow">
        <FaSearch className="absolute top-1/2 left-2 -translate-y-1/2 text-zinc-600 dark:text-zinc-400"/>
        <label className="sr-only">User Search</label>
        <input
          id="user-search"
          className="w-full p-2 pl-8 rounded border-2 border-blue-500 bg-transparent text-sm focus-visible:outline outline-blue-500 focus-visible:border-blue-500"
          type="text"
          value={value}
          onChange={handleSearchUpdate}
          placeholder="Search..."
        />
      </div>
    </div>
  );
};

export default SearchBar;