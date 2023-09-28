import { FC, memo } from 'react';

export interface AvatarListProps {
  avatars: Avatar[];
}

export interface Avatar {
  id: string;
  url: string;
  avatarUrl: string;
  login: string;
}

const AvatarList: FC<AvatarListProps> = memo(({ avatars }) => (
  <div className="avatar-list flex">
    {avatars.map(avatar => (
      <a
        className="ml-2"
        href={avatar.url}
        title={avatar.login}
        key={avatar.id}
      >
        <img
          className="max-w-[40px] rounded"
          src={avatar.avatarUrl}
          alt={`${avatar.login}'s avatar`}
        />
      </a>
    ))}
  </div>
));

export default AvatarList;