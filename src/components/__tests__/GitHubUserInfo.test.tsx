import { render, screen } from '@testing-library/react';
import GitHubUserInfo from '../GitHubUserInfo';
import { mockUsers } from '../../test-utils';

describe('GitHubUserInfo', () => {
  it('should render', () => {
    const mockUser = mockUsers[0];

    render(<GitHubUserInfo user={mockUser} />);

    expect(screen.getByAltText("one's avatar")).toBeInTheDocument();
    expect(screen.getByText(mockUser.name ?? '')).toBeInTheDocument();
    expect(screen.getByText(mockUser.login ?? '')).toBeInTheDocument();
    expect(screen.getAllByRole('link').length).toEqual(2);
  });

  it('should have placeholder when no organizations or followers exist', () => {
    const mockUser = mockUsers[0];
    mockUser.organizations = [];
    mockUser.followerCount = 0;

    render(<GitHubUserInfo user={mockUser} />);

    expect(screen.getAllByText('None').length).toEqual(2);
  });
});