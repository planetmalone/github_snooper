import { FC, memo } from 'react';
import { Repository } from '../common/types/GitHub';
import { FaCodeFork, FaStar } from 'react-icons/fa6';

interface RepositoryCardProps {
  repository: Repository;
}

const RepositoryCard: FC<RepositoryCardProps> = memo(({ repository }) => (
  <div
    className="flex border border-zinc-800 dark:border-zinc-600 rounded mb-4 p-4 bg-white dark:bg-zinc-900 shadow dark:text-zinc-50"
    data-testid="repository-card"
  >
    <div className="flex-1 min-w-min">
      <h4 className="flex itemc-center">
        <a className="text-blue-500 hover:underline" href={repository.url}>{repository.name}</a>
      </h4>
      <p className="text-sm my-2">{repository.description}</p>
      {repository.primaryLanguage
        ? (
          <div className="flex items-center">
            <div className="rounded-full w-4 h-4 mr-1"
                 style={{ backgroundColor: repository.primaryLanguage.color }}
                 data-testid="language-color"
            ></div>
            <div>{repository.primaryLanguage.name}</div>
          </div>
        )
        : null
      }
    </div>
    <div>
      {repository.stargazerCount > 0 && (
        <div className="flex items-center">
          <FaStar/> <span className="ml-1">{repository.stargazerCount}</span>
        </div>
      )}
      {repository.forkCount > 0 && (
        <div className="flex items-center">
          <FaCodeFork/> <span className="ml-1">{repository.forkCount}</span>
        </div>
      )}
    </div>
  </div>
));

export default RepositoryCard;