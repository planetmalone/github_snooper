import type { LoaderFunctionArgs } from '@vercel/remix';
import type { GitHubUser } from '~/common/types/GitHub';
import { useLoaderData } from 'react-router';
import { getGitHubUser } from '~/common/api';
import RepositoryCard from '~/components/RepositoryCard';
import GitHubUserInfo from '~/components/GitHubUserInfo';
import { useTitle } from '~/common/hooks/useTitle';

export async function loader({ params }: LoaderFunctionArgs) {
  console.log({params});
  return getGitHubUser(params.userId ?? '');
}

const GitHubUserPage = () => {
  const user = useLoaderData() as GitHubUser;
  useTitle(user.login);

  return (
    <div id="github-user-page" className="h-screen flex flex-col bg-zinc-50">
      <div className="flex-grow-0">
        <GitHubUserInfo user={user}/>
      </div>
      <div
        id="repository-list"
        className="flex-1 text-zinc-900 overflow-y-auto p-4 dark:bg-zinc-800"
      >
        {user.repositories.length === 0
          ? <div className="mt-4 text-xl text-center">No repositories</div>
          : <h2 className="text-lg font-bold dark:text-zinc-50 mb-4">Repositories</h2>
        }
        {user.repositories.map(repository => (
          <RepositoryCard repository={repository} key={repository.id}/>
        ))}
      </div>
    </div>
  );
};

export default GitHubUserPage;