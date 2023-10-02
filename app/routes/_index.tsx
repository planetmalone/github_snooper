import type { GitHubUserSummary } from '~/common/types/GitHub';
import { useLoaderData } from '@remix-run/react';
import { getGitHubUsers } from '~/common/api';
import SummaryCard from '~/components/SummaryCard';
import { DisplayMode } from '~/common/types/Display';
import { useTitle } from '~/common/hooks/useTitle';

export function loader() {
  return getGitHubUsers('language:javascript', 8);
}

export default function WelcomePage() {
  useTitle('Welcome');
  const users = useLoaderData() as GitHubUserSummary[];

  return (
    <div className="flex flex-col items-center p-4 min-h-screen bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50">
      <h1 className="text-center text-3xl mt-24 mb-16">Welcome to GitHub Snooper</h1>
      <p className="mb-8 max-w-screen-md">
        Ever wanted to snoop on your favorite GitHubbers from outside of{' '}
        <a href="https://github.com">GitHub.com</a>{' '}but couldn't find time to build it in your busy day? No? Well, guess what.
        We've done it! And to those naysayers thinking, <i>"What's the point of this?"</i> we say, 😝️.
      </p>
      <p className="max-w-screen-md">
        Feel free to use the search in the left panel to find a GitHub user by their handle. To get you started, here
        some of the top GitHubbers.
      </p>
      <div className="grid grid-cols-4 gap-4 mt-8 w-full max-w-4xl">
        {users.map(user => (
          <div className="col-span-4 sm:col-span-2 lg:col-span-1" key={user.id}>
            <SummaryCard user={user} mode={DisplayMode.Dark}/>
          </div>
        ))}
      </div>
    </div>
  );
};