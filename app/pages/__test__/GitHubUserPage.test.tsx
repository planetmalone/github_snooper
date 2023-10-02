import { mockUsers, renderWithRouter } from '../../test-utils';
import { screen } from '@testing-library/react';
import GitHubUserPage, { loader } from '../../../routes/users/GitHubUserPage';

const mockUseLoaderData = jest.fn();
jest.mock('react-router', () => {
  const actual = jest.requireActual('react-router');

  return {
    ...actual,
    useLoaderData: () => mockUseLoaderData(),
  };
});

jest.mock('../../common/api', () => ({
  getGitHubUser: (id: string) => id ? mockUsers.filter(u => u.id === id) : [],
}));

describe('GitHubUserPage', () => {
  it('should render', () => {
    const mockUser = mockUsers[0]
    mockUseLoaderData.mockReturnValue(mockUser);

    renderWithRouter(<GitHubUserPage/>);

    expect(screen.getByText(mockUser.name ?? '')).toBeInTheDocument();
    expect(screen.getAllByTestId('repository-card')).toHaveLength(2);
  });

  it('should render none when there are no repositories', () => {
    const mockUser = mockUsers[0]
    mockUser.repositories = [];
    mockUseLoaderData.mockReturnValue(mockUser);

    renderWithRouter(<GitHubUserPage/>);

    expect(screen.getByText(mockUser.name ?? '')).toBeInTheDocument();
    expect(screen.queryByTestId('repository-card')).not.toBeInTheDocument();
  });

  it('should load a user', async () => {
    const result = await loader({
      params: { id: '1' },
      request: {} as Request,
    });

    expect(result).toEqual([mockUsers[0]]);
  });

  it('should default to loading an empty array', async () => {
    const result = await loader({
      params: {},
      request: {} as Request,
    });

    expect(result).toEqual([]);
  });
});