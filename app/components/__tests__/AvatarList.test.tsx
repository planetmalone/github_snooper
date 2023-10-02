import { render, screen } from '@testing-library/react';
import AvatarList from '../AvatarList';

describe('AvatarList', () => {
  it('should render', () => {
    const mockAvatars = [
      {
        id: '1',
        login: 'one',
        url: 'https://github.com/1',
        avatarUrl: 'https://avatar.github.com/1',
      },
      {
        id: '2',
        login: 'two',
        url: 'https://github.com/2',
        avatarUrl: 'https://avatar.github.com/2',
      }
    ]

    render(<AvatarList avatars={mockAvatars} />);

    const avatars = screen.getAllByRole('link');
    expect(avatars.length).toEqual(2);
  });
});