import { FC, memo } from 'react';
import { GitHubUser } from '../common/types/GitHub';
import AvatarList from './AvatarList';

export interface GitHubUserInfoProps {
  user: GitHubUser;
}

const GitHubUserInfo: FC<GitHubUserInfoProps> = memo(({ user }) => (
  <div className="flex p-8 bg-gradient-to-bl from-zinc-100 bg-zinc-200 dark:from-zinc-800 dark:bg-zinc-900 shadow">
    <div className="flex-1 flex flex-col justify-around">
      <img
        className="rounded-full w-full max-w-[192px] max-h-[192px] mb-4"
        src={user.avatarUrl}
        alt={`${user.login}'s avatar`}
      />
      <h1 className="font-bold text-2xl">{user.name}</h1>
      <h2 className="text-xl">{user.login}</h2>
    </div>
    <div className="flex-1 ml-4">
      <h3 className="font-bold text-lg">Organizations</h3>
      {user.organizations.length > 0 ? <AvatarList avatars={user.organizations} /> : <div>None</div>}
      <h3 className="font-bold text-lg mt-8">
        <span>Followers</span> <span className="text-zinc-700 dark:text-zinc-300 text-sm">{user.followerCount > 0  ? user.followerCount : null}</span>
      </h3>
      {user.followerCount > 0 ? <AvatarList avatars={user.followers} /> : <div>None</div>}
    </div>
  </div>
));

export default GitHubUserInfo;