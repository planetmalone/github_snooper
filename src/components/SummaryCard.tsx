import { FC, memo } from 'react';
import Link from '../components/Link';
import { DisplayMode } from '../common/types/Display';
import { GitHubUserSummary } from '../common/types/GitHub';
import { useLocation } from 'react-router';

export interface SummaryCardProps {
  user: GitHubUserSummary;
  mode?: DisplayMode;
  onOpen?: () => void;
}

const BaseStyles = {
  card: {
    light: 'border-zinc-900',
    dark: 'border-zinc-500',
  },
};

const SummaryCard: FC<SummaryCardProps> = memo(({
  user: {
    login,
    avatarUrl,
  },
  mode = DisplayMode.Light,
  onOpen = () => {},
}) => {
  const { search } = useLocation();

  const cardStyles = `flex items-center w-full p-2 rounded shadow-lg shadow border text-blue-500 ${BaseStyles.card[mode]}`;

  return (
    <div className={cardStyles} data-testid="summary-card">
      <img
        className="rounded-full mt-1 w-10 h-10 flex-shrink-0 shadow-sm"
        src={avatarUrl}
        alt={`${login}'s avatar.`}
        title={`GitHub user: ${login}`}
      />
      <Link
        to={`/users/${login}${search}`}
        className="ml-4 whitespace-nowrap overflow-ellipsis overflow-hidden"
        onClick={onOpen}
      >
        {login}
      </Link>
    </div>
  );
});

export default SummaryCard;