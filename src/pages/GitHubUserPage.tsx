import type { LoaderFunctionArgs } from 'react-router-dom';
import { useLoaderData } from 'react-router';
import { getGitHubUser } from '../common/api';
import { GitHubUser } from '../common/types/GitHub';
import RepositoryCard from '../components/RepositoryCard';
import GitHubUserInfo from '../components/GitHubUserInfo';
import { useTitle } from '../common/hooks/useTitle';

export async function loader({ params }: LoaderFunctionArgs<{ id: string; }>) {
  return getGitHubUser(params.id ?? '');
}

const GitHubUserPage = () => {
  const user = useLoaderData() as GitHubUser;
  useTitle(user.login);

  return (
    <div className="h-screen flex flex-col bg-zinc-50">
      <div className="flex-grow-0">
        <GitHubUserInfo user={user} />
      </div>
      <div className="flex-1 text-zinc-900 overflow-y-auto p-4 dark:bg-zinc-800">
        {user.repositories.length === 0 ? <div className="mt-4 text-xl text-center">No repositories</div> : null}
        {user.repositories.map(repository => (
          <RepositoryCard repository={repository} key={repository.id} />
        ))}
      </div>
    </div>
  );
};

export default GitHubUserPage;