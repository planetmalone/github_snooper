import { getGitHubUser, getGitHubUsers } from '../GitHub.api';
import { mockUsers, mockUsersResponse, mockUserSummaries } from '../../../test-utils';

global.fetch = jest.fn();

describe('GitHub API', () => {
  it('should return empty when search is not defined', async () => {
    const results = await getGitHubUsers('');
    expect(results).toEqual([]);
  });

  it('should return users', async () => {
    (global.fetch as jest.Mock).mockReturnValue(Promise.resolve({
      json: () => Promise.resolve({
        data: {
          search: {
            nodes: mockUserSummaries
          }
        }
      })
    }));

    const results = await getGitHubUsers('one');
    expect(results).toEqual(mockUserSummaries);
  });

  it('should return empty when user login is not defined', async () => {
    const results = await getGitHubUser('');
    expect(results).toEqual(null);
  });

  it('should return a single user', async () => {
    (global.fetch as jest.Mock).mockReturnValue(Promise.resolve({
      json: () => Promise.resolve({
        data: {
          user: mockUsersResponse[0]
        }
      })
    }));

    const results = await getGitHubUser('one');
    expect(results).toEqual(mockUsers[0]);
  });

  it('should handle GitHub errors', async () => {
    jest.spyOn(console, 'log');
    (global.fetch as jest.Mock).mockImplementationOnce(() => {
      throw {
        response: {
          headers: {
            'x-ratelimit-remaining': '0',
            'x-ratelimit-reset': Math.floor((Date.now() + 2000) / 1000),
          }
        },
        status: 403,
      };
    });

    await getGitHubUser('one');
    expect(console.log).toHaveBeenLastCalledWith('You have exceeded your rate limit. Please try again in 2 seconds.');
  });
});