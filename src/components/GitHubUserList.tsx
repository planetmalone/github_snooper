import SummaryCard from './SummaryCard';
import { DisplayMode } from '../common/types/Display';
import { GitHubUserSummary } from '../common/types/GitHub';
import { FC, memo } from 'react';

export interface GitHubUserListProps {
  users: GitHubUserSummary[];
  onSelection: () => void;
}

const GitHubUserList: FC<GitHubUserListProps> = memo(({
  users,
  onSelection,
}) => (
  <ul className="w-full px-4 overflow-y-auto">
    {users.map(user => (
      <li className="my-8" key={user.login}>
        <SummaryCard
          user={user}
          mode={DisplayMode.Dark}
          onOpen={onSelection}
        />
      </li>
    ))}
  </ul>
));

export default GitHubUserList;