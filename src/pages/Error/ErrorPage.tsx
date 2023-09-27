import { useTitle } from '../../common/hooks/useTitle';

const ErrorPage = () => {
    useTitle('Error');

    return (
      <div className="h-screen flex flex-col justify-center items-center light:text-zinc-900 dark:text-zinc-50 light:bg-zinc-50 dark:bg-zinc-900">
        <h2 className="mb-8 lg:text-3xl">Oops! Something went wrong.</h2>
        <p>We're sorry about that. We're not sure what happened. Please try again later.</p>
    </div>
    );
};

export default ErrorPage;