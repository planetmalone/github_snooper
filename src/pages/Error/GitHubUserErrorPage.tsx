import { useParams } from 'react-router';
import { FaGithub } from 'react-icons/fa6';
import { useTitle } from '../../common/hooks/useTitle';

const GitHubUserErrorPage = () => {
  useTitle('User Not Foun');
  const { id } = useParams();

  return (
    <div className="h-screen flex flex-col justify-center items-center light:text-zinc-900 dark:text-zinc-50 light:bg-zinc-50 dark:bg-zinc-900">
      <h1 className="flex items-center text-6xl mb-8">
        <FaGithub/>
        <div className="ml-3">404</div>
      </h1>
      <h2 className="mb-8 lg:text-3xl">Oops! We had trouble trying to find {id}.</h2>
      <p>Please make sure this person actually exists. If so, ask them why they're hiding from you.</p>
    </div>
  );
};
export default GitHubUserErrorPage;