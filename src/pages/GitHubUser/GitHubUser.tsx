import type { LoaderFunctionArgs } from 'react-router-dom';
import { useLoaderData } from 'react-router';

export async function loader({ params }: LoaderFunctionArgs) {
  return { id: params.id };
}

const GitHubUser = () => {
  const user = useLoaderData() as { id: string };

  return (<h1>User: {user.id}</h1>);
};

export default GitHubUser;