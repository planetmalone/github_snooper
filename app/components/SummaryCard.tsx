import { FC, memo } from 'react';
import { DisplayMode } from '../common/types/Display';
import { GitHubUserSummary } from '../common/types/GitHub';
import { useNavigate } from '@remix-run/react';

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
  const navigate = useNavigate();

  const handleSelection = () => {
    onOpen();
    navigate(`/${login}${window.location.search}`);
  };

  const cardStyles = `flex items-center w-full p-2 rounded shadow-lg shadow border text-blue-500 ${BaseStyles.card[mode]}`;

  return (
    <div className={cardStyles} data-testid="summary-card">
      <img
        className="rounded-full mt-1 w-10 h-10 flex-shrink-0 shadow-sm"
        src={avatarUrl}
        alt={`${login}'s avatar.`}
        title={`GitHub user: ${login}`}
      />
      <button
        type="button"
        className="ml-4 whitespace-nowrap overflow-ellipsis overflow-hidden"
        onClick={handleSelection}
      >
        {login}
      </button>
    </div>
  );
});

export default SummaryCard;