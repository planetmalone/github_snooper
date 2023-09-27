import type { GraphQlQueryResponseData } from '@octokit/graphql';
import type { GitHubUser, GitHubUserSummary } from '../types/GitHub';
import { isGitHubRequestError } from '../types/GitHub';
import { GITHUB_TOKEN } from './index';
import { searchQuery, userQuery } from './queries';

const GITHUB_URL = 'https://api.github.com/graphql';

enum SearchType {
  User = 'USER',
}

export const getGitHubUsers = async (search: string, numberOfResults = 25): Promise<GitHubUserSummary[] | null> => {
  if (!search) {
    return [];
  }

  const response = await graphql(searchQuery, { type: SearchType.User, search, numberOfResults });
  const json = await response?.json();
  const users = json.data.search.nodes as GraphQlQueryResponseData;
  return users
    .filter((user: GitHubUser) => Boolean(user.login))
    .map(userMapper);
};

export const getGitHubUser = async (login: string): Promise<GitHubUser | null> => {
  if (!login) {
    return null;
  }
  const response = await graphql(userQuery, { login });
  const json = await response?.json();
  return userMapper(json.data.user);
};


const graphql = async (query: string, variables: { [key: string]: string | number | boolean; }) => {
  try {
    return fetch(GITHUB_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28',
        'X-Github-Next-Global-ID': '1',
      },
      body: JSON.stringify({
        query,
        variables,
      })
    });
  } catch (error) {
    handleGitHubError(error);
  }
};

const handleGitHubError = (error: unknown) => {
  if (isGitHubRequestError(error) && error.response) {
    if (error.response && error.status === 403 && error.response.headers['x-ratelimit-remaining'] === '0') {
      const resetTimeEpochSeconds = Number(error.response?.headers['x-ratelimit-reset']);
      const currentTimeEpochSeconds = Math.floor(Date.now() / 1000);
      const secondsToWait = (Number.isNaN(resetTimeEpochSeconds) ? 0 : resetTimeEpochSeconds) - currentTimeEpochSeconds;
      console.log(`You have exceeded your rate limit. Please try again in ${secondsToWait} seconds.`);
    } else {
      console.error(`Error call GitHub API.\nStatus: ${error.response.status}.\nMessage: ${error.response.data}`);
    }
  }
};

const userMapper = (user: GraphQlQueryResponseData): GitHubUser => ({
  ...user as GitHubUser,
  followerCount: user.followers?.totalCount,
  followers: user.followers?.nodes,
  repositories: user.repositories?.nodes,
  organizations: user.organizations?.nodes,
});